import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'

function App() {
  return (
    <div className="bg-[#faf7f2] min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
    </div>
  )
}

export default App