import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/Team';

import { Response } from 'superagent';
import { after } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('testar login', () => {
  const user = [
    {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      // senha: secret_admin
    },
  ];

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('testando rota ', async () => {
    sinon.stub(User, 'findAll').resolves(user as unknown as User[]);

    const res = await chai.request(app).get('/login').send();

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(user);
  });
});
