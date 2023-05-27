import ProductList from '../components/ProductList.svelte';
import { renderHeaderFooter, getParam } from '../utils.mjs';

const category = getParam('category');
const q = getParam('q');

renderHeaderFooter();
new ProductList({
    target: document.querySelector('.products'),
    props: {
        category: category,
        query: q
    }
});

document.title = `Top Products: ${category}`;