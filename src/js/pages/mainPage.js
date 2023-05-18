import ProductList from '../components/ProductList.svelte';
import { renderHeaderFooter } from '../utils.mjs';

renderHeaderFooter();
new ProductList({
    target: document.querySelector('.products'),
    props: {
        category: 'tents'
    }
});