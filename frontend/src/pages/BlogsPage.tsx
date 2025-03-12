import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils";
import { Loader2, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "../components/BlogCard";
import { MainNavBar } from "../components/MainNavBar";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    fullName: string;
  };
}

interface PaginationInfo {
  totalBlogs: number;
  currentPage: number;
  totalPages: number;
}

interface BlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination: PaginationInfo;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalBlogs: 0,
    currentPage: 1,
    totalPages: 1,
  });

  const fetchBlogs = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<BlogsResponse>(
        `${baseUrl}/blog/bulk?page=${page}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setBlogs(response.data.data || []);
        setPagination(response.data.pagination);
      } else {
        setError(response.data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      setError("Failed to fetch blogs. Please try again later.");
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
    }
  };

  return (
    <div className="">
      <MainNavBar />
      <div className="min-h-screen bg-white p-6 mt-13 max-w-[1200px] mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1> */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => fetchBlogs(pagination.currentPage)}
              className="mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 flex items-center justify-center"
            >
              <RefreshCcw size={16} className="mr-2" /> Try Again
            </button>
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="space-y-7">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  author={blog.author.fullName}
                  publishedDate={new Date(blog.createdAt).toLocaleDateString()}
                  heading={blog.title}
                  description={blog.content}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-md ${
                        pagination.currentPage === page
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Showing results text */}
            <div className="text-center mt-4 text-gray-500 text-sm">
              Showing {blogs.length} of {pagination.totalBlogs} blogs
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">No blogs available.</div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
