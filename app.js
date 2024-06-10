// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAepcCOElS6km3rOas8cHA93sEsn7Xhqk0",
    authDomain: "tester-76381.firebaseapp.com",
    databaseURL: "https://tester-76381-default-rtdb.firebaseio.com",
    projectId: "tester-76381",
    storageBucket: "tester-76381.appspot.com",
    messagingSenderId: "489689030181",
    appId: "1:489689030181:web:c9081f73a85f18659929cc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Obtém uma referência para o banco de dados Firebase
const database = firebase.database();

const storage = firebase.storage(); //inicializa o storage

// Função para enviar dados para o Firebase
function enviarDadosParaFirebase() {
    const nomeAluno = document.getElementById('nome').value.toLowerCase();
    const turma = document.getElementById('turma').value.toLowerCase();
    const curso = document.getElementById('curso').value.toLowerCase();
    const imagem = document.getElementById('imagem').files[0]; // Obtém o arquivo de 
    imagem
    if (imagem) {
        const storageRef = storage.ref('imagens/' + imagem.name);
        storageRef.put(imagem).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                const dados = {
                    nomeAluno: nomeAluno,
                    turma: turma,
                    curso: curso,
                    imagemURL: downloadURL // Salva a URL da imagem
                };
                database.ref('alunos').push(dados)
                    .then(() => {
                        alert('Dados enviados com sucesso!');
                        document.getElementById('nome').value = '';
                        document.getElementById('turma').value = '';
                        document.getElementById('curso').value = '';
                        document.getElementById('imagem').value = '';
                    })
                    .catch(error => {
                        console.error('Erro ao enviar os dados: ', error);
                    });
            });
        }).catch(error => {
            console.error('Erro ao fazer upload da imagem: ', error);
        });
    } else {
        alert('Por favor, selecione uma imagem.');
    }
}

function consultarAlunoPorNome() {
    const nome = document.getElementById('nomeConsulta').value.trim().toLowerCase();
    const alunosRef = database.ref('alunos');
    alunosRef.orderByChild('nomeAluno').equalTo(nome).once('value', snapshot => {
        const data = snapshot.val();
        const lista = document.getElementById('listaAlunos');
        lista.innerHTML = ''; // Limpar lista anterior
        if (data) {
            Object.keys(data).forEach(key => {
                const aluno = data[key];
                const item = document.createElement('li');
                item.innerHTML = `Nome: ${aluno.nomeAluno}. <br>
                                  Turma: ${aluno.turma}. <br>
                                  Curso: ${aluno.curso}. <br>
                                  Imagem: <img src="${aluno.imagemURL}" 
                                  alt="Imagem do Aluno" 
                                  style="width:400px; 
                                  height:auto;
                                  box-shadow: black 0 0 6px -1px;
                                  margin-left: 30%;
                                  border-radius:10px;">`;

                lista.appendChild(item);
            });
        } else {
            lista.innerHTML = '<li>Nenhum aluno encontrado com esse nome.</li>';
        }
    }).catch(error => {
        console.error('Erro ao buscar alunos: ', error);
    });
    janela.style.display = 'block';
}

// Seleciona o botão e a janela
const botao = document.getElementById('botao');
const janela = document.getElementById('a');

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function () {
    // Verifica se a janela está visível
    if (janela.style.display === 'none') {
        // Se estiver oculta, exibe a janela
        janela.style.display = 'block';
    } else {
        // Se estiver visível, oculta a janela
        janela.style.display = 'none';
    }
});
