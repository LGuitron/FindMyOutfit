import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Suggestion} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SuggestionRepository extends DefaultCrudRepository<
  Suggestion,
  typeof Suggestion.prototype.id
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Suggestion, dataSource);
  }
}
