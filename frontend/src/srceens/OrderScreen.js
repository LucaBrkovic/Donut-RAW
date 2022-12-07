
import {  hideLoading, parseRequestUrl, rerender, showLoading, showMessage  } from "../util"
import {  deliverOrder, getOrder, getPaypalClientId, payOrder } from "../api"
import { getUserInfo } from "../localStorage";


const OrderScreen = {
  after_render:  () => {
    
  },
  render: async() => {
    const { isAdmin } = getUserInfo()
    const request = parseRequestUrl()
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt
    } = await getOrder(request.id)
   
    return `
    <div>
      <h1 class="title ordero"> Order ${_id} </h1>
      <div class="order">
        <div class="order-info">
          <div>
            <h2 class="title">Shipping</h2>
            <div class="price-tag small">
            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
            ${shipping.country}
            </div>
            ${isDelivered ? `<div class="success"> Delivered at ${deliveredAt}</div>`
            : `<div class="error"> Not Delivered </div>`
          }
          </div>
          <div>
            <h2 class="title">Payment</h2>
            <div class="price-tag small">
             Payment Method : ${payment.paymentMethod} 
            </div>
            ${isPaid ? `<div class="success"> Paid at ${paidAt}</div>`
            : `<div class="error"> Not Paid </div>`
          }
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2 class="title">Shopping Cart</h2>
                <div class= "price-tag">Price</div>
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
                    <div class="price-tag small"> Qty: ${item.qty} </div>
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
                 <li class="price-tag small"><div>Items</div><div>$${itemsPrice}</div></li>
                 <li class="price-tag small"><div>Shipping</div><div>$${shippingPrice}</div></li>
                 <li class="price-tag small"><div>Tax</div><div>$${taxPrice}</div></li>
                 <li class="total"><div>Order Total</div><div>$${totalPrice}</div></li> 
                 <li><button class="fw btnPlace id="">Pay</button></li>
                
        </div>
      </div>
    </div>
    `
  },
}
export default OrderScreen;