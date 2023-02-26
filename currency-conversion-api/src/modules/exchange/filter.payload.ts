import { ApiProperty } from '@nestjs/swagger';
import { ExchangeType } from './exchange.model';

/**
 * The filters for fetching data from DB.
 */
export class FilterPayload {
  /**
   * Date from
   */
  @ApiProperty({
    required: true,
    description: 'Date from',
  })
  date_from: Date;
  /**
   * Date To
   */
  @ApiProperty({
    required: true,
    description: 'Date to',
  })
  date_to: Date;
  /**
   * Exchange type (Live/Exchange)
   */
  @ApiProperty({ description: 'Exchange type (Live/Exchange)' })
  type?: ExchangeType;
}
