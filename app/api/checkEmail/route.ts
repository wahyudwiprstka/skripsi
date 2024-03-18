import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
    });
    if (user) {
      return Response.json({ message: "User already exists" }, { status: 200 });
    }
    return Response.json({ message: "User does not exist" }, { status: 500 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
