import { getProduct } from "../api.js";
import { hideLoading, parseRequestUrl, showLoading } from "../util.js"

const ProductScreen = {
  after_render: () => {
    //request sluzi da dobijemo id
    const request = parseRequestUrl()
    const btn = document.getElementById("add-btn")
    btn.addEventListener("click", () => {
      // kad stisnemo btn odvedi nas u cart/id od
      document.location.hash = `/cart/${request.id}`
    })
  },
  render: async () => {
    // showLoading()
    // request sluzi da dobijemo id
    const request = parseRequestUrl();
    const product = await getProduct(request.id)
   //  hideLoading()
    if (product.error) {
      return `<div>${product.error}</div>`;
    }  
            
    return ` 
    <div class="anim-div">
    <div class= "backclick">
    <a href="/#/shop"><button class="backbtn">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"  width="3rem" height="3rem"><path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/></svg>
    <span>Back</span>
  </button></a>
  </div>
    <h2 class="title center">${product.name}</h2>
    <div class="products-container">
        <div class="image-container">
            <img src="${product.image}" alt="">
        </div>
        <div class="data-container">
            <div class="info-data">
            <p><span>Category:</span> ${product.category} <br>
            <span>Roling:</span>  ${product.Roling} <br>
            <span>Filling:</span> ${product.Filling} <br>
            <span>Glaze:</span> ${product.Glaze} <br>
            <span>Topping:</span> ${product.Topping} <br>
            <span>Sauce:</span> ${product.Sauce}
            </p>
        </div>
        </div>
        </div>
        <div class="price-add">
            <p><span>Price:</span> ${product.price}$</p>
            <button id="add-btn" class="cartBtn">Add to cart</button>
        </div>
        
    </div>
    </div>
    `;
  },
};
export default ProductScreen;