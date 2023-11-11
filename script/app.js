const $category = document.querySelector(".category");
const $products = document.querySelector(".product");
const $select = document.querySelector("#categoryOption");
const $select1 = document.querySelector("#categoryOption1");
const $shopbtn = document.querySelector("#shopbtn");
const $form = document.querySelector("#form");
const $input = document.querySelector("#input");

fetch("https://api.escuelajs.co/api/v1/categories")
    .then(response => response.json())
    .then(data => renderDataCategory(data))
// category to html
function renderDataCategory(data) {
    const userFragment = document.createDocumentFragment();
    data.forEach(category => {
       const $card = document.createElement("a");
       $card.className = "possible";
       $card.href = `/products/products.html?idCategory=${category.id}`;
       $card.innerHTML = `
           <img src="${category.image}">
            <p>${category.name}</p>
       `;
       $select.innerHTML += `<option value="${category.id}">${category.name}</option>`
       $select1.innerHTML += `<option value="${category.id}">${category.name}</option>`
       userFragment.appendChild($card);
    })
    $category.appendChild(userFragment)
}

fetch("https://api.escuelajs.co/api/v1/products")
    .then(response => response.json())
    .then(data => renderDataProducts(data))

// products to html
function renderDataProducts(data) {
    const productFragment = document.createDocumentFragment();
    data.forEach(product => {
        const $card = document.createElement("a");
        $card.className = "product__card";
        $card.href = `/singleproduct/single.html?idProduct=${product.id}`;    
        $card.innerHTML = `
            <img src="${product.images[0]}">
            <p>${product.title}</p>
            <p>${product.price}$</p>
        `;
        productFragment.appendChild($card);
    })
    $products.appendChild(productFragment)
}

// search form
$form.addEventListener("submit", (e) => {
    e.preventDefault()
    window.location.replace(window.origin + `/singleproduct/single.html?title=${$input.value}`)
})
$select.addEventListener("change", () => {
    window.location.replace(window.origin + "/products/products.html?idCategory=" + $select.value)
})
$select1.addEventListener("change", () => {
    window.location.replace(window.origin + "/products/products.html?idCategory=" + $select1.value)
})

