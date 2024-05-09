import { options } from "@/option";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(options);
    const data = await req.json();
    const slug = data.name + "_" + v4();
    const userId = session?.user.id;
    const res = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        description: data.description,
        phonenumber: data.phonenumber,
        image: data.image,
        userId,
        slug,
      },
    });
    return Response.json(
      { res },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message, userId }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await prisma.store.findMany({
      include: {
        user: true,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
