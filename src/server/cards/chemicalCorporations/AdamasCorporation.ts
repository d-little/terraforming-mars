import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {digit} from '../Options';

import {IPlayer} from '../../IPlayer';
import {Space} from '../../boards/Space';
// import {BoardType} from '../../boards/BoardType';
// import {SpaceType} from '../../../common/boards/SpaceType';

export class AdamasCorporation extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.SCIENCE, Tag.BUILDING],
      name: CardName.ADAMAS_CORPORATION,
      startingMegaCredits: 45,

      behavior: {
        stock: {
          steel: 5,
        },
      },

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 45MC and 5 steel',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(45).steel(5, {digit}).br;
          b.corpBox('effect', (ce) => {
            ce.effect('whenever you place a tile on a space with NO PLACEMENT BONUS, draw a card', (eb) => {
              eb.emptyTile().asterix().startEffect.cards(1);
            });
          });
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: IPlayer, player: IPlayer, space: Space) {
    // Works in Space and on the Moon, and any future spaces
    // Also does grant bonuses when overplacing in Ares.
    if (cardOwner !== player) return;
    const bonuses = space.bonus;
    if (bonuses.length === 0 || space.tile?.covers !== undefined) {
      player.drawCard(1);
      return;
    }
  }
}
