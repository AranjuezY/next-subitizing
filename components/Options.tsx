interface OptionsProps {
  optionList: string[];
  handleClick: (option: string) => void;
}

const Options: React.FC<OptionsProps> = ({ optionList, handleClick }) => {
  return (
    <div className="flex w-[400px] justify-between">
      {optionList.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className="px-8 py-2 bg-blue-500 text-white text-lg rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
