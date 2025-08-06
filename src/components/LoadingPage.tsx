import { useState, useEffect } from "react"
import Particles from "./Particles"

interface LoadingPageProps {
  onUnlock: () => void
}

export function LoadingPage({ onUnlock }: LoadingPageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  // Initial fade in for 2 seconds
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [])

  const handleClick = () => {
    if (isLoading || isExiting) return
    
    console.log("Loading page clicked!") // Debug log
    setIsExiting(true)
    
    // Start fade out animation and call onUnlock after 2 seconds
    setTimeout(() => {
      onUnlock()
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-transparent transition-opacity duration-[2000ms] ${
      isExiting ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content - Centered */}
      <div className={`relative text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen transition-opacity duration-[2000ms] ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mb-12">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Main Clickable Text */}
        <div
          className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 cursor-pointer select-none transition-all duration-500 ease-out ${
            isHovered 
              ? 'text-primary scale-105 drop-shadow-lg' 
              : 'text-foreground hover:text-primary'
          } ${isExiting || isLoading ? 'pointer-events-none' : ''}`}
          onClick={handleClick}
          onMouseEnter={() => !isExiting && !isLoading && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Click to unlock and enter the portfolio"
          style={{ 
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        >
          Agung{" "}
          <span className="font-medium bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Prastyo
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {isExiting ? 'Entering...' : 'Click to unlock my full potential'}
        </p>

        {/* Interactive Indicator */}
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isHovered ? 'scale-110 border-primary/80' : 'border-primary/60'
            } ${isExiting || isLoading ? 'pointer-events-none' : ''}`}
            onClick={handleClick}
          >
            <div className={`w-2 h-2 bg-primary rounded-full ${isExiting ? 'animate-spin' : 'animate-ping'}`}></div>
          </div>
        <div className="w-full bg-muted rounded-full h-1">
            <div className={`bg-primary h-1 rounded-full ${isExiting ? 'animate-pulse' : 'animate-pulse'}`} style={{ width: '100%' }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {isExiting ? 'Preparing experience...' : 'Ready to explore'}
          </p>
        </div>
      </div>

      {/* Corner Decorations - Non-interactive */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 pointer-events-none"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 pointer-events-none"></div>
    </div>
  )
}