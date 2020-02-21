import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/:id?', async (req, res) => {
	try {
		const blogtags = await db.blogtags.getForBlog(req.params.id);
		res.json(blogtags);
	} catch (error) {
		console.log(error);
		res.json('Derp');
	}
});

export default router;
