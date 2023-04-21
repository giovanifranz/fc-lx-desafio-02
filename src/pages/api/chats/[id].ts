import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = Number(String(req.query.id));

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    try {
      const chat = await prisma.chat.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return res.status(200).json(chat);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Not Found" });
    }
  }
  res.status(405).json({ error: "Method Not Allowed" });
}
