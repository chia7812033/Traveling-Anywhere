import Profile from "./Profile";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getProperties from "@/app/utils/getProperties";

export const metadata = {
  title: "My Profile",
};

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }
  const properties = await getProperties(currentUser.id);

  return (
    <div className='pb-4'>
      <Profile user={currentUser} properties={properties} />
    </div>
  );
};

export default ProfilePage;
