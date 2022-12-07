// load item from the local storage
export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
    return cartItems;
  }
  // add item to local storage
  export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

// saving data of the user 
// prazan "" nam oznacuje default unus
  export const setUserInfo = ({
_id = "",
name = "",
email = "",
password = "",
token = "",
isAdmin = false
  }) => {
    localStorage.setItem("userInfo", JSON.stringify({
_id,
name ,
email ,
password ,
token ,
isAdmin 
    }))
  }
export const clearUser = () => {
  localStorage.removeItem("userInfo")
}

// get user info
// false response je ako ne postoji 
// true ce ti ucitati sve ono gore iz setUserInfo
export const getUserInfo = () => {
  return localStorage.getItem("userInfo") ? 
  JSON.parse(localStorage.getItem("userInfo")) : 
  {name: "", email: "", password: ""}
}

// send info
export const getShipping = () => {
  const shipping = localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      };
  return shipping;
}

// add info
export const setShipping = ({
  address = '',
  city = '',
  postalCode = '',
  country = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify({ address, city, postalCode, country })
  )
}

export const getPayment = () => {
  const payment = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : {
        paymentMethod: 'paypal',
      }
  return payment;
}

// default is paypal
export const setPayment = ({ paymentMethod = 'paypal' }) => {
  localStorage.setItem('payment', JSON.stringify({ paymentMethod }))
}

export const cleanCart = () => {
  localStorage.removeItem("cartItems")
}