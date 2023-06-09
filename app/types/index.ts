import {
  User,
  Listing,
  Reservation,
  Review,
  Chat,
  Message,
  Rating,
} from "@prisma/client";

export type ListingTypeWithRating = Listing & {
  ratings: Rating[];
};

export type SafeReservation = Reservation & {
  listing: Listing;
  user: User;
};

export type SafeReview = Review & {
  user: User;
};

export type ChatType = Chat & {
  users: User[];
  messages: Message[];
};
