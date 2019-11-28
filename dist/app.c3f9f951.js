// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/app.js":[function(require,module,exports) {
var navBarElement = document.querySelector(".navbar");
var navBarSpan = document.querySelectorAll(".nav-link-span");
/**
 * To animate the div section on appearing on the vieport
 */
// eslint-disable-next-line no-unused-vars

var animateOnViewPort = function animateOnViewPort() {
  var mainSection = document.querySelectorAll(".main__section");
  mainSection.forEach(function (item) {
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
};
/**
 * Slider effect for the testimonial
 */


var testimonialId;
var triggerSliderButton = document.querySelectorAll(".slider-trigger-button");

var automaticSLider = function automaticSLider(counter) {
  // console.log(counter)
  var testimonialElements = document.querySelectorAll(".slider__testimonial");
  testimonialElements.forEach(function (item) {
    item.style.display = "none";
  });
  triggerSliderButton.forEach(function (item) {
    item.style.backgroundColor = "rgb(42, 14, 2)";
  });
  testimonialElements[counter].style.display = "flex";
  triggerSliderButton[counter].style.backgroundColor = "#ffffff";
  counter = counter <= 1 ? counter + 1 : 0;
  testimonialId = setTimeout(function () {
    automaticSLider(counter);
  }, 3500);
};
/**
 * screen button clicked effect
 */


var screenButtonEffects = function screenButtonEffects() {
  var screensButton = document.querySelectorAll(".rounded__anchor-screens");
  var sliderScreenImageCollection = document.querySelectorAll(".slider__screen-image");

  var _loop = function _loop(screenButtonItem) {
    var _loop2 = function _loop2(sliderScreenImageElement) {
      if (screenButtonItem == sliderScreenImageElement) {
        screensButton[screenButtonItem].addEventListener("click", function () {
          screensButton.forEach(function (item) {
            item.classList.remove("active-anchor");
          });
          sliderScreenImageCollection.forEach(function (item) {
            item.style.display = "none";
          });
          screensButton[screenButtonItem].classList.add("active-anchor");
          sliderScreenImageCollection[sliderScreenImageElement].style.display = "flex";
        });
      }
    };

    for (var sliderScreenImageElement = 0; sliderScreenImageElement < sliderScreenImageCollection.length; sliderScreenImageElement++) {
      _loop2(sliderScreenImageElement);
    }
  };

  for (var screenButtonItem = 0; screenButtonItem < screensButton.length; screenButtonItem++) {
    _loop(screenButtonItem);
  }
}; // eslint-disable-next-line no-unused-vars


function slide(index) {
  console.log("testimonial id : ", testimonialId);
  clearInterval(testimonialId);
  automaticSLider(index);
}
/**
 * Screen slider
 */


var firstSlideScreenButtonLeft = document.querySelector("#screenButtonLeft");
var firstSlideScreenButtonRight = document.querySelector("#screenButtonRight");
var secondSlideScreenButtonLeft = document.querySelector("#secondScreenButtonLeft");
var secondSlideScreenButtonRight = document.querySelector("#secondScreenButtonRight");
var counter = 0;
var secondCounter = 0;

var screenSlider = function screenSlider(determineCounter, index, elementCollection) {
  for (var elementCounter = 0; elementCounter < elementCollection.length; elementCounter++) {
    elementCollection[elementCounter].style.display = "none";
  }

  console.log("index : ", index);

  if (index >= 0 && index < 2) {
    elementCollection[index].style.display = "flex";

    if (determineCounter == "counter") {
      counter++;
    } else {
      secondCounter++;
    }
  } else {
    index = index % 2 == 0 ? 0 : 1;
    console.log("Index else block : ", index);
    elementCollection[index].style.display = "flex";

    if (determineCounter == "counter") {
      counter = counter % 2 == 0 ? 0 : 1;
      counter++;
    } else {
      secondCounter = secondCounter % 2 == 0 ? 0 : 1;
      secondCounter++;
    }
  }
};

firstSlideScreenButtonLeft.addEventListener("click", function () {
  var elementCollection = document.querySelectorAll(".slider__slider-item--screens--first-section");
  screenSlider("counter", counter - 1, elementCollection);
});
firstSlideScreenButtonRight.addEventListener("click", function () {
  var elementCollection = document.querySelectorAll(".slider__slider-item--screens--first-section");
  screenSlider("counter", counter + 1, elementCollection);
});
secondSlideScreenButtonLeft.addEventListener("click", function () {
  var elementCollection = document.querySelectorAll(".slider__slider-item--screens--second-section");
  screenSlider("secondCounter", secondCounter - 1, elementCollection);
});
secondSlideScreenButtonRight.addEventListener("click", function () {
  var elementCollection = document.querySelectorAll(".slider__slider-item--screens--second-section");
  screenSlider("secondCounter", secondCounter + 1, elementCollection);
});
window.addEventListener("scroll", function () {
  if (window.pageYOffset > navBarElement.offsetTop) {
    navBarElement.classList.add("navbar--sticky");
    navBarSpan.forEach(function (item) {
      item.classList.add("nav-link-span--backgroundColor");
    });
    document.querySelector(".header").style.paddingTop = "0px";
  } else {
    navBarElement.classList.remove("navbar--sticky");
    navBarSpan.forEach(function (item) {
      item.classList.remove("nav-link-span--backgroundColor");
    });
    document.querySelector(".header").style.paddingTop = "40px"; // console.log("no hello")
  }
});
window.addEventListener("load", function () {
  animateOnViewPort();
  automaticSLider(0);
  screenButtonEffects();
  var navLinkDropDownTrigger = document.getElementById("nav_link_trigger");
  var navLinkContainer = document.querySelector(".nav-links");
  var navLinkELement = document.querySelectorAll(".nav-links .nav-links__div");
  var dropDownStatus = false;
  navLinkDropDownTrigger.addEventListener("click", function () {
    if (dropDownStatus == false) {
      navLinkContainer.classList.add("link-animate");
      navLinkContainer.style.display = "flex";
      console.log("should effect");
    } else {
      navLinkContainer.classList.remove("link-animate");
      navLinkContainer.classList.add("link-animate-close");
      setTimeout(function () {
        navLinkContainer.classList.remove("link-animate-close");
        navLinkContainer.style.display = "none";
      }, 900);
    }

    dropDownStatus = !dropDownStatus;
    /**
     * to close the nav container whenever on of the links is clicked for mobile view
     */

    navLinkELement.forEach(function (item) {
      item.addEventListener("click", function (event) {
        dropDownStatus = false;
        navLinkContainer.style.display = "none";
      });
    });
  });
  /**
   * this stores the slidder button for the testimonials
   */

  var testimonialTriggers = document.querySelectorAll(".slider-trigger-button");
  /**
   * to add event listener to each button
   */

  var _loop3 = function _loop3(triggerCounter) {
    testimonialTriggers[triggerCounter].addEventListener("click", function () {
      slide(triggerCounter);
    });
  };

  for (var triggerCounter = 0; triggerCounter < testimonialTriggers.length; triggerCounter++) {
    _loop3(triggerCounter);
  }
});
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45769" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map