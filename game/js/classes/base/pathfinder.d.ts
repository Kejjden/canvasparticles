/// <reference path="../ref.d.ts" />
declare class Pathfinder {
    mode: string;
    debugimage: any;
    path: any[];
    pf: any;
    collision: any[][];
    pathSize: number;
    pathIndex: number;
    constructor();
    next(): any;
    getCurrent(): Grid;
    getPath(currentGrid: any, targetGrid: any): any[];
    render(): void;
}
