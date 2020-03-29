const table = document.querySelector('.header__right');
const productList = document.querySelectorAll('.product__list');
const openMenu = document.querySelector('.header__left');
const menu = document.querySelector('.menu');
const menuGroupName = document.querySelectorAll('.menu__catalog-item');
const submenuTools = document.querySelectorAll('.submenu__tools');
const productNameLink = document.querySelectorAll('.product__name-link');

table.addEventListener('mouseover', () => {
    for (let i = 0; i < productList.length; i++) {
        productList[i].classList.add('active');
    }
})

openMenu.addEventListener('mouseover', () => {    
    menu.classList.add('active');
})

openMenu.addEventListener('mouseout', () => {    
    menu.classList.remove('active');
})

for (let i = 0; i < menuGroupName.length; i++) {
    menuGroupName[i].addEventListener('mouseover', () => {
        submenuTools[i].classList.add('active');
    })
}

for (let i = 0; i < menuGroupName.length; i++) {
    menuGroupName[i].addEventListener('mouseout', () => {
        submenuTools[i].classList.remove('active');
    })
}

for (let i = 0; i < productNameLink.length; i++) {
    productNameLink[i].addEventListener('click', () => {
        console.log ('клик ', i);
    })
}
