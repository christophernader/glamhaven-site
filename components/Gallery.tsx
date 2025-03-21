"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';
import { useSwipeable } from 'react-swipeable';

// Define the GalleryItem type
export interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  title: string;
  category: string;
  brand: string;
}

// Gallery image data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Elegant white wedding dress",
    title: "Bridal Elegance",
    category: "Wedding",
    brand: "Valentino"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Glamorous evening gown",
    title: "Evening Glamour",
    category: "Evening",
    brand: "Dior"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Stylish cocktail dress",
    title: "Modern Chic",
    category: "Cocktail",
    brand: "Chanel"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Vibrant party dress",
    title: "Party Glamour",
    category: "Party",
    brand: "Versace"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Elegant summer dress",
    title: "Summer Collection",
    category: "Casual",
    brand: "Gucci"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Luxurious gala dress",
    title: "Gala Elegance",
    category: "Evening",
    brand: "Elie Saab"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Vintage inspired dress",
    title: "Vintage Charm",
    category: "Special",
    brand: "Prada"
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Sequined evening gown",
    title: "Golden Sequin Gown",
    category: "Evening",
    brand: "Zuhair Murad"
  }
];

// Create a large dataset by duplicating the existing items
const generateLargeGallery = (): GalleryItem[] => {
  const largeGallery: GalleryItem[] = [];
  for (let i = 0; i < 5; i++) {
    galleryItems.forEach((item, index) => {
      largeGallery.push({
        ...item,
        id: item.id + (galleryItems.length * i)
      });
    });
  }
  return largeGallery;
};

const largeGalleryItems = generateLargeGallery();

