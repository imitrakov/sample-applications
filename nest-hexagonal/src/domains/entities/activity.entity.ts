import { AccountId } from './account.entity';
import { MoneyEntity } from './money.entity';

export type ActivityId = number | null;

export class ActivityEntity {
  constructor(
    private readonly _ownerAccountId: AccountId,
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _timestamp: Date,
    private readonly _money: MoneyEntity,
    private readonly _id?: ActivityId,
  ) {}

  public get ownerAccountId(): AccountId {
    return this._ownerAccountId;
  }

  public get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  public get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  public get timestamp(): Date {
    return this._timestamp;
  }

  public get money(): MoneyEntity {
    return this._money;
  }

  public get id(): ActivityId {
    return this._id;
  }
}
