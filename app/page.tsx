'use client';
import GameBoard from "@/components/GameBoard";
import Login from "@/components/Login";
import { useState } from "react";

export default function Page() {
  const [playerId, setPlayerId] = useState<number>(0);

  return (playerId ?
    <GameBoard /> :
    <Login onCreatePlayer={playerId => setPlayerId(playerId)} />
  )
}
