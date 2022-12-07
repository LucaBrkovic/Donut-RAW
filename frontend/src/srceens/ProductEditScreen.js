import { hideLoading, parseRequestUrl, showLoading, showMessage } from "../util.js"
import {getProduct, updateProduct, uploadProductImage} from "../api"
const ProductEditScreen = {
    after_render: () => {
      const request = parseRequestUrl()
      document.getElementById("edit-product-form").addEventListener("submit", async (e) => {
        e.preventDefault()
        showLoading()
        const data = await updateProduct({ // we need to implement that
          _id: request.id,
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          image: document.getElementById('image').value,
          category: document.getElementById('category').value,
          Sauce: document.getElementById('Sauce').value,
          Topping: document.getElementById('Topping').value,
          count: document.getElementById('count').value,
          Roling: document.getElementById('Roling').value,
          Filling: document.getElementById('Filling').value,
          Glaze: document.getElementById('Glaze').value,
        })
        hideLoading()
        if (data.error) {
          showMessage(data.error)
        } else {
          document.location.hash = "/productlist"
        }
      })
      document
      .getElementById('image-file')
      .addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        showLoading();
        const data = await uploadProductImage(formData);
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          showMessage('Image uploaded successfully.');
          document.getElementById('image').value = data.image;
        }
      })

        },
    render: async () => {
        const request = parseRequestUrl()
        const product = await getProduct(request.id)
        return `  <div class="content">
        <div class= "backclick">
          <a href="/#/productlist"><button class="backbtn">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"  width="3rem" height="3rem"><path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/></svg>
          <span>Back</span>
        </button></a>
        </div>
        <div class="form-container">
          <form id="edit-product-form" class="form">
            <ul class="form-items">
              <li>
                <h1 class="title">Edit Product ${product._id.substring(0, 8)}</h1>
              </li>
              <li>
                <label for="name">Name</label>
                <input type="text" name="name" value="${
                  product.name
                }" id="name" />
              </li>
              <li>
                <label for="price">Price</label>
                <input type="number" name="price" value="${
                  product.price
                }" id="price" />
              </li>
              <li>
                <label for="image">Image</label>
                <input type="text" name="image"  value="${
                  product.image
                }" id="image" />
                <input type ="file" name="image-file" id ="image-file">
              </li>
              <li>
              <label for="category">category</label>
              <input type="text" name="category" value="${
                product.category
              }" id="category" />
            </li>
              <li>
                <label for="Sauce">Sauce</label>
                <input type="text" name="Sauce" value="${
                  product.Sauce
                }" id="Sauce" />
              </li>
              <li>
                <label for="Topping">Topping</label>
                <input type="text" name="Topping" value="${
                  product.Topping
                }" id="Topping" />
              </li>
              <li>
              <li>
                <label for="count">Count</label>
                <input type="number" name="count" value="${
                  product.count
                }" id="count" />
              </li>
                <label for="Roling">Roling</label>
                <input type="text" name="Roling" value="${
                  product.Roling
                }" id="Roling" />
              </li>
              <li>
                <label for="Filling">Filling</label>
                <input type="text" name="Filling" value="${
                  product.Filling
                }" id="Filling" />
              </li>
              <li>
                <label for="Glaze">Glaze</label>
                <input type="text" name="Glaze" value="${
                  product.Glaze
                }" id="Glaze" />
              </li>
              <li>
                <button type="submit" class="create-btn two">Update</button>
              </li>
            </ul>
          </form>
        </div>
      </div>`
    }
}

export default ProductEditScreen