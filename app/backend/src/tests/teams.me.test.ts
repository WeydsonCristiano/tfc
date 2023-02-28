import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { after } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('testar teams', () => {
  const teams = [
    {
      id: 1,
      teamName: 'Bahia',
    },
    {
      id: 2,
      teamName: 'Botafogo',
    },
  ];

  after(() => {
    (Team.findOne as sinon.SinonStub).restore();
  });

  it('testando rota ', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as Team[]);

    const res = await chai.request(app).get('/teams').send();

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(teams);
  });

  it('Testa rota id', async () => {
    sinon
    .stub(Team, 'findByPk')
    .resolves(teams[0] as Team)

    const res = await chai.request(app).get('/teams/1').send()
    
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal(teams[0])
  });
});