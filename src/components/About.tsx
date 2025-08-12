import { Wrench, Shield, MonitorCog } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
  const skills = [
    {
      icon: Wrench,
      title: "Technical Support",
      description: "Troubleshooting hardware and software with a structured and user-focused approach"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Applying fundamental security principles to protect data and infrastructure from threats"
    },
    {
      icon: MonitorCog,
      title: "System Management",
      description: "IT asset management and software installation to ensure efficient operations"
    }
  ]

  return (
    <section id="about" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About Me</h1>
            <p className="text-muted-foreground mt-2">Who I am and what I do.</p>
          </header>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="slide-up">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I am a Computer Engineering graduate with a passion for solving technology 
                problems and securing systems. With certifications from Google, Fortinet, and IBM, 
                I have a strong foundation in technical support and cybersecurity.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach combines technical expertise with structured problem-solving, 
                shaped by my experience in administration. I am committed to ensuring every 
                solution is not just functional, but also secure and reliable.
              </p>
            </div>
            
            <div className="space-y-4 fade-in fade-in-delay-1">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Industry Certifications</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Cybersecurity Enthusiast</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className={`border-0 bg-card shadow-subtle transition-smooth hover:shadow-md fade-in fade-in-delay-${index + 1}`}>
                <CardContent className="p-8 text-center">
                  <skill.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-3">{skill.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}