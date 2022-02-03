import { Display } from 'rot-js';
import { Map } from "rot-js/lib/index";

export default class Maze {
    map = [];
    map2 = [];
    mapSize = { width: 0, height: 0 };
    gameSize = { width: 19, height: 19 };
    width = 9;
    height = 6;

    init() {
        this.gameSize = {width: 50, height: 50}
        // if (Math.floor(window.innerWidth / 32) < Math.floor(window.innerHeight / 32)) {
        //     const size = Math.floor(window.innerWidth / 32)
        //     this.gameSize = {width: size, height: size}
        // } else {
        //     const size = Math.floor(window.innerHeight / 32)
        //     this.gameSize = {width: size, height: size}
        // }

        this.map = [];
        this.mapSize = { width: this.gameSize.width, height: this.gameSize.height };

        for (let i = 0; i < this.mapSize.height; i++) {
          this.map[i] = [];
          for (let j = 0; j < this.mapSize.width; j++) {
            this.map[i][j] = "#";
          }
        }
    
        let freeCells = [];
    
        let digger = new Map.Cellular(
            this.mapSize.width - 2,
            this.mapSize.height - 2
        );
        digger.randomize(0.48788);
        digger.create((x, y, value) => {
          if (value) {
            this.map[x + 1][y + 1] = "#";
          } else {
            freeCells.push({ x: x + 1, y: y + 1 });
            this.map[x + 1][y + 1] = ".";
          }
        });
        digger.create((x, y, value) => {
          if (value) {
              console.log(value);
            if (this.map[x + 1][y + 1] !== "#") {
              this.map[x + 1][y + 1] = '*';
            }
          } else {
            return;
          }
        });
    }
}