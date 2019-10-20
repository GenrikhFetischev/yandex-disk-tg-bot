import Telegraf, { Markup } from "telegraf";


const bot = new Telegraf(process.env.TG_TOKEN);

export default bot;
