'use client';

import { useState, useEffect } from 'react';
import './sentinel-landing.css';

export default function SentinelLanding() {
  const [score, setScore] = useState(0);
  const [gaugeAngle, setGaugeAngle] = useState(-90);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate score counting
    const targetScore = 84;
    const duration = 2500;
    const steps = 60;
    const increment = targetScore / steps;
    const stepDuration = duration / steps;

    let currentScore = 0;
    const scoreTimer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        setScore(targetScore);
        clearInterval(scoreTimer);
      } else {
        setScore(Math.floor(currentScore));
      }
    }, stepDuration);

    // Animate gauge
    const targetAngle = 45; // 84% of 180 degrees is about 150 degrees, starting from -90
    let currentAngle = -90;
    const angleIncrement = (targetAngle - (-90)) / steps;
    
    const gaugeTimer = setInterval(() => {
      currentAngle += angleIncrement;
      if (currentAngle >= targetAngle) {
        setGaugeAngle(targetAngle);
        clearInterval(gaugeTimer);
      } else {
        setGaugeAngle(currentAngle);
      }
    }, stepDuration);

    // Setup EmailJS form submission
    const handleFormSubmit = (event) => {
      event.preventDefault();
      
      const form = event.target;
      const submitButton = form.querySelector('button[type="submit"]');
      const messageDiv = document.getElementById('form-message');
      
      // Disable submit button
      submitButton.disabled = true;
      const originalButtonHTML = submitButton.innerHTML;
      submitButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="sentinel-spinner">
          <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25"/>
          <path d="M10 2 A 8 8 0 0 1 18 10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
        Sending...
      `;
      
      // Hide previous messages
      messageDiv.style.display = 'none';
      messageDiv.className = 'sentinel-form-message';
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        user_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };
      
      // Simulate sending (replace with actual EmailJS integration)
      // To use EmailJS:
      // 1. Install: npm install @emailjs/browser
      // 2. Import: import emailjs from '@emailjs/browser';
      // 3. Initialize: emailjs.init('YOUR_PUBLIC_KEY');
      // 4. Send: emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form)
      
      setTimeout(() => {
        // Success
        messageDiv.className = 'sentinel-form-message success';
        messageDiv.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
        messageDiv.style.display = 'block';
        
        form.reset();
        
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 5000);
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }, 1500);
      
      // For actual EmailJS implementation, use this pattern:
      /*
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then((result) => {
          messageDiv.className = 'sentinel-form-message success';
          messageDiv.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
          messageDiv.style.display = 'block';
          form.reset();
          setTimeout(() => messageDiv.style.display = 'none', 5000);
        })
        .catch((error) => {
          messageDiv.className = 'sentinel-form-message error';
          messageDiv.textContent = '✗ Failed to send message. Please try again.';
          messageDiv.style.display = 'block';
          setTimeout(() => messageDiv.style.display = 'none', 7000);
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonHTML;
        });
      */
    };
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    return () => {
      clearInterval(scoreTimer);
      clearInterval(gaugeTimer);
      if (contactForm) {
        contactForm.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, []);

  const circumference = 2 * Math.PI * 140;
  const scorePercentage = score / 100;
  const offset = circumference - (scorePercentage * circumference * 0.75); // 0.75 for 270 degrees



  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };



  return (
    <div className="sentinel-container">
      <div className="sentinel-background">
        <div className="sentinel-glow sentinel-glow-1"></div>
        <div className="sentinel-glow sentinel-glow-2"></div>
        <div className="sentinel-glow sentinel-glow-3"></div>
      </div>

      {/* Navbar */}
      <nav className="sentinel-navbar">
        <div className="sentinel-navbar-content">
          <div className="sentinel-navbar-logo">
            {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="url(#logo-gradient)" strokeWidth="2.5"/>
              <path d="M16 8 L16 24 M10 16 L22 16" stroke="url(#logo-gradient)" strokeWidth="2.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="sentinel-navbar-brand">Sentinel</span> */}


            <img className='logo' src="favicon.ico" alt="" />
          </div>


          <div class="sentinel-navbar-toggle" id="navbarToggle" >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>

          <div className="sentinel-navbar-links">
            <a href="#home" className="sentinel-navbar-link sentinel-navbar-link-active">Home</a>
            <a href="#contact" className="sentinel-navbar-link sentinel-btn-nav">Contact Us</a>
          </div>
        </div>
      </nav>

      

      <main className={`sentinel-main ${isVisible ? 'sentinel-visible' : ''}`}>
        {/* Hero Section */}
        <section id="home" className="sentinel-hero">
          <div className="sentinel-hero-content">
            <div className="sentinel-hero-text">
              <h1 className="sentinel-hero-title">
                Your personal<br />
                finance smoke<br />
                detector
              </h1>
              <p className="sentinel-hero-subtitle">
                Most apps track where your money went.<br />
                Sentinel warns you before it's gone.
              </p>
              <div className="sentinel-hero-buttons">
                <button className="sentinel-btn sentinel-btn-primary">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19C7.5 18.77 7.5 18.14 7.5 17.31C4.73 17.91 4.14 16.01 4.14 16.01C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.87 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26C12.5 17.6 12.5 18.68 12.5 19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 4.48 15.52 0 10 0Z"/>
                  </svg>
                  Connect Telegram
                </button>
                <button className="sentinel-btn sentinel-btn-secondary">
                  [ See Demo ]
                </button>
              </div>
            </div>

            <div className="sentinel-hero-visual">
              {/* Score Ring */}
              <div className="sentinel-score-ring">
                <svg className="sentinel-ring-svg" viewBox="0 0 320 320">
                  <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <filter id="glow-effect">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="16"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="140"
                    fill="none"
                    stroke="url(#ring-gradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-135 160 160)"
                    filter="url(#glow-effect)"
                    className="sentinel-progress-circle"
                  />
                </svg>
                <div className="sentinel-score-content">
                  <div className="sentinel-score-number">{score}</div>
                  <div className="sentinel-score-label">Financial Health</div>
                  <div className="sentinel-score-status">Stable</div>
                </div>
              </div>

              {/* Gauge */}
              <div className="sentinel-gauge">
                <svg className="sentinel-gauge-svg" viewBox="0 0 200 120">
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (scorePercentage * 251.2)}
                  />
                </svg>
                <div 
                  className="sentinel-gauge-needle"
                  style={{ transform: `rotate(${gaugeAngle}deg)` }}
                >
                  <div className="sentinel-gauge-needle-line"></div>
                  <div className="sentinel-gauge-needle-dot"></div>
                </div>
                <div className="sentinel-gauge-icon"></div>
                <div className="sentinel-gauge-flame">🔥</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="sentinel-how-it-works">
          <div className="sentinel-step">
            <div className="sentinel-step-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="20" y="10" width="40" height="60" rx="8" stroke="currentColor" strokeWidth="3"/>
                <rect x="30" y="20" width="20" height="30" rx="2" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <h3 className="sentinel-step-title">Forward.</h3>
            <p className="sentinel-step-description">
              Send your bank SMS<br />
              alerts to the bot.
            </p>
            <p className="sentinel-step-note">
              Only transaction alerts.<br />
              No access to your bank.
            </p>
          </div>

          <div className="sentinel-step-arrow">→</div>

          <div className="sentinel-step">
            <div className="sentinel-step-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="3"/>
                <path d="M 30 35 Q 35 30 40 35 T 50 35" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <path d="M 30 45 Q 35 50 40 45 T 50 45" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <circle cx="32" cy="32" r="2" fill="currentColor"/>
                <circle cx="48" cy="32" r="2" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="sentinel-step-title">Analyze.</h3>
            <p className="sentinel-step-description">
              AI checks your<br />
              spending patterns<br />
              in real time.
            </p>
          </div>

          <div className="sentinel-step-arrow">→</div>

          <div className="sentinel-step">
            <div className="sentinel-step-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M 40 15 L 50 30 L 65 35 L 52.5 47.5 L 55 62.5 L 40 55 L 25 62.5 L 27.5 47.5 L 15 35 L 30 30 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <h3 className="sentinel-step-title">Protect.</h3>
            <p className="sentinel-step-description">
              Get a 'Slow Down'<br />
              warning if you're<br />
              spending too fast.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="sentinel-features">
          <div className="sentinel-feature">
            <div className="sentinel-feature-icon"></div>
            <h4 className="sentinel-feature-title">Zero Entry:</h4>
            <p className="sentinel-feature-text">No manual tracking. Just forward alerts.</p>
          </div>

          <div className="sentinel-feature">
            <div className="sentinel-feature-icon"></div>
            <h4 className="sentinel-feature-title">AI Logic:</h4>
            <p className="sentinel-feature-text">Understands patterns, not just numbers.</p>
          </div>

          <div className="sentinel-feature">
            <div className="sentinel-feature-icon"></div>
            <h4 className="sentinel-feature-title">Private:</h4>
            <p className="sentinel-feature-text">Read-only. We never touch your funds.</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="sentinel-cta">
          <h2 className="sentinel-cta-title">Stop flying blind.</h2>
          <button className="sentinel-btn sentinel-btn-cta">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.48 0 0 4.48 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19C7.5 18.77 7.5 18.14 7.5 17.31C4.73 17.91 4.14 16.01 4.14 16.01C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.87 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26C12.5 17.6 12.5 18.68 12.5 19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 4.48 15.52 0 10 0Z"/>
            </svg>
            Activate Sentinel
          </button>
          <p className="sentinel-cta-note">Your data is encrypted end-to-end.</p>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="sentinel-contact">
          <div className="sentinel-contact-container">
            <div className="sentinel-contact-header">
              <h2 className="sentinel-contact-title">Get in Touch</h2>
              <p className="sentinel-contact-subtitle">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
            
            <form className="sentinel-contact-form" id="contact-form">
              <div className="sentinel-form-row">
                <div className="sentinel-form-group">
                  <label htmlFor="user_name" className="sentinel-form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    className="sentinel-form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="sentinel-form-group">
                  <label htmlFor="user_email" className="sentinel-form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    className="sentinel-form-input"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="sentinel-form-group">
                <label htmlFor="subject" className="sentinel-form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="sentinel-form-input"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="sentinel-form-group">
                <label htmlFor="message" className="sentinel-form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="sentinel-form-textarea"
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="sentinel-btn sentinel-btn-submit">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M2 10 L18 2 L10 18 L8 11 L2 10Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" opacity="0.2"/>
                  <path d="M8 11 L18 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Send Message
              </button>
              
              <div className="sentinel-form-message" id="form-message"></div>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="sentinel-footer">
          <a href="#privacy">Privacy Policy</a>
          <span className="sentinel-footer-dot">•</span>
          <a href="#terms">Terms of Service</a>
          <span className="sentinel-footer-dot">•</span>
          <a href="#contact">Contact</a>
        </footer>
      </main>
    </div>
  );
}