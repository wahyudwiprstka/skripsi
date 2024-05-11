import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.product.findMany({
      include: {
        category: true,
        inventory: true,
      },
    });
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { variants, images, name, price, description, category, quantity, store } =
      await req.json();

    const slug = name.split(' ').join('_') + "_" + v4();

    const res = await prisma.product.create({
      data: {
        name,
        slug,
        price,
        description,
        category: {
          connect: {
            id: category,
          },
        },
        store: {
          connect: {
            id: store,
          },
        },
        inventory: {
          create: {
            quantity: quantity,
          },
        },
      },
      include: {
        category: true,
        inventory: true,
        ProductVariants: true,
      },
    });

    const addVariants = await prisma.productVariants.createMany({
      data: variants.map((variant) => ({
        name: variant.name,
        qty: variant.qty,
        productId: res.id,
      })),
    });

    const addImage = await prisma.productImages.createMany({
      data: images.map((image) => ({
        image: image.url,
        productId: res.id,
      })),
    });

    console.log("variants in api: " + JSON.stringify(variants));
    console.log("images in api: " + JSON.stringify(images));
    console.log("image upload api " + JSON.stringify(addImage));
    console.log("product id " + res.id);

    return Response.json(
      { message: { res, variants: addVariants, images: addImage } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const deleteImage = await prisma.productImages.deleteMany();
    const deleteVariants = await prisma.productVariants.deleteMany();
    const res = await prisma.product.deleteMany();
    return Response.json(res, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
