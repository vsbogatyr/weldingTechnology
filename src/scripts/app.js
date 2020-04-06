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

/* productItem.forEach((item) => {
    item.draggable = true;
}); */

/* for (let node of productItem.childNodes) {
    //node.draggable = true;
    console.log(node);
} */

/* for (let i = 0; i < productItem.length; i++) {
    let child = productItem[i].childNodes;
    child[i].draggable = true;

    for (let i = 0; i < child.length - 1; i++) {
        let descendant = child[i].childNodes;
        //descendant[i].draggable = true;
        //console.log(descendant[i]);
          for (let i = 0; i < child.length-1; i++) {
              descendant[i].draggable = true;
              console.log(child[i]);
          }
    }
    console.log(productItem[i].childNodes);
} */



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

/* for (let i = 0; i < productNameLink.length; i++) {
    productNameLink[i].addEventListener('click', (e) => {
        e.preventDefault();
        edit[i].classList.add('active');
        console.log('edit ',i)
        input[i].value = productNameLink[i].textContent;
    })
}

for (let i = 0; i < productNameLink.length; i++) {
    button[i].addEventListener('click', (e) => {
        e.preventDefault();
        productNameLink[i].textContent = input[i].value;
        edit[i].classList.remove('active');
    })
} */

function rename() {
    for (let i = 0; i < productNameLink.length; i++) {
        productItem[i].addEventListener('click', (e) => {
            console.log('edit ', e.target);
            e.preventDefault();
            let target = e.target;
            if (target.classList.contains('product__name-link')) {
                console.log('Curent ', target);
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
                console.log(productNameLink[i]);
                productNameLink[i].textContent = input[i].value;
                edit[i].classList.remove('active');
                console.log('input[i].value ', input[i].value);
            }
        })
    }
}

// Drag and Drop

function replace() {
    let j;

    for (let i = 0; i < productItem.length; i++) {
        productItem[i].addEventListener('dragstart', function (e) {
            this.classList.add('hide');
            e.DataTransfer.setData('application/x-moz-node', this.innerHTML);
            e.DataTransfer.setData('text/html', this.innerHTML);
            let logo = document.createElement('img');
            logo.src = 'img/logo.png';
            logo.width = 200;
            e.DataTransfer.setDragImage(logo, -10, -10);
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
                console.log(productNameLink[i]);
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