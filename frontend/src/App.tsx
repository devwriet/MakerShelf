import { Route, Routes } from "react-router-dom"
import { GlassFilters } from "@/components/GlassFilters"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/LoginPage"
import { SignupPage } from "@/pages/SignupPage"
import { CreatorsListPage } from "@/pages/CreatorsListPage"
import { CreatorFormPage } from "@/pages/CreatorFormPage"

function App() {
  return (
    <>
      <GlassFilters />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/creators" element={<CreatorsListPage />} />
        <Route path="/creators/new" element={<CreatorFormPage />} />
        <Route path="/creators/:id/edit" element={<CreatorFormPage />} />
      </Routes>
    </>
  )
}

export default App
