import { ContextMessageUpdate } from 'telegraf';
import bot from '../../../bot';
import { saveFile } from '../../../yandex';
import { CallbackDataStorage } from '../../callback-data-storage';

export const createSavePhotoHandler = (
  callbackDataStorage: CallbackDataStorage,
) => async (ctx: ContextMessageUpdate, next: any) => {
  try {
    const { callback_query } = ctx.update;
    if (callback_query !== undefined && callback_query.data !== undefined) {
      const callbackData = callbackDataStorage.dataMap.get(callback_query.data);

      if (callbackData === undefined) {
        return next();
      }

      const fileLink = await bot.telegram.getFileLink(callbackData.data);

      // @ts-ignore
      const file = await fetch(fileLink).then(r => r.buffer());

      const res = await saveFile({
        ext: 'jpeg',
        file,
        fileName: String(callback_query.data),
      });

      if (res.error) {
        throw Error(res.error);
      }
      ctx.reply('Saved!');
    }
  } catch (e) {
    console.log(e);
    ctx.reply('Error while saving file!');
  }
};
