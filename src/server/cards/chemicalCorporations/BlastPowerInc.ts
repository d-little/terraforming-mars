import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {IActionCard} from '../ICard';
import {IPlayer} from '../../IPlayer';
import {SelectPaymentDeferred} from '../../deferredActions/SelectPaymentDeferred';
import {Resource} from '../../../common/Resource';


export class BlastPowerInc extends Card implements IActionCard, ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.BUILDING],
      name: CardName.BLAST_POWER_INC,
      startingMegaCredits: 30,

      behavior: {
        production: {steel: 1},
      },

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 30MC and 1 steel production.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(30).production((pb) => {
            pb.steel(1);
          });
          b.br;
          b.action('spend 8MC to raise your steel production 1 step (steel my be used).', (eb) => {
            eb.megacredits(8).openBrackets.steel(1).closeBrackets.startAction.production((pb) => {
              pb.steel(1);
            });
          });
          b.br;
          b.effect('during the production phase, gain 1 heat for each steel production you have.', (eb) => {
            eb.production((pb) => {
              pb.steel(1);
            }).startEffect.heat(1);
          });
        }),
      },
    });
  }
  public canAct(player: IPlayer): boolean {
    return player.canAfford({cost: 8, steel: true});
  }

  public action(player: IPlayer) {
    player.game.defer(new SelectPaymentDeferred(player, 8, {canUseSteel: true, title: 'Select how to pay for action', afterPay: () => {
      player.production.add(Resource.STEEL, 1, {log: true});
    }}));
    return undefined;
  }

  public onProductionPhase(player: IPlayer) {
    if (player.production.steel > 0) {
      player.stock.add(Resource.HEAT, player.production.steel, {log: true});
    }
    return undefined;
  }
}
