import {expect} from 'chai';
import {testGame} from '../../TestGame';
import {AstroBiotics} from '../../../src/server/cards/chemicalCorporations/AstroBiotics';
import {TestPlayer} from '../../TestPlayer';

import {Ants} from '../../../src/server/cards/base/Ants';
import {Trees} from '../../../src/server/cards/base/Trees';

describe('AstroBiotics', function() {
  let player: TestPlayer;
  let card: AstroBiotics;

  beforeEach(function() {
    card = new AstroBiotics();
    [, player] = testGame(1);
    player.setCorporationForTest(card);
  });

  it('Does not get card discount for other tags', function() {
    expect(card.getCardDiscount(player, new Ants())).to.eq(0);
  });

  it('Gets card discount for plant tags', function() {
    expect(card.getCardDiscount(player, new Trees())).to.eq(3);
  });

  // TODO: Test Standard Greenery Project

});
