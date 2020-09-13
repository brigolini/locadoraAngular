const veiculoService = require('../services/VeiculoService')

exports.getVeiculo = (req, res, next) => {
    return res.status(200).send(veiculoService.getData());
}

exports.getVeiculoById = (req, res, next) => {
    const veiculo = veiculoService.getData().find(veiculo => veiculo.id === parseInt(req.params.id) )
    if (!veiculo) res.status(404).send({"mensagem":"Veículo não encontrado"})
    return res.status(200).send(veiculo);
}


exports.postVeiculo = (req, res, next) => {
    let novoVeiculo = req.body;
    novoVeiculo = { ...novoVeiculo,"id": veiculoService.getNextId()}
    veiculoService.saveData(novoVeiculo);
    return res.status(201).send(novoVeiculo);
}

exports.putVeiculo = (req, res, next) => {
    let oldVeiculo = veiculoService.findById(parseInt(req.params.id));
    if (!oldVeiculo)
        return res.status(404).send({"mensagem": "Veículo não encontrado"})
    let newVeiculo = {...req.body, "id": parseInt(req.params.id)};
    veiculoService.saveData(newVeiculo);
    return res.status(200).send(newVeiculo);
}

exports.patchVeiculo = (req, res, next) => {
    let oldVeiculo = veiculoService.findById(parseInt(req.params.id));
    if (!oldVeiculo)
        return res.status(404).send({"mensagem": "Veículo não encontrado"})
    let newVeiculo = {...oldVeiculo,...req.body};
    veiculoService.saveData(newVeiculo);
    return res.status(200).send(newVeiculo);
}

exports.deleteVeiculo = (req, res, next) => {
    let id = parseInt(req.params.id);
    if (!veiculoService.findById(id))
        return res.status(404).send({"mensagem": "Veículo não encontrado"});
    veiculoService.deleteData(id);
    return res.status(204).send();
}
