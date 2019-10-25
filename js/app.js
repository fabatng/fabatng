let navBarElement = document.querySelector(".navbar");
let navBarSpan = document.querySelectorAll(".nav-link-span");
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
})