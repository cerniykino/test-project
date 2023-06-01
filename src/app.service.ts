import { Injectable } from '@nestjs/common';
import {parseStringPromise} from 'xml2js';
import axios from 'axios';
import {max, min} from "rxjs";

interface CurrencyRate{
    currency: string;
    rate: number;
}
 interface ParsedData {
        Cube: Array<{ Cube: Array<{ Cube: Array<{ $: CurrencyRate }> }> }>;
}

@Injectable()
export class AppService {

  async transformXNLtoJSON(url: string, currency?: string, minRate?: number, maxRate?: number): Promise<CurrencyRate[]> {
      try {
          const xmlData = await axios.get(url);
          const data: ParsedData = await parseStringPromise(xmlData.data);

          let parsedXml: CurrencyRate[] = data[
              'gesmes:Envelope'
              ].Cube[0].Cube[0].Cube.map(({$}) => {
                  return{
                      currency: $.currency,
                      rate: $.rate,
                  };
          });



          parsedXml = parsedXml.filter((currencyAndRate) => {
              const rate = Number(currencyAndRate.rate);


              const currencyCondition = currency ? currencyAndRate.currency.includes(currency) : true;
              const minRateCondition = minRate ? rate >= minRate : true;
              const maxRateCondition = maxRate ? rate <= maxRate : true;
              return currencyCondition && minRateCondition && maxRateCondition;
          });




          return parsedXml;


      }
      catch (error){
          throw new Error(error.toString());
      }

  }
}
