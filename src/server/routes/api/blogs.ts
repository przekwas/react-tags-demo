import { Router } from 'express';
import db from '../../db';
import { isGuest } from '../../middlewares/auth-checkpoints';

const router = Router();

router.get('/:id?', async (req, res) => {
	const id = req.params.id;
	try {
		if (id) {
			const [blog] = await db.blogs.one(id);
			res.json(blog);
		} else {
			const blogs = await db.blogs.all();
			res.json(blogs);
		}
	} catch (error) {
		console.log(error);
		res.json('Derp');
	}
});

router.post('/', async (req, res) => {
	try {
		//inserts blog post no problemo
		const { insertId: blogid } = await db.blogs.insert(req.body.title, req.body.content, req.body.author);
		if (req.body.tags.length === 0) {
			//no tags, so send newly created blogid
			res.json(blogid);
		} else {
			const tagids = await Promise.all(
				req.body.tags.map(async (tag: string) => {
					const [foundTag] = await db.tags.find(tag);
					if (foundTag !== undefined) {
						return foundTag.id;
					} else {
						const { insertId } = await db.tags.insert(tag);
						return insertId;
					}
				})
			);
			const blogTagsInserts = tagids.map(tagid => [blogid, tagid]);
			await db.blogtags.insert(blogTagsInserts);
			res.json(blogid);
		}
	} catch (error) {
		console.log(error);
		res.json('Derp');
	}
});

router.delete('/:id', isGuest, async (req, res) => {
	const id = req.params.id;
	try {
		await db.blogtags.destroyForBlog(id);
		await db.blogs.destroy(id);
		res.json(`Blog ${id} and Blogtags Destroyed.`);
	} catch (error) {
		console.log(error);
	}
});

export default router;
