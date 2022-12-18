import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="flex items-center h-14 border-b container">
        <Link href="/">
          <Image src="/logo.svg" width={160} height={32} alt="Logoipsum" />
        </Link>
        <span className="flex-1"></span>
        <span className="bg-slate-300 rounded-full w-9 h-9" />
      </div>
    </header>
  );
};

export default Header;
