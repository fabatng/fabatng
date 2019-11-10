const cacheName = "mechanics-shop";

self.addEventListener("install", (event) => {
    var firebaseConfig = {
        apiKey: "AIzaSyBwriMZap33ujMIzx7Ck4EPi5sOrzbGyb0",
        authDomain: "mechanics-b3612.firebaseapp.com",
        databaseURL: "https://mechanics-b3612.firebaseio.com",
        projectId: "mechanics-b3612",
        storageBucket: "mechanics-b3612.appspot.com",
        messagingSenderId: "98302440694",
        appId: "1:98302440694:web:83d23a56461bc6593568d7"
    };
    // Initialize Firebase

    // eslint-disable-next-line no-undef
    firebase.initializeApp(firebaseConfig);
    /**
     * referencig database
     */
    const categoryList = [];
    firebase.database().ref('Shop Collection').on('value', (snapshot) => {
        snapshot.forEach((item) => {
            categoryList.append(item.val());
        })
    });
});