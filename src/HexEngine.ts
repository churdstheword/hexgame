
/*
|--------------------------------------------------------------------------
| Export Core Objects
|--------------------------------------------------------------------------
*/
import Game from './core/Game';
import Events from './core/Events';
import { Constants } from './core/Constants';

export const core = {
    "Game": Game,
    "Events": Events,
    "constants": Constants,
};


/*
|--------------------------------------------------------------------------
| Export Entity Objects
|--------------------------------------------------------------------------
*/
import Entity from './entities/Entity';
import Polygon from './entities/shapes/polygon';
import Hexagon from './entities/shapes/hexagon';
import Square from './entities/shapes/square';
// import Triangle from './entities/shapes/triangle';
import Debug from './entities/text/debug';
import HexGrid from './entities/HexGrid';
import HexCell from './entities/HexCell';
import Animate from './entities/Animate';

export const entities = {
    "entity": Entity,
    "shapes": {
        "Polygon": Polygon,
        "Hexagon": Hexagon,
        "Square": Square,
    //     "Triangle": Triangle,
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
import Canvas from './utils/Canvas';
import Hex from './utils/Hex';
import Mouse from './utils/Mouse';
import Keyboard from './utils/Keyboard';
import Vector from './utils/Vector';

export const utils = {
    "Canvas": Canvas,
    "Hex": Hex,
    "Mouse": Mouse,
    "Keyboard": Keyboard,
    "Vector": Vector,
};
