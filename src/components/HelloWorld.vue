<template>
  <div>
    <!-- <button @click="initMap()">Random Map</button> -->
  </div>
</template>

<script>
import {
  Application,
  Graphics,
  Loader,
  Container,
  Rectangle,
  Sprite,
  Texture,
  BaseTexture
} from 'pixi.js';
import {blockBuilder} from './objects/block-builder'
import allObject from './objects/all-object'
import Maze from './objects/maze'
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
      player: blockBuilder(allObject.player, {x: 2, y: 2}),
      mazeMapping: [],
      maze: []
    }
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
            this.player.y -= 32;
          },
          a: () => {
            if (this.onTheLeft() === '#') {
              console.log('hit!')
              return;
            }
            this.player.x -= 32;
          },
          s: () => {
            if (this.onTheBottom() === '#') {
              console.log('hit!')
              return;
            }
            this.player.y += 32;
          },
          d: () => {
            if (this.onTheRight() === '#') {
              console.log('hit!')
              return;
            }
            this.player.x += 32;
          }
        };

        try {
          controls[e.key]();  
        } catch (error) {
          
        }

    },
    initializeWorld() {
      this.app.renderer.backgroundColor = 'black';
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
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
            const data3 = {x: 11, y: 14, nowx: x + 1, nowy: y + 1};
            this.mazeMapping.push(data3);
          }
        }
      }
      const mazeVis = blockBuilder(this.mazeMapping, {x: 1, y: 1});
      this.app.stage.addChild(mazeVis);
    },
    initPlayer() {
      this.app.stage.addChild(this.player);
    },
    onTheRight() {
      return this.maze.map[((this.player.y)/ 32) + 1][((this.player.x + 32)/ 32) + 1]
    },
    onTheLeft() {
      return this.maze.map[((this.player.y)/ 32) + 1][((this.player.x - 32)/ 32) + 1]
    },
    onTheTop() {
      return this.maze.map[((this.player.y - 32)/ 32) + 1][((this.player.x)/ 32) + 1]
    },
    onTheBottom() {
      return this.maze.map[((this.player.y + 32)/ 32) + 1][((this.player.x)/ 32) + 1]
    }
  }
}
</script>

<style scoped>

</style>
