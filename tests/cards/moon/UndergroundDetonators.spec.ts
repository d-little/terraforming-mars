import {Game} from '../../../src/server/Game';
import {TestPlayer} from '../../TestPlayer';
import {UndergroundDetonators} from '../../../src/server/cards/moon/UndergroundDetonators';
import {expect} from 'chai';
import {MoonExpansion} from '../../../src/server/moon/MoonExpansion';
import {MoonData} from '../../../src/server/moon/MoonData';

describe('UndergroundDetonators', () => {
  let player: TestPlayer;
  let card: UndergroundDetonators;
  let moonData: MoonData;

  beforeEach(() => {
    player = TestPlayer.BLUE.newPlayer();
    const game = Game.newInstance('gameid', [player], player, {moonExpansion: true});
    card = new UndergroundDetonators();
    moonData = MoonExpansion.moonData(game);
  });

  it('can play', () => {
    player.cardsInHand = [card];
    player.megaCredits = card.cost;
    expect(player.getPlayableCardsForTest()).does.include(card);
  });

  it('play', () => {
    player.steel = 0;
    player.titanium = 0;
    moonData.miningRate = 0;
    expect(player.getTerraformRating()).eq(14);

    card.play(player);

    expect(player.titanium).eq(1);
    expect(player.steel).eq(1);
    expect(moonData.miningRate).eq(1);
    expect(player.getTerraformRating()).eq(15);
  });
});

