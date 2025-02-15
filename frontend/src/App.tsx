import { Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import BlogsPage from "./pages/BlogsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </>
  );
}

export default App;
