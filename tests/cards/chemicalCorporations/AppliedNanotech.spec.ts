import {expect} from 'chai';
import {AppliedNanotech} from '../../../src/server/cards/chemicalCorporations/AppliedNanotech';
import {testGame} from '../../TestGame';
import {churnAction} from '../../TestingUtils';

describe('AppliedNanotech', function() {
  it('Should play', function() {
    const card = new AppliedNanotech();
    const [, player] = testGame(2);
    const play = card.play(player);
    expect(play).is.undefined;

    player.setCorporationForTest(card);

    expect(churnAction(card, player)).is.undefined;
    expect(card.resourceCount).to.eq(1);
    player.addResourceTo(card, 4);
    expect(card.getVictoryPoints(player)).to.eq(1);
  });
});
