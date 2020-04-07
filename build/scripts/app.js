const table = document.querySelector('.header__right');
const productList = document.querySelectorAll('.product__list');
const openMenu = document.querySelector('.header__left');
const menu = document.querySelector('.menu');
const menuGroupName = document.querySelectorAll('.menu__catalog-item');
const submenuTools = document.querySelectorAll('.submenu__tools');
let productCard = document.querySelectorAll('.product__card');
let productItem = document.querySelectorAll('.product__item');
let productNameLink = document.querySelectorAll('.product__name-link');
let edit = document.querySelectorAll('.edit');
let input = document.querySelectorAll('.edit__input');
let button = document.querySelectorAll('.edit__button');
let curentCard;
let moveCard;
let currentItem;

//Table

function tableView() {
    table.addEventListener('mouseover', () => {
        productList.forEach((item) => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                productList.forEach((item) => {
                    item.classList.add('active');
                });
            }
        });
    })
}

//Open menu

function menuOpen() {
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
}

//Rename

function rename() {
    for (let i = 0; i < productNameLink.length; i++) {
        productItem[i].addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;
            if (target.classList.contains('product__name-link')) {
                productNameLink = document.querySelectorAll('.product__name-link');
                edit = document.querySelectorAll('.edit');
                input = document.querySelectorAll('.edit__input');
                button = document.querySelectorAll('.edit__button');
                edit[i].classList.add('active');
                input[i].value = productNameLink[i].textContent;
            }
        })
    }

    for (let i = 0; i < productNameLink.length; i++) {
        productItem[i].addEventListener('click', (e) => {
            let target = e.target;
            if (target.classList.contains('edit__button')) {
                e.preventDefault();
                input = document.querySelectorAll('.edit__input');
                productNameLink[i].textContent = input[i].value;
                edit[i].classList.remove('active');
            }
        })
    }
}

// Drag and Drop

function replace() {
    let j;

    let logo = document.createElement('img');
    logo.src = 'img/logo.png';
    logo.width = 100;

    for (let i = 0; i < productItem.length; i++) {
        productItem[i].addEventListener('dragstart', function (e) {
            this.classList.add('hide');
            e.dataTransfer.setData('text/plain', this.innerHTML);
            e.dataTransfer.setDragImage(logo, 50, 50);
        })

        productItem[i].addEventListener('dragend', function () {
            this.classList.remove('hide');
            productItemCurent = productItem[i].innerHTML;
            j = i;
        })

        productItem[i].addEventListener('dragover', function (e) {
            this.classList.add('hover');
            e.preventDefault();
        })

        productItem[i].addEventListener('dragenter', function (e) {
            e.preventDefault();
        })

        productItem[i].addEventListener('dragleave', function (e) {
            this.classList.remove('hover');
            e.preventDefault();
        })

        productItem[i].addEventListener('drop', function () {
            this.classList.remove('hover');

            setTimeout(() => {
                productItem[j].innerHTML = productItem[i].innerHTML;
            }, 10)

            setTimeout(() => {
                productItem[i].innerHTML = productItemCurent;
            }, 20)
        })
    }
}

// Correct sequence

function validity() {

    function randomHook(el) {
        return Math.floor(Math.random() * (el + 1));
    }

    function createArr(n) {

        let square = ['[', ']'];
        let round = ['(', ')'];
        let braces = ['{', '}'];
        let tmp = [];
        let result = [];
        let hooksTmp = [square, round, braces];
        let hooks = [];

        for (let i = 0; i < n; i++) {
            let item = hooksTmp[randomHook(hooksTmp.length - 1)];
            hooks.push(item);
        }

        console.log('Array of hooks ', hooks);

        let a = [];
        let b = [];
        for (let i = 0; i < hooks.length; i++) {
            if (i % 2 === 0) {
                a.push(hooks[i]);
            } else if (i % 2 !== 0) {
                b.push(hooks[i]);
            }
        }

        let lens = tmp.map((item) => {
            return item.length;
        });

        let count = 0;
        for (let i = 0; i < lens.length - 1; i++) {
            for (let j = +1; i < lens.length; i++) {
                if (lens[i] === lens[j]) {
                    count += 1;
                }
            }
        }

        for (let i = 0; i < a.length; i++) {
            if ((i === a.length - 1) && (!b[i])) {
                tmp.push(a[i]);
            } else if ((a[i][0] !== b[i][0]) || (a[i][0] === b[i][0]) && (count === tmp.length)) {
                tmp.push(a[i].concat(b[i]));
            } else if (a[i][0] === b[i][0]) {
                tmp.push(a[i]);
                tmp.push(b[i]);
            }
        }

        for (let i = 0; i < tmp.length; i++) {
            tmp[i].push(tmp[i][1]);
            tmp[i].splice(1, 1);
        }

        for (let i = 0; i < tmp.length; i++) {
            result[i] = tmp[i].join(' ');
        }
        result = result.join(' ');

        console.log('Correct sequence ', result);
        return result;
    }

    //createArr(4);

    let string = createArr;

    function validStr(str) {

        let open = ['(', '{', '['];
        let close = [')', '}', ']'];
        let arr = str.split(' ');
        let indexOpen;
        let indexClose;
        let valid = [];
        let control;
        console.log(arr);

        for (let i = 0; i < arr.length; i++) {
            indexOpen = open.indexOf(arr[i]);
            if (indexOpen !== -1) {
                valid.push(indexOpen);
            }

            indexClose = close.indexOf(arr[i]);
            if (indexClose !== -1) {
                control = indexClose - valid.pop();
            }
        }
        if (control === 0) {
            console.log('true');
        } else {
            console.log('false');
        }
    }

    validStr(string(4));
}

tableView();
replace();
menuOpen();
rename();
validity();