import { getbyid, renderHeaderFooter } from '../utils.mjs';
import ProductDetails from '../components/ProductDetails.svelte';

renderHeaderFooter();
new ProductDetails({ target: getbyid('detail-container') });