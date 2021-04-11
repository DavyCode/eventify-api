import { CommonRoutesConfig } from '../common/common.routes.config'
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  /**
   * Execute default abstract class from parent
   */
  configureRoutes() {
    this.app.route(`/users`)
      .post((req: express.Request, res: express.Response) => { // TODO - Handle User creation
        res.status(200).send(`Post to users`);
      });

    this.app.route(`/users/:userId`)
      .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        // middleware function runs prior to any request to the resource /users/:userId
        // for now it simply passes control to the next applicable function below using next()
        next();
      })
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`Put requested for id ${req.params.userId}`);
      })

    return this.app;
  }
}
