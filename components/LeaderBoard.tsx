import React from 'react';

export interface PlayerScore {
  id: number;
  name: string;
  score: number;
  date: string;
}

interface LeaderboardProps {
  scores: PlayerScore[]
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Rank</th>
            <th className="py-2 px-4 text-left">Player</th>
            <th className="py-2 px-4 text-left">Score</th>
            <th className="py-2 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{player.name}</td>
              <td className="py-2 px-4">{player.score}</td>
              <td className="py-2 px-4">{player.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
