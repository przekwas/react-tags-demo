import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import db from '../db';
import { comparePasswords } from '../utils/security/passwords';

passport.serializeUser((author, done) => done(null, author));
passport.deserializeUser((author, done) => done(null, author));

passport.use(
	new LocalStrategy.Strategy(
		{
			usernameField: 'email'
		},
		async (email, password, done) => {
			try {
				let [author] = await db.authors.findEmail(email);
				if (author && comparePasswords(password, author.password)) {
					delete author.password;
					done(null, author);
				} else {
					done(null, false);
				}
			} catch (error) {
				console.log(error);
				done(error);
			}
		}
	)
);
