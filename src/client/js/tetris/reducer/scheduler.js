const levelIntervals = [
    500,
    450,
    400,
    350,
    300,
    250,
    200,
    150,
    100,
    50,
];

const normalizeLevel = level => Math.min(Math.max(0, level), levelIntervals.length - 1);

class Scheduler {
    constructor(callback, level = 0) {
        if (typeof callback !== 'function') {
            throw new Error('Callback has to be a function.');
        }

        level = normalizeLevel(level);

        this.level = level;
        this.interval = levelIntervals[level];
        this.callback = callback;
        this.levalChange = 0;
    }

    start() {
        const runAndCheck = () => {
            this.callback();

            if (this.levalChange !== 0) {
                const newLevel = normalizeLevel(this.level + this.levalChange);
                this.levalChange = 0;

                if (newLevel !== this.level) {
                    clearInterval(this.timer);

                    this.level = newLevel;
                    this.interval = levelIntervals[newLevel];

                    this.timer = setInterval(runAndCheck, this.interval);
                }
            }
        };

        this.timer = setInterval(runAndCheck, this.interval);
    }

    stop() {
        clearInterval(this.timer);
    }

    levelUp() {
        this.levalChange = 1;
    }

    levelDown() {
        this.levalChange = -1;
    }
}

export default Scheduler;
