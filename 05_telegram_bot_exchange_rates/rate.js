import axios from "axios";
import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 60 });

export async function getExchangeRatesMonobank(currency) {
    const api = 'https://api.monobank.ua/bank/currency'
    const cacheKey = `monobank: ${currency}`;
    try {
        const cacheRates = await myCache.get(cacheKey);
        if (cacheRates) {
            console.log('Retrieving exchange rates from cache...');
            return cacheRates;
        }  
        const response = await axios.get(api);
        const rates = response.data;
        const rate = rates.find(currencyRate => currencyRate.currencyCodeA === currency);
        const rateBuySell = `Monobank: \nBuy: ${rate.rateBuy}\nSell: ${rate.rateSell}`
        myCache.set(cacheKey, rateBuySell);
        console.log('Exchange rates stored in cache.');
        return rateBuySell;
    } catch (error) {
        console.log('Error retrieving exchange rates: ', error);
    }
}

export async function getExchangeRatesPrivat(currency) {
    const api = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11';
    try {
        const response = await axios.get(api);
        const rates = response.data;
        const rate = rates.find(currencyRate => currencyRate.ccy === currency);
        const rateBuySell = `PrivatBank: \nBuy: ${rate.buy}\nSell: ${rate.sale}`
        return rateBuySell;
    } catch (error) {
        console.log('Error retrieving exchange rates: ', error);
    }
}