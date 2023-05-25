import ProductList from '../components/ProductList.svelte';
import { renderHeaderFooter, getParam } from '../utils.mjs';

const category = getParam('category');

renderHeaderFooter();
new ProductList({
    target: document.querySelector('.products'),
    props: {
        category: category
    }
});

document.title = `Top Products: ${category}`