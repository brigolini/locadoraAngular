const jsonDatabase = require('./DbService');

let veiculos = getDataFromDb();


function getDataFromDb() {
    return jsonDatabase.db.getData('/');
}

exports.getNextId=()=>{
    const data = veiculos.sort((a,b)=>b.id - a.id)
    if (data.length===0) return 1;
    return data[0].id + 1;
}
/**
 * Busca todos os veículos da base de dados
 * @returns {any}
 */
exports.getData = ()=> veiculos;

/**
 * Busca Veículo por ID
 * @param id
 * @returns {any}
 */
exports.findById = (id) => veiculos.find(item=>item.id===id);

/**
 * Salva um novo veículo no banco de dados. Caso esse veículo já exista (ids iguais) apenas modifica o veículo
 * @param veiculo veículo a ser salvo
 */
exports.saveData = (veiculo)=>{
    veiculos = veiculos.filter(item=>item.id!==veiculo.id);
    veiculos = [...veiculos,veiculo]
    jsonDatabase.db.push("/",veiculos)
}

/**
 * Exclui um veículo do banco
 * @param id
 */
exports.deleteData = (id)=>{
    veiculos = veiculos.filter(item=>item.id!==id);
    jsonDatabase.db.push('/',veiculos);
}

