import { useRef, useEffect, useState, useCallback } from "react"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Experience } from "@/components/Experience" // New Experience component
import { Projects } from "@/components/Projects"
import { Certifications } from "@/components/Certifications"
import { Contact } from "@/components/Contact"

const sections = ["home", "about", "experience", "projects", "certifications", "contact"]
const sectionComponents = [Hero, About, Experience, Projects, Certifications, Contact]

export function HorizontalSectionsContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(new Array(sections.length).fill(null))
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [sectionsScrolled, setSectionsScrolled] = useState<boolean[]>(new Array(sections.length).fill(false))
  const [scrollPercentages, setScrollPercentages] = useState<number[]>(new Array(sections.length).fill(0))
  const [isNavigatingFromNavbar, setIsNavigatingFromNavbar] = useState(false)
  
  // New state for "scroll once more" requirement
  const [scrollOnceMoreState, setScrollOnceMoreState] = useState<{[key: number]: boolean}>({})
  const [isMobile, setIsMobile] = useState(false)

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Set refs for each section
  const setSectionRef = useCallback((el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el
  }, [])

  // Check if section content has been fully read
  const checkSectionScrolled = useCallback((sectionIndex: number) => {
    const sectionEl = sectionRefs.current[sectionIndex]
    if (!sectionEl) return false

    const { scrollTop, scrollHeight, clientHeight } = sectionEl
    const scrollableHeight = scrollHeight - clientHeight
    
    // If content fits in viewport, consider it "read"
    if (scrollableHeight <= 10) return true
    
    // Check if scrolled to at least 85% of content
    const scrollPercentage = (scrollTop / scrollableHeight) * 100
    return scrollPercentage >= 85
  }, [])

  // Calculate current scroll percentage
  const calculateScrollPercentage = useCallback((sectionIndex: number) => {
    const sectionEl = sectionRefs.current[sectionIndex]
    if (!sectionEl) return 0

    const { scrollTop, scrollHeight, clientHeight } = sectionEl
    const scrollableHeight = scrollHeight - clientHeight
    
    if (scrollableHeight <= 10) return 100
    
    return Math.min(100, (scrollTop / scrollableHeight) * 100)
  }, [])

  // Update all sections' scroll status and percentages
  const updateAllSectionsStatus = useCallback(() => {
    const newSectionsScrolled = [...sectionsScrolled]
    const newScrollPercentages = [...scrollPercentages]
    
    sections.forEach((_, index) => {
      newSectionsScrolled[index] = checkSectionScrolled(index)
      newScrollPercentages[index] = calculateScrollPercentage(index)
    })
    
    setSectionsScrolled(newSectionsScrolled)
    setScrollPercentages(newScrollPercentages)
  }, [sectionsScrolled, scrollPercentages, checkSectionScrolled, calculateScrollPercentage])

  // Monitor scroll in all sections
  useEffect(() => {
    const handleScroll = () => {
      updateAllSectionsStatus()
    }

    // Add scroll listeners to all sections
    sectionRefs.current.forEach((sectionEl, index) => {
      if (sectionEl) {
        sectionEl.addEventListener('scroll', handleScroll)
      }
    })

    // Initial status check
    updateAllSectionsStatus()

    return () => {
      sectionRefs.current.forEach((sectionEl) => {
        if (sectionEl) {
          sectionEl.removeEventListener('scroll', handleScroll)
        }
      })
    }
  }, [updateAllSectionsStatus])

  // Navigate to specific section
  const navigateToSection = useCallback((sectionIndex: number) => {
    if (containerRef.current && sectionIndex >= 0 && sectionIndex < sections.length) {
      const sectionWidth = window.innerWidth
      containerRef.current.scrollTo({
        left: sectionIndex * sectionWidth,
        behavior: 'smooth'
      })
      setCurrentSection(sectionIndex)
    }
  }, [])

  // Check if navigation is allowed
  const canNavigateWithWheel = useCallback((targetSectionIndex: number) => {
    // Navigation to previous sections - always allowed (no restrictions for going back)
    if (targetSectionIndex < currentSection) {
      return true
    }
    
    // Forward navigation - only requires current section to be read
    if (targetSectionIndex === currentSection + 1) {
      const currentRead = sectionsScrolled[currentSection]
      return currentRead
    }
    
    // Skip navigation not allowed
    return false
  }, [currentSection, sectionsScrolled])

  // Check if at bottom of current section
  const isAtBottom = useCallback(() => {
    const currentSectionEl = sectionRefs.current[currentSection]
    if (!currentSectionEl) return false

    const { scrollTop, scrollHeight, clientHeight } = currentSectionEl
    const scrollableHeight = scrollHeight - clientHeight
    
    if (scrollableHeight <= 10) return true
    return scrollTop >= scrollableHeight - 10
  }, [currentSection])

  // Check if at top of current section
  const isAtTop = useCallback(() => {
    const currentSectionEl = sectionRefs.current[currentSection]
    if (!currentSectionEl) return true
    return currentSectionEl.scrollTop <= 10
  }, [currentSection])

  // Handle wheel scroll and touch events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || isNavigatingFromNavbar) {
        return
      }
      
      const deltaY = e.deltaY
      if (Math.abs(deltaY) < 30) return // Ignore small scrolls

      if (deltaY > 0) { // Scrolling down
        if (isAtBottom() && currentSection < sections.length - 1) {
          const nextSection = currentSection + 1
          if (canNavigateWithWheel(nextSection)) {
            // Check if we need to scroll once more
            const scrollKey = `${currentSection}-${nextSection}`
            if (!scrollOnceMoreState[scrollKey]) {
              // First scroll attempt - set the state but don't navigate
              setScrollOnceMoreState(prev => ({...prev, [scrollKey]: true}))
              e.preventDefault()
              return
            }
            
            // Second scroll attempt - navigate
            e.preventDefault()
            e.stopPropagation()
            setIsTransitioning(true)
            navigateToSection(nextSection)
            // Clear the scroll once more state
            setScrollOnceMoreState(prev => ({...prev, [scrollKey]: false}))
            setTimeout(() => setIsTransitioning(false), 1500)
          } else {
            e.preventDefault() // Block scroll if can't navigate
          }
        }
      } else { // Scrolling up
        if (isAtTop() && currentSection > 0) {
          const prevSection = currentSection - 1
          if (canNavigateWithWheel(prevSection)) {
            // Check if we need to scroll once more
            const scrollKey = `${currentSection}-${prevSection}`
            if (!scrollOnceMoreState[scrollKey]) {
              // First scroll attempt - set the state but don't navigate
              setScrollOnceMoreState(prev => ({...prev, [scrollKey]: true}))
              e.preventDefault()
              return
            }
            
            // Second scroll attempt - navigate
            e.preventDefault()
            e.stopPropagation()
            setIsTransitioning(true)
            navigateToSection(prevSection)
            // Clear the scroll once more state
            setScrollOnceMoreState(prev => ({...prev, [scrollKey]: false}))
            setTimeout(() => setIsTransitioning(false), 1500)
          } else {
            e.preventDefault()
          }
        }
      }
    }

    // Touch handling for mobile
    let touchStartY = 0
    let touchStartX = 0
    let touchEndY = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning || isNavigatingFromNavbar) return
      
      touchEndY = e.changedTouches[0].screenY
      touchEndX = e.changedTouches[0].screenX
      
      const deltaY = touchStartY - touchEndY
      const deltaX = touchStartX - touchEndX
      
      // Only handle vertical swipes (ignore horizontal swipes)
      if (Math.abs(deltaX) > Math.abs(deltaY)) return
      
      // Minimum swipe distance
      if (Math.abs(deltaY) < 50) return

      if (deltaY > 0) { // Swiping up (next section)
        if (isAtBottom() && currentSection < sections.length - 1) {
          const nextSection = currentSection + 1
          if (canNavigateWithWheel(nextSection)) {
            // Check if we need to swipe once more
            const scrollKey = `${currentSection}-${nextSection}`
            if (!scrollOnceMoreState[scrollKey]) {
              // First swipe attempt - set the state but don't navigate
              setScrollOnceMoreState(prev => ({...prev, [scrollKey]: true}))
              return
            }
            
            // Second swipe attempt - navigate
            setIsTransitioning(true)
            navigateToSection(nextSection)
            // Clear the scroll once more state
            setScrollOnceMoreState(prev => ({...prev, [scrollKey]: false}))
            setTimeout(() => setIsTransitioning(false), 1500)
          }
        }
      } else { // Swiping down (previous section)
        if (isAtTop() && currentSection > 0) {
          const prevSection = currentSection - 1
          if (canNavigateWithWheel(prevSection)) {
            // Check if we need to swipe once more
            const scrollKey = `${currentSection}-${prevSection}`
            if (!scrollOnceMoreState[scrollKey]) {
              // First swipe attempt - set the state but don't navigate
              setScrollOnceMoreState(prev => ({...prev, [scrollKey]: true}))
              return
            }
            
            // Second swipe attempt - navigate
            setIsTransitioning(true)
            navigateToSection(prevSection)
            // Clear the scroll once more state
            setScrollOnceMoreState(prev => ({...prev, [scrollKey]: false}))
            setTimeout(() => setIsTransitioning(false), 1500)
          }
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      if (isMobile) {
        container.addEventListener('touchstart', handleTouchStart, { passive: true })
        container.addEventListener('touchend', handleTouchEnd, { passive: true })
      }
      
      return () => {
        container.removeEventListener('wheel', handleWheel)
        if (isMobile) {
          container.removeEventListener('touchstart', handleTouchStart)
          container.removeEventListener('touchend', handleTouchEnd)
        }
      }
    }
  }, [currentSection, isTransitioning, isNavigatingFromNavbar, canNavigateWithWheel, navigateToSection, isAtBottom, isAtTop, scrollOnceMoreState, isMobile])

  // Clear scroll once more state when section changes
  useEffect(() => {
    setScrollOnceMoreState({})
  }, [currentSection])

  // Handle navbar navigation (no restrictions)
  useEffect(() => {
    const handleNavigateToSection = (e: CustomEvent) => {
      setIsNavigatingFromNavbar(true)
      navigateToSection(e.detail.sectionIndex)
      setTimeout(() => setIsNavigatingFromNavbar(false), 1500)
    }

    window.addEventListener('navigateToSection', handleNavigateToSection as EventListener)
    return () => window.removeEventListener('navigateToSection', handleNavigateToSection as EventListener)
  }, [navigateToSection])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || isNavigatingFromNavbar) return
      
      let targetSection = -1

      if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
        targetSection = currentSection + 1
      } else if (e.key === 'ArrowLeft' && currentSection > 0) {
        targetSection = currentSection - 1
      }

      if (targetSection !== -1 && canNavigateWithWheel(targetSection)) {
        // Check if we need to press key once more
        const scrollKey = `${currentSection}-${targetSection}`
        if (!scrollOnceMoreState[scrollKey]) {
          // First key press - set the state but don't navigate
          setScrollOnceMoreState(prev => ({...prev, [scrollKey]: true}))
          return
        }
        
        // Second key press - navigate
        setIsTransitioning(true)
        navigateToSection(targetSection)
        // Clear the scroll once more state
        setScrollOnceMoreState(prev => ({...prev, [scrollKey]: false}))
        setTimeout(() => setIsTransitioning(false), 1500)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isTransitioning, isNavigatingFromNavbar, navigateToSection, canNavigateWithWheel, scrollOnceMoreState])

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden h-screen"
      style={{ scrollBehavior: 'smooth' }}
    >
      {sectionComponents.map((SectionComponent, index) => (
        <div
          key={sections[index]}
          id={sections[index]}
          ref={(el) => setSectionRef(el, index)}
          className="w-screen flex-shrink-0 h-full overflow-y-auto"
        >
          <SectionComponent />
        </div>
      ))}
    </div>
  )
}

export default HorizontalSectionsContainer
