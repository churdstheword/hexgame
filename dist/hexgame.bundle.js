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
/* harmony import */ var _entities_HexGrid_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../entities/HexGrid.js */ "./src/entities/HexGrid.js");
/* harmony import */ var _utils_Mouse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/Mouse.js */ "./src/utils/Mouse.js");










class Client {
    constructor(w, h, fps, container) {
        this.config = {
            width: w,
            height: h,
            targetFps: fps,
        };

        this.state = {
            status: "running",
            client: {
                curFPS: 0,
                frameCount: 0,
                lastFPSUpdate: 0,
                framesThisSecond: 0,
                tick: 1000 / fps,
                nextGameTick: new Date().getTime(),
            },
            entities: [],
            keyboard: new _utils_Keyboard_js__WEBPACK_IMPORTED_MODULE_6__.default(),
            mouse: new _utils_Mouse_js__WEBPACK_IMPORTED_MODULE_8__.default(),
        };

        this.viewport = (0,_utils_utils_canvas_js__WEBPACK_IMPORTED_MODULE_0__.generateCanvas)(this.config.width, this.config.height);
        this.context = this.viewport.getContext("2d");
        container.insertBefore(this.viewport, container.firstChild);
    }

    init() {
        this.state.entities = [];
        //this.state.entities.push(new Hexagon(new Vector(100, 100), 100, 0));
        //this.state.entities.push(new Triangle(new Vector(250, 250), 50, 15));
        //this.state.entities.push(new Square(new Vector(350, 100), 75, 25));

        this.state.entities.push(
            new _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(10, 30), "FPS", () => {
                return this.state.client.curFPS;
            })
        );
        this.state.entities.push(
            new _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(10, 50), "Frames", () => {
                return this.state.client.frameCount;
            })
        );
        this.state.entities.push(
            new _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(10, 70), "keysPressed", () => {
                return this.state.keyboard.toString();
            })
        );
        this.state.entities.push(
            new _entities_text_debug_js__WEBPACK_IMPORTED_MODULE_5__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(10, 90), "mouse", () => {
                return this.state.mouse.toString();
            })
        );

        this.state.entities.push(new _entities_HexGrid_js__WEBPACK_IMPORTED_MODULE_7__.default(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_1__.default(25, 120), 15));

        this.loop();
    }

    loop() {
        this.frameid = window.requestAnimationFrame(this.loop.bind(this));

        let time = new Date().getTime();

        if (time > this.state.client.nextGameTick) {
            this.state.client.nextGameTick += this.state.client.tick;
            this.state.client.frameCount++;
            this.update(time);
            this.draw();
        }

        if (this.state.status == "paused") {
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
        this.context.clearRect(0, 0, this.config.width, this.config.height);

        // Draw all the entities
        for (let entity of this.state.entities) {
            entity.draw(this.context);
        }
    }
}


/***/ }),

/***/ "./src/entities/HexCell.js":
/*!*********************************!*\
  !*** ./src/entities/HexCell.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HexCell)
/* harmony export */ });
/* harmony import */ var _utils_Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Vector.js */ "./src/utils/Vector.js");


class HexCell {
    constructor(hex, size) {
        this.hex = hex;
        this.size = size;

        this.state = {
            center: new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_0__.default(0, 0),
            fillColor: "#FFFFFF",
        };
    }

    update(state, parent) {
        if (state.client.frameCount % 5 == 0) {
            // Calculate the vector of the cell's center
            let x = this.size * (Math.sqrt(3) * this.hex.q + (Math.sqrt(3) / 2) * this.hex.r);
            let y = this.size * (3 / 2) * this.hex.r;
            this.state.center = parent.position.add(new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_0__.default(x, y));
        }

        // Determine if the mouse position is inside the cell
        let vertices = this.getVertices(this.state.center);
        let point = new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_0__.default(state.mouse.input.cursorX, state.mouse.input.cursorY);
        this.state.color = this.pointInPoly(vertices, point) ? "#28d45e" : "#FFFFFF";
    }

    draw(ctx) {
        // Use the vertices to draw the hexagon
        ctx.beginPath();
        ctx.fillStyle = this.state.color;
        for (let vertex of this.getVertices(this.state.center)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    getVertices(center) {
        let vertices = [];
        const baseVector = new _utils_Vector_js__WEBPACK_IMPORTED_MODULE_0__.default(this.size, 0);
        for (var i = 0; i < 6; i++) {
            let vertex = center.add(baseVector.rotate(i * ((2 * Math.PI) / 6) + 30 * (Math.PI / 180)));
            vertices.push(vertex);
        }
        return vertices;
    }

    /**
     * Determines if a point lies within a set of vertices of a polygon
     *
     * @param Vector[] vertices
     * @param Vector point
     * @returns boolean
     */
    pointInPoly(vertices, point) {
        let inPoly = false;
        let v = vertices;
        let p = point;
        for (let i = 0, j = v.length - 1; i < v.length; i++) {
            let m1 = v[i].y < p.y && v[j].y >= p.y;
            let m2 = v[j].y < p.y && v[i].y >= p.y;
            let m3 = v[i].x <= p.x || v[j].x < p.x;
            if ((m1 || m2) && m3) {
                let n1 = v[i].x;
                let n2 = p.y - v[i].y;
                let n3 = v[j].y - v[i].y;
                let n4 = v[j].x - v[i].x;
                inPoly ^= n1 + (n2 / n3) * n4 < p.x;
            }
            j = i;
        }
        return inPoly;
    }
}


/***/ }),

/***/ "./src/entities/HexGrid.js":
/*!*********************************!*\
  !*** ./src/entities/HexGrid.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HexGrid)
/* harmony export */ });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
/* harmony import */ var _utils_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Vector */ "./src/utils/Vector.js");
/* harmony import */ var _utils_Hex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Hex */ "./src/utils/Hex.js");
/* harmony import */ var _HexCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HexCell */ "./src/entities/HexCell.js");





/**
 *
 */
class HexGrid extends _entity__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(position, size) {
        super(position);
        this.size = size;

        this.state = {
            width: 20,
            height: 15,
            cells: [],
        };

        // Build a map for debugging
        for (let r = 0; r < this.state.height; r++) {
            let offset = Math.floor(r / 2);
            for (let q = -offset; q < this.state.width - offset; q++) {
                this.state.cells.push(new _HexCell__WEBPACK_IMPORTED_MODULE_3__.default(new _utils_Hex__WEBPACK_IMPORTED_MODULE_2__.default(q, r, -q - r), size));
            }
        }
    }

    draw(ctx) {
        // Draw a hexagon at each of the coordinate from the origin
        for (let cell of this.state.cells) {
            cell.draw(ctx);
        }
    }

    update(state) {
        // Loop through each and determine if we need to color or highlight it
        for (let cell of this.state.cells) {
            cell.update(state, this);
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
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(this.toString(), this.position.x, this.position.y);
    }

    toString() {
        return `${this.label}: ${this.value}`;
    }

}

/***/ }),

/***/ "./src/utils/Hex.js":
/*!**************************!*\
  !*** ./src/utils/Hex.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hex)
/* harmony export */ });

class Hex {

    constructor(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
    }

    toString() {
        return `q:${this.q}|r:${this.r}|s:${this.s}`;
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
        return JSON.stringify(this.input);
    }
}

/***/ }),

/***/ "./src/utils/Mouse.js":
/*!****************************!*\
  !*** ./src/utils/Mouse.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mouse)
/* harmony export */ });
class Mouse {
    constructor() {
        window.addEventListener("mousemove", (event) => this.handleMove(event), false);
        window.addEventListener("mousedown", (event) => this.handleKeyEvent(event, true), false);
        window.addEventListener("mouseup", (event) => this.handleKeyEvent(event, false), false);
        window.addEventListener("contextmenu", (event) => this.handleContextMenu(event), false);

        this.input = {
            button: {
                LEFT: false,
                MIDDLE: false,
                RIGHT: false,
            },
            cursorX: 0,
            cursorY: 0,
        };
    }

    handleKeyEvent(event, pressed) {
        event = event || window.event;
        event.preventDefault();

        if ("which" in event) {
            switch (event.which) {
                case 1:
                    this.input.button.LEFT = pressed;
                    break;
                case 2:
                    this.input.button.MIDDLE = pressed;
                    break;
                case 3:
                    this.input.button.RIGHT = pressed;
            }
        } else if ("button" in event) {
            switch (event.button) {
                case 0:
                    this.input.button.LEFT = pressed;
                    break;
                case 1:
                    this.input.button.MIDDLE = pressed;
                    break;
                case 2:
                    this.input.button.RIGHT = pressed;
                    break;
            }
        }

        if (!pressed) {
            // Do something?
        }
    }

    handleMove(event) {
        event = event || window.event;
        event.preventDefault();

        this.input.cursorX = event.clientX;
        this.input.cursorY = event.clientY;
    }

    handleContextMenu(event) {
        event = event || window.event;
        event.preventDefault();
    }

    toString() {
        return JSON.stringify(this.input);
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