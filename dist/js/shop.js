parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"oZAK":[function(require,module,exports) {

},{}],"kpD3":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"kiUX":[function(require,module,exports) {
var process = require("process");
var r=require("process");function t(r,t){for(var e=0,n=r.length-1;n>=0;n--){var o=r[n];"."===o?r.splice(n,1):".."===o?(r.splice(n,1),e++):e&&(r.splice(n,1),e--)}if(t)for(;e--;e)r.unshift("..");return r}function e(r){"string"!=typeof r&&(r+="");var t,e=0,n=-1,o=!0;for(t=r.length-1;t>=0;--t)if(47===r.charCodeAt(t)){if(!o){e=t+1;break}}else-1===n&&(o=!1,n=t+1);return-1===n?"":r.slice(e,n)}function n(r,t){if(r.filter)return r.filter(t);for(var e=[],n=0;n<r.length;n++)t(r[n],n,r)&&e.push(r[n]);return e}exports.resolve=function(){for(var e="",o=!1,s=arguments.length-1;s>=-1&&!o;s--){var i=s>=0?arguments[s]:r.cwd();if("string"!=typeof i)throw new TypeError("Arguments to path.resolve must be strings");i&&(e=i+"/"+e,o="/"===i.charAt(0))}return(o?"/":"")+(e=t(n(e.split("/"),function(r){return!!r}),!o).join("/"))||"."},exports.normalize=function(r){var e=exports.isAbsolute(r),s="/"===o(r,-1);return(r=t(n(r.split("/"),function(r){return!!r}),!e).join("/"))||e||(r="."),r&&s&&(r+="/"),(e?"/":"")+r},exports.isAbsolute=function(r){return"/"===r.charAt(0)},exports.join=function(){var r=Array.prototype.slice.call(arguments,0);return exports.normalize(n(r,function(r,t){if("string"!=typeof r)throw new TypeError("Arguments to path.join must be strings");return r}).join("/"))},exports.relative=function(r,t){function e(r){for(var t=0;t<r.length&&""===r[t];t++);for(var e=r.length-1;e>=0&&""===r[e];e--);return t>e?[]:r.slice(t,e-t+1)}r=exports.resolve(r).substr(1),t=exports.resolve(t).substr(1);for(var n=e(r.split("/")),o=e(t.split("/")),s=Math.min(n.length,o.length),i=s,u=0;u<s;u++)if(n[u]!==o[u]){i=u;break}var f=[];for(u=i;u<n.length;u++)f.push("..");return(f=f.concat(o.slice(i))).join("/")},exports.sep="/",exports.delimiter=":",exports.dirname=function(r){if("string"!=typeof r&&(r+=""),0===r.length)return".";for(var t=r.charCodeAt(0),e=47===t,n=-1,o=!0,s=r.length-1;s>=1;--s)if(47===(t=r.charCodeAt(s))){if(!o){n=s;break}}else o=!1;return-1===n?e?"/":".":e&&1===n?"/":r.slice(0,n)},exports.basename=function(r,t){var n=e(r);return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},exports.extname=function(r){"string"!=typeof r&&(r+="");for(var t=-1,e=0,n=-1,o=!0,s=0,i=r.length-1;i>=0;--i){var u=r.charCodeAt(i);if(47!==u)-1===n&&(o=!1,n=i+1),46===u?-1===t?t=i:1!==s&&(s=1):-1!==t&&(s=-1);else if(!o){e=i+1;break}}return-1===t||-1===n||0===s||1===s&&t===n-1&&t===e+1?"":r.slice(t,n)};var o="b"==="ab".substr(-1)?function(r,t,e){return r.substr(t,e)}:function(r,t,e){return t<0&&(t=r.length+t),r.substr(t,e)};
},{"process":"kpD3"}],"Ig2k":[function(require,module,exports) {
var process = require("process");
var e=require("process"),n=require("fs"),r=require("path");function t(e){console.log("[dotenv][DEBUG] ".concat(e))}var o="\n",a=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,c=/\\n/g,i=/\n|\r|\r\n/;function l(e,n){var r=Boolean(n&&n.debug),l={};return e.toString().split(i).forEach(function(e,n){var i=e.match(a);if(null!=i){var s=i[1],u=i[2]||"",d=u.length-1,p='"'===u[0]&&'"'===u[d];"'"===u[0]&&"'"===u[d]||p?(u=u.substring(1,d),p&&(u=u.replace(c,o))):u=u.trim(),l[s]=u}else r&&t("did not match key and value when parsing line ".concat(n+1,": ").concat(e))}),l}function s(o){var a=r.resolve(e.cwd(),".env"),c="utf8",i=!1;o&&(null!=o.path&&(a=o.path),null!=o.encoding&&(c=o.encoding),null!=o.debug&&(i=!0));try{var s=l(n.readFileSync(a,{encoding:c}),{debug:i});return Object.keys(s).forEach(function(n){Object.prototype.hasOwnProperty.call(e.env,n)?i&&t('"'.concat(n,'" is already defined in `process.env` and will not be overwritten')):e.env[n]=s[n]}),{parsed:s}}catch(u){return{error:u}}}module.exports.config=s,module.exports.parse=l;
},{"fs":"oZAK","path":"kiUX","process":"kpD3"}],"rwXN":[function(require,module,exports) {
require("dotenv").config({encoding:"utf8"});var e=document.querySelector(".category-all__item-collection"),a=function(a){var c='<div class="category-all__each-item category-all__each-item--hover">\n            <div class="category-all__each-item-image-div">\n                <img src = "'.concat(a.shop_item_image,'" class ="category-all__each-item-image" />\n            </div>\n            <div class="category-all__each-item-text-container">\n                <h3 class="category-all__each-item-text">').concat(a.shop_item_name,'</h3>\n                <h5 class="category-all__each-item-text">').concat(a.shop_item_descrpt,'</h5>\n                <label for="" class="category-all__each-label">').concat(a.shop_item_price,'</label>\n                <p class = "category-all__each-item-text"> Sold By : ').concat(a.shop_item_seller,' </p>\n            </div>\n            <div class ="send-message">\n                <button class = "message-button"> Order <i class="fa fa-cart-arrow-down"></i> </button>\n            </div>\n        </div>');e.innerHTML+=c},c=function(e){var a=document.querySelector(".main__category");e?a.style.display="flex":(a.classList.add("slideback"),setTimeout(function(){a.style.display="none",a.classList.remove("slideback")},200))};window.addEventListener("DOMContentLoaded",function(e){e.preventDefault();firebase.initializeApp({apiKey:"AIzaSyBwriMZap33ujMIzx7Ck4EPi5sOrzbGyb0",authDomain:"mechanics-b3612.firebaseapp.com",databaseURL:"https://mechanics-b3612.firebaseio.com",projectId:"mechanics-b3612",storageBucket:"mechanics-b3612.appspot.com",messagingSenderId:"98302440694",appId:"1:98302440694:web:83d23a56461bc6593568d7"}),firebase.database().ref("Shop Collection").on("value",function(e){e.forEach(function(e){a(e.val())})}),"serviceWorker"in navigator?(navigator.serviceWorker.register("/sw.js"),console.log("service workwer enabled")):console.log("service worker not compatible"),document.querySelector(".main__link-navigator-trigger").addEventListener("click",function(){c(!0)}),document.querySelector(".main__link-navigator-trigger-close").addEventListener("click",function(){c(!1)})});
},{"dotenv":"Ig2k","./../sw.js":[["../sw.js","NqYy"],"../sw.js.map","NqYy"]}]},{},["rwXN"], null)
//# sourceMappingURL=/js/shop.js.map