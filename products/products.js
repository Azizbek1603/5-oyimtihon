const categoryId = new URLSearchParams(window.location.search).get("idCategory");
const $products = document.querySelector(".product");
const $noItem = document.querySelector("#noitem");
const $select = document.querySelector("#categoryOption");
const $select1 = document.querySelector("#categoryOption1");
const $form = document.querySelector("#form");
const $input = document.querySelector("#input");


if(categoryId){
    fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`)
        .then(response => response.json())
        .then(data => renderDataCategories(data))
    function renderDataCategories(data) {
        $products.innerHTML = "";
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
            document.title = data[categoryId].category.name;
            productFragment.appendChild($card);
        })
        $products.appendChild(productFragment)
    }
}

else{
    fetch(`https://api.escuelajs.co/api/v1/products`)
    .then(response => response.json())
    .then(data => renderDataProducts(data))

    function renderDataProducts(data) {
        $products.innerHTML = "";
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
        document.title = "Products";
        $noItem.style.display = "none";
        $products.appendChild(productFragment)
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






