import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsAlphanumeric,
  IsNumber,
  Length,
  IsAlpha,
  IsPositive,
  Matches,
} from 'class-validator';

/**
 * Convert Currency Payload Class
 */
export class LiveRateConversionPayload {
  /**
   * Access Key field
   */
  access_key: string;

  /**
   * From currency field
   */
  @ApiProperty({
    required: true,
    description: 'Currency from',
  })
  @Matches(/^[0-9A-Z]+$/, { message: 'Not a valid symbol' })
  @Length(1, 6)
  @IsNotEmpty()
  from: string;

  /**
   * To Currency field
   */
  @ApiProperty({ required: true, description: 'Currency to' })
  @IsAlpha()
  @Matches(/^[A-Z]+$/, { message: 'Not a valid symbol' })
  @Length(3)
  @IsNotEmpty()
  to: string;

  /**
   * Amount field
   */
  @ApiProperty({ required: true, description: 'The amount to be convert' })
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  amount: number;
}
