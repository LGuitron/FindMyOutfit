import {Entity, model, property} from '@loopback/repository';

@model()
export class Suggestion extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  store: string;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @property({
    type: 'string',
    required: true,
  })
  url_image: string;

  @property({
    type: 'string',
    required: true,
  })
  url_website: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tags: string[];

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  constructor(data?: Partial<Suggestion>) {
    super(data);
  }
}
