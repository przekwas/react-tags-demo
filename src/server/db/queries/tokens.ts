import { Query } from '../index';

const insert = (authorid: number) => Query<{ insertId: number }>(`INSERT INTO tokens (authorid) VALUE (?)`, [[authorid]]);

const update = (token: string, id: number) => Query('UPDATE tokens SET token = ? WHERE id = ?', [token, id]);

const verify = (token: string, id: number) => Query<{}[]>('SELECT * FROM tokens WHERE token = ? AND id = ?', [token, id])

export default {
	insert,
	update,
	verify
};
