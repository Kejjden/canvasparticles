/// <reference path="../ref.d.ts" />
declare class Spawner {
    timer: Timer;
    level: Level;
    game: Game;
    counter: number;
    zombieCounter: number;
    activeDoor: Door;
    doors: Door[];
    constructor();
    getRandomDoor(): Door;
    update(): void;
    pause(): void;
    resume(): void;
    cancel(): void;
    nextWave(): void;
    newWave: () => void;
    nextZombie: () => void;
    closeDoor: () => void;
}
