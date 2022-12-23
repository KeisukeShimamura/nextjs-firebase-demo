import React, { ReactElement } from "react";
import Layout from "../components/layout";
import UserForm from "../components/user-form";

const CreateAccount = () => {
  return <UserForm isEditMode={false} />;
};

CreateAccount.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateAccount;
