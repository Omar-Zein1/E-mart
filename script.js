let main=document.querySelector("main");
let search = document.querySelector("input")
let myR= new XMLHttpRequest();
function getData(URL){
    main.innerHTML="";
    myR.open("GEt",URL,true);
    myR.send();
    myR.onload=()=>{
        if(myR.readyState==4 && myR.status==200){
            let data=JSON.parse(myR.responseText);
            let products=data.products;
            products.forEach((product) => {
                main.innerHTML+=`
                <div class="card">
                <img src="${product.thumbnail}">
                <h4>${product.title}</h4>
                <p class="description">${product.description}</p>
                <p class="price">
                    price: <span class="old-price">${product.price} $</span>
                </p>
                <button onclick="added('${product.title}')"> <i class="fa-solid fa-cart-shopping"></i> add to cart</button>
                </div>
                `
            });
        }
    }
}
getData("https://dummyjson.com/products");
search.addEventListener("input",()=>{
    let searchValue=search.value;
    let searchURL=`https://dummyjson.com/products/search?q=${searchValue}`;
    getData(searchURL);
})
let filter=document.querySelector(".filter");
let catRequest=new XMLHttpRequest();
catRequest.open("GET",'https://dummyjson.com/products/categories',true);
catRequest.send();
catRequest.onload=()=>{
    if(myR.readyState==4 && myR.status==200){
        let categories=JSON.parse(catRequest.responseText);
        filter.innerHTML+=`<span onclick="getData('https://dummyjson.com/products')">all</span>`
        categories.forEach((e)=>{
            filter.innerHTML+=`<span onclick="getData('${e.url}')">${e.name}</span>`
        })
    }
}
function added(name){
    window.alert(`item ${name} added to cart!`)
}