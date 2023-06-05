
import { renderHeaderFooter, getbyid } from '../utils.mjs';

renderHeaderFooter();

function showConfirmation() {
    getbyid('confirmation-message').style.display = 'block';
  }
  
  getbyid('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    showConfirmation();
  });