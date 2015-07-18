declare class Timer {
    id: any;
    start: any;
    remaining: any;
    callback: any;
    constructor(delay: any, callback?: any);
    pause(): void;
    resume(): void;
    cancel(): void;
    update: () => void;
}
