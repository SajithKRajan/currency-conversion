import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

/**
 * AppController
 */
@Controller()
export class AppController {
  /**
   * Constructor
   * @param appService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Returns the an environment variable from config file
   * @returns {string} the application environment url
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  getString(): string {
    return this.appService.root();
  }
}
