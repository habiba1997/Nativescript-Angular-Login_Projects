import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { LoginUsersDbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export type Credentials = {
  email: string;
  password: string;
};
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._id,
  UserRelations
  > {
  constructor(
    @inject('datasources.loginUsersDB') dataSource: LoginUsersDbDataSource,
  ) {
    super(User, dataSource);
  }
}
