import TelegramBot from "node-telegram-bot-api";
import getWeatherForecast from "./forecast.js";

const botToken = '6178032473:AAFOSUVCcL0mR5oDW4c6fbCwWWGunkcEDYQ';

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        await bot.sendMessage(chatId, 'Welcome to weather bot. Here you can see the weather in the city', {
            reply_markup: {
                keyboard: [['Forecast in London']],
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
        await bot.sendMessage(chatId, 'Please select the forecast interval:', {
            reply_markup: {
                keyboard: [['At intervals of 3 hours'], ['At intervals of 6 hours']],
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

