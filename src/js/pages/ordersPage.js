import { renderHeaderFooter, getbyid } from '../utils.mjs';
import OrdersList from '../components/OrdersList.svelte';
import { checkLogin } from '../auth.mjs';

let token = checkLogin();
renderHeaderFooter();
new OrdersList({ target: getbyid('orders'), props:{token} });