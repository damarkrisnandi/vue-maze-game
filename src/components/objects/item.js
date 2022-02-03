export default {
    gem: [1, 2, 3, 4, 5].map(data => data = `./assets/items/gem/gem-${data}.png`),
    gold: Array.from({length: 9}, (v, k) => k+1).map(data => data = `./assets/items/gold/goldCoin${data}.png`)

}