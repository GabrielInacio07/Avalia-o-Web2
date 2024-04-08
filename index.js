const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path'); // Importe o módulo path

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configuração do Handlebars
app.engine(
	'handlebars',
	exphbs.engine({
		defaultLayout: 'main',
		partialsDir: path.join(__dirname, 'views', 'partials'),
	})
);
app.set('view engine', 'handlebars');

var alunos = [
	{
		id: 1,
		nomeAluno: 'Gabriel',
		idadeAluno: 19,
		emailAluno: 'gabriel@gmail.com',
		personal: {
			nome: 'Jhonny',
			matricula: '23442',
			email: 'Jhonnytreinador@gmail.com',
		},
	},
	{
		id: 2,
		nomeAluno: 'Vitor',
		idadeAluno: 24,
		emailAluno: 'vitor@gmail.com',
		personal: {
			nome: 'Jhonny',
			matricula: '23442',
			email: 'Jhonnytreinador@gmail.com',
		},
	},
	{
		id: 3,
		nomeAluno: 'Caio',
		idadeAluno: 20,
		emailAluno: 'caio@gmail.com',
		personal: {
			nome: 'Jhonny',
			matricula: '23442',
			email: 'Jhonnytreinador@gmail.com',
		},
	},
];

var proximoId = 4;

app.get('/', (req, res) => {
	res.redirect('alunos');
});

app.get('/alunos/novo', (req, res) => {
	res.render('alunoform');
});

app.get('/alunos/:id', (req, res) => {
	const id = parseInt(req.params.id);

	const aluno = alunos.find((aluno) => aluno.id === id);

	res.render('aluno', { aluno });
});
app.get('/alunos/:id/atualizar', (req, res) => {
	const id = parseInt(req.params.id);
	const aluno = alunos.find((aluno) => aluno.id === id);
	res.render('alunoform', {
		aluno,
		action: `/alunos/${id}/atualizar`,
	});
});
app.get('/alunos/:id/personal', (req, res) => {
	const id = parseInt(req.params.id);
	const aluno = alunos.find((aluno) => aluno.id === id);
	res.render('personal', {
		aluno,
		personal: aluno.personal,
	});
});

app.post('/alunos/:id/atualizar', (req, res) => {
	const id = parseInt(req.params.id);
	const nomeAluno = req.body.nomeAluno;
	const idadeAluno = req.body.idadeAluno;
	const emailAluno = req.body.emailAluno;

	const index = alunos.findIndex((aluno) => aluno.id === id);
	alunos[index] = {
		id,
		nomeAluno,
		idadeAluno,
		emailAluno,
	};

	res.redirect('/');
});
app.post('/alunos/novo', (req, res) => {
	const nomeAluno = req.body.nomeAluno;
	const idadeAluno = req.body.idadeAluno;
	const emailAluno = req.body.emailAluno;
	const matriculaPersonal = req.body.matriculaPersonal;

	const personal = alunos.find(
		(aluno) => aluno.personal.matricula === matriculaPersonal
	)?.personal;

	if (personal) {
		alunos.push({
			id: proximoId++,
			nomeAluno,
			idadeAluno,
			emailAluno,
			personal: {
				nome: personal.nome,
				matricula: personal.matricula,
				email: personal.email,
			},
		});

		res.redirect('/');
	} else {
		res.render('erropersonal', { personal: { matricula: matriculaPersonal } }); // Passa a matrícula digitada para a view
	}
});

/// Excluir evento
app.post('/alunos/excluir/:id', (req, res) => {
	const id = parseInt(req.params.id);

	alunos = alunos.filter((aluno) => aluno.id !== id);

	res.redirect('/');
});

//Listagem de eventos
app.get('/alunos', (req, res) => {
	res.render('alunos', { alunos });
});

app.listen(3000, () => {
	console.log('Server rodando');
});
