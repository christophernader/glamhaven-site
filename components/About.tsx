"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="py-24 bg-primary relative overflow-hidden">
      {/* Simplified background with single gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary to-[#080808]"></div>
      
      {/* Optimized background image with reduced opacity */}
      <div className="absolute inset-0 opacity-10 z-0">
        <Image
          src="https://images.unsplash.com/photo-1671159593449-61b5ba964fab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Background texture"
          fill
          className="object-cover object-center"
          style={{ filter: 'brightness(0.3)' }}
        />
      </div>
      
      {/* Gold accent lines - combined into a single element */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-px bg-accent/30"></div>
        <div className="absolute top-0 right-0 w-1/3 h-px bg-accent/30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-px bg-accent/30"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-px bg-accent/30"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent mb-4 animate-fade-in">Our Services</h2>
          <div className="w-24 h-px bg-accent/50 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-light/90 mb-6 leading-relaxed text-center">
              GlamHaven was founded by mother-daughter duo Ghada and Emma with a vision to bring luxury fashion to Lebanese women. 
              We believe that every special occasion deserves the perfect dress, without the commitment of ownership.
            </p>
            
            <p className="text-light/90 mb-8 leading-relaxed text-center">
              Our curated collection features designer pieces imported directly from the USA, selected for their timeless elegance and exceptional quality. 
              Each dress in our inventory is meticulously maintained to ensure it arrives in perfect condition for your event.
            </p>
            
            {/* Features - Updated with a more professional design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-dark/40 backdrop-blur-sm border border-accent/20 p-6 rounded-sm transition-all duration-300 hover:border-accent/40 hover:bg-dark/60">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-accent font-serif text-xl text-center mb-3">Premium Quality</h3>
                <p className="text-light/70 leading-relaxed text-center">
                  Designer dresses made in the USA, maintained to perfection, ensuring you look flawless for your special occasion.
                </p>
              </div>
              
              <div className="bg-dark/40 backdrop-blur-sm border border-accent/20 p-6 rounded-sm transition-all duration-300 hover:border-accent/40 hover:bg-dark/60">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-accent font-serif text-xl text-center mb-3">Convenient Service</h3>
                <p className="text-light/70 leading-relaxed text-center">
                  Easy booking and flexible rental periods tailored to your event schedule, with delivery options available.
                </p>
              </div>
              
              <div className="bg-dark/40 backdrop-blur-sm border border-accent/20 p-6 rounded-sm transition-all duration-300 hover:border-accent/40 hover:bg-dark/60">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-accent font-serif text-xl text-center mb-3">Sustainable Fashion</h3>
                <p className="text-light/70 leading-relaxed text-center">
                  Eco-friendly approach to luxury style that reduces waste and extends garment lifecycles while enjoying premium quality.
                </p>
              </div>
            </div>
            
            {/* Consultation Services */}
            <div className="bg-dark/60 backdrop-blur-sm border border-accent/30 p-8 rounded-sm mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <Image
                    src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Fashion consultation"
                    width={400}
                    height={600}
                    className="object-cover rounded-sm border border-accent/20"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-serif text-2xl text-accent mb-4">Fashion Consultation Services</h3>
                  <p className="text-light/80 mb-4 leading-relaxed">
                    Our expert stylists provide personalized fashion advice to help you find the perfect dress for your body type, 
                    event, and personal style. We understand that choosing the right dress is about more than just aesthetics—it's 
                    about feeling confident and comfortable.
                  </p>
                  <p className="text-light/80 mb-6 leading-relaxed">
                    Our consultation services include:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-light/80">Personalized style assessment and recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-light/80">Color analysis to determine your most flattering palette</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-light/80">Event-appropriate styling guidance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-light/80">Accessory pairing and complete look creation</span>
                    </li>
                  </ul>
                  <div className="inline-block border border-accent/50 bg-accent/10 px-6 py-3 text-accent hover:bg-accent/20 transition-all duration-300 cursor-pointer">
                    Book a Consultation
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact box */}
            <div className="p-6 border border-accent bg-dark/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              <h3 className="font-serif text-xl text-accent mb-4">Contact Us</h3>
              <p className="text-light/80 mb-4">
                We exclusively communicate through WhatsApp for all inquiries, bookings, and arrangements.
                Reach out to us to schedule a viewing, consultation, or discuss your event needs.
              </p>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="font-medium text-accent">WhatsApp: +961 XX XXX XXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 