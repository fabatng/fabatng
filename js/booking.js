const bookingPopUp = () => {
    let bookingContainer = document.querySelector(".booking");
    let bookingStageBackButtonCollection = document.querySelector(
        ".each-stage__button--back"
    );
    const elementToFixPositionOnPopUp = document.querySelectorAll(
        ".fix-on-booking-pop-up"
    );
    elementToFixPositionOnPopUp.forEach(elementToFix => {
        elementToFix.style.position = "fixed";
    });
    bookingStageBackButtonCollection.classList.add("display-none");
    handleRenderedBookingStage(0);
    bookingContainer.classList.remove("display-none");

    bookingContainer.classList.add("display-flex");
};

const closeBookingPopUp = () => {
    let bookingContainer = document.querySelector(".booking");
    bookingContainer.classList.remove("display-flex");

    bookingContainer.classList.add("display-none");
    const elementToFixPositionOnPopUp = document.querySelectorAll(
        ".fix-on-booking-pop-up"
    );
    elementToFixPositionOnPopUp.forEach(elementToFix => {
        elementToFix.style.position = "static";
    });
};

/**
 *
 * @param indexPassed this denotes the index of the booking stage that needs to be displayed
 * @function handleRenderedBookingStage : handles the booking Stage to be displayed based on the index parameter passed
 *
 */
const handleRenderedBookingStage = indexPassed => {
    const bookingStageContainer = document.querySelectorAll(
        ".booking__form-each-stage"
    );
    const progressElement = document.querySelector(".progress__element");
    const progress = [
        { index: 0, value: 0 },
        { index: 1, value: 0.25 },
        { index: 2, value: 0.5 },
        { index: 3, value: 0.75 },
        { index: 4, value: 1.0 }
    ];
    console.log(
        "index seen in handle rendered booking stage is : ",
        indexPassed
    );
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
                        returnValue = {
                            ...returnValue,
                            name: eachDataFieldValue
                        };
                        console.log("name seen : ", returnValue);

                        break;

                    case "tel":
                        returnValue = {
                            ...returnValue,
                            mobileTel: eachDataFieldValue
                        };
                        console.log("tel seen : ", returnValue);

                        break;
                    case "date":
                        returnValue = {
                            ...returnValue,
                            dateBooked: eachDataFieldValue
                        };
                        console.log("date seen : ", returnValue);

                        break;
                }
            });
        } else if (eachFormValue.UUID == addressUUID) {
            data.map(eachDataField => {
                const eachDataFieldValue = eachDataField.value;
                switch (eachDataField.name) {
                    case "user_address":
                        returnValue = {
                            ...returnValue,
                            userAddress: eachDataFieldValue
                        };
                        console.log("user address : ", returnValue);

                        break;
                }
            });
        } else if (eachFormValue.UUID == carDetailsUUID) {
            console.log("car details value is : ", data);
            data.map(eachDataField => {
                const eachDataFieldValue = eachDataField.value;
                switch (eachDataField.name) {
                    case "car_make":
                        returnValue = {
                            ...returnValue,
                            carMake: eachDataFieldValue
                        };
                        console.log("car  make seen : ", returnValue);
                        break;
                    case "car_model":
                        returnValue = {
                            ...returnValue,
                            carModel: eachDataFieldValue
                        };
                        console.log("car model   : ", returnValue);

                        break;

                    case "car_year":
                        returnValue = {
                            ...returnValue,
                            carYear: eachDataFieldValue
                        };
                        console.log("car year : ", returnValue);

                        break;
                }
            });
        }
    });
    console.log("return value is : ", returnValue);
    return returnValue;
};

const renderEstimate = () => {
    const confirmationSectionTabPage = document.querySelector(
        ".confirmation__container"
    );
    let userDetailsAndDateBooked = getEstimate();
    console.log("user details is : ", userDetailsAndDateBooked);
    const estimateParsed = `
        <h2>Booking Summary</h2>
        <div class="confirmation__section">
            <p>Name : ${userDetailsAndDateBooked.name}</p>
            <p>Mobile : ${userDetailsAndDateBooked.mobileTel}</p>
            <p>Date Booked : ${userDetailsAndDateBooked.dateBooked}</p>
        </div>
        <div class="confrimation-section">
            <p>Car Scan</p>
            <p> ${userDetailsAndDateBooked.carMake}</p>
            <p> ${userDetailsAndDateBooked.carModel}</p>
            <p> ${userDetailsAndDateBooked.carYear}</p>
        </div>
        <div class="confirmation-section">
            <p>Where you require the service?</p>
            <p> ${userDetailsAndDateBooked.userAddress}</p>
            <p>
                Note: Your correct locality helps our
                professionals reach you on time.
            </p>
        </div>
        <div class="confirmation-section">
            <a href="tel:+2348188354753"></a>
        </div>
        <div class="each__stage__action-button">
            <button type="button" class="each-stage__button each-stage__button--back">Back</button>
            <button class="each-stage__button" type="button">
                Get Estimate
            </button>
        </div>
    `;
    confirmationSectionTabPage.innerHTML = estimateParsed;
};

let formValuesCollection = [];

/**
 *
 * @param {*} event
 * @param {*} elements
 * @param {*} index
 */
const handleFormSubmit = (event, elements, index) => {
    console.log("elements on submit is  : ", elements);

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
    console.log("final form value collection is : ", formValuesCollection);
    handleRenderedBookingStage(index + 1);
};

const handleFormPrevious = (event, index) => {
    let formToDisplayCorrespondingIndex = index - 1;
    let formToDisplayAfterStageRendered = document.querySelectorAll(
        ".booking__form_each-form"
    )[formToDisplayCorrespondingIndex];
    let formToDisplayElements = formToDisplayAfterStageRendered.elements;
    let correspondingFormData =
        formValuesCollection[formToDisplayCorrespondingIndex];
    let correspondingFormDataFilteredIndex = correspondingFormData.data;
    [...formToDisplayElements].map(eachElement => {
        correspondingFormDataFilteredIndex.forEach(eachData => {
            if (eachElement.name === eachData.name) {
                eachElement.value = eachData.value;
            }
        });
    });
    console.log("index reversed is : ", formToDisplayCorrespondingIndex);

    handleRenderedBookingStage(formToDisplayCorrespondingIndex);
};

let bookId = document.getElementById("book_service");
bookId.addEventListener("click", () => {
    bookingPopUp();
});

let closeBookId = document.getElementById("close_bookPopUp");
closeBookId.addEventListener("click", () => {
    closeBookingPopUp();
});

let bookingStageBackButtonCollection = document.querySelectorAll(
    ".each-stage__button--back"
);
bookingStageBackButtonCollection.forEach((eachBackButton, index) => {
    eachBackButton.addEventListener("click", event => {
        handleFormPrevious(event, index);
    });
});

let bookingFormCollection = document.querySelectorAll(
    ".booking__form_each-form"
);
bookingFormCollection.forEach((eachBookingForm, index) => {
    eachBookingForm.addEventListener("submit", event => {
        event.preventDefault();
        handleFormSubmit(event, eachBookingForm.elements, index);
    });
});