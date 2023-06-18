import { Command } from "commander";
import TelegramBot from "node-telegram-bot-api";

const botToken = '6178032473:AAFOSUVCcL0mR5oDW4c6fbCwWWGunkcEDYQ';

const bot = new TelegramBot(botToken, { polling: true });

const program = new Command();

program
  .command('m <message>')
  .description('Send a message to the Telegram bot')
  .action(async (message) => {
    try {
      await bot.sendMessage('332850551', message);
      console.log('Message sent successfully');
      process.exit(0); 
    } catch (error) {
      console.error('Failed to send message:', error);
      process.exit(1); 
    }
  });


program
  .command('p <photo>')
  .description('Send a photo to the Telegram bot')
  .action(async (photoPath) => {
    try {
      await bot.sendPhoto('332850551', photoPath);
      console.log('Photo sent successfully');
      process.exit(0); 
    } catch (error) {
      console.error('Failed to send photo:', error);
      process.exit(1); 
    }
  });

program.parse(process.argv);