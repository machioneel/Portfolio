import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Hero() {
  const [stage, setStage] = useState(0)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setStage(1), 500),   // Stage 1: 0.5s
      setTimeout(() => setStage(2), 1200),  // Stage 2: 1.2s
      setTimeout(() => setStage(3), 1800),  // Stage 3: 1.8s
      setTimeout(() => setStage(4), 2400),  // Stage 4: 2.4s
      setTimeout(() => setStage(5), 3000),  // Stage 5: 3.0s
      setTimeout(() => setStage(6), 3800),  // Stage 6: 3.8s
    ]

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Stage 1: Name appears with fade-in */}
          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 transition-all duration-700 ease-out ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="font-light">Agung</span>{" "}
            <span className="font-medium">Prastyo</span>
          </h1>
          
          {/* Stage 2: Description appears */}
          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light transition-all duration-700 ease-out ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Solving technology problems with a structured approach and certified fundamentals
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            {/* Stage 3: View Projects button appears */}
            <Button 
              variant="default" 
              size="lg"
              onClick={() => scrollToSection("projects")}
              className={`font-medium px-8 py-3 transition-all duration-700 ease-out ${
                stage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              View Projects
            </Button>
            
            {/* Stage 4: Get in Touch button appears */}
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection("contact")}
              className={`font-medium px-8 py-3 transition-all duration-700 ease-out ${
                stage >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              Get in Touch
            </Button>
          </div>
          
          {/* Stage 5: Social media buttons appear */}
          <div className={`flex items-center justify-center gap-6 transition-all duration-700 ease-out ${
            stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <a 
              href="https://github.com/machioneel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-all duration-300 hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/agungprstyo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:emailku@aprastyo.my.id"
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-all duration-300 hover:scale-110"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Stage 6: Arrow appears after 3.8s */}
      <button 
        onClick={() => scrollToSection("about")}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-700 ease-out ${
          stage >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </button>
    </section>
  )
}

export default Hero