import React from "react";
import { User, Bookmark } from "lucide-react";

interface BlogCardProps {
  author: string;
  publishedDate: string;
  heading: string;
  description: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  author,
  publishedDate,
  heading,
  description,
}) => {
  return (
    <article className="group cursor-pointer">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8">
        <div className="flex-1 space-y-4">
          {/* Author Info */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={16} className="text-gray-500" />
            </div>
            <span className="text-base font-medium">{author}</span>
            <span className="text-gray-400">·</span>
            <time className="text-base text-gray-500">{publishedDate}</time>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
              {heading}
            </h2>
            <p className="text-gray-600 line-clamp-3 text-base sm:text-lg">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-base text-gray-500">8 min read</span>
              <button className="px-4 py-1.5 text-base bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                Technology
              </button>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors min-w-[2.75rem] min-h-[2.75rem] flex items-center justify-center">
              <Bookmark size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="w-full sm:w-48 h-48 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 order-first sm:order-last">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
        </div>
      </div>
    </article>
  );
};
