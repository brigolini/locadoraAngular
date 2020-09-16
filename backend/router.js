const veiculoController = require('./app/controllers/VeiculoController');
const autenticacaoController = require('./app/controllers/AutenticacaoController');
const VeiculoSchema = require('./app/model/Veiculo')
const validate = require('express-jsonschema').validate;
const passport = require('passport');

const requireAuth = passport.authenticate('bearer', { session: false });
module.exports = function(app) {
    app.get('/api/', function(req, res) {
        res.send({ api: 'CRUD para teste InfoSistemas', version: "1.0" });
    });
    app.get('/api/veiculos',requireAuth,veiculoController.getVeiculo)
    app.get('/api/veiculos/:id',requireAuth,veiculoController.getVeiculoById)
    app.post('/api/veiculos/',requireAuth,validate({body: VeiculoSchema.Schema}),veiculoController.postVeiculo)
    app.put('/api/veiculos/:id',requireAuth,validate({body: VeiculoSchema.Schema}),veiculoController.putVeiculo)
    app.patch('/api/veiculos/:id',requireAuth,veiculoController.patchVeiculo)
    app.delete('/api/veiculos/:id',requireAuth,veiculoController.deleteVeiculo)

    // rota de login
    app.post('/api/login',autenticacaoController.login)
}
