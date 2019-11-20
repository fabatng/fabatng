/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
// require('dotenv').config();
require('dotenv').config({
    encoding: 'utf8'
});

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

const processArray = (collection_title) => {
    const listSection = document.querySelector(".unordered-list");
    listSection.innerHTML +=
        `
            <li class="item-list">
                <button class="category__button">${collection_title}</button>
            </li>
        `;
}


const navToogle = (status) => {
    let linkNavSection = document.querySelector('.main__category');
    if (status) {
        linkNavSection.style.display = "flex"
    } else {
        linkNavSection.classList.add("slideback");
        setTimeout(() => {
            linkNavSection.style.display = "none";
            linkNavSection.classList.remove("slideback");
        }, 200);
    }
}


window.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    var firebaseConfig = {
        // eslint-disable-next-line no-undef
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId
    };
    // Initialize Firebase

    // eslint-disable-next-line no-undef
    firebase.initializeApp(firebaseConfig);
    /**
     * referencing the database     
     */

    // eslint-disable-next-line no-undef
    firebase.database().ref("Shop Collection").once('value', (snapshot) => {
        snapshot.forEach((all) => {
            /**
             * this returns the name of each collection
             */
            const eachCollectionTitle = all.getRef().getKey();
            //to populate the list of categories
            processArray(eachCollectionTitle);

            /**
             * to get the necessary keys needed to access the items
             * 
             */
            // const keys = Object.keys(all);
            let arrayKeys = Object.keys(all.toJSON());
            console.log("array keys is : ", arrayKeys);
            console.log("json : ", all.toJSON());
            for (counter = 0; counter < arrayKeys.length; counter++) {
                let temp = arrayKeys[counter];
                let toDisplay = all.toJSON()[temp];
                appendElement(toDisplay);
                console.log("to display is : ", toDisplay);
            }
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