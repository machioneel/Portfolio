import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Mobile performance optimization
    const isMobile = window.innerWidth <= 768;
    const speedMultiplier = isMobile ? 0.8 : 1;
    
    const stages = [
      { delay: 500 * speedMultiplier, stage: 1 },   // Show name
      { delay: 1200 * speedMultiplier, stage: 2 },  // Show title
      { delay: 1800 * speedMultiplier, stage: 3 },  // Show greeting
      { delay: 2400 * speedMultiplier, stage: 4 },  // Show description
      { delay: 3000 * speedMultiplier, stage: 5 },  // Complete loading
    ];

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => {
        setStage(stage);
        if (stage === 5) {
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade out
          }, 300);
        }
      }, delay);
    });
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500">
      {/* Background Gradient - same as hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Greeting - appears first */}
          <div className={`transition-all duration-700 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-lg text-muted-foreground">
              👋 Hello, I'm
            </p>
          </div>

          {/* Name - main focus, appears second */}
          <div className={`transition-all duration-1000 ${
            stage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="hero-gradient">John Developer</span>
            </h1>
          </div>

          {/* Title - appears third */}
          <div className={`transition-all duration-700 delay-200 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Full Stack Developer & UI/UX Designer
            </h2>
          </div>

          {/* Description - appears fourth */}
          <div className={`transition-all duration-700 delay-300 ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I craft beautiful, functional, and user-centered digital experiences.
            </p>
          </div>

          {/* Progress indicator */}
          <div className={`mt-12 transition-all duration-500 ${
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto">
              <div
                className="h-full progress-bar rounded-full transition-all duration-300"
                style={{ width: `${(stage / 5) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm font-mono text-muted-foreground mt-3">
              {Math.round((stage / 5) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - same as hero */}
      <div className={`absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 blur-xl transition-all duration-1000 ${
        stage >= 2 ? 'scale-100' : 'scale-0'
      }`}></div>
      <div className={`absolute bottom-20 right-10 w-32 h-32 bg-gradient-secondary rounded-full opacity-20 blur-xl transition-all duration-1000 delay-300 ${
        stage >= 3 ? 'scale-100' : 'scale-0'
      }`}></div>
    </div>
  );
}