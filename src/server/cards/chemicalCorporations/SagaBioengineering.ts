import {ActionCard} from '../ActionCard';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {played} from '../Options';
import {CardResource} from '../../../common/CardResource';

export class SagaBioengineering extends ActionCard implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.ANIMAL],
      name: CardName.SAGA_BIOENGINEERING,
      startingMegaCredits: 43,
      resourceType: CardResource.ANIMAL,

      firstAction: {
        text: 'Raise Oxygen 2 steps.',
        global: {oxygen: 2},
      },

      action: {
        addResourcesToAnyCard: {type: CardResource.ANIMAL, count: 1},
      },

      metadata: {
        cardNumber: 'CHEM??',
        description: 'You start with 43MC. As your first action, raise Oxygen 2 steps.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(40).production((pb) => {
            pb.megacredits(1);
          });
          b.oxygen(2);
          b.br;
          b.action('Add an animal to ANY card.', (eb) => {
            eb.empty().startAction.animals(1).asterix;
          });
          b.br;
          b.effect('animals on this card may be used as 3MC when paying for cards with plant, microbe, or animal tags.', (eb) => {
            eb.plants(1, {played}).slash().animals(1, {played}).slash().microbes(1, {played}).startEffect.animals(1).equals().megacredits(3);
          });
        }),
      },
    });
  }
}
