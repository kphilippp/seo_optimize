import React from "react";

interface FormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  isLoading: boolean;
}

const Form: React.FC<FormProps> = (props) => {
  const [charCount, setCharCount] = React.useState(0);
  const charLimit = 32;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= charLimit) {
      props.setPrompt(newValue);
      setCharCount(newValue.length);
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center h-[40%] w-[450px] bg-white p-8 rounded-lg shadow-lg">
      <h1
        className="text-3xl font-bold text-gray-800"
        style={{ fontFamily: "var(--font-gs)" }}
      >
        SEOptimize
      </h1>
      <p
        className="text-gray-600 text-center"
        style={{ fontFamily: "var(--font-gambetta)" }}
      >
        {`Having a hard time thinking about keywords to help improve your brand's SEO optimization? You've come to the right place`}
      </p>
      <div className="flex flex-col gap-3 w-full px-6">
        <div className="flex relative">
          <input
            type="text"
            placeholder="coffee"
            value={props.prompt}
            onChange={handleInputChange}
            maxLength={charLimit}
            className="text-[var(--pmText)] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <div className="text-[var(--pmText)] text-sm absolute inset-y-0 right-3 flex items-center">
            {charCount}/{charLimit}
          </div>
        </div>
        {props.isLoading
          ? "bg-[var(--sdBg)] text-white p-2 rounded-md hover:bg-blue-600 transition"
          : "bg-[var(--sdBg)] text-white p-2 rounded-md hover:bg-blue-600 transition opacity-50"}
        <button
          onClick={props.handleSubmit}
          id="submitButton"
          type="button"
          className={`bg-[var(--sdBg)] text-white p-2 rounded-md hover:bg-blue-600 transition ${
            props.isLoading ? "opacity-50" : ""
          }`}
          disabled={props.isLoading}
        >
          {props.isLoading ? "Submit" : "Loading.."}
        </button>
      </div>
    </div>
  );
};

export default Form;
