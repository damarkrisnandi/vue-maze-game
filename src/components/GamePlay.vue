<template>
  <div>
    <!-- <button @click="initMap()">Random Map</button> -->
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
      mazeMapping: [],
      maze: [],
      mazeVisualizer: null
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
          w: () => {
            if (this.onTheTop() === '#') {
              console.log('hit!')
              return;
            }
            // this.player.y -= 32;
            this.mazeVisualizer.y += 32;
          },
          a: () => {
            if (this.onTheLeft() === '#') {
              console.log('hit!')
              return;
            }
            // this.player.x -= 32;
            this.mazeVisualizer.x += 32;
          },
          s: () => {
            if (this.onTheBottom() === '#') {
              console.log('hit!')
              return;
            }
            // this.player.y += 32;
            this.mazeVisualizer.y -= 32;
          },
          d: () => {
            if (this.onTheRight() === '#') {
              console.log('hit!')
              return;
            }
            // this.player.x += 32;
            this.mazeVisualizer.x -= 32;
          }
        };

        try {
          controls[(e.key).toLowerCase()]();  
          this.app.stage.addChild(this.mazeVisualizer);
          this.app.stage.addChild(this.player);
        } catch (error) {
          
        }

    },
    initializeWorld() {
      this.app.renderer.backgroundColor = 'black';
      this.app.renderer.resize(window.innerWidth, window.innerHeight - 64);
      // this.app.renderer.view.style.position = 'absolute';
      document.body.append(this.app.view);
    },
    initMap() {
      console.log('cek')
      this.maze = new Maze();
      this.maze.init();

      for (let y = 0; y < this.maze.map.length; y++) {
        for (let x = 0; x < this.maze.map[y].length; x++) {
          if (this.maze.map[y][x] === '#') {
            const data = {x: 13, y: 11, nowx: x + 1, nowy: y + 1};
            this.mazeMapping.push(data);
          } else if (this.maze.map[y][x] === '.') {
            const data2 = {x: 21, y: 1, nowx: x + 1, nowy: y + 1};
            this.mazeMapping.push(data2);
          } else {
            const animateGold = animator(item.gold, {x: 32, y: 32})
            animateGold.animationSpeed = 0.2
            animateGold.play();
            const data3 = {stack: true, animation: animateGold, x: 21, y: 1, nowx: x + 1, nowy: y + 1};
            this.mazeMapping.push(data3);
          }
        }
      }
      const mazeVis = blockBuilder(this.mazeMapping, {x: 1, y: 1});
      this.mazeVisualizer = mazeVis;
      this.app.stage.addChild(this.mazeVisualizer);
    },
    initPlayer() {
      this.player = blockBuilder(allObject.player, this.center);
      this.app.stage.addChild(this.player);
    },
    onTheRight() {
      return this.maze.map[
        ((this.player.y)/ 32) + (this.center.y - 1) - (this.mazeVisualizer.y / 32)
      ][
        ((this.player.x + 32)/ 32) + (this.center.x - 1) - (this.mazeVisualizer.x / 32)
      ]
    },
    onTheLeft() {
      return this.maze.map[
        ((this.player.y)/ 32) + (this.center.y - 1) - (this.mazeVisualizer.y / 32)
      ][
        ((this.player.x - 32)/ 32) + (this.center.x - 1) - (this.mazeVisualizer.x / 32)
      ]
    },
    onTheTop() {
      return this.maze.map[
        ((this.player.y - 32)/ 32) + (this.center.y - 1) - (this.mazeVisualizer.y / 32)
      ][
        ((this.player.x)/ 32) + (this.center.x - 1) - (this.mazeVisualizer.x / 32)
      ]
    },
    onTheBottom() {
      return this.maze.map[
        ((this.player.y + 32)/ 32) + (this.center.y - 1) - (this.mazeVisualizer.y / 32)
      ][
        ((this.player.x)/ 32) + (this.center.x - 1) - (this.mazeVisualizer.x / 32)
      ]
    }
  }
}
</script>

<style scoped>
    .controller {
        position:fixed;
        bottom:0;
        margin-bottom: 16px;
        opacity: 0.8;
    }

    @media screen and (min-width: 600px) {
    .controller {
        display: none !important;
    }
}
</style>
