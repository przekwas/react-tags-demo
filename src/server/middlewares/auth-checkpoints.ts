import { RequestHandler, Request } from 'express';
import * as passport from 'passport';

export const tokenCheckpoint: RequestHandler = (req, res, next) => {
	return passport.authenticate('bearer', (err, author) => {
        if (author) {
            req.user = author;
        }
        return next();
    })(req, res, next);
};
export const isGuest: RequestHandler = (req: Req, res, next) => {
	if (!req.user || req.user.role !== 'guest') {
		res.sendStatus(401);
	} else {
		next();
	}
};

interface Req extends Request {
	user: {
		role: string;
	};
}
