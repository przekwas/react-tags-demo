import { Query } from '../index';

const all = () =>
	Query<{}[]>(`
        SELECT * FROM blogs;
    `);

const one = (id: string) =>
	Query<{}[]>(
		`
        SELECT * FROM blogs WHERE id = ?;
    `,
		[id]
	);

const insert = (title: string, content: string, author_id: string) =>
	Query<{ insertId: number }>(
		`
        INSERT INTO blogs (title, content, author_id) VALUE (?);
    `,
		[title, content, author_id]
	);

const destroy = (blogid: string) => Query(`DELETE FROM blogs WHERE id = ?`, [blogid]);

export default {
	all,
	one,
	insert,
	destroy
};
