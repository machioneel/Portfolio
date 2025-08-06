import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Progressive header animation stages
    const timeouts = [
      setTimeout(() => setStage(1), 4500),  // Stage 1: 4.5s - Logo appears
      setTimeout(() => setStage(2), 4800),  // Stage 2: 4.8s - About button appears
      setTimeout(() => setStage(3), 5100),  // Stage 3: 5.1s - Projects button appears
      setTimeout(() => setStage(4), 5400),  // Stage 4: 5.4s - Certifications button appears
      setTimeout(() => setStage(5), 5700),  // Stage 5: 5.7s - Contact button appears
      setTimeout(() => setStage(6), 6000),  // Stage 6: 6.0s - Theme toggle appears
    ]

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Stage 1: Logo appears */}
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection("home")}
            className={`text-xl font-semibold tracking-tight hover:bg-secondary transition-all duration-700 ease-out p-2 ${
              stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            Agung Prastyo
          </Button>
          
          <nav className="hidden md:flex items-center space-x-8">
            {/* Stage 2: About button appears */}
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("about")}
              className={`font-medium transition-all duration-700 ease-out hover:bg-secondary ${
                stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              About
            </Button>
            
            {/* Stage 3: Projects button appears */}
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("projects")}
              className={`font-medium transition-all duration-700 ease-out hover:bg-secondary ${
                stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              Projects
            </Button>
            
            {/* Stage 4: Certifications button appears */}
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("certifications")}
              className={`font-medium transition-all duration-700 ease-out hover:bg-secondary ${
                stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              Certifications
            </Button>
            
            {/* Stage 5: Contact button appears */}
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("contact")}
              className={`font-medium transition-all duration-700 ease-out hover:bg-secondary ${
                stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              Contact
            </Button>
          </nav>

          {/* Stage 6: Theme toggle appears */}
          <div className={`transition-all duration-700 ease-out ${
            stage >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header