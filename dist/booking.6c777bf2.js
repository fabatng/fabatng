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
})({"js/booking.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bookingPopUp = function bookingPopUp() {
  var bookingContainer = document.querySelector(".booking");
  var bookingStageBackButtonCollection = document.querySelector(".each-stage__button--back");
  var elementToFixPositionOnPopUp = document.querySelectorAll(".fix-on-booking-pop-up");
  elementToFixPositionOnPopUp.forEach(function (elementToFix) {
    elementToFix.style.position = "fixed";
  });
  bookingStageBackButtonCollection.classList.add("display-none");
  handleRenderedBookingStage(0);
  bookingContainer.classList.remove("display-none");
  bookingContainer.classList.add("display-flex");
};

var closeBookingPopUp = function closeBookingPopUp() {
  var bookingContainer = document.querySelector(".booking");
  bookingContainer.classList.remove("display-flex");
  bookingContainer.classList.add("display-none");
  var elementToFixPositionOnPopUp = document.querySelectorAll(".fix-on-booking-pop-up");
  elementToFixPositionOnPopUp.forEach(function (elementToFix) {
    elementToFix.style.position = "static";
  });
};
/**
 *
 * @param indexPassed this denotes the index of the booking stage that needs to be displayed
 * @function handleRenderedBookingStage : handles the booking Stage to be displayed based on the index parameter passed
 *
 */


var handleRenderedBookingStage = function handleRenderedBookingStage(indexPassed) {
  var bookingStageContainer = document.querySelectorAll(".booking__form-each-stage");
  var progressElement = document.querySelector(".progress__element");
  var progress = [{
    index: 0,
    value: 0
  }, {
    index: 1,
    value: 0.25
  }, {
    index: 2,
    value: 0.5
  }, {
    index: 3,
    value: 0.75
  }, {
    index: 4,
    value: 1.0
  }];
  console.log("index seen in handle rendered booking stage is : ", indexPassed);
  bookingStageContainer.forEach(function (eachBookingStage, index) {
    eachBookingStage.classList.remove("display-none");

    if (index !== indexPassed) {
      return eachBookingStage.classList.add("display-none");
    } else {
      progress.forEach(function (progressField) {
        if (progressField.index == indexPassed) {
          progressElement.value = progressField.value;
        }
      });
      return eachBookingStage.classList.remove("display-none");
    }
  });
  var indexForConfirmationTabPage = 3;

  if (indexPassed === indexForConfirmationTabPage) {
    renderEstimate();
  }
};

var getEstimate = function getEstimate() {
  var carDetailsUUID = "form_select_task";
  var usersDetailsUUID = "form_contact_details";
  var addressUUID = "form_address_id";
  var returnValue = {};
  formValuesCollection.map(function (eachFormValue) {
    var data = eachFormValue.data;

    if (eachFormValue.UUID === usersDetailsUUID) {
      return data.map(function (eachDataField) {
        var eachDataFieldValue = eachDataField.value;

        switch (eachDataField.name) {
          case "name":
            returnValue = _objectSpread({}, returnValue, {
              name: eachDataFieldValue
            });
            console.log("name seen : ", returnValue);
            break;

          case "tel":
            returnValue = _objectSpread({}, returnValue, {
              mobileTel: eachDataFieldValue
            });
            console.log("tel seen : ", returnValue);
            break;

          case "date":
            returnValue = _objectSpread({}, returnValue, {
              dateBooked: eachDataFieldValue
            });
            console.log("date seen : ", returnValue);
            break;
        }
      });
    } else if (eachFormValue.UUID == addressUUID) {
      data.map(function (eachDataField) {
        var eachDataFieldValue = eachDataField.value;

        switch (eachDataField.name) {
          case "user_address":
            returnValue = _objectSpread({}, returnValue, {
              userAddress: eachDataFieldValue
            });
            console.log("user address : ", returnValue);
            break;
        }
      });
    } else if (eachFormValue.UUID == carDetailsUUID) {
      console.log("car details value is : ", data);
      data.map(function (eachDataField) {
        var eachDataFieldValue = eachDataField.value;

        switch (eachDataField.name) {
          case "car_make":
            returnValue = _objectSpread({}, returnValue, {
              carMake: eachDataFieldValue
            });
            console.log("car  make seen : ", returnValue);
            break;

          case "car_model":
            returnValue = _objectSpread({}, returnValue, {
              carModel: eachDataFieldValue
            });
            console.log("car model   : ", returnValue);
            break;

          case "car_year":
            returnValue = _objectSpread({}, returnValue, {
              carYear: eachDataFieldValue
            });
            console.log("car year : ", returnValue);
            break;
        }
      });
    }
  });
  console.log("return value is : ", returnValue);
  return returnValue;
};

var renderEstimate = function renderEstimate() {
  var confirmationSectionTabPage = document.querySelector(".confirmation__container");
  var userDetailsAndDateBooked = getEstimate();
  console.log("user details is : ", userDetailsAndDateBooked);
  var estimateParsed = "\n        <h2>Booking Summary</h2>\n        <div class=\"confirmation__section\">\n            <p>Name : ".concat(userDetailsAndDateBooked.name, "</p>\n            <p>Mobile : ").concat(userDetailsAndDateBooked.mobileTel, "</p>\n            <p>Date Booked : ").concat(userDetailsAndDateBooked.dateBooked, "</p>\n        </div>\n        <div class=\"confrimation-section\">\n            <p>Car Scan</p>\n            <p> ").concat(userDetailsAndDateBooked.carMake, "</p>\n            <p> ").concat(userDetailsAndDateBooked.carModel, "</p>\n            <p> ").concat(userDetailsAndDateBooked.carYear, "</p>\n        </div>\n        <div class=\"confirmation-section\">\n            <p>Where you require the service?</p>\n            <p> ").concat(userDetailsAndDateBooked.userAddress, "</p>\n            <p>\n                Note: Your correct locality helps our\n                professionals reach you on time.\n            </p>\n        </div>\n        <div class=\"confirmation-section\">\n            <a href=\"tel:+2348188354753\"></a>\n        </div>\n        <div class=\"each__stage__action-button\">\n            <button type=\"button\" class=\"each-stage__button each-stage__button--back\">Back</button>\n            <button class=\"each-stage__button\" type=\"button\">\n                Get Estimate\n            </button>\n        </div>\n    ");
  confirmationSectionTabPage.innerHTML = estimateParsed;
};

var formValuesCollection = [];
/**
 *
 * @param {*} event
 * @param {*} elements
 * @param {*} index
 */

var handleFormSubmit = function handleFormSubmit(event, elements, index) {
  console.log("elements on submit is  : ", elements);

  var removeButtonFromFormData = _toConsumableArray(elements).filter(function (eachElement) {
    return eachElement.type != "submit";
  });

  var formJsonData = removeButtonFromFormData.map(function (eachElement) {
    return {
      name: eachElement.name,
      value: eachElement.value
    };
  });
  var formID = event.target.id;
  var formIDExist = false;
  formValuesCollection.forEach(function (eachFormCorrespondingValue) {
    if (eachFormCorrespondingValue.UUID === formID) {
      formIDExist = true;
    }
  });

  if (formIDExist) {
    formValuesCollection[index] = {
      UUID: formID,
      data: _toConsumableArray(formJsonData),
      index: index
    };
  } else {
    formValuesCollection = [].concat(_toConsumableArray(formValuesCollection), [{
      UUID: formID,
      data: _toConsumableArray(formJsonData),
      index: index
    }]);
  }

  console.log("final form value collection is : ", formValuesCollection);
  handleRenderedBookingStage(index + 1);
};

var handleFormPrevious = function handleFormPrevious(event, index) {
  var formToDisplayCorrespondingIndex = index - 1;
  var formToDisplayAfterStageRendered = document.querySelectorAll(".booking__form_each-form")[formToDisplayCorrespondingIndex];
  var formToDisplayElements = formToDisplayAfterStageRendered.elements;
  var correspondingFormData = formValuesCollection[formToDisplayCorrespondingIndex];
  var correspondingFormDataFilteredIndex = correspondingFormData.data;

  _toConsumableArray(formToDisplayElements).map(function (eachElement) {
    correspondingFormDataFilteredIndex.forEach(function (eachData) {
      if (eachElement.name === eachData.name) {
        eachElement.value = eachData.value;
      }
    });
  });

  console.log("index reversed is : ", formToDisplayCorrespondingIndex);
  handleRenderedBookingStage(formToDisplayCorrespondingIndex);
};

var bookId = document.getElementById("book_service");
bookId.addEventListener("click", function () {
  bookingPopUp();
});
var closeBookId = document.getElementById("close_bookPopUp");
closeBookId.addEventListener("click", function () {
  closeBookingPopUp();
});
var bookingStageBackButtonCollection = document.querySelectorAll(".each-stage__button--back");
bookingStageBackButtonCollection.forEach(function (eachBackButton, index) {
  eachBackButton.addEventListener("click", function (event) {
    handleFormPrevious(event, index);
  });
});
var bookingFormCollection = document.querySelectorAll(".booking__form_each-form");
bookingFormCollection.forEach(function (eachBookingForm, index) {
  eachBookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleFormSubmit(event, eachBookingForm.elements, index);
  });
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46695" + '/');

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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/booking.js"], null)
//# sourceMappingURL=/booking.6c777bf2.js.map