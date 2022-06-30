import axios, { AxiosResponse } from "axios";
import { unsplashURL } from "../pages";
import { UnsplashSchema } from "../prisma/unsplash";

export const getAllUnsplash = async (): Promise<UnsplashSchema[] | null> => {
  if (!unsplashURL) return null;
  const unsplashResponse = await axios.get(unsplashURL);
  return unsplashResponse.data;
};

export const createNewUnsplash = async (payload: UnsplashSchema) => {
  if (!unsplashURL) return null;
  const createUnsplashResponse = await axios.post(unsplashURL, { ...payload });
  return createUnsplashResponse.data;
};
