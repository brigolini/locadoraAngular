//Passa o enviromment para test
process.env.NODE_ENV = 'test';

//Dependências do chai
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

//Dependências do projeto
const veiculoService = require('../app/services/VeiculoService')

const veiculo = {
    "id": 3,
    "placa": "ZZZ9090",
    "chassi": "ES3230234823948HR",
    "renavam": 4234234234,
    "modelo": "KA",
    "marca": "Ford",
    "ano": 2015
}

chai.use(chaiHttp);

function insertVeiculos(agent, done) {
    agent.post('/api/veiculos')
        .send(veiculo)
        .end((err, res) => {
            agent.post('/api/veiculos')
                .send(veiculo)
                .end((err, res) => {
                        done();
                    }
                )
        })
}

//Our parent block
describe('Veículos', () => {
    let agent;
    before(done => {
        agent = chai.request(server).keepOpen();
        done();
    })
    after(done => {
        agent.close();
        done;
    })
    beforeEach((done) => {

        // Cria o agente
        chai.request(server).keepOpen()
        // Limpa o banco de dados
        veiculoService.getData().forEach(veiculo => {
            veiculoService.deleteData(veiculo.id);
        })
        done()
    });

    describe('/GET veiculo', function () {
        it('deve carregar lista de veículos vazia', (done) => {
            agent
                .get('/api/veiculos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('Deve encontrar um veículo pelo seu id', (done) => {
            agent.post('/api/veiculos')
                .send(veiculo)
                .end((err, res) => {
                    agent.get('/api/veiculos/1')
                        .end((err, res) => {
                            res.should.have.status((200));
                            res.body.should.be.a('object');
                            res.body.placa = veiculo.placa;
                            done();
                        })
                });
        });
    });

    describe('/POST veiculo', function () {
        it('deve incluir um veículo', (done) => {
            agent
                .post('/api/veiculos')
                .send(veiculo)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.id.should.be.equal(1, "Primeira inclusão deve ter id 1")
                    const novoVeiculo = {...veiculo, "id": 1}
                    res.body.should.be.eql(novoVeiculo, "Deve retornar Json de novo veiculo igual")
                    done();
                });
        });
    })

    describe('/PUT veiculo - /PATCH veiculo', function () {

        // Inclui dois veículos para permitir testes
        beforeEach(done => {
            insertVeiculos(agent, done);
        })

        it('deve alterar todos os dados do veículo de id 2', (done) => {
            novoVeiculo = {...veiculo,"id":2};
            novoVeiculo.placa = 'ALT1313'
            agent
                .put('/api/veiculos/2')
                .send(novoVeiculo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.id.should.be.equal(2, "Id do veículo a ser alterado deveria ser 2")
                    res.body.should.be.eql(novoVeiculo, "Deve retornar Json de novo veiculo igual")
                    done();
                });
        });

        it('deve alterar apenas os dados enviados do veículo de id 2', (done) => {
            novoVeiculo = {placa : 'ALT1313'};

            agent
                .patch('/api/veiculos/2')
                .send(novoVeiculo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.id.should.be.equal(2, "Id do veículo a ser alterado deveria ser 2")
                    res.body.placa.should.be.equal("ALT1313");
                    res.body.renavam.should.be.equal(veiculo.renavam);
                    done();
                });
        });

        it('Deve responder not found ao tentar alterar id inexistente', (done) => {
            novoVeiculo = {...veiculo,"id":2};
            novoVeiculo.placa = 'ALT1313'
            agent
                .put('/api/veiculos/1000')
                .send(novoVeiculo)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    })


    describe('/DELETE veiculo', function () {
        beforeEach(done => {
            insertVeiculos(agent, done);
        })

        it('deve excluir o segundo veículo da lista', (done) => {
            agent
                .delete('/api/veiculos/2')
                .end((err, res) => {
                    res.should.have.status(204);
                    agent
                        .get('/api/veiculos/2')
                        .end((err, res)=>{
                            res.should.have.status(404);
                            done();
                        });
                });
        });
    });


});
