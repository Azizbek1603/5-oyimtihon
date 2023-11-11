const productId = new URLSearchParams(window.location.search).get("idProduct");
const productName = new URLSearchParams(window.location.search).get("title");
const $products = document.querySelector("#main");
const $select = document.querySelector("#categoryOption");
const $select1 = document.querySelector("#categoryOption1");
const $form = document.querySelector("#form");
const $input = document.querySelector("#input");

// find product by id
if(productId){
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
    .then(response => response.json())
    .then(data => renderData(data))

    function  renderData(data) {
        console.log(data);
        const cardFragment = document.createDocumentFragment();
        const img = document.createElement("img");
        img.src = data.images[0];
        const $card = document.createElement("div");
        $card.className = "product__card";
        $card.innerHTML = `
            <p>Name:   ${data.title}</p>
            <span>Price:   ${data.price}$</span>
            <h6>Description:   ${data.description}</h6>
            <h5>Category:   ${data.category.name}</h5>
            <button class="btn1">Add to cart</button>
            <button class="btn2">Buy it now</button>
        `;
        document.title = data.title;
        cardFragment.appendChild(img);
        cardFragment.appendChild($card);
        $products.appendChild(cardFragment)
    }
}
// find product by title
else{
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${productName}`)
    .then(response => response.json())
    .then(data => OutputData(data))

    function OutputData(data) {
        console.log(data);
        console.log(data[0].images);
        const cardFragment = document.createDocumentFragment();
        const img = document.createElement("img");
        img.src = data[0].images[0];
        const $card = document.createElement("div");
        $card.className = "product__card";
        $card.innerHTML = `
            <p>Name:   ${data[0].title}</p>
            <span>Price:   ${data[0].price}$</span>
            <h6>Description:   ${data[0].description}</h6>
            <h5>Category:   ${data[0].category.name}</h5>
            <button class="btn1">Add to cart</button>
            <button class="btn2">Buy it now</button>
        `;
        document.title = data[0].title;
        cardFragment.appendChild(img);
        cardFragment.appendChild($card);
        $products.appendChild(cardFragment)
    }
}


fetch("https://api.escuelajs.co/api/v1/categories")
    .then(response => response.json())
    .then(data => selectOption(data))

function selectOption(data) {
    data.forEach(category => {
        $select.innerHTML += `<option value="${category.id}">${category.name}</option>`
        $select1.innerHTML += `<option value="${category.id}">${category.name}</option>`
    })
}
// search
$form.addEventListener("submit", (e) => {
    e.preventDefault()
    window.location.replace(window.origin + `/singleproduct/single.html?title=${$input.value}`)
})
// adding options to select
$select.addEventListener("change", () => {
    window.location.replace(window.origin + "/products/products.html?idCategory=" + $select.value)
})

$select1.addEventListener("change", () => {
    window.location.replace(window.origin + "/products/products.html?idCategory=" + $select1.value)
})