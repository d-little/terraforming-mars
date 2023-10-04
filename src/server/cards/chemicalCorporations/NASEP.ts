import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';
import {Card} from '../Card';
import {LogHelper} from '../../LogHelper';
import {IPlayer} from '../../IPlayer';


export class NASEP extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [Tag.JOVIAN, Tag.EARTH],
      name: CardName.NASEP,
      startingMegaCredits: 55,
      initialActionText: 'Draw 2 cards with a base cost of 20MC or more.',

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 55MC. As your first action draw 2 cards with a base cost of 20MC or more.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(55).cards(2, {secondaryTag: AltSecondaryTag.MEGACREDITS}).asterix();
          b.br;
          b.corpBox('effect', (ce) => {
            ce.effect('if you have 8 or more cards in your hand at the beginning of the research phase, cards fost 4MC to buy into your hand. If you have 7 or fewer, cards cost 2MC, including the opening phase.', (eb) => {
              eb.cards(1).asterix().startEffect.megacredits(4).slash().megacredits(2);
            });
          });
        }),
      },
    });

  }

  public initialAction(player: IPlayer) {
    const discardedCards = new Set<CardName>();
    let count = 0;
    while (count < 2) {
      const card = player.game.projectDeck.draw(player.game);
      if (card.cost < 20) {
        player.game.projectDeck.discard(card);
        discardedCards.add(card.name);
      } else {
        count += 1;
        LogHelper.logDrawnCards(player, [card]);
      }
    }
    LogHelper.logDiscardedCards(player.game, Array.from(discardedCards));
    return undefined;
  }

  override get cardCost(): number {
    // player with NASEP
    return (??? > 7) ? 4 : 2;
  }
}
