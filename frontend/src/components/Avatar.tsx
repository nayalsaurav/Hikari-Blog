export const Avatar = () => {
  const img: Boolean = false;
  return (
    <div>
      {img ? (
        <img
          className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src="/docs/images/people/profile-picture-5.jpg"
          alt="Bordered avatar"
        />
      ) : (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            JL
          </span>
        </div>
      )}
    </div>
  );
};
