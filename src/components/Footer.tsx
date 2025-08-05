import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <a 
              href="https://github.com/machioneel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-smooth"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/agungprstyo/" 
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
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>© {currentYear} Portfolio. Made with</span>
            <Heart className="h-4 w-4 text-destructive" />
            <span>and clean code</span>
          </div>
        </div>
      </div>
    </footer>
  )
}