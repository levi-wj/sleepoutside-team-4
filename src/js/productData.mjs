import { convertToJson } from './utils.mjs';

export function getData(category = 'tents') {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  const products = await getData();
  const product = products.find((item) => item.Id === id);

  if (!product) { throw new Error(400); }

  return product;
}
