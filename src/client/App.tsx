import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import All from './pages/All';
import One from './pages/One';
import Compose from './pages/Compose';

const App: React.FC<AppProps> = props => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/" component={All} />
				<Route exact path="/details/:id" component={One} />
				<Route exact path="/compose" component={Compose} />
			</Switch>
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
