import { Router } from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';
import { tokenCheckpoint } from '../../middlewares/auth-checkpoints';

const router = Router();

router.use(tokenCheckpoint);
router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);

export default router;
