"use client";

import Image from 'next/image';
import React, { useCallback, useState, useEffect } from 'react';

// Component for animated text cycling
const AnimatedText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const luxuryWords = [
    { text: "LUXURY", color: "text-accent", direction: "right-to-left" },
    { text: "ELEGANT", color: "text-rose-300", direction: "top-to-bottom" },
    { text: "PREMIUM", color: "text-amber-300", direction: "left-to-right" },
    { text: "EXQUISITE", color: "text-emerald-300", direction: "bottom-to-top" },
    { text: "EXCLUSIVE", color: "text-purple-300", direction: "right-to-left" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % luxuryWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTransformClass = (direction: string, isActive: boolean) => {
    if (isActive) return "opacity-100 transform-none";
    
    switch (direction) {
      case "right-to-left":
        return "opacity-0 transform translate-x-full";
      case "left-to-right":
        return "opacity-0 transform -translate-x-full";
      case "top-to-bottom":
        return "opacity-0 transform -translate-y-full";
      case "bottom-to-top":
        return "opacity-0 transform translate-y-full";
      default:
        return "opacity-0 transform translate-x-full";
    }
  };

  const getExitClass = (currentDirection: string, wordDirection: string) => {
    switch (currentDirection) {
      case "right-to-left":
        return "opacity-0 transform -translate-x-full";
      case "left-to-right":
        return "opacity-0 transform translate-x-full";
      case "top-to-bottom":
        return "opacity-0 transform translate-y-full";
      case "bottom-to-top":
        return "opacity-0 transform -translate-y-full";
      default:
        return "opacity-0 transform -translate-x-full";
    }
  };

  const currentDirection = luxuryWords[currentIndex].direction;
  const prevIndex = (currentIndex - 1 + luxuryWords.length) % luxuryWords.length;

  return (
    <span className="relative inline-block min-w-[300px] overflow-hidden">
      {luxuryWords.map((word, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === prevIndex;
        
        let className = `absolute left-0 transition-all duration-700 tracking-normal ${word.color} `;
        
        if (isActive) {
          className += "opacity-100 transform-none text-shimmer";
        } else if (isPrevious) {
          className += getExitClass(currentDirection, word.direction);
        } else {
          className += getTransformClass(word.direction, false);
        }
        
        return (
          <span
            key={index}
            className={className}
            style={{
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
              transitionDelay: isActive ? "0ms" : "0ms"
            }}
            aria-hidden={!isActive}
          >
            {word.text}
          </span>
        );
      })}
      <span className="opacity-0">EXCLUSIVE</span> {/* Spacer element - using longest word */}
    </span>
  );
};

const Hero = () => {
  // Memoize scroll handler for better performance
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      // Add offset for fixed header
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Lazy load non-critical elements
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="home" className="relative min-h-[100vh] flex flex-col items-center justify-between overflow-hidden bg-primary">
      {/* Simplified background with single gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary to-[#080808]"></div>
      
      {/* Optimized background image with single filter */}
      <div className="absolute inset-0 z-5">
        <Image
          src="https://images.unsplash.com/photo-1671159593449-61b5ba964fab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Elegant fashion background"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
          style={{ 
            filter: 'brightness(0.7) contrast(1.1) sepia(0.2)',
            transform: 'translateZ(0)' 
          }}
        />
        {/* Single overlay instead of multiple */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
      </div>
      
      {/* Single blurry shader effect */}
      <div className="blurry-shader absolute inset-0 z-10"></div>
      
      {/* Content container */}
      <div className="container-custom relative z-20 pt-20 flex-grow flex items-center">
        <div className="max-w-xl text-light">
          {/* Logo/Brand */}
          <h2 className="font-serif text-xl md:text-2xl tracking-[0.3em] text-accent mb-2 animate-fade-in">
            G L A M H A V E N
          </h2>
          
          {/* Main headline - using CSS animations instead of JS */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-light uppercase tracking-wide animate-fade-in">
            THE<br /><AnimatedText /><br />COLLECTION
          </h1>
          
          {/* Elegant tagline */}
          <p className="text-xl md:text-2xl font-light opacity-90 mb-8 tracking-wider animate-fade-in-up">
            Elegance for Every Occasion
          </p>
          
          {/* Product description */}
          <p className="text-base md:text-lg opacity-80 mb-10 leading-relaxed max-w-md animate-fade-in-up delay-200">
            Find your perfect dress from our curated Lebanese collection. Premium rentals for special moments and unforgettable events.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <a 
              href="#gallery" 
              onClick={(e) => scrollToSection(e, 'gallery')}
              className="px-8 py-3 bg-transparent border border-accent text-accent font-medium hover:bg-accent/10 transition-all tracking-wider uppercase text-sm"
            >
              COLLECTION
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-8 py-3 bg-transparent border border-light/30 text-light/80 font-medium hover:border-light/60 hover:text-light transition-all tracking-wider uppercase text-sm"
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </div>
      
      {/* Social icons - only render on client side */}
      {isClient && (
        <div className="w-full flex justify-center md:justify-start z-20 py-4">
          <div className="flex space-x-6 ml-4 md:ml-8 animate-fade-in-up delay-400">
            <a href="#" className="text-light/60 hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-light/60 hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-light/60 hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
      
      {/* Scrolling feed at the bottom of Hero */}
      {isClient && (
        <div className="w-full z-20 overflow-hidden border-t border-b border-accent/30 mt-auto">
          <div className="scrolling-feed-container py-3 bg-dark/70 backdrop-blur-sm">
            <div className="scrolling-feed">
              <div className="scrolling-feed-content">
                <span className="mx-4 text-accent/80">★ NEW ARRIVALS</span>
                <span className="mx-4 text-light/70">EXCLUSIVE DESIGNER COLLECTION</span>
                <span className="mx-4 text-accent/80">★ SPECIAL OCCASION DRESSES</span>
                <span className="mx-4 text-light/70">LUXURY RENTALS</span>
                <span className="mx-4 text-accent/80">★ BRIDAL COLLECTION</span>
                <span className="mx-4 text-light/70">EVENING GOWNS</span>
                <span className="mx-4 text-accent/80">★ PREMIUM QUALITY</span>
                <span className="mx-4 text-light/70">SUSTAINABLE FASHION</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Elegant side text - only render on client side and large screens */}
      {isClient && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block z-20">
          <div className="writing-vertical text-accent/40 text-sm tracking-widest animate-fade-in delay-400">
            <p>ELEGANCE & STYLE</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default React.memo(Hero); 