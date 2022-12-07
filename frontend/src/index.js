import { hideLoading, parseRequestUrl, showLoading } from './util.js';
import HomeScreen from './srceens/HomeScreen.js';
import Error404Screen from './srceens/Error404Screen.js';
import ProductScreen from './srceens/ProductScreen.js';
import ShopScreen from './srceens/ShopScreen.js';
import CartScreen from './srceens/CartScreen.js';
import SigninScreen from './srceens/SigninScreen.js';
import Header from './components/Header.js';
import RegisterScreen from './srceens/RegisterScreen.js';
import ProfileScreen from './srceens/ProfileScreen.js';
import ShippingScreen from './srceens/ShippingScreen.js';
import PaymentScreen from './srceens/PaymentScreen.js';
import PlaceOrderScreen from './srceens/PlaceOrderScreen.js';
import OrderScreen from "./srceens/OrderScreen.js"
import DashboardScreen from './srceens/DashboardScreen.js';
import ProductListScreen from './srceens/ProductListScreen.js';
import ProductEditScreen from './srceens/ProductEditScreen.js';
import OrderListScreen from './srceens/OrderListScreen.js';
import Aside from './components/Aside.js';

// svi nasi Screenovi, i njihovi prefixi
const routes = {
  '/': HomeScreen ,
  "/shop": ShopScreen,
  "/product/:id/edit": ProductEditScreen,
  '/product/:id': ProductScreen,
  "/order/:id" : OrderScreen,
  // zato sto imas i cart opciju da dodes sa cart btn i sa add  to cart (taj ima id uvijek)
  "/cart": CartScreen,
  "/cart/:id" : CartScreen,
  "/signin": SigninScreen,
  "/register" : RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/placeorder" : PlaceOrderScreen,
  "/dashboard": DashboardScreen,
  "/productlist": ProductListScreen,
  "/orderlist": OrderListScreen
}


const  router = async () => {
 showLoading()
  const request = parseRequestUrl();
  // url i kako ga dobiti 
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') + // / znaci home --- request.resource = /shop npr.
    (request.id ? '/:id' : '') + // /:id  npr /product/1 
    (request.verb ? `/${request.verb}` : '');
    // screen ako ima ga nema da dobijemo error
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen; // ako nema screena napravljenog onda bude error
 
  const header = document.getElementById("header-container")
  header.innerHTML = await Header.render()
  await Header.after_render()

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render(); // render funkcije iz screena
  // bcs some screens dont have after render we added if statment
 if(screen.after_render) await screen.after_render(); // after render funkcije 
  hideLoading()
}
// load ucitava na ekranu, a hashchange prolazi kroz url promijene
window.addEventListener('load', router);
window.addEventListener('hashchange', router);