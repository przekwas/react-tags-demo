import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IBlog } from '../utils/interfaces';
import BlogCard from '../components/BlogCard';
import { json } from '../utils/api';

const One: React.FC<OneProps> = props => {
	const [blog, setBlog] = useState<IBlog>({
		id: 0,
		title: '',
		content: '',
		author_id: 0,
		_created: new Date()
	});
	const [blogtags, setBlogtags] = useState<{ id: number; name: string }[]>([]);

	useEffect(() => {
		(async () => {
			try {
				let blog = await json(`/api/blogs/${props.match.params.id}`);
				console.log(blog);
				if (!blog) {
					props.history.push('/');
				} else {
					let blogtags = await json(`/api/blogtags/${props.match.params.id}`);
					setBlog(blog);
					setBlogtags(blogtags);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [props.match.params.id]);

	return (
		<main className="container my-2">
			<section className="row justify-content-center">
				<BlogCard expanded blog={blog} blogtags={blogtags} />
			</section>
		</main>
	);
};

interface OneProps extends RouteComponentProps<{ id: string }> {}

export default One;
