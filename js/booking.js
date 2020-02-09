import LoadingGif from "../asset/images/loading.gif";
const bookingPopUp = () => {
	let bookingContainer = document.querySelector(".booking");
	let bookingStageBackButtonCollection = document.querySelector(".each-stage__button--back");
	bookingStageBackButtonCollection.classList.add("display-none");
	handleRenderedBookingStage(0);
	bookingContainer.classList.remove("display-none");

	bookingContainer.classList.add("display-flex");
};

const closeBookingPopUp = () => {
	let bookingContainer = document.querySelector(".booking");
	bookingContainer.classList.remove("display-flex");

	bookingContainer.classList.add("display-none");
};

const sendBookingMail = templateParams => {
	let estimateButton = document.querySelector(".estimate-button");
	estimateButton.classList.add("estimate-button--modify");
	estimateButton.innerHTML = `<img src=${LoadingGif} alt="loading animation" class="loading-gif">`;

	// console.log("mailer parameter is : ", templateParams);
	// eslint-disable-next-line no-undef
	const templateId = process.env.templateID;
	// eslint-disable-next-line no-undef
	emailjs.send("default_service", templateId, templateParams).then(
		function(response) {
			// console.log("SUCCESS!", response.status, response.text);
			estimateButton.classList.remove("estimate-button--modify");
			estimateButton.innerHTML = "Get Estimate";
			alert("Your details have been sent, we will reply you shortly");
			closeBookingPopUp();
		},
		function(error) {
			// console.log("FAILED...", error);
			alert("Service down, try again later");
			closeBookingPopUp();
		}
	);
};
const sendSupportMail = templateParams => {
	const supportButton = document.querySelector(".support__submit-button");
	supportButton.classList.add("submit-button--no-padding");
	supportButton.innerHTML = `<img src=${LoadingGif} alt="loading animation" class="loading-gif">`;
	// eslint-disable-next-line no-undef
	const supportMailTemplateId = process.env.bookingTemplateID;
	// eslint-disable-next-line no-undef
	emailjs.send("default_service", supportMailTemplateId, templateParams).then(
		response => {
			// console.log("Success : Support mail sent ", response.status, response.text);
			alert("Message Sent, thank you!");
			resetSupportForm();
			// supportButton.classList.remove("submit-button--no-padding");
			supportButton.innerHTML = "<p>Submit</p>";
		},
		error => {
			// console.log("Support mail sending failed ...", error);
			alert("Service down, try again later");
		}
	);
};

const resetSupportForm = () => {
	supportForm.reset();
};
/**
 *
 * @param indexPassed this denotes the index of the booking stage that needs to be displayed
 * @function handleRenderedBookingStage : handles the booking Stage to be displayed based on the index parameter passed
 *
 */
const handleRenderedBookingStage = indexPassed => {
	const bookingStageContainer = document.querySelectorAll(".booking__form-each-stage");
	const progressElement = document.querySelector(".progress__element");
	const progress = [
		{ index: 0, value: 0 },
		{ index: 1, value: 0.25 },
		{ index: 2, value: 0.5 },
		{ index: 3, value: 0.75 },
		{ index: 4, value: 1.0 }
	];
	// console.log("index seen in handle rendered booking stage is : ", indexPassed);
	bookingStageContainer.forEach((eachBookingStage, index) => {
		eachBookingStage.classList.remove("display-none");

		if (index !== indexPassed) {
			return eachBookingStage.classList.add("display-none");
		} else {
			progress.forEach(progressField => {
				if (progressField.index == indexPassed) {
					progressElement.value = progressField.value;
				}
			});
			return eachBookingStage.classList.remove("display-none");
		}
	});
	const indexForConfirmationTabPage = 3;
	if (indexPassed === indexForConfirmationTabPage) {
		renderEstimate();
	}
};

