import { writable } from 'svelte/store';
import { getTotalCartItems } from './cart';

export const cartCount = writable(getTotalCartItems());