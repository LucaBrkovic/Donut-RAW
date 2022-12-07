import { colorWhite, hideLoading, parseRequestUrl, rerender, showLoading } from '../util';
import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems()
  const existItem = cartItems.find(x => x.product === item.product)
  if (existItem) {
    if (forceUpdate) { 
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      )
    }
  } else {
    cartItems = [...cartItems, item]
  }
  setCartItems(cartItems)
  // rerender mora biti zadnje zato sto ponovo ucita stranicu 
  if (forceUpdate) {
    rerender(CartScreen)
  }
}

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter(x => x.product !== id))
  if(id === parseRequestUrl().id) {
    document.location.hash = "/cart"
  } else {
    rerender(CartScreen)
  }
}

const CartScreen = {
  after_render: () => {
    //qtySelect need to be array
    const qtySelects = document.getElementsByClassName('qty-select')
    Array.from(qtySelects).forEach((qtySelect) => {
      // when user change the option 
      // item = gleda u storage item koji je equal na qty selectu
      // ... item da dobijemo whole array properties, (e.target.value) da bude target koliko smo odabrali u select
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id)
        addToCart({ ...item, qty: Number(e.target.value) }, true)
  })
})
const deleteBtns = document.getElementsByClassName("delete-button")
Array.from(deleteBtns).forEach(deleteBtn => {
deleteBtn.addEventListener("click", () => {
  removeFromCart(deleteBtn.id)
})
})
document.getElementById("checkout-button").addEventListener("click", () => {
  document.location.hash ="/signin"
})
  },
  render: async () => {
    showLoading()
    
      hideLoading()
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1,
        count: product.count
      })
    }
    const cartItems = getCartItems()
    return ` <div class="cart">
    <div class="cart-list">
      <ul class="cart-list-container">
        <li>
          <h3 class="check-title">Donnnutz Cart</h3>
          <div class="total-price">Price</div>
        </li>
        ${
          cartItems.length === 0
          ?  '<div class="empty">Cart is empty. <a href="/#/shop">Go Shopping</a>' :
          cartItems.map((item) => `
          <li>
            <div class="cart-image">
              <img src="${item.image}">
            </div>
            <div class="cart-name">
              <div>
                <a class="name-cart" href="/#/product/${item.product}">
                  ${item.name}
                </a>
              </div>
              <div class="qty">
                Qty: 
                <select class="qty-select" id="${item.product}">
                   ${  // x is index of a array and it is 0 based so + 1
                    [...Array(item.count).keys()].map((x) => item.qty === x + 1
                    ? `<option selected value="${x + 1}">${x + 1}</option>`
                    : `<option  value="${x + 1}">${x + 1}</option>` // da nije niti jedan broj odabran
                    )
                  }
                </select>
                <button type="button" class="delete-button" id="${item.product}">
                  Delete
                </button>
              </div>
            </div>
            <div class="cart-price">
            $${item.price}
            </div>
          </li>
          `).join("\n")
        }
          </ul>
          </div>
    <div class="cart-action">
        <h3>
        Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
        $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button id="checkout-button" class="btnCheck">
          Proceed to Checkout
        </button>
    </div>
  </div>


    `
  },
}

export default CartScreen;