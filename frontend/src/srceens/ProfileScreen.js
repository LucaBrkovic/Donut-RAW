import { getMyOrders, update } from "../api"
import { clearUser, getUserInfo, setUserInfo } from "../localStorage"
import { hideLoading, showLoading, showMessage } from "../util"

const ProfileScreen = {
  after_render: () => {
    document.getElementById("signout-button").addEventListener("click", () => { 
      // clearUser localStorage.js
      clearUser()
      document.location.hash = "/"
    })
    document
      .getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/';
        }
      });
  },
    render: async () => {
      const { name, email} = getUserInfo()
      // ako nema imena da ga prebaci na home page
      if(!name) {
        document.location.hash = "/"
      }

        const mainBody = document.getElementById("main-body")
            mainBody.style.backgroundColor = "#fff8f8";
            const mainHeader = document.getElementById("header-container")
      mainHeader.style.boxShadow = "0px 2px 2px 0 #ff69b4"
      const orders = await getMyOrders()
        return `
        <div class="profile">
        <div class="profile-info">
        <div class="form-container">
        <form id="profile-form">
          <ul class="form-items">
            <li>
              <h1 class="title">User Profile</h1> 
            </li>
            <li>
            <div class="input-group">
            <label  class="label">Name</label>
            <input value=${name} name="name" id="name" class="input" type="name">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label class="label">Email</label>
            <input value=${email} name="Email" id="email" class="input" type="email">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" id="password" class="input" >
            <div>
            </li>
            <li>
              <button type="submit" class="profil-btn">Update</button>
            </li>
            <li>
              <button type="button" id="signout-button" class="profil-btn">Sign Out</button>
            </li>
          </ul>
        </form>
      </div>
        </div>

        <div class="profile-orders">
        <h2 class= "title">Order History</h2>
        <table class="tablee">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th class="remove">DATE</th>
              <th >TOTAL</th>
              <th class="remove">PAID</th>
              <th class="remove">DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${
              orders.length === 0
                ? `<tr><td colspan="6">No Order Found.</tr>`
                : orders
                    .map(
                      (order) => `
          <tr>
            <td>${order._id}</td>
            <td class="remove">${order.createdAt}</td>
            <td>${order.totalPrice}</td>
            <td class="remove">${order.paidAt || 'No'}</td>
            <td class="remove">${order.deliveryAt || 'No'}</td>
            <td><a class="td-link" href="/#/order/${order._id}">DETIALS</a> </td>
          </tr>
          `
                    )
                    .join('\n')
            }
          </tbody>
        </table>
     </div>
     </div>
        
        `
    }
}

export default ProfileScreen