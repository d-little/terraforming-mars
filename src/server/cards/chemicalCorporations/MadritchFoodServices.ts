import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Size} from '../../..//common/cards/render/Size';
import {played, multiplier} from '../Options';
import {IPlayer} from '../../IPlayer';
import {Resource} from '../../../common/Resource';
import {SelectAmount} from '../../inputs/SelectAmount';

export class MadritchFoodServices extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.PLANT, Tag.BUILDING],
      name: CardName.MADRITCH_FOOD_SERVICES,
      startingMegaCredits: 40,

      behavior: {
        production: {megacredits: 1},
      },

      cardDiscount: [
        {tag: Tag.PLANT, amount: 2},
        {tag: Tag.ANIMAL, amount: 2},
      ],

      metadata: {
        cardNumber: 'CHEM??',
        description: 'You start with 40MC and MC production',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(40).production((pb) => {
            pb.megacredits(1);
          });
          b.br.br;
          b.effect('when you play a plant or animal tag, you pay 2MC less for it', (eb) => {
            eb.plants(1, {played}).slash().animals(1, {played}).startEffect.megacredits(-2);
          }).br;
          b.action('spend up to 6 plants to gain 3 times the amount of MC.', (eb) => {
            eb.text('X').plants(1).startAction.megacredits(3, {multiplier}).asterix().nbsp.text('max 6', Size.TINY);
          });
        }),
      },
    });
  }

  public canAct(player: IPlayer): boolean {
    return player.plants > 0;
  }

  public action(player: IPlayer) {
    const min = 1;
    const max = Math.min(player.plants, 6);
    return new SelectAmount(
      'Select amount of plants to spend',
      'Spend plants',
      (amount: number) => {
        player.stock.deduct(Resource.PLANTS, amount);
        player.stock.add(Resource.MEGACREDITS, amount*3, {log: true});
        return undefined;
      },
      min,
      max,
    );
  }
}
