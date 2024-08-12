const Personal = require('../models/Personal');

const mostraFormPersonal = (req, res) => {
    res.render('personalform');
};

const criaPersonal = async (req, res) => {
    try {
        await Personal.create(req.body);
        res.redirect('/personais');
    } catch (error) {
        res.status(500).send('Erro ao cadastrar personal: ' + error.message);
    }
};

const listaPersonais = async (req, res) => {
    const personais = await Personal.findAll();
    res.render('personais', { personais });
};

module.exports ={
    mostraFormPersonal,
    criaPersonal,
    listaPersonais
}