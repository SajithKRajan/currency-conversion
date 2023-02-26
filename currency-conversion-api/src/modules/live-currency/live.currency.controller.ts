import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  LiveCurrencyService,
  ICurrencies,
} from './services/live.currency.service';
import { LiveRateConversionPayload } from './payloads/live.currency.rate.payload';
import { Query } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

/**
 * The controller for handle live currency data request.
 */
@Controller('live_currency')
export class LiveCurrencyController {
  /**
   * Constructor
   * @param liveDataService
   */
  constructor(
    @Inject('LiveCurrencyServiceFactory')
    private readonly liveDataService: LiveCurrencyService,
  ) {}

  /**
   * Retrieves the list of all currencies.
   * @returns {Promise<ICurrencies>} queried currency data list.
   */
  @Get()
  @ApiOperation({
    summary: 'This api handle the request for fetching list of currencies',
  })
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  async getAllCurrencies(): Promise<ICurrencies> {
    return await this.liveDataService.getAllCurrencies();
  }

  /**
   * Retrieves the converted rate.
   * @param payload - The input for currency conversion.
   * @returns {Promise<{result: number}>} The converted amount.
   */
  @Get('/convert')
  @ApiOperation({
    summary:
      'This api handle the request for the convertion one currency to another',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  async getConvertedRate(
    @Query() payload: LiveRateConversionPayload,
  ): Promise<{ result: number }> {
    return await this.liveDataService.convert(payload);
  }
}
