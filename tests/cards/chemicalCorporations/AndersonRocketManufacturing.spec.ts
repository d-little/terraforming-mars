import {expect} from 'chai';
import {testGame} from '../../TestGame';
import {AndersonRocketManufacturing} from '../../../src/server/cards/chemicalCorporations/AndersonRocketManufacturing';
import {TestPlayer} from '../../TestPlayer';

import {AsteroidStandardProject} from '../../../src/server/cards/base/standardProjects/AsteroidStandardProject';
import {SellPatentsStandardProject} from '../../../src/server/cards/base/standardProjects/SellPatentsStandardProject';
import {StandardTechnology} from '../../../src/server/cards/base/StandardTechnology';
import {cast, churnPlay, runAllActions} from '../../TestingUtils';
import {SelectPayment} from '../../../src/server/inputs/SelectPayment';
import {Payment} from '../../../src/common/inputs/Payment';
import {Game} from '../../../src/server/Game';


describe('AndersonRocketManufacturing', function() {
  let player: TestPlayer;
  let card: AndersonRocketManufacturing;
  let game: Game;

  beforeEach(function() {
    card = new AndersonRocketManufacturing();
    [game, player] = testGame(1);
    player.setCorporationForTest(card);
  });

  it('play', function() {
    expect(churnPlay(card, player)).is.undefined;
  });

  it('Rebate for asteroid standard project', () => {
    const asteroid = new AsteroidStandardProject();
    player.megaCredits = 0;
    expect(asteroid.canAct(player)).is.false;

    player.megaCredits = 14;
    expect(asteroid.canAct(player)).is.true;

    expect(game.getTemperature()).eq(-30);
    const playerInput = asteroid.action(player);
    expect(playerInput).is.undefined;
    runAllActions(game);
    expect(game.getTemperature()).eq(-28);
    expect(player.megaCredits).eq(3);
  });

  it('No rebate for selling cards', function() {
    card.onStandardProject(player, new SellPatentsStandardProject());
    expect(player.megaCredits).to.eq(0);
  });

  it('No double-rebate if Standard Technologies is in play', function() {
    const stdtech = new StandardTechnology();
    player.playedCards.push(stdtech);

    const asteroid = new AsteroidStandardProject();
    player.megaCredits = 0;
    expect(asteroid.canAct(player)).is.false;

    player.megaCredits = 14;
    expect(asteroid.canAct(player)).is.true;

    expect(game.getTemperature()).eq(-30);
    const playerInput = asteroid.action(player);
    expect(playerInput).is.undefined;
    runAllActions(game);
    expect(game.getTemperature()).eq(-28);
    expect(player.megaCredits).eq(3);
  });

});
