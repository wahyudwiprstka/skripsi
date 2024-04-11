import { PrismaClient, ProductImages } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.productImages.findMany({
      include: {
        product: true,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const images = data.images;
//     const productId = data.productId;
//     console.log(productId);
//     const res = await prisma.productImages.createMany({
//       data: images.map((image: any) => ({
//         image: image.url,
//         productId
//       })),
//     });
//     console.log(res);
//     return Response.json(res, { status: 200 });
//   } catch (error: any) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }
