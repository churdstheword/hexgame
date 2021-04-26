(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hexgame"] = factory();
	else
		root["hexgame"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/client.js":
/*!****************************!*\
  !*** ./src/core/client.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Client)
/* harmony export */ });
/* harmony import */ var _utils_utils_canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils.canvas.js */ "./src/utils/utils.canvas.js");
/* harmony import */ var _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Vector.js */ "./src/utils/Vector.js");
/* harmony import */ var _entities_shapes_hexagon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities/shapes/hexagon.js */ "./src/entities/shapes/hexagon.js");
/* harmony import */ var _entities_shapes_triangle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/shapes/triangle.js */ "./src/entities/shapes/triangle.js");
/* harmony import */ var _entities_shapes_square_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../entities/shapes/square.js */ "./src/entities/shapes/square.js");
/* harmony import */ var _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../entities/text/debug.js */ "./src/entities/text/debug.js");
/* harmony import */ var _utils_Keyboard_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/Keyboard.js */ "./src/utils/Keyboard.js");









class Client {

    constructor(w, h, fps, container) {

        this.config = {
            width: w,
            height: h,
            targetFps: fps
        }

        this.state = {
            status: 'running',
            client: {
                curFPS: 0,
                frameCount: 0,
                lastFPSUpdate: 0,
                framesThisSecond: 0,
                tick: 1000 / fps,
                nextGameTick: new Date().getTime()
            },
            entities: [],


            keyboard: new _utils_Keyboard_js__WEBPACK_IMPORTED_MODULE_6__.default(),


        }

        this.viewport = (0,_utils_utils_canvas_js__WEBPACK_IMPORTED_MODULE_0__.generateCanvas)(this.config.width, this.config.height);
        this.context = this.viewport.getContext('2d');
        container.insertBefore(this.viewport, container.firstChild);

    }

    init() {

        this.state.entities = [];
        this.state.entities[0] = new _entities_shapes_hexagon_js__WEBPACK_IMPORTED_MODULE_2__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(100, 100), 100, 0);
        this.state.entities[1] = new _entities_shapes_triangle_js__WEBPACK_IMPORTED_MODULE_3__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(250, 250), 50, 15);
        this.state.entities[2] = new _entities_shapes_square_js__WEBPACK_IMPORTED_MODULE_4__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(350, 100), 75, 25);
        this.state.entities[3] = new _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(10, 30), 'FPS', () => { return this.state.client.curFPS });
        this.state.entities[4] = new _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(10, 50), 'Frames', () => { return this.state.client.frameCount });
        this.state.entities[5] = new _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(10, 70), 'keysPressed', () => { return this.state.keyboard.toString() });

        this.loop();
    }

    loop() {

        this.frameid = window.requestAnimationFrame(this.loop.bind(this));

        let time = new Date().getTime()

        if (time > this.state.client.nextGameTick) {
            this.state.client.nextGameTick += this.state.client.tick;
            this.state.client.frameCount++
            this.update(time);
            this.draw();
        }

        if (this.state.status == 'paused') {
            cancelAnimationFrame(this.frameid);
        }

    }

    update(timestamp) {

        // Measure how many frames were rendering each loop 
        if (timestamp > this.state.client.lastFPSUpdate + 1000) {
            this.state.client.curFPS = this.state.client.framesThisSecond;
            this.state.client.lastFPSUpdate = timestamp;
            this.state.client.framesThisSecond = 0;
        } else {
            this.state.client.framesThisSecond++;
        }

        // Update all the entities
        for (let entity of this.state.entities) {
            entity.update(this.state);
        }

    }

    draw() {

        // Clear the canvas
        this.context.clearRect(0, 0, this.config.width, this.config.height)

        // Draw all the entities
        for (let entity of this.state.entities) {
            entity.draw(this.context);
        }

    }

}


/***/ }),

/***/ "./src/entities/entity.js":
/*!********************************!*\
  !*** ./src/entities/entity.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Entity)
/* harmony export */ });
/* harmony import */ var _utils_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Vector */ "./src/utils/Vector.js");


/**
 * Abstract Class Entity
 */
