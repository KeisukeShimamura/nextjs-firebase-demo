import Button from "../components/button";

const LoginPage = () => {
  return (
    <div>
      <h1>ログイン</h1>

      <Button
        type="button"
        onClick={() => {
          alert();
        }}
      >
        ログインする
      </Button>
    </div>
  );
};

export default LoginPage;
