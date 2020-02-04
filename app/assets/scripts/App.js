import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu.js'
import RevealOnScroll from './modules/RevealOnScroll.js';


let mobileMenu = new MobileMenu();
// let revealOnScroll = new RevealOnScroll();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

// alert("Im sick and also this is a test!" + __dirname);

if(module.hot){
    module.hot.accept();
}



