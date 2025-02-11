import {PlayerInputType} from '../../common/input/PlayerInputType';
import {Message} from '../../common/logs/Message';
import {BasePlayerInput, PlayerInput} from '../PlayerInput';

export abstract class OptionsInput extends BasePlayerInput {
  public options: Array<PlayerInput>;
  constructor(type: PlayerInputType, title: string | Message, options: Array<PlayerInput>) {
    super(type, title);
    this.options = options;
  }
}
