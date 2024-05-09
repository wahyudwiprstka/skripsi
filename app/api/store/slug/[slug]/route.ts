import prisma from "@/utils/prisma";

export async function GET(req: Request, {params}: {params: {slug: string}}){
    const slug = params.slug;
    try {
        const res = await prisma.store.findUnique({
            where: {
                slug: slug,
            },
        });
        return Response.json(res, {status: 200});    
    } catch (error: any) {
        return Response.json(error.message, {status: 500});   
    }
}