import Phaser from 'phaser'

import Menu from './scenes/menu'
import PhaserTutorial from './scenes/phaserTutorial'

let config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Menu, PhaserTutorial]
};

console.log('Starting Phaser...');
new Phaser.Game(config);
