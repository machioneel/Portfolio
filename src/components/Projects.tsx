import { ExternalLink, Github, Cpu, Shield, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Projects() {
  const projects = [
    {
      title: "IoT-Based Mini Vehicle Prototype",
      description: "Developed a functional IoT vehicle prototype controlled via the web, featuring live-view streaming and an autonomous navigation mode.",
      technologies: ["IoT", "Microcontroller", "C++", "MQTT", "Web Development"],
      icon: Cpu,
      github: "https://github.com/machioneel/IoT-Mini-Vehicle",
      live: "https://iot-mini-vehicle.vercel.app/"
    },
    {
      title: "Digitalization and Asset Security Initiative",
      description: "Led an internal initiative to improve data security through archive digitalization, user access management, and network security configuration.",
      technologies: ["Information Security", "Asset Management", "System Administration", "Network Configuration", "Project Management"],
      icon: Shield,
      github: "https://github.com/machioneel/Asset-Management",
      live: "https://asset-management-cyan.vercel.app/"
    },
    {
      title: "Portfolio Website",
      description: "Designed and built a fully-responsive personal portfolio website from scratch to demonstrate technical skills and projects.",
      technologies: ["React", "Tailwind", "Framer Motion", "Vite"],
      icon: Globe,
      github: "https://github.com/machioneel/Portfolio",
      live: "https://aprastyo.my.id/"
    }
  ]

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Projects</h1>
            <p className="text-muted-foreground mt-2">A selection of work and initiatives.</p>
          </header>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card key={index} className={`border-0 bg-card shadow-subtle transition-smooth hover:shadow-lg overflow-hidden group fade-in fade-in-delay-${Math.min(index + 1, 3)}`}>
                  <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-8">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-smooth">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        variant="default" 
                        size="sm" 
                        asChild
                        className="transition-smooth"
                      >
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        className="transition-smooth"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
