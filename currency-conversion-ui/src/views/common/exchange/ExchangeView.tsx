import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import "./ExchangeView.scss";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ICurrencyModel } from "../../../interface/ICurrency";
import {
  autoSuggestionSearch,
  convertCurrency,
} from "../../../services/CurrencyService";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { setLoading } from "../../../store/exchange.store";
import { save } from "../../../apis/ExchangeApis";
import { Toast } from "primereact/toast";
import { isMobile } from "react-device-detect";
import { fetchExchangeList } from "../../../store/history.store";

interface IFormInputs {
  currency_from?: ICurrencyModel;
  currency_to?: ICurrencyModel;
  amount_from: number;
  amount_to: number;
}

export const ExchangeView = () => {
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);
  //Select the currecy list fetched from api
  const state = useAppSelector((state) => state.currency);

  // Form input default values
  const defaultValues: IFormInputs = {
    amount_from: 0,
    amount_to: 0,
  };

  // The react-hook form validation methods
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
  } = useForm<IFormInputs>({ defaultValues, mode: "onChange" });

  // The filtered list of currencies
  const [filteredCrypto, setFilteredCryto] = useState<ICurrencyModel[]>([]);
  const [filteredFiat, setFilteredFiat] = useState<ICurrencyModel[]>([]);

  const inputChanges = watch(["currency_from", "currency_to", "amount_from"]);
  /**
   * The method for handling the auto suggestion search.
   * @param event
   * @param source
   * @param setFn
   */
  const onAutoSuggestion = (
    event: any,
    source: ICurrencyModel[],
    setFn: Function
  ) => {
    setFn(autoSuggestionSearch(event.query, source));
  };

  /**
   * The method for rendering auto suggestion list item
   * @param item
   * @returns
   */
  const autoSuggestionItem = (item: ICurrencyModel) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={item.name_full}
          src={
            item.icon_url ||
            "https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          }
          className={classNames(
            { flag: !item.icon_url },
            `mr-2  flag-${item.symbol.substring(0, 2).toLowerCase()}`
          )}
          style={{ width: "18px" }}
        />
        <div>{item.name}</div>
      </div>
    );
  };

  /**
   * The error message component
   * @param name
   * @returns
   */
  const getFormErrorMessage = (name: keyof IFormInputs) => {
    return errors[name] ? (
      <small className="p-error flex mb-2">{errors[name]?.message}</small>
    ) : (
      <small className="p-error flex mb-2">&nbsp;</small>
    );
  };

  /**
   * The method handles the submit action
   * @param data
   */
  const onSubmit = (data: IFormInputs) => {
    if (isValid) {
      dispatch(setLoading(true));
      save({
        amount_from: data.amount_from,
        currency_from: data.currency_from?.name_full || "",
        currency_to: data.currency_to?.symbol || "",
        amount_to: data.amount_to,
      })
        .then((res) => {
          dispatch(setLoading(false));
          toast.current?.show({
            severity: "success",
            summary: "Saved",
            detail: "Saved Successfully",
          });
          dispatch(fetchExchangeList(null));
        })
        .catch((err) => {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Error occured while saving your data.",
          });
          dispatch(setLoading(false));
        });
      reset();
    }
  };

  useEffect(() => {
    const data = getValues();
    if (isValid) {
      dispatch(setLoading(true));
      convertCurrency(data)
        .then((res) => {
          setValue("amount_to", res, { shouldTouch: true });
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...inputChanges, isValid]);

  return (
    <Panel className="exchange main-panel">
      <Toast ref={toast} position={isMobile ? "top-center" : "top-right"} />
      <Card className="form-container" title="Exchange">
        <form
          className="flex sm:flex-column md:gap-4 gap-1 flex-wrap md:flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="currency_from"
            control={control}
            rules={{
              required: "Currency from - is required.",
              validate: (value) => value?.symbol !== undefined,
            }}
            render={({ field, fieldState }) => (
              <div className="flex-auto">
                <label htmlFor={field.name} className="font-light block mb-2">
                  Currency from
                </label>
                <AutoComplete
                  className={classNames(
                    { "p-invalid": fieldState.error },
                    "w-full"
                  )}
                  inputClassName="w-full"
                  field="name_full"
                  onBlur={field.onBlur}
                  inputId={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  suggestions={filteredCrypto}
                  completeMethod={(e) =>
                    onAutoSuggestion(
                      e,
                      state.currencyList.crypto,
                      setFilteredCryto
                    )
                  }
                  itemTemplate={autoSuggestionItem}
                />
                {getFormErrorMessage(field.name)}
              </div>
            )}
          />

          <Controller
            name="amount_from"
            control={control}
            rules={{
              required: "Amount - is required",
            }}
            render={({ field, fieldState }) => (
              <div className="flex-auto">
                <label htmlFor={field.name} className="font-light block mb-2">
                  Amount{" "}
                </label>
                <InputNumber
                  id={field.name}
                  inputRef={field.ref}
                  value={field.value}
                  className="w-full"
                  onBlur={field.onBlur}
                  maxFractionDigits={2}
                  onValueChange={(e) => field.onChange(e)}
                  inputClassName={classNames({ "p-invalid": fieldState.error })}
                />
                {getFormErrorMessage(field.name)}
              </div>
            )}
          />

          <Controller
            name="currency_to"
            control={control}
            rules={{
              required: "Currency to - is required.",
              validate: (value) => value?.symbol !== undefined,
            }}
            render={({ field, fieldState }) => (
              <div className="flex-auto">
                <label htmlFor={field.name} className="font-light block mb-2">
                  Currency To
                </label>
                <AutoComplete
                  className={classNames(
                    { "p-invalid": fieldState.error },
                    "w-full"
                  )}
                  inputClassName="w-full"
                  field="symbol"
                  onBlur={field.onBlur}
                  inputId={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  suggestions={filteredFiat}
                  completeMethod={(e) =>
                    onAutoSuggestion(
                      e,
                      state.currencyList.fiat,
                      setFilteredFiat
                    )
                  }
                  itemTemplate={autoSuggestionItem}
                />
                {getFormErrorMessage(field.name)}
              </div>
            )}
          />

          <Controller
            name="amount_to"
            control={control}
            rules={{
              required: "Amount - is required",
            }}
            render={({ field, fieldState }) => (
              <div className="flex-auto">
                <label htmlFor={field.name} className="font-light block mb-2">
                  Amount{" "}
                </label>
                <span className="p-input-icon-right w-full">
                  {state.isLoading && <i className="pi pi-spin pi-spinner" />}
                  <InputNumber
                    id={field.name}
                    inputRef={field.ref}
                    value={field.value}
                    onBlur={field.onBlur}
                    className="w-full"
                    maxFractionDigits={2}
                    onValueChange={(e) => field.onChange(e)}
                    inputClassName={classNames({
                      "p-invalid": fieldState.error,
                    })}
                    disabled
                  />
                </span>
              </div>
            )}
          />
          <div className="md:flex flex-auto md:w-auto w-full md:align-items-center mt-4 md:mt-0">
            <Button
              type="submit"
              severity="success"
              label="Save"
              className="w-full md:w-auto"
              disabled={state.isLoading}
            />
          </div>
        </form>
      </Card>
    </Panel>
  );
};
