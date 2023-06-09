import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        title: {
          contains: "",
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(listings);
  } catch (error: any) {
    NextResponse.error();
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    guestCount,
    bathroomCount,
    location,
    price,
  } = body;

  if (!category) {
    return NextResponse.error();
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    id,
    title,
    description,
    imageSrc,
    category,
    roomCount,
    guestCount,
    bathroomCount,
    location,
    price,
  } = body;

  if (!category || !title || !description || !imageSrc) {
    return NextResponse.error();
  }

  const listing = await prisma.listing.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue: location.value,
      price: parseInt(price, 10),
    },
  });

  return NextResponse.json(listing);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.error();
  }

  try {
    const listing = await prisma.listing.deleteMany({
      where: {
        id: id,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.error();
  }
}
