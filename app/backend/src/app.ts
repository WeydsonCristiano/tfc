import 'express-async-errors';
import * as express from 'express';
import clientErrorHandler from './middleware/validadeHomeAway';
import loginRouter from './routers/loginRouter';
import matchRouter from './routers/matchRouter';
import teamRouter from './routers/teamRouters';
import leaderRouter from './routers/leaderBoard';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/teams', teamRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/leaderboard', leaderRouter);
    this.app.use(clientErrorHandler);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
