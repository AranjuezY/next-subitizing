'use client';
import Leaderboard, { PlayerScore } from "@/components/LeaderBoard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [scores, setScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('/api/game/scores', {
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };
    fetchScores();
  }, []);

  return (
    <div>
      <Leaderboard scores={scores} />
    </div>
  )
}
