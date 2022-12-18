import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/auth";
import UserMenu from "./user-menu";

const Header = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <header>
      <div className="flex items-center h-14 border-b container">
        <Link href="/">
          <Image src="/logo.svg" width={160} height={32} alt="Logoipsum" />
        </Link>
        <span className="flex-1"></span>
        {user ? <UserMenu /> : <Link href="/login">ログイン</Link>}
      </div>
    </header>
  );
};

export default Header;
