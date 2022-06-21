import { prisma } from "../lib/prisma";
import argon2 from "argon2";

export type UnsplashSchema = {
  label: string;
  imageUrl: string;
  password: string;
};

// READ
export const getAllUnsplash = async () => {
  const unsplashList = await prisma.unsplash.findMany({});
  return unsplashList;
};

export const getUnsplashById = async (id: string) => {
  const unsplash = await prisma.unsplash.findUnique({ where: { id } });
  return unsplash;
};

// CREATE
export const createUnsplash = async (payload: UnsplashSchema) => {
  const hashedPassword = await argon2.hash(payload.password);
  const unsplash = await prisma.unsplash.create({
    data: {
      label: payload.label,
      imageUrl: payload.imageUrl,
      password: hashedPassword,
    },
  });

  return unsplash;
};

// DELETE
export const deleteUnsplashById = async (id: string) => {
  const unsplash = await prisma.unsplash.delete({ where: { id } });
  return unsplash;
};
