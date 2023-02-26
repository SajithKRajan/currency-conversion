import { useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { fetchAll } from "../store/exchange.store";
import { useAppDispatch } from "../store/hooks";
import { DesktopHomePage } from "./desktop";
import { MobileHomePage } from "./mobile";

export const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <>
      <MobileView>
        <MobileHomePage />
      </MobileView>
      <BrowserView>
        <DesktopHomePage />
      </BrowserView>
    </>
  );
};
