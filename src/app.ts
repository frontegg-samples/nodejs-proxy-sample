import 'dotenv/config';
import express from 'express';
import configExpress from './config/express';
import { FronteggContext } from '@frontegg/client';

async function bootstrap() {
  const app = express();

  FronteggContext.init({
    FRONTEGG_API_KEY: <string>process.env.FRONTEGG_API_KEY,
    FRONTEGG_CLIENT_ID: <string>process.env.FRONTEGG_CLIENT_ID,
  });

  configExpress(app);

  app.listen(3000, () => {
    console.log(`Server is up and running. Listening on http://localhost:3000`);
  });
}

bootstrap();
