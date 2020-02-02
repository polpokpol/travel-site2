import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu.js'

let mobileMenu = new MobileMenu();

// alert("Im sick and also this is a test!" + __dirname);

if(module.hot){
    module.hot.accept();
}



