import Wishlist from "./Wishlist";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavorites from "@/app/actions/getFavorites";
import EmptyState from "@/app/components/ui/EmptyState";

export const metadata = {
  title: "My Wishlist",
};

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return <EmptyState title={"No favorites place found"} />;
  }

  return <Wishlist favorites={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;