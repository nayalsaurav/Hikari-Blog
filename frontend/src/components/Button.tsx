const Button = ({ label }: { label: string }) => {
  return (
    <button className="bg-black text-white font-semibold py-2 w-full capitalize rounded-lg cursor-pointer mt-2 hover:bg-slate-700 transition-all duration-300">
      {label}
    </button>
  );
};

export default Button;
