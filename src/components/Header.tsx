import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-smooth ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => scrollToSection("home")}
            className="text-xl font-semibold tracking-tight hover:bg-secondary transition-smooth p-2"
          >
            Agung Prastyo
          </Button>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("about")}
              className="font-medium transition-smooth hover:bg-secondary"
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("projects")}
              className="font-medium transition-smooth hover:bg-secondary"
            >
              Projects
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("certifications")}
              className="font-medium transition-smooth hover:bg-secondary"
            >
              Certifications
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("contact")}
              className="font-medium transition-smooth hover:bg-secondary"
            >
              Contact
            </Button>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}