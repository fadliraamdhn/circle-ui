import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ThreadPage from "./pages/ThreadPage"
import { Toaster } from "sonner"
import { Provider } from "react-redux";
import { store } from "@/store";

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
      </Routes>
      </Provider>
    </>
    
  )
}

export default App