class Entity {
    constructor(position) {
        if (this.constructor == 'Entity') {
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.position = position;

        this.state = {
            position: position,
            velocity: new _utils_Vector__WEBPACK_IMPORTED_MODULE_0__.default(0,0),
            acceleration: new _utils_Vector__WEBPACK_IMPORTED_MODULE_0__.default(0,0),
        }

    }

    update(state) {
        // Do Nothing
    }

    draw(ctx) {
        // Do Nothing
    }

}

/***/ }),

/***/ "./src/entities/shapes/hexagon.js":
/*!****************************************!*\
  !*** ./src/entities/shapes/hexagon.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hexagon)
/* harmony export */ });
/* harmony import */ var _polygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polygon */ "./src/entities/shapes/polygon.js");


/**
 * 
 */
class Hexagon extends _polygon__WEBPACK_IMPORTED_MODULE_0__.default {

    constructor(position, radius, degrees = 0) {
        super(position, radius, degrees)
        this.sides = 6;
    }

    update(state) {
        this.θ = (this.θ - (Math.PI / 120)) % (2 * Math.PI);
    }

    draw(ctx) {
        ctx.beginPath();
        for (let vertex of this.getVertices(this.sides)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
    }

}


/***/ }),

/***/ "./src/entities/shapes/polygon.js":
/*!****************************************!*\
  !*** ./src/entities/shapes/polygon.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _utils_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Vector */ "./src/utils/Vector.js");
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entity */ "./src/entities/entity.js");



/**
 * Abstract Class Polygon
 */
class Polygon extends _entity__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(position, radius, degrees) {
        super(position)
        if (this.constructor == 'Polygon') {
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.r = radius;
        this.θ = degrees * (Math.PI / 180);
    }

    getVertices(sides) {
        const vectors = [];
        const initVector = new _utils_Vector__WEBPACK_IMPORTED_MODULE_0__.default(this.r, 0);
        for (var i = 0; i < sides; i++) {
            let vertex = this.position.add(
                initVector.rotate(i * (2 * Math.PI / sides) + this.θ)
            );
            vectors.push(vertex);
        }
        return vectors;
    }

}

/***/ }),

/***/ "./src/entities/shapes/square.js":
/*!***************************************!*\
  !*** ./src/entities/shapes/square.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Square)
/* harmony export */ });
/* harmony import */ var _polygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polygon */ "./src/entities/shapes/polygon.js");


/**
 * 
 */
class Square extends _polygon__WEBPACK_IMPORTED_MODULE_0__.default {

    constructor(position, radius, degrees = 0) {
        super(position, radius, degrees)
        this.sides = 4;
    }

    update(state) {
        this.θ = (this.θ - (Math.PI / 60)) % (2 * Math.PI);
    }

    draw(ctx) {
        ctx.beginPath();
        for (let vertex of this.getVertices(this.sides)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
    }

}


/***/ }),

/***/ "./src/entities/shapes/triangle.js":
/*!*****************************************!*\
  !*** ./src/entities/shapes/triangle.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Triangle)
/* harmony export */ });
/* harmony import */ var _utils_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/Vector */ "./src/utils/Vector.js");
/* harmony import */ var _polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polygon */ "./src/entities/shapes/polygon.js");



/**
 * 
 */
class Triangle extends _polygon__WEBPACK_IMPORTED_MODULE_1__.default {

    constructor(position, radius, degrees = 0) {
        super(position, radius, degrees)
        this.sides = 3;
    }

    update(state) {
        this.θ = (this.θ + (Math.PI / 30)) % (2 * Math.PI);
        this.r = 30 + 15 * Math.sin((360 / 60) * (state.client.frameCount % 60) * (Math.PI / 180));
        this.position = this.position.add(
            new _utils_Vector__WEBPACK_IMPORTED_MODULE_0__.default(2 * Math.sin((state.client.frameCount % 360) * (Math.PI / 180)), 0)
        )
    }

    draw(ctx) {
        ctx.beginPath();
        for (let vertex of this.getVertices(this.sides)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
    }

}


/***/ }),

/***/ "./src/entities/text/debug.js":
/*!************************************!*\
  !*** ./src/entities/text/debug.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Debug)
/* harmony export */ });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entity */ "./src/entities/entity.js");


class Debug extends _entity__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(position, label, field) {
        super(position)
        this.field = field;
        this.label = label;
        this.value = '';
    }

    update(state) {
        if (typeof this.field == "function") {
            this.value = this.field.call();
        }
    }

    draw(ctx) {
        ctx.font = '25px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(this.toString(), this.position.x, this.position.y);
    }

    toString() {
        return `${this.label}: ${this.value}`;
    }

}

/***/ }),

/***/ "./src/utils/Keyboard.js":
/*!*******************************!*\
  !*** ./src/utils/Keyboard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
class Keyboard {

    constructor() {

        window.addEventListener("keydown", (event) => this.handleKeyEvent(event, true), false);
        window.addEventListener("keyup", (event) => this.handleKeyEvent(event, false), false);

        this.input = {
            "UP": false,
            "DOWN": false,
            "LEFT": false,
            "RIGHT": false
        };
    }


    handleKeyEvent(event, pressed) {

        if (event.defaultPrevented) {
            return;
        }

        switch (event.key) {
            case "w":
            case "W":
            case "Up":
            case "ArrowUp":
                this.input.UP = pressed;
                break;

            case "s":
            case "S":
            case "Down":
            case "ArrowDown":
                this.input.DOWN = pressed;
                break;

            case "a":
            case "A":
            case "Left":
            case "ArrowLeft":
                this.input.LEFT = pressed;
                break;

            case "d":
            case "D":
            case "Right":
            case "ArrowRight":
                this.input.RIGHT = pressed;
                break;

            default:
                return;
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }

    toString() {
        return Object.keys(this.input).reduce((acc, key) => {
            if (this.input[key] === true) acc.push(key);
            return acc;
        }, []).join(", ");
    }
}

/***/ }),

/***/ "./src/utils/Vector.js":
/*!*****************************!*\
  !*** ./src/utils/Vector.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector)
/* harmony export */ });
/**
 * 2D Vector Library
 */
class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(
            this.x + v.x,
            this.y + v.y
        )
    }

    subtract(v) {
        return new Vector(
            this.x - v.x,
            this.y - v.y
        );
    }

    scale(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar
        );
    }

    dot(v) {
        return (this.x * v.x) + (this.y * v.y);
    }

    cross(v) {
        return new Vector(
            this.y * v.x - this.x * v.y,
            this.x * v.y - this.y * v.x
        )
    }

    unit() {
        return this.scale(Math.inv(this.magnitude()))
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    max() {
        return Math.max(this.x, this.y);
    }

    min() {
        return Math.min(this.x, this.y);
    }

    rotate(theta) {
        return new Vector(
            this.x * Math.cos(theta) - this.y * Math.sin(theta),
            this.x * Math.sin(theta) + this.y * Math.cos(theta)
        )
    }

    equals(v) {
        return this.x == v.x && this.y == v.y;
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }

    toArray() {
        return [this.x, this.y];
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    get length() {
        return Math.sqrt(this.dot(this));
    }

}

/***/ }),

/***/ "./src/utils/utils.canvas.js":
/*!***********************************!*\
  !*** ./src/utils/utils.canvas.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPixelRatio": () => (/* binding */ getPixelRatio),
/* harmony export */   "generateCanvas": () => (/* binding */ generateCanvas)
/* harmony export */ });

const getPixelRatio = function (context) {
    console.log('Determining pixel ratio.');

    var backingStores = [
        'webkitBackingStorePixelRatio',
        'mozBackingStorePixelRatio',
        'msBackingStorePixelRatio',
        'oBackingStorePixelRatio',
        'backingStorePixelRatio'
    ];

    var deviceRatio = window.devicePixelRatio;

    // Iterate through our backing store props and determine the proper backing ratio.
    var backingRatio = backingStores.reduce(function (prev, curr) {
        return (context.hasOwnProperty(curr) ? context[curr] : 1);
    });

    // Return the proper pixel ratio by dividing the device ratio by the backing ratio
    return deviceRatio / backingRatio;
}

const generateCanvas = function (w, h) {
    console.log('Generating canvas.');

    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');
    // Pass our canvas' context to our getPixelRatio method
    var ratio = getPixelRatio(context);

    // Set the canvas' width then downscale via CSS
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    // Scale the context so we get accurate pixel density
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    return canvas;
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => (/* reexport safe */ _core_client_js__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _core_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/client.js */ "./src/core/client.js");

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=hexgame.bundle.js.map