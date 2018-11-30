import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {

  @property({
    type: 'string',
    required: true,		
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_names: string;

  @property({
    type: 'string',
    required: true,
    id: true
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    default: 'user',
  })
  type: string;

  @property({
    type: 'string',
  })
  company?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  company_role?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tag_history?: string[];
  
  constructor(data?: Partial<User>) {
    super(data);
  }
}
