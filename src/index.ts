import bot from "./bot";
import {
  createSavePhotoHandler,
  createSavePhotoMenuMiddleware,
} from "./messageHandlers";

import { CallbackDataStorage } from "./messageHandlers/callback-data-storage";

const callbackDataStorage = new CallbackDataStorage();

bot.on("callback_query", createSavePhotoHandler(callbackDataStorage));

bot.on("photo", createSavePhotoMenuMiddleware(callbackDataStorage));

bot.launch();
