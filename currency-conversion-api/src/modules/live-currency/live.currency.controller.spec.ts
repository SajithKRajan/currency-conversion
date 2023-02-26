import { Test, TestingModule } from '@nestjs/testing';
import { LiveCurrencyController } from './live.currency.controller';

describe('CurrencyController', () => {
  let controller: LiveCurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiveCurrencyController],
    }).compile();

    controller = module.get<LiveCurrencyController>(LiveCurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
