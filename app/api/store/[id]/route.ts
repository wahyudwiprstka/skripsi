import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const res = await prisma.store.findUnique({
      where: {
        id,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const res = await prisma.store.delete({
      where: {
        id,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 404 });
  }
}
