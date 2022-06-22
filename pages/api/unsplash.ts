// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UnsplashSchema } from "../../prisma/unsplash";
import {
  getAllUnsplash,
  getUnsplashById,
  createUnsplash,
  deleteUnsplashById,
} from "../../prisma/unsplash";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<UnsplashSchema | UnsplashSchema[]>
) {
  try {
    switch (request.method) {
      case "GET": {
        if (request.query.id) {
          const unsplash = await getUnsplashById(request.query.id as string);
          if (!!unsplash) {
            return response.status(200).json(unsplash);
          } else {
            return response.status(404); // Not Found
          }
        } else {
          const unsplash = await getAllUnsplash();
          if (!!unsplash) {
            return response.status(200).json(unsplash);
          } else {
            return response.status(404); // Not Found
          }
        }
      }
      case "POST": {
        const unsplash = await createUnsplash({ ...request.body });
        return response.status(200).json(unsplash);
      }
      case "DELETE": {
        const { candidatePassword } = request.body;
        if (!!candidatePassword && !!request.query.id) {
          const unsplash = await deleteUnsplashById(
            request.query.id as string,
            candidatePassword
          );
          if (!!unsplash) {
            return response.status(200).json(unsplash);
          } else {
            return response.status(404); // Not Found
          }
        }
      }
      default: {
        return response.status(405); // Method not allowed
      }
    }
  } catch (error: any) {
    return response.status(500).json({ ...error, message: error.message }); // Internal Server Error
  }
}
