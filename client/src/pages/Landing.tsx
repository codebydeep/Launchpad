import Footer3 from "@/components/footer"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/images/bg-pattern.png"
import ButtonLanding from "@/components/button-landing"
import StatsSection from "@/components/stats"
import Features from "@/components/features"

const Landing = () => {
  const navigate = useNavigate()

  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-4 px-4 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-14 text-center">
          
          <ButtonLanding />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug font-semibold tracking-wide manrope">
            Where <span className="cursive text-[#d7742d]">Students</span> Meet Opportunities
          </h1>

          <p className="max-w-xs sm:max-w-md md:max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 mt-2">
            Explore internships, startup jobs, events, scholarships, and
            career-building programs designed to help students grow faster.
          </p>

          <Button
            variant="outline"
            className="mt-4 cursor-pointer border-none bg-[#e86100] 
            px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 
            text-sm sm:text-base md:text-lg 
            text-white hover:bg-white hover:text-black 
            font-medium rounded-lg transition-colors duration-200"
            onClick={() => navigate("/signup")}
          >
            Get started <span className="text-black cursive">- it's free</span>
          </Button>
        </div>
        <StatsSection />
      </div>

      <Features />

      <Footer3 />
    </>
  )
}

export default Landing