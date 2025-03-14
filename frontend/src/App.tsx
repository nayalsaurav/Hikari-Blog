import { Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import BlogsPage from "./pages/BlogsPage";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CreateBlogPage from "./pages/CreateBlogPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
