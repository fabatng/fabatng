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
            <div class ="send-message">
                <button class = "message-button"> Order <i class="fa fa-cart-arrow-down"></i> </button>
            </div>
        </div>`;
    itemContainer.innerHTML += eachItem;
}


const navToogle = (status) => {
    let linkNavSection = document.querySelector('.main__category');
    if (status) {
        linkNavSection.style.display = "flex"
    } else {
        linkNavSection.classList.add("slideback");
        console.log(linkNavSection.className);
        setTimeout(() => {
            linkNavSection.style.display = "none";
            linkNavSection.classList.remove("slideback");
        }, 200);
    }
}


window.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
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

    // eslint-disable-next-line no-undef
    firebase.initializeApp(firebaseConfig);

    /**
     * referencing the database     
     */

    // eslint-disable-next-line no-undef
    firebase.database().ref("Shop Collection").on('value', (snapshot) => {
        snapshot.forEach((item) => {
            //this calls the function to populate the webpage with the values of the item
            appendElement(item.val());
        });
    });

    let linkNavOpeningTrigger = document.querySelector('.main__link-navigator-trigger');
    linkNavOpeningTrigger.addEventListener("click", () => {
        navToogle(true);
    })
    let linkNavClosingTrigger = document.querySelector('.main__link-navigator-trigger-close');
    linkNavClosingTrigger.addEventListener("click", () => {
        navToogle(false);
    });
});