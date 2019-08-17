const request = require('supertest') 
const chai = require('chai')
const app = require('../app2')
//const nock = require('nock')
chai.should()

//describe เอาไว้จับกลุ่มการทดสอบ

describe('----| Pokemon API |----',() =>{
    describe('GET /',()=>{
        it('should return 200 ok with "Hello world"',(done) =>{
            request(app).get('/')
            .expect(200)
            .end((err,res) => {
                res.body.should.deep.equal({message:'Hello world'})
                done()
            })
        })
    })
    describe('/pokemon/:id',()=>{
        it('should return 200 OK with a pokemon',(done) =>{
           request(app).get('/pokemon/1')
            .expect(200)
            .end((err,res) => {
                res.body.should.to.be.an('object')
                res.body.should.have.property('id')
                res.body.should.have.property('name')
                res.body.should.have.property('type')
                done()
            })
        })
        it('should return 400 Bad Request',(done) =>{
            request(app).get('/pokemon/99')
             .expect(400)
             .end((err,res) => {
                res.body.error.should.equal('Cannot update Pokemon: Pokemon is not found')
                
                done()
             })
         })
    })
    describe('POST /pokemon',() => {
        it('should return 201 Created and have new pokemon',(done)=>{
            request(app).post('/pokemon')
            .send({
                name: 'Unknow',
                type: 'Unknow'
            })
            .set('Accept','application/json')
            .expect(201,done) 
        })
        it('should return 400 Bad Request when missed required field',(done)=>{
            request(app).post('/pokemon')
            .expect(400)
            .end((err,res) =>{
                res.body.error.should.equal('Insufficient parameters(post): name and type are required parameters')
                done()
            })
        })
    })
    describe('PUT /pokemon/:id',() => {
        it('should return 200 OK and the pokemon has type2',(done)=>{
            request(app).put('/pokemon/1')
                .send({
                    type: 'Unknow'
                })
                .set('Accept','application/json')
                .expect(200,done)
        })
        it('should return 400 Bad Request when try to update not existed pokemon',(done)=>{
            request(app).put('/pokemon/1')
            .expect(400)
            .end((err,res) =>{
                res.body.should.deep.equal({ error: 'Insufficient parameters(put): type2 is required parameter'})
                done()
            })
        })
    })

})