import express from 'express';
import { startReorder } from '.';
import { appConfig } from './config';
const app = express()
const port = 9001

app.get('/', (req: express.Request, res: express.Response) => {
    console.log(req.query.request_token);
    startReorder(req.query.request_token as string);
  res.send('Login success, you can close the browser...')
})

app.listen(port, () => {
  console.log(`Open this url in browser to connect to Zerodha: ${appConfig.kite.loginPath}`);
})