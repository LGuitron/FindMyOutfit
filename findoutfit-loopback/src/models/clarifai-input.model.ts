import {Model, model, property} from '@loopback/repository';

@model()
export class ClarifaiInput extends Model {
  @property({
    type: 'string',
    required: true,
  })
  url: string;

  constructor(data?: Partial<ClarifaiInput>) {
    super(data);
  }
}
