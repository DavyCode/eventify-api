import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import ValidateUser from './validation/validate.users';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  /**
   * Execute default abstract class from parent
   */
  configureRoutes() {
    this.app.route(`/users`)
      .post(
        UsersController.createUser
      );

    this.app.route(`/users/login`)
      .post(
        ValidateUser.LoginValidator,
        UsersController.loginUser
      );

    this.app.route(`/users/:userId`)
      .all(UsersMiddleware.validateUserExists)
      .get()
      .put()

    return this.app;
  }
}
