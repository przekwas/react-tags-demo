import React from 'react';
import { useState, useEffect } from 'react';
import { IBlog } from '../utils/interfaces';
import { json } from '../utils/api';
import BlogCard from '../components/BlogCard';

const All: React.FC<AllProps> = props => {
	const [blogs, setBlogs] = useState<IBlog[]>([]);

	useEffect(() => {
		(async () => {
			try {
				let blogs = await json('/api/blogs');
				setBlogs(blogs);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<main className="container my-2">
			<section className="row justify-content-center">
				{blogs.map(blog => (
					<BlogCard key={blog.id} blog={blog} />
				))}
			</section>
		</main>
	);
};

interface AllProps {}

export default All;
