import { Feather } from "lucide-react";
import { useState } from "react";
import { Search, Bell, Edit, Menu, X } from "lucide-react";
import { Link } from "react-router";

export const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full fixed top-0">
      <nav
        className="border-b border-gray-200 w-full top-0 bg-white z-50"
        role="navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <Feather className="h-8 w-8 text-black" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Hikari
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="search"
                  placeholder="Search Hikari"
                  aria-label="Search Medium"
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-base w-64 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                />
              </div>

              <button
                className="cursor-pointer flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-full hover:border-gray-900 text-base min-h-11 transition-colors"
                aria-label="Write a story"
              >
                <Edit size={18} />
                Write
              </button>

              <button
                className="w-10 h-10 cursor-pointer rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium text-base hover:opacity-90 transition-opacity"
                aria-label="Open profile menu"
              >
                JS
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="px-4 py-6 space-y-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="search"
                placeholder="Search Medium"
                aria-label="Search Medium"
                className="pl-10 pr-4 py-3 bg-gray-100 rounded-full text-base w-full focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
              />
            </div>

            <nav className="space-y-4">
              <Link
                to="#"
                className="flex cursor-pointer items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit size={20} />
                Write a story
              </Link>
            </nav>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-3 py-2">
                <button
                  className="w-12 h-12 cursor-pointer rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium text-lg hover:opacity-90 transition-opacity"
                  aria-label="Open profile menu"
                >
                  JS
                </button>
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-500">@johnsmith</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
