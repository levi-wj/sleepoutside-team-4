<script>
  import { onMount } from 'svelte';
  import { formDataToJSON, getLocalStorage, alertMessage } from '../utils.mjs';
  import { getCartTotal, getTotalCartItems } from '../cart.js';
  import { postCheckout } from '../externalServices.mjs';
  import StateDropdown from './StateDropdown.svelte';
  
  let itemCount;
  let subtotal;
  let shipping;
  let tax;
  let total;

  const getTotals = () => {
    subtotal = getCartTotal();
    itemCount = getTotalCartItems();

    shipping = 10 + ((itemCount - 1) * 2);
    tax = (subtotal * .06);
    total = (subtotal + shipping + parseInt(tax));
  }

  const calculateItemSummary = () => {
    getTotals();
    tax = tax.toFixed(2);
    total = total.toFixed(2);
  }

  const packageItems = (data) => {
    const items = getLocalStorage('so-cart') || [];
    data.items = [];
    items.forEach(i => {
      data.items.push({
        id: i.Id,
        name: i.Name,
        price: i.FinalPrice,
        // quantitiy: i.quantity
      });
    });

    return data;
  }

  const handleSubmit = async e => {
    const data = formDataToJSON(e.target);
    const postData = packageItems(data);

    e.preventDefault();

    postData.orderTotal = total;
    postData.shipping = shipping;
    postData.tax = tax;
    try {
      await postCheckout(postData);
    } catch (err) {
      alertMessage(err.message);
    }
  }
  onMount(calculateItemSummary);
</script>

<form on:submit={handleSubmit}>
  <fieldset class="shipping-details">
    <legend>Shipping</legend>
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" name="fname" placeholder="John" required />
    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" name="lname" placeholder="Doe" required />
    <label for="street">Street</label>
    <input type="text" id="street" name="street" placeholder="ex. 123 Outside Street" required />
    <label for="city">City</label>
    <input type="text" id="city" name="city" placeholder="" required />
    <label for="state">State</label>
    <StateDropdown />
    <label for="zip">Zip Code</label>
    <input type="number" id="zip" name="zip" placeholder="ex. 12345" required />
  </fieldset>

  <fieldset class="checkout-payment">
    <legend>Payment</legend>
    <label for="cc">Credit Card Number</label>
    <input type="number" id="cc" name="cardNumber" placeholder="1234123412341234" required />
    <label for="exp">Expiration Date</label>
    <input type="text" id="exp" name="expiration" placeholder="12/34" required />
    <label for="cvv">CVV</label>
    <input type="text" id="cvv" name="code" placeholder="123" required />
  </fieldset>

  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <div class="subtotal">
      <p>Item Subtotal({itemCount})</p>
      <p>${subtotal}</p>
    </div>
    <p>Shipping Estimate: ${shipping}</p>
    <p>Tax: ${tax}</p>
    <p class="bold">Order Total: ${total}</p>
  </fieldset>

  <button type="submit">Checkout</button>
</form>

<style>
  fieldset {
    margin-bottom: 1em;
    border-radius: 5px;
    border: 1.5px solid lightgray;
  }

  legend {
    font-size: 1.25em;
    font-weight: 600;
    padding: 1em;
    /* margin-bottom: .5em; */
  }

  label {
    font-size: 1.1em;
  }

  input {
    height: 3em;
    width: 50%;
    display: block;
    padding: .5em;
    margin-bottom: 1em;
    border-radius: .5em;
    border: 2px solid gray;
  }
  input:focus, fieldset input:focus {
    outline: none;
    border: 3px solid #f0a868;
  }
  fieldset input:valid {
    border: 3px solid rgb(98, 162, 98);
  }
  fieldset input:not(:placeholder-shown):invalid {
    border: 3px solid rgb(216, 103, 103);
  }

  .subtotal {
    font-size: 1.1em;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }
  .checkout-summary {
    font-size: 1.1em;
  }
</style>