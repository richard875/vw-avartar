import { CharacterStateBase, JumpIdle, Walk } from "./_stateLibrary";
import { ICharacterState } from "../../interfaces/ICharacterState";
import { Character } from "../Character";

export class Idle extends CharacterStateBase implements ICharacterState {
  constructor(character: Character) {
    super(character);

    this.character.velocitySimulator.damping = 0.6;
    this.character.velocitySimulator.mass = 10;

    this.character.setArcadeVelocityTarget(0);
    this.playAnimation("Idle", 0.1);
  }

  public update(timeStep: number): void {
    super.update(timeStep);
  }
  public onInputChange(): void {
    super.onInputChange();

    if (this.character.actions.jump.justPressed) {
      this.character.setState(new JumpIdle(this.character));
    }

    if (this.anyDirection()) {
      this.character.setState(new Walk(this.character));
    }
  }
}
