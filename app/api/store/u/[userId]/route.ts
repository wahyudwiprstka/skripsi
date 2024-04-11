import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, route: { params: { userId: string } }) {
  const userId = route.params.userId;
  try {
    const res = await prisma.store.findUnique({
      where: {
        userId,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
