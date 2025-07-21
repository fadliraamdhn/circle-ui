import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { Toaster } from "sonner"
import { ProfileProvider } from "./contexts/ProfileProvider"

function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <ProfileProvider>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
      </ProfileProvider>
    </>
    
  )
}

export default App
