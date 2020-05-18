/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
// require('dotenv').config();
require("dotenv").config({
	encoding: "utf8",
});
const algoliaSearch = require("algoliasearch");

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
	appId: process.env.appId,
};
// Initialize Firebase

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

//configure algolia
const algolia = algoliaSearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

// //console.log("Application id is ", process.env.ALGOLIA_APP_ID);

/**
 * Save firebase db contents to algolia server
 */

const saveToAlgolia = () => {
	firebase
		.database()
		.ref("Shop Collection")
		.once("value", (shopCategory) => {
			const records = [];
			let arrayKeys = Object.keys(shopCategory.toJSON());
			arrayKeys.forEach((shopItem) => {
				//console.log("Shop item is : ", shopItem);
				let shopItemRecords = shopCategory.toJSON()[shopItem];
				let recordKeys = Object.keys(shopItemRecords);
				recordKeys.forEach((eachKey) => {
					let toAddToRecord = shopItemRecords[eachKey];
					//console.log("To add to record is ", toAddToRecord);
					records.push({ objectID: eachKey, ...toAddToRecord });
				});
			});
			index
				.saveObjects(records)
				.then(() => {
					//console.log("Contacts imported into Algolia");
				})
				.catch((error) => {
					console.error("Error when importing contact into Algolia", error);
					process.exit(1);
				});
		});
};
const fetchFirebaseDatabase = () => {
	firebase
		.database()
		.ref("Shop Collection")
		.once("value", (snapshot) => {
			processSnapShot(snapshot);
		});
};

const itemContainer = document.querySelector(".category-all__item-collection");
const formClose = document.querySelector(".form__close");
const formSection = document.querySelector(".form-section");
const formElement = document.querySelector(".form");
const formButton = document.querySelector(".order-button");
const searchForm = document.querySelector(".search-form");
const searchButtonTrigger = document.querySelector(".icon-search");
const searchField = document.querySelector(".category-all__search-field");
const pageReloadButton = document.querySelector(".button-reset");

const closeForm = () => {
	formSection.style.display = "none";
	formButton.innerHTML = ` Order `;
	formElement.reset();
	document.removeEventListener("keydown", closeFormWhenEscapeKeyIsPressed);
};
const closeFormWhenEscapeKeyIsPressed = (event) => {
	//console.log("Event key is : ", event);
	switch (event.key) {
		case "Escape":
			closeForm();
			break;

		default:
			break;
	}
};
/**
 * this activate flutterwave payment integration
 */