// Optimize image loading by using smaller sizes and WebP format
const optimizeImageUrl = (url: string): string => {
  // Add WebP format and reduce quality
  if (url.includes('unsplash.com')) {
    return `${url}&w=800&q=75&fm=webp`;
  }
  if (url.includes('pexels.com')) {
    return `${url}?cs=srgb&w=800&q=75`;
  }
  return url;
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [animateItems, setAnimateItems] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showFloatingPagination, setShowFloatingPagination] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 8; // Reduced for better visibility on mobile
  
  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(galleryItems.map(item => item.category)));
    return ['all', ...uniqueCategories];
  }, []);
  
  // Filter items based on active category
  const filteredItems = useMemo(() => {
    return activeCategory === 'all' 
      ? largeGalleryItems 
      : largeGalleryItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);
  
  // Handle category change with performance optimization
  const handleCategoryChange = useCallback((category: string) => {
    setAnimateItems(false);
    setTimeout(() => {
      setActiveCategory(category);
      setAnimateItems(true);
    }, 300);
  }, []);
  
  // Initialize animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Get current items for pagination
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
    setAnimateItems(true);
  }, [activeCategory]);
  
  // Handle scroll to show/hide floating pagination
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const { top, bottom } = galleryRef.current.getBoundingClientRect();
        setShowFloatingPagination(top < 0 && bottom > window.innerHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle page change with animation
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    if (page < 1 || page > totalPages) return;
    
    setAnimateItems(false);
    setIsLoading(true);
    
    // Reduce loading delay for faster navigation
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      
      // Scroll to top of gallery when page changes
      if (galleryRef.current) {
        const firstCard = galleryRef.current.querySelector('.polaroid-card');
        const offset = 100; // Account for fixed header and some spacing
        
        if (firstCard) {
          const cardPosition = firstCard.getBoundingClientRect().top;
          const offsetPosition = cardPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback if card not found
        const elementPosition = galleryRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        }
      }
      
      setTimeout(() => {
        setAnimateItems(true);
      }, 50); // Faster animation start
    }, 200); // Reduced from 500ms to 200ms
  };

  // Handle swipe gestures for navigation
  const handlers = useSwipeable({
    onSwipedLeft: () => handlePageChange(currentPage + 1),
    onSwipedRight: () => handlePageChange(currentPage - 1),
    trackMouse: true,
    swipeDuration: 250, // Faster swipe detection
    touchEventOptions: { passive: false }
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handlePageChange(currentPage + 1);
      } else if (e.key === 'ArrowLeft') {
        handlePageChange(currentPage - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  // Handle lightbox navigation
  const handleLightboxNavigation = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    } else {
      newIndex = (currentIndex + 1) % filteredItems.length;
    }
    
    setSelectedImage(filteredItems[newIndex].id);
  };

  return (
    <section id="gallery" className="py-12 pt-4 bg-primary relative overflow-hidden" ref={galleryRef}>
      {/* Simplified background with fewer layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary to-[#080808]"></div>
      
      {/* Single background image with optimized filter */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src="https://images.unsplash.com/photo-1540457036297-448b6b99e91c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
          alt="Elegant fashion background"
          fill
          sizes="100vw"
          quality={75}
          priority
          className="object-cover object-center"
          style={{ 
            filter: 'brightness(0.5) contrast(1.2) sepia(0.3)',
            transform: 'translateZ(0)'
          }}
        />
        {/* Single overlay instead of multiple */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-transparent to-primary/90"></div>
      </div>
      
      {/* Single blurry shader effect */}
      <div className="blurry-shader absolute inset-0 z-5"></div>
      
      <div className="container-custom relative z-10 mt-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">Our Collection</h2>
          <p className="text-light/80 max-w-2xl mx-auto">
            Browse our curated selection of premium dresses imported from the USA. Each piece is carefully selected for quality, style, and elegance.
          </p>
        </div>
        
        {/* Category filters - memoized to prevent re-renders */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category 
                  ? 'bg-accent text-dark shadow-md transform scale-105' 
                  : 'bg-secondary/70 text-light hover:bg-secondary hover:shadow-sm'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Swipe instruction for mobile */}
        <div className="text-center mb-6 text-light/60 text-sm md:hidden">
          <p>Swipe left or right to navigate pages</p>
        </div>
        
        {/* Gallery grid with original polaroid-style cards */}
        <div 
          {...handlers}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 relative"
        >
          {/* Page transition indicators */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 md:-ml-12 z-10 hidden md:block">
            {currentPage > 1 && (
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-10 h-10 rounded-full bg-dark/80 text-accent flex items-center justify-center border border-accent/30 hover:bg-dark hover:border-accent transition-all duration-300"
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 md:-mr-12 z-10 hidden md:block">
            {currentPage < totalPages && (
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-10 h-10 rounded-full bg-dark/80 text-accent flex items-center justify-center border border-accent/30 hover:bg-dark hover:border-accent transition-all duration-300"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            </div>
          
          {currentItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`transition-all duration-300 ${
                animateItems 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{ transitionDelay: `${Math.min(index * 50, 500)}ms` }}
            >
              <div 
                className="polaroid-card cursor-pointer transition-all duration-200 group bg-dark overflow-hidden"
                onClick={() => setSelectedImage(item.id)}
              >
                <div className="image-container relative overflow-hidden">
                  <Image
                    src={optimizeImageUrl(item.image)}
                    alt={item.alt}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    loading={index < 4 ? "eager" : "lazy"}
                    quality={index < 4 ? 80 : 70}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <div className="card-content p-4 bg-dark transition-all duration-300 absolute bottom-0 left-0 right-0 z-10 transform group-hover:translate-y-[calc(100%-80px)]">
                  <div className="card-brand text-xs text-accent uppercase tracking-wider mb-1">{item.brand}</div>
                  <h3 className="card-title text-light font-serif text-lg mb-1">{item.title}</h3>
                  <p className="card-category text-xs text-light/60 mb-3 transition-all duration-300 group-hover:opacity-0">{item.category}</p>
                  <div className="card-meta flex justify-between items-center text-xs text-light/70 transition-all duration-300 group-hover:opacity-0">
                    <span>AVAILABLE FOR RENT</span>
                    <span className="group flex items-center">
                      DETAILS 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Page indicator for mobile */}
        <div className="flex justify-center mt-8 md:hidden">
          <span className="text-light/70">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center hidden md:block">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-secondary/30 text-light/40 cursor-not-allowed'
                    : 'bg-secondary/50 text-light/70 hover:bg-secondary hover:text-light'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-accent text-dark font-medium'
                      : 'bg-secondary/50 text-light/70 hover:bg-secondary hover:text-light'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-secondary/30 text-light/40 cursor-not-allowed'
                    : 'bg-secondary/50 text-light/70 hover:bg-secondary hover:text-light'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Floating pagination for better UX */}
        {totalPages > 1 && showFloatingPagination && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-dark/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl border border-accent/20 hidden md:block">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-secondary/30 text-light/40 cursor-not-allowed'
                    : 'bg-secondary/50 text-light/70 hover:bg-secondary hover:text-light'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show current page and surrounding pages
                const middleIndex = 2;
                let pageToShow;
                
                if (totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (currentPage <= middleIndex + 1) {
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - middleIndex) {
                  pageToShow = totalPages - 4 + i;
                } else {
                  pageToShow = currentPage - middleIndex + i;
                }
                
                return (
                  <button
                    key={pageToShow}
                    onClick={() => handlePageChange(pageToShow)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${
                      currentPage === pageToShow
                        ? 'bg-accent text-dark font-medium'
                        : 'bg-secondary/50 text-light/70 hover:bg-secondary hover:text-light'
                    }`}
                  >
                    {pageToShow}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-secondary/30 text-light/40 cursor-not-allowed'
                    : 'bg-secondary/50 text-light/70 hover:bg-secondary hover:text-light'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="loader"></div>
          </div>
        )}
        
        {/* Lightbox for selected image with navigation */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-dark/95 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-accent transition-transform duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button 
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-accent transition-transform duration-300 hover:scale-110 bg-dark/50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                handleLightboxNavigation('prev');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-accent transition-transform duration-300 hover:scale-110 bg-dark/50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                handleLightboxNavigation('next');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="relative max-w-4xl max-h-[80vh] w-full animate-scale-in">
              {filteredItems.find(item => item.id === selectedImage) && (
                <>
                <Image
                    src={filteredItems.find(item => item.id === selectedImage)!.image}
                    alt={filteredItems.find(item => item.id === selectedImage)!.alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh] mx-auto"
                  priority
                />
                  <div className="absolute bottom-0 left-0 right-0 bg-dark/80 backdrop-blur-sm p-4 text-center">
                    <h3 className="text-accent font-serif text-xl">
                      {filteredItems.find(item => item.id === selectedImage)!.title}
                    </h3>
                    <p className="text-light/70 text-sm mt-1">
                      {filteredItems.find(item => item.id === selectedImage)!.brand} • {filteredItems.find(item => item.id === selectedImage)!.category}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Gallery); 