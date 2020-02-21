import { Query } from '../index';

const findEmail = (email: string) => Query<{ password: string }[]>(`SELECT * FROM authors WHERE email = ?`, [email]);

const findId = (id: number) => Query<{ password: string }[]>('SELECT * FROM authors WHERE id = ?', [id]);

export default {
	findEmail,
	findId
};
