import { Route, Routes } from "react-router-dom"
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

function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <Provider store={store}>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/thread/:threadId" element={<ThreadPage/>}/>
        <Route path="/profile" element={<UpdateProfilePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/follow" element={<FollowPage/>}/>
        <Route path="/me" element={<MyPage/>}/>
      </Routes>
      </Provider>
    </>
    
  )
}

export default App
