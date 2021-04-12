import express from 'express';
import userService from '../services/user.services';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION_MINUTES } from '../../../config/env';


const log: debug.IDebugger = debug('app:users-controller');

class UsersMiddleware {
  async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.getById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({
        error: `User ${req.params.userId} not found`,
      });
    }
  }

  async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }

  async generateToken(user) {
    const token = await jwt.sign(
      {
        id: user.id,
        role: user.role,
        userId: user.userId,
        iat: Date.now(),
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION_MINUTES }, // '1hr'
      { algorithm: 'HS512' },
    );
    return token;
  },
}

export default new UsersMiddleware();
