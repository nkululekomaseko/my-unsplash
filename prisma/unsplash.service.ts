import { prisma } from "../lib/prisma";
import argon2 from "argon2";

export type UnsplashSchema = {
  label: string;
  imageUrl: string;
  password: string;
};

// READ
export const getAllUnsplash = async (filterQuery?: string) => {
  let unsplashList;

  if (!!filterQuery) {
    unsplashList = await prisma.unsplash.findMany({
      where: {
        label: {
          contains: filterQuery,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    unsplashList = await prisma.unsplash.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
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
export const deleteUnsplashById = async (
  id: string,
  candidatePassword: string
) => {
  const unsplashResponse = await getUnsplashById(id);
  console.log(
    `unsplashResponse From DB: ${JSON.stringify(unsplashResponse, null, 2)}`
  );
  console.log(`Candidate Password from Front End: ${candidatePassword}`);
  if (!!unsplashResponse) {
    const argonResponse = await argon2.verify(
      unsplashResponse.password,
      candidatePassword
    );
    console.log(`Argon2 Response: ${argonResponse}`);
    if (!!argonResponse) {
      const unsplash = await prisma.unsplash.delete({ where: { id } });
      return { argon: true, unsplash };
    } else {
      return { argon: false };
    }
  }
  return null;
};

export const validatePassword = async (
  id: string,
  candidatePassword: string
): Promise<boolean> => {
  const unsplash = await prisma.unsplash.findUnique({ where: { id } });
  if (!!unsplash) {
    return await argon2.verify(unsplash.password, candidatePassword);
  }

  return false;
};
