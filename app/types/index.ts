import {
  User,
  Listing,
  Reservation,
  Review,
  Rating,
  Chat,
  Message,
} from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified?: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing" | "user"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  user: SafeUser;
};

export type SafeReview = Omit<Review, "createdAt" | "user"> & {
  createdAt: string;
  user: SafeUser;
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type ChatType = Chat & {
  users: User[];
  messages: FullMessageType[];
};
