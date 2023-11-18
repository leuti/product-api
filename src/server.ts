// import external modules
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import internal modules
import categoryRoutes from './handlers/categories';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';
import routes from './routes/index'; // routes for the images

const app: express.Application = express();
// const address: string = 'Shopping-api-env.eba-8rhccdks.eu-central-1.elasticbeanstalk.com';
//const address: string = '0.0.0.0:3000';
// const port: string = '3000';

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/img', routes);

app.get('/', function (req: Request, res: Response) {
  res.send(
    'PROD ENV ----- Welcome to the product shop! Deployment via circleCI working!'
  );
});

categoryRoutes(app);
userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(port, function () {
  console.log(`starting app on ${port}`);
});

export default app;
