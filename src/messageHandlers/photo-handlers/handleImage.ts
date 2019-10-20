import { Context, ContextMessageUpdate, Middleware } from "telegraf";
import { v4 } from "uuid";

import { CallbackDataStorage } from "../callback-data-storage";
import {
  ButtonDescriptor,
  callbackButtonsCreator,
} from "../utils/callback-buttons-creator";
import { Commands } from "./types";

const checkIfPhotoExist = ({ message: { photo: photos } }: Context) =>
  Array.isArray(photos) && photos.length > 0;

export const createSavePhotoMenuMiddleware = (
  callbackDataStorage: CallbackDataStorage,
): Middleware<ContextMessageUpdate> => async (ctx, next) => {
  if (checkIfPhotoExist(ctx)) {
    const photoLink = ctx.message.photo[ctx.message.photo.length - 1].file_id;

    const buttons: ButtonDescriptor[] = [
      {
        text: Commands.Save,
        actionId: v4(),
        callbackData: {
          type: "save",
          payload: photoLink,
        },
      },
      {
        text: Commands.NoSave,
        actionId: v4(),
        callbackData: {
          type: "noSave",
          payload: "Ok!",
        },
      },
    ];

    ctx.reply(
      "Do you want to save this photo?",
      callbackButtonsCreator(buttons, callbackDataStorage),
    );
  } else {
    return next();
  }
};
