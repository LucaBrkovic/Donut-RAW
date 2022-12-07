// api sluzi da napravimo request uz pomoc axiosa za server

import { apiUrl } from "./config.js"
import axios from "axios"
import { getUserInfo } from "./localStorage.js"

// request da dobijemo iteme 
export const getProduct = async (id) => {
    try{
const response = await axios({
    // `method` is the request method to be used when making the request
    // GET is used to request data from a specified resource.
    method: "GET",
    // `url` is the server URL that will be used for the request
    url: `${apiUrl}/api/products/${id}`,
   // `headers` are custom headers to be sent
    headers: {
        "Content-Type": "application/json"
    }
}) 
  // `statusText` is the HTTP status message from the server response
if(response.statusText !== "OK") {
    throw new Error(response.data.message)
}
return response.data
    } catch(err) {
        console.log(err);
        return { error: err.response.data.message || err.message }
    }
}
//////////////////////////////////////////////////////////////////////////////////
// POST method used when sending passwords or other sensitive information.
// POST method variables are not displayed in the URL.
export const signin = async ({email, password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            data: {
                email,
                password
            }
        })
        if(response.statusText !== "OK") {
            throw new Error(response.data.message)
        }
        // if everything is okay return response.data
        return response.data
    } catch (err) {
        console.log(err)
        return { error : err.response.data.message || err.message}
    }
}
// slicno je kao signin samo smo dodali name
export const register = async ({ name, email, password }) => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/users/register`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          name,
          email,
          password,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message }
    }
  }
  export const update = async ({ name, email, password }) => {
    try {
      const { _id, token } = getUserInfo()
      const response = await axios({
        url: `${apiUrl}/api/users/${_id}`,
        // put is for updating and post is for creating
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          name,
          email,
          password,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message)
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message }
    }
  }

  export const createOrder = async (order) => {
    try {
      const { token } = getUserInfo()
      const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: order,
      })
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message)
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message }
    }
  }

  export const getOrder = async(id) => {
    try {

    const {token} = getUserInfo()
    const response = await axios({
      url: `${apiUrl}/api/orders/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    if(response.statusText !== "OK") {
      throw new Error (response.data.message) 
    }
    return response.data
    } catch(err) {
      return {error: err.message}
    }
  }

  export const getPaypalClientId = async () => {
    const response = await axios({
      url: `${apiUrl}/api/paypal/clientId`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data.clientId
  };
  


  export const payOrder = async (orderId, paymentResult) => {
    try {
      const { token } = getUserInfo()
      const response = await axios({
        url: `${apiUrl}/api/orders/${orderId}/pay`,
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: paymentResult,
      });
      if (response.statusText !== "OK") {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message }
    }
  }

  export const getMyOrders = async () => {
    try {
      const { token } = getUserInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/mine`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      if (response.statusText !== "OK") {
        throw new Error(response.data.message)
      }
      return response.data
    } catch(err) {
      return { error: err.response ? err.response.data.message : err.message }
    }
  }


  // Product dobijemo jedan product i ima id od tog producta
  // products da importamo cijelu listu 
  export const getProducts = async () => {
    try{
const response = await axios({
    
    method: "GET",
    url: `${apiUrl}/api/products`,
    headers: {
        "Content-Type": "application/json"
    }
}) 
if(response.statusText !== "OK") {
    throw new Error(response.data.message)
}
return response.data
    } catch(err) {
        console.log(err);
        return { error: err.response.data.message || err.message }
    }
}
export const createProduct = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
}

export const updateProduct = async (product) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${product._id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message }
  }
}
export const uploadProductImage = async (formData) => {
  try {
    const { token } = getUserInfo()
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message)
    } else {
      return response.data
    }
  } catch (err) {
    return { error: err.response.data.message || err.message }
  }
}

export const deleteProduct = async (productId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${productId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
}

export const getOrders = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
}
export const deleteOrder = async (orderId) => {
  try {
    const { token } = getUserInfo()
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data
  } catch (err) {
    return { error: err.response.data.message || err.message }
  }
}

export const deliverOrder = async (orderId) => {
  try {
    const { token } = getUserInfo()
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/deliver`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message }
  }
}

export const getSummary = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/summary`,
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
}