
/*
|--------------------------------------------------------------------------
| Export Core Objects
|--------------------------------------------------------------------------
*/
import Game from './core/Game.js';
import Events from './core/Events.js';
import Scene from './core/Scene.js';
import { Constants } from './core/Constants.js';

export const core = {
    "Game": Game,
    "Events": Events,
    "Scene": Scene,
    "constants": Constants,
};


/*
|--------------------------------------------------------------------------
| Export Entity Objects
|--------------------------------------------------------------------------
*/
import Entity from './entities/Entity.js';
import Polygon from './entities/shapes/polygon.js';
import Hexagon from './entities/shapes/hexagon.js';
import Square from './entities/shapes/square.js';
import Triangle from './entities/shapes/triangle.js';
import Debug from './entities/text/debug.js';
import HexGrid from './entities/HexGrid.js';
import HexCell from './entities/HexCell.js';
import Animate from './entities/Animate.js';

export const entities = {
    "entity": Entity,
    "shapes": {
        "Polygon": Polygon,
        "Hexagon": Hexagon,
        "Square": Square,
        "Triangle": Triangle,
    },
    "text": {
        "Debug": Debug,
    },
    "HexGrid": HexGrid,
    "HexCell": HexCell,
    "Animate": Animate,
};

/*
|--------------------------------------------------------------------------
| Export Utils Objects
|--------------------------------------------------------------------------
*/
import Canvas from './utils/Canvas.js';
import Hex from './utils/Hex.js';
import Mouse from './utils/Mouse.js';
import Keyboard from './utils/Keyboard.js';
import Vector from './utils/Vector.js';

export const utils = {
    "Canvas": Canvas,
    "Hex": Hex,
    "Mouse": Mouse,
    "Keyboard": Keyboard,
    "Vector": Vector,
};
