import {Message} from '../../common/logs/Message';
import {BasePlayerInput, PlayerInput} from '../PlayerInput';
import {isPayment, Payment, PaymentOptions} from '../../common/inputs/Payment';
import {InputResponse, isSelectPaymentResponse} from '../../common/inputs/InputResponse';
import {IPlayer} from '../IPlayer';
import {SelectPaymentModel} from '../../common/models/PlayerInputModel';

export class SelectPayment extends BasePlayerInput {
  constructor(
    title: string | Message,
    public amount: number,
    public paymentOptions: Partial<PaymentOptions>,
    public cb: (payment: Payment) => PlayerInput | undefined,
  ) {
    super('payment', title);
    this.buttonLabel = 'Pay'; // no input button
  }

  public toModel(player: IPlayer): SelectPaymentModel {
    return {
      title: this.title,
      buttonLabel: this.buttonLabel,
      type: 'payment',
      amount: this.amount,
      paymentOptions: {
        // TODO(kberg): These are set both here and in Player. Consolidate, perhaps.
        heat: player.canUseHeatAsMegaCredits,
        lunaTradeFederationTitanium: player.canUseTitaniumAsMegacredits,
        ...this.paymentOptions,
      },
      seeds: player.getSpendableSeedResources(),
      auroraiData: player.getSpendableData(),
      kuiperAsteroids: player.getSpendableKuiperAsteroids(),
      spireScience: player.getSpendableSpireScienceResources(),
    };
  }

  public process(input: InputResponse, player: IPlayer) {
    if (!isSelectPaymentResponse(input)) {
      throw new Error('Not a valid SelectPaymentResponse');
    }
    const payment = input.payment;
    if (!isPayment(payment)) {
      throw new Error('payment is not a valid type');
    }
    // TODO(kberg): This is called here and in SelectPaymentDeferred.
    // There's no reason for both.
    if (!player.canSpend(payment)) {
      throw new Error('You do not have that many resources');
    }
    if (!player.canSpend(payment)) {
      throw new Error('You do not have that many resources to spend');
    }
    const amountPaid = player.payingAmount(payment, this.paymentOptions);
    if (amountPaid < this.amount) {
      throw new Error('Did not spend enough');
    }
    return this.cb(input.payment);
  }
}
