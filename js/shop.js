/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
// require('dotenv').config();
require('dotenv').config({
    encoding: 'utf8'
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
const formClose = document.querySelector('.form__close');
const formSection = document.querySelector('.form-section');
const formElement = document.querySelector('.form');
const formButton = document.querySelector('.order-button');
const searchForm = document.querySelector('.search-form');
const searchButtonTrigger = document.querySelector('.icon-search');
const searchField = document.querySelector('.category-all__search-field');
const pageReloadButton = document.querySelector('.button-reset');
let searchFieldStatus = true;


const formReset = () =>{
    formSection.style.display = "none";
    formButton.innerHTML = ` Order `;
    formElement.reset();
}


/** 
 * this function mails the client's order to the seller 
 * who is the recipient of the mail
*/
const mailer = (param) => {
    // sgMail.send(param);
    formButton.innerHTML = '<img src="/loading.28bc329d.gif" alt="loading animation" class="loading-gif">';
    // const username = process.env.userName;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : process.env.userName,
        Password : process.env.password,
        To : param.receiver,
        From : process.env.userName,
        Subject : param.subject,
        Body : `${param.text} \n from ${param.sender}`
    }).then(
      message => alert(message)
    ).then(()=>{

        formButton.innerHTML = 'Sent  <i class="fa fa-check modify-icon-button"></>';
        setTimeout(()=>{
            formReset();
        },1000);
    });

}


/**
 *  this functions pops up the form where the user can specify the item to order 
 *
 * @param  item_description   what's the description most probably the title of the item to order
 * @param item_email what's the email of the sender, 
 * the mail server won't authorize email from sender 
 * except it is registered on the server which is not possible 
 */
const sendMessagePop = (item_description,item_email) => {
    formSection.style.display = "flex";
    const orderSubjectInputElement = document.querySelector('#order_subject');
    orderSubjectInputElement.value = item_description;  
    const formEmailData = document.querySelector('#form_email');
    formEmailData.dataset.clientEmail = item_email;
    // console.log("form email data : ", formEmailData);
}


/**
 * 
 * this search function works by searching the firebase db by the title}
 * @param collectionTitle holds the title of the category to display
 */

const searchCategory = (collectionTitle) =>{
    itemContainer.innerHTML = '';
    navToogle(false);
    // console.log("collection title is : ",collectionTitle);
    firebase.database().ref(`Shop Collection/${collectionTitle}`).once('value', (snapshot) => {
        console.log("snap shot value is : ",snapshot.val());
        /**
         * create an object collection of the title subcollection
         */
        let collectionTitleObject = snapshot.val();
        
        /**
         * to get the list of object keys in the response
         */
        let collectionTitleKeys = Object.keys(collectionTitleObject);
        console.log("collection title is : ", collectionTitleKeys);
        collectionTitleKeys.forEach((key)=>{
            appendElement(collectionTitleObject[key]);
        });
    })
}


/**
 * 
 *  the main function that displays every item required by the user to the webpage 
 *  @param item {this parameter holds an object of an item
 */

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
                <button class = "message-button" data-id="${itemDescription}" data-email-client="${item.shop_item_email}" > Order <i class="fa fa-cart-arrow-down"></i> </button>
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


/**
 * this displays the list of the categories in the db to the web page
 * @param collectionTitle {*} the title of each category 
 */
const processArray = (collectionTitle) => {
    const listSection = document.querySelector(".unordered-list");
    let uniqueKey = Math.random()*10;
    uniqueKey = Math.floor(uniqueKey);
    const eachButton = 
    `
        <li class="item-list">
            <button class="category__button" data-key="${uniqueKey}">${collectionTitle}</button>
        </li>
    `
    listSection.insertAdjacentHTML('beforeend',eachButton);
    const eachButtonEvent = document.querySelector(`[data-key="${uniqueKey}"]`);
    // console.log("object")
    eachButtonEvent.addEventListener("click",()=>{
        searchCategory(collectionTitle);
        console.log("unique key : ",uniqueKey, collectionTitle);

    })
}

/**
 * 
 * @param {*} status this holds the status tot determine the state of the element
 */

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

/**
 * to close the form field
 */
formClose.addEventListener("click",()=>{
    formSection.style.display = "none";
});


/**
 * initialize parameters and call the mailer function to implement the sendGrid API
 */

formElement.addEventListener("submit",()=>{
    // event.preventDefault();sam.smith@example
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

/**
 * search button trigger that toggles the search field
 */

searchButtonTrigger.addEventListener("click",()=>{
    if(searchFieldStatus){
        searchField.classList.add("none");
    }
    else{
        searchField.classList.remove("none");
    }
    searchFieldStatus = !searchFieldStatus;
});

/**
 * add event listener onsubmit to the search form
 */
searchForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const searchQuery = document.querySelector('#search').value;
    const ref = firebase.database().ref(`Shop Collection/${searchQuery}`);
    itemContainer.innerHTML = '';
    ref.orderByChild('shop_item_name').on("child_added",(snapshot)=>{
        appendElement(snapshot.val());
    })
});

/**
 * to reload the page
 */
pageReloadButton.addEventListener("click",()=>{
    location.reload();
})
window.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    
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
            let arrayKeys = Object.keys(all.toJSON());

            /**
             * use each key to search the db to populate the page.
             */
            arrayKeys.forEach((key)=>{
                let toDisplay = all.toJSON()[key];
                appendElement(toDisplay)
            })
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