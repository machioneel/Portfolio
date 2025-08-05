import { Award, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Certifications() {
  const certifications = [
    {
      title: "Google IT Support Professional Certificate",
      issuer: "Google",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Google%20IT%20Support_page-0001.jpg",
      description: "Validates the fundamental skills required for an IT Support role, covering networking, operating systems, and basic security."
    },
    {
      title: "IBM Ethical Hacking with Open Source Tools Professional Certificate",
      issuer: "IBM",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Coursera%200RCANOWKPES1_copy_page-0001.jpg",
      description: "Validates hands-on skills in ethical hacking and penetration testing methodologies using common open-source tools to identify and analyze system vulnerabilities."
    },
    {
      title: "Fortinet Certified Associate in Cybersecurity",
      issuer: "Fortinet",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Fortinet%20Certified%20Associate%20in%20Cybersecurity_page-0001.jpg",
      description: "Demonstrates an understanding of the modern cyber threat landscape and network security concepts, validated by a leading security vendor."
    },
    {
      title: "Code Generation and Optimization using IBM Granite",
      issuer: "IBM",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Code%20Generation%20and%20Optimization%20Using%20IBM%20Granite.png",
      description: "successfully completed the requirements for a program focused on using the IBM Granite model for code generation and optimization."
    }
  ]

  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Certifications & Awards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Continuous learning and professional development through industry-recognized certifications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className={`border-0 bg-card shadow-subtle transition-smooth hover:shadow-md group fade-in fade-in-delay-${Math.min(index + 1, 3)}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                      <img 
                        src={cert.image} 
                        alt={`${cert.title} certification badge`}
                        className="w-20 h-20 object-cover transition-smooth group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-smooth"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-medium leading-tight pr-4">
                          {cert.title}
                        </h3>
                        <Award className="h-5 w-5 text-primary flex-shrink-0" />
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-muted-foreground font-medium">
                          {cert.issuer}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
