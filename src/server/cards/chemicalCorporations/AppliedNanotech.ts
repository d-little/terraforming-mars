import {ActionCard} from '../ActionCard';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';
import {digit} from '../Options';


export class AppliedNanotech extends ActionCard implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.MICROBE],
      name: CardName.APPLIED_NANOTECH,
      startingMegaCredits: 40,

      behavior: {
        stock: {
          steel: 8,
          plants: 3,
        },
      },

      action: {
        addResourcesToAnyCard: {type: CardResource.MICROBE, count: 1, autoSelect: true},
      },
      resourceType: CardResource.MICROBE,
      victoryPoints: {resourcesHere: {}, per: 3},

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 40MC, 8 steel, and 3 plants. Worth 1 VP for every 3 microbe resources on this card.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(40).steel(8, {digit}).plants(3, {digit}).br;
          b.corpBox('action', (ce) => {
            ce.action('add a microbe to ANY card.', (eb) => {
              eb.empty().startAction.microbes(1).asterix();
            });
          });
        }),
      },
    });
  }
}
