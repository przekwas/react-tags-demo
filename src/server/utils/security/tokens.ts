import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import db from '../../db';
import config from '../../config';

export const createToken = async (payload: IPayload) => {
	try {
		let { insertId } = await db.tokens.insert(payload.authorid);
		payload.tokenid = insertId;
		payload.unique = crypto.randomBytes(32).toString('hex');
		let token = await jwt.sign(payload, config.secret);
		await db.tokens.update(token, payload.tokenid);
		return token;
	} catch (error) {
		console.log(error);
	}
};

export const validateToken = async (token: string) => {
	try {
		let payload = <IPayload>jwt.verify(token, config.secret);
		let [foundToken] = await db.tokens.verify(token, payload.tokenid);
		if (foundToken) {
			return foundToken;
		} else {
			return new Error('Invalid Token!');
		}
	} catch (error) {
		console.log(error);
		return new Error('Invalid Token!');
	}
};

interface IPayload {
	authorid: number;
	tokenid?: number;
	unique?: string;
}
