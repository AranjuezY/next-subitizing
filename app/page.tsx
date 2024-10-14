'use client';
import GameBoard from "@/components/GameBoard";
import Login from "@/components/Login";
import { login } from "@/features/auth/authSlice";
import Cookies from "js-cookie";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "@/components/Timer";
import Options from "@/components/Options";
import { generateOptions, generateRandomArray } from "@/lib/tools";
import ScatterPlot, { DataPoint } from "@/components/ScatterPlot";
import { RoundData, session } from "@/features/game/gameSlice";

const gridSize = 5;
const maxGrids = gridSize * gridSize;
const maxRounds = 20;

export default function Page() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<number>(0);
  const [newRound, setNewRound] = useState(true);
  const [dotsCount, setDotsCount] = useState(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [dotsArray, setDotsArray] = useState<number[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [dataList, setDataList] = useState<DataPoint[]>([]);
  const [gaming, setGaming] = useState(true);
  const [winCounts, setWinCounts] = useState<number[]>([0, 0]);
  const [roundCounts, setRoundCounts] = useState(0);

  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setHasMounted(true);
    const authToken = Cookies.get('auth');
    if (authToken) {
      console.log('logged in with token:', authToken);
      setIsAuthenticated(true);
      let [id, name] = authToken?.split(':');
      console.log(id);
      setPlayerId(Number(id));
    }
  }, []);

  useEffect(() => {
    if (newRound) {
      const randomDotsCount = Math.floor(Math.random() * 12) + 4;
      const randomArray = generateRandomArray(randomDotsCount, maxGrids);
      const randomOptions = generateOptions(randomDotsCount);
      setDotsCount(randomDotsCount);
      setDotsArray(randomArray);
      setOptions(randomOptions);
      setNewRound(false);
    }
  }, [newRound]);

  useEffect(() => {
    if (roundCounts === maxRounds) {
      setGaming(false);
    }
  }, [roundCounts]);

  const createPlayerHandler = async (name: string) => {
    if (name.trim() === '') {
      alert('Please enter a valid name.');
      return;
    }

    const action = await dispatch(login(name));

    if (login.fulfilled.match(action)) {
      setPlayerId(action.payload.id);
      setIsAuthenticated(true);
    } else if (login.rejected.match(action)) {
      console.error('Login failed:', error);
      alert(error);
    }
  };

  const gameBoardHandler = () => {
    setIsClicked(true);
  }

  const optionsHandler = (option: string) => {
    const isCorrect = option === dotsCount.toString();
    const newDataPoint: DataPoint = {
      x: dotsCount,
      y: elapsedTime,
      correct: isCorrect,
    };
    setDataList((prevDataList) => [...prevDataList, newDataPoint]);
    if (isCorrect) {
      alert('Correct!');
      setWinCounts([winCounts[0] + 1, winCounts[1]]);
    }
    else {
      alert('Incorrect!');
      setWinCounts([winCounts[0], winCounts[1] + 1]);
    }
    setIsClicked(false);
    setNewRound(true);
    setRoundCounts(roundCounts + 1);
  }

  const timerHandler = (time: number) => {
    setElapsedTime(time);
  }

  const gameHandler = async () => {
    const rounds: RoundData[] = dataList.map((data, index) => ({
      roundNumber: index + 1,
      dotsCount: data.x,
      timeSpent: data.y,
      isCorrect: data.correct,
    }));
    try {
      console.log('Sending game session of player ', playerId);
      const action = await dispatch(session({ playerId, rounds }));
      if (session.fulfilled.match(action)) {
        setRoundCounts(0);
        setWinCounts([0, 0]);
        setDataList([]);
        setGaming(true);
      }
    } catch (error: any) {
      console.error('Unexpected error occurred:', error);
    }
  }

  if (!hasMounted) {
    return null;
  }

  return (isAuthenticated ?
    <div>
      {gaming ? (
        <div className="flex flex-col items-center space-y-4 mt-10">
          <div
            onClick={gameBoardHandler}
            className="w-[400px] cursor-pointer shadow-2xl">
            <GameBoard gridSize={gridSize} randomArray={dotsArray} isClicked={isClicked} />
          </div>
          <Options optionList={options} handleClick={optionsHandler} />
          <Timer start={isClicked} onTimeUpdate={timerHandler} />
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-around w-72">
              <span className="text-xl font-normal text-green-500">correct: {winCounts[0]}</span>
              <span className="text-xl font-normal text-red-500">incorrect: {winCounts[1]}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col items-center w-[800px]">
            <ScatterPlot data={dataList} />
            <button className="px-8 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200"
              onClick={gameHandler}>
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
    :
    <Login
      onLogin={createPlayerHandler}
      status={status}
      error={error}
    />
  );
}
