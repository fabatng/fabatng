/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
// require('dotenv').config();
require('dotenv').config({
    encoding: 'utf8'
});
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.mailerAPI);


const itemContainer = document.querySelector(".category-all__item-collection");
const formClose = document.querySelector('.form__close');
const formSection = document.querySelector('.form-section');
const formElement = document.querySelector('.form');


formClose.addEventListener("click",()=>{
    formSection.style.display = "none";
});


const mailer = (param) => {
    sgMail.send(param);
    // const msg = {
    //     to: 'test@example.com',
    //     from: 'test@example.com',
    //     subject: 'Sending with Twilio SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    //   };
    //   sgMail.send(msg);
}

const sendMessagePop = (item_description,item_email) => {
    formSection.style.display = "flex";
    const orderSubjectInputElement = document.querySelector('#order_subject');
    orderSubjectInputElement.value = item_description;  
    const formEmailData = document.querySelector('#form_email');
    formEmailData.dataset.clientEmail = item_email;
    console.log("form email data : ", formEmailData);
}


/**
 * initialize parameters and call the mailer function to implement the sendGrid API
 */

formElement.addEventListener("submit",()=>{
    // event.preventDefault();
    const receiver = document.querySelector('#form_email').dataset.clientEmail;
    const sender = document.querySelector('#form_email').value;
    const subject = document.querySelector('#order_subject').value;
    const text = document.querySelector('#order_message').value;
    const cc = 'calebdeji06@gmail.com';
    const html= '<strong>and easy to do anywhere, even with Node.js</strong>';
    const parameters = { receiver, sender , subject , text , html, cc};
    console.log("para : ", parameters);
    mailer(parameters);
});


const appendElement = (item) => {
    /**
     * to generate ID for each item
     * this temporary, the id should actually be set from the database.
     */
    let itemDescription = item.shop_item_descrpt.split(' ');
    itemDescription= itemDescription.join('_');
    // console.log("desc : ",itemDescription);
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
                <button class = "message-button" data-id="${itemDescription}" data-email-client="${item.shop_item_email}"> Order <i class="fa fa-cart-arrow-down"></i> </button>
            </div>
        </div>`;
    //to append each item to the category list
    itemContainer.insertAdjacentHTML('beforeend',eachItem); 

    /**
     * the variable that holds the order button when each div is hovered
     * had to do it like this because JS wouldn't let me add the onclick event in the template literal
     */
    const orderButton = document.querySelector(`[data-id="${itemDescription}"]`);
    orderButton.addEventListener('click',()=>{
        sendMessagePop(item.shop_item_descrpt,item.shop_item_email);
    });
    
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
            // console.log("array keys is : ", arrayKeys);
            // console.log("json : ", all.toJSON());
            for (counter = 0; counter < arrayKeys.length; counter++) {
                let temp = arrayKeys[counter];
                let toDisplay = all.toJSON()[temp];
                appendElement(toDisplay);
                // console.log("to display is : ", toDisplay);
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