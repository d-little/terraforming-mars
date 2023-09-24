import {expect} from 'chai';
import {testGame} from '../../TestGame';
import {AdamasCorporation} from '../../../src/server/cards/chemicalCorporations/AdamasCorporation';
import {TestPlayer} from '../../TestPlayer';

import {churnPlay, runAllActions} from '../../TestingUtils';
import {Game} from '../../../src/server/Game';
import {TileType} from '../../../src/common/TileType';
import {SpaceBonus} from '../../../src/common/boards/SpaceBonus';
import {EmptyBoard} from '../../ares/EmptyBoard';


describe('AdamasCorporation', function() {
  let player: TestPlayer;
  let player2: TestPlayer;
  let card: AdamasCorporation;
  let game: Game;

  beforeEach(function() {
    card = new AdamasCorporation();
    [game, player, player2] = testGame(2, {aresExtension: true});
    player.setCorporationForTest(card);
    game.board = EmptyBoard.newInstance();
  });

  it('play', function() {
    expect(churnPlay(card, player)).is.undefined;
  });

  it('Works with Space Bonuses', () => {
    // tile types in this test are irrelevant.
    // What's key is that this space has a weird behavior - it grants all the bonuses.

    expect(player.titanium).eq(0);
    expect(player.cardsInHand).is.length(0);

    const space = game.board.getAvailableSpacesOnLand(player)[0];
    space.bonus = [
      SpaceBonus.TITANIUM,
    ],
    // player.playedCards = [card];
    game.addTile(player, space, {tileType: TileType.RESTRICTED_AREA});
    runAllActions(game);
    expect(player.titanium).eq(1);
    expect(player.cardsInHand).is.length(0);

    const spaceEmpty = game.board.getAvailableSpacesOnLand(player)[1];
    space.bonus = [],
    game.addTile(player, spaceEmpty, {tileType: TileType.RESTRICTED_AREA});
    runAllActions(game);
    expect(player.cardsInHand).is.length(1);
  });

  it('Dont draw when an opponent places tiles', () => {
    // tile types in this test are irrelevant.
    // What's key is that this space has a weird behavior - it grants all the bonuses.

    expect(player.titanium).eq(0);
    expect(player.cardsInHand).is.length(0);
    expect(player2.titanium).eq(0);
    expect(player2.cardsInHand).is.length(0);

    const space = game.board.getAvailableSpacesOnLand(player2)[0];
    space.bonus = [
      SpaceBonus.TITANIUM,
    ],
    game.addTile(player2, space, {tileType: TileType.RESTRICTED_AREA});
    runAllActions(game);
    expect(player.titanium).eq(0);
    expect(player.cardsInHand).has.length(0);
    expect(player2.titanium).eq(1);
    expect(player2.cardsInHand).has.length(0);

    const spaceEmpty = game.board.getAvailableSpacesOnLand(player2)[1];
    space.bonus = [],
    game.addTile(player2, spaceEmpty, {tileType: TileType.RESTRICTED_AREA});
    runAllActions(game);
    expect(player.cardsInHand).has.length(0);
    expect(player2.cardsInHand).has.length(0);
  });
});
