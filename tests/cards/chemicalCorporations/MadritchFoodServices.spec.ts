import {expect} from 'chai';
import {testGame} from '../../TestGame';
import {MadritchFoodServices} from '../../../src/server/cards/chemicalCorporations/MadritchFoodServices';
import {Birds} from '../../../src/server/cards/base/Birds';
import {AdvancedEcosystems} from '../../../src/server/cards/base/AdvancedEcosystems';
import {AdaptedLichen} from '../../../src/server/cards/base/AdaptedLichen';
import {TestPlayer} from '../../TestPlayer';

import {churnPlay} from '../../TestingUtils';
import {Game} from '../../../src/server/Game';
import {EmptyBoard} from '../../ares/EmptyBoard';

describe('MadritchFoodServices', function() {
  let player: TestPlayer;
  let player2: TestPlayer;
  let card: MadritchFoodServices;
  let game: Game;

  beforeEach(function() {
    card = new MadritchFoodServices();
    [game, player, player2] = testGame(2, {aresExtension: true});
    player.setCorporationForTest(card);
    game.board = EmptyBoard.newInstance();
  });

  it('play', function() {
    expect(churnPlay(card, player)).is.undefined;
  });

  it('Grants Discounts', () => {
    expect(card.getCardDiscount(player, new Birds())).to.eq(2);
    expect(card.getCardDiscount(player, new AdaptedLichen())).to.eq(2);
    expect(card.getCardDiscount(player, new AdvancedEcosystems())).to.eq(4);
  });

  it('canAct', () => {
    player.megaCredits = 0;
    player.plants = 0;
    expect(card.canAct(player)).is.false;
    player.plants = 2;
    expect(card.canAct(player)).is.true;
    const action = card.action(player);
    action.cb(2);
    expect(player.plants).eq(0);
    expect(player.megaCredits).eq(6);
  });

  it('Cant choose more than 6 plants', () => {
    player.plants = 10;
    player.megaCredits = 0;
    expect(card.canAct(player)).is.true;
    const action = card.action(player);
    // expect(() => action.cb(10)).to.throw();
    action.cb(10);
    expect(player.plants).eq(10);
    expect(player.megaCredits).eq(0);
  });


  // TODO: max could use a test?
});
