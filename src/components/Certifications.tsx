import { Award, Calendar, ExternalLink, X, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

export function Certifications() {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const certifications = [
    {
      title: "Google IT Support Professional Certificate",
      issuer: "Google",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Google%20IT%20Support_page-0001.jpg",
      description: "Validates the fundamental skills required for an IT Support role, covering networking, operating systems, and basic security.",
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/HE2RAMHBR471"
    },
    {
      title: "IBM Ethical Hacking with Open Source Tools Professional Certificate",
      issuer: "IBM",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Coursera%200RCANOWKPES1_copy_page-0001.jpg",
      description: "Validates hands-on skills in ethical hacking and penetration testing methodologies using common open-source tools to identify and analyze system vulnerabilities.",
      credentialUrl: "https://coursera.org/verify/professional-cert/0RCANOWKPES1"
    },
    {
      title: "Fortinet Certified Associate in Cybersecurity",
      issuer: "Fortinet",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Fortinet%20Certified%20Associate%20in%20Cybersecurity_page-0001.jpg",
      description: "Demonstrates an understanding of the modern cyber threat landscape and network security concepts, validated by a leading security vendor.",
      credentialUrl: "https://www.credly.com/badges/d6be7be9-0f15-42f8-a544-df06570fc9a3/public_url"
    },
    {
      title: "Code Generation and Optimization using IBM Granite",
      issuer: "IBM",
      date: "2025",
      image: "https://ustjdwftdufeazfvhgir.supabase.co/storage/v1/object/public/media-files//Code%20Generation%20and%20Optimization%20Using%20IBM%20Granite.png",
      description: "Successfully completed the requirements for a program focused on using the IBM Granite model for code generation and optimization.",
      credentialUrl: "https://www.credly.com/badges/894c20e7-727b-428d-af35-5aaf38621261/public_url"
    }
  ]

  const openImageModal = (cert) => {
    console.log('Opening modal for:', cert.title)
    setSelectedImage(cert)
  }

  const closeImageModal = () => {
    console.log('Closing modal')
    setSelectedImage(null)
  }

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal()
      }
    }
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [selectedImage])

  return (
    <>
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
                      <div className="relative overflow-hidden rounded-lg flex-shrink-0 group/image">
                        <img 
                          src={cert.image} 
                          alt={`${cert.title} certification badge`}
                          className="w-20 h-20 object-cover transition-smooth group-hover:scale-105 cursor-pointer"
                          onClick={() => openImageModal(cert)}
                        />
                        <div 
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-smooth flex items-center justify-center cursor-pointer"
                          onClick={() => openImageModal(cert)}
                        >
                          <Eye className="h-6 w-6 text-white" />
                        </div>
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
                        
                        <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                          {cert.description}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => openImageModal(cert)}
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            View Certificate
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          <a 
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            View Credential
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal - Fixed Version */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={closeImageModal}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1152px',
              maxHeight: '95vh',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e5e7eb'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeImageModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '50%',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'white'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
              aria-label="Close modal"
            >
              <X size={24} color="#111827" />
            </button>
            
            {/* Certificate Info Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#111827'
              }}>{selectedImage.title}</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '12px'
              }}>
                <span style={{ fontWeight: '500' }}>{selectedImage.issuer}</span>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={16} />
                  <span>{selectedImage.date}</span>
                </div>
              </div>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                marginBottom: '16px',
                lineHeight: '1.5'
              }}>{selectedImage.description}</p>
              <a 
                href={selectedImage.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#2563eb',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#1d4ed8'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#2563eb'}
              >
                View Original Credential
                <ExternalLink size={16} />
              </a>
            </div>
            
            {/* Image Container */}
            <div style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={selectedImage.image} 
                  alt={`${selectedImage.title} certification`}
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    minHeight: '400px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                    border: '1px solid rgba(229, 231, 235, 0.2)'
                  }}
                />
              </div>
            </div>
            
            {/* Footer */}
            <div style={{
              padding: '16px',
              backgroundColor: '#f9fafb',
              textAlign: 'center',
              borderTop: '1px solid #e5e7eb'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Click outside the image, press <kbd style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db'
                }}>ESC</kbd>, or click the X button to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
