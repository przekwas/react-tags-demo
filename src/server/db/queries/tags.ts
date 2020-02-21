import { Query } from '../index';

const all = () =>
	Query<{ id: number; name: string }[]>(`
        SELECT * FROM tags;
    `);

const find = (tag: string) =>
	Query<{ id: number }[]>(
		`
        SELECT id FROM tags 
        WHERE name LIKE ?`,
		[`%${tag}%`]
	);

const insert = (tag: string) =>
	Query<{ insertId: number }>(
		`
		INSERT INTO tags (name) VALUE (?)`,
		[[tag]]
	);

export default {
	all,
	find,
	insert
};
