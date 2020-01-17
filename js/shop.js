/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
// require('dotenv').config();
require("dotenv").config({
    encoding: "utf8"
});

/**
 * firebase details with the api keys and app details
 */
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

const itemContainer = document.querySelector(".category-all__item-collection");
const formClose = document.querySelector(".form__close");
const formSection = document.querySelector(".form-section");
const formElement = document.querySelector(".form");
const formButton = document.querySelector(".order-button");
const searchForm = document.querySelector(".search-form");
const searchButtonTrigger = document.querySelector(".icon-search");
const searchField = document.querySelector(".category-all__search-field");
const pageReloadButton = document.querySelector(".button-reset");
let searchFieldStatus = true;

const formReset = () => {
    formSection.style.display = "none";
    formButton.innerHTML = ` Order `;
    formElement.reset();
};

/**
 * this function mails the client's order to the seller
 * who is the recipient of the mail
 */
const activatePayment = param => {
    formButton.innerHTML =
        '<img src="/loading.28bc329d.gif" alt="loading animation" class="loading-gif">';

    const API_publicKey = process.env.flutterWavePublicKey;
    var x = getpaidSetup({
        PBFPubKey: API_publicKey,
        customer_email: param.clientEmail,
        amount: param.price,
        customer_phone: param.phoneNumber,
        custom_title: `Payment for ${param.subject}`,
        custom_description: param.description,
        currency: "NGN",
        txref: `rave-${Date.now()}`,
        meta: [{
            metaname: param.subject
        }],
        onclose: function() {
            formReset();
        },
        callback: function(response) {
            let txref = response.tx.txRef; // collect txRef returned and pass to a 					server page to complete status check.
            console.log(
                `This is the response returned after a charge ${response} and texRef is ${txref}`
            );
            if (response.tx.chargeResponseCode == "00" || response.tx.chargeResponseCode == "0") {
                alert("Payment Successful");
            } else {
                alert("payment not successful, try again later");
            }

            x.close(); // use this to close the modal immediately after payment.
        }
    });
};

/**
 *  this functions pops up the form where the user can specify the item to order
 *
 * @param  item_description   what's the description most probably the title of the item to order
 * @param item_email what's the email of the sender,
 * the mail server won't authorize email from sender
 * except it is registered on the server which is not possible
 */
const sendMessagePop = ({ shop_item_name, shop_item_descrpt, shop_item_price }) => {
    formSection.style.display = "flex";
    const itemPriceElement = document.querySelector("#order_item_price");
    const orderSubjectInputElement = document.querySelector("#order_subject");
    const orderDescriptionTextarea = document.querySelector("#order_description");
    orderSubjectInputElement.value = shop_item_name;
    itemPriceElement.value = shop_item_price;
    orderDescriptionTextarea.value = shop_item_descrpt;
};

const processSnapShot = snapshot => {
    let uniqueKey = 0;
    snapshot.forEach(all => {
        // increase unique key for every added button
        uniqueKey += 1;
        /**
         * this returns the name of each collection
         */
        const eachCollectionTitle = all.getRef().getKey();
        //to populate the list of categories
        processArray(eachCollectionTitle, uniqueKey);

        /**
         * to get the necessary keys needed to access the items
         *
         */
        let arrayKeys = Object.keys(all.toJSON());

        /**
         * use each key to search the db to populate the page.
         */
        arrayKeys.forEach(key => {
            let toDisplay = all.toJSON()[key];
            appendElement(toDisplay);
        });
    });
};

/**
 *
 * this search function works by searching the firebase db by the title}
 * @param collectionTitle holds the title of the category to display
 */

const searchCategory = collectionTitle => {
    itemContainer.innerHTML = "";
    // navToogle(false);
    // console.log("collection title is : ",collectionTitle);
    firebase
        .database()
        .ref(`Shop Collection/${collectionTitle}`)
        .once("value", snapshot => {
            console.log("snap shot value is : ", snapshot.val());
            /**
             * create an object collection of the title subcollection
             */
            let collectionTitleObject = snapshot.val();

            /**
             * to get the list of object keys in the response
             */
            let collectionTitleKeys = Object.keys(collectionTitleObject);
            console.log("collection title is : ", collectionTitleKeys);
            collectionTitleKeys.forEach(key => {
                appendElement(collectionTitleObject[key]);
            });
        });
};

/**
 *
 *  the main function that displays every item required by the user to the webpage
 *  @param item {this parameter holds an object of an item
 */

