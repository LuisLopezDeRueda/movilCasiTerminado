export class Vidas {
  constructor(scene, initialLives) {
      this.relatedScene = scene;
      this.initialLives = initialLives;
  }

  create() {
      let displacement = 65;
      let firstPosition = 1020 - (this.initialLives * displacement);
      this.liveImages = this.relatedScene.physics.add.staticGroup({
          setScale: { x: 0.085, y: 0.085 },
          key: 'corazon',
          frameQuantity: this.initialLives,
          gridAlign: {
              width: this.initialLives,
              height: 1,
              cellWidth: displacement - 15,
              cellHeight: 30,
              x: firstPosition,
              y: -180
          }
      });
  }

  liveLost() {
      if (this.liveImages.countActive() == 1) {
          this.relatedScene.endGame(); // Llamada al método endGame sin argumentos
          return false;
      }

      let currentLiveLost = this.liveImages.getFirstAlive();
      currentLiveLost.disableBody(true, true);
      return true;
  }
}
