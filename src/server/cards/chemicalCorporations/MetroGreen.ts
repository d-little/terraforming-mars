import {ICorporationCard} from '../corporation/ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {digit, all} from '../Options';
import {IPlayer} from '../../IPlayer';
import {Space} from '../../boards/Space';
import {Resource} from '../../../common/Resource';
import {GainResources} from '../../deferredActions/GainResources';
import {TileType} from '../../../common/TileType';

export class MetroGreen extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      tags: [],
      name: CardName.METRO_GREEN,
      startingMegaCredits: 36,

      behavior: {
        stock: {steel: 8},
      },

      metadata: {
        cardNumber: 'CHEM??',
        description: 'Start with 36MC and 8 steel.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(36).steel(8, {digit});
          b.br;
          b.effect('Whenever a city is played, gain a plant.', (eb) => {
            eb.city({all}).startEffect.plants(1).nbsp;
          });
          b.br;
          b.effect('When you place a city tile, greenery tiles grant an adjacency bonus of 1 plant.', (eb) => {
            eb.city().greenery({any: true}).startEffect.plants(1).asterix();
          });
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space) {
    if (space.tile?.tileType === TileType.CITY) {
      // Deal with "whenever a city is played, gain a plant"
      let metroGreenPlants = 1;

      // Deal with 'When you place a city tile, greenery tiles grant an adjacency bonus of 1 plant.'
      if (cardOwner.id === activePlayer.id) {
        metroGreenPlants += cardOwner.game.board.getAdjacentSpaces(space)
          .filter((adjacentSpace) => adjacentSpace.tile?.tileType === TileType.GREENERY)
          .length;
      }
      cardOwner.game.defer(new GainResources(cardOwner, Resource.PLANTS, {count: metroGreenPlants}));
    }
    return;
  }

  public override bespokePlay(player: IPlayer) {
    if (player.game.isSoloMode()) {
      // Get bonus for 2 neutral cities
      player.stock.add(Resource.PLANTS, 2, {log: true});
    }
    return undefined;
  }
}
