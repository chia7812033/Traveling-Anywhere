"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

interface ReservationsProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

const Reservations: React.FC<ReservationsProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const onCancel = useCallback(
    (id: string) => {
      axios
        .patch(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Cancel successfully");
          router.refresh();
        })
        .catch((err) => toast.error(err.message));
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title='Your all reservations'
        subtitle='These are all reservations comes from all over the world'
      />
      <div
        className='
          py-8
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8'
      >
        {reservations.map((res) => (
          <div className='col-span-1 flex flex-col gap-2' key={res.id}>
            <ListingCard
              key={res.id}
              data={res.listing}
              reservation={res}
              actionId={res.id}
              actionLabel={
                res.status === "Cancel" ? "Already Canceled" : "Cancel"
              }
              onAction={res.status === "Cancel" ? () => {} : onCancel}
              currentUser={currentUser}
              disabled={res.status === "Cancel"}
            />
            <div className='text-center'>
              By{" "}
              <span className='hover:underline cursor-pointer'>
                {res.user.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Reservations;