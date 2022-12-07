
import { getProducts } from "../api";




const ShopScreen = {
  
  render: async () => {
    const products = await getProducts();
    console.log(products) 
    if (products.error) {
      return `<div class="error">${products.error}</div>`
    }
return  `
<h2 class="titledon">DONUUUUUTZ</h2>
<div class="section-center">


  ${products
    .map(
      (product) => `
      <div class="card">
      <div class="photo-div">
      <a href="/#/product/${product._id}">
          <img src="${product.image}" alt="${product.name}" class="photo">
          </a>
      </div>
              <div class="item">
              <a href="/#/product/${product._id}">
                  <h4 class="main-name">${product.name}</h4>
                  </a>
                  <div class="item-info">
                <header class="unites">
                  <h4 class="category"><span>Category:</span> ${product.category} </h4>
                  <h4 class="price"><span>Price:</span> ${product.price}$</h4>
                  
              </div>
              </div>
              </div>
  `)}
  </div>


   `
  }
}

export default ShopScreen

/*
 <article class="menu-item">
      <a href="/#/product/${product._id}">
      <img src="${product.img}" alt="${product.name}" class="photo">
      </a>
          <div class="item-info">
            <header>
            <a href="/#/product/${product._id}">
            <h4 class="name">${product.name}</h4>
            </a>
            <h4 class="category"> ${product.category}
            <h4 class="price">${product.price} $</h4>
            </h4>
            </header>
            
          </div>
        </article>
*/