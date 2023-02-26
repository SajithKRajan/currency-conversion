import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
  Matches,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type ExchangeDoc = HydratedDocument<Exchange>;

/**
 * The exchane type enum.
 */
export enum ExchangeType {
  'LIVE',
  'EXCHANGE',
}

/**
 * The mongo schema for exchange collection.
 */
@Schema({ timeseries: { timeField: 'date_time', granularity: 'seconds' } })
export class Exchange {
  /**
   * Currency From
   */
  @ApiProperty({ required: true, description: 'Currency From' })
  @Matches(/^[0-9A-Z]+$/, { message: 'Not a valid symbol' })
  @Length(1, 6)
  @IsNotEmpty()
  @Prop({ required: true })
  readonly currency_from: string;
  /**
   * Currency To
   */
  @ApiProperty({ required: true, description: 'Currency To' })
  @Matches(/^[A-Z]+$/, { message: 'Not a valid symbol' })
  @Length(3)
  @IsNotEmpty()
  @Prop({ required: true })
  readonly currency_to: string;
  /**
   * Amount From
   */
  @ApiProperty({ required: true, description: 'Amount From' })
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  @Prop({ required: true })
  readonly amount_from: number;
  /**
   * Amount To
   */
  @ApiProperty({ required: true, description: 'Amount To' })
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  @Prop({ required: true })
  readonly amount_to: number;
  /**
   * Exchange Type
   */
  @Prop({ required: true })
  readonly type: ExchangeType;
  /**
   * Date Time
   */
  @Prop({ required: true, type: Date })
  readonly date_time: Date | string;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
