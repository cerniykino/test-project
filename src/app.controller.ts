import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";
interface ParsedData {
  Cube: Array<{ Cube: Array<{ Cube: Array<{ $: CurrencyRate }> }> }>;
}

interface CurrencyRate{
  currency: string;
  rate: number;
}
interface JSON{
  time: string,
  currencyAndRate: CurrencyRate[]
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  @UseGuards(AuthGuard('bearer'))
  getHello(@Query('url')url: string,
           @Query('currency')currency?: string,
           @Query('minRate')minRate?:number,
           @Query('maxRate')maxRate?:number
  ): Promise<JSON> {

    return this.appService.transformXNLtoJSON(url, currency, minRate, maxRate);}
}
