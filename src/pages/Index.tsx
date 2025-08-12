import { Header } from "@/components/Header";
import { HorizontalSectionsContainer } from "@/components/HorizontalSectionsContainer";

import { LoadingPage } from "@/components/LoadingPage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import Particles from "@/components/Particles";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  useScrollAnimation();

  // Handle the unlock transition
  const handleUnlock = () => {
    console.log("Unlock triggered!") // Debug log
    setIsUnlocked(true);
    // Delay content rendering for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 800);
  };

  // Prevent scrolling when loading page is active and add mobile optimization
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Mobile performance optimization
    (document.body.style as any).webkitTapHighlightColor = 'transparent';
    (document.body.style as any).webkitTouchCallout = 'none';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isUnlocked]);

  return (
    <div className="relative min-h-screen bg-background">
      <Particles
        className="absolute inset-0"
        quantity={isUnlocked ? 300 : 50}
        staticity={isUnlocked ? 50 : 80}
        ease={isUnlocked ? 50 : 80}
      />
      {/* Loading Page - Conditionally rendered */}
      {!isUnlocked && (
        <div className="transition-all duration-2000 ease-out">
          <LoadingPage onUnlock={handleUnlock} />
        </div>
      )}

      {/* Floating Navigation - Only visible after loading */}
      {isUnlocked && <Header />}
      
      {/* Main Content - Lazy loaded after unlock */}
      {showContent && (
        <div className={`transition-all duration-1000 ease-out ${
          showContent 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <main className="relative">
            <Particles
              className="absolute inset-0 pointer-events-none"
              quantity={500}
              staticity={50}
              ease={50}
            />
            <HorizontalSectionsContainer />
          </main>
        </div>
      )}
    </div>
  );
};

export default Index;
