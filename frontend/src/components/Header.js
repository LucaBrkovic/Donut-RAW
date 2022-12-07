import { getUserInfo } from "../localStorage"
import { parseRequestUrl } from "../util"
const Header = {
    render:() => {
        const {name, isAdmin} = getUserInfo()
        return `
<div class="header_img">
        <a href="/#/">
      <h3 class="title-header"> Donuts Shop </h3></a>   
</div>


<div class="right_panel">
     ${name ? `<a href="/#/profile">${name}</a>` :
    `<a href="/#/signin">Sign-in</a>`
    }
    <a href="/#/shop"> <i class="fa-solid fa-utensils"></i></a>
    <a href="/#/cart"><i class="fa-solid fa-cart-shopping"></i></a>
    ${isAdmin? `<a href ="/#/dashboard"><i class="fa-solid fa-screwdriver-wrench"></i></a>` : ""}
</div>

`
    },
    after_render:() => {
       
          
        }
    
}

export default Header

