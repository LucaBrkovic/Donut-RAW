import { register } from "../api"
import { getUserInfo, setUserInfo } from "../localStorage"
import { colorWhite, hideLoading, redirectUser, showLoading, showMessage } from "../util"

const RegisterScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser()
        }
      });
  },
    render: () => {
      // ako je user register da ne moze ponovo vidjeti register page
      if(getUserInfo().name) {
        redirectUser()
      }

        
        return `
        <div class="form-container">
        <form id="register-form">
          <ul class="form-items">
            <li>
              <h1 class="title">Create Account</h1>
            </li>
            <li>
            <div class="input-group">
            <label  class="label">Name</label>
            <input autocomplete="off" name="name" id="name" class="input" type="name">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label class="label">Email</label>
            <input autocomplete="off" name="Email" id="email" class="input" type="email">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" id="password" class="input" >
            <div>
            </li>
            <li>
              <button type="submit" class="btnCheck">Register</button>
            </li>
            <li>
              <div class = "userSign">
                Already have an account?
                <a href="/#/signin" class="register-sign">Sign-In</a>
              </div>
            </li>
          </ul>
        </form>
      </div>
        `
    }
}

export default RegisterScreen