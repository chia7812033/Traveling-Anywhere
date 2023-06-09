import ListingCard from "./components/listings/ListingCard";
import Container from "./components/ui/Container";
import EmptyState from "./components/ui/EmptyState";
import ListingContainer from "./components/ui/ListingContainer";
import Loading from "./loading";
import getCurrentUser from "./utils/getCurrentUser";
import getLisings from "./utils/getLisings";
import { Suspense } from "react";

interface HomeProps {
  searchParams: { search: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getLisings(searchParams.search);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState />;
  }

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <ListingContainer>
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </ListingContainer>
      </Suspense>
    </Container>
  );
}
