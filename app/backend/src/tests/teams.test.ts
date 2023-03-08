import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;
const teams = [
  {
    id: 1,
    team_name: 'Bahia',
  },
  {
    id: 2,
    team_name: 'Botafogo',
  },
];

describe('testar teams', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('testando rota ', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as unknown as Team[]);

    const res = await chai.request(app).get('/teams').send();

    expect(res).to.have.status(200);
  });

  it('testando rota ', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as unknown as Team[]);

    const res = await chai.request(app).get('/teams').send();

    expect(res.body).to.deep.equal(teams);
  });

  it('Testa rota id', async () => {
    sinon
    .stub(Team, 'findByPk')
    .resolves(teams[0] as unknown as Team)

    const res = await chai.request(app).get('/teams/1').send()
    
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal(teams[0])
  });
});