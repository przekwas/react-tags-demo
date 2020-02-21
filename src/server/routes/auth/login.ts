import { Router, Request } from 'express';
import * as passport from 'passport';
import { createToken } from '../../utils/security/tokens';

const router = Router();

router.post('/', passport.authenticate('local'), async (req: Req, res) => {
	try {
		let token = await createToken({ authorid: req.user.id });
		res.json({
			token,
			authorid: req.user.id,
			role: req.user.role
		});
	} catch (error) {
		console.log(error);
		res.status(500).json('My code sucks.');
	}
});

interface Req extends Request {
	user: {
		id: number;
		role: string;
	};
}

export default router;
