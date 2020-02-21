import React from 'react';
import { useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json } from '../utils/api';

const Compose: React.FC<ComposeProps> = props => {
	const [title, setTitle] = useState<string>('');
	const [author, setAuthor] = useState<string>('1');
	const [content, setContent] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);

	const inputRef = useRef<HTMLInputElement>();

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			let blogid = await json('/api/blogs', 'POST', { title, author, content, tags });
			props.history.push(`/details/${blogid}`);
		} catch (error) {
			console.log(error);
		}
	};

	const inputKeyDown = (e: any) => {
		const newTag = e.target.value.trim();
		if (e.key === 'Enter' && newTag) {
			e.preventDefault();
			if (tags.find(tag => tag.toLowerCase() === newTag.toLowerCase())) {
				return;
			}
			setTags(prevTags => [...prevTags, newTag]);
			inputRef.current.value = null;
		} else if (e.key === 'Backspace' && !newTag) {
			removeTag(tags.length - 1);
		}
	};

	const removeTag = (i: number) => {
		const newTags = [...tags];
		newTags.splice(i, 1);
		setTags(newTags);
	};

	return (
		<main className="container my-2">
			<section className="row justify-content-center">
				<div className="col-md-11">
					<form className="form-group p-3 border shadow-lg">
						<label>Title</label>
						<input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control my-1 shadow-sm" />
						<label>Content</label>
						<textarea value={content} onChange={e => setContent(e.target.value)} rows={10} className="form-control my-1 shadow-sm" />
						<label>Tags</label>
						<div className="shadow-sm d-flex flex-wrap justify-content-start my-1 p-1" style={{ border: '1px solid #ced4da', borderRadius: '0.25rem' }}>
							{tags.map((tag, i) => (
								<div className="d-flex align-items-center justify-content-between bg-primary border border-dark rounded m-1" key={`tag-${tag}`}>
									<span className="text-white pl-2 pr-2">{tag}</span>
									<button onClick={() => removeTag(i)} type="button" className="btn btn-sm btn-primary px-1" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
							))}
							<input onKeyDown={inputKeyDown} type="text" ref={inputRef} className="flex-grow-1 p-1 border rounded" />
						</div>
						<button onClick={handleSubmit} className="btn btn-primary btn-block w-75 mx-auto mt-3 shadow">
							Submit
						</button>
					</form>
				</div>
			</section>
		</main>
	);
};

interface ComposeProps extends RouteComponentProps {}

export default Compose;
