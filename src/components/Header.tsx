import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Home, User, FolderOpen, Award, Mail } from "lucide-react"

export function Header() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show navbar immediately when page loads
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const sections = ["home", "about", "projects", "certifications", "contact"]
    const sectionIndex = sections.indexOf(sectionId)
    
    if (sectionIndex !== -1) {
      // Dispatch custom event for horizontal navigation
      const event = new CustomEvent('navigateToSection', { 
        detail: { sectionIndex } 
      })
      window.dispatchEvent(event)
    }
  }

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: FolderOpen, label: "Projects" },
    { id: "certifications", icon: Award, label: "Certifications" },
    { id: "contact", icon: Mail, label: "Contact" },
  ]

  if (!isVisible) return null

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] animate-fade-in">
      <div className="bg-background/95 backdrop-blur-xl border border-border rounded-full px-3 py-2 shadow-2xl shadow-primary/20">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className="rounded-full w-10 h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                title={item.label}
              >
                <Icon className="w-4 h-4" />
              </Button>
            )
          })}
          <div className="w-px h-6 bg-border mx-1" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Header