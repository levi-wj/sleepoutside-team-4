import { renderHeaderFooter } from '../utils.mjs';
import CheckoutForm from '../components/CheckoutForm.svelte';

new CheckoutForm({
    target: document.querySelector('.products')
});
renderHeaderFooter();