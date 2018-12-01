import {Model, model, property} from '@loopback/repository';

@model()
export class LoginInfo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<LoginInfo>) {
    super(data);
  }
}
