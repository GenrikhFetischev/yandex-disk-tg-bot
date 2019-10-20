import { ContextMessageUpdate } from "telegraf";
import bot from "../../bot";
import { saveFile } from "../../yandex";
import { CallbackDataStorage } from "../callback-data-storage";

export const createSavePhotoHandler = (
  callbackDataStorage: CallbackDataStorage,
) => async (ctx: ContextMessageUpdate, next: any) => {
  try {
    const { callback_query } = ctx.update;
    if (callback_query !== undefined && callback_query.data !== undefined) {
      const savedData = callbackDataStorage.dataMap.get(callback_query.data);

      if (savedData === undefined) {
        return next();
      }

      if (savedData.type === "noSave") {
        return ctx.reply(savedData.payload);
      }

      const fileLink = await bot.telegram.getFileLink(savedData.payload);
      // @ts-ignore
      const file: Buffer = await fetch(fileLink).then((r) => r.buffer());

      const date = new Date();
      const dateString = `${date.getDate()}-${date.getMonth() +
        1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

      const res = await saveFile({
        ext: "jpeg",
        file,
        fileName: `from-${callback_query.from.username}-date-${dateString}`,
      });

      if (res.error) {
        throw Error(res.error);
      }
      ctx.reply("Saved!");
    }
  } catch (e) {
    console.log(e);
    ctx.reply("Error while saving file!");
  }
};
