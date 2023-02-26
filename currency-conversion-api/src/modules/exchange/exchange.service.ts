import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FilterPayload } from './filter.payload';
import { Exchange } from './exchange.model';
import * as moment from 'moment';

/**
 * The Service manages all the exchange requests.
 */
@Injectable()
export class ExchangeService {
  /**
   * Constructor
   * @param {Model<IProfile>} exchangeModel
   */
  constructor(
    @InjectModel('Exchange') private readonly exchangeModel: Model<Exchange>,
  ) {}

  /**
   * Fetch all records from exchange collection with filers.
   * @param {FilterPayload} filters - The filters for searching.
   * @returns {Promise<Exchange[]>} - Fetch result.
   */
  async getAll(filters: FilterPayload): Promise<Exchange[]> {
    // Adding one more day to get full data for the day until next day morning 12:00 AM.
    const toDate = new Date(filters.date_to);
    toDate.setDate(toDate.getDate() + 1);
    let mongoFilter: FilterQuery<Exchange> = {
      date_time: {
        $gte: new Date(filters.date_from),
        $lt: toDate,
      },
    };
    if (filters.type) {
      mongoFilter = {
        ...mongoFilter,
        type: filters.type,
      };
    }
    const exchangeRecords = await this.exchangeModel
      .find({
        ...mongoFilter,
      })
      .sort({ date_time: 'desc' })
      .limit(1000);
    return exchangeRecords.map((item) => {
      return {
        amount_from: Number(item.amount_from),
        amount_to: Number(item.amount_to.toFixed(2)),
        currency_from: item.currency_from,
        currency_to: item.currency_to,
        type: item.type,
        date_time: moment(item.date_time).format('DD-MM-YYYY hh:mm'),
      };
    });
  }

  /**
   * Create a exchange rate entry in DB.
   * @param {Exchange} payload exchange entry
   * @returns {Promise<Exchange>} created record.
   */
  async create(payload: Exchange): Promise<Exchange> {
    const createExchangeEntry = new this.exchangeModel({
      ...payload,
      date_time: new Date(),
      type: payload?.type || 0,
    });
    return createExchangeEntry.save();
  }
}
