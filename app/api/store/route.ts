import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const res = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        description: data.description,
        phonenumber: data.phonenumber,
        image: data.image,
      },
    });
    return Response.json(
      { message: "Store created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
}

export async function GET() {
  try {
    const res = await prisma.store.findMany();
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