const activatePayment = ({
	phoneNumber,
	clientEmail,
	subject,
	price,
	description,
	address,
	postalCode,
	city,
}) => {
	formButton.innerHTML =
		'<img src="/loading.28bc329d.gif" alt="loading animation" class="loading-gif" />';

	const API_publicKey = process.env.flutterWavePublicKey;
	var x = getpaidSetup({
		PBFPubKey: API_publicKey,
		customer_email: clientEmail,
		amount: price,
		customer_phone: phoneNumber,
		custom_title: `Payment for ${subject}`,
		custom_description: description,
		currency: "NGN",
		txref: `rave-${Date.now()}`,
		meta: [
			{
				metaname: subject,
				metavalue: `Payment for ${subject} described as "${description}". 
                Address Information : \n Address : ${address}, 
                Postal Code : ${postalCode} and city : ${city}`,
			},
		],
		onclose: function () {
			closeForm();
		},
		callback: function (response) {
			let txref = response.tx.txRef; // collect txRef returned and pass to a server page to complete status check.
			//console.log(
			// 	`This is the response returned after a charge ${response} and texRef is ${txref}`
			// );
			if (response.tx.chargeResponseCode == "00" || response.tx.chargeResponseCode == "0") {
				alert("Payment Successful");
			} else {
				alert("payment not successful, try again later");
			}

			x.close(); // use this to close the modal immediately after payment.
		},
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
	const itemPriceElement = document.querySelector("#order_item_price");
	const orderSubjectInputElement = document.querySelector("#order_subject");
	const orderDescriptionTextarea = document.querySelector("#order_description");
	orderSubjectInputElement.value = shop_item_name;
	itemPriceElement.value = shop_item_price;
	orderDescriptionTextarea.value = shop_item_descrpt;
	formSection.style.display = "flex";
	document.addEventListener("keydown", closeFormWhenEscapeKeyIsPressed);
};

const processSnapShot = (snapshot) => {
	// let uniqueKey = 0;
	snapshot.forEach((all) => {
		// increase unique key for every added button
		// uniqueKey += 1;
		// /**
		//  * this returns the name of each collection
		//  */
		// const eachCollectionTitle = all.getRef().getKey();
		// //console.log("Each collection title is : ", eachCollectionTitle);
		// //to populate the list of categories
		// processArray(eachCollectionTitle, uniqueKey);

		/**
		 * to get the necessary keys needed to access the items in each category
		 *
		 */
		let arrayKeys = Object.keys(all.toJSON());
		//console.log("Array keys is : ", arrayKeys);

		/**
		 * use each key to search the db to populate the page.
		 */
		arrayKeys.forEach((key) => {
			let toDisplay = all.toJSON()[key];
			appendElement(toDisplay, key);
		});
	});
};

/**
 *
 *  the main function that displays every item required by the user to the webpage
 *  @param item {this parameter holds an object of an item
 */

const appendElement = (item, key) => {
	/**
	 * object destrucring of item
	 */
	let {
		shop_item_images: itemImage,
		shop_item_name: itemName,
		shop_item_descrpt: itemDescription,
		shop_item_price: itemPrice,
		shop_item_seller: itemSeller,
		shop_item_email: itemEmail,
	} = item;
	const firstImage = itemImage[0];
	const shortenStringLength = 200;

	let stringAppended;

	itemDescription.length > shortenStringLength ? (stringAppended = "...") : (stringAppended = "");
	// //console.log("desc : ",itemDescription);
	const eachItem = `<div class="category-all__each-item category-all__each-item--hover">
            <div class="category-all__each-item-image-div">
                <img src = "${firstImage}" class ="category-all__each-item-image" />
            </div>
            <div class="category-all__each-item-text-container">
                <h3 class="category-all__each-item-text">${itemName}</h3>
                <h5 class="category-all__each-item-text">${itemDescription.substring(
					0,
					shortenStringLength
				)} ${stringAppended}</h5>
                <label for="" class="category-all__each-label">${itemPrice}</label>
                <p class = "category-all__each-item-text"> Sold By : ${itemSeller} </p>
            </div>
            <div class ="send-message">
                <button class = "message-button" data-id="${key}" data-email-client="${itemEmail}" > <label class="order-text"> Order </label> <i class="fa fa-cart-arrow-down"></i> </button>
            </div>
        </div>`;
	//to append each item to the category list
	itemContainer.insertAdjacentHTML("beforeend", eachItem);

	/**
	 * the variable that holds the order button when each div is hovered
	 * had to do it like this because JS wouldn't let me add the onclick event in the template literal
	 */
	const orderButton = document.querySelector(`[data-id="${key}"]`);
	orderButton.addEventListener("click", () => {
		sendMessagePop(item);
	});
};

/**
 * this displays the list of the categories in the db to the web page
 * @param collectionTitle {*} the title of each category
 */
// const processArray = (collectionTitle, uniqueKey) => {
// 	const listSection = document.querySelector(".unordered-list");
// 	const eachButton = `
//         <li class="item-list">
//             <button class="category__button" data-key="${uniqueKey}">${collectionTitle}</button>
//         </li>
//     `;
// 	listSection.insertAdjacentHTML("beforeend", eachButton);
// 	const eachButtonEvent = document.querySelector(`[data-key="${uniqueKey}"]`);
// 	// //console.log("object")
// 	eachButtonEvent.addEventListener("click", () => {
// 		searchCategory(collectionTitle);
// 		navToogle(false);
// 		//console.log("unique key : ", uniqueKey, collectionTitle);
// 	});
// };

/**
 *
 * @param {*} status this holds the status tot determine the state of the element
 */

// const navToogle = status => {
// 	let linkNavSection = document.querySelector(".main__category");
// 	if (status) {
// 		linkNavSection.classList.remove("none");
// 		linkNavSection.classList.add("block");
// 	} else {
// 		linkNavSection.classList.remove("block");
// 	}
// };

/**
 * to close the form field
 */
formClose.addEventListener("click", () => {
	closeForm();
});

/**
 * initialize parameters and call the activatePayment function to implement the sendGrid API
 */

formElement.addEventListener("submit", () => {
	// event.preventDefault();sam.smith@example
	// const clientEmail = document.querySelector("#form_email").value;
	const clientEmail = querySelectorValue("#form_email");
	const subject = querySelectorValue("#order_subject");
	const phoneNumber = querySelectorValue("#form_tel");
	const price = querySelectorValue("#order_item_price");
	const description = querySelectorValue("#order_description");
	const address = querySelectorValue("#user_address");
	const postalCode = querySelectorValue("#postal_code");
	const citySelectedIndex = document.querySelector("#userCity").selectedIndex;
	const city = document.querySelector("#userCity").options[citySelectedIndex].value;
	const parameters = {
		phoneNumber,
		clientEmail,
		subject,
		price,
		description,
		address,
		postalCode,
		city,
	};
	//console.log(`Para : ${JSON.stringify(parameters)} `);
	activatePayment(parameters);
});

const querySelectorValue = (query) => {
	return document.querySelector(query).value;
};

/**
 * search button trigger that toggles the search field
 */

searchButtonTrigger.addEventListener("click", () => {
	searchField.classList.toggle("none");
});

/**
 * add event listener onsubmit to the search form
 */
searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	// const searchQuery = document.querySelector("#search").value;
	// const ref = firebase.database().ref(`Shop Collection/${searchQuery}`);
	// itemContainer.innerHTML = "";
	// ref.orderByChild("shop_item_name").on("child_added", snapshot => {
	// 	appendElement(snapshot.val());
	// });

	const searchQuery = querySelectorValue("#search");
	document.querySelector(".search-form__loading-gif").style.display = "block";
	console.log("Search Query is ", searchQuery);
	index.search(searchQuery).then(({ hits }) => {
		itemContainer.innerHTML = "";
		if (hits.length !== 0) {
			hits.forEach((hit) => {
				appendElement(hit, hit.objectID);
			});
		} else {
			console.log("No object found");

			fetchFirebaseDatabase();
			let noObjectFoundElement = document.querySelector(".no-object-found");
			noObjectFoundElement.style.display = "flex";
			setTimeout(() => {
				noObjectFoundElement.style.display = " none";
			}, 3000);
		}
		document.querySelector(".search-form__loading-gif").style.display = "none";
	});
});

/**
 * to reload the page
 */
pageReloadButton.addEventListener("click", () => {
	location.reload();
});
window.addEventListener("DOMContentLoaded", (event) => {
	event.preventDefault();

	/**
	 * referencing the database
	 */

	// eslint-disable-next-line no-undef
	fetchFirebaseDatabase();
	saveToAlgolia();

	// let linkNavOpeningTrigger = document.querySelector(".main__link-navigator-trigger");
	// linkNavOpeningTrigger.addEventListener("click", () => {
	// 	navToogle(true);
	// });
	// let linkNavClosingTrigger = document.querySelector(".main__link-navigator-trigger-close");
	// // linkNavClosingTrigger.addEventListener("click", () => {
	// // 	navToogle(false);
	// // });
});
// window.addEventListener("resize", () => {
// 	let windowsWidth = window.innerWidth;
// 	// if (windowsWidth > 600) {
// 	// 	navToogle(true);
// 	// } else {
// 	// 	navToogle(false);
// 	// }
// });
