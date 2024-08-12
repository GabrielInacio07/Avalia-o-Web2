const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./db/conn');
const alunoController = require('./controllers/alunoController');
const personalController = require('./controllers/personalController');
const Personal = require('./models/Personal'); 
const Aluno = require('./models/Aluno');
const app = express();
const handlebars = require('handlebars')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
handlebars.registerHelper('ifEquals', function(arg1, arg2, options){
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(__dirname, 'views', 'partials'),
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set('view engine', 'handlebars');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch((err) => {
        console.log('Erro ao sincronizar o banco de dados:', err);
    });

app.get('/personais/novo', personalController.mostraFormPersonal);
app.post('/personais/novo', personalController.criaPersonal);
app.get('/personais', personalController.listaPersonais);

app.get('/alunos/:id/personal', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id, {
            include: {
                model: Personal,
                as: 'Personal'
            }
        });

        if (!aluno) {
            return res.status(404).render('erropersonal', { personal: { matricula: req.params.id } });
        }

        res.render('personal', { personal: aluno.Personal, aluno });
    } catch (error) {
        res.status(500).send('Erro ao buscar personal: ' + error.message);
    }
});

app.get('/', alunoController.mostraAluno);
app.get('/alunos/novo', alunoController.mostraForm);
app.post('/alunos/novo', alunoController.criaAluno);
app.get('/alunos', alunoController.mostraAluno);
app.get('/alunos/:id', alunoController.mostraDetalheAluno);
app.get('/alunos/:id/editar', alunoController.mostraForm);
app.post('/alunos/:id/atualizar', alunoController.atualizaAluno);
app.post('/alunos/excluir/:id', alunoController.deletaAluno);

app.listen(3000, () => {
    console.log('Server rodando');
});
