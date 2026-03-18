import UserEntity from '@/module/user/domain/entites/user.entity.js';

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
