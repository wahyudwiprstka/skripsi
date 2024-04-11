import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function GET(req: Request, route: { params: { id: string } }) {
  const id: string = route.params.id;
  console.log(id);
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
