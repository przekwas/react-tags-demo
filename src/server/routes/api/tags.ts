import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const tags = await db.tags.all();
		res.json(tags);
	} catch (error) {
		console.log(error);
		res.json('Derp');
	}
});

export default router;
