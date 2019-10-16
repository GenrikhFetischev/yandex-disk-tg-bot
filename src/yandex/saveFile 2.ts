import { folder } from "../config";
import { makeRequest, uploadFile } from "./utils";

export const saveFile = async ({
  file,
  fileName,
  ext,
  force,
}: {
  file: Buffer;
  fileName: string;
  ext: string;
  force?: boolean;
}): Promise<{ error?: string; success: boolean }> => {
  const { href, error } = await makeRequest({
    path: "resources/upload",
    parameters: {
      overwrite: String(Boolean(force)),
      path: `${folder}/${fileName}.${ext}`,
    },
  });

  if (error !== undefined) {
    return {
      error,
      success: false,
    };
  }

  const success = await uploadFile(file, href);
  return {
    success: Boolean(success),
  };
};
