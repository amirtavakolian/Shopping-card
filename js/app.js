// Variables:
let addToBascket = document.querySelector("#courses-list");
let tbody = document.querySelector("tbody");
let removeItem = document.querySelector("#cart-content");
let clearBascket = document.querySelector("#clear-cart");

// Evenet Listeners:
addToBascket.addEventListener("click", productsInfo);
removeItem.addEventListener("click", removeItem1);
document.addEventListener("DOMContentLoaded", getItemsFromLocalstorageOnLoad);
clearBascket.addEventListener("click", clearBascket1);


// Functions:

// make the products info ready:
function productsInfo(e) {
    e.preventDefault();
    let info;

    if (e.target.classList.contains("add-to-cart")) {
        info = {
            title: e.target.parentElement.children[0].innerText,
            price: e.target.parentElement.children[3].children[0].innerText,
            image: e.target.parentElement.parentElement.children[0].parentElement.children[0].children[0].currentSrc
        }
    }

    // create <tr> element and put it in <tbody>:
    addToBuyingBascket(info);

    // add items to localstorage:
    addToLocalstorage(info);
}

// remove item from bascket:
function removeItem1(e) {
    if (e.target.classList.contains("removeItem")) {
        e.target.parentElement.parentElement.remove();
    }
}

// add products to buying bascket
function addToBuyingBascket(info) {


    let tr = document.createElement("tr");
    tr.innerHTML = `
    <tr>
        <td><img src="${info.image}" style="width:50px; height:50px;"></img></td>
        <td><h6>${info.title}</h6></td>
        <td><h6>${info.price}</h6></td>
        <td><span style="color:red;font-size:18px;cursor:pointer;" class="removeItem">X</span></td>
    </tr>   
`
    tbody.appendChild(tr);
}

// add products to localstorage:
function addToLocalstorage(info) {
    let res = getItemsFromLocalstorage();
    res.push(info);


    localStorage.setItem('item', JSON.stringify(res));
}

// Get items from local storage:
function getItemsFromLocalstorage() {

    let res = localStorage.getItem('item');

    if (res != null) {
        return JSON.parse(localStorage.getItem('item'));
    } else {
        return [];
    }
}

// when page loaded, get items from local storage:
function getItemsFromLocalstorageOnLoad() {
    let items = getItemsFromLocalstorage();

    items.forEach((course) => {
        addToBuyingBascket(course);
    })
}

// Clear all items from bascket:
function clearBascket1(e) {
    while (e.target.previousElementSibling.childNodes[3].childNodes[0]) {
        e.target.previousElementSibling.childNodes[3].childNodes[0].remove();
    }

    localStorage.clear();

}