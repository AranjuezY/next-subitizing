import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:underline">Game</Link>
        </li>
        <li>
          <Link href="/leaderboard" className="text-white hover:underline">Leaderboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
