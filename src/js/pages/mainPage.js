
import { renderHeaderFooter, getbyid } from '../utils.mjs';

renderHeaderFooter();

function showConfirmation() {
    getbyid('confirmation-message').style.display = 'block';
  }
  
  getbyid('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    showConfirmation();
  });

// Close button functionality
document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('banner').style.display = 'none';
  });

  document.getElementById('register-btn').addEventListener('click', function() {
    // Display a thank you message
    document.getElementById('banner-content').innerHTML = '<h2>Thank You!</h2><p>Thank you for registering!</p>';

    // Close the banner/modal after a brief delay (e.g., 2 seconds)
    setTimeout(function() {
      document.getElementById('banner').style.display = 'none';
    }, 2000);
  });