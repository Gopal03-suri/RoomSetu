import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Connect with potential buyers",
      description: "Network with serious buyers looking for their dream property through our verified platform."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Browse curated listings",
      description: "Access hand-picked properties that meet our strict quality standards and verification criteria."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Property Appraisal",
      description: "Get accurate property valuations from expert agents using market data and comparative analysis."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Real Estate Photography",
      description: "Professional property photography that showcases your listings in the best possible light."
    }
  ];

  const testimonials = [
    {
      text: "RoomSetu transformed how I find rooms. The matching algorithm connected me with the perfect roommate within days!",
      author: "Priya Sharma",
      role: "Tenant"
    },
    {
      text: "As a property owner, I've found reliable tenants through RoomSetu. The verification process gives me peace of mind.",
      value: "Rajesh Kumar",
      role: "Property Owner"
    },
    {
      text: "The platform's broker community is incredibly professional. I've grown my real estate business significantly.",
      author: "Amit Patel",
      role: "Real Estate Agent"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#F5F0E8]/95 backdrop-blur-sm z-50 border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8B7355] to-[#6B5344] rounded-xl flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🏠</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#4A3F35]">RoomSetu</h1>
                <p className="text-xs sm:text-sm text-[#6B5D4D]">Your bridge to better living.</p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('hero')} className="text-[#4A3F35] hover:text-[#8B7355] font-medium transition">Home</button>
              <button onClick={() => scrollToSection('community')} className="text-[#4A3F35] hover:text-[#8B7355] font-medium transition">Community</button>
              <button onClick={() => scrollToSection('services')} className="text-[#4A3F35] hover:text-[#8B7355] font-medium transition">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-[#4A3F35] hover:text-[#8B7355] font-medium transition">Testimonials</button>
            </div>

            {/* Get Started Button */}
            <button
              onClick={() => navigate('/login')}
              className="bg-[#8B7355] hover:bg-[#6B5344] text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition duration-300 text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4A3F35] leading-tight">
                A place to stay,<br />
                <span className="text-[#8B7355]">a place to connect.</span>
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-[#6B5D4D] max-w-xl mx-auto lg:mx-0">
                Discover your perfect living space and connect with compatible roommates through our smart matching platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('community')}
                  className="bg-[#8B7355] hover:bg-[#6B5344] text-white font-semibold px-8 py-3 rounded-xl transition duration-300 text-base"
                >
                  Learn More
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white font-semibold px-8 py-3 rounded-xl transition duration-300 text-base"
                >
                  Get Started →
                </button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-xl"
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#E8DFD0] rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4C4B0] rounded-full opacity-30"></div>
                
{/* Main Image */}
              <img 
                src="/image.jpeg" 
                alt="RoomSetu Landing Illustration"
                className="w-full h-full object-cover rounded-3xl"
              />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Section - A place for everyone */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A3F35]">
              A place for everyone
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-[#6B5D4D] max-w-3xl mx-auto">
              Whether you're looking to buy, sell, or rent - RoomSetu connects people with rooms and roommates, creating lasting relationships and perfect living arrangements.
            </p>
            
            {/* Three Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#8B7355] hover:bg-[#6B5344] text-white font-bold px-10 py-4 rounded-xl transition duration-300 text-lg">
                Buy
              </button>
              <button className="bg-[#4A3F35] hover:bg-[#6B5344] text-white font-bold px-10 py-4 rounded-xl transition duration-300 text-lg">
                Sell
              </button>
              <button className="bg-[#D4C4B0] hover:bg-[#8B7355] hover:text-white text-[#4A3F35] font-bold px-10 py-4 rounded-xl transition duration-300 text-lg border-2 border-[#8B7355]">
                Rent
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-12 sm:py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12"
          >
            {/* Right Side - Image */}
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E8DFD0] rounded-full opacity-50"></div>
                <div className="relative rounded-3xl overflow-hidden">
                  <img 
                    src="/bro.jpeg" 
                    alt="Broker with Keys"
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </div>

            {/* Left Side - Text */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A3F35]">
                Join our community of trusted brokers
              </h2>
              <p className="mt-6 text-lg text-[#6B5D4D]">
                Connect with a network of verified real estate professionals who understand the local market. Our brokers are committed to transparency, fairness, and helping you find the perfect property or tenant.
              </p>
              <ul className="mt-8 space-y-4 text-[#6B5D4D]">
                <li className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="w-8 h-8 bg-[#8B7355] rounded-full flex items-center justify-center text-white text-sm">✓</span>
                  Verified & trusted professionals
                </li>
                <li className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="w-8 h-8 bg-[#8B7355] rounded-full flex items-center justify-center text-white text-sm">✓</span>
                  Transparent dealings
                </li>
                <li className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="w-8 h-8 bg-[#8B7355] rounded-full flex items-center justify-center text-white text-sm">✓</span>
                  Market expertise
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4A3F35] text-center">
              Our Services
            </h2>
            
            {/* Services Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F5F0E8] rounded-2xl p-6 sm:p-8 hover:shadow-xl transition duration-300"
                >
                  <div className="w-14 h-14 bg-[#8B7355] rounded-xl flex items-center justify-center text-white mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#4A3F35] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#6B5D4D] text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-12 sm:py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#4A3F35] text-center max-w-4xl mx-auto">
              Our platform is tried and trusted by both realtors and consumers
            </h2>

            {/* Testimonials Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
                >
                  {/* Quote Icon */}
                  <div className="text-4xl text-[#8B7355] mb-4">"</div>
                  <p className="text-[#6B5D4D] mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#8B7355] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.author?.[0] || testimonial.value?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-[#4A3F35]">{testimonial.author || testimonial.value}</p>
                      <p className="text-sm text-[#8B7355]">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-[#4A3F35]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Ready to find your perfect place?
            </h2>
            <p className="mt-6 text-lg text-[#D4C4B0]">
              Join thousands of happy tenants and owners who found their perfect match through RoomSetu.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-8 bg-[#8B7355] hover:bg-[#A08060] text-white font-bold px-10 py-4 rounded-xl transition duration-300 text-lg"
            >
              Get Started Now →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3D3228] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#8B7355] rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏠</span>
                </div>
                <h3 className="text-xl font-black text-white">RoomSetu</h3>
              </div>
              <p className="text-[#D4C4B0] text-sm">
                Smart roommate and rental matching platform connecting people with their perfect living spaces.
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-white font-bold mb-4">Address</h4>
              <p className="text-[#D4C4B0] text-sm">
                123 Real Estate Lane<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-white font-bold mb-4">Business Hours</h4>
              <ul className="text-[#D4C4B0] text-sm space-y-2">
                <li>Monday - Friday: 9AM - 7PM</li>
                <li>Saturday: 10AM - 5PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {/* Facebook */}
                <a href="#" className="w-10 h-10 bg-[#8B7355] hover:bg-[#A08060] rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" className="w-10 h-10 bg-[#8B7355] hover:bg-[#A08060] rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-10 h-10 bg-[#8B7355] hover:bg-[#A08060] rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162Zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4Zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-[#8B7355] text-center">
            <p className="text-[#D4C4B0] text-sm">
              © 2026 RoomSetu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
