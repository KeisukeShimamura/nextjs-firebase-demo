import React, { ReactElement } from "react";
import Layout from "../components/layout";
import PostForm from "../components/post-form";
import { NextPageWithLayout } from "./_app";

const CreatePost: NextPageWithLayout = () => {
  return (
    <div className="container mt-6">
      <PostForm isEditMode={false} />
    </div>
  );
};

CreatePost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreatePost;
