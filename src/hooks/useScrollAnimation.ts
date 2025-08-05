import { useEffect } from 'react'

export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up')
    animatedElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      animatedElements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])
}