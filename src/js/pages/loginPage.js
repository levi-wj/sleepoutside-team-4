import { renderHeaderFooter, getbyid } from '../utils.mjs';
import LoginForm from '../components/LoginForm.svelte';

renderHeaderFooter();
new LoginForm({ target: getbyid('loginForm') });