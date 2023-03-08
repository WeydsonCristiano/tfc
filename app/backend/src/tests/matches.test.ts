import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import * as matches from './mocks/matches.mocks';

chai.use(chaiHttp);

const { expect } = chai;



describe('test matches', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('testa se esta recebendo todos os times corretamente', async () => {
    sinon.stub(Match, 'findAll').resolves(matches.all as any);

    const res = await chai.request(app).get('/matches');

    expect(res).to.have.status(200);
  });

  it('testa se esta recebendo todas as partidas em andamento', async () => {
    sinon.stub(Match, 'findAll').resolves(matches.inProgress as any);

    const res = await chai.request(app).get('/matches?inProgress=true');

    expect(res).to.have.status(200);
  });

  it('testa se esta recebendo todas as partidas em finalizadas', async () => {
    sinon.stub(Match, 'findAll').resolves(matches.finished as any);

    const res = await chai.request(app).get('/matches?inProgress=false');

    expect(res).to.have.status(200);
  });
});

describe('test Err', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('teste err todos os times', async () => {
    sinon.stub(Match, 'findAll').throws();
    const res = await chai.request(app).get('/matches');
    expect(res).to.have.status(500);
  });

  it('teste erro partidas e andamento', async () => {
    sinon.stub(Match, 'findAll').throws();
    const res = await chai.request(app).get('/matches?inProgress=true');
    expect(res).to.have.status(500);
  });

  it('teste erro partidas e finalizadas', async () => {
    sinon.stub(Match, 'findAll').throws();
    const res = await chai.request(app).get('/matches?inProgress=false');
    expect(res).to.have.status(500);
  });
});