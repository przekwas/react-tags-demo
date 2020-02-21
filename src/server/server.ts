import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as morgan from 'morgan';
import routes from './routes';
import './middlewares/localstrategy';
import './middlewares/bearerstrategy';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(routes);
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port: ${port}`));