import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
  constructor() {
    log('Created new instance of UsersDao');
  }

  async addUser(user: CreateUserDto) {
    // TODO - implementation
    return 123;
  }

  async getAllUsers() {
    return [{
      _id: 1,
      email: 'emmail@email.com',
      password: '13456'
    },
    {
      _id: 1,
      email: 'emmail@email.com',
      password: '13456'
    }];
  }

  async putUserById(userId: string, user: PutUserDto) {
    return {
      _id: 1,
      email: 'emmail@email.com',
      password: '13456'
    }
  }

  async getUserById(userId: string) {
    return {
      _id: 1,
      email: 'emmail@email.com',
      password: '13456'
    }
  }

  async getUserByEmail(email: string) {
    let currentUser = true
    if (currentUser) {
        return currentUser;
    } else {
        return null;
    }
  }
}

export default new UsersDao();