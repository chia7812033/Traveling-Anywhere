import prisma from "@/app/libs/prismadb";

export default async function getLisings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const SafeListing = listings.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));

    return listings;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
