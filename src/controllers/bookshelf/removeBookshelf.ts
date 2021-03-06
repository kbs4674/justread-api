import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Bookshelf from '../../entities/bookshelf';
import User from '../../entities/user';
import { UnauthorizedError, InvalidParamError, NotFoundError } from '../../libs/customErrors';

interface RemoveBookshelfRequest extends Request {
  body: {
    bookshelfId: string;
  };
}

const removeBookshelf = async (
  req: RemoveBookshelfRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('인증 정보가 없습니다.');
    }

    const { id: userId } = req.user as User;
    const {
      body: { bookshelfId },
    } = req;

    if (!bookshelfId) {
      throw new InvalidParamError('필요한 정보가 존재하지 않습니다.');
    }

    const parsedBookshelfId = parseInt(bookshelfId, 10);

    const bookshelf = await getRepository(Bookshelf).findOne({
      id: parsedBookshelfId,
      userId,
    });

    if (!bookshelf) {
      throw new NotFoundError();
    }

    await getRepository(Bookshelf).delete({ id: bookshelf.id });

    res.status(200).json({
      success: true,
      message: null,
      result: {
        removedBookshelf: bookshelf,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default removeBookshelf;
