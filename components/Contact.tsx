"use client";

import { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    
    // Construct WhatsApp message
    const whatsappMessage = `Hello GlamHaven! My name is ${formData.name}. ${formData.message} Preferred date: ${formData.date}`;
    const whatsappUrl = `https://wa.me/961XXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      date: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="section-padding bg-dark section-texture">
      <div className="container-custom">
        <ScrollAnimation animation="fade-in" className="text-center mb-12">
          <h2 className="heading-large mb-4">Contact Us</h2>
          <p className="body-text max-w-2xl mx-auto">
            Ready to find your perfect dress? Fill out this form and we'll contact you via WhatsApp, or message us directly.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollAnimation animation="fade-in-left">
            <h3 className="heading-medium mb-6">Contact Information</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1 text-light">Location</h4>
                  <p className="text-light/70">Beirut, Lebanon</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1 text-light">WhatsApp</h4>
                  <p className="text-light/70">+961 XX XXX XXX</p>
                  <p className="text-sm text-light/60 mt-1">We exclusively communicate through WhatsApp</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1 text-light">Our Team</h4>
                  <p className="text-light/70">Ghada & Emma</p>
                </div>
              </div>
            </div>
            
            <h3 className="heading-medium mb-6">Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-light">Monday - Saturday</span>
                <span className="text-light/70">10:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-light">Sunday</span>
                <span className="text-light/70">By appointment only</span>
              </div>
            </div>
            
            <ScrollAnimation animation="fade-in-up" delay={200}>
              <div className="mt-8 p-4 bg-secondary rounded-lg shadow-md border border-accent/20">
                <h4 className="font-medium text-lg mb-2 text-light">Direct WhatsApp Contact</h4>
                <p className="text-sm mb-4 text-light/80">Click the button below to contact us directly via WhatsApp:</p>
                <a 
                  href="https://wa.me/961XXXXXXXX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full button-primary py-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </ScrollAnimation>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in-right">
            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-md border border-accent/20">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-light/80 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 bg-primary text-light"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-light/80 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 bg-primary text-light"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-light/80 mb-1">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 bg-primary text-light"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-light/80 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 bg-primary text-light"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full button-primary py-3 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Send via WhatsApp
              </button>
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Contact; 