import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, MapPin, Phone, Send, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  
  const { toast } = useToast()

  const footerSentinelRef = useRef<HTMLDivElement | null>(null)
  const [footerOpen, setFooterOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (!footerSentinelRef.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setFooterOpen(entry.isIntersecting)
      })
    }, { threshold: 0.6 })
    observer.observe(footerSentinelRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })
    
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "emailku@aprastyo.my.id",
      href: "mailto:emailku@aprastyo.my.id"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+62 (855) 9844-400",
      href: "tel:+628559844400"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Jakarta, Indonesia",
      href: "https://maps.app.goo.gl/EXL8SShVA6hCfDzB8"
    }
  ]

  const FooterMerged = () => (
    <div className="mt-16">
      <div ref={footerSentinelRef} className="h-1 w-full" />
      <div className={`overflow-hidden transition-all duration-500 ${footerOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
      </div>
    </div>
  )

  return (
    <section id="contact" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground mt-2">Reach out for opportunities or collaborations.</p>
          </header>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="slide-up">
              <h3 className="text-2xl font-medium mb-6">Let's work together</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, creative projects, 
                or potential collaborations. Feel free to reach out if you'd like to connect.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-full">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{info.title}</h4>
                      <a 
                        href={info.href}
                        className="text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="border-0 bg-card shadow-subtle fade-in fade-in-delay-1">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="transition-smooth focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full transition-smooth"
                    size="lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Footer merged and auto-expand at bottom */}
          <FooterMerged />
        </div>
      </div>
    </section>
  )
}