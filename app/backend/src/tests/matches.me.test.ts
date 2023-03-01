// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Match from '../database/models/Match';


// chai.use(chaiHttp);

// const { expect } = chai;

// describe('testar matches', () => {
//   const matches = {} 

//   afterEach(() => {
//     sinon.restore();
//   });

//   it('testando rota ', async () => {
//     sinon.stub(Match, 'findAll').resolves();

//     const res = await chai.request(app).get('/matches').send();

//     expect(res).to.have.status(200);
//     expect(res.body).to.deep.equal();
//   });
// });