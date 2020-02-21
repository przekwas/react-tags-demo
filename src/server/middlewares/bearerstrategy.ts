import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';
import db from '../db';
import { validateToken } from '../utils/security/tokens';

passport.use(
	new BearerStrategy.Strategy(async (token, done) => {
		try {
			let payload: any = await validateToken(token);
			let [author] = await db.authors.findId(payload.authorid);
			if (author) {
				delete author.password;
				done(null, author);
			} else {
                done(null, false);
			}
		} catch (error) {
			console.log(error);
			done(error);
		}
	})
);
