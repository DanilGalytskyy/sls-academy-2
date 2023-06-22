import TelegramBot from "node-telegram-bot-api";
import getWeatherForecast from "./forecast.js";
import { getExchangeRatesMonobank, getExchangeRatesPrivat } from "./rate.js";
const botToken = '6178032473:AAFOSUVCcL0mR5oDW4c6fbCwWWGunkcEDYQ';

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/(\/start|Back)/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        await bot.sendMessage(chatId, 'Choose a function:', {
            reply_markup: {
                keyboard: [['Forecast in London'], ['Exchange Rates']],
                resize_keyboard: true,
            },
        });
    } catch (error) {
        console.error('Failed to send message:', error);
    }
});

bot.onText(/Forecast in London/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        await bot.sendMessage(chatId, 'Please choose the forecast interval:', {
            reply_markup: {
                keyboard: [['At intervals of 3 hours' , 'At intervals of 6 hours'], ['Back']],
                resize_keyboard: true,
            },
        });
    } catch (error) {
        console.error('Failed to send message:', error);
    }
});

bot.onText(/At intervals of (3|6) hours/, async (msg, match) => {
    const chatId = msg.chat.id;
    const interval = match[1] === '3' ? 3 : 6;
    try {
        const forecast = await getWeatherForecast(interval);
        bot.sendMessage(chatId, forecast);
    } catch (error) {
        bot.sendMessage(chatId, 'Failed to fetch the weather forecast.');
        console.error(error);
    }
});

bot.onText(/Exchange Rates/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        await bot.sendMessage(chatId, 'Please choose the currency you desire:', {
            reply_markup: {
                keyboard: [['USD' , 'EUR'], ['Back']],
                resize_keyboard: true,
            },

        });
    } catch (error) {
        console.error('Failed to send message:', error);
    }
});

bot.onText(/At intervals of (3|6) hours/, async (msg, match) => {
    const chatId = msg.chat.id;
    const interval = match[1] === '3' ? 3 : 6;
    try {
        const forecast = await getWeatherForecast(interval);
        bot.sendMessage(chatId, forecast);
    } catch (error) {
        bot.sendMessage(chatId, 'Failed to fetch the weather forecast.');
        console.error(error);
    }
});

bot.onText(/(USD|EUR)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const currencyMono = match[1] === 'USD' ? 840 : 978;
    try {
        const rateMono = await getExchangeRatesMonobank(currencyMono);
        const ratePrivat = await getExchangeRatesPrivat(match[1]);
        const result = `${rateMono}\n${ratePrivat}`;
        bot.sendMessage(chatId, result);
    } catch (error) {
        bot.sendMessage(chatId, 'Failed to get exchange rates.');
        console.error(error);
    }
});