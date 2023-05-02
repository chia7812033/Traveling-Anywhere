import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const SafeReservations = reservations.map((res) => ({
      ...res,
      createdAt: res.createdAt.toISOString(),
      startDate: res.startDate.toISOString(),
      endDate: res.endDate.toISOString(),
      listing: {
        ...res.listing,
        createdAt: res.listing.createdAt.toISOString(),
      },
      user: {
        ...res.user,
        createdAt: res.user.createdAt.toISOString(),
        updatedAt: res.user.updatedAt.toISOString(),
        emailVerified: res.user.emailVerified?.toISOString(),
      },
    }));

    return SafeReservations;
  } catch (error: any) {
    throw new Error(error.message);
  }
}