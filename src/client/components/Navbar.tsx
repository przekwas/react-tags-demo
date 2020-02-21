import React from 'react';
import { NavLink } from 'react-router-dom';

const All: React.FC<AllProps> = props => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<span className="navbar-brand">Navbar</span>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLol" aria-controls="navbarLol" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarLol">
				<div className="navbar-nav">
					<NavLink exact to="/" className="nav-item nav-link" activeClassName="nav-item nav-link active">
						Blogs
					</NavLink>
					<NavLink exact to="/compose" className="nav-item nav-link" activeClassName="nav-item nav-link active">
						Compose
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

interface AllProps {}

export default All;
