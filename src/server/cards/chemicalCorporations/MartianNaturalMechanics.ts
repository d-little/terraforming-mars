import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';

import {IPlayer} from '../../IPlayer';
import {Space} from '../../boards/Space';
import {Resource} from '../../../common/Resource';
import {GainResources} from '../../deferredActions/GainResources';
import {Board} from '../../boards/Board';

export class MartianNaturalMechanics extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.PLANT],
      name: CardName.MARTIAN_NATURAL_MECHANICS,
      startingMegaCredits: 40,

      behavior: {
        production: {plants: 1},
      },

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 40MC and 1 plant production.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(40).production((pb) => {
            pb.plants(1);
          });
          b.corpBox('effect', (ce) => {
            ce.effect('all non-ocean tiles give you an adjacency bonus of 1MC.', (eb) => {
              eb.emptyTile().emptyTile('golden').startEffect.megacredits(1).asterix;
            });
          });
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space) {
    if (cardOwner.id === activePlayer.id) {
      let nonOceanTiles = 0;
      activePlayer.game.board.getAdjacentSpaces(space).forEach((adjacentSpace) => {
        if (!Board.isOceanSpace(adjacentSpace)) {
          nonOceanTiles += 1;
        }
      });
      cardOwner.game.defer(new GainResources(cardOwner, Resource.PLANTS, {count: nonOceanTiles}));
    }
    return;
  }
}
