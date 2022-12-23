import { ReactElement } from "react";
import Layout from "../components/layout";
import UserForm from "../components/user-form";
import { NextPageWithLayout } from "./_app";

const Profile: NextPageWithLayout = () => {
  return <UserForm isEditMode />;
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
