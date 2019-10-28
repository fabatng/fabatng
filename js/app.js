let navBarElement = document.querySelector(".navbar");
let navBarSpan = document.querySelectorAll(".nav-link-span");

/**
 * To animate the div section on appearing on the vieport
 */
// eslint-disable-next-line no-unused-vars
const animateOnViewPort = () => {
    let mainSection = document.querySelectorAll(".main__section");
    mainSection.forEach((item) => {
        /**
         * scroll reveal function imported from the script requested in the head tag
         */
        // eslint-disable-next-line no-undef
        ScrollReveal({
            duration: 1000
        }).reveal(item, {
            delay: 300
        });
    });
}
/**
 * Slider effect for the testimonial
 */
let testimonialId;
let triggerSliderButton = document.querySelectorAll(".slider-trigger-button");
const automaticSLider = (counter) => {
    console.log(counter)
    let testimonialElements = document.querySelectorAll(".slider__testimonial");

    testimonialElements.forEach(item => {
        item.style.display = "none";
    });
    triggerSliderButton.forEach(item => {
        item.style.backgroundColor = "rgb(42, 14, 2)";
    })
    testimonialElements[counter].style.display = "flex";
    triggerSliderButton[counter].style.backgroundColor = "#ffffff";
    console.log("current dispaly : ", testimonialElements[counter].style.display);
    counter = (counter <= 1) ? counter + 1 : 0;
    testimonialId = setTimeout(() => {
        automaticSLider(counter);
    }, 3000);

}

// eslint-disable-next-line no-unused-vars
function slideFirst() {
    console.log("testimonial id : ", testimonialId);
    clearInterval(testimonialId);

    console.log("slider first seen here");
    console.log("testimonial id : ", testimonialId);
    automaticSLider(0);
}

// eslint-disable-next-line no-unused-vars
function slideSecond() {
    clearInterval(testimonialId);
    automaticSLider(1);
    console.log("Slider second seen here");
}

// eslint-disable-next-line no-unused-vars
function slideThird() {
    clearInterval(testimonialId);
    automaticSLider(2);
    console.log("Slider second third here");
}


window.addEventListener("scroll", () => {
    if (window.pageYOffset > navBarElement.offsetTop) {
        navBarElement.classList.add("navbar--sticky");
        navBarSpan.forEach((item) => {
            item.classList.add("nav-link-span--backgroundColor");
        })
        document.querySelector(".header").style.paddingTop = "0px";
    } else {
        navBarElement.classList.remove("navbar--sticky");
        navBarSpan.forEach((item) => {
            item.classList.remove("nav-link-span--backgroundColor");
        })
        document.querySelector(".header").style.paddingTop = "40px";
        // console.log("no hello")
    }
});
window.addEventListener("load", () => {
    // animateOnViewPort();
    automaticSLider(0);
    let navLinkDropDownTrigger = document.getElementById("nav_link_trigger");
    let dropDownStatus = false;
    navLinkDropDownTrigger.addEventListener("click", () => {
        if (dropDownStatus == false) {
            document.querySelector(".nav-links").classList.add("link-animate");
            document.querySelector(".nav-links").style.display = "flex";
            console.log("should effect");
        } else {
            document.querySelector(".nav-links").classList.remove("link-animate");
            document.querySelector(".nav-links").classList.add("link-animate-close");

            setTimeout(() => {
                document.querySelector(".nav-links").classList.remove("link-animate-close");
                document.querySelector(".nav-links").style.display = "none";

            }, 900);

        }
        dropDownStatus = !dropDownStatus;
    });
    /**
     * This is to concatenate string with the 'slide' word in order to reference the funtions with the string name
     */
    let wordAssignValue = {
        0: "First",
        1: "Second",
        2: "Third"
    }
    let testimonialTriggers = document.querySelectorAll(".slider-trigger-button");
    for (let triggerCounter = 0; triggerCounter < testimonialTriggers.length; triggerCounter++) {

        testimonialTriggers[triggerCounter].addEventListener("click", () => {
            let callFunc = `slide` + wordAssignValue[triggerCounter];
            // `${callFunc= `slide`+wordAssignValue[triggerCounter]}`;
            let finalCalling = window[callFunc];
            finalCalling();

        })
    }
});