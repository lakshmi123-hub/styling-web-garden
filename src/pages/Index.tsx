import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [theme, setTheme] = useState('dark');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', newTheme);
  };

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
      }
    }
  }, []);

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, show success message
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">John Doe</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#blog">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>Hi, I'm <span style={{ color: "#64ffda" }}>John Doe</span></h1>
              <h2>Frontend Developer</h2>
              <p style={{ color: "#8892b0" }}>I design and build exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.</p>
              <div className="d-flex">
                <a href="#projects" className="btn btn-primary me-3">View My Work</a>
                <a href="#contact" className="btn btn-outline-primary">Get In Touch</a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTY4NDAzMTM5Mg&ixlib=rb-4.0.3&q=80&w=300" alt="John Doe" className="profile-img" style={{ border: "5px solid #64ffda" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section-padding" style={{ backgroundColor: "#112240" }}>
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="row">
            <div className="col-lg-6 about-text">
              <p>Hello! I'm John, a frontend developer based in New York City. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences.</p>
              
              <p>Shortly after graduating from <span style={{ color: "#64ffda" }}>Harvard University</span>, I joined the engineering team at Upstatement where I work on a wide variety of interesting and meaningful projects on a daily basis.</p>
              
              <p>Here are a few technologies I've been working with recently:</p>
              
              <div className="row mb-4">
                <div className="col-6">
                  <ul style={{ color: "#8892b0" }}>
                    <li>JavaScript (ES6+)</li>
                    <li>React</li>
                    <li>Node.js</li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul style={{ color: "#8892b0" }}>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Next.js</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="skill-item">
                <h4>Frontend Development</h4>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
              
              <div className="skill-item">
                <h4>UI/UX Design</h4>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: "85%" }} aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
              
              <div className="skill-item">
                <h4>Backend Development</h4>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
              
              <div className="skill-item">
                <h4>Mobile App Development</h4>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: "70%" }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section-padding">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="project-card">
                <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="Project" />
                <div className="card-body">
                  <h5>E-commerce Website</h5>
                  <p style={{ color: "#8892b0" }}>A fully responsive e-commerce platform with cart functionality, product filtering, and payment integration.</p>
                  <div className="mb-3">
                    <span className="badge me-2">React</span>
                    <span className="badge me-2">Node.js</span>
                    <span className="badge">MongoDB</span>
                  </div>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-outline-primary btn-sm me-2">View Project</a>
                  <a href="#" className="btn btn-outline-primary btn-sm"><i className="fab fa-github"></i> Code</a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="project-card">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="card-img-top" alt="Project" />
                <div className="card-body">
                  <h5>Task Management App</h5>
                  <p style={{ color: "#8892b0" }}>A feature-rich task management application with drag-and-drop functionality, reminders, and team collaboration.</p>
                  <div className="mb-3">
                    <span className="badge me-2">React</span>
                    <span className="badge me-2">Firebase</span>
                    <span className="badge">Redux</span>
                  </div>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-outline-primary btn-sm me-2">View Project</a>
                  <a href="#" className="btn btn-outline-primary btn-sm"><i className="fab fa-github"></i> Code</a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="project-card">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" className="card-img-top" alt="Project" />
                <div className="card-body">
                  <h5>Portfolio Website</h5>
                  <p style={{ color: "#8892b0" }}>A modern, responsive portfolio website with smooth scrolling, animations, and a fully functional contact form.</p>
                  <div className="mb-3">
                    <span className="badge me-2">HTML</span>
                    <span className="badge me-2">SCSS</span>
                    <span className="badge">JavaScript</span>
                  </div>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-outline-primary btn-sm me-2">View Project</a>
                  <a href="#" className="btn btn-outline-primary btn-sm"><i className="fab fa-github"></i> Code</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blogs section-padding" style={{ backgroundColor: "#112240" }}>
        <div className="container">
          <h2 className="section-title">Latest Blog Posts</h2>
          <div className="row" id="blogPosts">
            {loading ? (
              <div className="col-12 text-center">
                <div className="loading">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading blog posts...</p>
                </div>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="blog-card">
                    <h3 className="blog-title" style={{ textTransform: 'capitalize' }}>{post.title}</h3>
                    <p className="blog-body">{post.body}</p>
                    <a href="#" className="blog-link">Read More <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section-padding">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>john.doe@example.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+1 (123) 456-7890</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>New York City, USA</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links mt-4">
                <a href="#" className="me-3"><i className="fab fa-linkedin fa-2x"></i></a>
                <a href="#" className="me-3"><i className="fab fa-github fa-2x"></i></a>
                <a href="#" className="me-3"><i className="fab fa-twitter fa-2x"></i></a>
                <a href="#"><i className="fab fa-instagram fa-2x"></i></a>
              </div>
            </div>
            
            <div className="col-lg-7">
              <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`} 
                    id="name" 
                    name="name" 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "rgba(10, 25, 47, 0.5)" }}
                  />
                  {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} 
                    id="email" 
                    name="email" 
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "rgba(10, 25, 47, 0.5)" }}
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea 
                    className={`form-control ${formErrors.message ? 'is-invalid' : ''}`} 
                    id="message" 
                    name="message" 
                    rows={5} 
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "rgba(10, 25, 47, 0.5)" }}
                  ></textarea>
                  {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
                </div>
                
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p style={{ color: "#8892b0" }}>© 2025 John Doe. All Rights Reserved.</p>
          
          <div className="social-links">
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          
          <p style={{ fontSize: "0.9rem", color: "#8892b0" }}>Designed & Built with ❤️</p>
        </div>
      </footer>

      {/* Theme Toggle Button */}
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
      </div>
    </>
  );
};

export default Index;
