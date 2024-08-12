
const Aluno = require('../models/Aluno');
const Personal = require('../models/Personal');

const mostraAluno = async (req, res) => {
    try {
        const alunos = await Aluno.findAll({
            include: { model: Personal, as: 'Personal' },
            attributes: ['id', 'nomeAluno', 'idadeAluno', 'emailAluno'],
        });
        
        res.render('alunos', { alunos });
    } catch (error) {
        res.status(500).send('Erro ao buscar alunos: ' + error.message);
    }
};
const mostraDetalheAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id, {
            include: { model: Personal, as: 'Personal' }, 
        });
     
        if (!aluno) {
            return res.status(404).send('Aluno não encontrado');
        }
        res.render('aluno', { aluno });
    } catch (error) {
        res.status(500).send('Erro ao buscar aluno: ' + error.message);
    }
};


const mostraForm = async (req, res) => {
    try {
        const aluno = req.params.id ? await Aluno.findByPk(req.params.id) : {};
        const personais = await Personal.findAll();
        res.render('alunoform', { aluno, personais });
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de aluno: ' + error.message);
    }
};

const criaAluno = async (req, res) => {
    try {
        await Aluno.create(req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Erro ao criar aluno: ' + error.message);
    }
};

const atualizaAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (!aluno) {
            return res.status(404).send('Aluno não encontrado');
        }
        await aluno.update(req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Erro ao atualizar aluno: ' + error.message);
    }
};

const deletaAluno = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (!aluno) {
            return res.status(404).send('Aluno não encontrado');
        }
        await aluno.destroy();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Erro ao excluir aluno: ' + error.message);
    }
};

module.exports = {
    mostraAluno,
    mostraDetalheAluno,
    mostraForm,
    criaAluno,
    atualizaAluno,
    deletaAluno
};
