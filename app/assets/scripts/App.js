import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu.js'
import RevealOnScroll from './modules/RevealOnScroll.js';
import StickyHeader from './modules/StickyHeader.js';
// import Modal from './modules/Modal.js';

// new Modal();
let stickyHeader = new StickyHeader();
let mobileMenu = new MobileMenu();
// let revealOnScroll = new RevealOnScroll();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let modal;


document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        if(typeof modal == "undefined"){
            e.preventDefault();
            import(/* webpackChunkName: "ALIEN!" */'./modules/Modal').then(x => {
                modal = new x.default();
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(() => console.log("There was a problem."));
        }
        else{
            modal.openTheModal();
        }
    });
})


// alert("Im sick and also this is a test!" + __dirname);

if(module.hot){
    module.hot.accept();
}



