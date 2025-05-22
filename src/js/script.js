
// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  // Check if theme preference is stored in local storage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.classList.add(currentTheme);
    updateThemeIcon(currentTheme === 'light-theme');
  }
  
  // Theme toggle button click event
  if(themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', '');
        updateThemeIcon(false);
      } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        updateThemeIcon(true);
      }
    });
  }
  
  function updateThemeIcon(isLight) {
    if(themeToggle) {
      themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
  }
});

// Form Validation 
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Get error message elements
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      
      // Reset error messages
      nameError.classList.remove('show');
      emailError.classList.remove('show');
      messageError.classList.remove('show');
      
      // Validate name
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name';
        nameError.classList.add('show');
        nameInput.focus();
        return false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email';
        emailError.classList.add('show');
        emailInput.focus();
        return false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        emailInput.focus();
        return false;
      }
      
      // Validate message
      if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message';
        messageError.classList.add('show');
        messageInput.focus();
        return false;
      }
      
      // If all validations pass, show success message
      document.getElementById('formSuccess').style.display = 'block';
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        document.getElementById('formSuccess').style.display = 'none';
      }, 5000);
    });
  }
});

// Blog Posts API Integration
document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blogPosts');
  
  if(blogContainer) {
    // Show loading indicator
    blogContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading blog posts...</div>';
    
    // Fetch blog posts from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        blogContainer.innerHTML = ''; // Clear loading indicator
        
        // Display only the first 6 posts
        posts.slice(0, 6).forEach(post => {
          const blogCard = document.createElement('div');
          blogCard.className = 'col-lg-4 col-md-6 mb-4';
          blogCard.innerHTML = `
            <div class="blog-card">
              <h3 class="blog-title">${post.title}</h3>
              <p class="blog-body">${post.body}</p>
              <a href="#" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
          `;
          blogContainer.appendChild(blogCard);
        });
      })
      .catch(error => {
        blogContainer.innerHTML = `<div class="alert alert-danger">Error loading blog posts: ${error.message}</div>`;
      });
  }
});
