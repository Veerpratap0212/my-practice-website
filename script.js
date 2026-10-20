/* ==========================================
   ELEMENTS
========================================== */

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("searchInput");

const productCards = document.querySelectorAll(".product-card");

const addCartButtons = document.querySelectorAll(".add-cart");


/* ==========================================
   SHOPPING CART
========================================== */

let cart = [];


/* ==========================================
   OPEN / CLOSE CART
========================================== */

cartIcon.addEventListener("click", () => {

    cartSidebar.classList.add("active");

});

closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

});


/* ==========================================
   ADD PRODUCT
========================================== */

addCartButtons.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        const card = productCards[index];

        const name = card.querySelector("h3").innerText;

        const price = parseInt(

            card.querySelector("h4")
            .innerText
            .replace("₹","")
            .replace(",","")

        );

        const image = card.querySelector("img").src;

        addToCart(name,price,image);

    });

});


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(name,price,image){

    const existing = cart.find(item=>item.name===name);

    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            name,

            price,

            image,

            quantity:1

        });

    }

    updateCart();

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart(){

    cartItems.innerHTML="";

    let total=0;

    let count=0;

    if(cart.length===0){

        cartItems.innerHTML=`

        <div class="empty-cart">

            <i class="fa-solid fa-cart-shopping"></i>

            <p>Your cart is empty.</p>

        </div>

        `;

    }

    cart.forEach((item,index)=>{

        total+=item.price*item.quantity;

        count+=item.quantity;

        const div=document.createElement("div");

        div.className="cart-product";

        div.innerHTML=`

        <img src="${item.image}" class="cart-image">

        <div class="cart-details">

            <h4>${item.name}</h4>

            <p>₹${item.price}</p>

            <div class="qty">

                <button onclick="decreaseQty(${index})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQty(${index})">+</button>

            </div>

        </div>

        <button class="delete-btn"

        onclick="removeItem(${index})">

        <i class="fa-solid fa-trash"></i>

        </button>

        `;

        cartItems.appendChild(div);

    });

    cartCount.innerText=count;

    cartTotal.innerText="₹"+total.toLocaleString();

}


/* ==========================================
   QUANTITY
========================================== */

function increaseQty(index){

    cart[index].quantity++;

    updateCart();

}

function decreaseQty(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }

    else{

        cart.splice(index,1);

    }

    updateCart();

}


/* ==========================================
   REMOVE ITEM
========================================== */

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}


/* ==========================================
   SEARCH PRODUCTS
========================================== */

searchInput.addEventListener("keyup",()=>{

    const value=searchInput.value.toLowerCase();

    productCards.forEach(card=>{

        const title=card.querySelector("h3")
        .innerText.toLowerCase();

        if(title.includes(value)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

});


/* ==========================================
   CART ITEM STYLE
========================================== */

const cartStyle=document.createElement("style");

cartStyle.innerHTML=`

.cart-product{

display:flex;

align-items:center;

gap:15px;

margin-bottom:20px;

padding-bottom:15px;

border-bottom:1px solid #ddd;

}

.cart-image{

width:70px;

height:70px;

object-fit:cover;

border-radius:10px;

}

.cart-details{

flex:1;

}

.cart-details h4{

font-size:16px;

margin-bottom:6px;

}

.qty{

display:flex;

align-items:center;

gap:10px;

margin-top:8px;

}

.qty button{

width:28px;

height:28px;

border:none;

background:#2563eb;

color:white;

border-radius:50%;

cursor:pointer;

}

.delete-btn{

border:none;

background:red;

color:white;

width:35px;

height:35px;

border-radius:50%;

cursor:pointer;

}

`;

document.head.appendChild(cartStyle);
/* ==========================================
   DARK MODE
========================================== */

const darkModeBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        darkModeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        darkModeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});


/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("mobile-menu");

});


/* ==========================================
   BACK TO TOP
========================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================
   CHECKOUT
========================================== */

const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");

const closeCheckout = document.getElementById("closeCheckout");

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;

    }

    checkoutModal.classList.add("active");

});

closeCheckout.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

});

window.addEventListener("click", (e) => {

    if (e.target === checkoutModal) {

        checkoutModal.classList.remove("active");

    }

});


/* ==========================================
   PLACE ORDER
========================================== */

document
.getElementById("checkoutForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    showToast("🎉 Order Placed Successfully!");

    cart = [];

    updateCart();

    checkoutModal.classList.remove("active");

    this.reset();

});


/* ==========================================
   NEWSLETTER
========================================== */

const newsletter = document.querySelector(".newsletter form");

newsletter.addEventListener("submit",(e)=>{

    e.preventDefault();

    showToast("Thanks for subscribing!");

    newsletter.reset();

});


/* ==========================================
   TOAST NOTIFICATION
========================================== */

const toast = document.createElement("div");

toast.className = "toast";

document.body.appendChild(toast);

function showToast(message){

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


/* ==========================================
   SAVE CART
========================================== */

function saveCart(){

    localStorage.setItem(

        "shoppingCart",

        JSON.stringify(cart)

    );

}

function loadCart(){

    const data = localStorage.getItem("shoppingCart");

    if(data){

        cart = JSON.parse(data);

        updateCart();

    }

}


/* ==========================================
   OVERRIDE UPDATE CART
========================================== */

const oldUpdateCart = updateCart;

updateCart = function(){

    oldUpdateCart();

    saveCart();

};


/* ==========================================
   LOAD SAVED CART
========================================== */

loadCart();


/* ==========================================
   SMOOTH LINKS
========================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

anchor.addEventListener("click",function(e){

const target=document.querySelector(

this.getAttribute("href")

);

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/* ==========================================
   MOBILE MENU STYLE
========================================== */

const mobileCSS = document.createElement("style");

mobileCSS.innerHTML = `

@media(max-width:768px){

nav{

position:absolute;

top:80px;

left:0;

width:100%;

background:white;

display:none;

padding:20px;

box-shadow:0 10px 20px rgba(0,0,0,.1);

}

body.dark nav{

background:#102542;

}

nav.mobile-menu{

display:block;

}

nav ul{

flex-direction:column;

gap:20px;

}

}

.toast{

position:fixed;

bottom:30px;

left:50%;

transform:translateX(-50%);

background:#2563eb;

color:white;

padding:15px 25px;

border-radius:50px;

font-weight:600;

opacity:0;

pointer-events:none;

transition:.4s;

z-index:99999;

}

.toast.show{

opacity:1;

bottom:45px;

}

`;

document.head.appendChild(mobileCSS);


/* ==========================================
   SHOW TOAST WHEN PRODUCT ADDED
========================================== */

const oldAdd = addToCart;

addToCart = function(name,price,image){

    oldAdd(name,price,image);

    showToast(name + " added to cart");

};


/* ==========================================
   PAGE LOADER
========================================== */

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

});