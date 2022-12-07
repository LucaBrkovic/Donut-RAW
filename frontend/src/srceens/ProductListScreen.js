import { showLoading, hideLoading, rerender, showMessage } from '../util'
import { createProduct, deleteProduct, getProducts } from "../api"
import DashboardMenu from "../components/DashboardMenu.js"

const ProductListScreen = {
    after_render:() => {
        document.getElementById("createBtn").addEventListener("click", async () => {
            const data = await createProduct()
            document.location.hash = `/product/${data.product._id}/edit`
          })
      
          const editBtns = document.querySelectorAll(".editBtn")
          editBtns.forEach(editBtn => {
            editBtn.addEventListener("click", () => {
              document.location.hash = `/product/${editBtn.id}/edit`
            })
          })

          const deleteBtns = document.querySelectorAll(".removeBtn")
          deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", async () => {
              if (confirm('Are you sure to delete this product?')) {
                showLoading();
                const data = await deleteProduct(deleteBtn.id)
                if (data.error) {
                  showMessage(data.error)
                } else {
                  rerender(ProductListScreen)
                }
                hideLoading();
              }
            })
          })
          
    },
    render: async () => {
        // getProducts and GetProduct aint same 
    const products = await getProducts()
    
        return `
        <div class="dashboard">
        ${DashboardMenu.render({ selected: 'products' })}
        <div class="dashboard-content">
          <h1 class="title">Products</h1>
          <div>
           <button id ="createBtn" class= "create-btn"> Create Product </button>
            <div class="product-list">
            <table class="tablee">
          <thead>
            <tr>
              <th class="remove">IMAGE</th>
              <th class="remove">ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th class="remove">CATEGORY</th>
              <th class="tr-action">ACTION</th>
            <tr>
          </thead>
          <tbody>
          ${products.map(product => `
          <tr>
          <td class="remove"><img class="dashboard-img" src="${product.image}"></td>
          <td class="remove">${product._id}</td>
          <td class= "dashboard-name"><a href="/#/product/${product._id}">${product.name}</a></td>
          <td>${product.price} $</td>
          <td class="remove">${product.category}</td>
          <td class="td-btns">
          <button id="${product._id}" class="editBtn">Edit</button>
          <button id="${product._id}" class="removeBtn">Delete</button>
          </td>
          </tr>
          `).join("\n")
        }
        </tbody>
        </table>
          </div>
        </div>
      </div>
      `
    }
}

export default ProductListScreen