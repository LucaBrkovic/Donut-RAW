import { cleanCart, getCartItems, getPayment, getShipping } from "../localStorage"
import CheckoutSteps from '../components/CheckoutSteeps'
import { hideLoading, showLoading, showMessage } from "../util"
import { createOrder } from "../api"

const convertCartToOrder = () => {
  const orderItems = getCartItems()
  if (orderItems.length === 0) {
    document.location.hash = '/cart'
  }
  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = '/shipping'
  }
  const payment = getPayment()
  if (!payment.paymentMethod) {
    document.location.hash = '/payment'
  }
  const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0)
  const shippingPrice = itemsPrice > 10 ? 0 : 3
  const taxPrice = Math.round(0.19 * itemsPrice * 100) / 100
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }
}
const PlaceOrderScreen = {
  after_render: async () => {
    document
      .getElementById('btnPlace').addEventListener('click',  async () => {
        const order = convertCartToOrder();
        showLoading()
        const data = await createOrder(order);
        hideLoading()
        if (data.error) {
          showMessage(data.error)
        } else {
          cleanCart();
          document.location.hash = `/order/${data.order._id}`;
        }
      })
  },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();
    return `
    <div>
      ${CheckoutSteps.render({
        step1: true,
        step2: true,
        step3: true,
        step4: true,
      })}
      <div class="order">
        <div class="order-info">
          <div>
            <h2 class="title">Shipping</h2>
            <div class="price-tag small">
            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
            ${shipping.country}
            </div>
          </div>
          <div>
            <h2 class="title">Payment</h2>
            <div class="price-tag small">
             Payment Method : ${payment.paymentMethod} 
            </div>
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2 class="title">Shopping Cart</h2>
                <div class="price-tag">Price</div>
              </li>
              ${orderItems
                .map(
                  (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a class="cart-namee" href="/#/product/${item.product}">${item.name} </a>
                    </div>
                    <div class= "price-tag small"> Qty: ${item.qty} </div>
                  </div>
                  <div class="cart-price"> $${item.price}</div>
                </li>
                `
                )
                .join('\n')}
            </ul>
          </div>
        </div>
        <div class="order-action">
           <ul>
                <li>
                  <h2 class="title">Order Summary</h2>
                 </li>
                 <li><div class="price-tag small">Items</div><div class="price-tag small" >$${itemsPrice}</div></li>
                 <li><div class="price-tag small">Shipping</div><div class="price-tag small">$${shippingPrice}</div></li>
                 <li><div class="price-tag small">Tax</div><div class="price-tag small">$${taxPrice}</div></li>
                 <li class="total"><div>Order Total</div><div class="price-tag small">$${totalPrice}</div></li> 
                 <li class="btnflex">
                 <button class="btnPlace" id="btnPlace">
                 Place Order
                 </button>
        </div>
      </div>
    </div>
    `
  },
}
export default PlaceOrderScreen;