const getEstimate = () => {
	let carDetailsUUID = "form_select_task";
	let usersDetailsUUID = "form_contact_details";
	let addressUUID = "form_address_id";
	let returnValue = {};
	formValuesCollection.map(eachFormValue => {
		const data = eachFormValue.data;
		if (eachFormValue.UUID === usersDetailsUUID) {
			return data.map(eachDataField => {
				const eachDataFieldValue = eachDataField.value;
				switch (eachDataField.name) {
					case "name":
						returnValue = updateReturnValue(returnValue, "name", eachDataFieldValue);

						// console.log("name seen : ", returnValue);

						break;

					case "tel":
						returnValue = updateReturnValue(
							returnValue,
							"mobileTel",
							eachDataFieldValue
						);

						// console.log("tel seen : ", returnValue);

						break;
					case "date":
						returnValue = updateReturnValue(
							returnValue,
							"dateBooked",
							eachDataFieldValue
						);

						// console.log("date seen : ", returnValue);

						break;
					case "email":
						returnValue = updateReturnValue(
							returnValue,
							"userEmail",
							eachDataFieldValue
						);

						// console.log("email : ", returnValue);
						break;
				}
			});
		} else if (eachFormValue.UUID == addressUUID) {
			data.map(eachDataField => {
				const eachDataFieldValue = eachDataField.value;
				switch (eachDataField.name) {
					case "user_address":
						returnValue = updateReturnValue(
							returnValue,
							"userAddress",
							eachDataFieldValue
						);

						// console.log("user address : ", returnValue);

						break;
				}
			});
		} else if (eachFormValue.UUID == carDetailsUUID) {
			// console.log("car details value is : ", data);
			data.map(eachDataField => {
				const eachDataFieldValue = eachDataField.value;
				switch (eachDataField.name) {
					case "car_make":
						// console.log("car  make seen : ", returnValue);
						returnValue = updateReturnValue(returnValue, "carMake", eachDataFieldValue);
						break;
					case "car_model":
						returnValue = updateReturnValue(
							returnValue,
							"carModel",
							eachDataFieldValue
						);

						// console.log("car model   : ", returnValue);

						break;

					case "car_year":
						returnValue = updateReturnValue(returnValue, "carYear", eachDataFieldValue);

						// console.log("car year : ", returnValue);

						break;
				}
			});
		}
	});
	// console.log("return value is : ", returnValue);
	return returnValue;
};
const updateReturnValue = (value, newObjectKey, newObjectValue) => {
	return { ...value, [newObjectKey]: newObjectValue };
};
const renderEstimate = () => {
	const confirmationSectionTabPage = document.querySelector(
		".confirmation__container__estimate-details"
	);
	confirmationSectionTabPage.innerHTML = "";
	let userDetailsAndDateBooked = getEstimate();
	// console.log("user details is : ", userDetailsAndDateBooked);
	const estimateParsed = `
        <h2>Booking Summary</h2>
        <div class="confirmation__section">
            <p>Name : ${userDetailsAndDateBooked.name}</p>
            <p>Mobile : ${userDetailsAndDateBooked.mobileTel}</p>
            <p>Date Booked : ${userDetailsAndDateBooked.dateBooked}</p>
        </div>
        <div class="confirmation__section">
            <p>Car Scan</p>
            <p> ${userDetailsAndDateBooked.carMake}</p>
            <p> ${userDetailsAndDateBooked.carModel}</p>
            <p> ${userDetailsAndDateBooked.carYear}</p>
        </div>
        <div class="confirmation__section">
            <p>Where you require the service?</p>
            <p> ${userDetailsAndDateBooked.userAddress}</p>
            <p>
                Note: Your correct locality helps our
                professionals reach you on time.
            </p>
        </div>
        <div class="confirmation__section">
            <a href="tel:+2348188354753"> Call us here for more details</a>
        </div>
    `;
	confirmationSectionTabPage.insertAdjacentHTML("afterbegin", estimateParsed);
};

let formValuesCollection = [];

/**
 *
 * @param {*} event
 * @param {*} elements
 * @param {*} index
 */
const handleFormSubmit = (event, elements, index) => {
	// console.log("elements on submit is  : ", elements);

	let removeButtonFromFormData = [...elements].filter(eachElement => {
		return eachElement.type != "submit";
	});

	let formJsonData = removeButtonFromFormData.map(eachElement => {
		return { name: eachElement.name, value: eachElement.value };
	});
	let formID = event.target.id;
	let formIDExist = false;
	formValuesCollection.forEach(eachFormCorrespondingValue => {
		if (eachFormCorrespondingValue.UUID === formID) {
			formIDExist = true;
		}
	});
	if (formIDExist) {
		formValuesCollection[index] = {
			UUID: formID,
			data: [...formJsonData],
			index: index
		};
	} else {
		formValuesCollection = [
			...formValuesCollection,
			{
				UUID: formID,
				data: [...formJsonData],
				index: index
			}
		];
	}
	// console.log("final form value collection is : ", formValuesCollection);
	handleRenderedBookingStage(index + 1);
};

const handleFormPrevious = (event, index) => {
	let formToDisplayCorrespondingIndex = index - 1;
	let formToDisplayAfterStageRendered = document.querySelectorAll(".booking__form_each-form")[
		formToDisplayCorrespondingIndex
	];
	let formToDisplayElements = formToDisplayAfterStageRendered.elements;
	let correspondingFormData = formValuesCollection[formToDisplayCorrespondingIndex];
	let correspondingFormDataFilteredIndex = correspondingFormData.data;
	[...formToDisplayElements].map(eachElement => {
		correspondingFormDataFilteredIndex.forEach(eachData => {
			if (eachElement.name === eachData.name) {
				eachElement.value = eachData.value;
			}
		});
	});
	// console.log("index reversed is : ", formToDisplayCorrespondingIndex);

	handleRenderedBookingStage(formToDisplayCorrespondingIndex);
};

let bookServiceButtonQuery = document.querySelectorAll(".book_service");
bookServiceButtonQuery.forEach(bookServiceButton => {
	bookServiceButton.addEventListener("click", () => {
		bookingPopUp();
	});
});

let closeBookId = document.getElementById("close_bookPopUp");
closeBookId.addEventListener("click", () => {
	closeBookingPopUp();
});

let bookingStageBackButtonCollection = document.querySelectorAll(".each-stage__button--back");
bookingStageBackButtonCollection.forEach((eachBackButton, index) => {
	eachBackButton.addEventListener("click", event => {
		handleFormPrevious(event, index);
	});
});

let bookingFormCollection = document.querySelectorAll(".booking__form_each-form");
bookingFormCollection.forEach((eachBookingForm, index) => {
	eachBookingForm.addEventListener("submit", event => {
		event.preventDefault();
		// console.log("Each booking form elements is : ", eachBookingForm.elements);
		handleFormSubmit(event, eachBookingForm.elements, index);
	});
});

let estimateButton = document.querySelector(".estimate-button");
estimateButton.addEventListener("click", () => {
	const mailerParam = getEstimate();
	sendBookingMail(mailerParam);
});

let supportForm = document.querySelector("#support_form");
supportForm.addEventListener("submit", event => {
	event.preventDefault();
	const userName = document.querySelector("#support_mail_userName").value;
	const userEmail = document.querySelector("#support_mail_userEmail").value;
	const userSupportText = document.querySelector("#support_mail_userSupportText").value;
	const templateParams = { userName, userEmail, userSupportText };
	sendSupportMail(templateParams);
});
