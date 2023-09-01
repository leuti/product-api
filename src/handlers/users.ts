import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User, UserStore } from '../models/users';
import verifyAuthToken, { convertKeysToCamelCase } from '../services/utils';

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/authenticate', authenticate);
};

const store = new UserStore();

// List all users in database
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    const usersCamelCase = convertKeysToCamelCase(users);
    res.json(usersCamelCase);
  } catch (err: any) {
    res.status(400).json({ error: err.message }); // Return error message as JSON
  }
};

// List details for specific user
const show = async (_req: Request, res: Response) => {
  try {
    const user = await store.show(_req.params.id);
    const userCamelCase = convertKeysToCamelCase(user);
    res.json(userCamelCase);
  } catch (err: any) {
    res.status(400).json({ error: err.message }); // Return error message as JSON
  }
};

// Create new user
const create = async (req: Request, res: Response) => {
  const user: User = {
    login: req.body.login,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    passwordHash: req.body.password,
  };

  try {
    const newUser = await store.create(user);
    console.log(`newUser: ${JSON.stringify(newUser)}`);
    try {
      var token = jwt.sign(
        {
          id: newUser.id,
          login: newUser.login,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
        },
        process.env.TOKEN_SECRET as string
      );
      res.json(token);
    } catch (jwtError) {
      console.error('Error signing the JWT', jwtError);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message }); // Return error message as JSON
  }
};

// Delete given user
const destroy = async (_req: Request, res: Response) => {
  const authorisationHeader = _req.headers.authorization;
  const token = authorisationHeader?.split(' ')[1];

  try {
    const deleted = await store.delete(_req.params.id, token ?? '');
    res.json(deleted);
  } catch (err: any) {
    res.status(400).json({ error: err.message }); // Return error message as JSON
  }
};

// Authenticate user
const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    login: _req.body.login,
    first_name: _req.body.firstName,
    last_name: _req.body.lastName,
    passwordHash: _req.body.password,
  };
  try {
    const u = await store.authenticate(user.login, user.passwordHash);
    console.log(`Authenticated user: ${JSON.stringify(u)}`);

    if (u === null) {
      throw new Error('Authentication failed');
    }
    try {
      var token = jwt.sign(
        {
          id: u.id,
          login: u.login,
          firstName: u.first_name,
          lastName: u.last_name,
        },
        process.env.TOKEN_SECRET as string
      );
      console.log(`Authentication successful: u = ${JSON.stringify(u)}`);
      res.json(token);
    } catch (jwtError) {
      console.error('Error signing the JWT', jwtError);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (err: any) {
    console.log(`Authentication failed`);
    res.status(401).json({ error: err.message }); // Return error message as JSON
  }
};

export default userRoutes;
