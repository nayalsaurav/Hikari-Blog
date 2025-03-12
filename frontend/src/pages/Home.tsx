import { PenLine, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32 pt-20">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center flex flex-col justify-center items-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Share your stories with</span>
                <span className="block text-indigo-600">the world</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join Hikari's growing community of writers and readers. Create,
                share, and discover amazing stories from around the globe.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button className="w-full cursor-pointer flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Start Writing
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => {
                      navigate("/blogs");
                    }}
                    className="w-full cursor-pointer flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Explore Blogs
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-center">
                  <PenLine className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Write Your Story</h3>
                <p className="mt-2 text-gray-500">
                  Express yourself through words
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-center">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Join Community</h3>
                <p className="mt-2 text-gray-500">
                  Connect with fellow writers
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-center">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Read Stories</h3>
                <p className="mt-2 text-gray-500">
                  Discover unique perspectives
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
