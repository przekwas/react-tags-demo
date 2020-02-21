import { Query } from '../index';

const getForBlog = (blogid: string) =>
	Query<{}[]>(
		`
		SELECT tags.id, tags.name FROM blogtags
		JOIN tags ON tags.id = blogtags.tagid
		WHERE blogid = ?
	`,
		[blogid]
	);

const insert = (values: any) =>
	Query(
		`
		INSERT INTO blogtags (blogid, tagid) VALUES ?`,
		[[...values]]
	);

const destroyForBlog = (blogid: string) => Query(`DELETE FROM blogtags WHERE blogid = ?`, [blogid]);

export default {
	getForBlog,
	destroyForBlog,
	insert
};
