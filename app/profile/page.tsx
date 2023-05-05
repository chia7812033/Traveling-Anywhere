import getCurrentUser from "../actions/getCurrentUser";
import Profile from "./Profile";
import getProperties from "@/app/actions/getProperties";
import EmptyState from "@/app/components/EmptyState";

export const metadata = {
  title: "My Profile",
};

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title={"Not logged in"} subtitle={"Please login first"} />
    );
  }
  const properties = await getProperties(currentUser.id);

  return (
    <div className='pb-4'>
      <Profile user={currentUser} properties={properties} />
    </div>
  );
};

export default ProfilePage;
