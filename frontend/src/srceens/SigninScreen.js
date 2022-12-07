import { signin } from "../api"
import { getUserInfo, setUserInfo } from "../localStorage"
import { colorWhite, hideLoading, redirectUser, showLoading, showMessage } from "../util"

const SigninScreen = {
    after_render: () => {
      document.getElementById("signin-form").addEventListener("submit", async(e) => { 
        e.preventDefault()
        showLoading()
        // signin is from api.js, when we press signin request will be send to the server
        const data = await signin({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        })
        hideLoading()
        if(data.error) {
          showMessage(data.error)
        } else {
          // we need to save information before sending user to the homepage setUserInfo(localStorage)
          setUserInfo(data)
          // if no error we will be at home page
          redirectUser()
        }
      })
    },
    render: () => {
      // ako je user signin da ne moze ponovo vidjeti signin page
      if(getUserInfo().name) {
        redirectUser()
      }

        
        return `
        <div class="form-container">
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1 class="title">Sign-In</h1>
            </li>
            <li>
            <div class="input-group">
            <label class="label">Email</label>
            <input autocomplete="off" name="Email" id="email" class="input" type="email">
            <div>
            </li>
            <li>
            <div class="input-group">
            <label class="label">Password</label>
            <input autocomplete="off" name="password" id="password" class="input" type="password">
            <div>
            </li>
            <li>
              <button type="submit" class="btnCheck">Sign-in</button>
            </li>
            <li>
              <div class="userSign">
                New User?
                <a href="/#/register" class="register-sign">Create your account </a>
              </div>
            </li>
          </ul>
        </form>
      </div>
        `
    }
}

export default SigninScreen