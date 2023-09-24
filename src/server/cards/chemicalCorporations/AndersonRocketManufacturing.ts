import {Card} from '../Card';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {ICard} from '../ICard';
import {Resource} from '../../../common/Resource';
import {digit} from '../Options';

export class AndersonRocketManufacturing extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.SPACE],
      name: CardName.ANDERSON_ROCKET_MANUFACTURING,
      startingMegaCredits: 45,

      behavior: {
        stock: {
          steel: 5,
          titanium: 5,
        },
        // TR reduction handled by bespokePlay (for now?)
      },

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 45MC, 5 steel, and 5 titanium. Decrease your TR 2 steps.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(45).steel(5, {digit}).titanium(5, {digit}).br;
          b.minus().tr(2).br;
          b.corpBox('effect', (ce) => {
            ce.effect('after paying for a standard project, except selling patents, you gain 3MC. THIS DOES NOT STACK WITH THE CARD STANDARD TECHNOLOGY.', (eb) => {
              eb.plate('Standard projects').asterix().startEffect.megacredits(3);
            });
          });
        }),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.decreaseTerraformRating(2);
    return undefined;
  }

  public onStandardProject(player: IPlayer, projectType: ICard) {
    if (projectType.name !== CardName.SELL_PATENTS_STANDARD_PROJECT && !player.cardIsInEffect(CardName.STANDARD_TECHNOLOGY)) {
      player.stock.add(Resource.MEGACREDITS, 3, {log: true});
    }
  }
}
