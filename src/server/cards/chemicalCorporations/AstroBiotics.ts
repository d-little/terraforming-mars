import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {Tag} from '../../../common/cards/Tag';

export class AstroBiotics extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.PLANT],
      name: CardName.ASTRO_BIOTICS,

      firstAction: {
        text: 'Draw 2 cards with a plant tag',
        drawCard: {count: 2, tag: Tag.PLANT},
      },
      cardDiscount: {tag: Tag.PLANT, amount: 3},
      // Greenery Standard Project Behavior is in MoonHabitatStandardProject, MoonMineStandardProject and MoonRoadStandardProject.

      metadata: {
        cardNumber: 'CHEM??',
        description: 'You start with 52 M€. As your first action draw 2 cards with plant tags.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(42).cards(2, {secondaryTag: Tag.PLANT}).br;
          b.corpBox('effect', (ce) => {
            ce.effect('when you play a plant tag OR THE GREENERY STANDARD PROJECT, you pay 3MC less for it. (NB: You will get the discount for the Greenery project, but it\'s not rendered correctly.)', (eb) => {
              eb.startEffect.plants(1, {played}).asterix().colon().megacredits(-3);
            });
          });
        }),
      },
      startingMegaCredits: 42,
    });
  }
}
