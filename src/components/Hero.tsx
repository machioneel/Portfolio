import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            <span className="font-light">Agung</span>{" "}
            <span className="font-medium">Prastyo</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
            Solving technology problems with a structured approach and certified fundamentals
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="font-medium px-8 py-3 transition-smooth"
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="font-medium px-8 py-3 transition-smooth"
            >
              Get in Touch
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://github.com/machioneel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-smooth"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/agungprstyo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-smooth"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:emailku@aprastyo.my.id"
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-smooth"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </button>
    </section>
  )
}