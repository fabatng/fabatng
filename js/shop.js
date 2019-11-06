const itemContainer = document.querySelector(".category-all__item-collection");
const appendElement = (item) => {
    const eachItem =
        `<div class="category-all__each-item category-all__each-item--hover">
            <div class="category-all__each-item-image-div">
                <img src = "${item.shop_item_image}" class ="category-all__each-item-image" />
            </div>
            <div class="category-all__each-item-text-container">
                <h3 class="category-all__each-item-text">${item.shop_item_name}</h3>
                <h5 class="category-all__each-item-text">${item.shop_item_descrpt}</h5>
                <label for="" class="category-all__each-label">${item.shop_item_price}</label>
                <p class = "category-all__each-item-text"> Sold By : ${item.shop_item_seller} </p>
            </div>
        </div>`;
    itemContainer.innerHTML += eachItem;
}
window.addEventListener("DOMContentLoaded", (event) => {
    var firebaseConfig = {
        apiKey: "AIzaSyBwriMZap33ujMIzx7Ck4EPi5sOrzbGyb0",
        authDomain: "mechanics-b3612.firebaseapp.com",
        databaseURL: "https://mechanics-b3612.firebaseio.com",
        projectId: "mechanics-b3612",
        storageBucket: "mechanics-b3612.appspot.com",
        messagingSenderId: "98302440694",
        appId: "1:98302440694:web:83d23a56461bc6593568d7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref("Shop Collection").once('value', (snapshot) => {
        snapshot.forEach((item) => {
            // console.log(`item key : ${item.key}`);
            // console.log(`item value : ${item.val()}`);
            appendElement(item.val());
        })
    });
})