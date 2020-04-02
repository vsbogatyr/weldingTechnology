const table = document.querySelector('.header__right');
const productList = document.querySelectorAll('.product__list');
const openMenu = document.querySelector('.header__left');
const menu = document.querySelector('.menu');
const menuGroupName = document.querySelectorAll('.menu__catalog-item');
const submenuTools = document.querySelectorAll('.submenu__tools');
const productNameLink = document.querySelectorAll('.product__name-link');
const edit = document.querySelectorAll('.edit');
const input = document.querySelectorAll('.edit__input');
const button = document.querySelectorAll('.edit__button');
const productCard = document.querySelectorAll('.product__card');
const productItem = document.querySelectorAll('.product__item');
let curentCard;
let moveCard;
let j;
let currentItem;


function tableView() {
    table.addEventListener('mouseover', () => {
        productList.forEach((item) => {
            item.classList.add('active');
        });
    })
}

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

    for (let i = 0; i < productNameLink.length; i++) {
        productNameLink[i].addEventListener('click', (e) => {
            e.preventDefault();
            edit[i].classList.add('active');
            input[i].value = productNameLink[i].textContent;
        })
    }

    for (let i = 0; i < productNameLink.length; i++) {
        button[i].addEventListener('click', (e) => {
            e.preventDefault();
            productNameLink[i].textContent = input[i].value;
            edit[i].classList.remove('active');
        })
    }
}

function replace() {
    for (let i = 0; i < productItem.length; i++) {
        productItem[i].addEventListener('dragstart', function () {
            this.classList.add('hide');
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

        productItem[i].addEventListener('dragleave', function () {
            this.classList.remove('hover');
        })

        productItem[i].addEventListener('drop', function () {
            this.classList.remove('hover');

            setTimeout(() => {
                productItem[j].innerHTML = productItem[i].innerHTML;
                console.log('ПЕРЕМЕЩАЕМЫЙ ', j);
            }, 10)

            setTimeout(() => {
                productItem[i].innerHTML = productItemCurent;
                console.log('Куда перемещается ', i);
            }, 20)
        })
    }
}

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

        console.log('Массив скобок ', hooks);

        let save = hooks[0];
        let count = 1;
        for (let i = 1; i < hooks.length; i++) {
            if ((hooks[i][0] !== save[0]) && (count == i)) {
                tmp.push(save.concat(hooks[i]));
                save = hooks[i + 1];
                count += 1;
            } else if (hooks[i][0] == save[0]) {
                tmp.push(hooks[i]);
                save = hooks[i];
                count += 1;
            }
        }

        for (let i = 0; i < tmp.length; i++) {
            tmp[i].push(tmp[i][1]);
            tmp[i].splice(1, 1);
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

    //validStr(string(4));
}

tableView();
menuOpen();
replace();
validity();