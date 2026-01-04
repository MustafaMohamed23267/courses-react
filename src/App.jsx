import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { AppContext } from "./pages/components/AppContext";
import { Loading } from "./pages/components/Loading";

// 🔥 Lazy Pages
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseInfo = lazy(() => import("./pages/CourseInfo"));
const AddCourse = lazy(() => import("./pages/AddCourse"));
const UpdateCourse = lazy(() => import("./pages/UpdateCourse"));
const AddCategory = lazy(() => import("./pages/AddCategory"));
const UpdateCategory = lazy(()=> import("./pages/UpdateCategory"))
const NotFound = lazy(() => import("./pages/Notfound"));

function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<Home />} />

          <Route
            path="/dashboard"
            element={user?.id ? <Dashboard /> : <Home />}
          />

          <Route
            path="/register"
            element={user?.id ? <Home /> : <Register />}
          />

          <Route
            path="/login"
            element={user?.id ? <Home /> : <Login />}
          />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseInfo />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />

          <Route
            path="/addcourse"
            element={user && user.role !== "student" ? <AddCourse /> : <Home />}
          />

          <Route
            path="/addcategory"
            element={user?.role === "admin" ? <AddCategory /> : <Home />}
          />

          <Route
            path="/category/:id/update"
            element={user?.role === "admin" ? <UpdateCategory /> : <Home />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
