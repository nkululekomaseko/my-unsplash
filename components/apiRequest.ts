import axios, { AxiosResponse } from "axios";
import { unsplashURL } from "../pages";
import { UnsplashSchema } from "../prisma/unsplash.service";

export const getAllUnsplash = async (
  filterQuery?: string
): Promise<any[] | null> => {
  if (!unsplashURL) return null;
  let unsplashResponse;
  if (!!filterQuery)
    unsplashResponse = await axios.get(
      `${unsplashURL}?filterQuery=${filterQuery}`
    );
  else unsplashResponse = await axios.get(unsplashURL);
  return unsplashResponse.data;
};

export const createNewUnsplash = async (payload: UnsplashSchema) => {
  if (!unsplashURL) return null;
  try {
    const createUnsplashResponse = await axios.post(unsplashURL, {
      ...payload,
    });
    return createUnsplashResponse.data;
  } catch (error: any) {
    return error;
  }
};

export const deleteUnsplash = async (imageId: string) => {
  if (!unsplashURL) return null;
  try {
    const deleteUnsplashResponse = await axios.delete(
      `${unsplashURL}?id=${imageId}`,
      { data: { candidatePassword: "123456" } }
    );
    return deleteUnsplashResponse.data;
  } catch (error: any) {
    return error;
  }
};
