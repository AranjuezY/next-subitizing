import { login } from '@/features/auth/authSlice';
import { RootState } from '@/store/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LoginProps {
  onCreatePlayer: (playerId: number) => void;
}

const Login: React.FC<LoginProps> = ({ onCreatePlayer }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  const handleCreatePlayer = async () => {
    if (playerName.trim() === '') {
      alert('Please enter a valid name.');
      return;
    }

    // Dispatch the login action with the player's name
    const action = await dispatch(login(playerName));

    // Check if the login action was fulfilled
    if (login.fulfilled.match(action)) {
      const playerId = action.payload.id; // Assuming the payload contains the player object
      onCreatePlayer(playerId);
    } else if (login.rejected.match(action)) {
      alert(error); // Display error message
    }
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
