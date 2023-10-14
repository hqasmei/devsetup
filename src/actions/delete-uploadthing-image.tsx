import { utapi } from 'uploadthing/server';

export const deleteUploadThingImage = async (fileKey: string) => {
  const result = await utapi.deleteFiles(fileKey);

  return result;
};
