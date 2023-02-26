import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FilterPayload } from './filter.payload';
import { Exchange, ExchangeType } from './exchange.model';
import { ExchangeService } from './exchange.service';

/**
 * ExchangeController
 */
@Controller('exchange')
export class ExchangeController {
  /**
   * Constructor
   * @param exchangeService
   */
  constructor(private readonly exchangeService: ExchangeService) {}

  /**
   * Retrieves the list of all exchange history from the DB.
   * @param filters - The filters
   * @returns {Promise<Exchange[]>} - Returns the history date based on filters
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  async getAllRecords(@Query() filters: FilterPayload): Promise<Exchange[]> {
    return await this.exchangeService.getAll(filters);
  }

  /**
   * Save exchange details in to DB.
   * @param filters - The filters
   * @returns {Promise<Exchange[]>} - Returns the history date based on filters
   */
  @Post()
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  async save(@Body() payload: Exchange): Promise<Exchange> {
    return await this.exchangeService.create({
      ...payload,
      type: ExchangeType.EXCHANGE,
    });
  }
}
