import React from "react";

interface Inputs {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  label,
  type,
  value,
  name,
  placeholder,
  onChangeHandler,
}: Inputs) => {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={label}
        className="block mb-2 text-md font-medium text-gray-900 capitalize"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={name}
        value={value}
        onChange={onChangeHandler}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    placeholder-gray-400 
                    "
        required
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
