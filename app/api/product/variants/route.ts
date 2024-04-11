import { PrismaClient, ProductVariants } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.productVariants.findMany({
      include: {
        product: true,
      },
    });
    return Response.json(res);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const { variants, productId } = await req.json();
//     console.log(productId);
//     const addVariants = await prisma.productVariants.createMany({
//       data: [
//         variants.map((variant: ProductVariants) => ({
//           name: variant.name,
//           qty: variant.qty,
//           productId,
//         })),
//       ],
//     });
//     console.log(addVariants);
//     return Response.json(addVariants);
//   } catch (error: any) {
//     return Response.json(error, { status: 500 });
//   }
// }
