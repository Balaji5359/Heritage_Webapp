import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import StatesPage from './pages/StatesPage.jsx'
import TemplesPage from './pages/TemplesPage.jsx'
import TempleDetailPage from './pages/TempleDetailPage.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/states" element={<StatesPage />} />
        <Route path="/states/:stateName" element={<TemplesPage />} />
        <Route path="/temple/:templeName" element={<TempleDetailPage />} />
      </Routes>
    </Router>
  )
}
