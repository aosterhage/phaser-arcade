export default class Menu extends Phaser.Scene {

    private scenes: string[] = ['PhaserTutorial'];
    private menuItems: Phaser.GameObjects.Text[] = [];

    // Box highliting the currently selected menu item
    private selector!: Phaser.GameObjects.Rectangle;
    private selectorIndex: number = 0;

    // Keys to handle
    private keyUp!: Phaser.Input.Keyboard.Key;
    private keyDown!: Phaser.Input.Keyboard.Key;
    private keyEnter!: Phaser.Input.Keyboard.Key;

    readonly x: number = 10;
    readonly y: number = 0;
    readonly gap: number = 10;


    constructor() {
        console.log('Constructing Menu scene...');
        super({key: 'Menu'});
    }

    init() {

    }

    preload() {
    }

    create() {
        console.log('Starting Menu scene...');
        let previousYEnd = this.y;
        for (let i = 0; i < this.scenes.length; i++) {
            this.menuItems.push(this.add.text(this.x, previousYEnd + this.gap, this.scenes[i]).setOrigin(0,0));
            previousYEnd = this.menuItems[i].y + this.menuItems[i].height;
        }

        this.selector = this.add.rectangle(this.x, this.y + this.gap, this.menuItems[0].width, this.menuItems[0].height, 0xffffff, 0.25).setOrigin(0,0);

        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {
            if (this.selectorIndex <= 0) {
                this.selectorIndex = 0;
                return;
            }

            this.selectorIndex--;

            this.tweens.add({
                targets: this.selector,
                x: this.menuItems[this.selectorIndex].x,
                y: this.menuItems[this.selectorIndex].y,
                width: this.menuItems[this.selectorIndex].width,
                height: this.menuItems[this.selectorIndex].height,
                duration: 100
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {
            if (this.selectorIndex >= this.menuItems.length - 1) {
                this.selectorIndex = this.menuItems.length - 1;
                return;
            }

            this.selectorIndex++;

            this.tweens.add({
                targets: this.selector,
                x: this.menuItems[this.selectorIndex].x,
                y: this.menuItems[this.selectorIndex].y,
                width: this.menuItems[this.selectorIndex].width,
                height: this.menuItems[this.selectorIndex].height,
                duration: 100
            });
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            this.scene.start(this.scenes[this.selectorIndex]);
        }
    }
};
