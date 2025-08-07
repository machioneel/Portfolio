import { useRef, useEffect, useState, useCallback } from "react"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { Certifications } from "@/components/Certifications"
import { Contact } from "@/components/Contact"

const sections = ["home", "about", "projects", "certifications", "contact"]
const sectionComponents = [Hero, About, Projects, Certifications, Contact]

export function HorizontalSectionsContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(new Array(sections.length).fill(null))
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [sectionsScrolled, setSectionsScrolled] = useState<boolean[]>(new Array(sections.length).fill(false))
  const [scrollPercentages, setScrollPercentages] = useState<number[]>(new Array(sections.length).fill(0))
  const [isNavigatingFromNavbar, setIsNavigatingFromNavbar] = useState(false)

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
    
    // Forward navigation - only requires current section to be read (10%)
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

  // Handle wheel scroll
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
            e.preventDefault()
            e.stopPropagation()
            setIsTransitioning(true)
            navigateToSection(nextSection)
            setTimeout(() => setIsTransitioning(false), 1500)
          } else {
            e.preventDefault() // Block scroll if can't navigate
          }
        }
      } else { // Scrolling up
        if (isAtTop() && currentSection > 0) {
          const prevSection = currentSection - 1
          if (canNavigateWithWheel(prevSection)) {
            e.preventDefault()
            e.stopPropagation()
            setIsTransitioning(true)
            navigateToSection(prevSection)
            setTimeout(() => setIsTransitioning(false), 1500)
          } else {
            e.preventDefault()
          }
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [currentSection, isTransitioning, isNavigatingFromNavbar, canNavigateWithWheel, navigateToSection, isAtBottom, isAtTop])

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
        setIsTransitioning(true)
        navigateToSection(targetSection)
        setTimeout(() => setIsTransitioning(false), 1500)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isTransitioning, isNavigatingFromNavbar, navigateToSection, canNavigateWithWheel])

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
