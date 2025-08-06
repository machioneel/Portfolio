// src/components/Certifications.tsx

import { Award, Calendar, ExternalLink, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function Certifications() {
  const [selectedImage, setSelectedImage] = useState<any>(null);

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
  ];

  const openImageModal = (cert: any) => {
    setSelectedImage(cert);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImageModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

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
                Continuous learning and professional development through
                industry-recognized certifications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className={`border-0 bg-card shadow-subtle transition-smooth hover:shadow-md group fade-in fade-in-delay-${Math.min(
                    index + 1,
                    3
                  )}`}
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

      {/* -- PERUBAHAN DIMULAI DI SINI -- */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(isOpen) => {
          if (!isOpen) closeImageModal();
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 outline outline-1 outline-border">
          {selectedImage && (
            <>
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-medium">
                  {selectedImage.title}
                </DialogTitle>
                <DialogDescription className="pt-2">
                  <p className="mb-3">{selectedImage.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium">{selectedImage.issuer}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{selectedImage.date}</span>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="relative w-full bg-muted/50 rounded-md border p-2">
                  <img
                    src={selectedImage.image}
                    alt={`${selectedImage.title} certification`}
                    className="w-full h-auto object-contain rounded-sm"
                  />
                </div>
              </div>

              <DialogFooter className="p-6 pt-4 border-t bg-secondary/40 flex-row justify-between items-center">
                <a
                  href={selectedImage.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                >
                  View Original Credential
                  <ExternalLink size={16} />
                </a>
                <Button variant="outline" onClick={closeImageModal}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* -- PERUBAHAN SELESAI -- */}
    </>
  );
} 
