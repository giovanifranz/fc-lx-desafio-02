import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { mensagem } = JSON.parse(req.body) as {
      mensagem: string | undefined;
    };

    if (!mensagem) {
      return res.status(400).json({ error: "Invalid mensagem" });
    }

    try {
      const chat = await prisma.chat.create({
        data: {
          mensagem,
        },
      });

      return res.status(201).json(chat);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error on save" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
