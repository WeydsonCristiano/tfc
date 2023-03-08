import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/Team';
import { generateToken } from '../utis/JWT';
import LoginService from '../services/LoginService';

chai.use(chaiHttp);

const { expect } = chai;
const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  // senha: secret_admin
};

const payload = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
}
const token = generateToken(payload);

describe('testar login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('test login ', async () => {
    sinon.stub(User, 'findOne').resolves(user as unknown as User);

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: user.email, password: 'secret_admin' });

    expect(res).to.have.status(200);
  });

  it('test login password fail ', async () => {
    sinon.stub(User, 'findOne').resolves(user as unknown as User);

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: user.email, password: 'secret' });

    expect(res).to.have.status(401);
  });

  it('test token ', async () => {
    const token = generateToken(payload);
    const res = await chai
      .request(app)
      .get('/login/role')
      .set({ authorization: token });
    expect(res).to.have.status(200);
  });
});

describe('test Err', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Seu sub-teste', async () => {
    sinon.stub(LoginService, 'role').throws();
    const res = await chai
    .request(app)
    .get('/login/role')
    .set({ authorization: token });
    expect(res).to.have.status(500);
  });
});

