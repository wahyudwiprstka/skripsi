import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.productCategory.findMany();
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const res = await prisma.productCategory.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    console.log(res);
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
