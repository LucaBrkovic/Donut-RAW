import {  hideLoading, showLoading, transparent } from "../util"

 const HomeScreen = {
 
    render:  () => {
       showLoading()

       return `
       <section class="home">
       <div class="home__shape-small"></div>
       <div class="home__shape-big-1"></div>
       <div class="home__shape-big-2"></div>
       <img src="./images/shape-bg.png" alt="" class="home__shape-bg">

       <div class="home-container">
           <div class="home-info">
               <h1 class="home-title">
                   <span>Discover</span> <br>                    
                   Donuts, and go <br>
                   NUTS.
               </h1>
               <p class="home-description">
                   Explore the biggest donut market.
               </p>
               <a href="/#/shop"><button class="home-button">VISIT SHOP</button></a>
           </div>
           <div class="home-img">
           <img src="./images/logohome.png" class="img-home" alt="">
           </div>

           
       </div>
   </section>
   
`
hideLoading()
    }
 }

export default HomeScreen
 