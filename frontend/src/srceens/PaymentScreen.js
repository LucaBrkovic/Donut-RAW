import { getUserInfo, setPayment } from "../localStorage"
import CheckoutSteps from "../components/CheckoutSteeps"

const PaymentScreen = {
  after_render: () => {
    document
      .getElementById('payment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value
        setPayment({ paymentMethod })
        document.location.hash = '/placeorder'
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
        const mainBody = document.getElementById("main-body")
            mainBody.style.backgroundColor = "#fff8f8";
            const mainHeader = document.getElementById("header-container")
      mainHeader.style.boxShadow = "0px 2px 2px 0 #ff69b4"
        return `
        ${CheckoutSteps.render({step1: true, step2: true, step3: true,})}
        <div class="form-container">
        <form id="payment-form">
          <ul class="form-items">
            <li>
              <h1 class="title">Payment</h1> 
            </li>
            <li>
            <div>
         
             <input value="Stripe" name="payment-method" id="stripe"  type="radio" checked>
             <label for"stripe" class="payment-title">Stripe</label>
            </div>
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

export default PaymentScreen