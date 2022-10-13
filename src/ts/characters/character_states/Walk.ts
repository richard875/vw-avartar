import { CharacterStateBase, Idle, JumpIdle, Sprint } from "./_stateLibrary";
import { Character } from "../Character";

export class Walk extends CharacterStateBase {
  constructor(character: Character) {
    super(character);

    this.canEnterVehicles = true;
    this.character.setArcadeVelocityTarget(0.8);
    this.playAnimation("Walking", 0.1);
  }

  public update(timeStep: number): void {
    super.update(timeStep);

    this.character.setCameraRelativeOrientationTarget();
  }

  public onInputChange(): void {
    super.onInputChange();

    if (this.noDirection()) {
      this.character.setState(new Idle(this.character));
    }

    if (this.character.actions.run.isPressed) {
      this.character.setState(new Sprint(this.character));
    }

    if (this.character.actions.run.justPressed) {
      this.character.setState(new Sprint(this.character));
    }

    if (this.character.actions.jump.justPressed) {
      this.character.setState(new JumpIdle(this.character));
    }
  }
}
