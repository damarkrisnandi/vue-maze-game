<template>
  <div>
    <div class="controller">
      <Controller @direction="keyDownHandler($event)" />
    </div>
  </div>
</template>

<script>
import {
  Application
} from 'pixi.js';
import {blockBuilder} from './objects/block-builder'
import allObject from './objects/all-object'
import Maze from './objects/maze'
import item from './objects/item'
import {animator} from './objects/animator'

import Controller from './Controller.vue'
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      app: new Application({
        width: 500,
        height: 500,
        transparent: false,
        antialias: true
      }),
      center: {x: Math.floor((window.innerWidth / 2) / 32) + 1, y: Math.floor((window.innerHeight / 2) / 32) + 1},
      player: null,
      maze: [],
      mazeVisualizer: null,
      unit: 32
    }
  },
  components: {
      Controller
  },
  created() {
    this.initializeWorld();
    this.initMap();
    this.initPlayer();
    window.addEventListener('keydown', this.keyDownHandler)
  },

  methods: {
    keyDownHandler(e) {
        // Your handler code here
        const controls = {
          w: () => { if (this.getNeighbor(0, -1) !== '#') this.mazeVisualizer.y += this.unit; },
          a: () => { if (this.getNeighbor(-1, 0) !== '#') this.mazeVisualizer.x += this.unit; },
          s: () => { if (this.getNeighbor(0, 1) !== '#') this.mazeVisualizer.y -= this.unit; },
          d: () => { if (this.getNeighbor(1, 0) !== '#') this.mazeVisualizer.x -= this.unit; }
        };

        try {
            controls[(e.key).toLowerCase()](); 
            // update stage 
            this.app.stage.addChild(this.mazeVisualizer);
            this.app.stage.addChild(this.player);
        } catch (error) {}

    },
    initializeWorld() {
        this.app.renderer.backgroundColor = 'black';
        this.app.renderer.resize(window.innerWidth, window.innerHeight - 64);
        this.app.renderer.view.style.position = 'absolute';
        document.body.append(this.app.view);
    },
    initMap() {
        this.maze = new Maze();
        this.maze.init();

        const mazeMapping = [];
        for (let y = 0; y < this.maze.map.length; y++) {
            for (let x = 0; x < this.maze.map[y].length; x++) {
                if (this.maze.map[y][x] === '#') {
                    const data = {x: 13, y: 11, nowx: x + 1, nowy: y + 1};
                    mazeMapping.push(data);
                } else if (this.maze.map[y][x] === '.') {
                    const data2 = {x: 21, y: 1, nowx: x + 1, nowy: y + 1};
                    mazeMapping.push(data2);
                } else {
                    const animateGold = animator(item.gold, {x: this.unit, y: this.unit})
                    animateGold.animationSpeed = 0.2
                    animateGold.play();
                    const data3 = {stack: true, animation: animateGold, x: 21, y: 1, nowx: x + 1, nowy: y + 1};
                    mazeMapping.push(data3);
                }
            }
        }
        
        this.mazeVisualizer = blockBuilder(mazeMapping, {x: 1, y: 1});
        this.app.stage.addChild(this.mazeVisualizer);
    },
    initPlayer() {
        this.player = blockBuilder(allObject.player, this.center);
        this.app.stage.addChild(this.player);
    },
    /**
     * @param x horizontal neighbor unit
     * @param y vertical neighbor unit
     * @returns object pada posisi (x, y) dari sekitar player.
     * - (1, 0) sebelah kanan
     * - (-1, 0) sebelah kiri
     * - (0, -1) di atas
     * - (0, 1) di bawah
     */
    getNeighbor(x, y) {
            const pos = {
                y: ((this.player.y + (this.unit*y))/ this.unit) + (this.center.y - 1) - (this.mazeVisualizer.y / this.unit),
                x: ((this.player.x + (this.unit*x))/ this.unit) + (this.center.x - 1) - (this.mazeVisualizer.x / this.unit)
            };
            return this.maze.map[pos.y][pos.x];
        }
  }
}
</script>

<style scoped>
    .controller {
        position: fixed;
        bottom:0;
        margin-bottom: 16px;
        opacity: 0.8;
        z-index: 999;
    }

    @media screen and (min-width: 600px) {
    .controller {
        display: none !important;
    }
}
</style>
