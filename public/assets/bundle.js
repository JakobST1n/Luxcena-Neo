/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@material/base/component.js":
/*!****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/base/component.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/base/foundation.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template F
 */

class MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new _foundation__WEBPACK_IMPORTED_MODULE_0__["default"]());
  }
  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    /** @protected {!F} */

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize()
  /* ...args */
  {} // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.

  /**
   * @return {!F} foundation
   */


  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  }

  initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }
  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }
  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  emit(evtType, evtData, shouldBubble = false) {
    let evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCComponent);

/***/ }),

/***/ "../../node_modules/@material/base/foundation.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/base/foundation.js ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template A
 */
class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }
  /** @return enum{strings} */


  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }
  /** @return enum{numbers} */


  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }
  /** @return {!Object} */


  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }
  /**
   * @param {A=} adapter
   */


  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCFoundation);

/***/ }),

/***/ "../../node_modules/@material/base/index.js":
/*!************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/base/index.js ***!
  \************************************************************************************************************/
/*! exports provided: MDCFoundation, MDCComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/base/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "../../node_modules/@material/base/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCComponent", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




/***/ }),

/***/ "../../node_modules/@material/dom/ponyfill.js":
/*!**************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/dom/ponyfill.js ***!
  \**************************************************************************************************************/
/*! exports provided: closest, matches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return closest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */

/**
 * @param {!Element} element
 * @param {string} selector
 * @return {?Element}
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  let el = element;

  while (el) {
    if (matches(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}
/**
 * @param {!Element} element
 * @param {string} selector
 * @return {boolean}
 */


function matches(element, selector) {
  const nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}



/***/ }),

/***/ "../../node_modules/@material/drawer/adapter.js":
/*!****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/drawer/adapter.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Drawer
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Drawer into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCDrawerAdapter {
  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  addClass(className) {}
  /**
   * Removes a class from the root Element.
   * @param {string} className
   */


  removeClass(className) {}
  /**
   * Returns true if the root Element contains the given class.
   * @param {string} className
   * @return {boolean}
   */


  hasClass(className) {}
  /**
   * @param {!Element} element target element to verify class name
   * @param {string} className class name
   */


  elementHasClass(element, className) {}
  /**
   * Saves the focus of currently active element.
   */


  saveFocus() {}
  /**
   * Restores focus to element previously saved with 'saveFocus'.
   */


  restoreFocus() {}
  /**
   * Focuses the active / selected navigation item.
   */


  focusActiveNavigationItem() {}
  /**
   * Emits a custom event "MDCDrawer:closed" denoting the drawer has closed.
   */


  notifyClose() {}
  /**
   * Emits a custom event "MDCDrawer:opened" denoting the drawer has opened.
   */


  notifyOpen() {}
  /**
   * Traps focus on root element and focuses the active navigation element.
   */


  trapFocus() {}
  /**
   * Releases focus trap from root element which was set by `trapFocus`
   * and restores focus to where it was prior to calling `trapFocus`.
   */


  releaseFocus() {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCDrawerAdapter);

/***/ }),

/***/ "../../node_modules/@material/drawer/constants.js":
/*!******************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/drawer/constants.js ***!
  \******************************************************************************************************************/
/*! exports provided: cssClasses, strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses = {
  ROOT: 'mdc-drawer',
  DISMISSIBLE: 'mdc-drawer--dismissible',
  MODAL: 'mdc-drawer--modal',
  OPEN: 'mdc-drawer--open',
  ANIMATE: 'mdc-drawer--animate',
  OPENING: 'mdc-drawer--opening',
  CLOSING: 'mdc-drawer--closing'
};
/** @enum {string} */

const strings = {
  APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
  SCRIM_SELECTOR: '.mdc-drawer-scrim',
  CLOSE_EVENT: 'MDCDrawer:closed',
  OPEN_EVENT: 'MDCDrawer:opened'
};


/***/ }),

/***/ "../../node_modules/@material/drawer/dismissible/foundation.js":
/*!*******************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/drawer/dismissible/foundation.js ***!
  \*******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "../../node_modules/@material/drawer/adapter.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "../../node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "../../node_modules/@material/drawer/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCFoundation<!MDCDrawerAdapter>}
 */

class MDCDismissibleDrawerFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /** @return enum {string} */
  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
  }
  /** @return enum {string} */


  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
  }

  static get defaultAdapter() {
    return (
      /** @type {!MDCDrawerAdapter} */
      {
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        hasClass: () =>
        /* className: string */
        {},
        elementHasClass: () =>
        /* element: !Element, className: string */
        {},
        notifyClose: () => {},
        notifyOpen: () => {},
        saveFocus: () => {},
        restoreFocus: () => {},
        focusActiveNavigationItem: () => {},
        trapFocus: () => {},
        releaseFocus: () => {}
      }
    );
  }

  constructor(adapter) {
    super(Object.assign(MDCDismissibleDrawerFoundation.defaultAdapter, adapter));
    /** @private {number} */

    this.animationFrame_ = 0;
    /** @private {number} */

    this.animationTimer_ = 0;
  }

  destroy() {
    if (this.animationFrame_) {
      cancelAnimationFrame(this.animationFrame_);
    }

    if (this.animationTimer_) {
      clearTimeout(this.animationTimer_);
    }
  }
  /**
   * Function to open the drawer.
   */


  open() {
    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPEN);
    this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ANIMATE); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame_(() => {
      this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPENING);
    });
    this.adapter_.saveFocus();
  }
  /**
   * Function to close the drawer.
   */


  close() {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].CLOSING);
  }
  /**
   * Extension point for when drawer finishes open animation.
   * @protected
   */


  opened() {}
  /**
   * Extension point for when drawer finishes close animation.
   * @protected
   */


  closed() {}
  /**
   * Returns true if drawer is in open state.
   * @return {boolean}
   */


  isOpen() {
    return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPEN);
  }
  /**
   * Returns true if drawer is animating open.
   * @return {boolean}
   */


  isOpening() {
    return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPENING) || this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ANIMATE);
  }
  /**
   * Returns true if drawer is animating closed.
   * @return {boolean}
   */


  isClosing() {
    return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].CLOSING);
  }
  /**
   * Keydown handler to close drawer when key is escape.
   * @param evt
   */


  handleKeydown(evt) {
    const {
      keyCode,
      key
    } = evt;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  }
  /**
   * Handles a transition end event on the root element.
   * @param {!Event} evt
   */


  handleTransitionEnd(evt) {
    const {
      OPENING,
      CLOSING,
      OPEN,
      ANIMATE,
      ROOT
    } = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"]; // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.

    const isElement = evt.target instanceof Element;

    if (!isElement || !this.adapter_.elementHasClass(
    /** @type {!Element} */
    evt.target, ROOT)) {
      return;
    }

    if (this.isClosing()) {
      this.adapter_.removeClass(OPEN);
      this.adapter_.restoreFocus();
      this.closed();
      this.adapter_.notifyClose();
    } else {
      this.adapter_.focusActiveNavigationItem();
      this.opened();
      this.adapter_.notifyOpen();
    }

    this.adapter_.removeClass(ANIMATE);
    this.adapter_.removeClass(OPENING);
    this.adapter_.removeClass(CLOSING);
  }
  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   * @param {Function} callback
   * @private
   */


  runNextAnimationFrame_(callback) {
    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(() => {
      this.animationFrame_ = 0;
      clearTimeout(this.animationTimer_);
      this.animationTimer_ = setTimeout(callback, 0);
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCDismissibleDrawerFoundation);

/***/ }),

/***/ "../../node_modules/@material/drawer/index.js":
/*!**************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/drawer/index.js ***!
  \**************************************************************************************************************/
/*! exports provided: MDCDrawer, MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation, util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCDrawer", function() { return MDCDrawer; });
/* harmony import */ var _material_base_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/index */ "../../node_modules/@material/base/index.js");
/* harmony import */ var _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dismissible/foundation */ "../../node_modules/@material/drawer/dismissible/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCDismissibleDrawerFoundation", function() { return _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _modal_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal/foundation */ "../../node_modules/@material/drawer/modal/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCModalDrawerFoundation", function() { return _modal_foundation__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adapter */ "../../node_modules/@material/drawer/adapter.js");
/* harmony import */ var _material_list_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material/list/index */ "../../node_modules/@material/list/index.js");
/* harmony import */ var _material_list_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material/list/foundation */ "../../node_modules/@material/list/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/drawer/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util */ "../../node_modules/@material/drawer/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! focus-trap */ "../../node_modules/focus-trap/index.js");
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(focus_trap__WEBPACK_IMPORTED_MODULE_8__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */









/**
 * @extends {MDCComponent<!MDCDismissibleDrawerFoundation>}
 * @final
 */

class MDCDrawer extends _material_base_index__WEBPACK_IMPORTED_MODULE_0__["MDCComponent"] {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {!Element} */

    this.previousFocus_;
    /** @private {!Function} */

    this.handleKeydown_;
    /** @private {!Function} */

    this.handleTransitionEnd_;
    /** @private {!Function} */

    this.focusTrapFactory_;
    /** @private {!FocusTrapInstance} */

    this.focusTrap_;
    /** @private {?Element} */

    this.scrim_;
    /** @private {?Function} */

    this.handleScrimClick_;
    /** @private {?MDCList} */

    this.list_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCDrawer}
   */


  static attachTo(root) {
    return new MDCDrawer(root);
  }
  /**
   * Returns true if drawer is in the open position.
   * @return {boolean}
   */


  get open() {
    return this.foundation_.isOpen();
  }
  /**
   * Toggles the drawer open and closed.
   * @param {boolean} isOpen
   */


  set open(isOpen) {
    if (isOpen) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  initialize(focusTrapFactory = focus_trap__WEBPACK_IMPORTED_MODULE_8___default.a, listFactory = el => new _material_list_index__WEBPACK_IMPORTED_MODULE_4__["MDCList"](el)) {
    const listEl =
    /** @type {!Element} */
    this.root_.querySelector(`.${_material_list_foundation__WEBPACK_IMPORTED_MODULE_5__["default"].cssClasses.ROOT}`);

    if (listEl) {
      this.list_ = listFactory(listEl);
      this.list_.wrapFocus = true;
    }

    this.focusTrapFactory_ = focusTrapFactory;
  }

  initialSyncWithDOM() {
    const {
      MODAL
    } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].cssClasses;

    if (this.root_.classList.contains(MODAL)) {
      const {
        SCRIM_SELECTOR
      } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings;
      this.scrim_ =
      /** @type {!Element} */
      this.root_.parentElement.querySelector(SCRIM_SELECTOR);

      this.handleScrimClick_ = () =>
      /** @type {!MDCModalDrawerFoundation} */
      this.foundation_.handleScrimClick();

      this.scrim_.addEventListener('click', this.handleScrimClick_);
      this.focusTrap_ = _util__WEBPACK_IMPORTED_MODULE_7__["createFocusTrapInstance"](this.root_, this.focusTrapFactory_);
    }

    this.handleKeydown_ = evt => this.foundation_.handleKeydown(evt);

    this.handleTransitionEnd_ = evt => this.foundation_.handleTransitionEnd(evt);

    this.root_.addEventListener('keydown', this.handleKeydown_);
    this.root_.addEventListener('transitionend', this.handleTransitionEnd_);
  }

  destroy() {
    this.root_.removeEventListener('keydown', this.handleKeydown_);
    this.root_.removeEventListener('transitionend', this.handleTransitionEnd_);

    if (this.list_) {
      this.list_.destroy();
    }

    const {
      MODAL
    } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].cssClasses;

    if (this.root_.classList.contains(MODAL)) {
      this.scrim_.removeEventListener('click',
      /** @type {!Function} */
      this.handleScrimClick_); // Ensure drawer is closed to hide scrim and release focus

      this.open = false;
    }
  }

  getDefaultFoundation() {
    /** @type {!MDCDrawerAdapter} */
    const adapter =
    /** @type {!MDCDrawerAdapter} */
    Object.assign({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      hasClass: className => this.root_.classList.contains(className),
      elementHasClass: (element, className) => element.classList.contains(className),
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        const previousFocus = this.previousFocus_ && this.previousFocus_.focus;

        if (this.root_.contains(document.activeElement) && previousFocus) {
          this.previousFocus_.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemEl = this.root_.querySelector(`.${_material_list_foundation__WEBPACK_IMPORTED_MODULE_5__["default"].cssClasses.LIST_ITEM_ACTIVATED_CLASS}`);

        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: () => this.emit(_constants__WEBPACK_IMPORTED_MODULE_6__["strings"].CLOSE_EVENT, {}, true
      /* shouldBubble */
      ),
      notifyOpen: () => this.emit(_constants__WEBPACK_IMPORTED_MODULE_6__["strings"].OPEN_EVENT, {}, true
      /* shouldBubble */
      ),
      trapFocus: () => this.focusTrap_.activate(),
      releaseFocus: () => this.focusTrap_.deactivate()
    });
    const {
      DISMISSIBLE,
      MODAL
    } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].cssClasses;

    if (this.root_.classList.contains(DISMISSIBLE)) {
      return new _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"](adapter);
    } else if (this.root_.classList.contains(MODAL)) {
      return new _modal_foundation__WEBPACK_IMPORTED_MODULE_2__["default"](adapter);
    } else {
      throw new Error(`MDCDrawer: Failed to instantiate component. Supported variants are ${DISMISSIBLE} and ${MODAL}.`);
    }
  }

}



/***/ }),

/***/ "../../node_modules/@material/drawer/modal/foundation.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/drawer/modal/foundation.js ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "../../node_modules/@material/drawer/adapter.js");
/* harmony import */ var _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dismissible/foundation */ "../../node_modules/@material/drawer/dismissible/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * @extends {MDCDismissibleDrawerFoundation}
 */

class MDCModalDrawerFoundation extends _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Called when drawer finishes open animation.
   * @override
   */
  opened() {
    this.adapter_.trapFocus();
  }
  /**
   * Called when drawer finishes close animation.
   * @override
   */


  closed() {
    this.adapter_.releaseFocus();
  }
  /**
   * Handles click event on scrim.
   */


  handleScrimClick() {
    this.close();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCModalDrawerFoundation);

/***/ }),

/***/ "../../node_modules/@material/drawer/util.js":
/*!*************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/drawer/util.js ***!
  \*************************************************************************************************************/
/*! exports provided: createFocusTrapInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFocusTrapInstance", function() { return createFocusTrapInstance; });
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! focus-trap */ "../../node_modules/focus-trap/index.js");
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_trap__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @param {!Element} surfaceEl
 * @param {!Function} focusTrapFactory
 * @return {!FocusTrapInstance}
 */

function createFocusTrapInstance(surfaceEl, focusTrapFactory = focus_trap__WEBPACK_IMPORTED_MODULE_0___default.a) {
  return focusTrapFactory(surfaceEl, {
    clickOutsideDeactivates: true,
    initialFocus: false,
    // Navigation drawer handles focusing on active nav item.
    escapeDeactivates: false,
    // Navigation drawer handles ESC.
    returnFocusOnDeactivate: false // Navigation drawer handles restore focus.

  });
}



/***/ }),

/***/ "../../node_modules/@material/list/adapter.js":
/*!**************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/list/adapter.js ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC List. Provides an interface for managing focus.
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
class MDCListAdapter {
  /** @return {number} */
  getListItemCount() {}
  /**
   * @return {number} */


  getFocusedElementIndex() {}
  /**
   * @param {number} index
   * @param {string} attribute
   * @param {string} value
   */


  setAttributeForElementIndex(index, attribute, value) {}
  /**
   * @param {number} index
   * @param {string} attribute
   */


  removeAttributeForElementIndex(index, attribute) {}
  /**
   * @param {number} index
   * @param {string} className
   */


  addClassForElementIndex(index, className) {}
  /**
   * @param {number} index
   * @param {string} className
   */


  removeClassForElementIndex(index, className) {}
  /**
   * Focuses list item at the index specified.
   * @param {number} index
   */


  focusItemAtIndex(index) {}
  /**
   * Sets the tabindex to the value specified for all button/a element children of
   * the list item at the index specified.
   * @param {number} listItemIndex
   * @param {number} tabIndexValue
   */


  setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {}
  /**
   * If the given element has an href, follows the link.
   * @param {!Element} ele
   */


  followHref(ele) {}
  /**
   * @param {number} index
   * @return {boolean} Returns true if radio button is present at given list item index.
   */


  hasRadioAtIndex(index) {}
  /**
   * @param {number} index
   * @return {boolean} Returns true if checkbox is present at given list item index.
   */


  hasCheckboxAtIndex(index) {}
  /**
   * @param {number} index
   * @return {boolean} Returns true if checkbox inside a list item is checked.
   */


  isCheckboxCheckedAtIndex(index) {}
  /**
   * Sets the checked status of checkbox or radio at given list item index.
   * @param {number} index
   * @param {boolean} isChecked
   */


  setCheckedCheckboxOrRadioAtIndex(index, isChecked) {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCListAdapter);

/***/ }),

/***/ "../../node_modules/@material/list/constants.js":
/*!****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/list/constants.js ***!
  \****************************************************************************************************************/
/*! exports provided: strings, cssClasses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses = {
  ROOT: 'mdc-list',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated'
};
/** @enum {string} */

const strings = {
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_SELECTED: 'aria-selected',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: `.${cssClasses.LIST_ITEM_CLASS} button:not(:disabled),
  .${cssClasses.LIST_ITEM_CLASS} a`,
  FOCUSABLE_CHILD_ELEMENTS: `.${cssClasses.LIST_ITEM_CLASS} button:not(:disabled), .${cssClasses.LIST_ITEM_CLASS} a,
  .${cssClasses.LIST_ITEM_CLASS} input[type="radio"]:not(:disabled),
  .${cssClasses.LIST_ITEM_CLASS} input[type="checkbox"]:not(:disabled)`,
  ENABLED_ITEMS_SELECTOR: '.mdc-list-item:not(.mdc-list-item--disabled)'
};


/***/ }),

/***/ "../../node_modules/@material/list/foundation.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/list/foundation.js ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/foundation */ "../../node_modules/@material/base/foundation.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "../../node_modules/@material/list/adapter.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/list/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



const ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

class MDCListFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** @return enum {string} */
  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
  }
  /** @return enum {string} */


  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
  }
  /**
   * {@see MDCListAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCListAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCListAdapter} */
      {
        getListItemCount: () => {},
        getFocusedElementIndex: () => {},
        setAttributeForElementIndex: () => {},
        removeAttributeForElementIndex: () => {},
        addClassForElementIndex: () => {},
        removeClassForElementIndex: () => {},
        focusItemAtIndex: () => {},
        setTabIndexForListItemChildren: () => {},
        followHref: () => {},
        hasRadioAtIndex: () => {},
        hasCheckboxAtIndex: () => {},
        isCheckboxCheckedAtIndex: () => {},
        setCheckedCheckboxOrRadioAtIndex: () => {}
      }
    );
  }
  /**
   * @param {!MDCListAdapter=} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCListFoundation.defaultAdapter, adapter));
    /** {boolean} */

    this.wrapFocus_ = false;
    /** {boolean} */

    this.isVertical_ = true;
    /** {boolean} */

    this.isSingleSelectionList_ = false;
    /** {number} */

    this.selectedIndex_ = -1;
    /** {boolean} */

    this.useActivatedClass_ = false;
  }
  /**
   * Sets the private wrapFocus_ variable.
   * @param {boolean} value
   */


  setWrapFocus(value) {
    this.wrapFocus_ = value;
  }
  /**
   * Sets the isVertical_ private variable.
   * @param {boolean} value
   */


  setVerticalOrientation(value) {
    this.isVertical_ = value;
  }
  /**
   * Sets the isSingleSelectionList_ private variable.
   * @param {boolean} value
   */


  setSingleSelection(value) {
    this.isSingleSelectionList_ = value;
  }
  /**
   * Sets the useActivatedClass_ private variable.
   * @param {boolean} useActivated
   */


  setUseActivatedClass(useActivated) {
    this.useActivatedClass_ = useActivated;
  }
  /** @param {number} index */


  setSelectedIndex(index) {
    if (index < 0 || index >= this.adapter_.getListItemCount()) return;

    if (this.adapter_.hasCheckboxAtIndex(index)) {
      this.setAriaAttributesForCheckbox_(index);
    } else if (this.adapter_.hasRadioAtIndex(index)) {
      this.setAriaAttributesForRadio_(index);
    } else {
      this.setAriaAttributesForSingleSelect_(index);
      this.setClassNamesForSingleSelect_(index);
    }

    if (this.selectedIndex_ >= 0 && this.selectedIndex_ !== index) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', -1);
    } else if (this.selectedIndex_ === -1 && index !== 0) {
      // If no list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
      this.adapter_.setAttributeForElementIndex(0, 'tabindex', -1);
    }

    this.adapter_.setAttributeForElementIndex(index, 'tabindex', 0);
    this.selectedIndex_ = index;
  }
  /**
   * @param {number} index
   * @private
   */


  setAriaAttributesForCheckbox_(index) {
    const ariaAttributeValue = this.adapter_.isCheckboxCheckedAtIndex(index) ? 'true' : 'false';
    this.adapter_.setAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, ariaAttributeValue);
  }
  /**
   * @param {number} index
   * @private
   */


  setAriaAttributesForRadio_(index) {
    if (this.selectedIndex_ >= 0) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, 'false');
    }

    this.adapter_.setAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, 'true');
  }
  /**
  * @param {number} index
  * @private
  */


  setAriaAttributesForSingleSelect_(index) {
    if (this.selectedIndex_ >= 0 && this.selectedIndex_ !== index) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_SELECTED, 'false');
    }

    this.adapter_.setAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_SELECTED, 'true');
  }
  /**
   * @param {number} index
   * @private
   */


  setClassNamesForSingleSelect_(index) {
    let selectedClassName = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass_) {
      selectedClassName = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex_ >= 0) {
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }

    this.adapter_.addClassForElementIndex(index, selectedClassName);
  }
  /**
   * Focus in handler for the list items.
   * @param evt
   * @param {number} listItemIndex
   */


  handleFocusIn(evt, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, 0);
    }
  }
  /**
   * Focus out handler for the list items.
   * @param {Event} evt
   * @param {number} listItemIndex
   */


  handleFocusOut(evt, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, -1);
    }
  }
  /**
   * Key handler for the list.
   * @param {Event} evt
   * @param {boolean} isRootListItem
   * @param {number} listItemIndex
   */


  handleKeydown(evt, isRootListItem, listItemIndex) {
    const arrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    const arrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    const arrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    const arrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    const isHome = evt.key === 'Home' || evt.keyCode === 36;
    const isEnd = evt.key === 'End' || evt.keyCode === 35;
    const isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    const isSpace = evt.key === 'Space' || evt.keyCode === 32;
    let currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    if (this.isVertical_ && arrowDown || !this.isVertical_ && arrowRight) {
      this.preventDefaultEvent_(evt);
      this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && arrowUp || !this.isVertical_ && arrowLeft) {
      this.preventDefaultEvent_(evt);
      this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      this.focusLastElement();
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        if (this.isSingleSelectionList_) {
          // Check if the space key was pressed on the list item or a child element.
          this.preventDefaultEvent_(evt);
        }

        const hasCheckboxOrRadio = this.hasCheckboxOrRadioAtIndex_(listItemIndex);

        if (hasCheckboxOrRadio) {
          this.toggleCheckboxOrRadioAtIndex_(listItemIndex);
          this.preventDefaultEvent_(evt);
        }

        if (this.isSingleSelectionList_ || hasCheckboxOrRadio) {
          this.setSelectedIndex(currentIndex);
        } // Explicitly activate links, since we're preventing default on Enter, and Space doesn't activate them.


        this.adapter_.followHref(currentIndex);
      }
    }
  }
  /**
   * Click handler for the list.
   * @param {number} index
   * @param {boolean} toggleCheckbox
   */


  handleClick(index, toggleCheckbox) {
    if (index === -1) return;

    if (toggleCheckbox) {
      this.toggleCheckboxOrRadioAtIndex_(index);
    }

    if (this.isSingleSelectionList_ || this.hasCheckboxOrRadioAtIndex_(index)) {
      this.setSelectedIndex(index);
    }
  }
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   * @param {Event} evt
   * @private
   */


  preventDefaultEvent_(evt) {
    const tagName = `${evt.target.tagName}`.toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  }
  /**
   * Focuses the next element on the list.
   * @param {number} index
   */


  focusNextElement(index) {
    const count = this.adapter_.getListItemCount();
    let nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
  }
  /**
   * Focuses the previous element on the list.
   * @param {number} index
   */


  focusPrevElement(index) {
    let prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
  }

  focusFirstElement() {
    if (this.adapter_.getListItemCount() > 0) {
      this.adapter_.focusItemAtIndex(0);
    }
  }

  focusLastElement() {
    const lastIndex = this.adapter_.getListItemCount() - 1;

    if (lastIndex >= 0) {
      this.adapter_.focusItemAtIndex(lastIndex);
    }
  }
  /**
   * Toggles checkbox or radio at give index. Radio doesn't change the checked state if it is already checked.
   * @param {number} index
   * @private
   */


  toggleCheckboxOrRadioAtIndex_(index) {
    if (!this.hasCheckboxOrRadioAtIndex_(index)) return;
    let isChecked = true;

    if (this.adapter_.hasCheckboxAtIndex(index)) {
      isChecked = !this.adapter_.isCheckboxCheckedAtIndex(index);
    }

    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
  }
  /**
   * @param {number} index
   * @return {boolean} Return true if list item contains checkbox or radio input at given index.
   */


  hasCheckboxOrRadioAtIndex_(index) {
    return this.adapter_.hasCheckboxAtIndex(index) || this.adapter_.hasRadioAtIndex(index);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCListFoundation);

/***/ }),

/***/ "../../node_modules/@material/list/index.js":
/*!************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/list/index.js ***!
  \************************************************************************************************************/
/*! exports provided: MDCList, MDCListFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCList", function() { return MDCList; });
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/component */ "../../node_modules/@material/base/component.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/list/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCListFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adapter */ "../../node_modules/@material/list/adapter.js");
/* harmony import */ var _material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material/dom/ponyfill */ "../../node_modules/@material/dom/ponyfill.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/list/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





/**
 * @extends MDCComponent<!MDCListFoundation>
 */

class MDCList extends _material_base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);
    /** @private {!Function} */

    this.handleKeydown_;
    /** @private {!Function} */

    this.handleClick_;
    /** @private {!Function} */

    this.focusInEventListener_;
    /** @private {!Function} */

    this.focusOutEventListener_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCList}
   */


  static attachTo(root) {
    return new MDCList(root);
  }

  destroy() {
    this.root_.removeEventListener('keydown', this.handleKeydown_);
    this.root_.removeEventListener('click', this.handleClick_);
    this.root_.removeEventListener('focusin', this.focusInEventListener_);
    this.root_.removeEventListener('focusout', this.focusOutEventListener_);
  }

  initialSyncWithDOM() {
    this.handleClick_ = this.handleClickEvent_.bind(this);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.root_.addEventListener('keydown', this.handleKeydown_);
    this.root_.addEventListener('focusin', this.focusInEventListener_);
    this.root_.addEventListener('focusout', this.focusOutEventListener_);
    this.root_.addEventListener('click', this.handleClick_);
    this.layout();
    this.initializeListType();
  }

  layout() {
    const direction = this.root_.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].ARIA_ORIENTATION);
    this.vertical = direction !== _constants__WEBPACK_IMPORTED_MODULE_4__["strings"].ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(ele => {
      ele.setAttribute('tabindex', -1);
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].FOCUSABLE_CHILD_ELEMENTS)).forEach(ele => ele.setAttribute('tabindex', -1));
  }
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   * @param {Event} evt
   * @private
   */


  getListItemIndex_(evt) {
    let eventTarget =
    /** @type {HTMLElement} */
    evt.target;
    let index = -1; // Find the first ancestor that is a list item or the list.

    while (!eventTarget.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].LIST_ITEM_CLASS) && !eventTarget.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].ROOT)) {
      eventTarget = eventTarget.parentElement;
    } // Get the index of the element if it is a list item.


    if (eventTarget.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].LIST_ITEM_CLASS)) {
      index = this.listElements.indexOf(eventTarget);
    }

    return index;
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleFocusInEvent_(evt) {
    const index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleFocusOutEvent_(evt) {
    const index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  }
  /**
   * Used to figure out which element was focused when keydown event occurred before sending the event to the
   * foundation.
   * @param {Event} evt
   * @private
   */


  handleKeydownEvent_(evt) {
    const index = this.getListItemIndex_(evt);

    if (index >= 0) {
      this.foundation_.handleKeydown(evt, evt.target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].LIST_ITEM_CLASS), index);
    }
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleClickEvent_(evt) {
    const index = this.getListItemIndex_(evt); // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

    const toggleCheckbox = !Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_3__["matches"])(
    /** @type {!Element} */
    evt.target, _constants__WEBPACK_IMPORTED_MODULE_4__["strings"].CHECKBOX_RADIO_SELECTOR);
    this.foundation_.handleClick(index, toggleCheckbox);
  }

  initializeListType() {
    // Pre-selected list item in single selected list or checked list item if list with radio input.
    const preselectedElement = this.root_.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS},
        .${_constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].LIST_ITEM_SELECTED_CLASS},
        ${_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].ARIA_CHECKED_RADIO_SELECTOR}`);

    if (preselectedElement) {
      if (preselectedElement.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true; // Automatically set selected index if single select list type or list with radio inputs.

      this.selectedIndex = this.listElements.indexOf(preselectedElement);
    }
  }
  /** @param {boolean} value */


  set vertical(value) {
    this.foundation_.setVerticalOrientation(value);
  }
  /** @return Array<!Element>*/


  get listElements() {
    return [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].ENABLED_ITEMS_SELECTOR));
  }
  /** @param {boolean} value */


  set wrapFocus(value) {
    this.foundation_.setWrapFocus(value);
  }
  /** @param {boolean} isSingleSelectionList */


  set singleSelection(isSingleSelectionList) {
    this.foundation_.setSingleSelection(isSingleSelectionList);
  }
  /** @param {number} index */


  set selectedIndex(index) {
    this.foundation_.setSelectedIndex(index);
  }
  /** @return {!MDCListFoundation} */


  getDefaultFoundation() {
    return new _foundation__WEBPACK_IMPORTED_MODULE_1__["default"](
    /** @type {!MDCListAdapter} */
    Object.assign({
      getListItemCount: () => this.listElements.length,
      getFocusedElementIndex: () => this.listElements.indexOf(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const element = this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      removeAttributeForElementIndex: (index, attr) => {
        const element = this.listElements[index];

        if (element) {
          element.removeAttribute(attr);
        }
      },
      addClassForElementIndex: (index, className) => {
        const element = this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      removeClassForElementIndex: (index, className) => {
        const element = this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      focusItemAtIndex: index => {
        const element = this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const element = this.listElements[listItemIndex];
        const listItemChildren = [].slice.call(element.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach(ele => ele.setAttribute('tabindex', tabIndexValue));
      },
      followHref: index => {
        const listItem = this.listElements[index];

        if (listItem && listItem.href) {
          listItem.click();
        }
      },
      hasCheckboxAtIndex: index => {
        const listItem = this.listElements[index];
        return !!listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: index => {
        const listItem = this.listElements[index];
        return !!listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: index => {
        const listItem = this.listElements[index];
        const toggleEl = listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      setCheckedCheckboxOrRadioAtIndex: (index, isChecked) => {
        const listItem = this.listElements[index];
        const toggleEl = listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_4__["strings"].CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        const event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      }
    }));
  }

}



/***/ }),

/***/ "../../node_modules/@material/menu-surface/component.js":
/*!************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu-surface/component.js ***!
  \************************************************************************************************************************/
/*! exports provided: MDCMenuSurface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCMenuSurface", function() { return MDCMenuSurface; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "../../node_modules/@material/menu-surface/node_modules/@material/base/component.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/menu-surface/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/menu-surface/foundation.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "../../node_modules/@material/menu-surface/util.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






var MDCMenuSurface =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCMenuSurface, _super);

  function MDCMenuSurface() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenuSurface.attachTo = function (root) {
    return new MDCMenuSurface(root);
  };

  MDCMenuSurface.prototype.initialSyncWithDOM = function () {
    var _this = this;

    var parentEl = this.root_.parentElement;
    this.anchorElement = parentEl && parentEl.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ANCHOR) ? parentEl : null;

    if (this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].FIXED)) {
      this.setFixedPosition(true);
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleBodyClick_ = function (evt) {
      return _this.foundation_.handleBodyClick(evt);
    };

    this.registerBodyClickListener_ = function () {
      return document.body.addEventListener('click', _this.handleBodyClick_);
    };

    this.deregisterBodyClickListener_ = function () {
      return document.body.removeEventListener('click', _this.handleBodyClick_);
    };

    this.listen('keydown', this.handleKeydown_);
    this.listen(_constants__WEBPACK_IMPORTED_MODULE_2__["strings"].OPENED_EVENT, this.registerBodyClickListener_);
    this.listen(_constants__WEBPACK_IMPORTED_MODULE_2__["strings"].CLOSED_EVENT, this.deregisterBodyClickListener_);
  };

  MDCMenuSurface.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(_constants__WEBPACK_IMPORTED_MODULE_2__["strings"].OPENED_EVENT, this.registerBodyClickListener_);
    this.unlisten(_constants__WEBPACK_IMPORTED_MODULE_2__["strings"].CLOSED_EVENT, this.deregisterBodyClickListener_);

    _super.prototype.destroy.call(this);
  };

  Object.defineProperty(MDCMenuSurface.prototype, "open", {
    get: function () {
      return this.foundation_.isOpen();
    },
    set: function (value) {
      if (value) {
        var focusableElements = this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_2__["strings"].FOCUSABLE_ELEMENTS);
        this.firstFocusableElement_ = focusableElements[0];
        this.lastFocusableElement_ = focusableElements[focusableElements.length - 1];
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
    set: function (quickOpen) {
      this.foundation_.setQuickOpen(quickOpen);
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Removes the menu-surface from it's current location and appends it to the
   * body to overcome any overflow:hidden issues.
   */

  MDCMenuSurface.prototype.hoistMenuToBody = function () {
    document.body.appendChild(this.root_);
    this.setIsHoisted(true);
  };
  /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */


  MDCMenuSurface.prototype.setIsHoisted = function (isHoisted) {
    this.foundation_.setIsHoisted(isHoisted);
  };
  /** Sets the element that the menu-surface is anchored to. */


  MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function (element) {
    this.anchorElement = element;
  };
  /** Sets the menu-surface to position: fixed. */


  MDCMenuSurface.prototype.setFixedPosition = function (isFixed) {
    if (isFixed) {
      this.root_.classList.add(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].FIXED);
    } else {
      this.root_.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].FIXED);
    }

    this.foundation_.setFixedPosition(isFixed);
  };
  /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */


  MDCMenuSurface.prototype.setAbsolutePosition = function (x, y) {
    this.foundation_.setAbsolutePosition(x, y);
    this.setIsHoisted(true);
  };
  /**
   * @param corner Default anchor corner alignment of top-left surface corner.
   */


  MDCMenuSurface.prototype.setAnchorCorner = function (corner) {
    this.foundation_.setAnchorCorner(corner);
  };

  MDCMenuSurface.prototype.setAnchorMargin = function (margin) {
    this.foundation_.setAnchorMargin(margin);
  };

  MDCMenuSurface.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root_.classList.contains(className);
      },
      hasAnchor: function () {
        return !!_this.anchorElement;
      },
      notifyClose: function () {
        return _this.emit(_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCMenuSurfaceFoundation"].strings.CLOSED_EVENT, {});
      },
      notifyOpen: function () {
        return _this.emit(_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCMenuSurfaceFoundation"].strings.OPENED_EVENT, {});
      },
      isElementInContainer: function (el) {
        return _this.root_.contains(el);
      },
      isRtl: function () {
        return getComputedStyle(_this.root_).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin: function (origin) {
        var propertyName = _util__WEBPACK_IMPORTED_MODULE_4__["getTransformPropertyName"](window) + "-origin";

        _this.root_.style.setProperty(propertyName, origin);
      },
      isFocused: function () {
        return document.activeElement === _this.root_;
      },
      saveFocus: function () {
        _this.previousFocus_ = document.activeElement;
      },
      restoreFocus: function () {
        if (_this.root_.contains(document.activeElement)) {
          if (_this.previousFocus_ && _this.previousFocus_.focus) {
            _this.previousFocus_.focus();
          }
        }
      },
      isFirstElementFocused: function () {
        return _this.firstFocusableElement_ ? _this.firstFocusableElement_ === document.activeElement : false;
      },
      isLastElementFocused: function () {
        return _this.lastFocusableElement_ ? _this.lastFocusableElement_ === document.activeElement : false;
      },
      focusFirstElement: function () {
        return _this.firstFocusableElement_ && _this.firstFocusableElement_.focus && _this.firstFocusableElement_.focus();
      },
      focusLastElement: function () {
        return _this.lastFocusableElement_ && _this.lastFocusableElement_.focus && _this.lastFocusableElement_.focus();
      },
      getInnerDimensions: function () {
        return {
          width: _this.root_.offsetWidth,
          height: _this.root_.offsetHeight
        };
      },
      getAnchorDimensions: function () {
        return _this.anchorElement ? _this.anchorElement.getBoundingClientRect() : null;
      },
      getWindowDimensions: function () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      getBodyDimensions: function () {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },
      getWindowScroll: function () {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      setPosition: function (position) {
        _this.root_.style.left = 'left' in position ? position.left + "px" : '';
        _this.root_.style.right = 'right' in position ? position.right + "px" : '';
        _this.root_.style.top = 'top' in position ? position.top + "px" : '';
        _this.root_.style.bottom = 'bottom' in position ? position.bottom + "px" : '';
      },
      setMaxHeight: function (height) {
        _this.root_.style.maxHeight = height;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation__WEBPACK_IMPORTED_MODULE_3__["MDCMenuSurfaceFoundation"](adapter);
  };

  return MDCMenuSurface;
}(_material_base_component__WEBPACK_IMPORTED_MODULE_1__["MDCComponent"]);



/***/ }),

/***/ "../../node_modules/@material/menu-surface/constants.js":
/*!************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu-surface/constants.js ***!
  \************************************************************************************************************************/
/*! exports provided: cssClasses, strings, numbers, CornerBit, Corner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CornerBit", function() { return CornerBit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Corner", function() { return Corner; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  ANCHOR: 'mdc-menu-surface--anchor',
  ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
  ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
  FIXED: 'mdc-menu-surface--fixed',
  OPEN: 'mdc-menu-surface--open',
  ROOT: 'mdc-menu-surface'
}; // tslint:disable:object-literal-sort-keys

var strings = {
  CLOSED_EVENT: 'MDCMenuSurface:closed',
  OPENED_EVENT: 'MDCMenuSurface:opened',
  FOCUSABLE_ELEMENTS: ['button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)', 'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(', ')
}; // tslint:enable:object-literal-sort-keys

var numbers = {
  /** Total duration of menu-surface open animation. */
  TRANSITION_OPEN_DURATION: 120,

  /** Total duration of menu-surface close animation. */
  TRANSITION_CLOSE_DURATION: 75,

  /** Margin left to the edge of the viewport when menu-surface is at maximum possible height. */
  MARGIN_TO_EDGE: 32,

  /** Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning. */
  ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67
};
/**
 * Enum for bits in the {@see Corner) bitmap.
 */

var CornerBit;

(function (CornerBit) {
  CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
  CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
  CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
  CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
})(CornerBit || (CornerBit = {}));
/**
 * Enum for representing an element corner for positioning the menu-surface.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 */


var Corner;

(function (Corner) {
  Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
  Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
  Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
  Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
  Corner[Corner["TOP_START"] = 8] = "TOP_START";
  Corner[Corner["TOP_END"] = 12] = "TOP_END";
  Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
  Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
})(Corner || (Corner = {}));



/***/ }),

/***/ "../../node_modules/@material/menu-surface/foundation.js":
/*!*************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu-surface/foundation.js ***!
  \*************************************************************************************************************************/
/*! exports provided: MDCMenuSurfaceFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCMenuSurfaceFoundation", function() { return MDCMenuSurfaceFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "../../node_modules/@material/menu-surface/node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/menu-surface/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




var MDCMenuSurfaceFoundation =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCMenuSurfaceFoundation, _super);

  function MDCMenuSurfaceFoundation(adapter) {
    var _this = _super.call(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, MDCMenuSurfaceFoundation.defaultAdapter, adapter)) || this;

    _this.isOpen_ = false;
    _this.isQuickOpen_ = false;
    _this.isHoistedElement_ = false;
    _this.isFixedPosition_ = false;
    _this.openAnimationEndTimerId_ = 0;
    _this.closeAnimationEndTimerId_ = 0;
    _this.animationRequestId_ = 0;
    _this.anchorCorner_ = _constants__WEBPACK_IMPORTED_MODULE_2__["Corner"].TOP_START;
    _this.anchorMargin_ = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    _this.position_ = {
      x: 0,
      y: 0
    };
    return _this;
  }

  Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_2__["Corner"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        hasAnchor: function () {
          return false;
        },
        isElementInContainer: function () {
          return false;
        },
        isFocused: function () {
          return false;
        },
        isFirstElementFocused: function () {
          return false;
        },
        isLastElementFocused: function () {
          return false;
        },
        isRtl: function () {
          return false;
        },
        getInnerDimensions: function () {
          return {
            height: 0,
            width: 0
          };
        },
        getAnchorDimensions: function () {
          return null;
        },
        getWindowDimensions: function () {
          return {
            height: 0,
            width: 0
          };
        },
        getBodyDimensions: function () {
          return {
            height: 0,
            width: 0
          };
        },
        getWindowScroll: function () {
          return {
            x: 0,
            y: 0
          };
        },
        setPosition: function () {
          return undefined;
        },
        setMaxHeight: function () {
          return undefined;
        },
        setTransformOrigin: function () {
          return undefined;
        },
        saveFocus: function () {
          return undefined;
        },
        restoreFocus: function () {
          return undefined;
        },
        focusFirstElement: function () {
          return undefined;
        },
        focusLastElement: function () {
          return undefined;
        },
        notifyClose: function () {
          return undefined;
        },
        notifyOpen: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuSurfaceFoundation.prototype.init = function () {
    var _a = MDCMenuSurfaceFoundation.cssClasses,
        ROOT = _a.ROOT,
        OPEN = _a.OPEN;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(ROOT + " class required in root element.");
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    }
  };

  MDCMenuSurfaceFoundation.prototype.destroy = function () {
    clearTimeout(this.openAnimationEndTimerId_);
    clearTimeout(this.closeAnimationEndTimerId_); // Cancel any currently running animations.

    cancelAnimationFrame(this.animationRequestId_);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu surface corner.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function (corner) {
    this.anchorCorner_ = corner;
  };
  /**
   * @param margin Set of margin values from anchor.
   */


  MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function (margin) {
    this.anchorMargin_.top = margin.top || 0;
    this.anchorMargin_.right = margin.right || 0;
    this.anchorMargin_.bottom = margin.bottom || 0;
    this.anchorMargin_.left = margin.left || 0;
  };
  /** Used to indicate if the menu-surface is hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.setIsHoisted = function (isHoisted) {
    this.isHoistedElement_ = isHoisted;
  };
  /** Used to set the menu-surface calculations based on a fixed position menu. */


  MDCMenuSurfaceFoundation.prototype.setFixedPosition = function (isFixedPosition) {
    this.isFixedPosition_ = isFixedPosition;
  };
  /** Sets the menu-surface position on the page. */


  MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function (x, y) {
    this.position_.x = this.isFinite_(x) ? x : 0;
    this.position_.y = this.isFinite_(y) ? y : 0;
  };

  MDCMenuSurfaceFoundation.prototype.setQuickOpen = function (quickOpen) {
    this.isQuickOpen_ = quickOpen;
  };

  MDCMenuSurfaceFoundation.prototype.isOpen = function () {
    return this.isOpen_;
  };
  /**
   * Open the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.open = function () {
    var _this = this;

    this.adapter_.saveFocus();

    if (!this.isQuickOpen_) {
      this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
    }

    this.animationRequestId_ = requestAnimationFrame(function () {
      _this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

      _this.dimensions_ = _this.adapter_.getInnerDimensions();

      _this.autoPosition_();

      if (_this.isQuickOpen_) {
        _this.adapter_.notifyOpen();
      } else {
        _this.openAnimationEndTimerId_ = setTimeout(function () {
          _this.openAnimationEndTimerId_ = 0;

          _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);

          _this.adapter_.notifyOpen();
        }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].TRANSITION_OPEN_DURATION);
      }
    });
    this.isOpen_ = true;
  };
  /**
   * Closes the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.close = function () {
    var _this = this;

    if (!this.isQuickOpen_) {
      this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
    }

    requestAnimationFrame(function () {
      _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

      if (_this.isQuickOpen_) {
        _this.adapter_.notifyClose();
      } else {
        _this.closeAnimationEndTimerId_ = setTimeout(function () {
          _this.closeAnimationEndTimerId_ = 0;

          _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);

          _this.adapter_.notifyClose();
        }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].TRANSITION_CLOSE_DURATION);
      }
    });
    this.isOpen_ = false;
    this.maybeRestoreFocus_();
  };
  /** Handle clicks and close if not within menu-surface element. */


  MDCMenuSurfaceFoundation.prototype.handleBodyClick = function (evt) {
    var el = evt.target;

    if (this.adapter_.isElementInContainer(el)) {
      return;
    }

    this.close();
  };
  /** Handle keys that close the surface. */


  MDCMenuSurfaceFoundation.prototype.handleKeydown = function (evt) {
    var keyCode = evt.keyCode,
        key = evt.key,
        shiftKey = evt.shiftKey;
    var isEscape = key === 'Escape' || keyCode === 27;
    var isTab = key === 'Tab' || keyCode === 9;

    if (isEscape) {
      this.close();
    } else if (isTab) {
      if (this.adapter_.isLastElementFocused() && !shiftKey) {
        this.adapter_.focusFirstElement();
        evt.preventDefault();
      } else if (this.adapter_.isFirstElementFocused() && shiftKey) {
        this.adapter_.focusLastElement();
        evt.preventDefault();
      }
    }
  };

  MDCMenuSurfaceFoundation.prototype.autoPosition_ = function () {
    var _a; // Compute measurements for autoposition methods reuse.


    this.measurements_ = this.getAutoLayoutMeasurements_();
    var corner = this.getOriginCorner_();
    var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight_(corner);
    var verticalAlignment = this.hasBit_(corner, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].BOTTOM) ? 'bottom' : 'top';
    var horizontalAlignment = this.hasBit_(corner, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].RIGHT) ? 'right' : 'left';
    var horizontalOffset = this.getHorizontalOriginOffset_(corner);
    var verticalOffset = this.getVerticalOriginOffset_(corner);
    var _b = this.measurements_,
        anchorSize = _b.anchorSize,
        surfaceSize = _b.surfaceSize;
    var position = (_a = {}, _a[horizontalAlignment] = horizontalOffset, _a[verticalAlignment] = verticalOffset, _a); // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.

    if (anchorSize.width / surfaceSize.width > _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    } // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element


    if (this.isHoistedElement_ || this.isFixedPosition_) {
      this.adjustPositionForHoistedElement_(position);
    }

    this.adapter_.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
    this.adapter_.setPosition(position);
    this.adapter_.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
  };
  /**
   * @return Measurements used to position menu surface popup.
   */


  MDCMenuSurfaceFoundation.prototype.getAutoLayoutMeasurements_ = function () {
    var anchorRect = this.adapter_.getAnchorDimensions();
    var bodySize = this.adapter_.getBodyDimensions();
    var viewportSize = this.adapter_.getWindowDimensions();
    var windowScroll = this.adapter_.getWindowScroll();

    if (!anchorRect) {
      // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
      anchorRect = {
        top: this.position_.y,
        right: this.position_.x,
        bottom: this.position_.y,
        left: this.position_.x,
        width: 0,
        height: 0
      }; // tslint:enable:object-literal-sort-keys
    }

    return {
      anchorSize: anchorRect,
      bodySize: bodySize,
      surfaceSize: this.dimensions_,
      viewportDistance: {
        // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
        top: anchorRect.top,
        right: viewportSize.width - anchorRect.right,
        bottom: viewportSize.height - anchorRect.bottom,
        left: anchorRect.left
      },
      viewportSize: viewportSize,
      windowScroll: windowScroll
    };
  };
  /**
   * Computes the corner of the anchor from which to animate and position the menu surface.
   */


  MDCMenuSurfaceFoundation.prototype.getOriginCorner_ = function () {
    // Defaults: open from the top left.
    var corner = _constants__WEBPACK_IMPORTED_MODULE_2__["Corner"].TOP_LEFT;
    var _a = this.measurements_,
        viewportDistance = _a.viewportDistance,
        anchorSize = _a.anchorSize,
        surfaceSize = _a.surfaceSize;
    var isBottomAligned = this.hasBit_(this.anchorCorner_, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].BOTTOM);
    var availableTop = isBottomAligned ? viewportDistance.top + anchorSize.height + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
    var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorSize.height - this.anchorMargin_.top;
    var topOverflow = surfaceSize.height - availableTop;
    var bottomOverflow = surfaceSize.height - availableBottom;

    if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
      corner = this.setBit_(corner, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].BOTTOM);
    }

    var isRtl = this.adapter_.isRtl();
    var isFlipRtl = this.hasBit_(this.anchorCorner_, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].FLIP_RTL);
    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].RIGHT);
    var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
    var availableLeft = isAlignedRight ? viewportDistance.left + anchorSize.width + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
    var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorSize.width - this.anchorMargin_.left;
    var leftOverflow = surfaceSize.width - availableLeft;
    var rightOverflow = surfaceSize.width - availableRight;

    if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
      corner = this.setBit_(corner, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].RIGHT);
    }

    return corner;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Maximum height of the menu surface, based on available space. 0 indicates should not be set.
   */


  MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight_ = function (corner) {
    var viewportDistance = this.measurements_.viewportDistance;
    var maxHeight = 0;
    var isBottomAligned = this.hasBit_(corner, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].BOTTOM);
    var isBottomAnchored = this.hasBit_(this.anchorCorner_, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].BOTTOM);
    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE; // When maximum height is not specified, it is handled from CSS.

    if (isBottomAligned) {
      maxHeight = viewportDistance.top + this.anchorMargin_.top - MARGIN_TO_EDGE;

      if (!isBottomAnchored) {
        maxHeight += this.measurements_.anchorSize.height;
      }
    } else {
      maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom + this.measurements_.anchorSize.height - MARGIN_TO_EDGE;

      if (isBottomAnchored) {
        maxHeight -= this.measurements_.anchorSize.height;
      }
    }

    return maxHeight;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Horizontal offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset_ = function (corner) {
    var anchorSize = this.measurements_.anchorSize; // isRightAligned corresponds to using the 'right' property on the surface.

    var isRightAligned = this.hasBit_(corner, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].RIGHT);
    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].RIGHT);

    if (isRightAligned) {
      var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.left : this.anchorMargin_.right; // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
      // when we calculate the right value (`adjustPositionForHoistedElement_`) based on the element position,
      // the right property is correct.

      if (this.isHoistedElement_ || this.isFixedPosition_) {
        return rightOffset - (this.measurements_.viewportSize.width - this.measurements_.bodySize.width);
      }

      return rightOffset;
    }

    return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.right : this.anchorMargin_.left;
  };
  /**
   * @param corner Origin corner of the menu surface.
   * @return Vertical offset of menu surface origin corner from corresponding anchor corner.
   */


  MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset_ = function (corner) {
    var anchorSize = this.measurements_.anchorSize;
    var isBottomAligned = this.hasBit_(corner, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].BOTTOM);
    var avoidVerticalOverlap = this.hasBit_(this.anchorCorner_, _constants__WEBPACK_IMPORTED_MODULE_2__["CornerBit"].BOTTOM);
    var y = 0;

    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin_.top : -this.anchorMargin_.bottom;
    } else {
      y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin_.bottom : this.anchorMargin_.top;
    }

    return y;
  };
  /** Calculates the offsets for positioning the menu-surface when the menu-surface has been hoisted to the body. */


  MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement_ = function (position) {
    var e_1, _a;

    var _b = this.measurements_,
        windowScroll = _b.windowScroll,
        viewportDistance = _b.viewportDistance;
    var props = Object.keys(position);

    try {
      for (var props_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
        var prop = props_1_1.value;
        var value = position[prop] || 0; // Hoisted surfaces need to have the anchor elements location on the page added to the
        // position properties for proper alignment on the body.

        value += viewportDistance[prop]; // Surfaces that are absolutely positioned need to have additional calculations for scroll
        // and bottom positioning.

        if (!this.isFixedPosition_) {
          if (prop === 'top') {
            value += windowScroll.y;
          } else if (prop === 'bottom') {
            value -= windowScroll.y;
          } else if (prop === 'left') {
            value += windowScroll.x;
          } else {
            // prop === 'right'
            value -= windowScroll.x;
          }
        }

        position[prop] = value;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  /**
   * The last focused element when the menu surface was opened should regain focus, if the user is
   * focused on or within the menu surface when it is closed.
   */


  MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus_ = function () {
    var isRootFocused = this.adapter_.isFocused();
    var childHasFocus = document.activeElement && this.adapter_.isElementInContainer(document.activeElement);

    if (isRootFocused || childHasFocus) {
      this.adapter_.restoreFocus();
    }
  };

  MDCMenuSurfaceFoundation.prototype.hasBit_ = function (corner, bit) {
    return Boolean(corner & bit); // tslint:disable-line:no-bitwise
  };

  MDCMenuSurfaceFoundation.prototype.setBit_ = function (corner, bit) {
    return corner | bit; // tslint:disable-line:no-bitwise
  };
  /**
   * isFinite that doesn't force conversion to number type.
   * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
   */


  MDCMenuSurfaceFoundation.prototype.isFinite_ = function (num) {
    return typeof num === 'number' && isFinite(num);
  };

  return MDCMenuSurfaceFoundation;
}(_material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]);

 // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.

/* harmony default export */ __webpack_exports__["default"] = (MDCMenuSurfaceFoundation);

/***/ }),

/***/ "../../node_modules/@material/menu-surface/node_modules/@material/base/component.js":
/*!****************************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu-surface/node_modules/@material/base/component.js ***!
  \****************************************************************************************************************************************************/
/*! exports provided: MDCComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCComponent", function() { return MDCComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/menu-surface/node_modules/@material/base/foundation.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var MDCComponent =
/** @class */
function () {
  function MDCComponent(root, foundation) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    this.root_ = root;
    this.initialize.apply(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](args)); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.attachTo = function (root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new _foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]({}));
  };
  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


  MDCComponent.prototype.initialize = function () {
    var _args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    } // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.

  };

  MDCComponent.prototype.getDefaultFoundation = function () {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function () {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  MDCComponent.prototype.listen = function (evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  };

  MDCComponent.prototype.unlisten = function (evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  };
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
   */


  MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }

    var evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

 // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.

/* harmony default export */ __webpack_exports__["default"] = (MDCComponent);

/***/ }),

/***/ "../../node_modules/@material/menu-surface/node_modules/@material/base/foundation.js":
/*!*****************************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu-surface/node_modules/@material/base/foundation.js ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: MDCFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCFoundation", function() { return MDCFoundation; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter_ = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function () {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: true,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

 // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.

/* harmony default export */ __webpack_exports__["default"] = (MDCFoundation);

/***/ }),

/***/ "../../node_modules/@material/menu-surface/util.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu-surface/util.js ***!
  \*******************************************************************************************************************/
/*! exports provided: getTransformPropertyName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTransformPropertyName", function() { return getTransformPropertyName; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cachedCssTransformPropertyName_;
/**
 * Returns the name of the correct transform property to use on the current browser.
 */

function getTransformPropertyName(globalObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  if (cachedCssTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    cachedCssTransformPropertyName_ = 'transform' in el.style ? 'transform' : 'webkitTransform';
  }

  return cachedCssTransformPropertyName_;
}



/***/ }),

/***/ "../../node_modules/@material/menu/component.js":
/*!****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/component.js ***!
  \****************************************************************************************************************/
/*! exports provided: MDCMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCMenu", function() { return MDCMenu; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "../../node_modules/@material/menu/node_modules/@material/base/component.js");
/* harmony import */ var _material_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/list/component */ "../../node_modules/@material/menu/node_modules/@material/list/component.js");
/* harmony import */ var _material_list_foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material/list/foundation */ "../../node_modules/@material/menu/node_modules/@material/list/foundation.js");
/* harmony import */ var _material_menu_surface_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material/menu-surface/component */ "../../node_modules/@material/menu-surface/component.js");
/* harmony import */ var _material_menu_surface_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material/menu-surface/foundation */ "../../node_modules/@material/menu-surface/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/menu/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/menu/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */









var MDCMenu =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCMenu, _super);

  function MDCMenu() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCMenu.attachTo = function (root) {
    return new MDCMenu(root);
  };

  MDCMenu.prototype.initialize = function (menuSurfaceFactory, listFactory) {
    if (menuSurfaceFactory === void 0) {
      menuSurfaceFactory = function (el) {
        return new _material_menu_surface_component__WEBPACK_IMPORTED_MODULE_4__["MDCMenuSurface"](el);
      };
    }

    if (listFactory === void 0) {
      listFactory = function (el) {
        return new _material_list_component__WEBPACK_IMPORTED_MODULE_2__["MDCList"](el);
      };
    }

    this.menuSurfaceFactory_ = menuSurfaceFactory;
    this.listFactory_ = listFactory;
  };

  MDCMenu.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.menuSurface_ = this.menuSurfaceFactory_(this.root_);
    var list = this.root_.querySelector(_constants__WEBPACK_IMPORTED_MODULE_6__["strings"].LIST_SELECTOR);

    if (list) {
      this.list_ = this.listFactory_(list);
      this.list_.wrapFocus = true;
    } else {
      this.list_ = null;
    }

    this.handleKeydown_ = function (evt) {
      return _this.foundation_.handleKeydown(evt);
    };

    this.handleItemAction_ = function (evt) {
      return _this.foundation_.handleItemAction(_this.items[evt.detail.index]);
    };

    this.handleMenuSurfaceOpened_ = function () {
      return _this.foundation_.handleMenuSurfaceOpened();
    };

    this.menuSurface_.listen(_material_menu_surface_foundation__WEBPACK_IMPORTED_MODULE_5__["MDCMenuSurfaceFoundation"].strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.listen('keydown', this.handleKeydown_);
    this.listen(_material_list_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCListFoundation"].strings.ACTION_EVENT, this.handleItemAction_);
  };

  MDCMenu.prototype.destroy = function () {
    if (this.list_) {
      this.list_.destroy();
    }

    this.menuSurface_.destroy();
    this.menuSurface_.unlisten(_material_menu_surface_foundation__WEBPACK_IMPORTED_MODULE_5__["MDCMenuSurfaceFoundation"].strings.OPENED_EVENT, this.handleMenuSurfaceOpened_);
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(_material_list_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCListFoundation"].strings.ACTION_EVENT, this.handleItemAction_);

    _super.prototype.destroy.call(this);
  };

  Object.defineProperty(MDCMenu.prototype, "open", {
    get: function () {
      return this.menuSurface_.open;
    },
    set: function (value) {
      this.menuSurface_.open = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
    get: function () {
      return this.list_ ? this.list_.wrapFocus : false;
    },
    set: function (value) {
      if (this.list_) {
        this.list_.wrapFocus = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "items", {
    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     */
    get: function () {
      return this.list_ ? this.list_.listElements : [];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenu.prototype, "quickOpen", {
    set: function (quickOpen) {
      this.menuSurface_.quickOpen = quickOpen;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   * @param focusState Default focus state.
   */

  MDCMenu.prototype.setDefaultFocusState = function (focusState) {
    this.foundation_.setDefaultFocusState(focusState);
  };
  /**
   * @param corner Default anchor corner alignment of top-left menu corner.
   */


  MDCMenu.prototype.setAnchorCorner = function (corner) {
    this.menuSurface_.setAnchorCorner(corner);
  };

  MDCMenu.prototype.setAnchorMargin = function (margin) {
    this.menuSurface_.setAnchorMargin(margin);
  };
  /**
   * @return The item within the menu at the index specified.
   */


  MDCMenu.prototype.getOptionByIndex = function (index) {
    var items = this.items;

    if (index < items.length) {
      return this.items[index];
    } else {
      return null;
    }
  };

  MDCMenu.prototype.setFixedPosition = function (isFixed) {
    this.menuSurface_.setFixedPosition(isFixed);
  };

  MDCMenu.prototype.hoistMenuToBody = function () {
    this.menuSurface_.hoistMenuToBody();
  };

  MDCMenu.prototype.setIsHoisted = function (isHoisted) {
    this.menuSurface_.setIsHoisted(isHoisted);
  };

  MDCMenu.prototype.setAbsolutePosition = function (x, y) {
    this.menuSurface_.setAbsolutePosition(x, y);
  };
  /**
   * Sets the element that the menu-surface is anchored to.
   */


  MDCMenu.prototype.setAnchorElement = function (element) {
    this.menuSurface_.anchorElement = element;
  };

  MDCMenu.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClassToElementAtIndex: function (index, className) {
        var list = _this.items;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: function (index, className) {
        var list = _this.items;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: function (index, attr, value) {
        var list = _this.items;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: function (index, attr) {
        var list = _this.items;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: function (element, className) {
        return element.classList.contains(className);
      },
      closeSurface: function () {
        return _this.open = false;
      },
      getElementIndex: function (element) {
        return _this.items.indexOf(element);
      },
      getParentElement: function (element) {
        return element.parentElement;
      },
      getSelectedElementIndex: function (selectionGroup) {
        var selectedListItem = selectionGroup.querySelector("." + _constants__WEBPACK_IMPORTED_MODULE_6__["cssClasses"].MENU_SELECTED_LIST_ITEM);
        return selectedListItem ? _this.items.indexOf(selectedListItem) : -1;
      },
      notifySelected: function (evtData) {
        return _this.emit(_constants__WEBPACK_IMPORTED_MODULE_6__["strings"].SELECTED_EVENT, {
          index: evtData.index,
          item: _this.items[evtData.index]
        });
      },
      getMenuItemCount: function () {
        return _this.items.length;
      },
      focusItemAtIndex: function (index) {
        return _this.items[index].focus();
      },
      focusListRoot: function () {
        return _this.root_.querySelector(_constants__WEBPACK_IMPORTED_MODULE_6__["strings"].LIST_SELECTOR).focus();
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation__WEBPACK_IMPORTED_MODULE_7__["MDCMenuFoundation"](adapter);
  };

  return MDCMenu;
}(_material_base_component__WEBPACK_IMPORTED_MODULE_1__["MDCComponent"]);



/***/ }),

/***/ "../../node_modules/@material/menu/constants.js":
/*!****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/constants.js ***!
  \****************************************************************************************************************/
/*! exports provided: cssClasses, strings, numbers, DefaultFocusState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFocusState", function() { return DefaultFocusState; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
  MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
  ROOT: 'mdc-menu'
};
var strings = {
  ARIA_SELECTED_ATTR: 'aria-selected',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  LIST_SELECTOR: '.mdc-list',
  SELECTED_EVENT: 'MDCMenu:selected'
};
var numbers = {
  FOCUS_ROOT_INDEX: -1
};
var DefaultFocusState;

(function (DefaultFocusState) {
  DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
  DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
  DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
  DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
})(DefaultFocusState || (DefaultFocusState = {}));



/***/ }),

/***/ "../../node_modules/@material/menu/foundation.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/foundation.js ***!
  \*****************************************************************************************************************/
/*! exports provided: MDCMenuFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCMenuFoundation", function() { return MDCMenuFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "../../node_modules/@material/menu/node_modules/@material/base/foundation.js");
/* harmony import */ var _material_list_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/list/foundation */ "../../node_modules/@material/menu/node_modules/@material/list/foundation.js");
/* harmony import */ var _material_menu_surface_foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material/menu-surface/foundation */ "../../node_modules/@material/menu-surface/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/menu/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






var MDCMenuFoundation =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCMenuFoundation, _super);

  function MDCMenuFoundation(adapter) {
    var _this = _super.call(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, MDCMenuFoundation.defaultAdapter, adapter)) || this;

    _this.closeAnimationEndTimerId_ = 0;
    _this.defaultFocusState_ = _constants__WEBPACK_IMPORTED_MODULE_4__["DefaultFocusState"].LIST_ROOT;
    return _this;
  }

  Object.defineProperty(MDCMenuFoundation, "cssClasses", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "strings", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["strings"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "numbers", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["numbers"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
    /**
     * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClassToElementAtIndex: function () {
          return undefined;
        },
        removeClassFromElementAtIndex: function () {
          return undefined;
        },
        addAttributeToElementAtIndex: function () {
          return undefined;
        },
        removeAttributeFromElementAtIndex: function () {
          return undefined;
        },
        elementContainsClass: function () {
          return false;
        },
        closeSurface: function () {
          return undefined;
        },
        getElementIndex: function () {
          return -1;
        },
        getParentElement: function () {
          return null;
        },
        getSelectedElementIndex: function () {
          return -1;
        },
        notifySelected: function () {
          return undefined;
        },
        getMenuItemCount: function () {
          return 0;
        },
        focusItemAtIndex: function () {
          return undefined;
        },
        focusListRoot: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCMenuFoundation.prototype.destroy = function () {
    if (this.closeAnimationEndTimerId_) {
      clearTimeout(this.closeAnimationEndTimerId_);
    }

    this.adapter_.closeSurface();
  };

  MDCMenuFoundation.prototype.handleKeydown = function (evt) {
    var key = evt.key,
        keyCode = evt.keyCode;
    var isTab = key === 'Tab' || keyCode === 9;

    if (isTab) {
      this.adapter_.closeSurface();
    }
  };

  MDCMenuFoundation.prototype.handleItemAction = function (listItem) {
    var _this = this;

    var index = this.adapter_.getElementIndex(listItem);

    if (index < 0) {
      return;
    }

    this.adapter_.notifySelected({
      index: index
    });
    this.adapter_.closeSurface(); // Wait for the menu to close before adding/removing classes that affect styles.

    this.closeAnimationEndTimerId_ = setTimeout(function () {
      var selectionGroup = _this.getSelectionGroup_(listItem);

      if (selectionGroup) {
        _this.handleSelectionGroup_(selectionGroup, index);
      }
    }, _material_menu_surface_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCMenuSurfaceFoundation"].numbers.TRANSITION_CLOSE_DURATION);
  };

  MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function () {
    switch (this.defaultFocusState_) {
      case _constants__WEBPACK_IMPORTED_MODULE_4__["DefaultFocusState"].FIRST_ITEM:
        this.adapter_.focusItemAtIndex(0);
        break;

      case _constants__WEBPACK_IMPORTED_MODULE_4__["DefaultFocusState"].LAST_ITEM:
        this.adapter_.focusItemAtIndex(this.adapter_.getMenuItemCount() - 1);
        break;

      case _constants__WEBPACK_IMPORTED_MODULE_4__["DefaultFocusState"].NONE:
        // Do nothing.
        break;

      default:
        this.adapter_.focusListRoot();
        break;
    }
  };
  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   */


  MDCMenuFoundation.prototype.setDefaultFocusState = function (focusState) {
    this.defaultFocusState_ = focusState;
  };
  /**
   * Handles toggling the selected classes in a selection group when a selection is made.
   */


  MDCMenuFoundation.prototype.handleSelectionGroup_ = function (selectionGroup, index) {
    // De-select the previous selection in this group.
    var selectedIndex = this.adapter_.getSelectedElementIndex(selectionGroup);

    if (selectedIndex >= 0) {
      this.adapter_.removeAttributeFromElementAtIndex(selectedIndex, _constants__WEBPACK_IMPORTED_MODULE_4__["strings"].ARIA_SELECTED_ATTR);
      this.adapter_.removeClassFromElementAtIndex(selectedIndex, _constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].MENU_SELECTED_LIST_ITEM);
    } // Select the new list item in this group.


    this.adapter_.addClassToElementAtIndex(index, _constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].MENU_SELECTED_LIST_ITEM);
    this.adapter_.addAttributeToElementAtIndex(index, _constants__WEBPACK_IMPORTED_MODULE_4__["strings"].ARIA_SELECTED_ATTR, 'true');
  };
  /**
   * Returns the parent selection group of an element if one exists.
   */


  MDCMenuFoundation.prototype.getSelectionGroup_ = function (listItem) {
    var parent = this.adapter_.getParentElement(listItem);

    if (!parent) {
      return null;
    }

    var isGroup = this.adapter_.elementContainsClass(parent, _constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].MENU_SELECTION_GROUP); // Iterate through ancestors until we find the group or get to the list.

    while (!isGroup && parent && !this.adapter_.elementContainsClass(parent, _material_list_foundation__WEBPACK_IMPORTED_MODULE_2__["MDCListFoundation"].cssClasses.ROOT)) {
      parent = this.adapter_.getParentElement(parent);
      isGroup = parent ? this.adapter_.elementContainsClass(parent, _constants__WEBPACK_IMPORTED_MODULE_4__["cssClasses"].MENU_SELECTION_GROUP) : false;
    }

    if (isGroup) {
      return parent;
    } else {
      return null;
    }
  };

  return MDCMenuFoundation;
}(_material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]);

 // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.

/* harmony default export */ __webpack_exports__["default"] = (MDCMenuFoundation);

/***/ }),

/***/ "../../node_modules/@material/menu/index.js":
/*!************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/index.js ***!
  \************************************************************************************************************/
/*! exports provided: Corner, MDCMenu, cssClasses, strings, numbers, DefaultFocusState, MDCMenuFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_menu_surface_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/menu-surface/constants */ "../../node_modules/@material/menu-surface/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Corner", function() { return _material_menu_surface_constants__WEBPACK_IMPORTED_MODULE_0__["Corner"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "../../node_modules/@material/menu/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCMenu", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["MDCMenu"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/menu/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultFocusState", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["DefaultFocusState"]; });

/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/menu/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCMenuFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_3__["MDCMenuFoundation"]; });

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 // for backward compatibility





/***/ }),

/***/ "../../node_modules/@material/menu/node_modules/@material/base/component.js":
/*!********************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/node_modules/@material/base/component.js ***!
  \********************************************************************************************************************************************/
/*! exports provided: MDCComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCComponent", function() { return MDCComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/menu/node_modules/@material/base/foundation.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var MDCComponent =
/** @class */
function () {
  function MDCComponent(root, foundation) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    this.root_ = root;
    this.initialize.apply(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](args)); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.attachTo = function (root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new _foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]({}));
  };
  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


  MDCComponent.prototype.initialize = function () {
    var _args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    } // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.

  };

  MDCComponent.prototype.getDefaultFoundation = function () {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function () {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  MDCComponent.prototype.listen = function (evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  };

  MDCComponent.prototype.unlisten = function (evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  };
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
   */


  MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }

    var evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

 // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.

/* harmony default export */ __webpack_exports__["default"] = (MDCComponent);

/***/ }),

/***/ "../../node_modules/@material/menu/node_modules/@material/base/foundation.js":
/*!*********************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/node_modules/@material/base/foundation.js ***!
  \*********************************************************************************************************************************************/
/*! exports provided: MDCFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCFoundation", function() { return MDCFoundation; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter_ = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function () {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: true,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

 // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.

/* harmony default export */ __webpack_exports__["default"] = (MDCFoundation);

/***/ }),

/***/ "../../node_modules/@material/menu/node_modules/@material/dom/ponyfill.js":
/*!******************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/node_modules/@material/dom/ponyfill.js ***!
  \******************************************************************************************************************************************/
/*! exports provided: closest, matches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return closest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  var el = element;

  while (el) {
    if (matches(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}
function matches(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}

/***/ }),

/***/ "../../node_modules/@material/menu/node_modules/@material/list/component.js":
/*!********************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/node_modules/@material/list/component.js ***!
  \********************************************************************************************************************************************/
/*! exports provided: MDCList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCList", function() { return MDCList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "../../node_modules/@material/menu/node_modules/@material/base/component.js");
/* harmony import */ var _material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/dom/ponyfill */ "../../node_modules/@material/menu/node_modules/@material/dom/ponyfill.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/menu/node_modules/@material/list/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/menu/node_modules/@material/list/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






var MDCList =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCList, _super);

  function MDCList() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCList.prototype, "vertical", {
    set: function (value) {
      this.foundation_.setVerticalOrientation(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "listElements", {
    get: function () {
      return [].slice.call(this.root_.querySelectorAll("." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "wrapFocus", {
    set: function (value) {
      this.foundation_.setWrapFocus(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "singleSelection", {
    set: function (isSingleSelectionList) {
      this.foundation_.setSingleSelection(isSingleSelectionList);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "selectedIndex", {
    get: function () {
      return this.foundation_.getSelectedIndex();
    },
    set: function (index) {
      this.foundation_.setSelectedIndex(index);
    },
    enumerable: true,
    configurable: true
  });

  MDCList.attachTo = function (root) {
    return new MDCList(root);
  };

  MDCList.prototype.initialSyncWithDOM = function () {
    this.handleClick_ = this.handleClickEvent_.bind(this);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.listen('keydown', this.handleKeydown_);
    this.listen('click', this.handleClick_);
    this.listen('focusin', this.focusInEventListener_);
    this.listen('focusout', this.focusOutEventListener_);
    this.layout();
    this.initializeListType();
  };

  MDCList.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten('click', this.handleClick_);
    this.unlisten('focusin', this.focusInEventListener_);
    this.unlisten('focusout', this.focusOutEventListener_);
  };

  MDCList.prototype.layout = function () {
    var direction = this.root_.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ORIENTATION);
    this.vertical = direction !== _constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(function (el) {
      el.setAttribute('tabindex', '-1');
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].FOCUSABLE_CHILD_ELEMENTS)).forEach(function (el) {
      return el.setAttribute('tabindex', '-1');
    });
    this.foundation_.layout();
  };
  /**
   * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
   */


  MDCList.prototype.initializeListType = function () {
    var _this = this;

    var checkboxListItems = this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ROLE_CHECKBOX_SELECTOR);
    var singleSelectedListItem = this.root_.querySelector("\n      ." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_SELECTED_CLASS + "\n    ");
    var radioSelectedListItem = this.root_.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      var preselectedItems = this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = [].map.call(preselectedItems, function (listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (singleSelectedListItem) {
      if (singleSelectedListItem.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true;
      this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };

  MDCList.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      focusItemAtIndex: function (index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: function (index, attr) {
        return _this.listElements[index].getAttribute(attr);
      },
      getFocusedElementIndex: function () {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function () {
        return _this.listElements.length;
      },
      hasCheckboxAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function (index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function () {
        return _this.root_.contains(document.activeElement);
      },
      isRootFocused: function () {
        return document.activeElement === _this.root_;
      },
      notifyAction: function (index) {
        _this.emit(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_EVENT, {
          index: index
        },
        /** shouldBubble */
        true);
      },
      removeClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      setAttributeForElementIndex: function (index, attr, value) {
        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var listItemChildren = [].slice.call(element.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach(function (el) {
          return el.setAttribute('tabindex', tabIndexValue);
        });
      }
    };
    return new _foundation__WEBPACK_IMPORTED_MODULE_4__["MDCListFoundation"](adapter);
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */


  MDCList.prototype.getListItemIndex_ = function (evt) {
    var eventTarget = evt.target;
    var nearestParent = Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__["closest"])(eventTarget, "." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS + ", ." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].ROOT); // Get the index of the element if it is a list item.

    if (nearestParent && Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__["matches"])(nearestParent, "." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS)) {
      return this.listElements.indexOf(nearestParent);
    }

    return -1;
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusInEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusOutEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  };
  /**
   * Used to figure out which element was focused when keydown event occurred before sending the event to the
   * foundation.
   */


  MDCList.prototype.handleKeydownEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target;
    this.foundation_.handleKeydown(evt, target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS), index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleClickEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target; // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

    var toggleCheckbox = !Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__["matches"])(target, _constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_RADIO_SELECTOR);
    this.foundation_.handleClick(index, toggleCheckbox);
  };

  return MDCList;
}(_material_base_component__WEBPACK_IMPORTED_MODULE_1__["MDCComponent"]);



/***/ }),

/***/ "../../node_modules/@material/menu/node_modules/@material/list/constants.js":
/*!********************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/node_modules/@material/list/constants.js ***!
  \********************************************************************************************************************************************/
/*! exports provided: strings, cssClasses, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  ROOT: 'mdc-list'
};
var strings = {
  ACTION_EVENT: 'MDCList:action',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: 'aria-current',
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: 'aria-selected',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a\n  ",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled)\n  ",
  RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)'
};
var numbers = {
  UNSET_INDEX: -1
};


/***/ }),

/***/ "../../node_modules/@material/menu/node_modules/@material/list/foundation.js":
/*!*********************************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/menu/node_modules/@material/list/foundation.js ***!
  \*********************************************************************************************************************************************/
/*! exports provided: MDCListFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCListFoundation", function() { return MDCListFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "../../node_modules/@material/menu/node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/menu/node_modules/@material/list/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}

var MDCListFoundation =
/** @class */
function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCListFoundation, _super);

  function MDCListFoundation(adapter) {
    var _this = _super.call(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, MDCListFoundation.defaultAdapter, adapter)) || this;

    _this.wrapFocus_ = false;
    _this.isVertical_ = true;
    _this.isSingleSelectionList_ = false;
    _this.selectedIndex_ = _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX;
    _this.focusedItemIndex_ = _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX;
    _this.useActivatedClass_ = false;
    _this.ariaCurrentAttrValue_ = null;
    _this.isCheckboxList_ = false;
    _this.isRadioList_ = false;
    return _this;
  }

  Object.defineProperty(MDCListFoundation, "strings", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "cssClasses", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "numbers", {
    get: function () {
      return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClassForElementIndex: function () {
          return undefined;
        },
        focusItemAtIndex: function () {
          return undefined;
        },
        getAttributeForElementIndex: function () {
          return null;
        },
        getFocusedElementIndex: function () {
          return 0;
        },
        getListItemCount: function () {
          return 0;
        },
        hasCheckboxAtIndex: function () {
          return false;
        },
        hasRadioAtIndex: function () {
          return false;
        },
        isCheckboxCheckedAtIndex: function () {
          return false;
        },
        isFocusInsideList: function () {
          return false;
        },
        isRootFocused: function () {
          return false;
        },
        notifyAction: function () {
          return undefined;
        },
        removeClassForElementIndex: function () {
          return undefined;
        },
        setAttributeForElementIndex: function () {
          return undefined;
        },
        setCheckedCheckboxOrRadioAtIndex: function () {
          return undefined;
        },
        setTabIndexForListItemChildren: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCListFoundation.prototype.layout = function () {
    if (this.adapter_.getListItemCount() === 0) {
      return;
    }

    if (this.adapter_.hasCheckboxAtIndex(0)) {
      this.isCheckboxList_ = true;
    } else if (this.adapter_.hasRadioAtIndex(0)) {
      this.isRadioList_ = true;
    }
  };
  /**
   * Sets the private wrapFocus_ variable.
   */


  MDCListFoundation.prototype.setWrapFocus = function (value) {
    this.wrapFocus_ = value;
  };
  /**
   * Sets the isVertical_ private variable.
   */


  MDCListFoundation.prototype.setVerticalOrientation = function (value) {
    this.isVertical_ = value;
  };
  /**
   * Sets the isSingleSelectionList_ private variable.
   */


  MDCListFoundation.prototype.setSingleSelection = function (value) {
    this.isSingleSelectionList_ = value;
  };
  /**
   * Sets the useActivatedClass_ private variable.
   */


  MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
    this.useActivatedClass_ = useActivated;
  };

  MDCListFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex_;
  };

  MDCListFoundation.prototype.setSelectedIndex = function (index) {
    if (!this.isIndexValid_(index)) {
      return;
    }

    if (this.isCheckboxList_) {
      this.setCheckboxAtIndex_(index);
    } else if (this.isRadioList_) {
      this.setRadioAtIndex_(index);
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  };
  /**
   * Focus in handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '0');
    }
  };
  /**
   * Focus out handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
    var _this = this;

    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '-1');
    }
    /**
     * Between Focusout & Focusin some browsers do not have focus on any element. Setting a delay to wait till the focus
     * is moved to next element.
     */


    setTimeout(function () {
      if (!_this.adapter_.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedItem_();
      }
    }, 0);
  };
  /**
   * Key handler for the list.
   */


  MDCListFoundation.prototype.handleKeydown = function (evt, isRootListItem, listItemIndex) {
    var isArrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    var isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    var isArrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    var isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    var isHome = evt.key === 'Home' || evt.keyCode === 36;
    var isEnd = evt.key === 'End' || evt.keyCode === 35;
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    var isSpace = evt.key === 'Space' || evt.keyCode === 32;

    if (this.adapter_.isRootFocused()) {
      if (isArrowUp || isEnd) {
        evt.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        evt.preventDefault();
        this.focusFirstElement();
      }

      return;
    }

    var currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    var nextIndex;

    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusLastElement();
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        // Return early if enter key is pressed on anchor element which triggers synthetic MouseEvent event.
        var target = evt.target;

        if (target && target.tagName === 'A' && isEnter) {
          return;
        }

        this.preventDefaultEvent_(evt);

        if (this.isSelectableList_()) {
          this.setSelectedIndexOnAction_(currentIndex);
        }

        this.adapter_.notifyAction(currentIndex);
      }
    }

    this.focusedItemIndex_ = currentIndex;

    if (nextIndex !== undefined) {
      this.setTabindexAtIndex_(nextIndex);
      this.focusedItemIndex_ = nextIndex;
    }
  };
  /**
   * Click handler for the list.
   */


  MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
    if (index === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
      return;
    }

    if (this.isSelectableList_()) {
      this.setSelectedIndexOnAction_(index, toggleCheckbox);
    }

    this.adapter_.notifyAction(index);
    this.setTabindexAtIndex_(index);
    this.focusedItemIndex_ = index;
  };
  /**
   * Focuses the next element on the list.
   */


  MDCListFoundation.prototype.focusNextElement = function (index) {
    var count = this.adapter_.getListItemCount();
    var nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  /**
   * Focuses the previous element on the list.
   */


  MDCListFoundation.prototype.focusPrevElement = function (index) {
    var prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
    return prevIndex;
  };

  MDCListFoundation.prototype.focusFirstElement = function () {
    this.adapter_.focusItemAtIndex(0);
    return 0;
  };

  MDCListFoundation.prototype.focusLastElement = function () {
    var lastIndex = this.adapter_.getListItemCount() - 1;
    this.adapter_.focusItemAtIndex(lastIndex);
    return lastIndex;
  };
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   */


  MDCListFoundation.prototype.preventDefaultEvent_ = function (evt) {
    var target = evt.target;
    var tagName = ("" + target.tagName).toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  };

  MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
    if (this.selectedIndex_ === index) {
      return;
    }

    var selectedClassName = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass_) {
      selectedClassName = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }

    this.adapter_.addClassForElementIndex(index, selectedClassName);
    this.setAriaForSingleSelectionAtIndex_(index);
    this.selectedIndex_ = index;
  };
  /**
   * Sets aria attribute for single selection at given index.
   */


  MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
    // Detect the presence of aria-current and get the value only during list initialization when it is in unset state.
    if (this.selectedIndex_ === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter_.getAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CURRENT);
    }

    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    var ariaAttribute = isAriaCurrent ? _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CURRENT : _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_SELECTED;

    if (this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
    }

    var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
    this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
  };
  /**
   * Toggles radio at give index. Radio doesn't change the checked state if it is already checked.
   */


  MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);

    if (this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, 'false');
    }

    this.adapter_.setAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, 'true');
    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
    for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
      var isChecked = false;

      if (index.indexOf(i) >= 0) {
        isChecked = true;
      }

      this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
      this.adapter_.setAttributeForElementIndex(i, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, isChecked ? 'true' : 'false');
    }

    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setTabindexAtIndex_ = function (index) {
    if (this.focusedItemIndex_ === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX && index !== 0) {
      // If no list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
      this.adapter_.setAttributeForElementIndex(0, 'tabindex', '-1');
    } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
      this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, 'tabindex', '-1');
    }

    this.adapter_.setAttributeForElementIndex(index, 'tabindex', '0');
  };
  /**
   * @return Return true if it is single selectin list, checkbox list or radio list.
   */


  MDCListFoundation.prototype.isSelectableList_ = function () {
    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
  };

  MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function () {
    var targetIndex = 0;

    if (this.isSelectableList_()) {
      if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
        targetIndex = this.selectedIndex_;
      } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
        targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) {
          return Math.min(currentIndex, minIndex);
        });
      }
    }

    this.setTabindexAtIndex_(targetIndex);
  };

  MDCListFoundation.prototype.isIndexValid_ = function (index) {
    var _this = this;

    if (index instanceof Array) {
      if (!this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
      }

      if (index.length === 0) {
        return true;
      } else {
        return index.some(function (i) {
          return _this.isIndexInRange_(i);
        });
      }
    } else if (typeof index === 'number') {
      if (this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
      }

      return this.isIndexInRange_(index);
    } else {
      return false;
    }
  };

  MDCListFoundation.prototype.isIndexInRange_ = function (index) {
    var listSize = this.adapter_.getListItemCount();
    return index >= 0 && index < listSize;
  };

  MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
    if (toggleCheckbox === void 0) {
      toggleCheckbox = true;
    }

    if (this.isCheckboxList_) {
      this.toggleCheckboxAtIndex_(index, toggleCheckbox);
    } else {
      this.setSelectedIndex(index);
    }
  };

  MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
    var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);

    if (toggleCheckbox) {
      isChecked = !isChecked;
      this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
    }

    this.adapter_.setAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, isChecked ? 'true' : 'false'); // If none of the checkbox items are selected and selectedIndex is not initialized then provide a default value.

    var selectedIndexes = this.selectedIndex_ === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX ? [] : this.selectedIndex_.slice();

    if (isChecked) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function (i) {
        return i !== index;
      });
    }

    this.selectedIndex_ = selectedIndexes;
  };

  return MDCListFoundation;
}(_material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]);

 // tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.

/* harmony default export */ __webpack_exports__["default"] = (MDCListFoundation);

/***/ }),

/***/ "../../node_modules/@material/ripple/adapter.js":
/*!****************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/ripple/adapter.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
class MDCRippleAdapter {
  /** @return {boolean} */
  browserSupportsCssVars() {}
  /** @return {boolean} */


  isUnbounded() {}
  /** @return {boolean} */


  isSurfaceActive() {}
  /** @return {boolean} */


  isSurfaceDisabled() {}
  /** @param {string} className */


  addClass(className) {}
  /** @param {string} className */


  removeClass(className) {}
  /** @param {!EventTarget} target */


  containsEventTarget(target) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  registerInteractionHandler(evtType, handler) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  deregisterInteractionHandler(evtType, handler) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  registerDocumentInteractionHandler(evtType, handler) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  deregisterDocumentInteractionHandler(evtType, handler) {}
  /**
   * @param {!Function} handler
   */


  registerResizeHandler(handler) {}
  /**
   * @param {!Function} handler
   */


  deregisterResizeHandler(handler) {}
  /**
   * @param {string} varName
   * @param {?number|string} value
   */


  updateCssVariable(varName, value) {}
  /** @return {!ClientRect} */


  computeBoundingRect() {}
  /** @return {{x: number, y: number}} */


  getWindowPageOffset() {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCRippleAdapter);

/***/ }),

/***/ "../../node_modules/@material/ripple/constants.js":
/*!******************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/ripple/constants.js ***!
  \******************************************************************************************************************/
/*! exports provided: cssClasses, strings, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};
const strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};
const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225,
  // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150,
  // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices

};


/***/ }),

/***/ "../../node_modules/@material/ripple/foundation.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/ripple/foundation.js ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/foundation */ "../../node_modules/@material/base/foundation.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "../../node_modules/@material/ripple/adapter.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/ripple/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "../../node_modules/@material/ripple/util.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




/**
 * @typedef {{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: (!Event|undefined),
 *   isProgrammatic: (boolean|undefined)
 * }}
 */

let ActivationStateType;
/**
 * @typedef {{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */

let ListenerInfoType;
/**
 * @typedef {{
 *   activate: function(!Event),
 *   deactivate: function(!Event=),
 *   focus: function(),
 *   blur: function()
 * }}
 */

let ListenersType;
/**
 * @typedef {{
 *   x: number,
 *   y: number
 * }}
 */

let PointType; // Activation events registered on the root element of each instance for activation

const ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations

/** @type {!Array<!EventTarget>} */

let activatedTargets = [];
/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

class MDCRippleFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
  }

  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
  }

  static get numbers() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"];
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () =>
      /* boolean - cached */
      {},
      isUnbounded: () =>
      /* boolean */
      {},
      isSurfaceActive: () =>
      /* boolean */
      {},
      isSurfaceDisabled: () =>
      /* boolean */
      {},
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      containsEventTarget: () =>
      /* target: !EventTarget */
      {},
      registerInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerResizeHandler: () =>
      /* handler: EventListener */
      {},
      deregisterResizeHandler: () =>
      /* handler: EventListener */
      {},
      updateCssVariable: () =>
      /* varName: string, value: string */
      {},
      computeBoundingRect: () =>
      /* ClientRect */
      {},
      getWindowPageOffset: () =>
      /* {x: number, y: number} */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCRippleFoundation.defaultAdapter, adapter));
    /** @private {number} */

    this.layoutFrame_ = 0;
    /** @private {!ClientRect} */

    this.frame_ =
    /** @type {!ClientRect} */
    {
      width: 0,
      height: 0
    };
    /** @private {!ActivationStateType} */

    this.activationState_ = this.defaultActivationState_();
    /** @private {number} */

    this.initialSize_ = 0;
    /** @private {number} */

    this.maxRadius_ = 0;
    /** @private {function(!Event)} */

    this.activateHandler_ = e => this.activate_(e);
    /** @private {function(!Event=)} */


    this.deactivateHandler_ = () => this.deactivate_();
    /** @private {function(!Event=)} */


    this.focusHandler_ = () => this.handleFocus();
    /** @private {function(!Event=)} */


    this.blurHandler_ = () => this.handleBlur();
    /** @private {!Function} */


    this.resizeHandler_ = () => this.layout();
    /** @private {{left: number, top:number}} */


    this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    /** @private {number} */

    this.fgScale_ = 0;
    /** @private {number} */

    this.activationTimer_ = 0;
    /** @private {number} */

    this.fgDeactivationRemovalTimer_ = 0;
    /** @private {boolean} */

    this.activationAnimationHasEnded_ = false;
    /** @private {!Function} */

    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };
    /** @private {!Event|undefined} */


    this.previousActivationEvent_;
  }
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  supportsPressRipple_() {
    return this.adapter_.browserSupportsCssVars();
  }
  /**
   * @return {!ActivationStateType}
   */


  defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: undefined,
      isProgrammatic: false
    };
  }
  /** @override */


  init() {
    const supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      const {
        ROOT,
        UNBOUNDED
      } = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.addClass(ROOT);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.addClass(UNBOUNDED); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple

          this.layoutInternal_();
        }
      });
    }
  }
  /** @override */


  destroy() {
    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      const {
        ROOT,
        UNBOUNDED
      } = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.removeClass(ROOT);
        this.adapter_.removeClass(UNBOUNDED);
        this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  }
  /**
   * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
   * @private
   */


  registerRootHandlers_(supportsPressRipple) {
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(type => {
        this.adapter_.registerInteractionHandler(type, this.activateHandler_);
      });

      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  }
  /**
   * @param {!Event} e
   * @private
   */


  registerDeactivationHandlers_(e) {
    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }
  /** @private */


  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }
  /** @private */


  deregisterDeactivationHandlers_() {
    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }
  /** @private */


  removeCssVars_() {
    const {
      strings
    } = MDCRippleFoundation;
    Object.keys(strings).forEach(k => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings[k], null);
      }
    });
  }
  /**
   * @param {!Event=} e
   * @private
   */


  activate_(e) {
    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    const activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e !== undefined && previousActivationEvent.type !== e.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === undefined;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e !== undefined && (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown');
    const hasActivatedChild = e !== undefined && activatedTargets.length > 0 && activatedTargets.some(target => this.adapter_.containsEventTarget(target));

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e !== undefined) {
      activatedTargets.push(
      /** @type {!EventTarget} */
      e.target);
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(() => {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && e !== undefined && (e.key === ' ' || e.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }
  /**
   * @param {!Event=} e
   * @private
   */


  checkElementMadeActive_(e) {
    return e !== undefined && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  }
  /**
   * @param {!Event=} event Optional event containing position information.
   */


  activate(event) {
    this.activate_(event);
  }
  /** @private */


  animateActivation_() {
    const {
      VAR_FG_TRANSLATE_START,
      VAR_FG_TRANSLATE_END
    } = MDCRippleFoundation.strings;
    const {
      FG_DEACTIVATION,
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      DEACTIVATION_TIMEOUT_MS
    } = MDCRippleFoundation.numbers;
    this.layoutInternal_();
    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {
        startPoint,
        endPoint
      } = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }
  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  getFgTranslationCoordinates_() {
    const {
      activationEvent,
      wasActivatedByPointer
    } = this.activationState_;
    let startPoint;

    if (wasActivatedByPointer) {
      startPoint = Object(_util__WEBPACK_IMPORTED_MODULE_3__["getNormalizedEventCoords"])(
      /** @type {!Event} */
      activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    const endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint,
      endPoint
    };
  }
  /** @private */


  runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const {
      FG_DEACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      hasDeactivationUXRun,
      isActivated
    } = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].FG_DEACTIVATION_MS);
    }
  }
  /** @private */


  rmBoundedActivationClasses_() {
    const {
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(() => this.previousActivationEvent_ = undefined, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  }
  /**
   * @private
   */


  deactivate_() {
    const activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    const state =
    /** @type {!ActivationStateType} */
    Object.assign({}, activationState);

    if (activationState.isProgrammatic) {
      requestAnimationFrame(() => this.animateDeactivation_(state));
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(() => {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(state);
        this.resetActivationState_();
      });
    }
  }

  deactivate() {
    this.deactivate_();
  }
  /**
   * @param {!ActivationStateType} options
   * @private
   */


  animateDeactivation_({
    wasActivatedByPointer,
    wasElementMadeActive
  }) {
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }
  /** @private */


  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();
    const maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  }
  /** @private */


  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE,
      VAR_LEFT,
      VAR_TOP,
      VAR_FG_SCALE
    } = MDCRippleFoundation.strings;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }
  /** @param {boolean} unbounded */


  setUnbounded(unbounded) {
    const {
      UNBOUNDED
    } = MDCRippleFoundation.cssClasses;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }

  handleFocus() {
    requestAnimationFrame(() => this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

  handleBlur() {
    requestAnimationFrame(() => this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCRippleFoundation);

/***/ }),

/***/ "../../node_modules/@material/ripple/index.js":
/*!**************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/ripple/index.js ***!
  \**************************************************************************************************************/
/*! exports provided: MDCRipple, MDCRippleFoundation, RippleCapableSurface, util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCRipple", function() { return MDCRipple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RippleCapableSurface", function() { return RippleCapableSurface; });
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/component */ "../../node_modules/@material/base/component.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "../../node_modules/@material/ripple/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/ripple/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCRippleFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "../../node_modules/@material/ripple/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_3__; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */

class MDCRipple extends _material_base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);
    /** @type {boolean} */

    this.disabled = false;
    /** @private {boolean} */

    this.unbounded_;
  }
  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  static attachTo(root, {
    isUnbounded = undefined
  } = {}) {
    const ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (isUnbounded !== undefined) {
      ripple.unbounded =
      /** @type {boolean} */
      isUnbounded;
    }

    return ripple;
  }
  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  static createAdapter(instance) {
    const MATCHES = _util__WEBPACK_IMPORTED_MODULE_3__["getMatchesProperty"](HTMLElement.prototype);
    return {
      browserSupportsCssVars: () => _util__WEBPACK_IMPORTED_MODULE_3__["supportsCssVariables"](window),
      isUnbounded: () => instance.unbounded,
      isSurfaceActive: () => instance.root_[MATCHES](':active'),
      isSurfaceDisabled: () => instance.disabled,
      addClass: className => instance.root_.classList.add(className),
      removeClass: className => instance.root_.classList.remove(className),
      containsEventTarget: target => instance.root_.contains(target),
      registerInteractionHandler: (evtType, handler) => instance.root_.addEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      deregisterInteractionHandler: (evtType, handler) => instance.root_.removeEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => instance.root_.style.setProperty(varName, value),
      computeBoundingRect: () => instance.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset
      })
    };
  }
  /** @return {boolean} */


  get unbounded() {
    return this.unbounded_;
  }
  /** @param {boolean} unbounded */


  set unbounded(unbounded) {
    this.unbounded_ = Boolean(unbounded);
    this.setUnbounded_();
  }
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   * @private
   */


  setUnbounded_() {
    this.foundation_.setUnbounded(this.unbounded_);
  }

  activate() {
    this.foundation_.activate();
  }

  deactivate() {
    this.foundation_.deactivate();
  }

  layout() {
    this.foundation_.layout();
  }
  /**
   * @return {!MDCRippleFoundation}
   * @override
   */


  getDefaultFoundation() {
    return new _foundation__WEBPACK_IMPORTED_MODULE_2__["default"](MDCRipple.createAdapter(this));
  }
  /** @override */


  initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  }

}
/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


class RippleCapableSurface {}
/** @protected {!Element} */


RippleCapableSurface.prototype.root_;
/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.unbounded;
/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.disabled;


/***/ }),

/***/ "../../node_modules/@material/ripple/util.js":
/*!*************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/ripple/util.js ***!
  \*************************************************************************************************************/
/*! exports provided: supportsCssVariables, applyPassive, getMatchesProperty, getNormalizedEventCoords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsCssVariables", function() { return supportsCssVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPassive", function() { return applyPassive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatchesProperty", function() { return getMatchesProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizedEventCoords", function() { return getNormalizedEventCoords; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
let supportsCssVariables_;
/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */

let supportsPassive_;
/**
 * @param {!Window} windowObj
 * @return {boolean}
 */

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}
/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */


function supportsCssVariables(windowObj, forceRefresh = false) {
  let supportsCssVariables = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables;
  }

  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  const weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }

  return supportsCssVariables;
} //

/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|!EventListenerOptions}
 */


function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;

    try {
      globalObj.document.addEventListener('test', null, {
        get passive() {
          isSupported = true;
          return isSupported;
        }

      });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ?
  /** @type {!EventListenerOptions} */
  {
    passive: true
  } : false;
}
/**
 * @param {!Object} HTMLElementPrototype
 * @return {string}
 */


function getMatchesProperty(HTMLElementPrototype) {
  /**
   * Order is important because we return the first existing method we find.
   * Do not change the order of the items in the below array.
   */
  const matchesMethods = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'];
  let method = 'matches';

  for (let i = 0; i < matchesMethods.length; i++) {
    const matchesMethod = matchesMethods[i];

    if (matchesMethod in HTMLElementPrototype) {
      method = matchesMethod;
      break;
    }
  }

  return method;
}
/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */


function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {
    x,
    y
  } = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;
  let normalizedX;
  let normalizedY; // Determine touch point relative to the ripple container.

  if (ev.type === 'touchstart') {
    ev =
    /** @type {!TouchEvent} */
    ev;
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    ev =
    /** @type {!MouseEvent} */
    ev;
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}



/***/ }),

/***/ "../../node_modules/@material/select/dist/mdc.select.js":
/*!************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/select/dist/mdc.select.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 Material Components for the Web
 Copyright (c) 2018 Google Inc.
 License: MIT
*/
(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory();else {}
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            /******/
            configurable: false,

            /******/
            enumerable: true,

            /******/
            get: getter
            /******/

          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 129);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @template A
       */


      var MDCFoundation = function () {
        _createClass(MDCFoundation, null, [{
          key: "cssClasses",

          /** @return enum{cssClasses} */
          get: function get() {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {};
          }
          /** @return enum{strings} */

        }, {
          key: "strings",
          get: function get() {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {};
          }
          /** @return enum{numbers} */

        }, {
          key: "numbers",
          get: function get() {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {};
          }
          /** @return {!Object} */

        }, {
          key: "defaultAdapter",
          get: function get() {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {};
          }
          /**
           * @param {A=} adapter
           */

        }]);

        function MDCFoundation() {
          var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          _classCallCheck(this, MDCFoundation);
          /** @protected {!A} */


          this.adapter_ = adapter;
        }

        _createClass(MDCFoundation, [{
          key: "init",
          value: function init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
          }
        }, {
          key: "destroy",
          value: function destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
          }
        }]);

        return MDCFoundation;
      }();
      /* harmony default export */


      __webpack_exports__["a"] = MDCFoundation;
      /***/
    },
    /* 1 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(0);

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @template F
       */


      var MDCComponent = function () {
        _createClass(MDCComponent, null, [{
          key: 'attachTo',

          /**
           * @param {!Element} root
           * @return {!MDCComponent}
           */
          value: function attachTo(root) {
            // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
            // returns an instantiated component with its root set to that element. Also note that in the cases of
            // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
            // from getDefaultFoundation().
            return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a"
            /* default */
            ]());
          }
          /**
           * @param {!Element} root
           * @param {F=} foundation
           * @param {...?} args
           */

        }]);

        function MDCComponent(root) {
          var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

          _classCallCheck(this, MDCComponent);
          /** @protected {!Element} */


          this.root_ = root;

          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          this.initialize.apply(this, args); // Note that we initialize foundation here and not within the constructor's default param so that
          // this.root_ is defined and can be used within the foundation class.

          /** @protected {!F} */

          this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
          this.foundation_.init();
          this.initialSyncWithDOM();
        }

        _createClass(MDCComponent, [{
          key: 'initialize',
          value: function initialize()
          /* ...args */
          {} // Subclasses can override this to do any additional setup work that would be considered part of a
          // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
          // initialized. Any additional arguments besides root and foundation will be passed in here.

          /**
           * @return {!F} foundation
           */

        }, {
          key: 'getDefaultFoundation',
          value: function getDefaultFoundation() {
            // Subclasses must override this method to return a properly configured foundation class for the
            // component.
            throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
          }
        }, {
          key: 'initialSyncWithDOM',
          value: function initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
            // object. An example of this would be a form control wrapper that needs to synchronize its internal state
            // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
            // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            // Subclasses may implement this method to release any resources / deregister any listeners they have
            // attached. An example of this might be deregistering a resize event from the window object.
            this.foundation_.destroy();
          }
          /**
           * Wrapper method to add an event listener to the component's root element. This is most useful when
           * listening for custom events.
           * @param {string} evtType
           * @param {!Function} handler
           */

        }, {
          key: 'listen',
          value: function listen(evtType, handler) {
            this.root_.addEventListener(evtType, handler);
          }
          /**
           * Wrapper method to remove an event listener to the component's root element. This is most useful when
           * unlistening for custom events.
           * @param {string} evtType
           * @param {!Function} handler
           */

        }, {
          key: 'unlisten',
          value: function unlisten(evtType, handler) {
            this.root_.removeEventListener(evtType, handler);
          }
          /**
           * Fires a cross-browser-compatible custom event from the component root of the given type,
           * with the given data.
           * @param {string} evtType
           * @param {!Object} evtData
           * @param {boolean=} shouldBubble
           */

        }, {
          key: 'emit',
          value: function emit(evtType, evtData) {
            var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var evt = void 0;

            if (typeof CustomEvent === 'function') {
              evt = new CustomEvent(evtType, {
                detail: evtData,
                bubbles: shouldBubble
              });
            } else {
              evt = document.createEvent('CustomEvent');
              evt.initCustomEvent(evtType, shouldBubble, false, evtData);
            }

            this.root_.dispatchEvent(evt);
          }
        }]);

        return MDCComponent;
      }();
      /* harmony default export */


      __webpack_exports__["a"] = MDCComponent;
      /***/
    },
    /* 2 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "supportsCssVariables", function () {
        return supportsCssVariables;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "applyPassive", function () {
        return applyPassive;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getMatchesProperty", function () {
        return getMatchesProperty;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getNormalizedEventCoords", function () {
        return getNormalizedEventCoords;
      });
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
       * @private {boolean|undefined}
       */


      var supportsCssVariables_ = void 0;
      /**
       * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
       * @private {boolean|undefined}
       */

      var supportsPassive_ = void 0;
      /**
       * @param {!Window} windowObj
       * @return {boolean}
       */

      function detectEdgePseudoVarBug(windowObj) {
        // Detect versions of Edge with buggy var() support
        // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
        var document = windowObj.document;
        var node = document.createElement('div');
        node.className = 'mdc-ripple-surface--test-edge-var-bug';
        document.body.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
        // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
        // but Firefox is known to support CSS custom properties correctly.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

        var computedStyle = windowObj.getComputedStyle(node);
        var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
        node.remove();
        return hasPseudoVarBug;
      }
      /**
       * @param {!Window} windowObj
       * @param {boolean=} forceRefresh
       * @return {boolean|undefined}
       */


      function supportsCssVariables(windowObj) {
        var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var supportsCssVariables = supportsCssVariables_;

        if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
          return supportsCssVariables;
        }

        var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';

        if (!supportsFunctionPresent) {
          return;
        }

        var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
        // See: README section on Safari

        var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

        if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
          supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
        } else {
          supportsCssVariables = false;
        }

        if (!forceRefresh) {
          supportsCssVariables_ = supportsCssVariables;
        }

        return supportsCssVariables;
      } //

      /**
       * Determine whether the current browser supports passive event listeners, and if so, use them.
       * @param {!Window=} globalObj
       * @param {boolean=} forceRefresh
       * @return {boolean|!EventListenerOptions}
       */


      function applyPassive() {
        var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
        var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (supportsPassive_ === undefined || forceRefresh) {
          var isSupported = false;

          try {
            globalObj.document.addEventListener('test', null, {
              get passive() {
                isSupported = true;
                return isSupported;
              }

            });
          } catch (e) {}

          supportsPassive_ = isSupported;
        }

        return supportsPassive_ ?
        /** @type {!EventListenerOptions} */
        {
          passive: true
        } : false;
      }
      /**
       * @param {!Object} HTMLElementPrototype
       * @return {string}
       */


      function getMatchesProperty(HTMLElementPrototype) {
        /**
         * Order is important because we return the first existing method we find.
         * Do not change the order of the items in the below array.
         */
        var matchesMethods = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'];
        var method = 'matches';

        for (var i = 0; i < matchesMethods.length; i++) {
          var matchesMethod = matchesMethods[i];

          if (matchesMethod in HTMLElementPrototype) {
            method = matchesMethod;
            break;
          }
        }

        return method;
      }
      /**
       * @param {!Event} ev
       * @param {{x: number, y: number}} pageOffset
       * @param {!ClientRect} clientRect
       * @return {{x: number, y: number}}
       */


      function getNormalizedEventCoords(ev, pageOffset, clientRect) {
        var x = pageOffset.x,
            y = pageOffset.y;
        var documentX = x + clientRect.left;
        var documentY = y + clientRect.top;
        var normalizedX = void 0;
        var normalizedY = void 0; // Determine touch point relative to the ripple container.

        if (ev.type === 'touchstart') {
          ev =
          /** @type {!TouchEvent} */
          ev;
          normalizedX = ev.changedTouches[0].pageX - documentX;
          normalizedY = ev.changedTouches[0].pageY - documentY;
        } else {
          ev =
          /** @type {!MouseEvent} */
          ev;
          normalizedX = ev.pageX - documentX;
          normalizedY = ev.pageY - documentY;
        }

        return {
          x: normalizedX,
          y: normalizedY
        };
      }
      /***/

    },
    /* 3 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC Ripple. Provides an interface for managing
       * - classes
       * - dom
       * - CSS variables
       * - position
       * - dimensions
       * - scroll position
       * - event handlers
       * - unbounded, active and disabled states
       *
       * Additionally, provides type information for the adapter to the Closure
       * compiler.
       *
       * Implement this adapter for your framework of choice to delegate updates to
       * the component in your framework of choice. See architecture documentation
       * for more details.
       * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
       *
       * @record
       */


      var MDCRippleAdapter = function () {
        function MDCRippleAdapter() {
          _classCallCheck(this, MDCRippleAdapter);
        }

        _createClass(MDCRippleAdapter, [{
          key: "browserSupportsCssVars",

          /** @return {boolean} */
          value: function browserSupportsCssVars() {}
          /** @return {boolean} */

        }, {
          key: "isUnbounded",
          value: function isUnbounded() {}
          /** @return {boolean} */

        }, {
          key: "isSurfaceActive",
          value: function isSurfaceActive() {}
          /** @return {boolean} */

        }, {
          key: "isSurfaceDisabled",
          value: function isSurfaceDisabled() {}
          /** @param {string} className */

        }, {
          key: "addClass",
          value: function addClass(className) {}
          /** @param {string} className */

        }, {
          key: "removeClass",
          value: function removeClass(className) {}
          /** @param {!EventTarget} target */

        }, {
          key: "containsEventTarget",
          value: function containsEventTarget(target) {}
          /**
           * @param {string} evtType
           * @param {!Function} handler
           */

        }, {
          key: "registerInteractionHandler",
          value: function registerInteractionHandler(evtType, handler) {}
          /**
           * @param {string} evtType
           * @param {!Function} handler
           */

        }, {
          key: "deregisterInteractionHandler",
          value: function deregisterInteractionHandler(evtType, handler) {}
          /**
           * @param {string} evtType
           * @param {!Function} handler
           */

        }, {
          key: "registerDocumentInteractionHandler",
          value: function registerDocumentInteractionHandler(evtType, handler) {}
          /**
           * @param {string} evtType
           * @param {!Function} handler
           */

        }, {
          key: "deregisterDocumentInteractionHandler",
          value: function deregisterDocumentInteractionHandler(evtType, handler) {}
          /**
           * @param {!Function} handler
           */

        }, {
          key: "registerResizeHandler",
          value: function registerResizeHandler(handler) {}
          /**
           * @param {!Function} handler
           */

        }, {
          key: "deregisterResizeHandler",
          value: function deregisterResizeHandler(handler) {}
          /**
           * @param {string} varName
           * @param {?number|string} value
           */

        }, {
          key: "updateCssVariable",
          value: function updateCssVariable(varName, value) {}
          /** @return {!ClientRect} */

        }, {
          key: "computeBoundingRect",
          value: function computeBoundingRect() {}
          /** @return {{x: number, y: number}} */

        }, {
          key: "getWindowPageOffset",
          value: function getWindowPageOffset() {}
        }]);

        return MDCRippleAdapter;
      }();
      /* unused harmony default export */


      var _unused_webpack_default_export = MDCRippleAdapter;
      /***/
    },
    /* 4 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCRipple", function () {
        return MDCRipple;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RippleCapableSurface", function () {
        return RippleCapableSurface;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(2);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCRippleFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
      });
      /* harmony reexport (module object) */


      __webpack_require__.d(__webpack_exports__, "util", function () {
        return __WEBPACK_IMPORTED_MODULE_3__util__;
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends MDCComponent<!MDCRippleFoundation>
       */


      var MDCRipple = function (_MDCComponent) {
        _inherits(MDCRipple, _MDCComponent);
        /** @param {...?} args */


        function MDCRipple() {
          var _ref;

          _classCallCheck(this, MDCRipple);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /** @type {boolean} */


          var _this = _possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

          _this.disabled = false;
          /** @private {boolean} */

          _this.unbounded_;
          return _this;
        }
        /**
         * @param {!Element} root
         * @param {{isUnbounded: (boolean|undefined)}=} options
         * @return {!MDCRipple}
         */


        _createClass(MDCRipple, [{
          key: 'setUnbounded_',

          /**
           * Closure Compiler throws an access control error when directly accessing a
           * protected or private property inside a getter/setter, like unbounded above.
           * By accessing the protected property inside a method, we solve that problem.
           * That's why this function exists.
           * @private
           */
          value: function setUnbounded_() {
            this.foundation_.setUnbounded(this.unbounded_);
          }
        }, {
          key: 'activate',
          value: function activate() {
            this.foundation_.activate();
          }
        }, {
          key: 'deactivate',
          value: function deactivate() {
            this.foundation_.deactivate();
          }
        }, {
          key: 'layout',
          value: function layout() {
            this.foundation_.layout();
          }
          /**
           * @return {!MDCRippleFoundation}
           * @override
           */

        }, {
          key: 'getDefaultFoundation',
          value: function getDefaultFoundation() {
            return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
            /* default */
            ](MDCRipple.createAdapter(this));
          }
          /** @override */

        }, {
          key: 'initialSyncWithDOM',
          value: function initialSyncWithDOM() {
            this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
          }
        }, {
          key: 'unbounded',

          /** @return {boolean} */
          get: function get() {
            return this.unbounded_;
          }
          /** @param {boolean} unbounded */
          ,
          set: function set(unbounded) {
            this.unbounded_ = Boolean(unbounded);
            this.setUnbounded_();
          }
        }], [{
          key: 'attachTo',
          value: function attachTo(root) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref2$isUnbounded = _ref2.isUnbounded,
                isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

            var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

            if (isUnbounded !== undefined) {
              ripple.unbounded =
              /** @type {boolean} */
              isUnbounded;
            }

            return ripple;
          }
          /**
           * @param {!RippleCapableSurface} instance
           * @return {!MDCRippleAdapter}
           */

        }, {
          key: 'createAdapter',
          value: function createAdapter(instance) {
            var MATCHES = __WEBPACK_IMPORTED_MODULE_3__util__["getMatchesProperty"](HTMLElement.prototype);

            return {
              browserSupportsCssVars: function browserSupportsCssVars() {
                return __WEBPACK_IMPORTED_MODULE_3__util__["supportsCssVariables"](window);
              },
              isUnbounded: function isUnbounded() {
                return instance.unbounded;
              },
              isSurfaceActive: function isSurfaceActive() {
                return instance.root_[MATCHES](':active');
              },
              isSurfaceDisabled: function isSurfaceDisabled() {
                return instance.disabled;
              },
              addClass: function addClass(className) {
                return instance.root_.classList.add(className);
              },
              removeClass: function removeClass(className) {
                return instance.root_.classList.remove(className);
              },
              containsEventTarget: function containsEventTarget(target) {
                return instance.root_.contains(target);
              },
              registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                return instance.root_.addEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
              },
              deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                return instance.root_.removeEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
              },
              registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
                return document.documentElement.addEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
              },
              deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
                return document.documentElement.removeEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
              },
              registerResizeHandler: function registerResizeHandler(handler) {
                return window.addEventListener('resize', handler);
              },
              deregisterResizeHandler: function deregisterResizeHandler(handler) {
                return window.removeEventListener('resize', handler);
              },
              updateCssVariable: function updateCssVariable(varName, value) {
                return instance.root_.style.setProperty(varName, value);
              },
              computeBoundingRect: function computeBoundingRect() {
                return instance.root_.getBoundingClientRect();
              },
              getWindowPageOffset: function getWindowPageOffset() {
                return {
                  x: window.pageXOffset,
                  y: window.pageYOffset
                };
              }
            };
          }
        }]);

        return MDCRipple;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /**
       * See Material Design spec for more details on when to use ripples.
       * https://material.io/guidelines/motion/choreography.html#choreography-creation
       * @record
       */


      var RippleCapableSurface = function RippleCapableSurface() {
        _classCallCheck(this, RippleCapableSurface);
      };
      /** @protected {!Element} */


      RippleCapableSurface.prototype.root_;
      /**
       * Whether or not the ripple bleeds out of the bounds of the element.
       * @type {boolean|undefined}
       */

      RippleCapableSurface.prototype.unbounded;
      /**
       * Whether or not the ripple is attached to a disabled component.
       * @type {boolean|undefined}
       */

      RippleCapableSurface.prototype.disabled;
      /***/
    },
    /* 5 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(6);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(2);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @typedef {{
       *   isActivated: (boolean|undefined),
       *   hasDeactivationUXRun: (boolean|undefined),
       *   wasActivatedByPointer: (boolean|undefined),
       *   wasElementMadeActive: (boolean|undefined),
       *   activationEvent: (!Event|undefined),
       *   isProgrammatic: (boolean|undefined)
       * }}
       */


      var ActivationStateType = void 0;
      /**
       * @typedef {{
       *   activate: (string|undefined),
       *   deactivate: (string|undefined),
       *   focus: (string|undefined),
       *   blur: (string|undefined)
       * }}
       */

      var ListenerInfoType = void 0;
      /**
       * @typedef {{
       *   activate: function(!Event),
       *   deactivate: function(!Event=),
       *   focus: function(),
       *   blur: function()
       * }}
       */

      var ListenersType = void 0;
      /**
       * @typedef {{
       *   x: number,
       *   y: number
       * }}
       */

      var PointType = void 0; // Activation events registered on the root element of each instance for activation

      var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

      var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations

      /** @type {!Array<!EventTarget>} */

      var activatedTargets = [];
      /**
       * @extends {MDCFoundation<!MDCRippleAdapter>}
       */

      var MDCRippleFoundation = function (_MDCFoundation) {
        _inherits(MDCRippleFoundation, _MDCFoundation);

        _createClass(MDCRippleFoundation, null, [{
          key: 'cssClasses',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ];
          }
        }, {
          key: 'strings',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["c"
            /* strings */
            ];
          }
        }, {
          key: 'numbers',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* numbers */
            ];
          }
        }, {
          key: 'defaultAdapter',
          get: function get() {
            return {
              browserSupportsCssVars: function browserSupportsCssVars()
              /* boolean - cached */
              {},
              isUnbounded: function isUnbounded()
              /* boolean */
              {},
              isSurfaceActive: function isSurfaceActive()
              /* boolean */
              {},
              isSurfaceDisabled: function isSurfaceDisabled()
              /* boolean */
              {},
              addClass: function addClass()
              /* className: string */
              {},
              removeClass: function removeClass()
              /* className: string */
              {},
              containsEventTarget: function containsEventTarget()
              /* target: !EventTarget */
              {},
              registerInteractionHandler: function registerInteractionHandler()
              /* evtType: string, handler: EventListener */
              {},
              deregisterInteractionHandler: function deregisterInteractionHandler()
              /* evtType: string, handler: EventListener */
              {},
              registerDocumentInteractionHandler: function registerDocumentInteractionHandler()
              /* evtType: string, handler: EventListener */
              {},
              deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler()
              /* evtType: string, handler: EventListener */
              {},
              registerResizeHandler: function registerResizeHandler()
              /* handler: EventListener */
              {},
              deregisterResizeHandler: function deregisterResizeHandler()
              /* handler: EventListener */
              {},
              updateCssVariable: function updateCssVariable()
              /* varName: string, value: string */
              {},
              computeBoundingRect: function computeBoundingRect()
              /* ClientRect */
              {},
              getWindowPageOffset: function getWindowPageOffset()
              /* {x: number, y: number} */
              {}
            };
          }
        }]);

        function MDCRippleFoundation(adapter) {
          _classCallCheck(this, MDCRippleFoundation);
          /** @private {number} */


          var _this = _possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

          _this.layoutFrame_ = 0;
          /** @private {!ClientRect} */

          _this.frame_ =
          /** @type {!ClientRect} */
          {
            width: 0,
            height: 0
          };
          /** @private {!ActivationStateType} */

          _this.activationState_ = _this.defaultActivationState_();
          /** @private {number} */

          _this.initialSize_ = 0;
          /** @private {number} */

          _this.maxRadius_ = 0;
          /** @private {function(!Event)} */

          _this.activateHandler_ = function (e) {
            return _this.activate_(e);
          };
          /** @private {function(!Event=)} */


          _this.deactivateHandler_ = function () {
            return _this.deactivate_();
          };
          /** @private {function(!Event=)} */


          _this.focusHandler_ = function () {
            return _this.handleFocus();
          };
          /** @private {function(!Event=)} */


          _this.blurHandler_ = function () {
            return _this.handleBlur();
          };
          /** @private {!Function} */


          _this.resizeHandler_ = function () {
            return _this.layout();
          };
          /** @private {{left: number, top:number}} */


          _this.unboundedCoords_ = {
            left: 0,
            top: 0
          };
          /** @private {number} */

          _this.fgScale_ = 0;
          /** @private {number} */

          _this.activationTimer_ = 0;
          /** @private {number} */

          _this.fgDeactivationRemovalTimer_ = 0;
          /** @private {boolean} */

          _this.activationAnimationHasEnded_ = false;
          /** @private {!Function} */

          _this.activationTimerCallback_ = function () {
            _this.activationAnimationHasEnded_ = true;

            _this.runDeactivationUXLogicIfReady_();
          };
          /** @private {!Event|undefined} */


          _this.previousActivationEvent_;
          return _this;
        }
        /**
         * We compute this property so that we are not querying information about the client
         * until the point in time where the foundation requests it. This prevents scenarios where
         * client-side feature-detection may happen too early, such as when components are rendered on the server
         * and then initialized at mount time on the client.
         * @return {boolean}
         * @private
         */


        _createClass(MDCRippleFoundation, [{
          key: 'supportsPressRipple_',
          value: function supportsPressRipple_() {
            return this.adapter_.browserSupportsCssVars();
          }
          /**
           * @return {!ActivationStateType}
           */

        }, {
          key: 'defaultActivationState_',
          value: function defaultActivationState_() {
            return {
              isActivated: false,
              hasDeactivationUXRun: false,
              wasActivatedByPointer: false,
              wasElementMadeActive: false,
              activationEvent: undefined,
              isProgrammatic: false
            };
          }
          /** @override */

        }, {
          key: 'init',
          value: function init() {
            var _this2 = this;

            var supportsPressRipple = this.supportsPressRipple_();
            this.registerRootHandlers_(supportsPressRipple);

            if (supportsPressRipple) {
              var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
                  ROOT = _MDCRippleFoundation$.ROOT,
                  UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;
              requestAnimationFrame(function () {
                _this2.adapter_.addClass(ROOT);

                if (_this2.adapter_.isUnbounded()) {
                  _this2.adapter_.addClass(UNBOUNDED); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


                  _this2.layoutInternal_();
                }
              });
            }
          }
          /** @override */

        }, {
          key: 'destroy',
          value: function destroy() {
            var _this3 = this;

            if (this.supportsPressRipple_()) {
              if (this.activationTimer_) {
                clearTimeout(this.activationTimer_);
                this.activationTimer_ = 0;
                this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
              }

              if (this.fgDeactivationRemovalTimer_) {
                clearTimeout(this.fgDeactivationRemovalTimer_);
                this.fgDeactivationRemovalTimer_ = 0;
                this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
              }

              var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
                  ROOT = _MDCRippleFoundation$2.ROOT,
                  UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;
              requestAnimationFrame(function () {
                _this3.adapter_.removeClass(ROOT);

                _this3.adapter_.removeClass(UNBOUNDED);

                _this3.removeCssVars_();
              });
            }

            this.deregisterRootHandlers_();
            this.deregisterDeactivationHandlers_();
          }
          /**
           * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
           * @private
           */

        }, {
          key: 'registerRootHandlers_',
          value: function registerRootHandlers_(supportsPressRipple) {
            var _this4 = this;

            if (supportsPressRipple) {
              ACTIVATION_EVENT_TYPES.forEach(function (type) {
                _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
              });

              if (this.adapter_.isUnbounded()) {
                this.adapter_.registerResizeHandler(this.resizeHandler_);
              }
            }

            this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
            this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
          }
          /**
           * @param {!Event} e
           * @private
           */

        }, {
          key: 'registerDeactivationHandlers_',
          value: function registerDeactivationHandlers_(e) {
            var _this5 = this;

            if (e.type === 'keydown') {
              this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
            } else {
              POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
                _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
              });
            }
          }
          /** @private */

        }, {
          key: 'deregisterRootHandlers_',
          value: function deregisterRootHandlers_() {
            var _this6 = this;

            ACTIVATION_EVENT_TYPES.forEach(function (type) {
              _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
            });
            this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
            this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

            if (this.adapter_.isUnbounded()) {
              this.adapter_.deregisterResizeHandler(this.resizeHandler_);
            }
          }
          /** @private */

        }, {
          key: 'deregisterDeactivationHandlers_',
          value: function deregisterDeactivationHandlers_() {
            var _this7 = this;

            this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
              _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
            });
          }
          /** @private */

        }, {
          key: 'removeCssVars_',
          value: function removeCssVars_() {
            var _this8 = this;

            var strings = MDCRippleFoundation.strings;
            Object.keys(strings).forEach(function (k) {
              if (k.indexOf('VAR_') === 0) {
                _this8.adapter_.updateCssVariable(strings[k], null);
              }
            });
          }
          /**
           * @param {!Event=} e
           * @private
           */

        }, {
          key: 'activate_',
          value: function activate_(e) {
            var _this9 = this;

            if (this.adapter_.isSurfaceDisabled()) {
              return;
            }

            var activationState = this.activationState_;

            if (activationState.isActivated) {
              return;
            } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


            var previousActivationEvent = this.previousActivationEvent_;
            var isSameInteraction = previousActivationEvent && e !== undefined && previousActivationEvent.type !== e.type;

            if (isSameInteraction) {
              return;
            }

            activationState.isActivated = true;
            activationState.isProgrammatic = e === undefined;
            activationState.activationEvent = e;
            activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e !== undefined && (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown');
            var hasActivatedChild = e !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
              return _this9.adapter_.containsEventTarget(target);
            });

            if (hasActivatedChild) {
              // Immediately reset activation state, while preserving logic that prevents touch follow-on events
              this.resetActivationState_();
              return;
            }

            if (e !== undefined) {
              activatedTargets.push(
              /** @type {!EventTarget} */
              e.target);
              this.registerDeactivationHandlers_(e);
            }

            activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

            if (activationState.wasElementMadeActive) {
              this.animateActivation_();
            }

            requestAnimationFrame(function () {
              // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
              activatedTargets = [];

              if (!activationState.wasElementMadeActive && e !== undefined && (e.key === ' ' || e.keyCode === 32)) {
                // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                // active states inconsistently when they're called within event handling code:
                // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                // variable is set within a rAF callback for a submit button interaction (#2241).
                activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);

                if (activationState.wasElementMadeActive) {
                  _this9.animateActivation_();
                }
              }

              if (!activationState.wasElementMadeActive) {
                // Reset activation state immediately if element was not made active.
                _this9.activationState_ = _this9.defaultActivationState_();
              }
            });
          }
          /**
           * @param {!Event=} e
           * @private
           */

        }, {
          key: 'checkElementMadeActive_',
          value: function checkElementMadeActive_(e) {
            return e !== undefined && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
          }
          /**
           * @param {!Event=} event Optional event containing position information.
           */

        }, {
          key: 'activate',
          value: function activate(event) {
            this.activate_(event);
          }
          /** @private */

        }, {
          key: 'animateActivation_',
          value: function animateActivation_() {
            var _this10 = this;

            var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
                VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
                VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
            var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
                FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
                FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
            var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
            this.layoutInternal_();
            var translateStart = '';
            var translateEnd = '';

            if (!this.adapter_.isUnbounded()) {
              var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
                  startPoint = _getFgTranslationCoor.startPoint,
                  endPoint = _getFgTranslationCoor.endPoint;

              translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
              translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
            }

            this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
            this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

            clearTimeout(this.activationTimer_);
            clearTimeout(this.fgDeactivationRemovalTimer_);
            this.rmBoundedActivationClasses_();
            this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

            this.adapter_.computeBoundingRect();
            this.adapter_.addClass(FG_ACTIVATION);
            this.activationTimer_ = setTimeout(function () {
              return _this10.activationTimerCallback_();
            }, DEACTIVATION_TIMEOUT_MS);
          }
          /**
           * @private
           * @return {{startPoint: PointType, endPoint: PointType}}
           */

        }, {
          key: 'getFgTranslationCoordinates_',
          value: function getFgTranslationCoordinates_() {
            var _activationState_ = this.activationState_,
                activationEvent = _activationState_.activationEvent,
                wasActivatedByPointer = _activationState_.wasActivatedByPointer;
            var startPoint = void 0;

            if (wasActivatedByPointer) {
              startPoint = Object(__WEBPACK_IMPORTED_MODULE_3__util__["getNormalizedEventCoords"])(
              /** @type {!Event} */
              activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
            } else {
              startPoint = {
                x: this.frame_.width / 2,
                y: this.frame_.height / 2
              };
            } // Center the element around the start point.


            startPoint = {
              x: startPoint.x - this.initialSize_ / 2,
              y: startPoint.y - this.initialSize_ / 2
            };
            var endPoint = {
              x: this.frame_.width / 2 - this.initialSize_ / 2,
              y: this.frame_.height / 2 - this.initialSize_ / 2
            };
            return {
              startPoint: startPoint,
              endPoint: endPoint
            };
          }
          /** @private */

        }, {
          key: 'runDeactivationUXLogicIfReady_',
          value: function runDeactivationUXLogicIfReady_() {
            var _this11 = this; // This method is called both when a pointing device is released, and when the activation animation ends.
            // The deactivation animation should only run after both of those occur.


            var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
            var _activationState_2 = this.activationState_,
                hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
                isActivated = _activationState_2.isActivated;
            var activationHasEnded = hasDeactivationUXRun || !isActivated;

            if (activationHasEnded && this.activationAnimationHasEnded_) {
              this.rmBoundedActivationClasses_();
              this.adapter_.addClass(FG_DEACTIVATION);
              this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                _this11.adapter_.removeClass(FG_DEACTIVATION);
              }, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* numbers */
              ].FG_DEACTIVATION_MS);
            }
          }
          /** @private */

        }, {
          key: 'rmBoundedActivationClasses_',
          value: function rmBoundedActivationClasses_() {
            var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
            this.adapter_.removeClass(FG_ACTIVATION);
            this.activationAnimationHasEnded_ = false;
            this.adapter_.computeBoundingRect();
          }
        }, {
          key: 'resetActivationState_',
          value: function resetActivationState_() {
            var _this12 = this;

            this.previousActivationEvent_ = this.activationState_.activationEvent;
            this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
            // Store the previous event until it's safe to assume that subsequent events are for new interactions.

            setTimeout(function () {
              return _this12.previousActivationEvent_ = undefined;
            }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
          }
          /**
           * @private
           */

        }, {
          key: 'deactivate_',
          value: function deactivate_() {
            var _this13 = this;

            var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

            if (!activationState.isActivated) {
              return;
            }

            var state =
            /** @type {!ActivationStateType} */
            _extends({}, activationState);

            if (activationState.isProgrammatic) {
              requestAnimationFrame(function () {
                return _this13.animateDeactivation_(state);
              });
              this.resetActivationState_();
            } else {
              this.deregisterDeactivationHandlers_();
              requestAnimationFrame(function () {
                _this13.activationState_.hasDeactivationUXRun = true;

                _this13.animateDeactivation_(state);

                _this13.resetActivationState_();
              });
            }
          }
        }, {
          key: 'deactivate',
          value: function deactivate() {
            this.deactivate_();
          }
          /**
           * @param {!ActivationStateType} options
           * @private
           */

        }, {
          key: 'animateDeactivation_',
          value: function animateDeactivation_(_ref) {
            var wasActivatedByPointer = _ref.wasActivatedByPointer,
                wasElementMadeActive = _ref.wasElementMadeActive;

            if (wasActivatedByPointer || wasElementMadeActive) {
              this.runDeactivationUXLogicIfReady_();
            }
          }
        }, {
          key: 'layout',
          value: function layout() {
            var _this14 = this;

            if (this.layoutFrame_) {
              cancelAnimationFrame(this.layoutFrame_);
            }

            this.layoutFrame_ = requestAnimationFrame(function () {
              _this14.layoutInternal_();

              _this14.layoutFrame_ = 0;
            });
          }
          /** @private */

        }, {
          key: 'layoutInternal_',
          value: function layoutInternal_() {
            var _this15 = this;

            this.frame_ = this.adapter_.computeBoundingRect();
            var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
            // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
            // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
            // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
            // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
            // `overflow: hidden`.

            var getBoundedRadius = function getBoundedRadius() {
              var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
              return hypotenuse + MDCRippleFoundation.numbers.PADDING;
            };

            this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

            this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
            this.fgScale_ = this.maxRadius_ / this.initialSize_;
            this.updateLayoutCssVars_();
          }
          /** @private */

        }, {
          key: 'updateLayoutCssVars_',
          value: function updateLayoutCssVars_() {
            var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
                VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
                VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
                VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
                VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;
            this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
            this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

            if (this.adapter_.isUnbounded()) {
              this.unboundedCoords_ = {
                left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
                top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
              };
              this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
              this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
            }
          }
          /** @param {boolean} unbounded */

        }, {
          key: 'setUnbounded',
          value: function setUnbounded(unbounded) {
            var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

            if (unbounded) {
              this.adapter_.addClass(UNBOUNDED);
            } else {
              this.adapter_.removeClass(UNBOUNDED);
            }
          }
        }, {
          key: 'handleFocus',
          value: function handleFocus() {
            var _this16 = this;

            requestAnimationFrame(function () {
              return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
            });
          }
        }, {
          key: 'handleBlur',
          value: function handleBlur() {
            var _this17 = this;

            requestAnimationFrame(function () {
              return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
            });
          }
        }]);

        return MDCRippleFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCRippleFoundation;
      /***/
    },
    /* 6 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "c", function () {
        return strings;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return numbers;
      });
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */


      var cssClasses = {
        // Ripple is a special case where the "root" component is really a "mixin" of sorts,
        // given that it's an 'upgrade' to an existing component. That being said it is the root
        // CSS class that all other CSS classes derive from.
        ROOT: 'mdc-ripple-upgraded',
        UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
        BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
        FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
        FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
      };
      var strings = {
        VAR_LEFT: '--mdc-ripple-left',
        VAR_TOP: '--mdc-ripple-top',
        VAR_FG_SIZE: '--mdc-ripple-fg-size',
        VAR_FG_SCALE: '--mdc-ripple-fg-scale',
        VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
        VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
      };
      var numbers = {
        PADDING: 10,
        INITIAL_ORIGIN_SCALE: 0.6,
        DEACTIVATION_TIMEOUT_MS: 225,
        // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
        FG_DEACTIVATION_MS: 150,
        // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
        TAP_DELAY_MS: 300
      };
      /***/
    },
    /* 7 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(1);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_0__foundation__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCComponent", function () {
        return __WEBPACK_IMPORTED_MODULE_1__component__["a"];
      });
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /***/

    },,,,
    /* 8 */

    /* 9 */

    /* 10 */

    /* 11 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "closest", function () {
        return closest;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "matches", function () {
        return matches;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
       * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
       */

      /**
       * @param {!Element} element
       * @param {string} selector
       * @return {?Element}
       */


      function closest(element, selector) {
        if (element.closest) {
          return element.closest(selector);
        }

        var el = element;

        while (el) {
          if (matches(el, selector)) {
            return el;
          }

          el = el.parentElement;
        }

        return null;
      }
      /**
       * @param {!Element} element
       * @param {string} selector
       * @return {boolean}
       */


      function matches(element, selector) {
        var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
        return nativeMatches.call(element, selector);
      }
      /***/

    },
    /* 12 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC List. Provides an interface for managing focus.
       *
       * Additionally, provides type information for the adapter to the Closure
       * compiler.
       *
       * Implement this adapter for your framework of choice to delegate updates to
       * the component in your framework of choice. See architecture documentation
       * for more details.
       * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
       *
       * @record
       */


      var MDCListAdapter = function () {
        function MDCListAdapter() {
          _classCallCheck(this, MDCListAdapter);
        }

        _createClass(MDCListAdapter, [{
          key: "getListItemCount",

          /** @return {number} */
          value: function getListItemCount() {}
          /**
           * @return {number} */

        }, {
          key: "getFocusedElementIndex",
          value: function getFocusedElementIndex() {}
          /**
           * @param {number} index
           * @param {string} attribute
           * @param {string} value
           */

        }, {
          key: "setAttributeForElementIndex",
          value: function setAttributeForElementIndex(index, attribute, value) {}
          /**
           * @param {number} index
           * @param {string} attribute
           */

        }, {
          key: "removeAttributeForElementIndex",
          value: function removeAttributeForElementIndex(index, attribute) {}
          /**
           * @param {number} index
           * @param {string} className
           */

        }, {
          key: "addClassForElementIndex",
          value: function addClassForElementIndex(index, className) {}
          /**
           * @param {number} index
           * @param {string} className
           */

        }, {
          key: "removeClassForElementIndex",
          value: function removeClassForElementIndex(index, className) {}
          /**
           * Focuses list item at the index specified.
           * @param {number} index
           */

        }, {
          key: "focusItemAtIndex",
          value: function focusItemAtIndex(index) {}
          /**
           * Sets the tabindex to the value specified for all button/a element children of
           * the list item at the index specified.
           * @param {number} listItemIndex
           * @param {number} tabIndexValue
           */

        }, {
          key: "setTabIndexForListItemChildren",
          value: function setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {}
          /**
           * If the given element has an href, follows the link.
           * @param {!Element} ele
           */

        }, {
          key: "followHref",
          value: function followHref(ele) {}
          /**
           * @param {number} index
           * @return {boolean} Returns true if radio button is present at given list item index.
           */

        }, {
          key: "hasRadioAtIndex",
          value: function hasRadioAtIndex(index) {}
          /**
           * @param {number} index
           * @return {boolean} Returns true if checkbox is present at given list item index.
           */

        }, {
          key: "hasCheckboxAtIndex",
          value: function hasCheckboxAtIndex(index) {}
          /**
           * @param {number} index
           * @return {boolean} Returns true if checkbox inside a list item is checked.
           */

        }, {
          key: "isCheckboxCheckedAtIndex",
          value: function isCheckboxCheckedAtIndex(index) {}
          /**
           * Sets the checked status of checkbox or radio at given list item index.
           * @param {number} index
           * @param {boolean} isChecked
           */

        }, {
          key: "setCheckedCheckboxOrRadioAtIndex",
          value: function setCheckedCheckboxOrRadioAtIndex(index, isChecked) {}
        }]);

        return MDCListAdapter;
      }();
      /* unused harmony default export */


      var _unused_webpack_default_export = MDCListAdapter;
      /***/
    },
    /* 13 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return strings;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var cssClasses = {
        ROOT: 'mdc-list',
        LIST_ITEM_CLASS: 'mdc-list-item',
        LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
        LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated'
      };
      /** @enum {string} */

      var strings = {
        ARIA_ORIENTATION: 'aria-orientation',
        ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
        ARIA_SELECTED: 'aria-selected',
        ARIA_CHECKED: 'aria-checked',
        ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
        RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)',
        CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
        CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
        CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: '.' + cssClasses.LIST_ITEM_CLASS + ' button:not(:disabled),\n  .' + cssClasses.LIST_ITEM_CLASS + ' a',
        FOCUSABLE_CHILD_ELEMENTS: '.' + cssClasses.LIST_ITEM_CLASS + ' button:not(:disabled), .' + cssClasses.LIST_ITEM_CLASS + ' a,\n  .' + cssClasses.LIST_ITEM_CLASS + ' input[type="radio"]:not(:disabled),\n  .' + cssClasses.LIST_ITEM_CLASS + ' input[type="checkbox"]:not(:disabled)',
        ENABLED_ITEMS_SELECTOR: '.mdc-list-item:not(.mdc-list-item--disabled)'
      };
      /***/
    },
    /* 14 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2017 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC Floating Label.
       *
       * Defines the shape of the adapter expected by the foundation. Implement this
       * adapter to integrate the floating label into your framework. See
       * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
       * for more information.
       *
       * @record
       */


      var MDCFloatingLabelAdapter = function () {
        function MDCFloatingLabelAdapter() {
          _classCallCheck(this, MDCFloatingLabelAdapter);
        }

        _createClass(MDCFloatingLabelAdapter, [{
          key: "addClass",

          /**
           * Adds a class to the label element.
           * @param {string} className
           */
          value: function addClass(className) {}
          /**
           * Removes a class from the label element.
           * @param {string} className
           */

        }, {
          key: "removeClass",
          value: function removeClass(className) {}
          /**
           * Returns the width of the label element.
           * @return {number}
           */

        }, {
          key: "getWidth",
          value: function getWidth() {}
          /**
           * Registers an event listener on the root element for a given event.
           * @param {string} evtType
           * @param {function(!Event): undefined} handler
           */

        }, {
          key: "registerInteractionHandler",
          value: function registerInteractionHandler(evtType, handler) {}
          /**
           * Deregisters an event listener on the root element for a given event.
           * @param {string} evtType
           * @param {function(!Event): undefined} handler
           */

        }, {
          key: "deregisterInteractionHandler",
          value: function deregisterInteractionHandler(evtType, handler) {}
        }]);

        return MDCFloatingLabelAdapter;
      }();
      /* unused harmony default export */


      var _unused_webpack_default_export = MDCFloatingLabelAdapter;
      /***/
    },,
    /* 15 */

    /* 16 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(12);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(13);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */


      var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

      var MDCListFoundation = function (_MDCFoundation) {
        _inherits(MDCListFoundation, _MDCFoundation);

        _createClass(MDCListFoundation, null, [{
          key: 'strings',

          /** @return enum {string} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ];
          }
          /** @return enum {string} */

        }, {
          key: 'cssClasses',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ];
          }
          /**
           * {@see MDCListAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCListAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCListAdapter} */
              {
                getListItemCount: function getListItemCount() {},
                getFocusedElementIndex: function getFocusedElementIndex() {},
                setAttributeForElementIndex: function setAttributeForElementIndex() {},
                removeAttributeForElementIndex: function removeAttributeForElementIndex() {},
                addClassForElementIndex: function addClassForElementIndex() {},
                removeClassForElementIndex: function removeClassForElementIndex() {},
                focusItemAtIndex: function focusItemAtIndex() {},
                setTabIndexForListItemChildren: function setTabIndexForListItemChildren() {},
                followHref: function followHref() {},
                hasRadioAtIndex: function hasRadioAtIndex() {},
                hasCheckboxAtIndex: function hasCheckboxAtIndex() {},
                isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex() {},
                setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex() {}
              }
            );
          }
          /**
           * @param {!MDCListAdapter=} adapter
           */

        }]);

        function MDCListFoundation(adapter) {
          _classCallCheck(this, MDCListFoundation);
          /** {boolean} */


          var _this = _possibleConstructorReturn(this, (MDCListFoundation.__proto__ || Object.getPrototypeOf(MDCListFoundation)).call(this, _extends(MDCListFoundation.defaultAdapter, adapter)));

          _this.wrapFocus_ = false;
          /** {boolean} */

          _this.isVertical_ = true;
          /** {boolean} */

          _this.isSingleSelectionList_ = false;
          /** {number} */

          _this.selectedIndex_ = -1;
          /** {boolean} */

          _this.useActivatedClass_ = false;
          return _this;
        }
        /**
         * Sets the private wrapFocus_ variable.
         * @param {boolean} value
         */


        _createClass(MDCListFoundation, [{
          key: 'setWrapFocus',
          value: function setWrapFocus(value) {
            this.wrapFocus_ = value;
          }
          /**
           * Sets the isVertical_ private variable.
           * @param {boolean} value
           */

        }, {
          key: 'setVerticalOrientation',
          value: function setVerticalOrientation(value) {
            this.isVertical_ = value;
          }
          /**
           * Sets the isSingleSelectionList_ private variable.
           * @param {boolean} value
           */

        }, {
          key: 'setSingleSelection',
          value: function setSingleSelection(value) {
            this.isSingleSelectionList_ = value;
          }
          /**
           * Sets the useActivatedClass_ private variable.
           * @param {boolean} useActivated
           */

        }, {
          key: 'setUseActivatedClass',
          value: function setUseActivatedClass(useActivated) {
            this.useActivatedClass_ = useActivated;
          }
          /** @param {number} index */

        }, {
          key: 'setSelectedIndex',
          value: function setSelectedIndex(index) {
            if (index < 0 || index >= this.adapter_.getListItemCount()) return;

            if (this.adapter_.hasCheckboxAtIndex(index)) {
              this.setAriaAttributesForCheckbox_(index);
            } else if (this.adapter_.hasRadioAtIndex(index)) {
              this.setAriaAttributesForRadio_(index);
            } else {
              this.setAriaAttributesForSingleSelect_(index);
              this.setClassNamesForSingleSelect_(index);
            }

            if (this.selectedIndex_ >= 0 && this.selectedIndex_ !== index) {
              this.adapter_.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', -1);
            } else if (this.selectedIndex_ === -1 && index !== 0) {
              // If no list item was selected set first list item's tabindex to -1.
              // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
              this.adapter_.setAttributeForElementIndex(0, 'tabindex', -1);
            }

            this.adapter_.setAttributeForElementIndex(index, 'tabindex', 0);
            this.selectedIndex_ = index;
          }
          /**
           * @param {number} index
           * @private
           */

        }, {
          key: 'setAriaAttributesForCheckbox_',
          value: function setAriaAttributesForCheckbox_(index) {
            var ariaAttributeValue = this.adapter_.isCheckboxCheckedAtIndex(index) ? 'true' : 'false';
            this.adapter_.setAttributeForElementIndex(index, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ].ARIA_CHECKED, ariaAttributeValue);
          }
          /**
           * @param {number} index
           * @private
           */

        }, {
          key: 'setAriaAttributesForRadio_',
          value: function setAriaAttributesForRadio_(index) {
            if (this.selectedIndex_ >= 0) {
              this.adapter_.setAttributeForElementIndex(this.selectedIndex_, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* strings */
              ].ARIA_CHECKED, 'false');
            }

            this.adapter_.setAttributeForElementIndex(index, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ].ARIA_CHECKED, 'true');
          }
          /**
          * @param {number} index
          * @private
          */

        }, {
          key: 'setAriaAttributesForSingleSelect_',
          value: function setAriaAttributesForSingleSelect_(index) {
            if (this.selectedIndex_ >= 0 && this.selectedIndex_ !== index) {
              this.adapter_.setAttributeForElementIndex(this.selectedIndex_, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* strings */
              ].ARIA_SELECTED, 'false');
            }

            this.adapter_.setAttributeForElementIndex(index, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ].ARIA_SELECTED, 'true');
          }
          /**
           * @param {number} index
           * @private
           */

        }, {
          key: 'setClassNamesForSingleSelect_',
          value: function setClassNamesForSingleSelect_(index) {
            var selectedClassName = __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].LIST_ITEM_SELECTED_CLASS;

            if (this.useActivatedClass_) {
              selectedClassName = __WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ].LIST_ITEM_ACTIVATED_CLASS;
            }

            if (this.selectedIndex_ >= 0) {
              this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
            }

            this.adapter_.addClassForElementIndex(index, selectedClassName);
          }
          /**
           * Focus in handler for the list items.
           * @param evt
           * @param {number} listItemIndex
           */

        }, {
          key: 'handleFocusIn',
          value: function handleFocusIn(evt, listItemIndex) {
            if (listItemIndex >= 0) {
              this.adapter_.setTabIndexForListItemChildren(listItemIndex, 0);
            }
          }
          /**
           * Focus out handler for the list items.
           * @param {Event} evt
           * @param {number} listItemIndex
           */

        }, {
          key: 'handleFocusOut',
          value: function handleFocusOut(evt, listItemIndex) {
            if (listItemIndex >= 0) {
              this.adapter_.setTabIndexForListItemChildren(listItemIndex, -1);
            }
          }
          /**
           * Key handler for the list.
           * @param {Event} evt
           * @param {boolean} isRootListItem
           * @param {number} listItemIndex
           */

        }, {
          key: 'handleKeydown',
          value: function handleKeydown(evt, isRootListItem, listItemIndex) {
            var arrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
            var arrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
            var arrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
            var arrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
            var isHome = evt.key === 'Home' || evt.keyCode === 36;
            var isEnd = evt.key === 'End' || evt.keyCode === 35;
            var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
            var isSpace = evt.key === 'Space' || evt.keyCode === 32;
            var currentIndex = this.adapter_.getFocusedElementIndex();

            if (currentIndex === -1) {
              currentIndex = listItemIndex;

              if (currentIndex < 0) {
                // If this event doesn't have a mdc-list-item ancestor from the
                // current list (not from a sublist), return early.
                return;
              }
            }

            if (this.isVertical_ && arrowDown || !this.isVertical_ && arrowRight) {
              this.preventDefaultEvent_(evt);
              this.focusNextElement(currentIndex);
            } else if (this.isVertical_ && arrowUp || !this.isVertical_ && arrowLeft) {
              this.preventDefaultEvent_(evt);
              this.focusPrevElement(currentIndex);
            } else if (isHome) {
              this.preventDefaultEvent_(evt);
              this.focusFirstElement();
            } else if (isEnd) {
              this.preventDefaultEvent_(evt);
              this.focusLastElement();
            } else if (isEnter || isSpace) {
              if (isRootListItem) {
                if (this.isSingleSelectionList_) {
                  // Check if the space key was pressed on the list item or a child element.
                  this.preventDefaultEvent_(evt);
                }

                var hasCheckboxOrRadio = this.hasCheckboxOrRadioAtIndex_(listItemIndex);

                if (hasCheckboxOrRadio) {
                  this.toggleCheckboxOrRadioAtIndex_(listItemIndex);
                  this.preventDefaultEvent_(evt);
                }

                if (this.isSingleSelectionList_ || hasCheckboxOrRadio) {
                  this.setSelectedIndex(currentIndex);
                } // Explicitly activate links, since we're preventing default on Enter, and Space doesn't activate them.


                this.adapter_.followHref(currentIndex);
              }
            }
          }
          /**
           * Click handler for the list.
           * @param {number} index
           * @param {boolean} toggleCheckbox
           */

        }, {
          key: 'handleClick',
          value: function handleClick(index, toggleCheckbox) {
            if (index === -1) return;

            if (toggleCheckbox) {
              this.toggleCheckboxOrRadioAtIndex_(index);
            }

            if (this.isSingleSelectionList_ || this.hasCheckboxOrRadioAtIndex_(index)) {
              this.setSelectedIndex(index);
            }
          }
          /**
           * Ensures that preventDefault is only called if the containing element doesn't
           * consume the event, and it will cause an unintended scroll.
           * @param {Event} evt
           * @private
           */

        }, {
          key: 'preventDefaultEvent_',
          value: function preventDefaultEvent_(evt) {
            var tagName = ('' + evt.target.tagName).toLowerCase();

            if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
              evt.preventDefault();
            }
          }
          /**
           * Focuses the next element on the list.
           * @param {number} index
           */

        }, {
          key: 'focusNextElement',
          value: function focusNextElement(index) {
            var count = this.adapter_.getListItemCount();
            var nextIndex = index + 1;

            if (nextIndex >= count) {
              if (this.wrapFocus_) {
                nextIndex = 0;
              } else {
                // Return early because last item is already focused.
                return;
              }
            }

            this.adapter_.focusItemAtIndex(nextIndex);
          }
          /**
           * Focuses the previous element on the list.
           * @param {number} index
           */

        }, {
          key: 'focusPrevElement',
          value: function focusPrevElement(index) {
            var prevIndex = index - 1;

            if (prevIndex < 0) {
              if (this.wrapFocus_) {
                prevIndex = this.adapter_.getListItemCount() - 1;
              } else {
                // Return early because first item is already focused.
                return;
              }
            }

            this.adapter_.focusItemAtIndex(prevIndex);
          }
        }, {
          key: 'focusFirstElement',
          value: function focusFirstElement() {
            if (this.adapter_.getListItemCount() > 0) {
              this.adapter_.focusItemAtIndex(0);
            }
          }
        }, {
          key: 'focusLastElement',
          value: function focusLastElement() {
            var lastIndex = this.adapter_.getListItemCount() - 1;

            if (lastIndex >= 0) {
              this.adapter_.focusItemAtIndex(lastIndex);
            }
          }
          /**
           * Toggles checkbox or radio at give index. Radio doesn't change the checked state if it is already checked.
           * @param {number} index
           * @private
           */

        }, {
          key: 'toggleCheckboxOrRadioAtIndex_',
          value: function toggleCheckboxOrRadioAtIndex_(index) {
            if (!this.hasCheckboxOrRadioAtIndex_(index)) return;
            var isChecked = true;

            if (this.adapter_.hasCheckboxAtIndex(index)) {
              isChecked = !this.adapter_.isCheckboxCheckedAtIndex(index);
            }

            this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
          }
          /**
           * @param {number} index
           * @return {boolean} Return true if list item contains checkbox or radio input at given index.
           */

        }, {
          key: 'hasCheckboxOrRadioAtIndex_',
          value: function hasCheckboxOrRadioAtIndex_(index) {
            return this.adapter_.hasCheckboxAtIndex(index) || this.adapter_.hasRadioAtIndex(index);
          }
        }]);

        return MDCListFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCListFoundation;
      /***/
    },
    /* 17 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCFloatingLabel", function () {
        return MDCFloatingLabel;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(14);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(27);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCFloatingLabelFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCComponent<!MDCFloatingLabelFoundation>}
       * @final
       */


      var MDCFloatingLabel = function (_MDCComponent) {
        _inherits(MDCFloatingLabel, _MDCComponent);

        function MDCFloatingLabel() {
          _classCallCheck(this, MDCFloatingLabel);

          return _possibleConstructorReturn(this, (MDCFloatingLabel.__proto__ || Object.getPrototypeOf(MDCFloatingLabel)).apply(this, arguments));
        }

        _createClass(MDCFloatingLabel, [{
          key: 'shake',

          /**
           * Styles the label to produce the label shake for errors.
           * @param {boolean} shouldShake styles the label to shake by adding shake class
           * if true, otherwise will stop shaking by removing shake class.
           */
          value: function shake(shouldShake) {
            this.foundation_.shake(shouldShake);
          }
          /**
           * Styles label to float/dock.
           * @param {boolean} shouldFloat styles the label to float by adding float class
           * if true, otherwise docks the label by removing the float class.
           */

        }, {
          key: 'float',
          value: function float(shouldFloat) {
            this.foundation_.float(shouldFloat);
          }
          /**
           * @return {number}
           */

        }, {
          key: 'getWidth',
          value: function getWidth() {
            return this.foundation_.getWidth();
          }
          /**
           * @return {!MDCFloatingLabelFoundation}
           */

        }, {
          key: 'getDefaultFoundation',
          value: function getDefaultFoundation() {
            var _this2 = this;

            return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
            /* default */
            ]({
              addClass: function addClass(className) {
                return _this2.root_.classList.add(className);
              },
              removeClass: function removeClass(className) {
                return _this2.root_.classList.remove(className);
              },
              getWidth: function getWidth() {
                return _this2.root_.offsetWidth;
              },
              registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                return _this2.root_.addEventListener(evtType, handler);
              },
              deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                return _this2.root_.removeEventListener(evtType, handler);
              }
            });
          }
        }], [{
          key: 'attachTo',

          /**
           * @param {!Element} root
           * @return {!MDCFloatingLabel}
           */
          value: function attachTo(root) {
            return new MDCFloatingLabel(root);
          }
        }]);

        return MDCFloatingLabel;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },
    /* 18 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return MDCMenuSurfaceFoundation;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return AnchorMargin;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(22);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(19);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @typedef {{
       *   top: number,
       *   right: number,
       *   bottom: number,
       *   left: number
       * }}
       */


      var AnchorMargin = void 0;
      /* eslint-disable no-unused-vars */

      /**
       * @typedef {{
       *   viewport: { width: number, height: number },
       *   viewportDistance: {top: number, right: number, bottom: number, left: number},
       *   anchorHeight: number,
       *   anchorWidth: number,
       *   surfaceHeight: number,
       *   surfaceWidth: number,
       *   bodyDimensions,
       *   windowScroll,
       * }}
       */

      var AutoLayoutMeasurements = void 0;
      /* eslint-enable no-unused-vars */

      /**
       * @extends {MDCFoundation<!MDCMenuSurfaceAdapter>}
       */

      var MDCMenuSurfaceFoundation = function (_MDCFoundation) {
        _inherits(MDCMenuSurfaceFoundation, _MDCFoundation);

        _createClass(MDCMenuSurfaceFoundation, null, [{
          key: 'cssClasses',

          /** @return enum{cssClasses} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["c"
            /* cssClasses */
            ];
          }
          /** @return enum{string} */

        }, {
          key: 'strings',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["e"
            /* strings */
            ];
          }
          /** @return enum {number} */

        }, {
          key: 'numbers',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["d"
            /* numbers */
            ];
          }
          /** @return enum{number} */

        }, {
          key: 'Corner',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* Corner */
            ];
          }
          /**
           * {@see MDCMenuSurfaceAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCMenuSurfaceAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCMenuSurfaceAdapter} */
              {
                addClass: function addClass() {},
                removeClass: function removeClass() {},
                hasClass: function hasClass() {
                  return false;
                },
                hasAnchor: function hasAnchor() {
                  return false;
                },
                notifyClose: function notifyClose() {},
                notifyOpen: function notifyOpen() {},
                isElementInContainer: function isElementInContainer() {
                  return false;
                },
                isRtl: function isRtl() {
                  return false;
                },
                setTransformOrigin: function setTransformOrigin() {},
                isFocused: function isFocused() {
                  return false;
                },
                saveFocus: function saveFocus() {},
                restoreFocus: function restoreFocus() {},
                isFirstElementFocused: function isFirstElementFocused() {},
                isLastElementFocused: function isLastElementFocused() {},
                focusFirstElement: function focusFirstElement() {},
                focusLastElement: function focusLastElement() {},
                getInnerDimensions: function getInnerDimensions() {
                  return {};
                },
                getAnchorDimensions: function getAnchorDimensions() {
                  return {};
                },
                getWindowDimensions: function getWindowDimensions() {
                  return {};
                },
                getBodyDimensions: function getBodyDimensions() {
                  return {};
                },
                getWindowScroll: function getWindowScroll() {
                  return {};
                },
                setPosition: function setPosition() {},
                setMaxHeight: function setMaxHeight() {}
              }
            );
          }
          /** @param {!MDCMenuSurfaceAdapter} adapter */

        }]);

        function MDCMenuSurfaceFoundation(adapter) {
          _classCallCheck(this, MDCMenuSurfaceFoundation);
          /** @private {boolean} */


          var _this = _possibleConstructorReturn(this, (MDCMenuSurfaceFoundation.__proto__ || Object.getPrototypeOf(MDCMenuSurfaceFoundation)).call(this, _extends(MDCMenuSurfaceFoundation.defaultAdapter, adapter)));

          _this.isOpen_ = false;
          /** @private {number} */

          _this.openAnimationEndTimerId_ = 0;
          /** @private {number} */

          _this.closeAnimationEndTimerId_ = 0;
          /** @private {number} */

          _this.animationRequestId_ = 0;
          /** @private {!{ width: number, height: number }} */

          _this.dimensions_;
          /** @private {!Corner} */

          _this.anchorCorner_ = __WEBPACK_IMPORTED_MODULE_2__constants__["a"
          /* Corner */
          ].TOP_START;
          /** @private {!AnchorMargin} */

          _this.anchorMargin_ = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          };
          /** @private {?AutoLayoutMeasurements} */

          _this.measures_ = null;
          /** @private {boolean} */

          _this.quickOpen_ = false;
          /** @private {boolean} */

          _this.hoistedElement_ = false;
          /** @private {boolean} */

          _this.isFixedPosition_ = false;
          /** @private {!{x: number, y: number}} */

          _this.position_ = {
            x: 0,
            y: 0
          };
          return _this;
        }

        _createClass(MDCMenuSurfaceFoundation, [{
          key: 'init',
          value: function init() {
            var _MDCMenuSurfaceFounda = MDCMenuSurfaceFoundation.cssClasses,
                ROOT = _MDCMenuSurfaceFounda.ROOT,
                OPEN = _MDCMenuSurfaceFounda.OPEN;

            if (!this.adapter_.hasClass(ROOT)) {
              throw new Error(ROOT + ' class required in root element.');
            }

            if (this.adapter_.hasClass(OPEN)) {
              this.isOpen_ = true;
            }
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            clearTimeout(this.openAnimationEndTimerId_);
            clearTimeout(this.closeAnimationEndTimerId_); // Cancel any currently running animations.

            cancelAnimationFrame(this.animationRequestId_);
          }
          /**
           * @param {!Corner} corner Default anchor corner alignment of top-left menu surface corner.
           */

        }, {
          key: 'setAnchorCorner',
          value: function setAnchorCorner(corner) {
            this.anchorCorner_ = corner;
          }
          /**
           * @param {!AnchorMargin} margin set of margin values from anchor.
           */

        }, {
          key: 'setAnchorMargin',
          value: function setAnchorMargin(margin) {
            this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
            this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
            this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
            this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
          }
          /**
           * Used to indicate if the menu-surface is hoisted to the body.
           * @param {boolean} isHoisted
           */

        }, {
          key: 'setIsHoisted',
          value: function setIsHoisted(isHoisted) {
            this.hoistedElement_ = isHoisted;
          }
          /**
           * Used to set the menu-surface calculations based on a fixed position menu.
           * @param {boolean} isFixedPosition
           */

        }, {
          key: 'setFixedPosition',
          value: function setFixedPosition(isFixedPosition) {
            this.isFixedPosition_ = isFixedPosition;
          }
          /**
           * Sets the menu-surface position on the page.
           * @param {number} x
           * @param {number} y
           */

        }, {
          key: 'setAbsolutePosition',
          value: function setAbsolutePosition(x, y) {
            this.position_.x = this.typeCheckisFinite_(x) ? x : 0;
            this.position_.y = this.typeCheckisFinite_(y) ? y : 0;
          }
          /** @param {boolean} quickOpen */

        }, {
          key: 'setQuickOpen',
          value: function setQuickOpen(quickOpen) {
            this.quickOpen_ = quickOpen;
          }
          /**
           * Handle clicks and close if not within menu-surface element.
           * @param {!Event} evt
           */

        }, {
          key: 'handleBodyClick',
          value: function handleBodyClick(evt) {
            var el = evt.target;

            if (this.adapter_.isElementInContainer(el)) {
              return;
            }

            this.close();
          }
        }, {
          key: 'handleKeydown',

          /**
           * Handle keys that close the surface.
           * @param {!Event} evt
           */
          value: function handleKeydown(evt) {
            var keyCode = evt.keyCode,
                key = evt.key,
                shiftKey = evt.shiftKey;
            var isEscape = key === 'Escape' || keyCode === 27;
            var isTab = key === 'Tab' || keyCode === 9;

            if (isEscape) {
              this.close();
            } else if (isTab) {
              if (this.adapter_.isLastElementFocused() && !shiftKey) {
                this.adapter_.focusFirstElement();
                evt.preventDefault();
              } else if (this.adapter_.isFirstElementFocused() && shiftKey) {
                this.adapter_.focusLastElement();
                evt.preventDefault();
              }
            }
          }
          /**
           * @return {!AutoLayoutMeasurements} Measurements used to position menu surface popup.
           */

        }, {
          key: 'getAutoLayoutMeasurements_',
          value: function getAutoLayoutMeasurements_() {
            var anchorRect = this.adapter_.getAnchorDimensions();
            var viewport = this.adapter_.getWindowDimensions();
            var bodyDimensions = this.adapter_.getBodyDimensions();
            var windowScroll = this.adapter_.getWindowScroll();

            if (!anchorRect) {
              anchorRect =
              /** @type {ClientRect} */
              {
                x: this.position_.x,
                y: this.position_.y,
                top: this.position_.y,
                bottom: this.position_.y,
                left: this.position_.x,
                right: this.position_.x,
                height: 0,
                width: 0
              };
            }

            return {
              viewport: viewport,
              bodyDimensions: bodyDimensions,
              windowScroll: windowScroll,
              viewportDistance: {
                top: anchorRect.top,
                right: viewport.width - anchorRect.right,
                left: anchorRect.left,
                bottom: viewport.height - anchorRect.bottom
              },
              anchorHeight: anchorRect.height,
              anchorWidth: anchorRect.width,
              surfaceHeight: this.dimensions_.height,
              surfaceWidth: this.dimensions_.width
            };
          }
          /**
           * Computes the corner of the anchor from which to animate and position the menu surface.
           * @return {!Corner}
           * @private
           */

        }, {
          key: 'getOriginCorner_',
          value: function getOriginCorner_() {
            // Defaults: open from the top left.
            var corner = __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* Corner */
            ].TOP_LEFT;
            var _measures_ = this.measures_,
                viewportDistance = _measures_.viewportDistance,
                anchorHeight = _measures_.anchorHeight,
                anchorWidth = _measures_.anchorWidth,
                surfaceHeight = _measures_.surfaceHeight,
                surfaceWidth = _measures_.surfaceWidth;
            var isBottomAligned = Boolean(this.anchorCorner_ & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].BOTTOM);
            var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
            var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;
            var topOverflow = surfaceHeight - availableTop;
            var bottomOverflow = surfaceHeight - availableBottom;

            if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
              corner |= __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* CornerBit */
              ].BOTTOM;
            }

            var isRtl = this.adapter_.isRtl();
            var isFlipRtl = Boolean(this.anchorCorner_ & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].FLIP_RTL);
            var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].RIGHT);
            var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
            var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
            var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;
            var leftOverflow = surfaceWidth - availableLeft;
            var rightOverflow = surfaceWidth - availableRight;

            if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
              corner |= __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* CornerBit */
              ].RIGHT;
            }

            return (
              /** @type {Corner} */
              corner
            );
          }
          /**
           * @param {!Corner} corner Origin corner of the menu surface.
           * @return {number} Horizontal offset of menu surface origin corner from corresponding anchor corner.
           * @private
           */

        }, {
          key: 'getHorizontalOriginOffset_',
          value: function getHorizontalOriginOffset_(corner) {
            var anchorWidth = this.measures_.anchorWidth; // isRightAligned corresponds to using the 'right' property on the surface.

            var isRightAligned = Boolean(corner & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].RIGHT);
            var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].RIGHT);

            if (isRightAligned) {
              var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right; // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
              // when we calculate the right value (`adjustPositionForHoistedElement_`) based on the element position,
              // the right property is correct.

              if (this.hoistedElement_ || this.isFixedPosition_) {
                return rightOffset - (this.measures_.viewport.width - this.measures_.bodyDimensions.width);
              }

              return rightOffset;
            }

            return avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
          }
          /**
           * @param {!Corner} corner Origin corner of the menu surface.
           * @return {number} Vertical offset of menu surface origin corner from corresponding anchor corner.
           * @private
           */

        }, {
          key: 'getVerticalOriginOffset_',
          value: function getVerticalOriginOffset_(corner) {
            var anchorHeight = this.measures_.anchorHeight;
            var isBottomAligned = Boolean(corner & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].BOTTOM);
            var avoidVerticalOverlap = Boolean(this.anchorCorner_ & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].BOTTOM);
            var y = 0;

            if (isBottomAligned) {
              y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
            } else {
              y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
            }

            return y;
          }
          /**
           * @param {!Corner} corner Origin corner of the menu surface.
           * @return {number} Maximum height of the menu surface, based on available space. 0 indicates should not be set.
           * @private
           */

        }, {
          key: 'getMenuSurfaceMaxHeight_',
          value: function getMenuSurfaceMaxHeight_(corner) {
            var maxHeight = 0;
            var viewportDistance = this.measures_.viewportDistance;
            var isBottomAligned = Boolean(corner & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].BOTTOM);
            var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE; // When maximum height is not specified, it is handled from css.

            if (isBottomAligned) {
              maxHeight = viewportDistance.top + this.anchorMargin_.top - MARGIN_TO_EDGE;

              if (!(this.anchorCorner_ & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* CornerBit */
              ].BOTTOM)) {
                maxHeight += this.measures_.anchorHeight;
              }
            } else {
              maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom + this.measures_.anchorHeight - MARGIN_TO_EDGE;

              if (this.anchorCorner_ & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* CornerBit */
              ].BOTTOM) {
                maxHeight -= this.measures_.anchorHeight;
              }
            }

            return maxHeight;
          }
          /** @private */

        }, {
          key: 'autoPosition_',
          value: function autoPosition_() {
            var _position; // Compute measurements for autoposition methods reuse.


            this.measures_ = this.getAutoLayoutMeasurements_();
            var corner = this.getOriginCorner_();
            var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight_(corner);
            var verticalAlignment = corner & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].BOTTOM ? 'bottom' : 'top';
            var horizontalAlignment = corner & __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* CornerBit */
            ].RIGHT ? 'right' : 'left';
            var horizontalOffset = this.getHorizontalOriginOffset_(corner);
            var verticalOffset = this.getVerticalOriginOffset_(corner);
            var position = (_position = {}, _defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset : '0'), _defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset : '0'), _position);
            var _measures_2 = this.measures_,
                anchorWidth = _measures_2.anchorWidth,
                surfaceWidth = _measures_2.surfaceWidth; // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.

            if (anchorWidth / surfaceWidth > __WEBPACK_IMPORTED_MODULE_2__constants__["d"
            /* numbers */
            ].ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
              horizontalAlignment = 'center';
            } // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element


            if (this.hoistedElement_ || this.isFixedPosition_) {
              position = this.adjustPositionForHoistedElement_(position);
            }

            for (var prop in position) {
              if (position.hasOwnProperty(prop) && position[prop] !== '0') {
                position[prop] = parseInt(position[prop], 10) + 'px';
              }
            }

            this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
            this.adapter_.setPosition(position);
            this.adapter_.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : ''); // Clear measures after positioning is complete.

            this.measures_ = null;
          }
          /**
           * Calculates the offsets for positioning the menu-surface when the menu-surface has been
           * hoisted to the body.
           * @param {!{
           *   top: (string|undefined),
           *   right: (string|undefined),
           *   bottom: (string|undefined),
           *   left: (string|undefined)
           * }} position
           * @return {!{
           *   top: (string|undefined),
           *   right: (string|undefined),
           *   bottom: (string|undefined),
           *   left: (string|undefined)
           * }} position
           * @private
           */

        }, {
          key: 'adjustPositionForHoistedElement_',
          value: function adjustPositionForHoistedElement_(position) {
            var _measures_3 = this.measures_,
                windowScroll = _measures_3.windowScroll,
                viewportDistance = _measures_3.viewportDistance;

            for (var prop in position) {
              if (position.hasOwnProperty(prop)) {
                // Hoisted surfaces need to have the anchor elements location on the page added to the
                // position properties for proper alignment on the body.
                if (viewportDistance.hasOwnProperty(prop)) {
                  position[prop] = parseInt(position[prop], 10) + viewportDistance[prop];
                } // Surfaces that are absolutely positioned need to have additional calculations for scroll
                // and bottom positioning.


                if (!this.isFixedPosition_) {
                  if (prop === 'top') {
                    position[prop] = parseInt(position[prop], 10) + windowScroll.y;
                  } else if (prop === 'bottom') {
                    position[prop] = parseInt(position[prop], 10) - windowScroll.y;
                  } else if (prop === 'left') {
                    position[prop] = parseInt(position[prop], 10) + windowScroll.x;
                  } else if (prop === 'right') {
                    position[prop] = parseInt(position[prop], 10) - windowScroll.x;
                  }
                }
              }
            }

            return position;
          }
          /**
           * Open the menu surface.
           */

        }, {
          key: 'open',
          value: function open() {
            var _this2 = this;

            this.adapter_.saveFocus();

            if (!this.quickOpen_) {
              this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
            }

            this.animationRequestId_ = requestAnimationFrame(function () {
              _this2.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

              _this2.dimensions_ = _this2.adapter_.getInnerDimensions();

              _this2.autoPosition_();

              if (_this2.quickOpen_) {
                _this2.adapter_.notifyOpen();
              } else {
                _this2.openAnimationEndTimerId_ = setTimeout(function () {
                  _this2.openAnimationEndTimerId_ = 0;

                  _this2.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);

                  _this2.adapter_.notifyOpen();
                }, __WEBPACK_IMPORTED_MODULE_2__constants__["d"
                /* numbers */
                ].TRANSITION_OPEN_DURATION);
              }
            });
            this.isOpen_ = true;
          }
          /**
           * Closes the menu surface.
           */

        }, {
          key: 'close',
          value: function close() {
            var _this3 = this;

            if (!this.quickOpen_) {
              this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
            }

            requestAnimationFrame(function () {
              _this3.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);

              if (_this3.quickOpen_) {
                _this3.adapter_.notifyClose();
              } else {
                _this3.closeAnimationEndTimerId_ = setTimeout(function () {
                  _this3.closeAnimationEndTimerId_ = 0;

                  _this3.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);

                  _this3.adapter_.notifyClose();
                }, __WEBPACK_IMPORTED_MODULE_2__constants__["d"
                /* numbers */
                ].TRANSITION_CLOSE_DURATION);
              }
            });
            this.isOpen_ = false;
            this.maybeRestoreFocus_();
          }
          /**
           * The last focused element when the menu surface was opened should regain focus, if the user is
           * focused on or within the menu surface when it is closed.
           * @private
           */

        }, {
          key: 'maybeRestoreFocus_',
          value: function maybeRestoreFocus_() {
            if (this.adapter_.isFocused() || this.adapter_.isElementInContainer(document.activeElement)) {
              this.adapter_.restoreFocus();
            }
          }
          /** @return {boolean} */

        }, {
          key: 'isOpen',
          value: function isOpen() {
            return this.isOpen_;
          }
          /**
           * isFinite that doesn't force conversion to number type.
           * Equivalent to Number.isFinite in ES2015, but is not included in IE11.
           * @param {number} num
           * @return {boolean}
           * @private
           */

        }, {
          key: 'typeCheckisFinite_',
          value: function typeCheckisFinite_(num) {
            return typeof num === 'number' && isFinite(num);
          }
        }]);

        return MDCMenuSurfaceFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /***/

    },
    /* 19 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "c", function () {
        return cssClasses;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "e", function () {
        return strings;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "d", function () {
        return numbers;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return CornerBit;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return Corner;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var cssClasses = {
        ANCHOR: 'mdc-menu-surface--anchor',
        ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
        ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
        FIXED: 'mdc-menu-surface--fixed',
        OPEN: 'mdc-menu-surface--open',
        ROOT: 'mdc-menu-surface'
      };
      /** @enum {string} */

      var strings = {
        CLOSED_EVENT: 'MDCMenuSurface:closed',
        OPENED_EVENT: 'MDCMenuSurface:opened',
        FOCUSABLE_ELEMENTS: 'button:not(:disabled), [href]:not([aria-disabled="true"]), input:not(:disabled), ' + 'select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'
      };
      /** @enum {number} */

      var numbers = {
        // Total duration of menu-surface open animation.
        TRANSITION_OPEN_DURATION: 120,
        // Total duration of menu-surface close animation.
        TRANSITION_CLOSE_DURATION: 75,
        // Margin left to the edge of the viewport when menu-surface is at maximum possible height.
        MARGIN_TO_EDGE: 32,
        // Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning.
        ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67
      };
      /**
       * Enum for bits in the {@see Corner) bitmap.
       * @enum {number}
       */

      var CornerBit = {
        BOTTOM: 1,
        CENTER: 2,
        RIGHT: 4,
        FLIP_RTL: 8
      };
      /**
       * Enum for representing an element corner for positioning the menu-surface.
       *
       * The START constants map to LEFT if element directionality is left
       * to right and RIGHT if the directionality is right to left.
       * Likewise END maps to RIGHT or LEFT depending on the directionality.
       *
       * @enum {number}
       */

      var Corner = {
        TOP_LEFT: 0,
        TOP_RIGHT: CornerBit.RIGHT,
        BOTTOM_LEFT: CornerBit.BOTTOM,
        BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
        TOP_START: CornerBit.FLIP_RTL,
        TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
        BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
        BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
      };
      /***/
    },,
    /* 20 */

    /* 21 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC TextField Line Ripple.
       *
       * Defines the shape of the adapter expected by the foundation. Implement this
       * adapter to integrate the line ripple into your framework. See
       * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
       * for more information.
       *
       * @record
       */


      var MDCLineRippleAdapter = function () {
        function MDCLineRippleAdapter() {
          _classCallCheck(this, MDCLineRippleAdapter);
        }

        _createClass(MDCLineRippleAdapter, [{
          key: "addClass",

          /**
           * Adds a class to the line ripple element.
           * @param {string} className
           */
          value: function addClass(className) {}
          /**
           * Removes a class from the line ripple element.
           * @param {string} className
           */

        }, {
          key: "removeClass",
          value: function removeClass(className) {}
          /**
           * @param {string} className
           * @return {boolean}
           */

        }, {
          key: "hasClass",
          value: function hasClass(className) {}
          /**
           * Sets the style property with propertyName to value on the root element.
           * @param {string} propertyName
           * @param {string} value
           */

        }, {
          key: "setStyle",
          value: function setStyle(propertyName, value) {}
          /**
           * Registers an event listener on the line ripple element for a given event.
           * @param {string} evtType
           * @param {function(!Event): undefined} handler
           */

        }, {
          key: "registerEventHandler",
          value: function registerEventHandler(evtType, handler) {}
          /**
           * Deregisters an event listener on the line ripple element for a given event.
           * @param {string} evtType
           * @param {function(!Event): undefined} handler
           */

        }, {
          key: "deregisterEventHandler",
          value: function deregisterEventHandler(evtType, handler) {}
        }]);

        return MDCLineRippleAdapter;
      }();
      /* unused harmony default export */


      var _unused_webpack_default_export = MDCLineRippleAdapter;
      /***/
    },
    /* 22 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* unused harmony export MDCMenuSurfaceAdapter */

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDCMenuSurface. Provides an interface for managing
       * - classes
       * - dom
       * - focus
       * - position
       * - dimensions
       * - event handlers
       *
       * Additionally, provides type information for the adapter to the Closure
       * compiler.
       *
       * Implement this adapter for your framework of choice to delegate updates to
       * the component in your framework of choice. See architecture documentation
       * for more details.
       * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
       *
       * @record
       */


      var MDCMenuSurfaceAdapter = function () {
        function MDCMenuSurfaceAdapter() {
          _classCallCheck(this, MDCMenuSurfaceAdapter);
        }

        _createClass(MDCMenuSurfaceAdapter, [{
          key: "addClass",

          /** @param {string} className */
          value: function addClass(className) {}
          /** @param {string} className */

        }, {
          key: "removeClass",
          value: function removeClass(className) {}
          /**
           * @param {string} className
           * @return {boolean}
           */

        }, {
          key: "hasClass",
          value: function hasClass(className) {}
          /** @return {boolean} */

        }, {
          key: "hasAnchor",
          value: function hasAnchor() {}
          /** Emits an event when the menu surface is closed. */

        }, {
          key: "notifyClose",
          value: function notifyClose() {}
          /** Emits an event when the menu surface is opened. */

        }, {
          key: "notifyOpen",
          value: function notifyOpen() {}
          /**
           * @return {boolean}
           * @param {EventTarget} el
           */

        }, {
          key: "isElementInContainer",
          value: function isElementInContainer(el) {}
          /** @return {boolean} */

        }, {
          key: "isRtl",
          value: function isRtl() {}
          /** @param {string} origin */

        }, {
          key: "setTransformOrigin",
          value: function setTransformOrigin(origin) {}
          /** @return {boolean} */

        }, {
          key: "isFocused",
          value: function isFocused() {}
          /** Saves the element that was focused before the menu surface was opened. */

        }, {
          key: "saveFocus",
          value: function saveFocus() {}
          /** Restores focus to the element that was focused before the menu surface was opened. */

        }, {
          key: "restoreFocus",
          value: function restoreFocus() {}
          /** @return {boolean} */

        }, {
          key: "isFirstElementFocused",
          value: function isFirstElementFocused() {}
          /** @return {boolean} */

        }, {
          key: "isLastElementFocused",
          value: function isLastElementFocused() {}
          /** Focuses the first focusable element in the menu-surface. */

        }, {
          key: "focusFirstElement",
          value: function focusFirstElement() {}
          /** Focuses the first focusable element in the menu-surface. */

        }, {
          key: "focusLastElement",
          value: function focusLastElement() {}
          /** @return {!{width: number, height: number}} */

        }, {
          key: "getInnerDimensions",
          value: function getInnerDimensions() {}
          /** @return {!{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

        }, {
          key: "getAnchorDimensions",
          value: function getAnchorDimensions() {}
          /** @return {!{ width: number, height: number }} */

        }, {
          key: "getWindowDimensions",
          value: function getWindowDimensions() {}
          /** @return {!{ width: number, height: number }} */

        }, {
          key: "getBodyDimensions",
          value: function getBodyDimensions() {}
          /** @return {!{ width: number, height: number }} */

        }, {
          key: "getWindowScroll",
          value: function getWindowScroll() {}
          /** @param {!{
          *   top: (string|undefined),
          *   right: (string|undefined),
          *   bottom: (string|undefined),
          *   left: (string|undefined)
          * }} position */

        }, {
          key: "setPosition",
          value: function setPosition(position) {}
          /** @param {string} height */

        }, {
          key: "setMaxHeight",
          value: function setMaxHeight(height) {}
        }]);

        return MDCMenuSurfaceAdapter;
      }();
      /***/

    },
    /* 23 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2017 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC Notched Outline.
       *
       * Defines the shape of the adapter expected by the foundation. Implement this
       * adapter to integrate the Notched Outline into your framework. See
       * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
       * for more information.
       *
       * @record
       */


      var MDCNotchedOutlineAdapter = function () {
        function MDCNotchedOutlineAdapter() {
          _classCallCheck(this, MDCNotchedOutlineAdapter);
        }

        _createClass(MDCNotchedOutlineAdapter, [{
          key: "addClass",

          /**
           * Adds a class to the root element.
           * @param {string} className
           */
          value: function addClass(className) {}
          /**
           * Removes a class from the root element.
           * @param {string} className
           */

        }, {
          key: "removeClass",
          value: function removeClass(className) {}
          /**
           * Sets the width style property of the notch element.
           * @param {number} width
           */

        }, {
          key: "setNotchWidthProperty",
          value: function setNotchWidthProperty(width) {}
        }]);

        return MDCNotchedOutlineAdapter;
      }();
      /* unused harmony default export */


      var _unused_webpack_default_export = MDCNotchedOutlineAdapter;
      /***/
    },
    /* 24 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return numbers;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "c", function () {
        return strings;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var strings = {
        NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch'
      };
      /** @enum {number} */

      var numbers = {
        // This should stay in sync with $mdc-notched-outline-padding * 2.
        NOTCH_ELEMENT_PADDING: 8
      };
      /** @enum {string} */

      var cssClasses = {
        OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
        OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded',
        NO_LABEL: 'mdc-notched-outline--no-label'
      };
      /***/
    },,
    /* 25 */

    /* 26 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCList", function () {
        return MDCList;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__foundation__ = __webpack_require__(16);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__adapter__ = __webpack_require__(12);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__material_dom_ponyfill__ = __webpack_require__(11);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(13);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCListFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_1__foundation__["a"];
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends MDCComponent<!MDCListFoundation>
       */


      var MDCList = function (_MDCComponent) {
        _inherits(MDCList, _MDCComponent);
        /** @param {...?} args */


        function MDCList() {
          var _ref;

          _classCallCheck(this, MDCList);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /** @private {!Function} */


          var _this = _possibleConstructorReturn(this, (_ref = MDCList.__proto__ || Object.getPrototypeOf(MDCList)).call.apply(_ref, [this].concat(args)));

          _this.handleKeydown_;
          /** @private {!Function} */

          _this.handleClick_;
          /** @private {!Function} */

          _this.focusInEventListener_;
          /** @private {!Function} */

          _this.focusOutEventListener_;
          return _this;
        }
        /**
         * @param {!Element} root
         * @return {!MDCList}
         */


        _createClass(MDCList, [{
          key: 'destroy',
          value: function destroy() {
            this.root_.removeEventListener('keydown', this.handleKeydown_);
            this.root_.removeEventListener('click', this.handleClick_);
            this.root_.removeEventListener('focusin', this.focusInEventListener_);
            this.root_.removeEventListener('focusout', this.focusOutEventListener_);
          }
        }, {
          key: 'initialSyncWithDOM',
          value: function initialSyncWithDOM() {
            this.handleClick_ = this.handleClickEvent_.bind(this);
            this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
            this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
            this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
            this.root_.addEventListener('keydown', this.handleKeydown_);
            this.root_.addEventListener('focusin', this.focusInEventListener_);
            this.root_.addEventListener('focusout', this.focusOutEventListener_);
            this.root_.addEventListener('click', this.handleClick_);
            this.layout();
            this.initializeListType();
          }
        }, {
          key: 'layout',
          value: function layout() {
            var direction = this.root_.getAttribute(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
            /* strings */
            ].ARIA_ORIENTATION);
            this.vertical = direction !== __WEBPACK_IMPORTED_MODULE_4__constants__["b"
            /* strings */
            ].ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

            [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(function (ele) {
              ele.setAttribute('tabindex', -1);
            }); // Child button/a elements are not tabbable until the list item is focused.

            [].slice.call(this.root_.querySelectorAll(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
            /* strings */
            ].FOCUSABLE_CHILD_ELEMENTS)).forEach(function (ele) {
              return ele.setAttribute('tabindex', -1);
            });
          }
          /**
           * Used to figure out which list item this event is targetting. Or returns -1 if
           * there is no list item
           * @param {Event} evt
           * @private
           */

        }, {
          key: 'getListItemIndex_',
          value: function getListItemIndex_(evt) {
            var eventTarget =
            /** @type {HTMLElement} */
            evt.target;
            var index = -1; // Find the first ancestor that is a list item or the list.

            while (!eventTarget.classList.contains(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].LIST_ITEM_CLASS) && !eventTarget.classList.contains(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].ROOT)) {
              eventTarget = eventTarget.parentElement;
            } // Get the index of the element if it is a list item.


            if (eventTarget.classList.contains(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].LIST_ITEM_CLASS)) {
              index = this.listElements.indexOf(eventTarget);
            }

            return index;
          }
          /**
           * Used to figure out which element was clicked before sending the event to the foundation.
           * @param {Event} evt
           * @private
           */

        }, {
          key: 'handleFocusInEvent_',
          value: function handleFocusInEvent_(evt) {
            var index = this.getListItemIndex_(evt);
            this.foundation_.handleFocusIn(evt, index);
          }
          /**
           * Used to figure out which element was clicked before sending the event to the foundation.
           * @param {Event} evt
           * @private
           */

        }, {
          key: 'handleFocusOutEvent_',
          value: function handleFocusOutEvent_(evt) {
            var index = this.getListItemIndex_(evt);
            this.foundation_.handleFocusOut(evt, index);
          }
          /**
           * Used to figure out which element was focused when keydown event occurred before sending the event to the
           * foundation.
           * @param {Event} evt
           * @private
           */

        }, {
          key: 'handleKeydownEvent_',
          value: function handleKeydownEvent_(evt) {
            var index = this.getListItemIndex_(evt);

            if (index >= 0) {
              this.foundation_.handleKeydown(evt, evt.target.classList.contains(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
              /* cssClasses */
              ].LIST_ITEM_CLASS), index);
            }
          }
          /**
           * Used to figure out which element was clicked before sending the event to the foundation.
           * @param {Event} evt
           * @private
           */

        }, {
          key: 'handleClickEvent_',
          value: function handleClickEvent_(evt) {
            var index = this.getListItemIndex_(evt); // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

            var toggleCheckbox = !Object(__WEBPACK_IMPORTED_MODULE_3__material_dom_ponyfill__["matches"])(
            /** @type {!Element} */
            evt.target, __WEBPACK_IMPORTED_MODULE_4__constants__["b"
            /* strings */
            ].CHECKBOX_RADIO_SELECTOR);
            this.foundation_.handleClick(index, toggleCheckbox);
          }
        }, {
          key: 'initializeListType',
          value: function initializeListType() {
            // Pre-selected list item in single selected list or checked list item if list with radio input.
            var preselectedElement = this.root_.querySelector('.' + __WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].LIST_ITEM_ACTIVATED_CLASS + ',\n        .' + __WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].LIST_ITEM_SELECTED_CLASS + ',\n        ' + __WEBPACK_IMPORTED_MODULE_4__constants__["b"
            /* strings */
            ].ARIA_CHECKED_RADIO_SELECTOR);

            if (preselectedElement) {
              if (preselectedElement.classList.contains(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
              /* cssClasses */
              ].LIST_ITEM_ACTIVATED_CLASS)) {
                this.foundation_.setUseActivatedClass(true);
              }

              this.singleSelection = true; // Automatically set selected index if single select list type or list with radio inputs.

              this.selectedIndex = this.listElements.indexOf(preselectedElement);
            }
          }
          /** @param {boolean} value */

        }, {
          key: 'getDefaultFoundation',

          /** @return {!MDCListFoundation} */
          value: function getDefaultFoundation() {
            var _this2 = this;

            return new __WEBPACK_IMPORTED_MODULE_1__foundation__["a"
            /* default */
            ](
            /** @type {!MDCListAdapter} */
            _extends({
              getListItemCount: function getListItemCount() {
                return _this2.listElements.length;
              },
              getFocusedElementIndex: function getFocusedElementIndex() {
                return _this2.listElements.indexOf(document.activeElement);
              },
              setAttributeForElementIndex: function setAttributeForElementIndex(index, attr, value) {
                var element = _this2.listElements[index];

                if (element) {
                  element.setAttribute(attr, value);
                }
              },
              removeAttributeForElementIndex: function removeAttributeForElementIndex(index, attr) {
                var element = _this2.listElements[index];

                if (element) {
                  element.removeAttribute(attr);
                }
              },
              addClassForElementIndex: function addClassForElementIndex(index, className) {
                var element = _this2.listElements[index];

                if (element) {
                  element.classList.add(className);
                }
              },
              removeClassForElementIndex: function removeClassForElementIndex(index, className) {
                var element = _this2.listElements[index];

                if (element) {
                  element.classList.remove(className);
                }
              },
              focusItemAtIndex: function focusItemAtIndex(index) {
                var element = _this2.listElements[index];

                if (element) {
                  element.focus();
                }
              },
              setTabIndexForListItemChildren: function setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
                var element = _this2.listElements[listItemIndex];
                var listItemChildren = [].slice.call(element.querySelectorAll(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
                /* strings */
                ].CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
                listItemChildren.forEach(function (ele) {
                  return ele.setAttribute('tabindex', tabIndexValue);
                });
              },
              followHref: function followHref(index) {
                var listItem = _this2.listElements[index];

                if (listItem && listItem.href) {
                  listItem.click();
                }
              },
              hasCheckboxAtIndex: function hasCheckboxAtIndex(index) {
                var listItem = _this2.listElements[index];
                return !!listItem.querySelector(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
                /* strings */
                ].CHECKBOX_SELECTOR);
              },
              hasRadioAtIndex: function hasRadioAtIndex(index) {
                var listItem = _this2.listElements[index];
                return !!listItem.querySelector(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
                /* strings */
                ].RADIO_SELECTOR);
              },
              isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex(index) {
                var listItem = _this2.listElements[index];
                var toggleEl = listItem.querySelector(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
                /* strings */
                ].CHECKBOX_SELECTOR);
                return toggleEl.checked;
              },
              setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex(index, isChecked) {
                var listItem = _this2.listElements[index];
                var toggleEl = listItem.querySelector(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
                /* strings */
                ].CHECKBOX_RADIO_SELECTOR);
                toggleEl.checked = isChecked;
                var event = document.createEvent('Event');
                event.initEvent('change', true, true);
                toggleEl.dispatchEvent(event);
              }
            }));
          }
        }, {
          key: 'vertical',
          set: function set(value) {
            this.foundation_.setVerticalOrientation(value);
          }
          /** @return Array<!Element>*/

        }, {
          key: 'listElements',
          get: function get() {
            return [].slice.call(this.root_.querySelectorAll(__WEBPACK_IMPORTED_MODULE_4__constants__["b"
            /* strings */
            ].ENABLED_ITEMS_SELECTOR));
          }
          /** @param {boolean} value */

        }, {
          key: 'wrapFocus',
          set: function set(value) {
            this.foundation_.setWrapFocus(value);
          }
          /** @param {boolean} isSingleSelectionList */

        }, {
          key: 'singleSelection',
          set: function set(isSingleSelectionList) {
            this.foundation_.setSingleSelection(isSingleSelectionList);
          }
          /** @param {number} index */

        }, {
          key: 'selectedIndex',
          set: function set(index) {
            this.foundation_.setSelectedIndex(index);
          }
        }], [{
          key: 'attachTo',
          value: function attachTo(root) {
            return new MDCList(root);
          }
        }]);

        return MDCList;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },
    /* 27 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(14);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(28);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
       * @final
       */


      var MDCFloatingLabelFoundation = function (_MDCFoundation) {
        _inherits(MDCFloatingLabelFoundation, _MDCFoundation);

        _createClass(MDCFloatingLabelFoundation, null, [{
          key: 'cssClasses',

          /** @return enum {string} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ];
          }
          /**
           * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCFloatingLabelAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCFloatingLabelAdapter} */
              {
                addClass: function addClass() {},
                removeClass: function removeClass() {},
                getWidth: function getWidth() {},
                registerInteractionHandler: function registerInteractionHandler() {},
                deregisterInteractionHandler: function deregisterInteractionHandler() {}
              }
            );
          }
          /**
           * @param {!MDCFloatingLabelAdapter} adapter
           */

        }]);

        function MDCFloatingLabelFoundation(adapter) {
          _classCallCheck(this, MDCFloatingLabelFoundation);
          /** @private {function(!Event): undefined} */


          var _this = _possibleConstructorReturn(this, (MDCFloatingLabelFoundation.__proto__ || Object.getPrototypeOf(MDCFloatingLabelFoundation)).call(this, _extends(MDCFloatingLabelFoundation.defaultAdapter, adapter)));

          _this.shakeAnimationEndHandler_ = function () {
            return _this.handleShakeAnimationEnd_();
          };

          return _this;
        }

        _createClass(MDCFloatingLabelFoundation, [{
          key: 'init',
          value: function init() {
            this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
          }
          /**
           * Returns the width of the label element.
           * @return {number}
           */

        }, {
          key: 'getWidth',
          value: function getWidth() {
            return this.adapter_.getWidth();
          }
          /**
           * Styles the label to produce the label shake for errors.
           * @param {boolean} shouldShake adds shake class if true,
           * otherwise removes shake class.
           */

        }, {
          key: 'shake',
          value: function shake(shouldShake) {
            var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

            if (shouldShake) {
              this.adapter_.addClass(LABEL_SHAKE);
            } else {
              this.adapter_.removeClass(LABEL_SHAKE);
            }
          }
          /**
           * Styles the label to float or dock.
           * @param {boolean} shouldFloat adds float class if true, otherwise remove
           * float and shake class to dock label.
           */

        }, {
          key: 'float',
          value: function float(shouldFloat) {
            var _MDCFloatingLabelFoun = MDCFloatingLabelFoundation.cssClasses,
                LABEL_FLOAT_ABOVE = _MDCFloatingLabelFoun.LABEL_FLOAT_ABOVE,
                LABEL_SHAKE = _MDCFloatingLabelFoun.LABEL_SHAKE;

            if (shouldFloat) {
              this.adapter_.addClass(LABEL_FLOAT_ABOVE);
            } else {
              this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
              this.adapter_.removeClass(LABEL_SHAKE);
            }
          }
          /**
           * Handles an interaction event on the root element.
           */

        }, {
          key: 'handleShakeAnimationEnd_',
          value: function handleShakeAnimationEnd_() {
            var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
            this.adapter_.removeClass(LABEL_SHAKE);
          }
        }]);

        return MDCFloatingLabelFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCFloatingLabelFoundation;
      /***/
    },
    /* 28 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var cssClasses = {
        LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
        LABEL_SHAKE: 'mdc-floating-label--shake',
        ROOT: 'mdc-floating-label'
      };
      /***/
    },,
    /* 29 */

    /* 30 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return strings;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var cssClasses = {
        ROOT: 'mdc-menu',
        MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
        MENU_SELECTION_GROUP: 'mdc-menu__selection-group'
      };
      /** @enum {string} */

      var strings = {
        SELECTED_EVENT: 'MDCMenu:selected',
        ARIA_SELECTED_ATTR: 'aria-selected',
        LIST_SELECTOR: '.mdc-list',
        CHECKBOX_SELECTOR: 'input[type="checkbox"]'
      };
      /***/
    },
    /* 31 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCLineRipple", function () {
        return MDCLineRipple;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(21);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(32);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCLineRippleFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCComponent<!MDCLineRippleFoundation>}
       * @final
       */


      var MDCLineRipple = function (_MDCComponent) {
        _inherits(MDCLineRipple, _MDCComponent);

        function MDCLineRipple() {
          _classCallCheck(this, MDCLineRipple);

          return _possibleConstructorReturn(this, (MDCLineRipple.__proto__ || Object.getPrototypeOf(MDCLineRipple)).apply(this, arguments));
        }

        _createClass(MDCLineRipple, [{
          key: 'activate',

          /**
           * Activates the line ripple
           */
          value: function activate() {
            this.foundation_.activate();
          }
          /**
           * Deactivates the line ripple
           */

        }, {
          key: 'deactivate',
          value: function deactivate() {
            this.foundation_.deactivate();
          }
          /**
           * Sets the transform origin given a user's click location. The `rippleCenter` is the
           * x-coordinate of the middle of the ripple.
           * @param {number} xCoordinate
           */

        }, {
          key: 'setRippleCenter',
          value: function setRippleCenter(xCoordinate) {
            this.foundation_.setRippleCenter(xCoordinate);
          }
          /**
           * @return {!MDCLineRippleFoundation}
           */

        }, {
          key: 'getDefaultFoundation',
          value: function getDefaultFoundation() {
            var _this2 = this;

            return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
            /* default */
            ](
            /** @type {!MDCLineRippleAdapter} */
            _extends({
              addClass: function addClass(className) {
                return _this2.root_.classList.add(className);
              },
              removeClass: function removeClass(className) {
                return _this2.root_.classList.remove(className);
              },
              hasClass: function hasClass(className) {
                return _this2.root_.classList.contains(className);
              },
              setStyle: function setStyle(propertyName, value) {
                return _this2.root_.style[propertyName] = value;
              },
              registerEventHandler: function registerEventHandler(evtType, handler) {
                return _this2.root_.addEventListener(evtType, handler);
              },
              deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
                return _this2.root_.removeEventListener(evtType, handler);
              }
            }));
          }
        }], [{
          key: 'attachTo',

          /**
           * @param {!Element} root
           * @return {!MDCLineRipple}
           */
          value: function attachTo(root) {
            return new MDCLineRipple(root);
          }
        }]);

        return MDCLineRipple;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },
    /* 32 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(21);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(33);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCFoundation<!MDCLineRippleAdapter>}
       * @final
       */


      var MDCLineRippleFoundation = function (_MDCFoundation) {
        _inherits(MDCLineRippleFoundation, _MDCFoundation);

        _createClass(MDCLineRippleFoundation, null, [{
          key: 'cssClasses',

          /** @return enum {string} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ];
          }
          /**
           * {@see MDCLineRippleAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCLineRippleAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCLineRippleAdapter} */
              {
                addClass: function addClass() {},
                removeClass: function removeClass() {},
                hasClass: function hasClass() {},
                setStyle: function setStyle() {},
                registerEventHandler: function registerEventHandler() {},
                deregisterEventHandler: function deregisterEventHandler() {}
              }
            );
          }
          /**
           * @param {!MDCLineRippleAdapter=} adapter
           */

        }]);

        function MDCLineRippleFoundation(adapter) {
          _classCallCheck(this, MDCLineRippleFoundation);
          /** @private {function(!Event): undefined} */


          var _this = _possibleConstructorReturn(this, (MDCLineRippleFoundation.__proto__ || Object.getPrototypeOf(MDCLineRippleFoundation)).call(this, _extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

          _this.transitionEndHandler_ = function (evt) {
            return _this.handleTransitionEnd(evt);
          };

          return _this;
        }

        _createClass(MDCLineRippleFoundation, [{
          key: 'init',
          value: function init() {
            this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
          }
          /**
           * Activates the line ripple
           */

        }, {
          key: 'activate',
          value: function activate() {
            this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].LINE_RIPPLE_DEACTIVATING);
            this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].LINE_RIPPLE_ACTIVE);
          }
          /**
           * Sets the center of the ripple animation to the given X coordinate.
           * @param {number} xCoordinate
           */

        }, {
          key: 'setRippleCenter',
          value: function setRippleCenter(xCoordinate) {
            this.adapter_.setStyle('transform-origin', xCoordinate + 'px center');
          }
          /**
           * Deactivates the line ripple
           */

        }, {
          key: 'deactivate',
          value: function deactivate() {
            this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].LINE_RIPPLE_DEACTIVATING);
          }
          /**
           * Handles a transition end event
           * @param {!Event} evt
           */

        }, {
          key: 'handleTransitionEnd',
          value: function handleTransitionEnd(evt) {
            // Wait for the line ripple to be either transparent or opaque
            // before emitting the animation end event
            var isDeactivating = this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].LINE_RIPPLE_DEACTIVATING);

            if (evt.propertyName === 'opacity') {
              if (isDeactivating) {
                this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
                /* cssClasses */
                ].LINE_RIPPLE_ACTIVE);
                this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
                /* cssClasses */
                ].LINE_RIPPLE_DEACTIVATING);
              }
            }
          }
        }]);

        return MDCLineRippleFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCLineRippleFoundation;
      /***/
    },
    /* 33 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var cssClasses = {
        LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
        LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
      };
      /***/
    },
    /* 34 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCMenuSurface", function () {
        return MDCMenuSurface;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(35);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(18);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__adapter__ = __webpack_require__(22);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(19);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCMenuSurfaceFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["b"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "AnchorMargin", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "Corner", function () {
        return __WEBPACK_IMPORTED_MODULE_4__constants__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "CornerBit", function () {
        return __WEBPACK_IMPORTED_MODULE_4__constants__["b"];
      });
      /* harmony reexport (module object) */


      __webpack_require__.d(__webpack_exports__, "util", function () {
        return __WEBPACK_IMPORTED_MODULE_1__util__;
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends MDCComponent<!MDCMenuSurfaceFoundation>
       */


      var MDCMenuSurface = function (_MDCComponent) {
        _inherits(MDCMenuSurface, _MDCComponent);
        /** @param {...?} args */


        function MDCMenuSurface() {
          var _ref;

          _classCallCheck(this, MDCMenuSurface);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /** @private {!Element} */


          var _this = _possibleConstructorReturn(this, (_ref = MDCMenuSurface.__proto__ || Object.getPrototypeOf(MDCMenuSurface)).call.apply(_ref, [this].concat(args)));

          _this.previousFocus_;
          /** @private {!Element} */

          _this.anchorElement;
          /** @private {Element} */

          _this.firstFocusableElement_;
          /** @private {Element} */

          _this.lastFocusableElement_;
          /** @private {!Function} */

          _this.handleKeydown_;
          /** @private {!Function} */

          _this.handleBodyClick_;
          /** @private {!Function} */

          _this.registerBodyClickListener_;
          /** @private {!Function} */

          _this.deregisterBodyClickListener_;
          return _this;
        }
        /**
         * @param {!Element} root
         * @return {!MDCMenuSurface}
         */


        _createClass(MDCMenuSurface, [{
          key: 'initialSyncWithDOM',
          value: function initialSyncWithDOM() {
            var _this2 = this;

            if (this.root_.parentElement && this.root_.parentElement.classList.contains(__WEBPACK_IMPORTED_MODULE_4__constants__["c"
            /* cssClasses */
            ].ANCHOR)) {
              this.anchorElement = this.root_.parentElement;
            }

            if (this.root_.classList.contains(__WEBPACK_IMPORTED_MODULE_4__constants__["c"
            /* cssClasses */
            ].FIXED)) {
              this.setFixedPosition(true);
            }

            this.handleKeydown_ = function (evt) {
              return _this2.foundation_.handleKeydown(evt);
            };

            this.handleBodyClick_ = function (evt) {
              return _this2.foundation_.handleBodyClick(evt);
            };

            this.registerBodyClickListener_ = function () {
              return document.body.addEventListener('click', _this2.handleBodyClick_);
            };

            this.deregisterBodyClickListener_ = function () {
              return document.body.removeEventListener('click', _this2.handleBodyClick_);
            };

            this.root_.addEventListener('keydown', this.handleKeydown_);
            this.root_.addEventListener(__WEBPACK_IMPORTED_MODULE_4__constants__["e"
            /* strings */
            ].OPENED_EVENT, this.registerBodyClickListener_);
            this.root_.addEventListener(__WEBPACK_IMPORTED_MODULE_4__constants__["e"
            /* strings */
            ].CLOSED_EVENT, this.deregisterBodyClickListener_);
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            this.root_.removeEventListener('keydown', this.handleKeydown_);
            this.root_.removeEventListener(__WEBPACK_IMPORTED_MODULE_4__constants__["e"
            /* strings */
            ].OPENED_EVENT, this.registerBodyClickListener_);
            this.root_.removeEventListener(__WEBPACK_IMPORTED_MODULE_4__constants__["e"
            /* strings */
            ].CLOSED_EVENT, this.deregisterBodyClickListener_);

            _get(MDCMenuSurface.prototype.__proto__ || Object.getPrototypeOf(MDCMenuSurface.prototype), 'destroy', this).call(this);
          }
          /** @return {boolean} */

        }, {
          key: 'hoistMenuToBody',

          /**
           * Removes the menu-surface from it's current location and appends it to the
           * body to overcome any overflow:hidden issues.
           */
          value: function hoistMenuToBody() {
            document.body.appendChild(this.root_.parentElement.removeChild(this.root_));
            this.setIsHoisted(true);
          }
          /**
           * Sets the foundation to use page offsets for an positioning when the menu
           * is hoisted to the body.
           * @param {boolean} isHoisted
           */

        }, {
          key: 'setIsHoisted',
          value: function setIsHoisted(isHoisted) {
            this.foundation_.setIsHoisted(isHoisted);
          }
          /**
           * Sets the element that the menu-surface is anchored to.
           * @param {!Element} element
           */

        }, {
          key: 'setMenuSurfaceAnchorElement',
          value: function setMenuSurfaceAnchorElement(element) {
            this.anchorElement = element;
          }
          /**
           * Sets the menu-surface to position: fixed.
           * @param {boolean} isFixed
           */

        }, {
          key: 'setFixedPosition',
          value: function setFixedPosition(isFixed) {
            if (isFixed) {
              this.root_.classList.add(__WEBPACK_IMPORTED_MODULE_4__constants__["c"
              /* cssClasses */
              ].FIXED);
            } else {
              this.root_.classList.remove(__WEBPACK_IMPORTED_MODULE_4__constants__["c"
              /* cssClasses */
              ].FIXED);
            }

            this.foundation_.setFixedPosition(isFixed);
          }
          /**
           * Sets the absolute x/y position to position based on. Requires the menu to be hoisted.
           * @param {number} x
           * @param {number} y
           */

        }, {
          key: 'setAbsolutePosition',
          value: function setAbsolutePosition(x, y) {
            this.foundation_.setAbsolutePosition(x, y);
            this.setIsHoisted(true);
          }
          /**
           * @param {!Corner} corner Default anchor corner alignment of top-left
           *     surface corner.
           */

        }, {
          key: 'setAnchorCorner',
          value: function setAnchorCorner(corner) {
            this.foundation_.setAnchorCorner(corner);
          }
          /**
           * @param {!AnchorMargin} margin
           */

        }, {
          key: 'setAnchorMargin',
          value: function setAnchorMargin(margin) {
            this.foundation_.setAnchorMargin(margin);
          }
          /** @param {boolean} quickOpen */

        }, {
          key: 'getDefaultFoundation',

          /** @return {!MDCMenuSurfaceFoundation} */
          value: function getDefaultFoundation() {
            var _this3 = this;

            return new __WEBPACK_IMPORTED_MODULE_2__foundation__["b"
            /* MDCMenuSurfaceFoundation */
            ](
            /** @type {!MDCMenuSurfaceAdapter} */
            _extends({
              addClass: function addClass(className) {
                return _this3.root_.classList.add(className);
              },
              removeClass: function removeClass(className) {
                return _this3.root_.classList.remove(className);
              },
              hasClass: function hasClass(className) {
                return _this3.root_.classList.contains(className);
              },
              hasAnchor: function hasAnchor() {
                return !!_this3.anchorElement;
              },
              notifyClose: function notifyClose() {
                return _this3.emit(__WEBPACK_IMPORTED_MODULE_2__foundation__["b"
                /* MDCMenuSurfaceFoundation */
                ].strings.CLOSED_EVENT, {});
              },
              notifyOpen: function notifyOpen() {
                return _this3.emit(__WEBPACK_IMPORTED_MODULE_2__foundation__["b"
                /* MDCMenuSurfaceFoundation */
                ].strings.OPENED_EVENT, {});
              },
              isElementInContainer: function isElementInContainer(el) {
                return _this3.root_ === el || _this3.root_.contains(el);
              },
              isRtl: function isRtl() {
                return getComputedStyle(_this3.root_).getPropertyValue('direction') === 'rtl';
              },
              setTransformOrigin: function setTransformOrigin(origin) {
                _this3.root_.style[__WEBPACK_IMPORTED_MODULE_1__util__["getTransformPropertyName"](window) + '-origin'] = origin;
              }
            }, this.getFocusAdapterMethods_(), this.getDimensionAdapterMethods_()));
          }
          /**
           * @return {!{
           * isFocused: function(): boolean,
           * saveFocus: function(),
           * restoreFocus: function(),
           * isFirstElementFocused: function(): boolean,
           * isLastElementFocused: function(): boolean,
           * focusFirstElement: function(),
           * focusLastElement: function(),
           * }}
           * @private
           */

        }, {
          key: 'getFocusAdapterMethods_',
          value: function getFocusAdapterMethods_() {
            var _this4 = this;

            return {
              isFocused: function isFocused() {
                return document.activeElement === _this4.root_;
              },
              saveFocus: function saveFocus() {
                _this4.previousFocus_ = document.activeElement;
              },
              restoreFocus: function restoreFocus() {
                if (_this4.root_.contains(document.activeElement)) {
                  if (_this4.previousFocus_ && _this4.previousFocus_.focus) {
                    _this4.previousFocus_.focus();
                  }
                }
              },
              isFirstElementFocused: function isFirstElementFocused() {
                return _this4.firstFocusableElement_ && _this4.firstFocusableElement_ === document.activeElement;
              },
              isLastElementFocused: function isLastElementFocused() {
                return _this4.lastFocusableElement_ && _this4.lastFocusableElement_ === document.activeElement;
              },
              focusFirstElement: function focusFirstElement() {
                return _this4.firstFocusableElement_ && _this4.firstFocusableElement_.focus && _this4.firstFocusableElement_.focus();
              },
              focusLastElement: function focusLastElement() {
                return _this4.lastFocusableElement_ && _this4.lastFocusableElement_.focus && _this4.lastFocusableElement_.focus();
              }
            };
          }
          /**
           * @return {!{
           * getInnerDimensions: function(),
           * getAnchorDimensions: function(): (HTMLElement | null | * | ClientRect),
           * getWindowDimensions: function(),
           * setPosition: function(*),
           * setMaxHeight: function(string)}}
           * @private
           */

        }, {
          key: 'getDimensionAdapterMethods_',
          value: function getDimensionAdapterMethods_() {
            var _this5 = this;

            return {
              getInnerDimensions: function getInnerDimensions() {
                return {
                  width: _this5.root_.offsetWidth,
                  height: _this5.root_.offsetHeight
                };
              },
              getAnchorDimensions: function getAnchorDimensions() {
                return _this5.anchorElement && _this5.anchorElement.getBoundingClientRect();
              },
              getWindowDimensions: function getWindowDimensions() {
                return {
                  width: window.innerWidth,
                  height: window.innerHeight
                };
              },
              getBodyDimensions: function getBodyDimensions() {
                return {
                  width: document.body.clientWidth,
                  height: document.body.clientHeight
                };
              },
              getWindowScroll: function getWindowScroll() {
                return {
                  x: window.pageXOffset,
                  y: window.pageYOffset
                };
              },
              setPosition: function setPosition(position) {
                _this5.root_.style.left = 'left' in position ? position.left : null;
                _this5.root_.style.right = 'right' in position ? position.right : null;
                _this5.root_.style.top = 'top' in position ? position.top : null;
                _this5.root_.style.bottom = 'bottom' in position ? position.bottom : null;
              },
              setMaxHeight: function setMaxHeight(height) {
                _this5.root_.style.maxHeight = height;
              }
            };
          }
        }, {
          key: 'open',
          get: function get() {
            return this.foundation_.isOpen();
          }
          /** @param {boolean} value */
          ,
          set: function set(value) {
            if (value) {
              var focusableElements = this.root_.querySelectorAll(__WEBPACK_IMPORTED_MODULE_4__constants__["e"
              /* strings */
              ].FOCUSABLE_ELEMENTS);
              this.firstFocusableElement_ = focusableElements.length > 0 ? focusableElements[0] : null;
              this.lastFocusableElement_ = focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
              this.foundation_.open();
            } else {
              this.foundation_.close();
            }
          }
        }, {
          key: 'quickOpen',
          set: function set(quickOpen) {
            this.foundation_.setQuickOpen(quickOpen);
          }
        }], [{
          key: 'attachTo',
          value: function attachTo(root) {
            return new MDCMenuSurface(root);
          }
        }]);

        return MDCMenuSurface;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },
    /* 35 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "getTransformPropertyName", function () {
        return getTransformPropertyName;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @type {string|undefined} */


      var storedTransformPropertyName_ = void 0;
      /**
       * Returns the name of the correct transform property to use on the current browser.
       * @param {!Window} globalObj
       * @param {boolean=} forceRefresh
       * @return {string}
       */

      function getTransformPropertyName(globalObj) {
        var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (storedTransformPropertyName_ === undefined || forceRefresh) {
          var el = globalObj.document.createElement('div');
          var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
          storedTransformPropertyName_ = transformPropertyName;
        }

        return storedTransformPropertyName_;
      }
      /***/

    },
    /* 36 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCNotchedOutline", function () {
        return MDCNotchedOutline;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(23);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(37);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__material_floating_label_index__ = __webpack_require__(17);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(24);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCNotchedOutlineFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2017 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCComponent<!MDCNotchedOutlineFoundation>}
       * @final
       */


      var MDCNotchedOutline = function (_MDCComponent) {
        _inherits(MDCNotchedOutline, _MDCComponent);

        _createClass(MDCNotchedOutline, null, [{
          key: 'attachTo',

          /**
           * @param {!Element} root
           * @return {!MDCNotchedOutline}
           */
          value: function attachTo(root) {
            return new MDCNotchedOutline(root);
          }
          /** @param {...?} args */

        }]);

        function MDCNotchedOutline() {
          var _ref;

          _classCallCheck(this, MDCNotchedOutline);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /** @private {Element} */


          var _this = _possibleConstructorReturn(this, (_ref = MDCNotchedOutline.__proto__ || Object.getPrototypeOf(MDCNotchedOutline)).call.apply(_ref, [this].concat(args)));

          _this.notchElement_;
          return _this;
        }

        _createClass(MDCNotchedOutline, [{
          key: 'initialSyncWithDOM',
          value: function initialSyncWithDOM() {
            var label = this.root_.querySelector('.' + __WEBPACK_IMPORTED_MODULE_3__material_floating_label_index__["MDCFloatingLabelFoundation"].cssClasses.ROOT);
            this.notchElement_ = this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_4__constants__["c"
            /* strings */
            ].NOTCH_ELEMENT_SELECTOR);

            if (label) {
              label.style.transitionDuration = '0s';
              this.root_.classList.add(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
              /* cssClasses */
              ].OUTLINE_UPGRADED);
              requestAnimationFrame(function () {
                label.style.transitionDuration = '';
              });
            } else {
              this.root_.classList.add(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
              /* cssClasses */
              ].NO_LABEL);
            }
          }
          /**
            * Updates classes and styles to open the notch to the specified width.
            * @param {number} notchWidth The notch width in the outline.
            */

        }, {
          key: 'notch',
          value: function notch(notchWidth) {
            this.foundation_.notch(notchWidth);
          }
          /**
           * Updates classes and styles to close the notch.
           */

        }, {
          key: 'closeNotch',
          value: function closeNotch() {
            this.foundation_.closeNotch();
          }
          /**
           * @return {!MDCNotchedOutlineFoundation}
           */

        }, {
          key: 'getDefaultFoundation',
          value: function getDefaultFoundation() {
            var _this2 = this;

            return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
            /* default */
            ](
            /** @type {!MDCNotchedOutlineAdapter} */
            _extends({
              addClass: function addClass(className) {
                return _this2.root_.classList.add(className);
              },
              removeClass: function removeClass(className) {
                return _this2.root_.classList.remove(className);
              },
              setNotchWidthProperty: function setNotchWidthProperty(width) {
                return _this2.notchElement_.style.setProperty('width', width > 0 ? width + 'px' : '0');
              }
            }));
          }
        }]);

        return MDCNotchedOutline;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },
    /* 37 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(23);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(24);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2017 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
       * @final
       */


      var MDCNotchedOutlineFoundation = function (_MDCFoundation) {
        _inherits(MDCNotchedOutlineFoundation, _MDCFoundation);

        _createClass(MDCNotchedOutlineFoundation, null, [{
          key: 'strings',

          /** @return enum {string} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["c"
            /* strings */
            ];
          }
          /** @return enum {string} */

        }, {
          key: 'cssClasses',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ];
          }
          /** @return enum {number} */

        }, {
          key: 'numbers',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* numbers */
            ];
          }
          /**
           * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCNotchedOutlineAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCNotchedOutlineAdapter} */
              {
                addClass: function addClass() {},
                removeClass: function removeClass() {},
                setNotchWidthProperty: function setNotchWidthProperty() {}
              }
            );
          }
          /**
           * @param {!MDCNotchedOutlineAdapter} adapter
           */

        }]);

        function MDCNotchedOutlineFoundation(adapter) {
          _classCallCheck(this, MDCNotchedOutlineFoundation);

          return _possibleConstructorReturn(this, (MDCNotchedOutlineFoundation.__proto__ || Object.getPrototypeOf(MDCNotchedOutlineFoundation)).call(this, _extends(MDCNotchedOutlineFoundation.defaultAdapter, adapter)));
        }
        /**
         * Adds the outline notched selector and updates the notch width
         * calculated based off of notchWidth.
         * @param {number} notchWidth
         */


        _createClass(MDCNotchedOutlineFoundation, [{
          key: 'notch',
          value: function notch(notchWidth) {
            var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

            if (notchWidth > 0) {
              notchWidth += __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* numbers */
              ].NOTCH_ELEMENT_PADDING; // Add padding from left/right.
            }

            this.adapter_.setNotchWidthProperty(notchWidth);
            this.adapter_.addClass(OUTLINE_NOTCHED);
          }
          /**
           * Removes notched outline selector to close the notch in the outline.
           */

        }, {
          key: 'closeNotch',
          value: function closeNotch() {
            var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
            this.adapter_.removeClass(OUTLINE_NOTCHED);
            this.adapter_.setNotchWidthProperty(0);
          }
        }]);

        return MDCNotchedOutlineFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCNotchedOutlineFoundation;
      /***/
    },,,,,,,,,,,
    /* 38 */

    /* 39 */

    /* 40 */

    /* 41 */

    /* 42 */

    /* 43 */

    /* 44 */

    /* 45 */

    /* 46 */

    /* 47 */

    /* 48 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCMenu", function () {
        return MDCMenu;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__foundation__ = __webpack_require__(49);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(30);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__material_menu_surface_index__ = __webpack_require__(34);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__material_menu_surface_foundation__ = __webpack_require__(18);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__material_list_index__ = __webpack_require__(26);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCMenuFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_1__foundation__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "AnchorMargin", function () {
        return __WEBPACK_IMPORTED_MODULE_4__material_menu_surface_foundation__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "Corner", function () {
        return __WEBPACK_IMPORTED_MODULE_3__material_menu_surface_index__["Corner"];
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends MDCComponent<!MDCMenuFoundation>
       */


      var MDCMenu = function (_MDCComponent) {
        _inherits(MDCMenu, _MDCComponent);
        /** @param {...?} args */


        function MDCMenu() {
          var _ref;

          _classCallCheck(this, MDCMenu);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /** @private {!MDCMenuSurface} */


          var _this = _possibleConstructorReturn(this, (_ref = MDCMenu.__proto__ || Object.getPrototypeOf(MDCMenu)).call.apply(_ref, [this].concat(args)));

          _this.menuSurface_;
          /** @private {!MDCList} */

          _this.list_;
          /** @private {!Function} */

          _this.handleKeydown_;
          /** @private {!Function} */

          _this.handleClick_;
          /** @private {!Function} */

          _this.afterOpenedCallback_;
          return _this;
        }
        /**
         * @param {!HTMLElement} root
         * @return {!MDCMenu}
         */


        _createClass(MDCMenu, [{
          key: 'initialize',
          value: function initialize() {
            var menuSurfaceFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_3__material_menu_surface_index__["MDCMenuSurface"](el);
            };
            var listFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_5__material_list_index__["MDCList"](el);
            };
            this.menuSurface_ = menuSurfaceFactory(this.root_);
            var list = this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ].LIST_SELECTOR);

            if (list) {
              this.list_ = listFactory(list);
              this.list_.wrapFocus = true;
            }
          }
        }, {
          key: 'initialSyncWithDOM',
          value: function initialSyncWithDOM() {
            var _this2 = this;

            this.afterOpenedCallback_ = function () {
              return _this2.handleAfterOpened_();
            };

            this.handleKeydown_ = function (evt) {
              return _this2.foundation_.handleKeydown(evt);
            };

            this.handleClick_ = function (evt) {
              return _this2.foundation_.handleClick(evt);
            };

            this.menuSurface_.listen(__WEBPACK_IMPORTED_MODULE_4__material_menu_surface_foundation__["b"
            /* MDCMenuSurfaceFoundation */
            ].strings.OPENED_EVENT, this.afterOpenedCallback_);
            this.listen('keydown', this.handleKeydown_);
            this.listen('click', this.handleClick_);
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            if (this.list_) {
              this.list_.destroy();
            }

            this.menuSurface_.destroy();
            this.menuSurface_.unlisten(__WEBPACK_IMPORTED_MODULE_4__material_menu_surface_foundation__["b"
            /* MDCMenuSurfaceFoundation */
            ].strings.OPENED_EVENT, this.afterOpenedCallback_);
            this.unlisten('keydown', this.handleKeydown_);
            this.unlisten('click', this.handleClick_);

            _get(MDCMenu.prototype.__proto__ || Object.getPrototypeOf(MDCMenu.prototype), 'destroy', this).call(this);
          }
          /** @return {boolean} */

        }, {
          key: 'setAnchorCorner',

          /**
           * @param {!Corner} corner Default anchor corner alignment of top-left
           *     menu corner.
           */
          value: function setAnchorCorner(corner) {
            this.menuSurface_.setAnchorCorner(corner);
          }
          /**
           * @param {!AnchorMargin} margin
           */

        }, {
          key: 'setAnchorMargin',
          value: function setAnchorMargin(margin) {
            this.menuSurface_.setAnchorMargin(margin);
          }
          /**
           * Return the items within the menu. Note that this only contains the set of elements within
           * the items container that are proper list items, and not supplemental / presentational DOM
           * elements.
           * @return {!Array<!HTMLElement>}
           */

        }, {
          key: 'getOptionByIndex',

          /**
           * Return the item within the menu at the index specified.
           * @param {number} index
           * @return {?HTMLElement}
           */
          value: function getOptionByIndex(index) {
            var items = this.items;

            if (index < items.length) {
              return this.items[index];
            } else {
              return null;
            }
          }
          /** @param {boolean} quickOpen */

        }, {
          key: 'setFixedPosition',

          /** @param {boolean} isFixed */
          value: function setFixedPosition(isFixed) {
            this.menuSurface_.setFixedPosition(isFixed);
          }
        }, {
          key: 'hoistMenuToBody',
          value: function hoistMenuToBody() {
            this.menuSurface_.hoistMenuToBody();
          }
          /** @param {boolean} isHoisted */

        }, {
          key: 'setIsHoisted',
          value: function setIsHoisted(isHoisted) {
            this.menuSurface_.setIsHoisted(isHoisted);
          }
          /**
           * @param {number} x
           * @param {number} y
           */

        }, {
          key: 'setAbsolutePosition',
          value: function setAbsolutePosition(x, y) {
            this.menuSurface_.setAbsolutePosition(x, y);
          }
          /**
           * Sets the element that the menu-surface is anchored to.
           * @param {!HTMLElement} element
           */

        }, {
          key: 'setAnchorElement',
          value: function setAnchorElement(element) {
            this.menuSurface_.anchorElement = element;
          }
        }, {
          key: 'handleAfterOpened_',
          value: function handleAfterOpened_() {
            var list = this.items;

            if (list.length > 0) {
              list[0].focus();
            }
          }
          /** @return {!MDCMenuFoundation} */

        }, {
          key: 'getDefaultFoundation',
          value: function getDefaultFoundation() {
            var _this3 = this;

            return new __WEBPACK_IMPORTED_MODULE_1__foundation__["a"
            /* MDCMenuFoundation */
            ]({
              addClassToElementAtIndex: function addClassToElementAtIndex(index, className) {
                var list = _this3.items;
                list[index].classList.add(className);
              },
              removeClassFromElementAtIndex: function removeClassFromElementAtIndex(index, className) {
                var list = _this3.items;
                list[index].classList.remove(className);
              },
              addAttributeToElementAtIndex: function addAttributeToElementAtIndex(index, attr, value) {
                var list = _this3.items;
                list[index].setAttribute(attr, value);
              },
              removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex(index, attr) {
                var list = _this3.items;
                list[index].removeAttribute(attr);
              },
              elementContainsClass: function elementContainsClass(element, className) {
                return element.classList.contains(className);
              },
              closeSurface: function closeSurface() {
                return _this3.open = false;
              },
              getElementIndex: function getElementIndex(element) {
                return _this3.items.indexOf(element);
              },
              getParentElement: function getParentElement(element) {
                return element.parentElement;
              },
              getSelectedElementIndex: function getSelectedElementIndex(selectionGroup) {
                return _this3.items.indexOf(selectionGroup.querySelector('.' + __WEBPACK_IMPORTED_MODULE_2__constants__["a"
                /* cssClasses */
                ].MENU_SELECTED_LIST_ITEM));
              },
              notifySelected: function notifySelected(evtData) {
                return _this3.emit(__WEBPACK_IMPORTED_MODULE_2__constants__["b"
                /* strings */
                ].SELECTED_EVENT, {
                  index: evtData.index,
                  item: _this3.items[evtData.index]
                });
              }
            });
          }
        }, {
          key: 'open',
          get: function get() {
            return this.menuSurface_.open;
          }
          /** @param {boolean} value */
          ,
          set: function set(value) {
            this.menuSurface_.open = value;
          }
          /** @return {boolean} */

        }, {
          key: 'wrapFocus',
          get: function get() {
            return this.list_.wrapFocus;
          }
          /** @param {boolean} value */
          ,
          set: function set(value) {
            this.list_.wrapFocus = value;
          }
        }, {
          key: 'items',
          get: function get() {
            return this.list_.listElements;
          }
        }, {
          key: 'quickOpen',
          set: function set(quickOpen) {
            this.menuSurface_.quickOpen = quickOpen;
          }
        }], [{
          key: 'attachTo',
          value: function attachTo(root) {
            return new MDCMenu(root);
          }
        }]);

        return MDCMenu;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },
    /* 49 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return MDCMenuFoundation;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(50);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(30);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__material_menu_surface_foundation__ = __webpack_require__(18);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__material_list_foundation__ = __webpack_require__(16);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */


      var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select', 'a'];
      /**
       * @extends {MDCFoundation<!MDCMenuAdapter>}
       */

      var MDCMenuFoundation = function (_MDCFoundation) {
        _inherits(MDCMenuFoundation, _MDCFoundation);

        _createClass(MDCMenuFoundation, null, [{
          key: 'cssClasses',

          /** @return enum{cssClasses} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ];
          }
          /** @return enum{strings} */

        }, {
          key: 'strings',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ];
          }
          /**
           * {@see MDCMenuAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCMenuAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCMenuAdapter} */
              {
                addClassToElementAtIndex: function addClassToElementAtIndex() {},
                removeClassFromElementAtIndex: function removeClassFromElementAtIndex() {},
                addAttributeToElementAtIndex: function addAttributeToElementAtIndex() {},
                removeAttributeFromElementAtIndex: function removeAttributeFromElementAtIndex() {},
                elementContainsClass: function elementContainsClass() {},
                closeSurface: function closeSurface() {},
                getElementIndex: function getElementIndex() {},
                getParentElement: function getParentElement() {},
                getSelectedElementIndex: function getSelectedElementIndex() {},
                notifySelected: function notifySelected() {}
              }
            );
          }
          /** @param {!MDCMenuAdapter} adapter */

        }]);

        function MDCMenuFoundation(adapter) {
          _classCallCheck(this, MDCMenuFoundation);
          /** @type {number} */


          var _this = _possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

          _this.closeAnimationEndTimerId_ = 0;
          return _this;
        }

        _createClass(MDCMenuFoundation, [{
          key: 'destroy',
          value: function destroy() {
            if (this.closeAnimationEndTimerId_) {
              clearTimeout(this.closeAnimationEndTimerId_);
            }

            this.adapter_.closeSurface();
          }
          /**
           * Handler function for the keydown events.
           * @param {!Event} evt
           */

        }, {
          key: 'handleKeydown',
          value: function handleKeydown(evt) {
            var key = evt.key,
                keyCode = evt.keyCode;
            var isSpace = key === 'Space' || keyCode === 32;
            var isEnter = key === 'Enter' || keyCode === 13;
            var isTab = key === 'Tab' || keyCode === 9;

            if (isSpace || isEnter) {
              this.handleAction_(evt);
            } else if (isTab) {
              this.adapter_.closeSurface();
            }
          }
          /**
           * Handler function for the click events.
           * @param {!Event} evt
           */

        }, {
          key: 'handleClick',
          value: function handleClick(evt) {
            this.handleAction_(evt);
          }
          /**
           * Combined action handling for click/keypress events.
           * @param {!Event} evt
           * @private
           */

        }, {
          key: 'handleAction_',
          value: function handleAction_(evt) {
            var listItem = this.getListItem_(
            /** @type {HTMLElement} */
            evt.target);

            if (listItem) {
              this.handleSelection(listItem);
              this.preventDefaultEvent_(evt);
            }
          }
          /**
           * Handler for a selected list item.
           * @param {?HTMLElement} listItem
           */

        }, {
          key: 'handleSelection',
          value: function handleSelection(listItem) {
            var _this2 = this;

            var index = this.adapter_.getElementIndex(listItem);

            if (index < 0) {
              return;
            }

            this.adapter_.notifySelected({
              index: index
            });
            this.adapter_.closeSurface(); // Wait for the menu to close before adding/removing classes that affect styles.

            this.closeAnimationEndTimerId_ = setTimeout(function () {
              var selectionGroup = _this2.getSelectionGroup_(listItem);

              if (selectionGroup !== null) {
                _this2.handleSelectionGroup_(
                /** @type {!HTMLElement} */
                selectionGroup, index);
              }
            }, __WEBPACK_IMPORTED_MODULE_3__material_menu_surface_foundation__["b"
            /* MDCMenuSurfaceFoundation */
            ].numbers.TRANSITION_CLOSE_DURATION);
          }
          /**
           * Handles toggling the selected classes in a selection group when a
           * selection is made.
           * @param {!HTMLElement} selectionGroup
           * @param {number} index The selected index value
           * @private
           */

        }, {
          key: 'handleSelectionGroup_',
          value: function handleSelectionGroup_(selectionGroup, index) {
            // De-select the previous selection in this group.
            var selectedIndex = this.adapter_.getSelectedElementIndex(selectionGroup);

            if (selectedIndex >= 0) {
              this.adapter_.removeAttributeFromElementAtIndex(selectedIndex, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* strings */
              ].ARIA_SELECTED_ATTR);
              this.adapter_.removeClassFromElementAtIndex(selectedIndex, __WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ].MENU_SELECTED_LIST_ITEM);
            } // Select the new list item in this group.


            this.adapter_.addClassToElementAtIndex(index, __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].MENU_SELECTED_LIST_ITEM);
            this.adapter_.addAttributeToElementAtIndex(index, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ].ARIA_SELECTED_ATTR, 'true');
          }
          /**
           * Returns the parent selection group of an element if one exists.
           * @param listItem
           * @return {?HTMLElement} parent selection group element or null.
           * @private
           */

        }, {
          key: 'getSelectionGroup_',
          value: function getSelectionGroup_(listItem) {
            var parent = this.adapter_.getParentElement(listItem);
            var isGroup = this.adapter_.elementContainsClass(parent, __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].MENU_SELECTION_GROUP); // Iterate through ancestors until we find the group or get to the list.

            while (!isGroup && !this.adapter_.elementContainsClass(parent, __WEBPACK_IMPORTED_MODULE_4__material_list_foundation__["a"
            /* default */
            ].cssClasses.ROOT)) {
              parent = this.adapter_.getParentElement(parent);
              isGroup = this.adapter_.elementContainsClass(parent, __WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ].MENU_SELECTION_GROUP);
            }

            if (isGroup) {
              return parent;
            } else {
              return null;
            }
          }
          /**
           * Find the first ancestor with the mdc-list-item class.
           * @param {?HTMLElement} target
           * @return {?HTMLElement}
           * @private
           */

        }, {
          key: 'getListItem_',
          value: function getListItem_(target) {
            var isListItem = this.adapter_.elementContainsClass(target, __WEBPACK_IMPORTED_MODULE_4__material_list_foundation__["a"
            /* default */
            ].cssClasses.LIST_ITEM_CLASS);

            while (!isListItem) {
              target = this.adapter_.getParentElement(target);

              if (target) {
                isListItem = this.adapter_.elementContainsClass(target, __WEBPACK_IMPORTED_MODULE_4__material_list_foundation__["a"
                /* default */
                ].cssClasses.LIST_ITEM_CLASS);
              } else {
                // target has no parent element.
                return null;
              }
            }

            return target;
          }
          /**
           * Ensures that preventDefault is only called if the containing element doesn't
           * consume the event, and it will cause an unintended scroll.
           * @param {!Event} evt
           * @private
           */

        }, {
          key: 'preventDefaultEvent_',
          value: function preventDefaultEvent_(evt) {
            var target =
            /** @type {!HTMLElement} */
            evt.target;
            var tagName = ('' + target.tagName).toLowerCase();

            if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
              evt.preventDefault();
            }
          }
        }]);

        return MDCMenuFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /***/

    },
    /* 50 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* unused harmony export MDCMenuAdapter */

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC Menu. Provides an interface for managing
       * - selected element classes
       * - get focused elements
       * - toggling a checkbox inside a list item
       *
       * Additionally, provides type information for the adapter to the Closure
       * compiler.
       *
       * Implement this adapter for your framework of choice to delegate updates to
       * the component in your framework of choice. See architecture documentation
       * for more details.
       * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
       *
       * @record
       */


      var MDCMenuAdapter = function () {
        function MDCMenuAdapter() {
          _classCallCheck(this, MDCMenuAdapter);
        }

        _createClass(MDCMenuAdapter, [{
          key: "addClassToElementAtIndex",

          /**
           * Adds a class to the element at the index provided.
           * @param {number} index
           * @param {string} className
           */
          value: function addClassToElementAtIndex(index, className) {}
          /**
           * Removes a class from the element at the index provided
           * @param {number} index
           * @param {string} className
           */

        }, {
          key: "removeClassFromElementAtIndex",
          value: function removeClassFromElementAtIndex(index, className) {}
          /**
           * Adds an attribute, with value, to the element at the index provided.
           * @param {number} index
           * @param {string} attr
           * @param {string} value
           */

        }, {
          key: "addAttributeToElementAtIndex",
          value: function addAttributeToElementAtIndex(index, attr, value) {}
          /**
           * Removes an attribute from an element at the index provided.
           * @param {number} index
           * @param {string} attr
           */

        }, {
          key: "removeAttributeFromElementAtIndex",
          value: function removeAttributeFromElementAtIndex(index, attr) {}
          /**
           * Returns true if the element contains the className.
           * @param {?HTMLElement} element
           * @param {string} className
           * @return {boolean} true if the element contains the className
           */

        }, {
          key: "elementContainsClass",
          value: function elementContainsClass(element, className) {}
          /**
           * Closes the menu-surface.
           */

        }, {
          key: "closeSurface",
          value: function closeSurface() {}
          /**
           * Returns the index for the element provided.
           * @param {?HTMLElement} element
           * @return {number} index of the element in the list or -1 if it is not in the list.
           */

        }, {
          key: "getElementIndex",
          value: function getElementIndex(element) {}
          /**
           * Returns the parentElement of the provided element.
           * @param {?HTMLElement} element
           * @return {?HTMLElement} parentElement of the element provided.
           */

        }, {
          key: "getParentElement",
          value: function getParentElement(element) {}
          /**
           * Returns the element within the selectionGroup containing the selected element class.
           * @param {!HTMLElement} selectionGroup
           * @return {number} element within the selectionGroup that contains the selected element class.
           */

        }, {
          key: "getSelectedElementIndex",
          value: function getSelectedElementIndex(selectionGroup) {}
          /**
           * Emits an event using the evtData.
           * @param {{
          *    index: number
          *   }} evtData
           */

        }, {
          key: "notifySelected",
          value: function notifySelected(evtData) {}
        }]);

        return MDCMenuAdapter;
      }();
      /***/

    },
    /* 51 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return MDCSelectIcon;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(73);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(131);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCComponent<!MDCSelectIconFoundation>}
       * @final
       */


      var MDCSelectIcon = function (_MDCComponent) {
        _inherits(MDCSelectIcon, _MDCComponent);

        function MDCSelectIcon() {
          _classCallCheck(this, MDCSelectIcon);

          return _possibleConstructorReturn(this, (MDCSelectIcon.__proto__ || Object.getPrototypeOf(MDCSelectIcon)).apply(this, arguments));
        }

        _createClass(MDCSelectIcon, [{
          key: 'getDefaultFoundation',

          /**
           * @return {!MDCSelectIconFoundation}
           */
          value: function getDefaultFoundation() {
            var _this2 = this;

            return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
            /* default */
            ](
            /** @type {!MDCSelectIconAdapter} */
            _extends({
              getAttr: function getAttr(attr) {
                return _this2.root_.getAttribute(attr);
              },
              setAttr: function setAttr(attr, value) {
                return _this2.root_.setAttribute(attr, value);
              },
              removeAttr: function removeAttr(attr) {
                return _this2.root_.removeAttribute(attr);
              },
              setContent: function setContent(content) {
                _this2.root_.textContent = content;
              },
              registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                return _this2.root_.addEventListener(evtType, handler);
              },
              deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                return _this2.root_.removeEventListener(evtType, handler);
              },
              notifyIconAction: function notifyIconAction() {
                return _this2.emit(__WEBPACK_IMPORTED_MODULE_2__foundation__["a"
                /* default */
                ].strings.ICON_EVENT, {}
                /* evtData */
                , true
                /* shouldBubble */
                );
              }
            }));
          }
        }, {
          key: 'foundation',

          /**
           * @return {!MDCSelectIconFoundation}
           */
          get: function get() {
            return this.foundation_;
          }
        }], [{
          key: 'attachTo',

          /**
           * @param {!Element} root
           * @return {!MDCSelectIcon}
           */
          value: function attachTo(root) {
            return new MDCSelectIcon(root);
          }
        }]);

        return MDCSelectIcon;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },
    /* 52 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return MDCSelectHelperText;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(74);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(133);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCComponent<!MDCSelectHelperTextFoundation>}
       * @final
       */


      var MDCSelectHelperText = function (_MDCComponent) {
        _inherits(MDCSelectHelperText, _MDCComponent);

        function MDCSelectHelperText() {
          _classCallCheck(this, MDCSelectHelperText);

          return _possibleConstructorReturn(this, (MDCSelectHelperText.__proto__ || Object.getPrototypeOf(MDCSelectHelperText)).apply(this, arguments));
        }

        _createClass(MDCSelectHelperText, [{
          key: 'getDefaultFoundation',

          /**
           * @return {!MDCSelectHelperTextFoundation}
           */
          value: function getDefaultFoundation() {
            var _this2 = this;

            return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
            /* default */
            ](
            /** @type {!MDCSelectHelperTextAdapter} */
            _extends({
              addClass: function addClass(className) {
                return _this2.root_.classList.add(className);
              },
              removeClass: function removeClass(className) {
                return _this2.root_.classList.remove(className);
              },
              hasClass: function hasClass(className) {
                return _this2.root_.classList.contains(className);
              },
              setAttr: function setAttr(attr, value) {
                return _this2.root_.setAttribute(attr, value);
              },
              removeAttr: function removeAttr(attr) {
                return _this2.root_.removeAttribute(attr);
              },
              setContent: function setContent(content) {
                _this2.root_.textContent = content;
              }
            }));
          }
        }, {
          key: 'foundation',

          /**
           * @return {!MDCSelectHelperTextFoundation}
           */
          get: function get() {
            return this.foundation_;
          }
        }], [{
          key: 'attachTo',

          /**
           * @param {!Element} root
           * @return {!MDCSelectHelperText}
           */
          value: function attachTo(root) {
            return new MDCSelectHelperText(root);
          }
        }]);

        return MDCSelectHelperText;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
      /* default */
      ]);
      /***/

    },,,,,,,,,,,,,,,,,,,,
    /* 53 */

    /* 54 */

    /* 55 */

    /* 56 */

    /* 57 */

    /* 58 */

    /* 59 */

    /* 60 */

    /* 61 */

    /* 62 */

    /* 63 */

    /* 64 */

    /* 65 */

    /* 66 */

    /* 67 */

    /* 68 */

    /* 69 */

    /* 70 */

    /* 71 */

    /* 72 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* unused harmony export MDCSelectAdapter */

      /* unused harmony export FoundationMapType */

      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__icon_index__ = __webpack_require__(51);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__helper_text_index__ = __webpack_require__(52);

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /* eslint-disable no-unused-vars */

      /* eslint-enable no-unused-vars */

      /**
       * @typedef {{
       *   leadingIcon: (!MDCSelectIconFoundation|undefined),
       *   helperText: (!MDCSelectHelperTextFoundation|undefined),
       * }}
       */


      var FoundationMapType = void 0;
      /**
       * Adapter for MDC Select. Provides an interface for managing
       * - classes
       * - dom
       * - event handlers
       *
       * Additionally, provides type information for the adapter to the Closure
       * compiler.
       *
       * Implement this adapter for your framework of choice to delegate updates to
       * the component in your framework of choice. See architecture documentation
       * for more details.
       * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
       *
       * @record
       */

      var MDCSelectAdapter = function () {
        function MDCSelectAdapter() {
          _classCallCheck(this, MDCSelectAdapter);
        }

        _createClass(MDCSelectAdapter, [{
          key: 'addClass',

          /**
           * Adds class to root element.
           * @param {string} className
           */
          value: function addClass(className) {}
          /**
           * Removes a class from the root element.
           * @param {string} className
           */

        }, {
          key: 'removeClass',
          value: function removeClass(className) {}
          /**
           * Returns true if the root element contains the given class name.
           * @param {string} className
           * @return {boolean}
           */

        }, {
          key: 'hasClass',
          value: function hasClass(className) {}
          /**
           * Activates the bottom line, showing a focused state.
           */

        }, {
          key: 'activateBottomLine',
          value: function activateBottomLine() {}
          /**
           * Deactivates the bottom line.
           */

        }, {
          key: 'deactivateBottomLine',
          value: function deactivateBottomLine() {}
          /**
           * Sets the value of the select.
           * @param {string} value
           */

        }, {
          key: 'setValue',
          value: function setValue(value) {}
          /**
           * Returns the selected value of the select element.
           * @return {string}
           */

        }, {
          key: 'getValue',
          value: function getValue() {}
          /**
           * Floats label determined based off of the shouldFloat argument.
           * @param {boolean} shouldFloat
           */

        }, {
          key: 'floatLabel',
          value: function floatLabel(shouldFloat) {}
          /**
           * Returns width of label in pixels, if the label exists.
           * @return {number}
           */

        }, {
          key: 'getLabelWidth',
          value: function getLabelWidth() {}
          /**
           * Returns true if outline element exists, false if it doesn't.
           * @return {boolean}
           */

        }, {
          key: 'hasOutline',
          value: function hasOutline() {}
          /**
           * Only implement if outline element exists.
           * @param {number} labelWidth
           */

        }, {
          key: 'notchOutline',
          value: function notchOutline(labelWidth) {}
          /**
           * Closes notch in outline element, if the outline exists.
           */

        }, {
          key: 'closeOutline',
          value: function closeOutline() {}
          /**
           * Opens the menu.
           */

        }, {
          key: 'openMenu',
          value: function openMenu() {}
          /**
           * Closes the menu.
           */

        }, {
          key: 'closeMenu',
          value: function closeMenu() {}
          /**
           * Returns true if the menu is currently open.
           * @return {boolean}
           */

        }, {
          key: 'isMenuOpen',
          value: function isMenuOpen() {}
          /**
           * Sets the selected index of the select to the index provided.
           * @param {number} index
           */

        }, {
          key: 'setSelectedIndex',
          value: function setSelectedIndex(index) {}
          /**
           * Sets the select to disabled.
           * @param {boolean} isDisabled
           */

        }, {
          key: 'setDisabled',
          value: function setDisabled(isDisabled) {}
          /**
           * Sets the line ripple transform origin center.
           * @param {number} normalizedX
           */

        }, {
          key: 'setRippleCenter',
          value: function setRippleCenter(normalizedX) {}
          /**
           * Emits a change event when an element is selected.
           * @param {string} value
           */

        }, {
          key: 'notifyChange',
          value: function notifyChange(value) {}
          /**
           * Checks if the select is currently valid.
           * @return {boolean} isValid
           */

        }, {
          key: 'checkValidity',
          value: function checkValidity() {}
          /**
           * Adds/Removes the invalid class.
           * @param {boolean} isValid
           */

        }, {
          key: 'setValid',
          value: function setValid(isValid) {}
        }]);

        return MDCSelectAdapter;
      }();
      /***/

    },
    /* 73 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC Select Icon.
       *
       * Defines the shape of the adapter expected by the foundation. Implement this
       * adapter to integrate the select icon into your framework. See
       * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
       * for more information.
       *
       * @record
       */


      var MDCSelectIconAdapter = function () {
        function MDCSelectIconAdapter() {
          _classCallCheck(this, MDCSelectIconAdapter);
        }

        _createClass(MDCSelectIconAdapter, [{
          key: "getAttr",

          /**
           * Gets the value of an attribute on the icon element.
           * @param {string} attr
           * @return {string}
           */
          value: function getAttr(attr) {}
          /**
           * Sets an attribute on the icon element.
           * @param {string} attr
           * @param {string} value
           */

        }, {
          key: "setAttr",
          value: function setAttr(attr, value) {}
          /**
           * Removes an attribute from the icon element.
           * @param {string} attr
           */

        }, {
          key: "removeAttr",
          value: function removeAttr(attr) {}
          /**
           * Sets the text content of the icon element.
           * @param {string} content
           */

        }, {
          key: "setContent",
          value: function setContent(content) {}
          /**
           * Registers an event listener on the icon element for a given event.
           * @param {string} evtType
           * @param {function(!Event): undefined} handler
           */

        }, {
          key: "registerInteractionHandler",
          value: function registerInteractionHandler(evtType, handler) {}
          /**
           * Deregisters an event listener on the icon element for a given event.
           * @param {string} evtType
           * @param {function(!Event): undefined} handler
           */

        }, {
          key: "deregisterInteractionHandler",
          value: function deregisterInteractionHandler(evtType, handler) {}
          /**
           * Emits a custom event "MDCSelect:icon" denoting a user has clicked the icon.
           */

        }, {
          key: "notifyIconAction",
          value: function notifyIconAction() {}
        }]);

        return MDCSelectIconAdapter;
      }();
      /* unused harmony default export */


      var _unused_webpack_default_export = MDCSelectIconAdapter;
      /***/
    },
    /* 74 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint no-unused-vars: [2, {"args": "none"}] */

      /**
       * Adapter for MDC Select Helper Text.
       *
       * Defines the shape of the adapter expected by the foundation. Implement this
       * adapter to integrate the Select helper text into your framework. See
       * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
       * for more information.
       *
       * @record
       */


      var MDCSelectHelperTextAdapter = function () {
        function MDCSelectHelperTextAdapter() {
          _classCallCheck(this, MDCSelectHelperTextAdapter);
        }

        _createClass(MDCSelectHelperTextAdapter, [{
          key: "addClass",

          /**
           * Adds a class to the helper text element.
           * @param {string} className
           */
          value: function addClass(className) {}
          /**
           * Removes a class from the helper text element.
           * @param {string} className
           */

        }, {
          key: "removeClass",
          value: function removeClass(className) {}
          /**
           * Returns whether or not the helper text element contains the given class.
           * @param {string} className
           * @return {boolean}
           */

        }, {
          key: "hasClass",
          value: function hasClass(className) {}
          /**
           * Sets an attribute with a given value on the helper text element.
           * @param {string} attr
           * @param {string} value
           */

        }, {
          key: "setAttr",
          value: function setAttr(attr, value) {}
          /**
           * Removes an attribute from the helper text element.
           * @param {string} attr
           */

        }, {
          key: "removeAttr",
          value: function removeAttr(attr) {}
          /**
           * Sets the text content for the helper text element.
           * @param {string} content
           */

        }, {
          key: "setContent",
          value: function setContent(content) {}
        }]);

        return MDCSelectHelperTextAdapter;
      }();
      /* unused harmony default export */


      var _unused_webpack_default_export = MDCSelectHelperTextAdapter;
      /***/
    },
    /* 75 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "c", function () {
        return strings;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return numbers;
      });
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var cssClasses = {
        DISABLED: 'mdc-select--disabled',
        ROOT: 'mdc-select',
        OUTLINED: 'mdc-select--outlined',
        FOCUSED: 'mdc-select--focused',
        SELECTED_ITEM_CLASS: 'mdc-list-item--selected',
        WITH_LEADING_ICON: 'mdc-select--with-leading-icon',
        INVALID: 'mdc-select--invalid',
        REQUIRED: 'mdc-select--required'
      };
      /** @enum {string} */

      var strings = {
        ARIA_CONTROLS: 'aria-controls',
        CHANGE_EVENT: 'MDCSelect:change',
        SELECTED_ITEM_SELECTOR: '.' + cssClasses.SELECTED_ITEM_CLASS,
        LEADING_ICON_SELECTOR: '.mdc-select__icon',
        SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
        HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
        MENU_SELECTOR: '.mdc-select__menu',
        LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
        LABEL_SELECTOR: '.mdc-floating-label',
        NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control',
        OUTLINE_SELECTOR: '.mdc-notched-outline',
        ENHANCED_VALUE_ATTR: 'data-value',
        ARIA_SELECTED_ATTR: 'aria-selected'
      };
      /** @enum {number} */

      var numbers = {
        LABEL_SCALE: 0.75
      };
      /***/
    },,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    /* 76 */

    /* 77 */

    /* 78 */

    /* 79 */

    /* 80 */

    /* 81 */

    /* 82 */

    /* 83 */

    /* 84 */

    /* 85 */

    /* 86 */

    /* 87 */

    /* 88 */

    /* 89 */

    /* 90 */

    /* 91 */

    /* 92 */

    /* 93 */

    /* 94 */

    /* 95 */

    /* 96 */

    /* 97 */

    /* 98 */

    /* 99 */

    /* 100 */

    /* 101 */

    /* 102 */

    /* 103 */

    /* 104 */

    /* 105 */

    /* 106 */

    /* 107 */

    /* 108 */

    /* 109 */

    /* 110 */

    /* 111 */

    /* 112 */

    /* 113 */

    /* 114 */

    /* 115 */

    /* 116 */

    /* 117 */

    /* 118 */

    /* 119 */

    /* 120 */

    /* 121 */

    /* 122 */

    /* 123 */

    /* 124 */

    /* 125 */

    /* 126 */

    /* 127 */

    /* 128 */

    /* 129 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "MDCSelect", function () {
        return MDCSelect;
      });
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0__material_base_index__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__material_floating_label_index__ = __webpack_require__(17);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__material_line_ripple_index__ = __webpack_require__(31);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__material_menu_index__ = __webpack_require__(48);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__material_ripple_index__ = __webpack_require__(4);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__material_notched_outline_index__ = __webpack_require__(36);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__foundation__ = __webpack_require__(130);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(75);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_8__adapter__ = __webpack_require__(72);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_9__icon_index__ = __webpack_require__(51);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_10__helper_text_index__ = __webpack_require__(52);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_11__material_menu_surface_constants__ = __webpack_require__(19);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_12__material_menu_constants__ = __webpack_require__(30);
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCSelectFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_6__foundation__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCSelectHelperText", function () {
        return __WEBPACK_IMPORTED_MODULE_10__helper_text_index__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCSelectHelperTextFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_10__helper_text_index__["b"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCSelectIcon", function () {
        return __WEBPACK_IMPORTED_MODULE_9__icon_index__["a"];
      });
      /* harmony reexport (binding) */


      __webpack_require__.d(__webpack_exports__, "MDCSelectIconFoundation", function () {
        return __WEBPACK_IMPORTED_MODULE_9__icon_index__["b"];
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint-disable no-unused-vars */

      /* eslint-enable no-unused-vars */
      // Closure has issues with {this as that} syntax.


      var VALIDATION_ATTR_WHITELIST = ['required', 'aria-required'];
      /**
       * @extends MDCComponent<!MDCSelectFoundation>
       */

      var MDCSelect = function (_MDCComponent) {
        _inherits(MDCSelect, _MDCComponent);
        /**
         * @param {...?} args
         */


        function MDCSelect() {
          var _ref;

          _classCallCheck(this, MDCSelect);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          /** @private {?Element} */


          var _this = _possibleConstructorReturn(this, (_ref = MDCSelect.__proto__ || Object.getPrototypeOf(MDCSelect)).call.apply(_ref, [this].concat(args)));

          _this.nativeControl_;
          /** @private {?Element} */

          _this.selectedText_;
          /** @private {?Element} */

          _this.hiddenInput_;
          /** @private {?MDCSelectIcon} */

          _this.leadingIcon_;
          /** @private {?MDCSelectHelperText} */

          _this.helperText_;
          /** @private {?Element} */

          _this.menuElement_;
          /** @type {?MDCMenu} */

          _this.menu_;
          /** @type {?MDCRipple} */

          _this.ripple;
          /** @private {?MDCLineRipple} */

          _this.lineRipple_;
          /** @private {?MDCFloatingLabel} */

          _this.label_;
          /** @private {?MDCNotchedOutline} */

          _this.outline_;
          /** @private {!Function} */

          _this.handleChange_;
          /** @private {!Function} */

          _this.handleFocus_;
          /** @private {!Function} */

          _this.handleBlur_;
          /** @private {!Function} */

          _this.handleClick_;
          /** @private {!Function} */

          _this.handleKeydown_;
          /** @private {!Function} */

          _this.handleMenuOpened_;
          /** @private {!Function} */

          _this.handleMenuClosed_;
          /** @private {!Function} */

          _this.handleMenuSelected_;
          /** @private {boolean} */

          _this.menuOpened_ = false;
          /** @private {!MutationObserver} */

          _this.validationObserver_;
          return _this;
        }
        /**
         * @param {!Element} root
         * @return {!MDCSelect}
         */


        _createClass(MDCSelect, [{
          key: 'layout',

          /**
           * Recomputes the outline SVG path for the outline element.
           */
          value: function layout() {
            this.foundation_.layout();
          }
          /**
           * @param {(function(!Element): !MDCLineRipple)=} lineRippleFactory A function which creates a new MDCLineRipple.
           * @param {(function(!Element): !MDCFloatingLabel)=} labelFactory A function which creates a new MDCFloatingLabel.
           * @param {(function(!Element): !MDCNotchedOutline)=} outlineFactory A function which creates a new MDCNotchedOutline.
           * @param {(function(!Element): !MDCMenu)=} menuFactory A function which creates a new MDCMenu.
           * @param {(function(!Element): !MDCSelectIcon)=} iconFactory A function which creates a new MDCSelectIcon.
           * @param {(function(!Element): !MDCSelectHelperText)=} helperTextFactory A function which creates a new
           * MDCSelectHelperText.
           */

        }, {
          key: 'initialize',
          value: function initialize() {
            var labelFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_1__material_floating_label_index__["MDCFloatingLabel"](el);
            };
            var lineRippleFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_2__material_line_ripple_index__["MDCLineRipple"](el);
            };
            var outlineFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_5__material_notched_outline_index__["MDCNotchedOutline"](el);
            };
            var menuFactory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_3__material_menu_index__["MDCMenu"](el);
            };
            var iconFactory = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_9__icon_index__["a"
              /* MDCSelectIcon */
              ](el);
            };
            var helperTextFactory = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function (el) {
              return new __WEBPACK_IMPORTED_MODULE_10__helper_text_index__["a"
              /* MDCSelectHelperText */
              ](el);
            };
            this.nativeControl_ =
            /** @type {HTMLElement} */
            this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].NATIVE_CONTROL_SELECTOR);
            this.selectedText_ =
            /** @type {HTMLElement} */
            this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].SELECTED_TEXT_SELECTOR);

            if (this.selectedText_) {
              this.enhancedSelectSetup_(menuFactory);
            }

            var labelElement = this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].LABEL_SELECTOR);

            if (labelElement) {
              this.label_ = labelFactory(labelElement);
            }

            var lineRippleElement = this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].LINE_RIPPLE_SELECTOR);

            if (lineRippleElement) {
              this.lineRipple_ = lineRippleFactory(lineRippleElement);
            }

            var outlineElement = this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].OUTLINE_SELECTOR);

            if (outlineElement) {
              this.outline_ = outlineFactory(outlineElement);
            }

            var leadingIcon = this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].LEADING_ICON_SELECTOR);

            if (leadingIcon) {
              this.root_.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
              /* cssClasses */
              ].WITH_LEADING_ICON);
              this.leadingIcon_ = iconFactory(leadingIcon);

              if (this.menuElement_) {
                this.menuElement_.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                /* cssClasses */
                ].WITH_LEADING_ICON);
              }
            }

            var element = this.nativeControl_ ? this.nativeControl_ : this.selectedText_;

            if (element.hasAttribute(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].ARIA_CONTROLS)) {
              var helperTextElement = document.getElementById(element.getAttribute(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
              /* strings */
              ].ARIA_CONTROLS));

              if (helperTextElement) {
                this.helperText_ = helperTextFactory(helperTextElement);
              }
            }

            if (!this.root_.classList.contains(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
            /* cssClasses */
            ].OUTLINED)) {
              this.ripple = this.initRipple_();
            } // The required state needs to be sync'd before the mutation observer is added.


            this.initialSyncRequiredState_();
            this.addMutationObserverForRequired_();
          }
          /**
           * Handles setup for the enhanced menu.
           * @private
           */

        }, {
          key: 'enhancedSelectSetup_',
          value: function enhancedSelectSetup_(menuFactory) {
            var isDisabled = this.root_.classList.contains(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
            /* cssClasses */
            ].DISABLED);
            this.selectedText_.setAttribute('tabindex', isDisabled ? '-1' : '0');
            this.hiddenInput_ = this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].HIDDEN_INPUT_SELECTOR);
            this.menuElement_ =
            /** @type {HTMLElement} */
            this.root_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].MENU_SELECTOR);
            this.menu_ = menuFactory(this.menuElement_);
            this.menu_.hoistMenuToBody();
            this.menu_.setAnchorElement(
            /** @type {!HTMLElement} */
            this.root_);
            this.menu_.setAnchorCorner(__WEBPACK_IMPORTED_MODULE_11__material_menu_surface_constants__["a"
            /* Corner */
            ].BOTTOM_START);
            this.menu_.wrapFocus = false;
          }
          /**
           * @private
           * @return {!MDCRipple}
           */

        }, {
          key: 'initRipple_',
          value: function initRipple_() {
            var element = this.nativeControl_ ? this.nativeControl_ : this.selectedText_;

            var adapter = _extends(__WEBPACK_IMPORTED_MODULE_4__material_ripple_index__["MDCRipple"].createAdapter(this), {
              registerInteractionHandler: function registerInteractionHandler(type, handler) {
                return element.addEventListener(type, handler);
              },
              deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
                return element.removeEventListener(type, handler);
              }
            });

            var foundation = new __WEBPACK_IMPORTED_MODULE_4__material_ripple_index__["MDCRippleFoundation"](adapter);
            return new __WEBPACK_IMPORTED_MODULE_4__material_ripple_index__["MDCRipple"](this.root_, foundation);
          }
          /**
           * Initializes the select's event listeners and internal state based
           * on the environment's state.
           */

        }, {
          key: 'initialSyncWithDOM',
          value: function initialSyncWithDOM() {
            var _this2 = this;

            this.handleChange_ = function () {
              return _this2.foundation_.handleChange(
              /* didChange */
              true);
            };

            this.handleFocus_ = function () {
              return _this2.foundation_.handleFocus();
            };

            this.handleBlur_ = function () {
              return _this2.foundation_.handleBlur();
            };

            this.handleClick_ = function (evt) {
              if (_this2.selectedText_) _this2.selectedText_.focus();

              _this2.foundation_.handleClick(_this2.getNormalizedXCoordinate_(evt));
            };

            this.handleKeydown_ = function (evt) {
              return _this2.foundation_.handleKeydown(evt);
            };

            this.handleMenuSelected_ = function (evtData) {
              return _this2.selectedIndex = evtData.detail.index;
            };

            this.handleMenuOpened_ = function () {
              // Menu should open to the last selected element.
              if (_this2.selectedIndex >= 0) {
                _this2.menu_.items[_this2.selectedIndex].focus();
              }
            };

            this.handleMenuClosed_ = function () {
              // menuOpened_ is used to track the state of the menu opening or closing since the menu.open function
              // will return false if the menu is still closing and this method listens to the closed event which
              // occurs after the menu is already closed.
              _this2.menuOpened_ = false;

              _this2.selectedText_.removeAttribute('aria-expanded');

              if (document.activeElement !== _this2.selectedText_) {
                _this2.foundation_.handleBlur();
              }
            };

            var element = this.nativeControl_ ? this.nativeControl_ : this.selectedText_;
            element.addEventListener('change', this.handleChange_);
            element.addEventListener('focus', this.handleFocus_);
            element.addEventListener('blur', this.handleBlur_);
            ['mousedown', 'touchstart'].forEach(function (evtType) {
              element.addEventListener(evtType, _this2.handleClick_);
            });

            if (this.menuElement_) {
              this.selectedText_.addEventListener('keydown', this.handleKeydown_);
              this.menu_.listen(__WEBPACK_IMPORTED_MODULE_11__material_menu_surface_constants__["e"
              /* strings */
              ].CLOSED_EVENT, this.handleMenuClosed_);
              this.menu_.listen(__WEBPACK_IMPORTED_MODULE_11__material_menu_surface_constants__["e"
              /* strings */
              ].OPENED_EVENT, this.handleMenuOpened_);
              this.menu_.listen(__WEBPACK_IMPORTED_MODULE_12__material_menu_constants__["b"
              /* strings */
              ].SELECTED_EVENT, this.handleMenuSelected_);

              if (this.hiddenInput_ && this.hiddenInput_.value) {
                // If the hidden input already has a value, use it to restore the select's value.
                // This can happen e.g. if the user goes back or (in some browsers) refreshes the page.
                var enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
                enhancedAdapterMethods.setValue(this.hiddenInput_.value);
              } else if (this.menuElement_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
              /* strings */
              ].SELECTED_ITEM_SELECTOR)) {
                // If an element is selected, the select should set the initial selected text.
                var _enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();

                _enhancedAdapterMethods.setValue(_enhancedAdapterMethods.getValue());
              }
            } // Initially sync floating label


            this.foundation_.handleChange(
            /* didChange */
            false);

            if (this.root_.classList.contains(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
            /* cssClasses */
            ].DISABLED) || this.nativeControl_ && this.nativeControl_.disabled) {
              this.disabled = true;
            }
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            var _this3 = this;

            var element = this.nativeControl_ ? this.nativeControl_ : this.selectedText_;
            element.removeEventListener('change', this.handleChange_);
            element.removeEventListener('focus', this.handleFocus_);
            element.removeEventListener('blur', this.handleBlur_);
            element.removeEventListener('keydown', this.handleKeydown_);
            ['mousedown', 'touchstart'].forEach(function (evtType) {
              element.removeEventListener(evtType, _this3.handleClick_);
            });

            if (this.menu_) {
              this.menu_.unlisten(__WEBPACK_IMPORTED_MODULE_11__material_menu_surface_constants__["e"
              /* strings */
              ].CLOSED_EVENT, this.handleMenuClosed_);
              this.menu_.unlisten(__WEBPACK_IMPORTED_MODULE_11__material_menu_surface_constants__["e"
              /* strings */
              ].OPENED_EVENT, this.handleMenuOpened_);
              this.menu_.unlisten(__WEBPACK_IMPORTED_MODULE_12__material_menu_constants__["b"
              /* strings */
              ].SELECTED_EVENT, this.handleMenuSelected_);
              this.menu_.destroy();
            }

            if (this.ripple) {
              this.ripple.destroy();
            }

            if (this.outline_) {
              this.outline_.destroy();
            }

            if (this.leadingIcon_) {
              this.leadingIcon_.destroy();
            }

            if (this.helperText_) {
              this.helperText_.destroy();
            }

            if (this.validationObserver_) {
              this.validationObserver_.disconnect();
            }

            _get(MDCSelect.prototype.__proto__ || Object.getPrototypeOf(MDCSelect.prototype), 'destroy', this).call(this);
          }
          /**
           * @return {!MDCSelectFoundation}
           */

        }, {
          key: 'getDefaultFoundation',
          value: function getDefaultFoundation() {
            return new __WEBPACK_IMPORTED_MODULE_6__foundation__["a"
            /* default */
            ](
            /** @type {!MDCSelectAdapter} */
            _extends(this.nativeControl_ ? this.getNativeSelectAdapterMethods_() : this.getEnhancedSelectAdapterMethods_(), this.getCommonAdapterMethods_(), this.getOutlineAdapterMethods_(), this.getLabelAdapterMethods_()), this.getFoundationMap_());
          }
          /**
           * @return {!{
           *   getValue: function(): string,
           *   setValue: function(string): string,
           *   openMenu: function(): void,
           *   closeMenu: function(): void,
           *   isMenuOpen: function(): boolean,
           *   setSelectedIndex: function(number): void,
           *   setDisabled: function(boolean): void
           * }}
           * @private
           */

        }, {
          key: 'getNativeSelectAdapterMethods_',
          value: function getNativeSelectAdapterMethods_() {
            var _this4 = this;

            return {
              getValue: function getValue() {
                return _this4.nativeControl_.value;
              },
              setValue: function setValue(value) {
                return _this4.nativeControl_.value = value;
              },
              openMenu: function openMenu() {},
              closeMenu: function closeMenu() {},
              isMenuOpen: function isMenuOpen() {
                return false;
              },
              setSelectedIndex: function setSelectedIndex(index) {
                _this4.nativeControl_.selectedIndex = index;
              },
              setDisabled: function setDisabled(isDisabled) {
                return _this4.nativeControl_.disabled = isDisabled;
              },
              setValid: function setValid(isValid) {
                isValid ? _this4.root_.classList.remove(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                /* cssClasses */
                ].INVALID) : _this4.root_.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                /* cssClasses */
                ].INVALID);
              },
              checkValidity: function checkValidity() {
                return _this4.nativeControl_.checkValidity();
              }
            };
          }
          /**
           * @return {!{
           *   getValue: function(): string,
           *   setValue: function(string): string,
           *   openMenu: function(): void,
           *   closeMenu: function(): void,
           *   isMenuOpen: function(): boolean,
           *   setSelectedIndex: function(number): void,
           *   setDisabled: function(boolean): void
           * }}
           * @private
           */

        }, {
          key: 'getEnhancedSelectAdapterMethods_',
          value: function getEnhancedSelectAdapterMethods_() {
            var _this5 = this;

            return {
              getValue: function getValue() {
                var listItem = _this5.menuElement_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
                /* strings */
                ].SELECTED_ITEM_SELECTOR);

                if (listItem && listItem.hasAttribute(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
                /* strings */
                ].ENHANCED_VALUE_ATTR)) {
                  return listItem.getAttribute(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
                  /* strings */
                  ].ENHANCED_VALUE_ATTR);
                }

                return '';
              },
              setValue: function setValue(value) {
                var element =
                /** @type {HTMLElement} */
                _this5.menuElement_.querySelector('[' + __WEBPACK_IMPORTED_MODULE_7__constants__["c"
                /* strings */
                ].ENHANCED_VALUE_ATTR + '="' + value + '"]');

                _this5.setEnhancedSelectedIndex_(element ? _this5.menu_.items.indexOf(element) : -1);
              },
              openMenu: function openMenu() {
                if (_this5.menu_ && !_this5.menu_.open) {
                  _this5.menu_.open = true;
                  _this5.menuOpened_ = true;

                  _this5.selectedText_.setAttribute('aria-expanded', 'true');
                }
              },
              closeMenu: function closeMenu() {
                if (_this5.menu_ && _this5.menu_.open) {
                  _this5.menu_.open = false;
                }
              },
              isMenuOpen: function isMenuOpen() {
                return _this5.menu_ && _this5.menuOpened_;
              },
              setSelectedIndex: function setSelectedIndex(index) {
                _this5.setEnhancedSelectedIndex_(index);
              },
              setDisabled: function setDisabled(isDisabled) {
                _this5.selectedText_.setAttribute('tabindex', isDisabled ? '-1' : '0');

                _this5.selectedText_.setAttribute('aria-disabled', isDisabled.toString());

                if (_this5.hiddenInput_) {
                  _this5.hiddenInput_.disabled = isDisabled;
                }
              },
              checkValidity: function checkValidity() {
                var classList = _this5.root_.classList;

                if (classList.contains(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                /* cssClasses */
                ].REQUIRED) && !classList.contains(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                /* cssClasses */
                ].DISABLED)) {
                  // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
                  // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
                  return _this5.selectedIndex !== -1 && (_this5.selectedIndex !== 0 || _this5.value);
                } else {
                  return true;
                }
              },
              setValid: function setValid(isValid) {
                _this5.selectedText_.setAttribute('aria-invalid', (!isValid).toString());

                isValid ? _this5.root_.classList.remove(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                /* cssClasses */
                ].INVALID) : _this5.root_.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                /* cssClasses */
                ].INVALID);
              }
            };
          }
          /**
           * @return {!{
           *   addClass: function(string): void,
           *   removeClass: function(string): void,
           *   hasClass: function(string): void,
           *   setRippleCenter: function(number): void,
           *   activateBottomLine: function(): void,
           *   deactivateBottomLine: function(): void,
           *   notifyChange: function(string): void
           * }}
           * @private
           */

        }, {
          key: 'getCommonAdapterMethods_',
          value: function getCommonAdapterMethods_() {
            var _this6 = this;

            return {
              addClass: function addClass(className) {
                return _this6.root_.classList.add(className);
              },
              removeClass: function removeClass(className) {
                return _this6.root_.classList.remove(className);
              },
              hasClass: function hasClass(className) {
                return _this6.root_.classList.contains(className);
              },
              setRippleCenter: function setRippleCenter(normalizedX) {
                return _this6.lineRipple_ && _this6.lineRipple_.setRippleCenter(normalizedX);
              },
              activateBottomLine: function activateBottomLine() {
                return _this6.lineRipple_ && _this6.lineRipple_.activate();
              },
              deactivateBottomLine: function deactivateBottomLine() {
                return _this6.lineRipple_ && _this6.lineRipple_.deactivate();
              },
              notifyChange: function notifyChange(value) {
                var index = _this6.selectedIndex;

                _this6.emit(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
                /* strings */
                ].CHANGE_EVENT, {
                  value: value,
                  index: index
                }, true
                /* shouldBubble  */
                );
              }
            };
          }
          /**
           * @return {!{
           *   hasOutline: function(): boolean,
           *   notchOutline: function(number, boolean): undefined,
           *   closeOutline: function(): undefined,
           * }}
           */

        }, {
          key: 'getOutlineAdapterMethods_',
          value: function getOutlineAdapterMethods_() {
            var _this7 = this;

            return {
              hasOutline: function hasOutline() {
                return !!_this7.outline_;
              },
              notchOutline: function notchOutline(labelWidth) {
                if (_this7.outline_) {
                  _this7.outline_.notch(labelWidth);
                }
              },
              closeOutline: function closeOutline() {
                if (_this7.outline_) {
                  _this7.outline_.closeNotch();
                }
              }
            };
          }
          /**
           * @return {!{
           *   floatLabel: function(boolean): undefined,
           *   getLabelWidth: function(): number,
           * }}
           */

        }, {
          key: 'getLabelAdapterMethods_',
          value: function getLabelAdapterMethods_() {
            var _this8 = this;

            return {
              floatLabel: function floatLabel(shouldFloat) {
                if (_this8.label_) {
                  _this8.label_.float(shouldFloat);
                }
              },
              getLabelWidth: function getLabelWidth() {
                return _this8.label_ ? _this8.label_.getWidth() : 0;
              }
            };
          }
          /**
           * Calculates where the line ripple should start based on the x coordinate within the component.
           * @param {!(MouseEvent|TouchEvent)} evt
           * @return {number} normalizedX
           */

        }, {
          key: 'getNormalizedXCoordinate_',
          value: function getNormalizedXCoordinate_(evt) {
            var targetClientRect = evt.target.getBoundingClientRect();
            var xCoordinate = evt.clientX;
            return xCoordinate - targetClientRect.left;
          }
          /**
           * Returns a map of all subcomponents to subfoundations.
           * @return {!FoundationMapType}
           */

        }, {
          key: 'getFoundationMap_',
          value: function getFoundationMap_() {
            return {
              leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined,
              helperText: this.helperText_ ? this.helperText_.foundation : undefined
            };
          }
          /**
           * Sets the selected index of the enhanced menu.
           * @param {number} index
           * @private
           */

        }, {
          key: 'setEnhancedSelectedIndex_',
          value: function setEnhancedSelectedIndex_(index) {
            var selectedItem = this.menu_.items[index];
            this.selectedText_.textContent = selectedItem ? selectedItem.textContent.trim() : '';
            var previouslySelected = this.menuElement_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
            /* strings */
            ].SELECTED_ITEM_SELECTOR);

            if (previouslySelected) {
              previouslySelected.classList.remove(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
              /* cssClasses */
              ].SELECTED_ITEM_CLASS);
              previouslySelected.removeAttribute(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
              /* strings */
              ].ARIA_SELECTED_ATTR);
            }

            if (selectedItem) {
              selectedItem.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
              /* cssClasses */
              ].SELECTED_ITEM_CLASS);
              selectedItem.setAttribute(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
              /* strings */
              ].ARIA_SELECTED_ATTR, 'true');
            } // Synchronize hidden input's value with data-value attribute of selected item.
            // This code path is also followed when setting value directly, so this covers all cases.


            if (this.hiddenInput_) {
              this.hiddenInput_.value = selectedItem ? selectedItem.getAttribute(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
              /* strings */
              ].ENHANCED_VALUE_ATTR) || '' : '';
            }

            this.layout();
          }
        }, {
          key: 'initialSyncRequiredState_',
          value: function initialSyncRequiredState_() {
            var element = this.nativeControl_ ? this.nativeControl_ : this.selectedText_;
            var isRequired = element.required || element.getAttribute('aria-required') === 'true' || this.root_.classList.contains(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
            /* cssClasses */
            ].REQUIRED);

            if (isRequired) {
              if (this.nativeControl_) {
                this.nativeControl_.required = true;
              } else {
                this.selectedText_.setAttribute('aria-required', 'true');
              }

              this.root_.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
              /* cssClasses */
              ].REQUIRED);
            }
          }
        }, {
          key: 'addMutationObserverForRequired_',
          value: function addMutationObserverForRequired_() {
            var _this9 = this;

            var observerHandler = function observerHandler(attributesList) {
              attributesList.some(function (attributeName) {
                if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
                  if (_this9.selectedText_) {
                    if (_this9.selectedText_.getAttribute('aria-required') === 'true') {
                      _this9.root_.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                      /* cssClasses */
                      ].REQUIRED);
                    } else {
                      _this9.root_.classList.remove(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                      /* cssClasses */
                      ].REQUIRED);
                    }
                  } else {
                    if (_this9.nativeControl_.required) {
                      _this9.root_.classList.add(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                      /* cssClasses */
                      ].REQUIRED);
                    } else {
                      _this9.root_.classList.remove(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
                      /* cssClasses */
                      ].REQUIRED);
                    }
                  }

                  return true;
                }
              });
            };

            var getAttributesList = function getAttributesList(mutationsList) {
              return mutationsList.map(function (mutation) {
                return mutation.attributeName;
              });
            };

            var observer = new MutationObserver(function (mutationsList) {
              return observerHandler(getAttributesList(mutationsList));
            });
            var element = this.nativeControl_ ? this.nativeControl_ : this.selectedText_;
            observer.observe(element, {
              attributes: true
            });
            this.validationObserver_ = observer;
          }
        }, {
          key: 'value',

          /**
           * @return {string} The value of the select.
           */
          get: function get() {
            return this.foundation_.getValue();
          }
          /**
           * @param {string} value The value to set on the select.
           */
          ,
          set: function set(value) {
            this.foundation_.setValue(value);
          }
          /**
           * @return {number} The selected index of the select.
           */

        }, {
          key: 'selectedIndex',
          get: function get() {
            var selectedIndex = void 0;

            if (this.menuElement_) {
              var selectedEl =
              /** @type {!HTMLElement} */
              this.menuElement_.querySelector(__WEBPACK_IMPORTED_MODULE_7__constants__["c"
              /* strings */
              ].SELECTED_ITEM_SELECTOR);
              selectedIndex = this.menu_.items.indexOf(selectedEl);
            } else {
              selectedIndex = this.nativeControl_.selectedIndex;
            }

            return selectedIndex;
          }
          /**
           * @param {number} selectedIndex The index of the option to be set on the select.
           */
          ,
          set: function set(selectedIndex) {
            this.foundation_.setSelectedIndex(selectedIndex);
          }
          /**
           * @return {boolean} True if the select is disabled.
           */

        }, {
          key: 'disabled',
          get: function get() {
            return this.root_.classList.contains(__WEBPACK_IMPORTED_MODULE_7__constants__["a"
            /* cssClasses */
            ].DISABLED) || (this.nativeControl_ ? this.nativeControl_.disabled : false);
          }
          /**
           * @param {boolean} disabled Sets the select disabled or enabled.
           */
          ,
          set: function set(disabled) {
            this.foundation_.setDisabled(disabled);
          }
          /**
           * Sets the aria label of the leading icon.
           * @param {string} label
           */

        }, {
          key: 'leadingIconAriaLabel',
          set: function set(label) {
            this.foundation_.setLeadingIconAriaLabel(label);
          }
          /**
           * Sets the text content of the leading icon.
           * @param {string} content
           */

        }, {
          key: 'leadingIconContent',
          set: function set(content) {
            this.foundation_.setLeadingIconContent(content);
          }
          /**
           * Sets the text content of the helper text.
           * @param {string} content
           */

        }, {
          key: 'helperTextContent',
          set: function set(content) {
            this.foundation_.setHelperTextContent(content);
          }
          /**
           * Sets the current invalid state of the select.
           * @param {boolean} isValid
           */

        }, {
          key: 'valid',
          set: function set(isValid) {
            this.foundation_.setValid(isValid);
          }
          /**
           * Checks if the select is in a valid state.
           * @return {boolean}
           */
          ,
          get: function get() {
            return this.foundation_.isValid();
          }
          /**
           * Sets the control to the required state.
           * @param {boolean} isRequired
           */

        }, {
          key: 'required',
          set: function set(isRequired) {
            if (this.nativeControl_) {
              this.nativeControl_.required = isRequired;
            } else {
              if (isRequired) {
                this.selectedText_.setAttribute('aria-required', isRequired.toString());
              } else {
                this.selectedText_.removeAttribute('aria-required');
              }
            }
          }
          /**
           * Returns whether the select is required.
           * @return {boolean}
           */
          ,
          get: function get() {
            if (this.nativeControl_) {
              return this.nativeControl_.required;
            } else {
              return this.selectedText_.getAttribute('aria-required') === 'true';
            }
          }
        }], [{
          key: 'attachTo',
          value: function attachTo(root) {
            return new MDCSelect(root);
          }
        }]);

        return MDCSelect;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_index__["MDCComponent"]);
      /***/

    },
    /* 130 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_index__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(72);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__icon_index__ = __webpack_require__(51);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__helper_text_index__ = __webpack_require__(52);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(75);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2016 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /* eslint-disable no-unused-vars */

      /* eslint-enable no-unused-vars */

      /**
       * @extends {MDCFoundation<!MDCSelectAdapter>}
       * @final
       */


      var MDCSelectFoundation = function (_MDCFoundation) {
        _inherits(MDCSelectFoundation, _MDCFoundation);

        _createClass(MDCSelectFoundation, null, [{
          key: 'cssClasses',

          /** @return enum {string} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ];
          }
          /** @return enum {number} */

        }, {
          key: 'numbers',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_4__constants__["b"
            /* numbers */
            ];
          }
          /** @return enum {string} */

        }, {
          key: 'strings',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_4__constants__["c"
            /* strings */
            ];
          }
          /**
           * {@see MDCSelectAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCSelectAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCSelectAdapter} */
              {
                addClass: function addClass()
                /* className: string */
                {},
                removeClass: function removeClass()
                /* className: string */
                {},
                hasClass: function hasClass() {
                  return (
                    /* className: string */
                    false
                  );
                },
                activateBottomLine: function activateBottomLine() {},
                deactivateBottomLine: function deactivateBottomLine() {},
                setValue: function setValue() {},
                getValue: function getValue() {},
                floatLabel: function floatLabel()
                /* value: boolean */
                {},
                getLabelWidth: function getLabelWidth() {},
                hasOutline: function hasOutline() {
                  return false;
                },
                notchOutline: function notchOutline()
                /* labelWidth: number, */
                {},
                closeOutline: function closeOutline() {},
                openMenu: function openMenu() {},
                closeMenu: function closeMenu() {},
                isMenuOpen: function isMenuOpen() {},
                setSelectedIndex: function setSelectedIndex() {},
                setDisabled: function setDisabled() {},
                setRippleCenter: function setRippleCenter() {},
                notifyChange: function notifyChange() {},
                checkValidity: function checkValidity() {},
                setValid: function setValid() {}
              }
            );
          }
          /**
           * @param {!MDCSelectAdapter} adapter
           * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
           */

        }]);

        function MDCSelectFoundation(adapter) {
          var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] :
          /** @type {!FoundationMapType} */
          {};

          _classCallCheck(this, MDCSelectFoundation);
          /** @type {!MDCSelectIconFoundation|undefined} */


          var _this = _possibleConstructorReturn(this, (MDCSelectFoundation.__proto__ || Object.getPrototypeOf(MDCSelectFoundation)).call(this, _extends(MDCSelectFoundation.defaultAdapter, adapter)));

          _this.leadingIcon_ = foundationMap.leadingIcon;
          /** @type {!MDCSelectHelperTextFoundation|undefined} */

          _this.helperText_ = foundationMap.helperText;
          return _this;
        }

        _createClass(MDCSelectFoundation, [{
          key: 'setSelectedIndex',
          value: function setSelectedIndex(index) {
            this.adapter_.setSelectedIndex(index);
            this.adapter_.closeMenu();
            var didChange = true;
            this.handleChange(didChange);
          }
        }, {
          key: 'setValue',
          value: function setValue(value) {
            this.adapter_.setValue(value);
            var didChange = true;
            this.handleChange(didChange);
          }
        }, {
          key: 'getValue',
          value: function getValue() {
            return this.adapter_.getValue();
          }
        }, {
          key: 'setDisabled',
          value: function setDisabled(isDisabled) {
            isDisabled ? this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].DISABLED) : this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].DISABLED);
            this.adapter_.setDisabled(isDisabled);
            this.adapter_.closeMenu();

            if (this.leadingIcon_) {
              this.leadingIcon_.setDisabled(isDisabled);
            }
          }
          /**
           * @param {string} content Sets the content of the helper text.
           */

        }, {
          key: 'setHelperTextContent',
          value: function setHelperTextContent(content) {
            if (this.helperText_) {
              this.helperText_.setContent(content);
            }
          }
        }, {
          key: 'layout',
          value: function layout() {
            var openNotch = this.getValue().length > 0;
            this.notchOutline(openNotch);
          }
          /**
           * Handles value changes, via change event or programmatic updates.
           */

        }, {
          key: 'handleChange',
          value: function handleChange() {
            var didChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var value = this.getValue();
            var optionHasValue = value.length > 0;
            var isRequired = this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].REQUIRED);
            this.notchOutline(optionHasValue);

            if (!this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].FOCUSED)) {
              this.adapter_.floatLabel(optionHasValue);
            }

            if (didChange) {
              this.adapter_.notifyChange(value);

              if (isRequired) {
                this.setValid(this.isValid());

                if (this.helperText_) {
                  this.helperText_.setValidity(this.isValid());
                }
              }
            }
          }
          /**
           * Handles focus events from select element.
           */

        }, {
          key: 'handleFocus',
          value: function handleFocus() {
            this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].FOCUSED);
            this.adapter_.floatLabel(true);
            this.notchOutline(true);
            this.adapter_.activateBottomLine();

            if (this.helperText_) {
              this.helperText_.showToScreenReader();
            }
          }
          /**
           * Handles blur events from select element.
           */

        }, {
          key: 'handleBlur',
          value: function handleBlur() {
            if (this.adapter_.isMenuOpen()) return;
            this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].FOCUSED);
            this.handleChange(false);
            this.adapter_.deactivateBottomLine();
            var isRequired = this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].REQUIRED);

            if (isRequired) {
              this.setValid(this.isValid());

              if (this.helperText_) {
                this.helperText_.setValidity(this.isValid());
              }
            }
          }
        }, {
          key: 'handleClick',
          value: function handleClick(normalizedX) {
            if (this.adapter_.isMenuOpen()) return;
            this.adapter_.setRippleCenter(normalizedX);
            this.adapter_.openMenu();
          }
        }, {
          key: 'handleKeydown',
          value: function handleKeydown(event) {
            if (this.adapter_.isMenuOpen()) return;
            var isEnter = event.key === 'Enter' || event.keyCode === 13;
            var isSpace = event.key === 'Space' || event.keyCode === 32;
            var arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;
            var arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;

            if (this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].FOCUSED) && (isEnter || isSpace || arrowUp || arrowDown)) {
              this.adapter_.openMenu();
              event.preventDefault();
            }
          }
          /**
           * Opens/closes the notched outline.
           * @param {boolean} openNotch
           */

        }, {
          key: 'notchOutline',
          value: function notchOutline(openNotch) {
            if (!this.adapter_.hasOutline()) {
              return;
            }

            var isFocused = this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_4__constants__["a"
            /* cssClasses */
            ].FOCUSED);

            if (openNotch) {
              var labelScale = __WEBPACK_IMPORTED_MODULE_4__constants__["b"
              /* numbers */
              ].LABEL_SCALE;
              var labelWidth = this.adapter_.getLabelWidth() * labelScale;
              this.adapter_.notchOutline(labelWidth);
            } else if (!isFocused) {
              this.adapter_.closeOutline();
            }
          }
          /**
           * Sets the aria label of the leading icon.
           * @param {string} label
           */

        }, {
          key: 'setLeadingIconAriaLabel',
          value: function setLeadingIconAriaLabel(label) {
            if (this.leadingIcon_) {
              this.leadingIcon_.setAriaLabel(label);
            }
          }
          /**
           * Sets the text content of the leading icon.
           * @param {string} content
           */

        }, {
          key: 'setLeadingIconContent',
          value: function setLeadingIconContent(content) {
            if (this.leadingIcon_) {
              this.leadingIcon_.setContent(content);
            }
          }
        }, {
          key: 'setValid',
          value: function setValid(isValid) {
            this.adapter_.setValid(isValid);
          }
        }, {
          key: 'isValid',
          value: function isValid() {
            return this.adapter_.checkValidity();
          }
        }]);

        return MDCSelectFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_index__["MDCFoundation"]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCSelectFoundation;
      /***/
    },
    /* 131 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(73);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(132);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCFoundation<!MDCSelectIconAdapter>}
       * @final
       */


      var MDCSelectIconFoundation = function (_MDCFoundation) {
        _inherits(MDCSelectIconFoundation, _MDCFoundation);

        _createClass(MDCSelectIconFoundation, null, [{
          key: 'strings',

          /** @return enum {string} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* strings */
            ];
          }
          /**
           * {@see MDCSelectIconAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCSelectIconAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCSelectIconAdapter} */
              {
                getAttr: function getAttr() {},
                setAttr: function setAttr() {},
                removeAttr: function removeAttr() {},
                setContent: function setContent() {},
                registerInteractionHandler: function registerInteractionHandler() {},
                deregisterInteractionHandler: function deregisterInteractionHandler() {},
                notifyIconAction: function notifyIconAction() {}
              }
            );
          }
          /**
           * @param {!MDCSelectIconAdapter} adapter
           */

        }]);

        function MDCSelectIconFoundation(adapter) {
          _classCallCheck(this, MDCSelectIconFoundation);
          /** @private {string?} */


          var _this = _possibleConstructorReturn(this, (MDCSelectIconFoundation.__proto__ || Object.getPrototypeOf(MDCSelectIconFoundation)).call(this, _extends(MDCSelectIconFoundation.defaultAdapter, adapter)));

          _this.savedTabIndex_ = null;
          /** @private {function(!Event): undefined} */

          _this.interactionHandler_ = function (evt) {
            return _this.handleInteraction(evt);
          };

          return _this;
        }

        _createClass(MDCSelectIconFoundation, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            this.savedTabIndex_ = this.adapter_.getAttr('tabindex');
            ['click', 'keydown'].forEach(function (evtType) {
              _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
            });
          }
        }, {
          key: 'destroy',
          value: function destroy() {
            var _this3 = this;

            ['click', 'keydown'].forEach(function (evtType) {
              _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
            });
          }
          /** @param {boolean} disabled */

        }, {
          key: 'setDisabled',
          value: function setDisabled(disabled) {
            if (!this.savedTabIndex_) {
              return;
            }

            if (disabled) {
              this.adapter_.setAttr('tabindex', '-1');
              this.adapter_.removeAttr('role');
            } else {
              this.adapter_.setAttr('tabindex', this.savedTabIndex_);
              this.adapter_.setAttr('role', __WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* strings */
              ].ICON_ROLE);
            }
          }
          /** @param {string} label */

        }, {
          key: 'setAriaLabel',
          value: function setAriaLabel(label) {
            this.adapter_.setAttr('aria-label', label);
          }
          /** @param {string} content */

        }, {
          key: 'setContent',
          value: function setContent(content) {
            this.adapter_.setContent(content);
          }
          /**
           * Handles an interaction event
           * @param {!Event} evt
           */

        }, {
          key: 'handleInteraction',
          value: function handleInteraction(evt) {
            if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
              this.adapter_.notifyIconAction();
            }
          }
        }]);

        return MDCSelectIconFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCSelectIconFoundation;
      /***/
    },
    /* 132 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return strings;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var strings = {
        ICON_EVENT: 'MDCSelect:icon',
        ICON_ROLE: 'button'
      };
      /***/
    },
    /* 133 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(74);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(134);

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /**
       * @extends {MDCFoundation<!MDCSelectHelperTextAdapter>}
       * @final
       */


      var MDCSelectHelperTextFoundation = function (_MDCFoundation) {
        _inherits(MDCSelectHelperTextFoundation, _MDCFoundation);

        _createClass(MDCSelectHelperTextFoundation, null, [{
          key: 'cssClasses',

          /** @return enum {string} */
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ];
          }
          /** @return enum {string} */

        }, {
          key: 'strings',
          get: function get() {
            return __WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ];
          }
          /**
           * {@see MDCSelectHelperTextAdapter} for typing information on parameters and return
           * types.
           * @return {!MDCSelectHelperTextAdapter}
           */

        }, {
          key: 'defaultAdapter',
          get: function get() {
            return (
              /** @type {!MDCSelectHelperTextAdapter} */
              {
                addClass: function addClass() {},
                removeClass: function removeClass() {},
                hasClass: function hasClass() {},
                setAttr: function setAttr() {},
                removeAttr: function removeAttr() {},
                setContent: function setContent() {}
              }
            );
          }
          /**
           * @param {!MDCSelectHelperTextAdapter} adapter
           */

        }]);

        function MDCSelectHelperTextFoundation(adapter) {
          _classCallCheck(this, MDCSelectHelperTextFoundation);

          return _possibleConstructorReturn(this, (MDCSelectHelperTextFoundation.__proto__ || Object.getPrototypeOf(MDCSelectHelperTextFoundation)).call(this, _extends(MDCSelectHelperTextFoundation.defaultAdapter, adapter)));
        }
        /**
         * Sets the content of the helper text field.
         * @param {string} content
         */


        _createClass(MDCSelectHelperTextFoundation, [{
          key: 'setContent',
          value: function setContent(content) {
            this.adapter_.setContent(content);
          }
          /** @param {boolean} isPersistent Sets the persistency of the helper text. */

        }, {
          key: 'setPersistent',
          value: function setPersistent(isPersistent) {
            if (isPersistent) {
              this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ].HELPER_TEXT_PERSISTENT);
            } else {
              this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ].HELPER_TEXT_PERSISTENT);
            }
          }
          /**
           * @param {boolean} isValidation True to make the helper text act as an
           *   error validation message.
           */

        }, {
          key: 'setValidation',
          value: function setValidation(isValidation) {
            if (isValidation) {
              this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ].HELPER_TEXT_VALIDATION_MSG);
            } else {
              this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ].HELPER_TEXT_VALIDATION_MSG);
            }
          }
          /** Makes the helper text visible to the screen reader. */

        }, {
          key: 'showToScreenReader',
          value: function showToScreenReader() {
            this.adapter_.removeAttr(__WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ].ARIA_HIDDEN);
          }
          /**
           * Sets the validity of the helper text based on the select validity.
           * @param {boolean} selectIsValid
           */

        }, {
          key: 'setValidity',
          value: function setValidity(selectIsValid) {
            var helperTextIsPersistent = this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].HELPER_TEXT_PERSISTENT);
            var helperTextIsValidationMsg = this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
            /* cssClasses */
            ].HELPER_TEXT_VALIDATION_MSG);
            var validationMsgNeedsDisplay = helperTextIsValidationMsg && !selectIsValid;

            if (validationMsgNeedsDisplay) {
              this.adapter_.setAttr(__WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* strings */
              ].ROLE, 'alert');
            } else {
              this.adapter_.removeAttr(__WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* strings */
              ].ROLE);
            }

            if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
              this.hide_();
            }
          }
          /**
           * Hides the help text from screen readers.
           * @private
           */

        }, {
          key: 'hide_',
          value: function hide_() {
            this.adapter_.setAttr(__WEBPACK_IMPORTED_MODULE_2__constants__["b"
            /* strings */
            ].ARIA_HIDDEN, 'true');
          }
        }]);

        return MDCSelectHelperTextFoundation;
      }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
      /* default */
      ]);
      /* harmony default export */


      __webpack_exports__["a"] = MDCSelectHelperTextFoundation;
      /***/
    },
    /* 134 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return strings;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return cssClasses;
      });
      /**
       * @license
       * Copyright 2018 Google Inc.
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in
       * all copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       * THE SOFTWARE.
       */

      /** @enum {string} */


      var strings = {
        ARIA_HIDDEN: 'aria-hidden',
        ROLE: 'role'
      };
      /** @enum {string} */

      var cssClasses = {
        HELPER_TEXT_PERSISTENT: 'mdc-select-helper-text--persistent',
        HELPER_TEXT_VALIDATION_MSG: 'mdc-select-helper-text--validation-msg'
      };
      /***/
    }
    /******/
    ])
  );
});

/***/ }),

/***/ "../../node_modules/@material/switch/dist/mdc.switch.js":
/*!************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/switch/dist/mdc.switch.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 Material Components for the Web
 Copyright (c) 2018 Google Inc.
 License: MIT
*/
(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory();else {}
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            /******/
            configurable: false,

            /******/
            enumerable: true,

            /******/
            get: getter
            /******/

          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 140);
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      0:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        /**
         * @license
         * Copyright 2016 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /**
         * @template A
         */


        var MDCFoundation = function () {
          _createClass(MDCFoundation, null, [{
            key: "cssClasses",

            /** @return enum{cssClasses} */
            get: function get() {
              // Classes extending MDCFoundation should implement this method to return an object which exports every
              // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
              return {};
            }
            /** @return enum{strings} */

          }, {
            key: "strings",
            get: function get() {
              // Classes extending MDCFoundation should implement this method to return an object which exports all
              // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
              return {};
            }
            /** @return enum{numbers} */

          }, {
            key: "numbers",
            get: function get() {
              // Classes extending MDCFoundation should implement this method to return an object which exports all
              // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
              return {};
            }
            /** @return {!Object} */

          }, {
            key: "defaultAdapter",
            get: function get() {
              // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
              // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
              // validation.
              return {};
            }
            /**
             * @param {A=} adapter
             */

          }]);

          function MDCFoundation() {
            var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _classCallCheck(this, MDCFoundation);
            /** @protected {!A} */


            this.adapter_ = adapter;
          }

          _createClass(MDCFoundation, [{
            key: "init",
            value: function init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
            }
          }, {
            key: "destroy",
            value: function destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
            }
          }]);

          return MDCFoundation;
        }();
        /* harmony default export */


        __webpack_exports__["a"] = MDCFoundation;
        /***/
      },

      /***/
      1:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */

        var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(0);

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        /**
         * @license
         * Copyright 2016 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /**
         * @template F
         */


        var MDCComponent = function () {
          _createClass(MDCComponent, null, [{
            key: 'attachTo',

            /**
             * @param {!Element} root
             * @return {!MDCComponent}
             */
            value: function attachTo(root) {
              // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
              // returns an instantiated component with its root set to that element. Also note that in the cases of
              // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
              // from getDefaultFoundation().
              return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a"
              /* default */
              ]());
            }
            /**
             * @param {!Element} root
             * @param {F=} foundation
             * @param {...?} args
             */

          }]);

          function MDCComponent(root) {
            var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            _classCallCheck(this, MDCComponent);
            /** @protected {!Element} */


            this.root_ = root;

            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              args[_key - 2] = arguments[_key];
            }

            this.initialize.apply(this, args); // Note that we initialize foundation here and not within the constructor's default param so that
            // this.root_ is defined and can be used within the foundation class.

            /** @protected {!F} */

            this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
            this.foundation_.init();
            this.initialSyncWithDOM();
          }

          _createClass(MDCComponent, [{
            key: 'initialize',
            value: function initialize()
            /* ...args */
            {} // Subclasses can override this to do any additional setup work that would be considered part of a
            // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
            // initialized. Any additional arguments besides root and foundation will be passed in here.

            /**
             * @return {!F} foundation
             */

          }, {
            key: 'getDefaultFoundation',
            value: function getDefaultFoundation() {
              // Subclasses must override this method to return a properly configured foundation class for the
              // component.
              throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
            }
          }, {
            key: 'initialSyncWithDOM',
            value: function initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
              // object. An example of this would be a form control wrapper that needs to synchronize its internal state
              // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
              // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
            }
          }, {
            key: 'destroy',
            value: function destroy() {
              // Subclasses may implement this method to release any resources / deregister any listeners they have
              // attached. An example of this might be deregistering a resize event from the window object.
              this.foundation_.destroy();
            }
            /**
             * Wrapper method to add an event listener to the component's root element. This is most useful when
             * listening for custom events.
             * @param {string} evtType
             * @param {!Function} handler
             */

          }, {
            key: 'listen',
            value: function listen(evtType, handler) {
              this.root_.addEventListener(evtType, handler);
            }
            /**
             * Wrapper method to remove an event listener to the component's root element. This is most useful when
             * unlistening for custom events.
             * @param {string} evtType
             * @param {!Function} handler
             */

          }, {
            key: 'unlisten',
            value: function unlisten(evtType, handler) {
              this.root_.removeEventListener(evtType, handler);
            }
            /**
             * Fires a cross-browser-compatible custom event from the component root of the given type,
             * with the given data.
             * @param {string} evtType
             * @param {!Object} evtData
             * @param {boolean=} shouldBubble
             */

          }, {
            key: 'emit',
            value: function emit(evtType, evtData) {
              var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
              var evt = void 0;

              if (typeof CustomEvent === 'function') {
                evt = new CustomEvent(evtType, {
                  detail: evtData,
                  bubbles: shouldBubble
                });
              } else {
                evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(evtType, shouldBubble, false, evtData);
              }

              this.root_.dispatchEvent(evt);
            }
          }]);

          return MDCComponent;
        }();
        /* harmony default export */


        __webpack_exports__["a"] = MDCComponent;
        /***/
      },

      /***/
      140:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        Object.defineProperty(__webpack_exports__, "__esModule", {
          value: true
        });
        /* harmony export (binding) */

        __webpack_require__.d(__webpack_exports__, "MDCSwitch", function () {
          return MDCSwitch;
        });
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_1__material_selection_control_index__ = __webpack_require__(8);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(141);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_3__material_ripple_index__ = __webpack_require__(4);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_4__material_ripple_util__ = __webpack_require__(2);
        /* harmony reexport (binding) */


        __webpack_require__.d(__webpack_exports__, "MDCSwitchFoundation", function () {
          return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
        });

        var _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        /**
         * @license
         * Copyright 2018 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /* eslint-disable no-unused-vars */

        /* eslint-enable no-unused-vars */

        /**
         * @extends MDCComponent<!MDCSwitchFoundation>
         * @implements {MDCSelectionControl}
         */


        var MDCSwitch = function (_MDCComponent) {
          _inherits(MDCSwitch, _MDCComponent);

          _createClass(MDCSwitch, null, [{
            key: 'attachTo',
            value: function attachTo(root) {
              return new MDCSwitch(root);
            }
          }]);

          function MDCSwitch() {
            var _ref;

            _classCallCheck(this, MDCSwitch);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            /** @private {!MDCRipple} */


            var _this = _possibleConstructorReturn(this, (_ref = MDCSwitch.__proto__ || Object.getPrototypeOf(MDCSwitch)).call.apply(_ref, [this].concat(args)));

            _this.ripple_ = _this.initRipple_();
            /** @private {!Function} */

            _this.changeHandler_;
            return _this;
          }

          _createClass(MDCSwitch, [{
            key: 'destroy',
            value: function destroy() {
              _get(MDCSwitch.prototype.__proto__ || Object.getPrototypeOf(MDCSwitch.prototype), 'destroy', this).call(this);

              this.ripple_.destroy();
              this.nativeControl_.removeEventListener('change', this.changeHandler_);
            }
          }, {
            key: 'initialSyncWithDOM',
            value: function initialSyncWithDOM() {
              this.changeHandler_ = this.foundation_.handleChange.bind(this.foundation_);
              this.nativeControl_.addEventListener('change', this.changeHandler_); // Sometimes the checked state of the input element is saved in the history.
              // The switch styling should match the checked state of the input element.
              // Do an initial sync between the native control and the foundation.

              this.checked = this.checked;
            }
            /**
             * Returns the state of the native control element, or null if the native control element is not present.
             * @return {?MDCSelectionControlState}
             * @private
             */

          }, {
            key: 'initRipple_',

            /**
             * @return {!MDCRipple}
             * @private
             */
            value: function initRipple_() {
              var _this2 = this;

              var RIPPLE_SURFACE_SELECTOR = __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
              /* default */
              ].strings.RIPPLE_SURFACE_SELECTOR;
              var rippleSurface =
              /** @type {!Element} */
              this.root_.querySelector(RIPPLE_SURFACE_SELECTOR);
              var MATCHES = Object(__WEBPACK_IMPORTED_MODULE_4__material_ripple_util__["getMatchesProperty"])(HTMLElement.prototype);

              var adapter = _extends(__WEBPACK_IMPORTED_MODULE_3__material_ripple_index__["MDCRipple"].createAdapter(this), {
                isUnbounded: function isUnbounded() {
                  return true;
                },
                isSurfaceActive: function isSurfaceActive() {
                  return _this2.nativeControl_[MATCHES](':active');
                },
                addClass: function addClass(className) {
                  return rippleSurface.classList.add(className);
                },
                removeClass: function removeClass(className) {
                  return rippleSurface.classList.remove(className);
                },
                registerInteractionHandler: function registerInteractionHandler(type, handler) {
                  return _this2.nativeControl_.addEventListener(type, handler);
                },
                deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
                  return _this2.nativeControl_.removeEventListener(type, handler);
                },
                updateCssVariable: function updateCssVariable(varName, value) {
                  return rippleSurface.style.setProperty(varName, value);
                },
                computeBoundingRect: function computeBoundingRect() {
                  return rippleSurface.getBoundingClientRect();
                }
              });

              var foundation = new __WEBPACK_IMPORTED_MODULE_3__material_ripple_index__["MDCRippleFoundation"](adapter);
              return new __WEBPACK_IMPORTED_MODULE_3__material_ripple_index__["MDCRipple"](this.root_, foundation);
            }
            /** @return {!MDCSwitchFoundation} */

          }, {
            key: 'getDefaultFoundation',
            value: function getDefaultFoundation() {
              var _this3 = this;

              return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
              /* default */
              ]({
                addClass: function addClass(className) {
                  return _this3.root_.classList.add(className);
                },
                removeClass: function removeClass(className) {
                  return _this3.root_.classList.remove(className);
                },
                setNativeControlChecked: function setNativeControlChecked(checked) {
                  return _this3.nativeControl_.checked = checked;
                },
                setNativeControlDisabled: function setNativeControlDisabled(disabled) {
                  return _this3.nativeControl_.disabled = disabled;
                }
              });
            }
            /** @return {!MDCRipple} */

          }, {
            key: 'nativeControl_',
            get: function get() {
              var NATIVE_CONTROL_SELECTOR = __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
              /* default */
              ].strings.NATIVE_CONTROL_SELECTOR;
              var el =
              /** @type {?MDCSelectionControlState} */
              this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
              return el;
            }
          }, {
            key: 'ripple',
            get: function get() {
              return this.ripple_;
            }
            /** @return {boolean} */

          }, {
            key: 'checked',
            get: function get() {
              return this.nativeControl_.checked;
            }
            /** @param {boolean} checked */
            ,
            set: function set(checked) {
              this.foundation_.setChecked(checked);
            }
            /** @return {boolean} */

          }, {
            key: 'disabled',
            get: function get() {
              return this.nativeControl_.disabled;
            }
            /** @param {boolean} disabled */
            ,
            set: function set(disabled) {
              this.foundation_.setDisabled(disabled);
            }
          }]);

          return MDCSwitch;
        }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
        /* default */
        ]);
        /***/

      },

      /***/
      141:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */

        var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(142);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(143);

        var _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        /**
         * @license
         * Copyright 2018 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /* eslint-enable no-unused-vars */

        /**
         * @extends {MDCFoundation<!MDCSwitchAdapter>}
         */


        var MDCSwitchFoundation = function (_MDCFoundation) {
          _inherits(MDCSwitchFoundation, _MDCFoundation);

          _createClass(MDCSwitchFoundation, null, [{
            key: 'strings',

            /** @return enum {string} */
            get: function get() {
              return __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* strings */
              ];
            }
            /** @return enum {string} */

          }, {
            key: 'cssClasses',
            get: function get() {
              return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ];
            }
            /** @return {!MDCSwitchAdapter} */

          }, {
            key: 'defaultAdapter',
            get: function get() {
              return (
                /** @type {!MDCSwitchAdapter} */
                {
                  addClass: function addClass()
                  /* className: string */
                  {},
                  removeClass: function removeClass()
                  /* className: string */
                  {},
                  setNativeControlChecked: function setNativeControlChecked()
                  /* checked: boolean */
                  {},
                  setNativeControlDisabled: function setNativeControlDisabled()
                  /* disabled: boolean */
                  {}
                }
              );
            }
          }]);

          function MDCSwitchFoundation(adapter) {
            _classCallCheck(this, MDCSwitchFoundation);

            return _possibleConstructorReturn(this, (MDCSwitchFoundation.__proto__ || Object.getPrototypeOf(MDCSwitchFoundation)).call(this, _extends(MDCSwitchFoundation.defaultAdapter, adapter)));
          }
          /** @param {boolean} checked */


          _createClass(MDCSwitchFoundation, [{
            key: 'setChecked',
            value: function setChecked(checked) {
              this.adapter_.setNativeControlChecked(checked);
              this.updateCheckedStyling_(checked);
            }
            /** @param {boolean} disabled */

          }, {
            key: 'setDisabled',
            value: function setDisabled(disabled) {
              this.adapter_.setNativeControlDisabled(disabled);

              if (disabled) {
                this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
                /* cssClasses */
                ].DISABLED);
              } else {
                this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
                /* cssClasses */
                ].DISABLED);
              }
            }
            /**
             * Handles the change event for the switch native control.
             * @param {!Event} evt
             */

          }, {
            key: 'handleChange',
            value: function handleChange(evt) {
              this.updateCheckedStyling_(evt.target.checked);
            }
            /**
             * Updates the styling of the switch based on its checked state.
             * @param {boolean} checked
             * @private
             */

          }, {
            key: 'updateCheckedStyling_',
            value: function updateCheckedStyling_(checked) {
              if (checked) {
                this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
                /* cssClasses */
                ].CHECKED);
              } else {
                this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a"
                /* cssClasses */
                ].CHECKED);
              }
            }
          }]);

          return MDCSwitchFoundation;
        }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
        /* default */
        ]);
        /* harmony default export */


        __webpack_exports__["a"] = MDCSwitchFoundation;
        /***/
      },

      /***/
      142:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        /**
         * @license
         * Copyright 2018 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /* eslint no-unused-vars: [2, {"args": "none"}] */

        /**
         * Adapter for MDC Switch. Provides an interface for managing
         * - classes
         * - dom
         *
         * Additionally, provides type information for the adapter to the Closure
         * compiler.
         *
         * Implement this adapter for your framework of choice to delegate updates to
         * the component in your framework of choice. See architecture documentation
         * for more details.
         * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
         *
         * @record
         */


        var MDCSwitchAdapter = function () {
          function MDCSwitchAdapter() {
            _classCallCheck(this, MDCSwitchAdapter);
          }

          _createClass(MDCSwitchAdapter, [{
            key: "addClass",

            /** @param {string} className */
            value: function addClass(className) {}
            /** @param {string} className */

          }, {
            key: "removeClass",
            value: function removeClass(className) {}
            /** @param {boolean} checked */

          }, {
            key: "setNativeControlChecked",
            value: function setNativeControlChecked(checked) {}
            /** @param {boolean} disabled */

          }, {
            key: "setNativeControlDisabled",
            value: function setNativeControlDisabled(disabled) {}
          }]);

          return MDCSwitchAdapter;
        }();
        /* unused harmony default export */


        var _unused_webpack_default_export = MDCSwitchAdapter;
        /***/
      },

      /***/
      143:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */

        __webpack_require__.d(__webpack_exports__, "a", function () {
          return cssClasses;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "b", function () {
          return strings;
        });
        /**
         * @license
         * Copyright 2018 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /** @enum {string} */


        var cssClasses = {
          CHECKED: 'mdc-switch--checked',
          DISABLED: 'mdc-switch--disabled'
        };
        /** @enum {string} */

        var strings = {
          NATIVE_CONTROL_SELECTOR: '.mdc-switch__native-control',
          RIPPLE_SURFACE_SELECTOR: '.mdc-switch__thumb-underlay'
        };
        /***/
      },

      /***/
      2:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        Object.defineProperty(__webpack_exports__, "__esModule", {
          value: true
        });
        /* harmony export (binding) */

        __webpack_require__.d(__webpack_exports__, "supportsCssVariables", function () {
          return supportsCssVariables;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "applyPassive", function () {
          return applyPassive;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getMatchesProperty", function () {
          return getMatchesProperty;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getNormalizedEventCoords", function () {
          return getNormalizedEventCoords;
        });
        /**
         * @license
         * Copyright 2016 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /**
         * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
         * @private {boolean|undefined}
         */


        var supportsCssVariables_ = void 0;
        /**
         * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
         * @private {boolean|undefined}
         */

        var supportsPassive_ = void 0;
        /**
         * @param {!Window} windowObj
         * @return {boolean}
         */

        function detectEdgePseudoVarBug(windowObj) {
          // Detect versions of Edge with buggy var() support
          // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
          var document = windowObj.document;
          var node = document.createElement('div');
          node.className = 'mdc-ripple-surface--test-edge-var-bug';
          document.body.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
          // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
          // but Firefox is known to support CSS custom properties correctly.
          // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

          var computedStyle = windowObj.getComputedStyle(node);
          var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
          node.remove();
          return hasPseudoVarBug;
        }
        /**
         * @param {!Window} windowObj
         * @param {boolean=} forceRefresh
         * @return {boolean|undefined}
         */


        function supportsCssVariables(windowObj) {
          var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var supportsCssVariables = supportsCssVariables_;

          if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
            return supportsCssVariables;
          }

          var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';

          if (!supportsFunctionPresent) {
            return;
          }

          var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
          // See: README section on Safari

          var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

          if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
            supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
          } else {
            supportsCssVariables = false;
          }

          if (!forceRefresh) {
            supportsCssVariables_ = supportsCssVariables;
          }

          return supportsCssVariables;
        } //

        /**
         * Determine whether the current browser supports passive event listeners, and if so, use them.
         * @param {!Window=} globalObj
         * @param {boolean=} forceRefresh
         * @return {boolean|!EventListenerOptions}
         */


        function applyPassive() {
          var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
          var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (supportsPassive_ === undefined || forceRefresh) {
            var isSupported = false;

            try {
              globalObj.document.addEventListener('test', null, {
                get passive() {
                  isSupported = true;
                  return isSupported;
                }

              });
            } catch (e) {}

            supportsPassive_ = isSupported;
          }

          return supportsPassive_ ?
          /** @type {!EventListenerOptions} */
          {
            passive: true
          } : false;
        }
        /**
         * @param {!Object} HTMLElementPrototype
         * @return {string}
         */


        function getMatchesProperty(HTMLElementPrototype) {
          /**
           * Order is important because we return the first existing method we find.
           * Do not change the order of the items in the below array.
           */
          var matchesMethods = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'];
          var method = 'matches';

          for (var i = 0; i < matchesMethods.length; i++) {
            var matchesMethod = matchesMethods[i];

            if (matchesMethod in HTMLElementPrototype) {
              method = matchesMethod;
              break;
            }
          }

          return method;
        }
        /**
         * @param {!Event} ev
         * @param {{x: number, y: number}} pageOffset
         * @param {!ClientRect} clientRect
         * @return {{x: number, y: number}}
         */


        function getNormalizedEventCoords(ev, pageOffset, clientRect) {
          var x = pageOffset.x,
              y = pageOffset.y;
          var documentX = x + clientRect.left;
          var documentY = y + clientRect.top;
          var normalizedX = void 0;
          var normalizedY = void 0; // Determine touch point relative to the ripple container.

          if (ev.type === 'touchstart') {
            ev =
            /** @type {!TouchEvent} */
            ev;
            normalizedX = ev.changedTouches[0].pageX - documentX;
            normalizedY = ev.changedTouches[0].pageY - documentY;
          } else {
            ev =
            /** @type {!MouseEvent} */
            ev;
            normalizedX = ev.pageX - documentX;
            normalizedY = ev.pageY - documentY;
          }

          return {
            x: normalizedX,
            y: normalizedY
          };
        }
        /***/

      },

      /***/
      3:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        /**
         * @license
         * Copyright 2016 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /* eslint no-unused-vars: [2, {"args": "none"}] */

        /**
         * Adapter for MDC Ripple. Provides an interface for managing
         * - classes
         * - dom
         * - CSS variables
         * - position
         * - dimensions
         * - scroll position
         * - event handlers
         * - unbounded, active and disabled states
         *
         * Additionally, provides type information for the adapter to the Closure
         * compiler.
         *
         * Implement this adapter for your framework of choice to delegate updates to
         * the component in your framework of choice. See architecture documentation
         * for more details.
         * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
         *
         * @record
         */


        var MDCRippleAdapter = function () {
          function MDCRippleAdapter() {
            _classCallCheck(this, MDCRippleAdapter);
          }

          _createClass(MDCRippleAdapter, [{
            key: "browserSupportsCssVars",

            /** @return {boolean} */
            value: function browserSupportsCssVars() {}
            /** @return {boolean} */

          }, {
            key: "isUnbounded",
            value: function isUnbounded() {}
            /** @return {boolean} */

          }, {
            key: "isSurfaceActive",
            value: function isSurfaceActive() {}
            /** @return {boolean} */

          }, {
            key: "isSurfaceDisabled",
            value: function isSurfaceDisabled() {}
            /** @param {string} className */

          }, {
            key: "addClass",
            value: function addClass(className) {}
            /** @param {string} className */

          }, {
            key: "removeClass",
            value: function removeClass(className) {}
            /** @param {!EventTarget} target */

          }, {
            key: "containsEventTarget",
            value: function containsEventTarget(target) {}
            /**
             * @param {string} evtType
             * @param {!Function} handler
             */

          }, {
            key: "registerInteractionHandler",
            value: function registerInteractionHandler(evtType, handler) {}
            /**
             * @param {string} evtType
             * @param {!Function} handler
             */

          }, {
            key: "deregisterInteractionHandler",
            value: function deregisterInteractionHandler(evtType, handler) {}
            /**
             * @param {string} evtType
             * @param {!Function} handler
             */

          }, {
            key: "registerDocumentInteractionHandler",
            value: function registerDocumentInteractionHandler(evtType, handler) {}
            /**
             * @param {string} evtType
             * @param {!Function} handler
             */

          }, {
            key: "deregisterDocumentInteractionHandler",
            value: function deregisterDocumentInteractionHandler(evtType, handler) {}
            /**
             * @param {!Function} handler
             */

          }, {
            key: "registerResizeHandler",
            value: function registerResizeHandler(handler) {}
            /**
             * @param {!Function} handler
             */

          }, {
            key: "deregisterResizeHandler",
            value: function deregisterResizeHandler(handler) {}
            /**
             * @param {string} varName
             * @param {?number|string} value
             */

          }, {
            key: "updateCssVariable",
            value: function updateCssVariable(varName, value) {}
            /** @return {!ClientRect} */

          }, {
            key: "computeBoundingRect",
            value: function computeBoundingRect() {}
            /** @return {{x: number, y: number}} */

          }, {
            key: "getWindowPageOffset",
            value: function getWindowPageOffset() {}
          }]);

          return MDCRippleAdapter;
        }();
        /* unused harmony default export */


        var _unused_webpack_default_export = MDCRippleAdapter;
        /***/
      },

      /***/
      4:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        Object.defineProperty(__webpack_exports__, "__esModule", {
          value: true
        });
        /* harmony export (binding) */

        __webpack_require__.d(__webpack_exports__, "MDCRipple", function () {
          return MDCRipple;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "RippleCapableSurface", function () {
          return RippleCapableSurface;
        });
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__(1);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(3);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(5);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(2);
        /* harmony reexport (binding) */


        __webpack_require__.d(__webpack_exports__, "MDCRippleFoundation", function () {
          return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"];
        });
        /* harmony reexport (module object) */


        __webpack_require__.d(__webpack_exports__, "util", function () {
          return __WEBPACK_IMPORTED_MODULE_3__util__;
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        /**
         * @license
         * Copyright 2016 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /**
         * @extends MDCComponent<!MDCRippleFoundation>
         */


        var MDCRipple = function (_MDCComponent) {
          _inherits(MDCRipple, _MDCComponent);
          /** @param {...?} args */


          function MDCRipple() {
            var _ref;

            _classCallCheck(this, MDCRipple);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            /** @type {boolean} */


            var _this = _possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

            _this.disabled = false;
            /** @private {boolean} */

            _this.unbounded_;
            return _this;
          }
          /**
           * @param {!Element} root
           * @param {{isUnbounded: (boolean|undefined)}=} options
           * @return {!MDCRipple}
           */


          _createClass(MDCRipple, [{
            key: 'setUnbounded_',

            /**
             * Closure Compiler throws an access control error when directly accessing a
             * protected or private property inside a getter/setter, like unbounded above.
             * By accessing the protected property inside a method, we solve that problem.
             * That's why this function exists.
             * @private
             */
            value: function setUnbounded_() {
              this.foundation_.setUnbounded(this.unbounded_);
            }
          }, {
            key: 'activate',
            value: function activate() {
              this.foundation_.activate();
            }
          }, {
            key: 'deactivate',
            value: function deactivate() {
              this.foundation_.deactivate();
            }
          }, {
            key: 'layout',
            value: function layout() {
              this.foundation_.layout();
            }
            /**
             * @return {!MDCRippleFoundation}
             * @override
             */

          }, {
            key: 'getDefaultFoundation',
            value: function getDefaultFoundation() {
              return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a"
              /* default */
              ](MDCRipple.createAdapter(this));
            }
            /** @override */

          }, {
            key: 'initialSyncWithDOM',
            value: function initialSyncWithDOM() {
              this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
            }
          }, {
            key: 'unbounded',

            /** @return {boolean} */
            get: function get() {
              return this.unbounded_;
            }
            /** @param {boolean} unbounded */
            ,
            set: function set(unbounded) {
              this.unbounded_ = Boolean(unbounded);
              this.setUnbounded_();
            }
          }], [{
            key: 'attachTo',
            value: function attachTo(root) {
              var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                  _ref2$isUnbounded = _ref2.isUnbounded,
                  isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

              var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

              if (isUnbounded !== undefined) {
                ripple.unbounded =
                /** @type {boolean} */
                isUnbounded;
              }

              return ripple;
            }
            /**
             * @param {!RippleCapableSurface} instance
             * @return {!MDCRippleAdapter}
             */

          }, {
            key: 'createAdapter',
            value: function createAdapter(instance) {
              var MATCHES = __WEBPACK_IMPORTED_MODULE_3__util__["getMatchesProperty"](HTMLElement.prototype);

              return {
                browserSupportsCssVars: function browserSupportsCssVars() {
                  return __WEBPACK_IMPORTED_MODULE_3__util__["supportsCssVariables"](window);
                },
                isUnbounded: function isUnbounded() {
                  return instance.unbounded;
                },
                isSurfaceActive: function isSurfaceActive() {
                  return instance.root_[MATCHES](':active');
                },
                isSurfaceDisabled: function isSurfaceDisabled() {
                  return instance.disabled;
                },
                addClass: function addClass(className) {
                  return instance.root_.classList.add(className);
                },
                removeClass: function removeClass(className) {
                  return instance.root_.classList.remove(className);
                },
                containsEventTarget: function containsEventTarget(target) {
                  return instance.root_.contains(target);
                },
                registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
                  return instance.root_.addEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
                },
                deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
                  return instance.root_.removeEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
                },
                registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
                  return document.documentElement.addEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
                },
                deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
                  return document.documentElement.removeEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["applyPassive"]());
                },
                registerResizeHandler: function registerResizeHandler(handler) {
                  return window.addEventListener('resize', handler);
                },
                deregisterResizeHandler: function deregisterResizeHandler(handler) {
                  return window.removeEventListener('resize', handler);
                },
                updateCssVariable: function updateCssVariable(varName, value) {
                  return instance.root_.style.setProperty(varName, value);
                },
                computeBoundingRect: function computeBoundingRect() {
                  return instance.root_.getBoundingClientRect();
                },
                getWindowPageOffset: function getWindowPageOffset() {
                  return {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                  };
                }
              };
            }
          }]);

          return MDCRipple;
        }(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a"
        /* default */
        ]);
        /**
         * See Material Design spec for more details on when to use ripples.
         * https://material.io/guidelines/motion/choreography.html#choreography-creation
         * @record
         */


        var RippleCapableSurface = function RippleCapableSurface() {
          _classCallCheck(this, RippleCapableSurface);
        };
        /** @protected {!Element} */


        RippleCapableSurface.prototype.root_;
        /**
         * Whether or not the ripple bleeds out of the bounds of the element.
         * @type {boolean|undefined}
         */

        RippleCapableSurface.prototype.unbounded;
        /**
         * Whether or not the ripple is attached to a disabled component.
         * @type {boolean|undefined}
         */

        RippleCapableSurface.prototype.disabled;
        /***/
      },

      /***/
      5:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */

        var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(3);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(6);
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(2);

        var _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        /**
         * @license
         * Copyright 2016 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /**
         * @typedef {{
         *   isActivated: (boolean|undefined),
         *   hasDeactivationUXRun: (boolean|undefined),
         *   wasActivatedByPointer: (boolean|undefined),
         *   wasElementMadeActive: (boolean|undefined),
         *   activationEvent: (!Event|undefined),
         *   isProgrammatic: (boolean|undefined)
         * }}
         */


        var ActivationStateType = void 0;
        /**
         * @typedef {{
         *   activate: (string|undefined),
         *   deactivate: (string|undefined),
         *   focus: (string|undefined),
         *   blur: (string|undefined)
         * }}
         */

        var ListenerInfoType = void 0;
        /**
         * @typedef {{
         *   activate: function(!Event),
         *   deactivate: function(!Event=),
         *   focus: function(),
         *   blur: function()
         * }}
         */

        var ListenersType = void 0;
        /**
         * @typedef {{
         *   x: number,
         *   y: number
         * }}
         */

        var PointType = void 0; // Activation events registered on the root element of each instance for activation

        var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

        var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations

        /** @type {!Array<!EventTarget>} */

        var activatedTargets = [];
        /**
         * @extends {MDCFoundation<!MDCRippleAdapter>}
         */

        var MDCRippleFoundation = function (_MDCFoundation) {
          _inherits(MDCRippleFoundation, _MDCFoundation);

          _createClass(MDCRippleFoundation, null, [{
            key: 'cssClasses',
            get: function get() {
              return __WEBPACK_IMPORTED_MODULE_2__constants__["a"
              /* cssClasses */
              ];
            }
          }, {
            key: 'strings',
            get: function get() {
              return __WEBPACK_IMPORTED_MODULE_2__constants__["c"
              /* strings */
              ];
            }
          }, {
            key: 'numbers',
            get: function get() {
              return __WEBPACK_IMPORTED_MODULE_2__constants__["b"
              /* numbers */
              ];
            }
          }, {
            key: 'defaultAdapter',
            get: function get() {
              return {
                browserSupportsCssVars: function browserSupportsCssVars()
                /* boolean - cached */
                {},
                isUnbounded: function isUnbounded()
                /* boolean */
                {},
                isSurfaceActive: function isSurfaceActive()
                /* boolean */
                {},
                isSurfaceDisabled: function isSurfaceDisabled()
                /* boolean */
                {},
                addClass: function addClass()
                /* className: string */
                {},
                removeClass: function removeClass()
                /* className: string */
                {},
                containsEventTarget: function containsEventTarget()
                /* target: !EventTarget */
                {},
                registerInteractionHandler: function registerInteractionHandler()
                /* evtType: string, handler: EventListener */
                {},
                deregisterInteractionHandler: function deregisterInteractionHandler()
                /* evtType: string, handler: EventListener */
                {},
                registerDocumentInteractionHandler: function registerDocumentInteractionHandler()
                /* evtType: string, handler: EventListener */
                {},
                deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler()
                /* evtType: string, handler: EventListener */
                {},
                registerResizeHandler: function registerResizeHandler()
                /* handler: EventListener */
                {},
                deregisterResizeHandler: function deregisterResizeHandler()
                /* handler: EventListener */
                {},
                updateCssVariable: function updateCssVariable()
                /* varName: string, value: string */
                {},
                computeBoundingRect: function computeBoundingRect()
                /* ClientRect */
                {},
                getWindowPageOffset: function getWindowPageOffset()
                /* {x: number, y: number} */
                {}
              };
            }
          }]);

          function MDCRippleFoundation(adapter) {
            _classCallCheck(this, MDCRippleFoundation);
            /** @private {number} */


            var _this = _possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

            _this.layoutFrame_ = 0;
            /** @private {!ClientRect} */

            _this.frame_ =
            /** @type {!ClientRect} */
            {
              width: 0,
              height: 0
            };
            /** @private {!ActivationStateType} */

            _this.activationState_ = _this.defaultActivationState_();
            /** @private {number} */

            _this.initialSize_ = 0;
            /** @private {number} */

            _this.maxRadius_ = 0;
            /** @private {function(!Event)} */

            _this.activateHandler_ = function (e) {
              return _this.activate_(e);
            };
            /** @private {function(!Event=)} */


            _this.deactivateHandler_ = function () {
              return _this.deactivate_();
            };
            /** @private {function(!Event=)} */


            _this.focusHandler_ = function () {
              return _this.handleFocus();
            };
            /** @private {function(!Event=)} */


            _this.blurHandler_ = function () {
              return _this.handleBlur();
            };
            /** @private {!Function} */


            _this.resizeHandler_ = function () {
              return _this.layout();
            };
            /** @private {{left: number, top:number}} */


            _this.unboundedCoords_ = {
              left: 0,
              top: 0
            };
            /** @private {number} */

            _this.fgScale_ = 0;
            /** @private {number} */

            _this.activationTimer_ = 0;
            /** @private {number} */

            _this.fgDeactivationRemovalTimer_ = 0;
            /** @private {boolean} */

            _this.activationAnimationHasEnded_ = false;
            /** @private {!Function} */

            _this.activationTimerCallback_ = function () {
              _this.activationAnimationHasEnded_ = true;

              _this.runDeactivationUXLogicIfReady_();
            };
            /** @private {!Event|undefined} */


            _this.previousActivationEvent_;
            return _this;
          }
          /**
           * We compute this property so that we are not querying information about the client
           * until the point in time where the foundation requests it. This prevents scenarios where
           * client-side feature-detection may happen too early, such as when components are rendered on the server
           * and then initialized at mount time on the client.
           * @return {boolean}
           * @private
           */


          _createClass(MDCRippleFoundation, [{
            key: 'supportsPressRipple_',
            value: function supportsPressRipple_() {
              return this.adapter_.browserSupportsCssVars();
            }
            /**
             * @return {!ActivationStateType}
             */

          }, {
            key: 'defaultActivationState_',
            value: function defaultActivationState_() {
              return {
                isActivated: false,
                hasDeactivationUXRun: false,
                wasActivatedByPointer: false,
                wasElementMadeActive: false,
                activationEvent: undefined,
                isProgrammatic: false
              };
            }
            /** @override */

          }, {
            key: 'init',
            value: function init() {
              var _this2 = this;

              var supportsPressRipple = this.supportsPressRipple_();
              this.registerRootHandlers_(supportsPressRipple);

              if (supportsPressRipple) {
                var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
                    ROOT = _MDCRippleFoundation$.ROOT,
                    UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;
                requestAnimationFrame(function () {
                  _this2.adapter_.addClass(ROOT);

                  if (_this2.adapter_.isUnbounded()) {
                    _this2.adapter_.addClass(UNBOUNDED); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


                    _this2.layoutInternal_();
                  }
                });
              }
            }
            /** @override */

          }, {
            key: 'destroy',
            value: function destroy() {
              var _this3 = this;

              if (this.supportsPressRipple_()) {
                if (this.activationTimer_) {
                  clearTimeout(this.activationTimer_);
                  this.activationTimer_ = 0;
                  this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
                }

                if (this.fgDeactivationRemovalTimer_) {
                  clearTimeout(this.fgDeactivationRemovalTimer_);
                  this.fgDeactivationRemovalTimer_ = 0;
                  this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
                }

                var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
                    ROOT = _MDCRippleFoundation$2.ROOT,
                    UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;
                requestAnimationFrame(function () {
                  _this3.adapter_.removeClass(ROOT);

                  _this3.adapter_.removeClass(UNBOUNDED);

                  _this3.removeCssVars_();
                });
              }

              this.deregisterRootHandlers_();
              this.deregisterDeactivationHandlers_();
            }
            /**
             * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
             * @private
             */

          }, {
            key: 'registerRootHandlers_',
            value: function registerRootHandlers_(supportsPressRipple) {
              var _this4 = this;

              if (supportsPressRipple) {
                ACTIVATION_EVENT_TYPES.forEach(function (type) {
                  _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
                });

                if (this.adapter_.isUnbounded()) {
                  this.adapter_.registerResizeHandler(this.resizeHandler_);
                }
              }

              this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
              this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
            }
            /**
             * @param {!Event} e
             * @private
             */

          }, {
            key: 'registerDeactivationHandlers_',
            value: function registerDeactivationHandlers_(e) {
              var _this5 = this;

              if (e.type === 'keydown') {
                this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
              } else {
                POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
                  _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
                });
              }
            }
            /** @private */

          }, {
            key: 'deregisterRootHandlers_',
            value: function deregisterRootHandlers_() {
              var _this6 = this;

              ACTIVATION_EVENT_TYPES.forEach(function (type) {
                _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
              });
              this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
              this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

              if (this.adapter_.isUnbounded()) {
                this.adapter_.deregisterResizeHandler(this.resizeHandler_);
              }
            }
            /** @private */

          }, {
            key: 'deregisterDeactivationHandlers_',
            value: function deregisterDeactivationHandlers_() {
              var _this7 = this;

              this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
              POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
                _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
              });
            }
            /** @private */

          }, {
            key: 'removeCssVars_',
            value: function removeCssVars_() {
              var _this8 = this;

              var strings = MDCRippleFoundation.strings;
              Object.keys(strings).forEach(function (k) {
                if (k.indexOf('VAR_') === 0) {
                  _this8.adapter_.updateCssVariable(strings[k], null);
                }
              });
            }
            /**
             * @param {!Event=} e
             * @private
             */

          }, {
            key: 'activate_',
            value: function activate_(e) {
              var _this9 = this;

              if (this.adapter_.isSurfaceDisabled()) {
                return;
              }

              var activationState = this.activationState_;

              if (activationState.isActivated) {
                return;
              } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


              var previousActivationEvent = this.previousActivationEvent_;
              var isSameInteraction = previousActivationEvent && e !== undefined && previousActivationEvent.type !== e.type;

              if (isSameInteraction) {
                return;
              }

              activationState.isActivated = true;
              activationState.isProgrammatic = e === undefined;
              activationState.activationEvent = e;
              activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e !== undefined && (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown');
              var hasActivatedChild = e !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
                return _this9.adapter_.containsEventTarget(target);
              });

              if (hasActivatedChild) {
                // Immediately reset activation state, while preserving logic that prevents touch follow-on events
                this.resetActivationState_();
                return;
              }

              if (e !== undefined) {
                activatedTargets.push(
                /** @type {!EventTarget} */
                e.target);
                this.registerDeactivationHandlers_(e);
              }

              activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

              if (activationState.wasElementMadeActive) {
                this.animateActivation_();
              }

              requestAnimationFrame(function () {
                // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
                activatedTargets = [];

                if (!activationState.wasElementMadeActive && e !== undefined && (e.key === ' ' || e.keyCode === 32)) {
                  // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                  // active states inconsistently when they're called within event handling code:
                  // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                  // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                  // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                  // variable is set within a rAF callback for a submit button interaction (#2241).
                  activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);

                  if (activationState.wasElementMadeActive) {
                    _this9.animateActivation_();
                  }
                }

                if (!activationState.wasElementMadeActive) {
                  // Reset activation state immediately if element was not made active.
                  _this9.activationState_ = _this9.defaultActivationState_();
                }
              });
            }
            /**
             * @param {!Event=} e
             * @private
             */

          }, {
            key: 'checkElementMadeActive_',
            value: function checkElementMadeActive_(e) {
              return e !== undefined && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
            }
            /**
             * @param {!Event=} event Optional event containing position information.
             */

          }, {
            key: 'activate',
            value: function activate(event) {
              this.activate_(event);
            }
            /** @private */

          }, {
            key: 'animateActivation_',
            value: function animateActivation_() {
              var _this10 = this;

              var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
                  VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
                  VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
              var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
                  FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
                  FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
              var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
              this.layoutInternal_();
              var translateStart = '';
              var translateEnd = '';

              if (!this.adapter_.isUnbounded()) {
                var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
                    startPoint = _getFgTranslationCoor.startPoint,
                    endPoint = _getFgTranslationCoor.endPoint;

                translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
                translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
              }

              this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
              this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

              clearTimeout(this.activationTimer_);
              clearTimeout(this.fgDeactivationRemovalTimer_);
              this.rmBoundedActivationClasses_();
              this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

              this.adapter_.computeBoundingRect();
              this.adapter_.addClass(FG_ACTIVATION);
              this.activationTimer_ = setTimeout(function () {
                return _this10.activationTimerCallback_();
              }, DEACTIVATION_TIMEOUT_MS);
            }
            /**
             * @private
             * @return {{startPoint: PointType, endPoint: PointType}}
             */

          }, {
            key: 'getFgTranslationCoordinates_',
            value: function getFgTranslationCoordinates_() {
              var _activationState_ = this.activationState_,
                  activationEvent = _activationState_.activationEvent,
                  wasActivatedByPointer = _activationState_.wasActivatedByPointer;
              var startPoint = void 0;

              if (wasActivatedByPointer) {
                startPoint = Object(__WEBPACK_IMPORTED_MODULE_3__util__["getNormalizedEventCoords"])(
                /** @type {!Event} */
                activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
              } else {
                startPoint = {
                  x: this.frame_.width / 2,
                  y: this.frame_.height / 2
                };
              } // Center the element around the start point.


              startPoint = {
                x: startPoint.x - this.initialSize_ / 2,
                y: startPoint.y - this.initialSize_ / 2
              };
              var endPoint = {
                x: this.frame_.width / 2 - this.initialSize_ / 2,
                y: this.frame_.height / 2 - this.initialSize_ / 2
              };
              return {
                startPoint: startPoint,
                endPoint: endPoint
              };
            }
            /** @private */

          }, {
            key: 'runDeactivationUXLogicIfReady_',
            value: function runDeactivationUXLogicIfReady_() {
              var _this11 = this; // This method is called both when a pointing device is released, and when the activation animation ends.
              // The deactivation animation should only run after both of those occur.


              var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
              var _activationState_2 = this.activationState_,
                  hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
                  isActivated = _activationState_2.isActivated;
              var activationHasEnded = hasDeactivationUXRun || !isActivated;

              if (activationHasEnded && this.activationAnimationHasEnded_) {
                this.rmBoundedActivationClasses_();
                this.adapter_.addClass(FG_DEACTIVATION);
                this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                  _this11.adapter_.removeClass(FG_DEACTIVATION);
                }, __WEBPACK_IMPORTED_MODULE_2__constants__["b"
                /* numbers */
                ].FG_DEACTIVATION_MS);
              }
            }
            /** @private */

          }, {
            key: 'rmBoundedActivationClasses_',
            value: function rmBoundedActivationClasses_() {
              var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
              this.adapter_.removeClass(FG_ACTIVATION);
              this.activationAnimationHasEnded_ = false;
              this.adapter_.computeBoundingRect();
            }
          }, {
            key: 'resetActivationState_',
            value: function resetActivationState_() {
              var _this12 = this;

              this.previousActivationEvent_ = this.activationState_.activationEvent;
              this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
              // Store the previous event until it's safe to assume that subsequent events are for new interactions.

              setTimeout(function () {
                return _this12.previousActivationEvent_ = undefined;
              }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
            }
            /**
             * @private
             */

          }, {
            key: 'deactivate_',
            value: function deactivate_() {
              var _this13 = this;

              var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

              if (!activationState.isActivated) {
                return;
              }

              var state =
              /** @type {!ActivationStateType} */
              _extends({}, activationState);

              if (activationState.isProgrammatic) {
                requestAnimationFrame(function () {
                  return _this13.animateDeactivation_(state);
                });
                this.resetActivationState_();
              } else {
                this.deregisterDeactivationHandlers_();
                requestAnimationFrame(function () {
                  _this13.activationState_.hasDeactivationUXRun = true;

                  _this13.animateDeactivation_(state);

                  _this13.resetActivationState_();
                });
              }
            }
          }, {
            key: 'deactivate',
            value: function deactivate() {
              this.deactivate_();
            }
            /**
             * @param {!ActivationStateType} options
             * @private
             */

          }, {
            key: 'animateDeactivation_',
            value: function animateDeactivation_(_ref) {
              var wasActivatedByPointer = _ref.wasActivatedByPointer,
                  wasElementMadeActive = _ref.wasElementMadeActive;

              if (wasActivatedByPointer || wasElementMadeActive) {
                this.runDeactivationUXLogicIfReady_();
              }
            }
          }, {
            key: 'layout',
            value: function layout() {
              var _this14 = this;

              if (this.layoutFrame_) {
                cancelAnimationFrame(this.layoutFrame_);
              }

              this.layoutFrame_ = requestAnimationFrame(function () {
                _this14.layoutInternal_();

                _this14.layoutFrame_ = 0;
              });
            }
            /** @private */

          }, {
            key: 'layoutInternal_',
            value: function layoutInternal_() {
              var _this15 = this;

              this.frame_ = this.adapter_.computeBoundingRect();
              var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
              // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
              // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
              // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
              // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
              // `overflow: hidden`.

              var getBoundedRadius = function getBoundedRadius() {
                var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
                return hypotenuse + MDCRippleFoundation.numbers.PADDING;
              };

              this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

              this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
              this.fgScale_ = this.maxRadius_ / this.initialSize_;
              this.updateLayoutCssVars_();
            }
            /** @private */

          }, {
            key: 'updateLayoutCssVars_',
            value: function updateLayoutCssVars_() {
              var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
                  VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
                  VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
                  VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
                  VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;
              this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
              this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

              if (this.adapter_.isUnbounded()) {
                this.unboundedCoords_ = {
                  left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
                  top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
                };
                this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
                this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
              }
            }
            /** @param {boolean} unbounded */

          }, {
            key: 'setUnbounded',
            value: function setUnbounded(unbounded) {
              var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

              if (unbounded) {
                this.adapter_.addClass(UNBOUNDED);
              } else {
                this.adapter_.removeClass(UNBOUNDED);
              }
            }
          }, {
            key: 'handleFocus',
            value: function handleFocus() {
              var _this16 = this;

              requestAnimationFrame(function () {
                return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
              });
            }
          }, {
            key: 'handleBlur',
            value: function handleBlur() {
              var _this17 = this;

              requestAnimationFrame(function () {
                return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
              });
            }
          }]);

          return MDCRippleFoundation;
        }(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a"
        /* default */
        ]);
        /* harmony default export */


        __webpack_exports__["a"] = MDCRippleFoundation;
        /***/
      },

      /***/
      6:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */

        __webpack_require__.d(__webpack_exports__, "a", function () {
          return cssClasses;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "c", function () {
          return strings;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "b", function () {
          return numbers;
        });
        /**
         * @license
         * Copyright 2016 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */


        var cssClasses = {
          // Ripple is a special case where the "root" component is really a "mixin" of sorts,
          // given that it's an 'upgrade' to an existing component. That being said it is the root
          // CSS class that all other CSS classes derive from.
          ROOT: 'mdc-ripple-upgraded',
          UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
          BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
          FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
          FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
        };
        var strings = {
          VAR_LEFT: '--mdc-ripple-left',
          VAR_TOP: '--mdc-ripple-top',
          VAR_FG_SIZE: '--mdc-ripple-fg-size',
          VAR_FG_SCALE: '--mdc-ripple-fg-scale',
          VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
          VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
        };
        var numbers = {
          PADDING: 10,
          INITIAL_ORIGIN_SCALE: 0.6,
          DEACTIVATION_TIMEOUT_MS: 225,
          // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
          FG_DEACTIVATION_MS: 150,
          // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
          TAP_DELAY_MS: 300
        };
        /***/
      },

      /***/
      8:
      /***/
      function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        Object.defineProperty(__webpack_exports__, "__esModule", {
          value: true
        });
        /* harmony export (binding) */

        __webpack_require__.d(__webpack_exports__, "MDCSelectionControlState", function () {
          return MDCSelectionControlState;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "MDCSelectionControl", function () {
          return MDCSelectionControl;
        });
        /* harmony import */


        var __WEBPACK_IMPORTED_MODULE_0__material_ripple_index__ = __webpack_require__(4);

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        /**
         * @license
         * Copyright 2017 Google Inc.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         * THE SOFTWARE.
         */

        /* eslint-disable no-unused-vars */

        /* eslint-enable no-unused-vars */

        /**
         * @typedef {{
         *   checked: boolean,
         *   indeterminate: boolean,
         *   disabled: boolean,
         *   value: ?string
         * }}
         */


        var MDCSelectionControlState = void 0;
        /**
         * @record
         */

        var MDCSelectionControl = function () {
          function MDCSelectionControl() {
            _classCallCheck(this, MDCSelectionControl);
          }

          _createClass(MDCSelectionControl, [{
            key: 'ripple',

            /** @return {?MDCRipple} */
            get: function get() {}
          }]);

          return MDCSelectionControl;
        }();
        /***/

      }
      /******/

    })
  );
});

/***/ }),

/***/ "../../node_modules/@material/top-app-bar/adapter.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/top-app-bar/adapter.js ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Top App Bar
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Top App Bar into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCTopAppBarAdapter {
  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  addClass(className) {}
  /**
   * Removes a class from the root Element.
   * @param {string} className
   */


  removeClass(className) {}
  /**
   * Returns true if the root Element contains the given class.
   * @param {string} className
   * @return {boolean}
   */


  hasClass(className) {}
  /**
   * Sets the specified inline style property on the root Element to the given value.
   * @param {string} property
   * @param {string} value
   */


  setStyle(property, value) {}
  /**
   * Gets the height of the top app bar.
   * @return {number}
   */


  getTopAppBarHeight() {}
  /**
   * Registers an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  registerNavigationIconInteractionHandler(type, handler) {}
  /**
   * Deregisters an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  deregisterNavigationIconInteractionHandler(type, handler) {}
  /**
   * Emits an event when the navigation icon is clicked.
   */


  notifyNavigationIconClicked() {}
  /** @param {function(!Event)} handler */


  registerScrollHandler(handler) {}
  /** @param {function(!Event)} handler */


  deregisterScrollHandler(handler) {}
  /** @param {function(!Event)} handler */


  registerResizeHandler(handler) {}
  /** @param {function(!Event)} handler */


  deregisterResizeHandler(handler) {}
  /** @return {number} */


  getViewportScrollY() {}
  /** @return {number} */


  getTotalActionItems() {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarAdapter);

/***/ }),

/***/ "../../node_modules/@material/top-app-bar/constants.js":
/*!***********************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/top-app-bar/constants.js ***!
  \***********************************************************************************************************************/
/*! exports provided: strings, cssClasses, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed'
};
/** @enum {number} */

const numbers = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
/** @enum {string} */

const strings = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
};


/***/ }),

/***/ "../../node_modules/@material/top-app-bar/fixed/foundation.js":
/*!******************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/top-app-bar/fixed/foundation.js ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../../node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../adapter */ "../../node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../foundation */ "../../node_modules/@material/top-app-bar/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCTopAppBarFoundation<!MDCFixedTopAppBarFoundation>}
 * @final
 */

class MDCFixedTopAppBarFoundation extends _foundation__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /** State variable for the previous scroll iteration top app bar state */

    this.wasScrolled_ = false;

    this.scrollHandler_ = () => this.fixedScrollHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the modifier class
   * on the fixed top app bar.
   */


  fixedScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.wasScrolled_) {
        this.adapter_.removeClass(_constants__WEBPACK_IMPORTED_MODULE_0__["cssClasses"].FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = false;
      }
    } else {
      if (!this.wasScrolled_) {
        this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_0__["cssClasses"].FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = true;
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCFixedTopAppBarFoundation);

/***/ }),

/***/ "../../node_modules/@material/top-app-bar/foundation.js":
/*!************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/top-app-bar/foundation.js ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "../../node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/base/foundation */ "../../node_modules/@material/base/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCFoundation<!MDCTopAppBarAdapter>}
 */

class MDCTopAppBarBaseFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /** @return enum {string} */
  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_0__["strings"];
  }
  /** @return enum {string} */


  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_0__["cssClasses"];
  }
  /** @return enum {number} */


  static get numbers() {
    return _constants__WEBPACK_IMPORTED_MODULE_0__["numbers"];
  }
  /**
   * {@see MDCTopAppBarAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTopAppBarAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTopAppBarAdapter} */
      {
        hasClass: () =>
        /* className: string */
        {},
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        setStyle: () =>
        /* property: string, value: string */
        {},
        getTopAppBarHeight: () => {},
        registerNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        deregisterNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        notifyNavigationIconClicked: () => {},
        registerScrollHandler: () =>
        /* handler: EventListener */
        {},
        deregisterScrollHandler: () =>
        /* handler: EventListener */
        {},
        registerResizeHandler: () =>
        /* handler: EventListener */
        {},
        deregisterResizeHandler: () =>
        /* handler: EventListener */
        {},
        getViewportScrollY: () =>
        /* number */
        0,
        getTotalActionItems: () =>
        /* number */
        0
      }
    );
  }
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */


  constructor(
  /** @type {!MDCTopAppBarAdapter} */
  adapter) {
    super(Object.assign(MDCTopAppBarBaseFoundation.defaultAdapter, adapter));

    this.navClickHandler_ = () => this.adapter_.notifyNavigationIconClicked();

    this.scrollHandler_ = () => {};
  }

  init() {
    this.adapter_.registerNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

  destroy() {
    this.adapter_.deregisterNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

  initScrollHandler() {
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroyScrollHandler() {
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarBaseFoundation);

/***/ }),

/***/ "../../node_modules/@material/top-app-bar/index.js":
/*!*******************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/top-app-bar/index.js ***!
  \*******************************************************************************************************************/
/*! exports provided: MDCTopAppBar, MDCTopAppBarBaseFoundation, MDCTopAppBarFoundation, MDCFixedTopAppBarFoundation, MDCShortTopAppBarFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBar", function() { return MDCTopAppBar; });
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapter */ "../../node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "../../node_modules/@material/base/component.js");
/* harmony import */ var _material_ripple_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/ripple/index */ "../../node_modules/@material/ripple/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../../node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation */ "../../node_modules/@material/top-app-bar/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarBaseFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _fixed_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fixed/foundation */ "../../node_modules/@material/top-app-bar/fixed/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCFixedTopAppBarFoundation", function() { return _fixed_foundation__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _short_foundation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./short/foundation */ "../../node_modules/@material/top-app-bar/short/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCShortTopAppBarFoundation", function() { return _short_foundation__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _standard_foundation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./standard/foundation */ "../../node_modules/@material/top-app-bar/standard/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarFoundation", function() { return _standard_foundation__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */








/**
 * @extends {MDCComponent<!MDCTopAppBarBaseFoundation>}
 * @final
 */

class MDCTopAppBar extends _material_base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {?Element} */

    this.navIcon_;
    /** @type {?Array<MDCRipple>} */

    this.iconRipples_;
    /** @type {Object} */

    this.scrollTarget_;
  }

  initialize(rippleFactory = el => _material_ripple_index__WEBPACK_IMPORTED_MODULE_2__["MDCRipple"].attachTo(el)) {
    this.navIcon_ = this.root_.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].NAVIGATION_ICON_SELECTOR); // Get all icons in the toolbar and instantiate the ripples

    const icons = [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_ITEM_SELECTOR));

    if (this.navIcon_) {
      icons.push(this.navIcon_);
    }

    this.iconRipples_ = icons.map(icon => {
      const ripple = rippleFactory(icon);
      ripple.unbounded = true;
      return ripple;
    });
    this.scrollTarget_ = window;
  }

  destroy() {
    this.iconRipples_.forEach(iconRipple => iconRipple.destroy());
    super.destroy();
  }

  setScrollTarget(target) {
    this.foundation_.destroyScrollHandler();
    this.scrollTarget_ = target;
    this.foundation_.initScrollHandler();
  }
  /**
   * @param {!Element} root
   * @return {!MDCTopAppBar}
   */


  static attachTo(root) {
    return new MDCTopAppBar(root);
  }
  /**
   * @return {!MDCTopAppBarBaseFoundation}
   */


  getDefaultFoundation() {
    /** @type {!MDCTopAppBarAdapter} */
    const adapter =
    /** @type {!MDCTopAppBarAdapter} */
    Object.assign({
      hasClass: className => this.root_.classList.contains(className),
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      setStyle: (property, value) => this.root_.style.setProperty(property, value),
      getTopAppBarHeight: () => this.root_.clientHeight,
      registerNavigationIconInteractionHandler: (evtType, handler) => {
        if (this.navIcon_) {
          this.navIcon_.addEventListener(evtType, handler);
        }
      },
      deregisterNavigationIconInteractionHandler: (evtType, handler) => {
        if (this.navIcon_) {
          this.navIcon_.removeEventListener(evtType, handler);
        }
      },
      notifyNavigationIconClicked: () => {
        this.emit(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].NAVIGATION_EVENT, {});
      },
      registerScrollHandler: handler => this.scrollTarget_.addEventListener('scroll', handler),
      deregisterScrollHandler: handler => this.scrollTarget_.removeEventListener('scroll', handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportScrollY: () => this.scrollTarget_[this.scrollTarget_ === window ? 'pageYOffset' : 'scrollTop'],
      getTotalActionItems: () => this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_ITEM_SELECTOR).length
    });
    /** @type {!MDCTopAppBarBaseFoundation} */

    let foundation;

    if (this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].SHORT_CLASS)) {
      foundation = new _short_foundation__WEBPACK_IMPORTED_MODULE_6__["default"](adapter);
    } else if (this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].FIXED_CLASS)) {
      foundation = new _fixed_foundation__WEBPACK_IMPORTED_MODULE_5__["default"](adapter);
    } else {
      foundation = new _standard_foundation__WEBPACK_IMPORTED_MODULE_7__["default"](adapter);
    }

    return foundation;
  }

}



/***/ }),

/***/ "../../node_modules/@material/top-app-bar/short/foundation.js":
/*!******************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/top-app-bar/short/foundation.js ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "../../node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../foundation */ "../../node_modules/@material/top-app-bar/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "../../node_modules/@material/top-app-bar/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCShortTopAppBarFoundation>}
 * @final
 */

class MDCShortTopAppBarFoundation extends _foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter); // State variable for the current top app bar state

    this.isCollapsed = false;

    this.scrollHandler_ = () => this.shortAppBarScrollHandler_();
  }

  init() {
    super.init();
    const isAlwaysCollapsed = this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_COLLAPSED_CLASS);

    if (this.adapter_.getTotalActionItems() > 0) {
      this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_HAS_ACTION_ITEM_CLASS);
    }

    if (!isAlwaysCollapsed) {
      this.adapter_.registerScrollHandler(this.scrollHandler_);
      this.shortAppBarScrollHandler_();
    }
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the collapsed modifier class
   * on the short top app bar.
   * @private
   */


  shortAppBarScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.isCollapsed) {
        this.adapter_.removeClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_COLLAPSED_CLASS);
        this.isCollapsed = false;
      }
    } else {
      if (!this.isCollapsed) {
        this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_COLLAPSED_CLASS);
        this.isCollapsed = true;
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCShortTopAppBarFoundation);

/***/ }),

/***/ "../../node_modules/@material/top-app-bar/standard/foundation.js":
/*!*********************************************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/@material/top-app-bar/standard/foundation.js ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "../../node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../foundation */ "../../node_modules/@material/top-app-bar/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "../../node_modules/@material/top-app-bar/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



const INITIAL_VALUE = 0;
/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCTopAppBarFoundation>}
 * @final
 */

class MDCTopAppBarFoundation extends _foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /**
     * Used for diffs of current scroll position vs previous scroll position
     * @private {number}
     */

    this.lastScrollPosition_ = this.adapter_.getViewportScrollY();
    /**
     * Used to verify when the top app bar is completely showing or completely hidden
     * @private {number}
     */

    this.topAppBarHeight_ = this.adapter_.getTopAppBarHeight();
    /**
     * wasDocked_ is used to indicate if the top app bar was docked in the previous
     * scroll handler iteration.
     * @private {boolean}
     */

    this.wasDocked_ = true;
    /**
     * isDockedShowing_ is used to indicate if the top app bar is docked in the fully
     * shown position.
     * @private {boolean}
     */

    this.isDockedShowing_ = true;
    /**
     * Variable for current scroll position of the top app bar
     * @private {number}
     */

    this.currentAppBarOffsetTop_ = 0;
    /**
     * Used to prevent the top app bar from being scrolled out of view during resize events
     * @private {boolean} */

    this.isCurrentlyBeingResized_ = false;
    /**
     * The timeout that's used to throttle the resize events
     * @private {number}
     */

    this.resizeThrottleId_ = INITIAL_VALUE;
    /**
     * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
     * @private {number}
     */

    this.resizeDebounceId_ = INITIAL_VALUE;

    this.scrollHandler_ = () => this.topAppBarScrollHandler_();

    this.resizeHandler_ = () => this.topAppBarResizeHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.setStyle('top', '');
  }
  /**
   * Function to determine if the DOM needs to update.
   * @return {boolean}
   * @private
   */


  checkForUpdate_() {
    const offscreenBoundaryTop = -this.topAppBarHeight_;
    const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
    const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen; // If it's partially showing, it can't be docked.

    if (partiallyShowing) {
      this.wasDocked_ = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked_) {
        this.wasDocked_ = true;
        return true;
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  }
  /**
   * Function to move the top app bar if needed.
   * @private
   */


  moveTopAppBar_() {
    if (this.checkForUpdate_()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      let offset = this.currentAppBarOffsetTop_;

      if (Math.abs(offset) >= this.topAppBarHeight_) {
        offset = -_constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].MAX_TOP_APP_BAR_HEIGHT;
      }

      this.adapter_.setStyle('top', offset + 'px');
    }
  }
  /**
   * Scroll handler for the default scroll behavior of the top app bar.
   * @private
   */


  topAppBarScrollHandler_() {
    const currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
    const diff = currentScrollPosition - this.lastScrollPosition_;
    this.lastScrollPosition_ = currentScrollPosition; // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.

    if (!this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff;

      if (this.currentAppBarOffsetTop_ > 0) {
        this.currentAppBarOffsetTop_ = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
      }

      this.moveTopAppBar_();
    }
  }
  /**
   * Top app bar resize handler that throttle/debounce functions that execute updates.
   * @private
   */


  topAppBarResizeHandler_() {
    // Throttle resize events 10 p/s
    if (!this.resizeThrottleId_) {
      this.resizeThrottleId_ = setTimeout(() => {
        this.resizeThrottleId_ = INITIAL_VALUE;
        this.throttledResizeHandler_();
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }

    this.isCurrentlyBeingResized_ = true;

    if (this.resizeDebounceId_) {
      clearTimeout(this.resizeDebounceId_);
    }

    this.resizeDebounceId_ = setTimeout(() => {
      this.topAppBarScrollHandler_();
      this.isCurrentlyBeingResized_ = false;
      this.resizeDebounceId_ = INITIAL_VALUE;
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  }
  /**
   * Throttled function that updates the top app bar scrolled values if the
   * top app bar height changes.
   * @private
   */


  throttledResizeHandler_() {
    const currentHeight = this.adapter_.getTopAppBarHeight();

    if (this.topAppBarHeight_ !== currentHeight) {
      this.wasDocked_ = false; // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.

      this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
      this.topAppBarHeight_ = currentHeight;
    }

    this.topAppBarScrollHandler_();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarFoundation);

/***/ }),

/***/ "../../node_modules/focus-trap/index.js":
/*!********************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/focus-trap/index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tabbable = __webpack_require__(/*! tabbable */ "../../node_modules/tabbable/index.js");

var xtend = __webpack_require__(/*! xtend */ "../../node_modules/xtend/immutable.js");

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var doc = document;
  var container = typeof element === 'string' ? doc.querySelector(element) : element;
  var config = xtend({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true
  }, userOptions);
  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };
  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };
  return trap;

  function activate(activateOptions) {
    if (state.active) return;
    updateTabbableNodes();
    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;
    var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;

    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;
    removeListeners();
    state.active = false;
    state.paused = false;
    var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;

    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;

    if (returnFocus) {
      delay(function () {
        tryFocus(state.nodeFocusedBeforeActivation);
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    addListeners();
  }

  function addListeners() {
    if (!state.active) return; // There can be only one listening focus trap at a time

    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }

    listeningFocusTrap = trap;
    updateTabbableNodes(); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    delay(function () {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, true);
    doc.addEventListener('touchstart', checkPointerDown, true);
    doc.addEventListener('click', checkClick, true);
    doc.addEventListener('keydown', checkKey, true);
    return trap;
  }

  function removeListeners() {
    if (!state.active || listeningFocusTrap !== trap) return;
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    listeningFocusTrap = null;
    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }

    return node;
  }

  function getInitialFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error("You can't have a focus-trap without at least one focusable element");
    }

    return node;
  } // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  function checkPointerDown(e) {
    if (container.contains(e.target)) return;

    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable.isFocusable(e.target)
      });
    } else {
      e.preventDefault();
    }
  } // In case focus escapes the trap for some strange reason, pull it back in.


  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }

    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  } // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  function checkTab(e) {
    updateTabbableNodes();

    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }

    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

module.exports = focusTrap;

/***/ }),

/***/ "../../node_modules/tabbable/index.js":
/*!******************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/tabbable/index.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
var candidateSelector = candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};
  var elementDocument = el.ownerDocument || el;
  var regularTabbables = [];
  var orderedTabbables = [];
  var untouchabilityChecker = new UntouchabilityChecker(elementDocument);
  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;

  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];
    if (!isNodeMatchingSelectorTabbable(candidate, untouchabilityChecker)) continue;
    candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node, untouchabilityChecker) {
  if (!isNodeMatchingSelectorFocusable(node, untouchabilityChecker) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
}

function isTabbable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node, untouchabilityChecker);
}

function isNodeMatchingSelectorFocusable(node, untouchabilityChecker) {
  untouchabilityChecker = untouchabilityChecker || new UntouchabilityChecker(node.ownerDocument || node);

  if (node.disabled || isHiddenInput(node) || untouchabilityChecker.isUntouchable(node)) {
    return false;
  }

  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');

function isFocusable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node, untouchabilityChecker);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr; // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
} // Array.prototype.find not available in IE.


function find(list, predicate) {
  for (var i = 0, length = list.length; i < length; i++) {
    if (predicate(list[i])) return list[i];
  }
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true; // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.

  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
} // An element is "untouchable" if *it or one of its ancestors* has
// `visibility: hidden` or `display: none`.


function UntouchabilityChecker(elementDocument) {
  this.doc = elementDocument; // Node cache must be refreshed on every check, in case
  // the content of the element has changed. The cache contains tuples
  // mapping nodes to their boolean result.

  this.cache = [];
} // getComputedStyle accurately reflects `visibility: hidden` of ancestors
// but not `display: none`, so we need to recursively check parents.


UntouchabilityChecker.prototype.hasDisplayNone = function hasDisplayNone(node, nodeComputedStyle) {
  if (node.nodeType !== Node.ELEMENT_NODE) return false; // Search for a cached result.

  var cached = find(this.cache, function (item) {
    return item === node;
  });
  if (cached) return cached[1];
  nodeComputedStyle = nodeComputedStyle || this.doc.defaultView.getComputedStyle(node);
  var result = false;

  if (nodeComputedStyle.display === 'none') {
    result = true;
  } else if (node.parentNode) {
    result = this.hasDisplayNone(node.parentNode);
  }

  this.cache.push([node, result]);
  return result;
};

UntouchabilityChecker.prototype.isUntouchable = function isUntouchable(node) {
  if (node === this.doc.documentElement) return false;
  var computedStyle = this.doc.defaultView.getComputedStyle(node);
  if (this.hasDisplayNone(node, computedStyle)) return true;
  return computedStyle.visibility === 'hidden';
};

module.exports = tabbable;

/***/ }),

/***/ "../../node_modules/tslib/tslib.es6.js":
/*!*******************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/tslib/tslib.es6.js ***!
  \*******************************************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

/***/ }),

/***/ "../../node_modules/xtend/immutable.js":
/*!*******************************************************************************************************!*\
  !*** /Users/jakobstendahl/_code/Personal projects/nodejs/Luxcena-Neo/node_modules/xtend/immutable.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

/***/ }),

/***/ "../frontendJsModules/cookies.js":
/*!***************************************!*\
  !*** ../frontendJsModules/cookies.js ***!
  \***************************************/
/*! exports provided: setCookie, getCookie, eraseCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eraseCookie", function() { return eraseCookie; });
/**
 * Functions for working with cookies.
 *
 * This library contains three methods (setCookie, getCookie and eraseCookie),
 * import them to work with cookies.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */

/** This function simply sets a cookie.
 *
 * @param {string} name  The name of the cookie.
 * @param {string} value The new value of the cookie,
 * @param {float}  days  How long the cookie should live.
 */
function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
/** This founction returns the value of a cookie.
 *
 * @oaram {string} name The name of the cookie to get the value of.
 *
 * @return {string} The value of the cookie
 */

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}
/** Deletes a cookie by name.
 *
 * @param {string} name The name of the cookie to delete.
 */

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

/***/ }),

/***/ "../frontendJsModules/dom.js":
/*!***********************************!*\
  !*** ../frontendJsModules/dom.js ***!
  \***********************************/
/*! exports provided: addEventListenerToClassName, setCSSCustomProp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListenerToClassName", function() { return addEventListenerToClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCSSCustomProp", function() { return setCSSCustomProp; });
/**
 * General helper functions for manipulating the DOM.
 *
 * This file contains some general helper functions for manipulating the DOM.
 *
 * @file   This files defines multiple functions.
 * @author jakobst1n.
 * @since  04.06.2019
 */

/** Helper function for adding an eventlistner to all elements with a certain class.
 *
 * @param {string}   className The class to listen for.
 * @param {string}   event     What event to listen for (e.g. "click").
 * @param {function} callback  The callback function for when an event is fired on an elemnt.
 */
function addEventListenerToClassName(className, event, callback) {
  let elements = document.querySelectorAll(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(event, callback);
  }
}
/** Shorthand for setting a CSS custom property.
 *
 * @param {string} propertyName The name of the property to set (e.g. "color").
 * @param {string} value        The value to set the property to (e.g. "#ffffff").
 */

function setCSSCustomProp(propertyName, value) {
  document.documentElement.style.setProperty(propertyName, value);
}

/***/ }),

/***/ "./components/drawer.js":
/*!******************************!*\
  !*** ./components/drawer.js ***!
  \******************************/
/*! exports provided: MainDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainDrawer", function() { return MainDrawer; });
class Item {
  constructor(type, options = []) {
    this.type = type;
    this.options = options;
    this.DOMElement = null;
    this.GenMarkup();
  }

  GenMarkup() {
    let tmpElem = null;

    switch (this.type) {
      case "divider":
        this.DOMElement = document.createElement("hr");
        this.DOMElement.className = "mdc-list-divider";
        break;

      case "subheader":
        this.DOMElement = document.createElement("h6");
        this.DOMElement.className = "mdc-list-group__subheader";
        this.DOMElement.innerHTML = this.options["label"];
        break;

      case "menu-item":
        this.DOMElement = document.createElement("a");
        this.DOMElement.className = "elevation-z2 drawer-item mdc-list-item mdc-list-item";
        this.DOMElement.href = this.options["href"];
        tmpElem = document.createElement("i");
        tmpElem.className = "material-icons mdc-list-item__graphic";
        tmpElem.innerHTML = this.options["icon"];
        this.DOMElement.appendChild(tmpElem);
        tmpElem = document.createElement("span");
        tmpElem.className = "mdc-list-item__text";
        tmpElem.title = this.options["name"];
        tmpElem.innerHTML = this.options["label"];
        this.DOMElement.appendChild(tmpElem);
        break;

      case "link":
        this.DOMElement = document.createElement("a");
        this.DOMElement.className = "elevation-z2 drawer-item mdc-list-item mdc-list-item";
        this.DOMElement.href = this.options["href"];
        this.DOMElement.target = "_blank";
        tmpElem = document.createElement("i");
        tmpElem.className = "material-icons mdc-list-item__graphic";
        tmpElem.innerHTML = this.options["icon"];
        this.DOMElement.appendChild(tmpElem);
        tmpElem = document.createElement("span");
        tmpElem.className = "mdc-list-item__text";
        tmpElem.title = this.options["name"];
        tmpElem.innerHTML = this.options["label"];
        this.DOMElement.appendChild(tmpElem);
        tmpElem = document.createElement("span");
        tmpElem.className = "mdc-list-item__meta material-icons";
        tmpElem.innerHTML = "open_in_new";
        this.DOMElement.appendChild(tmpElem);
        break;
    }
  }

  addClass(className) {
    let classList = this.DOMElement.classList;

    if (!(className in classList)) {
      classList.add(className);
    }
  }

  removeClass(className) {
    let classList = this.DOMElement.classList;
    classList.remove(className);
  }

}

class MainDrawer {
  constructor(activeItemName = "dashboard") {
    this.items = [new Item("divider"), new Item("menu-item", {
      name: "dashboard",
      label: "Dashboard",
      href: "./",
      icon: "dashboard"
    }), new Item("menu-item", {
      name: "scripts",
      label: "Scripts",
      href: "./scripts",
      icon: "code"
    }), new Item("menu-item", {
      name: "logviewer",
      label: "LogViewer",
      href: "#",
      icon: "timeline"
    }), new Item("divider"), new Item("subheader", {
      label: "Settings"
    }), new Item("menu-item", {
      name: "strip_setup",
      label: "Strip setup",
      href: "./strip_setup",
      icon: "straighten"
    }), new Item("menu-item", {
      name: "settings",
      label: "Settings",
      href: "./settings",
      icon: "settings"
    }), new Item("divider"), new Item("link", {
      label: "Docs",
      href: "/docs/",
      icon: "book"
    })];
    this.activeItemName = activeItemName;
    this.DOMElement = null; //this.setActive(activeItemName);

    this.genMarkupInDOM();
  }

  genMarkupInDOM() {
    this.DOMElement = document.createElement("div");
    this.DOMElement.className = "mdc-list";

    for (let i = 0; i < this.items.length; i++) {
      this.DOMElement.appendChild(this.items[i].DOMElement);
    }
  }

  setActive(itemName) {
    this.activeItemName = itemName;

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if ("name" in item.options) {
        if (item.options["name"] == itemName) {
          item.addClass("mdc-list-item--activated");
        } else {
          item.removeClass("mdc-list-item--activated");
        }
      }
    }
  }

}

/***/ }),

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../frontendJsModules/cookies */ "../frontendJsModules/cookies.js");
/* harmony import */ var _lux_neo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lux-neo */ "./js/lux-neo.js");
/**
 * Main entry point for luxcena-neo webpage.
 *
 * This file does the handling of setting up the DOM and importing the correct
 * page-spesific javascript.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */
// General javascript
let socket = io();


const pageName = document.getElementsByTagName("body")[0].id;
let cookieToken = Object(_frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_0__["getCookie"])("session_token");

if (cookieToken == null) {
  if (pageName == "login") {
    socket.emit("authenticate", "", "test", token => {
      Object(_frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_0__["setCookie"])("session_token", token.toString(), 120);
      console.log(token);
      window.location.href = "/";
    });
  } else {
    window.location.href = "/login";
  }
} else {
  socket.emit("authenticateToken", cookieToken, res => {
    console.log(res);

    if (res) {
      if (pageName == "login") {
        window.location.href = "/";
      }

      console.log("Autorised");
      Authorised();
    } else {
      Object(_frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_0__["eraseCookie"])("session_token");
      window.location.href = "/login";
    }
  });
}

function Authorised() {
  if (document.body.classList.contains('mdc-typography')) {
    Object(_lux_neo__WEBPACK_IMPORTED_MODULE_1__["default"])();
  } // Page-specific JavaScript


  try {
    let pageSpesific = __webpack_require__("./js/page-spesific sync recursive ^\\.\\/.*$")("./" + pageName);

    pageSpesific.default();
  } catch (error) {
    console.log("Something went wrong when loading the js for this page...\n" + "The pageName is \"" + pageName + "\".\n" + "If it was excpected to get js for this page, please check the filename, and recompile webpack.");
    console.log(error);
  }
}

/***/ }),

/***/ "./js/lux-neo.js":
/*!***********************!*\
  !*** ./js/lux-neo.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_top_app_bar_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/top-app-bar/index */ "../../node_modules/@material/top-app-bar/index.js");
/* harmony import */ var _material_ripple_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/ripple/index */ "../../node_modules/@material/ripple/index.js");
/* harmony import */ var _material_drawer_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/drawer/index */ "../../node_modules/@material/drawer/index.js");
/* harmony import */ var _frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../frontendJsModules/cookies */ "../frontendJsModules/cookies.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./theme */ "./js/theme.js");
/* harmony import */ var _components_drawer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/drawer */ "./components/drawer.js");
/**
 * Code for setting up the common elements in the DOM in luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */






/** This function changes the behaviour of some key ui elements according to
 *  window size. The breakpoint is the same as mdc-leyout-grid's breakpoint.
 *
 * @param {object} event Just to contain the event if called after an event had occured.
 */

function onResize(event) {
  let ElemDrawer = document.querySelector(".mdc-drawer");
  var mq = window.matchMedia("(max-width: 840px)");

  if (mq.matches) {
    // Windows smaller than max-width (840px)
    ElemDrawer.className = "mdc-drawer mdc-drawer--modal";
  } else {
    // Windows larger than max-width (840px)
    ElemDrawer.className = "mdc-drawer";
  }
}
/** Default function with all the code to setup the shell of the website.
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Get name of current page
  const pageName = document.getElementsByTagName("body")[0].id; // If neo_ide, it has a different layout, and should not get these styles

  if (pageName == "neo_ide") {
    return;
  } // Set the window resize event to the function above


  window.onresize = onResize; // Create a new drawer element (To generate the MDC-List etc...)

  const drawer = _material_drawer_index__WEBPACK_IMPORTED_MODULE_2__["MDCDrawer"].attachTo(document.querySelector(".mdc-drawer")); // Init drawer component

  let myDrawer = new _components_drawer__WEBPACK_IMPORTED_MODULE_5__["MainDrawer"]();
  document.querySelector(".mdc-drawer__content").appendChild(myDrawer.DOMElement);
  myDrawer.setActive(document.body.id); // Create top-app-bar element, this is the pink thing at the top

  const topAppBar = _material_top_app_bar_index__WEBPACK_IMPORTED_MODULE_0__["MDCTopAppBar"].attachTo(document.getElementById("app-bar")); // Set what element we are scrolling on

  topAppBar.setScrollTarget(document.getElementById("main-content")); // Set the "menu"-button to toggle our drawer

  topAppBar.listen("MDCTopAppBar:nav", () => {
    drawer.open = !drawer.open;
  }); // Call the resize-event once, to update the ui to the current screen size

  onResize(); // Change to dark theme if cookie is set

  if (Object(_frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("mdc-theme") == "dark") {
    Object(_theme__WEBPACK_IMPORTED_MODULE_4__["setMDCTheme"])("dark");
  } // @TODO REMOVE THIS AND MAKE A PROPER OPTION IN SETTINGS


  document.querySelectorAll(".mdc-top-app-bar__action-item")[0].addEventListener("click", _theme__WEBPACK_IMPORTED_MODULE_4__["toggleTheme"]);
});

/***/ }),

/***/ "./js/page-spesific sync recursive ^\\.\\/.*$":
/*!****************************************!*\
  !*** ./js/page-spesific sync ^\.\/.*$ ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./dashboard": "./js/page-spesific/dashboard.js",
	"./dashboard.js": "./js/page-spesific/dashboard.js",
	"./scripts": "./js/page-spesific/scripts.js",
	"./scripts.js": "./js/page-spesific/scripts.js",
	"./strip-setup": "./js/page-spesific/strip-setup.js",
	"./strip-setup.js": "./js/page-spesific/strip-setup.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./js/page-spesific sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./js/page-spesific/dashboard.js":
/*!***************************************!*\
  !*** ./js/page-spesific/dashboard.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  setupSocket();
  socket.emit("GetGeneralInfo");
});
;

function setupSocket() {
  socket.on("generalInfo", info => {
    let onOffStatus = document.getElementById("onOffStatus");
    let cScriptName = document.getElementById("currentScriptName");
    let systemUptime = document.getElementById("uptime");
    let scriptStatus = document.getElementById("scriptStat");
    let appHealth = document.getElementById("appHealth");

    if (info["scriptIsExited"]) {
      cScriptName.innerHTML = "-";
      scriptStatus.innerHTML = "Exited...";
    } else {
      cScriptName.innerHTML = info["currentScript"];
    }

    let totalSeconds = info["uptime"];
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    systemUptime.innerHTML = days + "d " + hours + "h " + minutes + "m ";
  });
}

/***/ }),

/***/ "./js/page-spesific/scripts.js":
/*!*************************************!*\
  !*** ./js/page-spesific/scripts.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_menu_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/menu/index */ "../../node_modules/@material/menu/index.js");
/**
 * Page-spesific javascript for the "scripts"-page of luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  const menu = new _material_menu_index__WEBPACK_IMPORTED_MODULE_0__["MDCMenu"](document.querySelector(".mdc-menu")); //menu.open = true;

  menu.setAbsolutePosition(180, -10);
  document.querySelector(".menu_button").addEventListener("click", function () {
    menu.open = !menu.open;
  });
});

/***/ }),

/***/ "./js/page-spesific/strip-setup.js":
/*!*****************************************!*\
  !*** ./js/page-spesific/strip-setup.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_switch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/switch */ "../../node_modules/@material/switch/dist/mdc.switch.js");
/* harmony import */ var _material_switch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_switch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/select */ "../../node_modules/@material/select/dist/mdc.select.js");
/* harmony import */ var _material_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../frontendJsModules/dom */ "../frontendJsModules/dom.js");
/**
 * Page-spesific javascript for the "strip-setup"-page of luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */



/** Generate a list of segments from elements in the DOM
 *
 * @return {list} A list containing all the segments
 */

function generateSegmentList() {
  let segmentCount = document.getElementsByClassName("segment-card__list__segments")[0].childElementCount;
  let segmentList = [];

  for (let i = 0; i < segmentCount; i++) {
    segmentList.push(Number(document.getElementById("segment_" + String(i)).value));
  }

  return segmentList;
}
/** Function that generates a matrix configuration from the elements in the DOM.
 *
 * @return {object} A two dimentional array conatining (jsMatrixConfig and pyMatrixConfig).
 */


function generateMatrixConfig() {
  let usedSegments = [];
  let validationError = false;
  let matrixYElementList = document.querySelector(".matrix-card__list");
  let yElements = matrixYElementList.childElementCount;
  let pythonicArray = "[";
  let jsArray = [];

  for (let i = 0; i < yElements; i++) {
    let matrixXNodes = matrixYElementList.children[i].querySelector(".matrix-card__list__x__items");
    let matrixXInputNodes = matrixXNodes.getElementsByTagName("input"); //let matrixXButtonNodes = matrixXNodes.getElementsByTagName("button");

    let xElements = matrixXInputNodes.length;
    let pythonicArrayElement = "[";
    let jsArrayElement = [];

    for (let o = 0; o < xElements; o++) {
      let xElementInput = matrixXInputNodes[o];
      let cSegmentNumber = Number(xElementInput.value);

      if (usedSegments.indexOf(cSegmentNumber) != -1 || xElementInput.value == "") {
        validationError = true;
        /* code to change the classes keeping current invert state */

        let cInverted = false;

        if (xElementInput.className.indexOf("inverted") != -1) {
          cInverted = true;
        }

        xElementInput.className = "matrix-card__list__x__items__item validationError" + (cInverted ? " inverted" : "");
      } else {
        usedSegments.push(cSegmentNumber);
        /* code to change the classes keeping current invert state */

        let cInverted = false;

        if (xElementInput.className.indexOf("inverted") != -1) {
          cInverted = true;
        }

        xElementInput.className = "matrix-card__list__x__items__item" + (cInverted ? " inverted" : "");
      }

      let inverted = xElementInput.className.indexOf("inverted") == -1 ? false : true;
      pythonicArrayElement += "[" + String(cSegmentNumber) + "," + (inverted ? "true" : "false") + "],";
      jsArrayElement.push([cSegmentNumber, inverted]);
    }

    pythonicArrayElement = pythonicArrayElement.slice(0, -1); // Remove last comma

    pythonicArrayElement += "],";
    pythonicArray += pythonicArrayElement;
    jsArray.push(jsArrayElement);
  }

  pythonicArray = pythonicArray.substring(0, pythonicArray.length - 1); // Remove last comma

  pythonicArray += "]";

  if (validationError) {
    return -1;
  }

  return {
    jsMatrixConfig: jsArray,
    pyMatrixConfig: pythonicArray
  };
}
/** Generate a matrix from a config and a list of segments, then display it in the DOM as ascii.
 *
 * @param {array} config A javascript-like array of an matrix (output from generateMatrixConfig()).
 */


function generateMatrixDump(config) {
  let segmentList = generateSegmentList();
  let htmlOut = "";
  let elementWidth = String(segmentList.reduce(function (a, b) {
    return a + b;
  }, 0)).length + 2;

  for (let y = 0; y < config.length; y++) {
    let yElement = config[y];

    for (let x = 0; x < yElement.length; x++) {
      let segmentN = yElement[x][0];
      let inverted = yElement[x][1];
      let startLED = 0;

      for (let i = 0; i < segmentN; i++) {
        startLED += segmentList[i];
      }

      if (!inverted) {
        for (let i = startLED; i < startLED + segmentList[segmentN]; i++) {
          htmlOut += String(i).padStart(elementWidth, " ");
        }
      } else {
        for (let i = startLED + segmentList[segmentN]; i > startLED; i--) {
          htmlOut += String(i).padStart(elementWidth, " ");
        }
      }
    }

    htmlOut += "\n";
  }

  let html = "<span class=\"function\">Generated matrix:</span>\n";
  html += htmlOut;
  document.getElementById("generated-matrix-dump").innerHTML = html;
}
/** Function for generating a matrix config.
 *  If the config is valid,
 *  it will dump it to the DOM, based on values from generateSegmentList().
 */


function generateMatrix() {
  let matrixConfig = generateMatrixConfig();

  if (matrixConfig == -1) {
    return;
  }

  generateMatrixDump(matrixConfig.jsMatrixConfig);
}
/** Function for generating segment list, and dumping it do DOM
 */


function generateSegmentListAndDump() {
  // Generate a new list of segments, and display in DOM
  let segListHTML = generateSegmentList().map(x => "<span class=\"number\">" + String(x) + "</span>").join(", ");
  document.getElementById("generated-segment-list").innerHTML = "[" + segListHTML + "]";
}
/** This function simply handles changed input in segment-inputs, transforms it,
 *  and displays a the new list of segments in DOM.
 */


function segmentInputChange() {
  // Cut characters, not allowed to input more than 3 characters
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  } // Absolute, it's actually impossible to have a negative amount of leds.


  if (this.value < 0) {
    this.value = this.value * -1;
  }

  generateSegmentListAndDump(); // This probably changes something with the matrix as well, so lets dump that to the DOM.

  generateMatrix();
}
/** Function for adding a new segment input box to the DOM
 */


function addSegment() {
  let segmentCount = document.getElementsByClassName("segment-card__list__segments")[0].childElementCount;
  let segment_list = document.querySelector(".segment-card__list__segments");
  let newSegmentWrapper = document.createElement("div");
  newSegmentWrapper.className = "segment-wrapper";
  newSegmentWrapper.id = "segment_" + String(segmentCount) + "_wrapper";
  let newIdentificator = document.createElement("span");
  newIdentificator.className = "identificator";
  newIdentificator.id = "segment_" + String(segmentCount) + "_identificator";
  newIdentificator.innerHTML = String(segmentCount);
  let newSegment = document.createElement("input");
  newSegment.type = "number";
  newSegment.title = "Segment " + String(segmentCount); // segmentCount + 1, but we want the 0-based number

  newSegment.id = "segment_" + String(segmentCount);
  newSegment.dataset.number = String(segmentCount);
  newSegmentWrapper.appendChild(newIdentificator);
  newSegmentWrapper.appendChild(newSegment);
  segment_list.appendChild(newSegmentWrapper);
  document.getElementById("segment_" + String(segmentCount)).addEventListener("input", segmentInputChange);
}
/** Simply remove the last segment input element from the DOM
 */


function removeSegment() {
  let segmentCount = document.getElementsByClassName("segment-card__list__segments")[0].childElementCount;

  if (segmentCount < 2) {
    return; // We dont want to have fewer segments than one, so if less than 2
  }

  let segment_list = document.querySelector(".segment-card__list__segments");
  segment_list.removeChild(document.getElementById("segment_" + String(segmentCount - 1) + "_wrapper"));
}
/* Function for invert-buttons on matrix-elements.
 * It toggles an inverted class to the element.
 */


function invertMatrixElement() {
  let inputElement = document.getElementById(this.dataset.target);
  let cInverted = false;

  if (inputElement.className.indexOf("inverted") != -1) {
    cInverted = true;
  }

  let validationError = false;

  if (inputElement.className.indexOf("validationError") != -1) {
    validationError = true;
  }

  inputElement.className = "matrix-card__list__x__items__item" + (validationError ? " validationError" : "") + (!cInverted ? " inverted" : ""); // generate the new matrix to show it in the DOM.

  generateMatrix();
}
/** Add a matrix element i X-direction to DOM.
 */


function addMatrixXElement() {
  let xLen = this.parentNode.dataset.len;
  let yPos = this.parentNode.dataset.ypos;
  let newSeperator = document.createElement("span");
  newSeperator.className = "seperator";
  newSeperator.id = "matrix_" + String(xLen - 1) + "_" + String(yPos) + "_seperator";
  newSeperator.innerHTML = "-";
  let newMatrixElement = document.createElement("input");
  newMatrixElement.type = "number";
  newMatrixElement.className = "matrix-card__list__x__items__item";
  newMatrixElement.name = "Matrix x: " + String(xLen) + " y: " + String(yPos);
  newMatrixElement.id = "matrix_" + String(xLen) + "_" + String(yPos);
  let newInvertButton = document.createElement("button");
  newInvertButton.className = "matrix_element_invert_button mdc-icon-button material-icons";
  newInvertButton.dataset.target = "matrix_" + String(xLen) + "_" + String(yPos);
  newInvertButton.innerHTML = "compare_arrows";
  let nodeToAppendTo = this.parentNode.querySelector(".matrix-card__list__x__items");
  nodeToAppendTo.appendChild(newSeperator);
  nodeToAppendTo.appendChild(newMatrixElement);
  nodeToAppendTo.appendChild(newInvertButton);
  this.parentNode.dataset.len = String(Number(this.parentNode.dataset.len) + 1);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix-card__list__x__items__item", "input", generateMatrix);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_element_invert_button", "click", invertMatrixElement);
}
/** Remove a matrix element in X-direction from DOM.
 */


function removeMatrixXElement() {
  let nodesToRemove = 3;
  let xLen = this.parentNode.dataset.len; //let yPos = this.parentNode.dataset.ypos;

  if (xLen <= 1) {
    return;
  }

  let listNode = this.parentNode.querySelector(".matrix-card__list__x__items");

  for (let i = 0; i < nodesToRemove; i++) {
    listNode.removeChild(listNode.lastChild);
  }

  this.parentNode.dataset.len = String(Number(this.parentNode.dataset.len) - 1);
}
/** Adds a matrix element in the Y-direction to DOM.
 */


function addMatrixYElement() {
  let yPos = Number(this.parentNode.querySelector(".matrix-card__list").childElementCount);
  let newListItem = document.createElement("li");
  newListItem.className = "matrix-card__list__y__item";
  newListItem.dataset.ypos = yPos;
  newListItem.dataset.len = "1";
  let newMatrixXElementsList = document.createElement("div");
  newMatrixXElementsList.className = "matrix-card__list__x__items";
  let newMatrixElement = document.createElement("input");
  newMatrixElement.className = "matrix-card__list__x__items__item";
  newMatrixElement.type = "number";
  newMatrixElement.name = "Matrix x: 0 y: " + yPos;
  newMatrixElement.id = "matrix_0_" + yPos;
  let newButtonInvertItem = document.createElement("button");
  newButtonInvertItem.className = "matrix_element_invert_button mdc-icon-button material-icons";
  newButtonInvertItem.dataset.target = "matrix_0_" + yPos;
  newButtonInvertItem.innerHTML = "compare_arrows";
  let newButtonAddXItem = document.createElement("button");
  newButtonAddXItem.className = "matrix_add_x_item mdc-icon-button material-icons";
  newButtonAddXItem.innerHTML = "add_circle_outline";
  let newButtonRemoveXItem = document.createElement("button");
  newButtonRemoveXItem.className = "matrix_remove_x_item mdc-icon-button material-icons";
  newButtonRemoveXItem.innerHTML = "remove_circle_outline";
  newMatrixXElementsList.appendChild(newMatrixElement);
  newMatrixXElementsList.appendChild(newButtonInvertItem);
  newListItem.appendChild(newMatrixXElementsList);
  newListItem.appendChild(newButtonAddXItem);
  newListItem.appendChild(newButtonRemoveXItem);
  this.parentNode.querySelector(".matrix-card__list").appendChild(newListItem);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_add_x_item", "click", addMatrixXElement);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_remove_x_item", "click", removeMatrixXElement);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix-card__list__x__items__item", "input", generateMatrix);
}
/** Remove the last matrix element in the Y-direction from the DOM.
 */


function removeMatrixYElement() {
  let matrixCardList = this.parentNode.querySelector(".matrix-card__list");
  let yElementsCount = matrixCardList.childElementCount;

  if (yElementsCount <= 1) {
    return;
  }

  matrixCardList.removeChild(matrixCardList.lastChild);
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  document.getElementById("add_segment").addEventListener("click", addSegment);
  document.getElementById("remove_segment").addEventListener("click", removeSegment);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_element_invert_button", "click", invertMatrixElement);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_add_x_item", "click", addMatrixXElement);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_remove_x_item", "click", removeMatrixXElement);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_add_y_item", "click", addMatrixYElement);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix_remove_y_item", "click", removeMatrixYElement);
  Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_2__["addEventListenerToClassName"])(".matrix-card__list__x__items__item", "input", generateMatrix);
  const invertSignal = new _material_switch__WEBPACK_IMPORTED_MODULE_0__["MDCSwitch"](document.querySelector('.mdc-switch'));
  const gpioSelect = new _material_select__WEBPACK_IMPORTED_MODULE_1__["MDCSelect"](document.querySelector('.advanced-card__list__GPIO'));
  const dmaSelect = new _material_select__WEBPACK_IMPORTED_MODULE_1__["MDCSelect"](document.querySelector('.advanced-card__list__DMA'));
  const ledChannelSelect = new _material_select__WEBPACK_IMPORTED_MODULE_1__["MDCSelect"](document.querySelector('.advanced-card__list__led-channel'));
  const frequencySelect = new _material_select__WEBPACK_IMPORTED_MODULE_1__["MDCSelect"](document.querySelector('.advanced-card__list__freq'));
});

/***/ }),

/***/ "./js/theme.js":
/*!*********************!*\
  !*** ./js/theme.js ***!
  \*********************/
/*! exports provided: setMDCTheme, toggleTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMDCTheme", function() { return setMDCTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleTheme", function() { return toggleTheme; });
/* harmony import */ var _frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../frontendJsModules/cookies */ "../frontendJsModules/cookies.js");
/* harmony import */ var _frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../frontendJsModules/dom */ "../frontendJsModules/dom.js");
/**
 * Library for theming luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */


/** Function for changing theme of the website.
 *
 * @param {string} color The color-scheme you want to set (e.g. "dark" or "light").
 */

function setMDCTheme(color) {
  switch (color) {
    case "dark":
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-primary", "#d81b60");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-secondary", "#03DAC6");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-background", "#121212");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-surface", "#121212");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-on-primary", "#000000");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-on-secondary", "#000000");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-on-surface", "#FFFFFF");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-primary-bg", "#FFFFFF");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-secondary-bg", "#FFFFFF");
      document.getElementsByTagName("body")[0].className = "mdc-typography mdc-theme--background dark";
      Object(_frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_0__["setCookie"])("mdc-theme", "dark", 99999);
      break;

    case "light":
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-primary", "#d81b60");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-secondary", "#3949ab");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-background", "#ffffff");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-surface", "#ffffff");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-on-primary", "#000000");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-on-secondary", "#ffffff");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-on-surface", "#000000");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-primary-bg", "#FFFFFF");
      Object(_frontendJsModules_dom__WEBPACK_IMPORTED_MODULE_1__["setCSSCustomProp"])("--mdc-theme-secondary-bg", "#FFFFFF");
      document.getElementsByTagName("body")[0].className = "mdc-typography mdc-theme--background";
      Object(_frontendJsModules_cookies__WEBPACK_IMPORTED_MODULE_0__["setCookie"])("mdc-theme", "light", 99999);
      break;
  }
}
/** Function for toggling between light and dark theme.
 */

function toggleTheme() {
  let cThemeColor = document.getElementsByTagName("body")[0].className;

  if (cThemeColor.indexOf("dark") == -1) {
    setMDCTheme("dark");
  } else {
    setMDCTheme("light");
  }
}

/***/ }),

/***/ "./scss/app.scss":
/*!***********************!*\
  !*** ./scss/app.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./scss/app.scss ./js/app.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./scss/app.scss */"./scss/app.scss");
module.exports = __webpack_require__(/*! ./js/app.js */"./js/app.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map