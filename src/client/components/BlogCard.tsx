import React from 'react';
import { IBlog } from '../utils/interfaces';
import { Link } from 'react-router-dom';

const BlogCard: React.FC<BlogCardProps> = props => {
	let colSize, blogText, linkPath, linkText;

	if (props.expanded) {
		colSize = 'col-md-12';
		blogText = props.blog.content.split('\n').map((para, i) => (
			<span key={i}>
				{para}
				<br />
			</span>
		));
		linkPath = '/';
		linkText = 'Go Back';
	} else {
		colSize = 'col-md-6';
		blogText = `${props.blog.content.substring(0, 150)} ...`;
		linkPath = `/details/${props.blog.id}`;
		linkText = 'Read More';
	}

	return (
		<div className={colSize}>
			<article className="card shadow my-2">
				<div className="card-body text-center">
					<h4 className="card-title">{props.blog.title}</h4>
					<div className="d-flex justify-content-center align-items-center mb-3">
						{props.blogtags &&
							props.blogtags.map(blogtag => (
								<span className="p-1 mx-2 badge badge-secondary shadow-sm" key={`blogtag-${blogtag.id}`}>
									{blogtag.name}
								</span>
							))}
					</div>
					<p className="card-text text-justify">{blogText}</p>
					<Link to={linkPath} className="btn btn-secondary btn-block mx-auto w-75 shadow mt-3">
						{linkText}
					</Link>
				</div>
			</article>
		</div>
	);
};

interface BlogCardProps {
	blog: IBlog;
	expanded?: boolean;
	blogtags?: { id: number; name: string }[];
}

export default BlogCard;
