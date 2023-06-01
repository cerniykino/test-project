import { Injectable } from '@nestjs/common';
import {parseStringPromise} from 'xml2js';
import axios from "axios";

interface CurrencyRate{
    currency: string;
    rate: number;
}
interface JSON{
    time: string,
    currencyAndRate: CurrencyRate[]
}
interface ParsedData {
    Cube: Array<{ Cube: Array<{ Cube: Array<{ $: CurrencyRate }> }> }>;
}

@Injectable()
export class AppService {
    async transformXNLtoJSON(url: string, currency?: string, minRate?: number, maxRate?: number): Promise<JSON> {
        try {
            const dataXML = await axios.get(url);
            const data: ParsedData = await parseStringPromise(dataXML.data)
            let time:string = data['gesmes:Envelope'].Cube[0].Cube[0].$.time;

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

            let jsonData: JSON ={
                time: time,
                currencyAndRate: parsedXml
            }


            return jsonData;


        }
        catch (error){
            throw new Error(error.toString());
        }

    }
}
