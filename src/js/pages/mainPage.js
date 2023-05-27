
import { renderHeaderFooter } from '../utils.mjs';

renderHeaderFooter();

function showConfirmation() {
    document.getElementById('confirmation-message').style.display = 'block';
  }
  
  document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    showConfirmation();
  });