const appendElement = item => {
    /**
     * to generate ID for each item
     * this temporary, the id should actually be set from the database.
     */
    let itemDescription = item.shop_item_descrpt.split(" ");
    itemDescription = itemDescription.join("_");
    // console.log("desc : ",itemDescription);
    const eachItem = `<div class="category-all__each-item category-all__each-item--hover">
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
                <button class = "message-button" data-id="${itemDescription}" data-email-client="${item.shop_item_email}" > <label class="order-text"> Order </label> <i class="fa fa-cart-arrow-down"></i> </button>
            </div>
        </div>`;
    //to append each item to the category list
    itemContainer.insertAdjacentHTML("beforeend", eachItem);

    /**
     * the variable that holds the order button when each div is hovered
     * had to do it like this because JS wouldn't let me add the onclick event in the template literal
     */
    const orderButton = document.querySelector(`[data-id="${itemDescription}"]`);
    orderButton.addEventListener("click", () => {
        sendMessagePop(item);
    });
};

/**
 * this displays the list of the categories in the db to the web page
 * @param collectionTitle {*} the title of each category
 */
const processArray = (collectionTitle, uniqueKey) => {
    const listSection = document.querySelector(".unordered-list");
    const eachButton = `
        <li class="item-list">
            <button class="category__button" data-key="${uniqueKey}">${collectionTitle}</button>
        </li>
    `;
    listSection.insertAdjacentHTML("beforeend", eachButton);
    const eachButtonEvent = document.querySelector(`[data-key="${uniqueKey}"]`);
    // console.log("object")
    eachButtonEvent.addEventListener("click", () => {
        searchCategory(collectionTitle);
        navToogle(false);
        console.log("unique key : ", uniqueKey, collectionTitle);
    });
};

/**
 *
 * @param {*} status this holds the status tot determine the state of the element
 */

const navToogle = status => {
    let linkNavSection = document.querySelector(".main__category");
    if (status) {
        linkNavSection.classList.remove("none");
        linkNavSection.classList.add("block");
    } else {
        linkNavSection.classList.remove("block");
    }
};

/**
 * to close the form field
 */
formClose.addEventListener("click", () => {
    formReset();
});

/**
 * initialize parameters and call the activatePayment function to implement the sendGrid API
 */

formElement.addEventListener("submit", () => {
    // event.preventDefault();sam.smith@example
    const clientEmail = document.querySelector("#form_email").value;
    const subject = document.querySelector("#order_subject").value;
    const phoneNumber = document.querySelector("#form_tel").value;
    const price = document.querySelector("#order_item_price").value;
    const description = document.querySelector("#order_description").value;
    const parameters = {
        phoneNumber,
        clientEmail,
        subject,
        price,
        description
    };
    console.log(
        `Para : ${JSON.stringify(parameters)} and publick key = ${process.env.flutterWavePublicKey}`
    );
    activatePayment(parameters);
});

/**
 * search button trigger that toggles the search field
 */

searchButtonTrigger.addEventListener("click", () => {
    if (searchFieldStatus) {
        searchField.classList.add("none");
    } else {
        searchField.classList.remove("none");
    }
    searchFieldStatus = !searchFieldStatus;
});

/**
 * add event listener onsubmit to the search form
 */
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const searchQuery = document.querySelector("#search").value;
    const ref = firebase.database().ref(`Shop Collection/${searchQuery}`);
    itemContainer.innerHTML = "";
    ref.orderByChild("shop_item_name").on("child_added", snapshot => {
        appendElement(snapshot.val());
    });
});

/**
 * to reload the page
 */
pageReloadButton.addEventListener("click", () => {
    location.reload();
});
window.addEventListener("DOMContentLoaded", event => {
    event.preventDefault();

    /**
     * referencing the database
     */

    // eslint-disable-next-line no-undef
    firebase
        .database()
        .ref("Shop Collection")
        .once("value", snapshot => {
            processSnapShot(snapshot);
        });

    let linkNavOpeningTrigger = document.querySelector(".main__link-navigator-trigger");
    linkNavOpeningTrigger.addEventListener("click", () => {
        navToogle(true);
    });
    let linkNavClosingTrigger = document.querySelector(".main__link-navigator-trigger-close");
    linkNavClosingTrigger.addEventListener("click", () => {
        navToogle(false);
    });
});
window.addEventListener("resize", () => {
    let windowsWidth = window.innerWidth;
    if (windowsWidth > 600) {
        navToogle(true);
    } else {
        navToogle(false);
    }
});