import { getCartItems } from "./localStorage";

// url smo podijeli na 3 dijela
export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
      resource: request[1],
      id: request[2],
      verb: request[3],
    }
  }
// it will rerender cart when we add something
export const rerender = async (component) => {
  document.getElementById("main-container").innerHTML = await component.render()
  await component.after_render()
  }

export const showLoading = () => {
  document.getElementById("loading-overlay").classList.add("active")
}

export const hideLoading = () => {
  document.getElementById("loading-overlay").classList.remove("active")
}


// wrong information message at login or registrate
export const showMessage = (message, callback) => {
  document.getElementById("message-overlay").innerHTML = `
  <div>
    <div id = "message-overlay-content">${message}</div>
    <button id ="message-overlay-close-button" class="btnError">Ok</button>
    </div>
  `
  document.getElementById("message-overlay").classList.add("active")
  document.getElementById("message-overlay-close-button").addEventListener("click", () => {
    document.getElementById("message-overlay").classList.remove("active")
   // if callback exist call it 
    if(callback) {
      callback()
    }
  })
}

// if 0 cart is empty / if something inside "/shipping"
export const redirectUser = () => {
  console.log(getCartItems().length);
  if (getCartItems().length !== 0) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';
  }
}

