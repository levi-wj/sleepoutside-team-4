import { getbyid } from '../utils.mjs';
import LoginForm from '../components/LoginForm.svelte';

new LoginForm({ target: getbyid('loginForm') });