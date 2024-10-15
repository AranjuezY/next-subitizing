interface OptionsProps {
  optionList: string[];
  width: number;
  handleClick: (option: string) => void;
  isReady: boolean
}

const Options: React.FC<OptionsProps> = ({ optionList, width, handleClick, isReady }) => {
  return (
    <div className="flex justify-between" style={{ width: width }}>
      {optionList.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className={`px-8 py-1 text-lg rounded-md shadow-md transition duration-200 ${isReady
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
          disabled={!isReady}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
