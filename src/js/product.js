import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';

productDetails(getParam('id'), '.product-detail');