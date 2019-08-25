import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './login-users-db.datasource.json';

export class LoginUsersDbDataSource extends juggler.DataSource {
  static dataSourceName = 'loginUsersDB';

  constructor(
    @inject('datasources.config.loginUsersDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
