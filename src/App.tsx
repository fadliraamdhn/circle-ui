import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ThreadPage from "./pages/ThreadPage"
import SearchPage from "./pages/SearchPage"
import MyPage from "./pages/MyPage"
import { Toaster } from "sonner"
import { Provider } from "react-redux";
import { store } from "@/store";
import UpdateProfilePage from "./pages/UpdateProfilePage"
import FollowPage from "./pages/FollowPage"
import { AuthProvider } from "./context/auth"
import PrivateRoute from "./utils/privateRoute"
import LandingPage from "./pages/LandingPage"
import { getItemWithExpiry } from "./utils/localStorageWithExpiry"

function PublicRoute() {
    const isLoggedIn = getItemWithExpiry("isLoggedIn") === true;
    return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
}

function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/thread/:threadId" element={<ThreadPage/>}/>
            <Route path="/profile" element={<UpdateProfilePage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/follow" element={<FollowPage/>}/>
            <Route path="/me" element={<MyPage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
      </Provider>
    </>
    
  )
}

export default App
