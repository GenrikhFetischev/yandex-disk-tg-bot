import bot from './bot';
import {
  createSavePhotoHandler,
  createSavePhotoMenuMiddleware,
} from './messageHandlers';
import { CommandsList, avaliableCommands } from './messageHandlers';

import { CallbackDataStorage } from './messageHandlers/callback-data-storage';

const callbackDataStorage = new CallbackDataStorage();

console.clear();
bot.command(CommandsList.Commands, avaliableCommands);

bot.on('callback_query', createSavePhotoHandler(callbackDataStorage));

bot.on('photo', createSavePhotoMenuMiddleware(callbackDataStorage));

bot.launch();
