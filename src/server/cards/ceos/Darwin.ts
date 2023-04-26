import {CardName} from '../../../common/cards/CardName';
// import {Player} from '../../Player';
import {PlayerInput} from '../../PlayerInput';
import {CardRenderer} from '../render/CardRenderer';
import {CeoCard} from './CeoCard';
import {Size} from '../../../common/cards/render/Size';
import {Resources} from '../../../common/Resources';
import {Game} from '../../Game';

export class Darwin extends CeoCard {
  constructor() {
    super({
      name: CardName.DARWIN,
      metadata: {
        cardNumber: 'L39',
        renderData: CardRenderer.builder((b) => {
          b.text('Dominant party change', Size.SMALL).colon().megacredits(2);
          b.br.br;
          b.opgArrow().plus().influence().influence().asterix();
          b.br;
        }),
        description: 'Gain 2 M€ whenever the dominant party changes. Once per game, gain 2 influence for THIS GENERATION only.',
      },
    });
  }

  public opgActionIsActive = false;

  public action(): PlayerInput | undefined {
    this.isDisabled = true;
    this.opgActionIsActive = true;
    return undefined;
  }

  public static onDominantPartyChange(game: Game) {
    // TODO(): Confirm: Do we really get 2MC during SOLAR phase?
    // if (cardOwner.game.phase === Phase.SOLAR) return;
    game.getPlayers()
      .filter((player) => player.cardIsInEffect(CardName.DARWIN))
      .forEach((player) => player.addResource(Resources.MEGACREDITS, 2, {log: true}));
    return;
  }
}
