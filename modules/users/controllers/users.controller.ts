import express from 'express';
import usersService from '../services/user.services';
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.getAll();
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.getById(req.params.userId);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await usersService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async loginUser(req: express.Request, res: express.Response) {
    res.status(201).send({ id: 13 });
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(
        await usersService.putById(req.params.userId, {
            id: req.params.userId,
            ...req.body,
        })
    );
    res.status(204).send();
  }
}

export default new UsersController();
