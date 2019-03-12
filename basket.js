var arrCatalog = [];
var models = ['Samsung GALAXY', 'Samsung A5', 'Xiaomi Mi8', 'Xiaomi Mi9', 'Xiaomi Redmi Note 5', 'HONOR V8', 'Iphone7', 'Iphone8', 'Iphone9', 'IphoneX'];
var color = ['White', 'Gold', 'Black', 'Dark Grey', 'Lite Grey', 'Blue', 'Purple', 'Red', 'Pink', 'Green'];
var img = [ '<img src=iphone.png>', '<img src=honor.png>', '<img src=samsung.png>', '<img src=xiaomi.png>'];

// создание массива с товарами

var getRandomIn = function (mas) {
    let rand = Math.floor(Math.random() * (mas.length - 1));
    let randElem;
    return randElem = mas[rand];
}

var addInCatalog = function () {
    for (let i = 0; i < 10; i++) {
        var good = {};
        good.image = getRandomIn(img);
        good.model = getRandomIn(models);
        good.color = getRandomIn(color);
        good.price = 100 + Math.floor(Math.random() * 999);
        arrCatalog.push(good);
    }
}
addInCatalog();

//Добавление товаров в каталог
var goodCard = document.querySelector('.goodCard').content;
var catalog = document.querySelector('#catalog');
for (let i = 0; i < 10; i++) {
    var goodEdit = goodCard.cloneNode(true);
        goodEdit.querySelector('.img').innerHTML = arrCatalog[i].image;
        goodEdit.querySelector('.itemName').innerText = arrCatalog[i].model;
        goodEdit.querySelector('.itemColor').innerText = arrCatalog[i].color;
        goodEdit.querySelector('.itemPrice').innerText = arrCatalog[i].price;
        goodEdit.querySelector('.buyBtn').value = i;
    catalog.appendChild(goodEdit);
}

document.querySelector('.items');
var arrBasket = [];
var sumBasket = document.querySelector('.sumBasket');

for ( let i = 0; i < arrCatalog.length; i++) {
    catalog.children[i].querySelector('.buyBtn').onclick = function () {
        let obj = arrCatalog[i];
        arrBasket.push(obj);
        let sum = 0;

        var item = document.createElement('li'); // добавляем текст в корзину
        item.innerHTML = "<span>" + arrCatalog[i].model + ' ' + arrCatalog[i].color + ' '+ arrCatalog[i].price + ' руб.  ' + "</span>" + '<button class="del">X</button>';
        document.querySelector('.items').appendChild(item);

        item.querySelector('.del').onclick = function () {
            document.querySelector('.items').removeChild(item);
            let index = parseInt(item.querySelector('.del').value);
            arrBasket.splice(index, 1);
            sum = sum - parseInt(obj.price);
            if (sum == 0 ) {
                sumBasket.innerText = 'Корзина пустая';
            } else {
                sumBasket.innerText = 'Общая сумма ' + sum + ' руб.';
            }
        }

        for (var a = 0; a < arrBasket.length; a++) { 
            sum = parseInt(arrBasket[a].price) + sum;
        }
        sumBasket.innerText = 'Общая сумма ' + sum + ' руб.';
    }
}

