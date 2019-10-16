import Telegraf, { Markup } from "telegraf";
import secret from "../../secret";

const bot = new Telegraf(secret.tgToken);

export default bot;