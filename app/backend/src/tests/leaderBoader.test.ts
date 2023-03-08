import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import * as jogos from './mocks/leaderBoar.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('testar leaderBoard , home, away', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('testando retorno lista time lider ', async () => {
    sinon.stub(Match, 'findAll').resolves(jogos.teamLeader as any);

    const res = await chai.request(app).get('/').send();

    expect(res).to.have.status(200);
  });
});