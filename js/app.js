let navBarElement = document.querySelector(".navbar");
let navBarSpan = document.querySelectorAll(".nav-link-span");

const addFlexWrap = () => {
    let mainSection = document.querySelectorAll(".main__section");
    mainSection.forEach((item) => {
        ScrollReveal({
            duration: 1000
        }).reveal(item, {
            delay: 300
        });
    });
    console.log("should animate");
}
window.addEventListener("scroll", () => {
    let navBarElementOffset = navBarElement.offsetTop;
    if (window.pageYOffset > navBarElement.offsetTop) {
        navBarElement.classList.add("navbar--sticky");
        navBarSpan.forEach((item) => {
            item.classList.add("nav-link-span--backgroundColor");
        })
        document.querySelector(".header").style.paddingTop = "0px";
        // console.log("Hello")
    } else {
        navBarElement.classList.remove("navbar--sticky");
        navBarSpan.forEach((item) => {
            item.classList.remove("nav-link-span--backgroundColor");
        })
        document.querySelector(".header").style.paddingTop = "40px";
        // console.log("no hello")
    }
    // addFlexWrap();
    // animateMainSection();
});
window.addEventListener("load", () => {
    // animateMainSection();
    addFlexWrap();
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
});