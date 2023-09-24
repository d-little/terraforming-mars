import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Size} from '../../../common/cards/render/Size';

// TODO: There is no testing for this corp

export class Aerotech extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.SPACE],
      name: CardName.AEROTECH,
      startingMegaCredits: 47,

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 47MC',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(47).br;
          b.corpBox('effect', (ce) => {
            ce.effect('during the research phase (NOT the opening phase) gain 1 titanium for each card you abstain from buying.', (eb) => {
              eb.cards(1, {size: Size.SMALL, cancelled: true}).asterix().startEffect.titanium(1);
            });
          });
        }),
      },
    });
  }
}
