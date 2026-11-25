import { Route, Routes } from "react-router-dom"
import { GlassFilters } from "@/components/GlassFilters"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/LoginPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { SignupPage } from "@/pages/SignupPage"

function App() {
  return (
    <>
      <GlassFilters />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
