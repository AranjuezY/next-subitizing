import React, { useState } from 'react';

interface LoginProps {
  onLogin: (playerName: string) => void;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, status, error }) => {
  const [playerName, setPlayerName] = useState<string>('');

  const handleCreatePlayer = async () => {
    onLogin(playerName);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Enter Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="px-4 py-2 mb-4 w-64 border rounded-lg border-gray-300"
      />
      <button
        onClick={handleCreatePlayer}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        disabled={status === 'loading'} // Disable button while loading
      >
        {status === 'loading' ? 'Loading...' : 'Start Game'}
      </button>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

export default Login;
