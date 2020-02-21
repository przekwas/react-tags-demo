import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
	return new Promise<T>((resolve, reject) => {
		pool.query(query, values, (err, results) => {
			if (err) reject(err);
			resolve(results);
		});
	});
};

import blogs from './queries/blogs';
import tags from './queries/tags';
import blogtags from './queries/blogtags';
import authors from './queries/authors';
import tokens from './queries/tokens';

export default {
	blogs,
	tags,
	blogtags,
	authors,
	tokens
};
