import express from 'express';
import Joi from 'joi';


class ValidateUser {
  async LoginValidator (req: express.Request, res: express.Response, next: express.NextFunction) {
    const schema = Joi.object().keys({
      password: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
    })
      .with('email', 'password');
  
    try {
      await schema.validateAsync(req.body);
      return next();
    }
    catch (err) {
      return res
        .status(400)
        .json({ status: 'error', message: `${err.details[0].message}` });
    }
  }

}

export default new ValidateUser();