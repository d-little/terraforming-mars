import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';

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
          b.br;
          b.effect('all non-ocean tiles give you an adjacency bonus of 1MC.', (eb) => {
            eb.emptyTile().emptyTile('golden').startEffect.megacredits(1).asterix;
          });
        }),
      },
    });
  }
}
