/// <reference path="ref.d.ts" />
declare var PF: any;
declare class ZombiePirate {
    sprite: Sprite;
    health: number;
    walkspeed: number;
    pathTick: number;
    pathIndex: number;
    path: any[];
    pathSize: number;
    pathFinder: Pathfinder;
    debugimage: any;
    currentGrid: Grid;
    pathTargetGrid: Grid;
    attacking: boolean;
    constructor();
    updatePath(): void;
    checkPlayerCollision(): boolean;
    update(): void;
    render(): void;
}
declare class Grid {
    x: number;
    y: number;
    constructor(x: any, y: any);
    setXY(x: any, y: any): void;
}
declare class Player {
    sprite: Sprite;
    health: number;
    walkspeed: number;
    attacking: boolean;
    debugimage: any;
    direction: string;
    constructor();
    update(): void;
    walk(direction: any): void;
    attack(): void;
    render(): void;
}
declare class AnimationState {
    name: string;
    frames: number[];
    currentFrame: number;
    constructor(name: any, frames: any);
    getName(): string;
    nextFrame(): void;
}
declare class Sprite {
    context: any;
    width: number;
    height: number;
    image: string;
    states: AnimationState[];
    currentState: AnimationState;
    tick: number;
    x: number;
    y: number;
    gridX: number;
    gridY: number;
    pushQueue: any[];
    constructor(width: any, height: any, image: any);
    setGrids(): void;
    getGrids(): Grid;
    pushState(name: string): void;
    getState(name: string): AnimationState;
    addState(state: AnimationState): void;
    setState(name: string): void;
    render(): void;
    update(): void;
}
declare class Controls {
    UpPressed: boolean;
    LeftPressed: boolean;
    DownPressed: boolean;
    RightPressed: boolean;
    constructor();
    update(event: any): void;
    updatePressed(event: any): void;
    checkForState(event: any): boolean;
}
declare class Door {
    image: any;
    state: number;
    x: number;
    y: number;
    constructor(x: any, y: any);
}
declare class Level {
    image: any;
    layer2: any;
    tileWidth: number;
    tileHeight: number;
    tilesX: number;
    tilesY: number;
    collision: any[][];
    doorUp: Door;
    doorLeft: Door;
    doorRight: Door;
    debugimage: any;
    constructor(tileWidth: any, tileHeight: any, tilesX: any, tilesY: any);
    render(): void;
    renderLayer(): void;
    checkCollision(x: any, y: any, grid: any): boolean;
    debug(): void;
}
declare class Game {
    context: any;
    static instance: Game;
    player: Player;
    lastDeltaUpdate: number;
    deltaTime: number;
    controls: Controls;
    level: Level;
    zombiepirates: ZombiePirate[];
    constructor(context: any);
    static getInstance(): Game;
    static getGridsFor(x: any, y: any): Grid;
    static getDeltaTime(): number;
    start(): void;
    update: () => void;
}
declare var canvas: HTMLCanvasElement;
declare var ctx: CanvasRenderingContext2D;
declare var game: Game;
declare function l(something: any): void;
