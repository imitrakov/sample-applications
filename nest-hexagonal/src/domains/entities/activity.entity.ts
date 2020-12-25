import { AccountId } from './account.entity';
import { MoneyEntity } from './money.entity';

export class ActivityEntity {
  constructor(
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _timestamp: Date,
    private readonly _moneyEntity: MoneyEntity,
  ) {}

  public get moneyEntity(): MoneyEntity {
    return this._moneyEntity;
  }
  public get timestamp(): Date {
    return this._timestamp;
  }
  public get targetAccountId(): AccountId {
    return this._targetAccountId;
  }
  public get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }
}
