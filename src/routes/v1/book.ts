import { Router } from 'express';
import { privateRoute } from '../../utils/auth';
import getBookList from '../../controllers/book/getBookList';
import getBookDetails from '../../controllers/book/getBookDetails';
import addNewBook from '../../controllers/book/addNewBook';

const bookRouter = Router();

bookRouter.get('', getBookList);
bookRouter.get('/:bookUniqueId', getBookDetails);
bookRouter.post('', privateRoute, addNewBook);

export default bookRouter;
