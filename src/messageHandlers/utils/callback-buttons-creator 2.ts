import { CallbackDataStorage } from '../callback-data-storage';
import { Markup } from 'telegraf';

export interface ButtonDescriptor {
  text: string;
  actionId: string;
  callbackData?: any;
}

export const callbackButtonsCreator = (
  buttons: ButtonDescriptor[],
  callbackDataStorage: CallbackDataStorage,
) => {
  const preparedButtons = buttons.map(({ actionId, callbackData, text }) => {
    callbackDataStorage.dataMap.set(actionId, callbackData);
    return {
      text,
      hide: false,
      callback_data: actionId,
    };
  });

  return Markup.inlineKeyboard(preparedButtons)
    .oneTime()
    .resize()
    .extra();
};
