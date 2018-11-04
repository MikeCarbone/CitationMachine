let isNavOpen = false;
const navIcon = document.getElementsByClassName("mobile-nav__icon")[0];
const mobileNav = document.getElementsByClassName("mobile-nav__list")[0];
const mobileNavLinks = document.getElementsByClassName("mobile-nav__list-item");

navIcon.addEventListener("click", navAnimationController);

function navAnimationController(){    
    if (isNavOpen) {
        mobileNav.classList.remove("animation-grow");
        mobileNav.classList.add("animation-shrink");
        for(let item of mobileNavLinks){
            item.style.display = 'none';
        }
        isNavOpen = false;
    } else {
        mobileNav.style.display = 'flex';
        mobileNav.classList.remove("animation-shrink");
        mobileNav.classList.add("animation-grow");
        for(let item of mobileNavLinks){
            item.style.display = 'inline-block';
        }
        
        isNavOpen = true;
    }
}