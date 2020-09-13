const veiculoController = require('./app/controllers/VeiculoController');
const VeiculoSchema = require('./app/model/Veiculo')
const validate = require('express-jsonschema').validate;

module.exports = function(app) {
    app.get('/api/', function(req, res) {
        res.send({ api: 'CRUD para teste InfoSistemas', version: "1.0" });
    });
    app.get('/api/veiculos',veiculoController.getVeiculo)
    app.get('/api/veiculos/:id',veiculoController.getVeiculoById)
    app.post('/api/veiculos/',validate({body: VeiculoSchema.Schema}),veiculoController.postVeiculo)
    app.put('/api/veiculos/:id',validate({body: VeiculoSchema.Schema}),veiculoController.putVeiculo)
    app.patch('/api/veiculos/:id',veiculoController.patchVeiculo)
    app.delete('/api/veiculos/:id',veiculoController.deleteVeiculo)
}
