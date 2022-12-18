import { ReactElement } from "react";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

const Settings: NextPageWithLayout = () => {
  return (
    <div>
      <h1>設定画面</h1>
      <p>ああああ</p>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
