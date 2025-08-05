import { Award, Calendar, ExternalLink, X, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

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
    setSelectedImage(cert)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Handle escape key to close modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeImageModal()
    }
  }

  return (
    <>
      <section id="certifications" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-800">
                Certifications & Awards
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Continuous learning and professional development through industry-recognized certifications
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <Card 
                  key={index} 
                  className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div 
                        className="relative overflow-hidden rounded-lg flex-shrink-0 group/image cursor-pointer"
                        onClick={() => openImageModal(cert)}
                      >
                        <img 
                          src={cert.image} 
                          alt={`${cert.title} certification badge`}
                          className="w-20 h-20 object-cover transition-all duration-300 group-hover/image:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                          <Eye className="h-3 w-3" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <h3 
                            className="text-xl font-medium leading-tight pr-4 cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => openImageModal(cert)}
                          >
                            {cert.title}
                          </h3>
                          <Award className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-gray-600 font-medium">
                            {cert.issuer}
                          </span>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{cert.date}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed text-sm mb-4">
                          {cert.description}
                        </p>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={() => openImageModal(cert)}
                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                          >
                            View Certificate
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          <a 
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-800 transition-colors font-medium"
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

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeImageModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative max-w-5xl max-h-[95vh] w-full animate-in zoom-in-95 duration-300">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Modal content */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{selectedImage.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <span className="font-semibold bg-blue-100 px-3 py-1 rounded-full">{selectedImage.issuer}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedImage.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{selectedImage.description}</p>
                <a 
                  href={selectedImage.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Original Credential
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              {/* Image container */}
              <div className="flex items-center justify-center bg-gray-100 p-8">
                <div className="relative">
                  <img 
                    src={selectedImage.image} 
                    alt={`${selectedImage.title} certification`}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {/* Loading placeholder - you can add loading state here if needed */}
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-gray-50 text-center">
                <p className="text-sm text-gray-500">Click outside or press ESC to close</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
