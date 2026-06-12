import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import FeaturesSection from './components/FeaturesSection'
import PathwaysSection from './components/PathwaysSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Pathways from './pages/Pathways'
import PathwayDetail from './pages/PathwayDetail'
import LevelDetail from './pages/LevelDetail'
import Profile from './pages/Profile'
import Achievements from './pages/Achievements'
import Certificates from './pages/Certificates'


function LandingPage() {
  return (
    <div className="bg-[#1a1a1a] min-h-screen text-[#eff1f6] flex flex-col">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PathwaysSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/pathway/:id" element={<PathwayDetail />} />
        <Route path="/pathway/:pathwayId/level/:levelId" element={<LevelDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/certificates" element={<Certificates />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App