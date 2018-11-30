import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.email
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(User, dataSource);
  }
}
