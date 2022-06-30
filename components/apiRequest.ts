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
  const createUnsplashResponse = await axios.post(unsplashURL, { ...payload });
  return createUnsplashResponse.data;
};
