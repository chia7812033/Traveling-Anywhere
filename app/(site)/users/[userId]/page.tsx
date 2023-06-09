import User from "./User";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getProperties from "@/app/utils/getProperties";
import getUserById from "@/app/utils/getUserById";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface IParams {
  userId: string;
}

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const { userId } = params;
  const user = await getUserById(userId as string);

  return {
    title: `${user?.name}'s profile` || "User not found",
  };
}

const UserPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const { userId } = params;
  if (currentUser?.id === userId) {
    redirect("/profile");
  }
  const user = await getUserById(userId as string);
  const properties = await getProperties(userId);

  if (!user) {
    return (
      <div>
        <EmptyState title='User does not exist' />
      </div>
    );
  }

  return (
    <div className='pb-4'>
      <User user={user} properties={properties} />
    </div>
  );
};

export default UserPage;
