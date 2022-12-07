import { getShipping, getUserInfo, setShipping,  } from "../localStorage"

import CheckoutSteps from "../components/CheckoutSteeps"
import { colorWhite } from "../util";
const ShippingScreen = {
  after_render: () => {
    
  
    document.getElementById('shipping-form').addEventListener('submit', async (e) => {
     e.preventDefault()
     setShipping({
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postalCode: document.getElementById("postalCode").value,
      country: document.getElementById("country").value,
     })
     document.location.hash = "/payment"
      });
  },
    render: () => {
      const { name} = getUserInfo()
      // ako nema imena da ga prebaci na home page
      if(!name) {
        document.location.hash = "/"
      }
      // after checked if he is logging we get shipping information
      const {address, city, postalCode, country } = getShipping()

        
        return `
        ${CheckoutSteps.render({step1: true, step2: true})}
        <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
            <li>
              <h1 class="title">Shipping</h1> 
            </li>
            <li>
            <div class="input-group">
            <label  class="label">Address</label>
            <input value="${address}" name="address" id="address" class="input" type="text">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label  class="label">City</label>
            <input value="${city}" name="city" id="city" class="input" type="text">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label  class="label">Postal Code</label>
            <input value="${postalCode}" name="postalCode" id="postalCode" class="input" type="text">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label  class="label">Country</label>
            <input value="${country}" name="country" id="country" class="input" type="text">
            <div>
            </li>
            <li>
              <button type="submit" class="btnCheck">Continue</button>
            </li>
           
          </ul>
        </form>
      </div>
        `
    }
}

export default ShippingScreen