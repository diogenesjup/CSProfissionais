//
// ###########################################################################
//
// CHAMADA DE SERVIÇOS CS PROFISSIONAIS
// DIOGENES OLIVEIRA DOS SANTOS JUNIOR
// CONTATO@DIOGENESJUNIOR.COM.BR 
// WWWW.DIOGENESJUNIOR.COM.BR
// VERSÃO 2
// 16 DE AGOSTO DE 2016 
//
// INDICE DAS FUNÇÕES
//
// D0001 - FUNÇÃO PARA LOGAR O USUÁRIO
// D0002 - FUNÇÃO PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO
// D0003 - FUNÇÃO PARA O AUTO COMPLETE NA BUSCA
// D0004 - FUNÇÃO PARA CARREGAR OS BANNERS DE ANUNCIOS
// D0005 - POPULAR HTML COM INFORMAÇÕES VINDAS DOS SERVIÇOS
// D0006 - CADASTRO DE USUÁRIOS TIPO CLIENTE
// D0007 - FUNÇÃO PARA PEGAR O ID DO ESTADO CIDADE
// D0008 - ATUALIZAR SENHA DO USUÁRIO
// D0009 - POPULAR FORMULARIOS DA PAGINA DE PERFIL
// D0010 - ATUALIZAR DADOS DO PERFIL
// D0011 - ATIVAR A PESQUISA DE PROFISSIONAIS
// D0012 - LISTAR OS PROFISSIONAIS ENCONTRADOS NA PESQUISA
// D0013 - DIRECIONAR O USUARIO PARA O PERFIL DO PROFISSIONAL
// D0014 - ALIMENTAR PÁGINA DE DETALHE PROFISSIONAL
// D0015 - BUSCAR ULTIMOS TRABALHOS DO PROFISSIONAL
// D0016 - AVALIAR PROFISSIONAL
// D0017 - CARREGAR COMENTÁRIOS FEITOS PARA O PROFISSIONAL
// D0018 - FUNÇÃO QUE DEVOLVE APENAS O NOME DO CLIENTE
// D0019 - TROCA DE MENSAGENS ENTRE CLIENTE E PROFISSIONAL
// D0020 - ENVIAR MENSAGEM PARA PROFISSIONAL
// D0021 - PEGAR APENAS O NOME DO PROFISSIONAL
// D0022 - PEGAR TODAS AS MENSAGENS EM QUE O CLIENTE INTERAGIU COM UM PROFISSIONAL
// D0023 - SETAR E DIRECIONAR O USUARIO PARA A PAGINA DO PROFISSIONAL QUE ELE QUER VER A CONVERSA
// D0024 - CADASTRO DE USUÁRIOS TIPO PROFISSIONAL
// D0025 - UPLOAD DE IMAGENS
// D0026 - FUNÇÃO PARA O AUTO COMPLETE NO CADASTRO DO PROFISSIONAL
// D0027 - FUNÇÃO PARA LOGAR O USUÁRIO COMO PROFISSIONAL
// D0028 - FUNÇÃO PARA VERIFICAR SE O USUÁRIO PROFISSIONAL ESTÁ LOGADO
// D0029 - POPULAR HTML COM INFORMAÇÕES VINDAS DOS SERVIÇOS (PROFISSIONAL)
// D0030 - PEGAR TODAS AS MENSAGENS EM QUE O PROFISSIONAL INTERAGIU COM UM CLIENTE
// D0031 - SETAR E DIRECIONAR O USUARIO PROFISSIONAL PARA A PAGINA DO CLIENTE QUE ELE QUER VER A CONVERSA
// D0032 - PEGAR APENAS O NOME DO CLIENTE
// D0033 - TROCA DE MENSAGENS ENTRE CLIENTE E PROFISSIONAL
// D0034 - SOLICITAÇÃO DE DESTAQUE FEITA PELO PROFISSIONAL
// D0035 - CARREGAR COMENTÁRIOS FEITOS PARA O PROFISSIONAL (PROFISSIONAL)
// D0036 - POPULAR FORMULARIOS DA PAGINA DE PERFIL
// D0037 - ATUALIZAR SENHA DO PROFISSIONAL
// D0038 - ATUALIZAR DADOS DO PROFISSIONAL
// D0039 - CLIENTE SOLICITA CONTATO DO PROFISSIONAL
// D0040 - Busca Especializacoes
// D0041 - Carrega Endereço pelo CEP Cli
// D0042 - Carrega Endereço pelo CEP Pro
// D0043 - Pre Cadastro Profissional (verifica se tem imagem)
// D0044 - BUSCAR ULTIMOS TRABALHOS DO PROFISSIONAL LOGAGO
//
//
// #############################################################################


var form;
var nomeFoto;

var especializacaoData;

profissional = this;
var listEspec;
var currencies = [];

// D0001 - FUNÇÃO PARA LOGAR O USUÁRIO
function procLogin(){  

    var login = $("#login").val();
    var senha = $("#senha").val();

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/Login",
        data: { email: login, senha: senha }
    })
    request.done(function( msg ) {

        if(!msg["Data"]){
            alert("Login ou Senha incorretos");
        }else{

            localStorage.setItem("ClienteId", msg["Data"]["ClienteId"]);
            localStorage.setItem("Nome", msg["Data"]["Nome"]);
            localStorage.setItem("TelefoneFixo", msg["Data"]["TelefoneFixo"]);
            localStorage.setItem("TelefoneCelular", msg["Data"]["TelefoneCelular"]);
            localStorage.setItem("Email", msg["Data"]["Email"]);
            localStorage.setItem("Cpf", msg["Data"]["Cpf"]);
            localStorage.setItem("Senha", msg["Data"]["Senha"]);
            localStorage.setItem("CidadeId", msg["Data"]["Endereco"]["CidadeId"]);
            localStorage.setItem("NomeRua", msg["Data"]["Endereco"]["Nome"]);
            localStorage.setItem("Numero", msg["Data"]["Endereco"]["Numero"]);
            localStorage.setItem("Complemento", msg["Data"]["Endereco"]["Complemento"]);
            localStorage.setItem("Bairro", msg["Data"]["Endereco"]["Bairro"]);
            localStorage.setItem("Cep", msg["Data"]["Endereco"]["Cep"]);
            localStorage.setItem("Latitude", msg["Data"]["Endereco"]["Latitude"])
            localStorage.setItem("Longitude", msg["Data"]["Endereco"]["Longitude"]);

            localStorage.setItem("CidadeNome", msg["Data"]["Endereco"]["CidadeNome"]);
            localStorage.setItem("EstadoSigla", msg["Data"]["Endereco"]["EstadoSigla"]);

            location.href="dashboard.html";

        }  

    });
    request.fail(function() {
        alert("Não foi possível realizar o seu login, tente novamente");
        location.href="index.html";
    });

}


// D0024 - CADASTRO DE USUÁRIOS TIPO PROFISSIONAL
function procCadastroPro(){
    $('.conteudoLoginPro').css({ display: "none" });
    $('.divAguardeCadPro').css({ display: "block" });

    var cadastroNomePro = $("#cadastroNomePro").val();
    var telefoneFixoPro = $("#telefoneFixoPro").val();
    var telefoneCelularPro = $("#telefoneCelularPro").val();
    var cadastroEmailPro = $("#cadastroEmailPro").val();
    var cadastroCnpjPro = $("#cadastroCnpjPro").val();
    var cadastroRuaPro = $("#cadastroRuaPro").val();
    var cadastroNumeroPro = $("#cadastroNumeroPro").val();
    var cadastroCepPro = $("#cadastroCepPro").val();
    var estadoPro = $("#estadoPro").val();
    var cidadePro = $("#cidadePro").val();
    var cadastroBairroPro = $("#cadastroBairroPro").val();
    var cadastroCurriculoPro = $("#cadastroCurriculoPro").val();
    var fotoPerfilPro = ''; //document.getElementById('fotoPerfilPro').files[0]; //$("#fotoPerfilPro").val(); 
    var cadastroSenhaPro = $("#cadastroSenhaPro").val();
    var especializacaoPro = $("#tipoProfissionalLista").val();
            
    var latitude = "-23.5806447";
    var longitude = "-46.6187552";
      
    console.log("Vamos Iniciar o cadastro de um profissional");
    console.log("Nome: "+cadastroNomePro);
    console.log("Email: "+cadastroEmailPro);
    console.log("CNPJ: "+cadastroCnpjPro);
    console.log("Foto perfil: "+fotoPerfilPro);

    console.log("Testando a imagem de perfil: ");

    //nomeFoto = fotoPerfilPro.name;
    var tamanhoFoto = fotoPerfilPro.size;

    console.log("Nome arquivo: "+fotoPerfilPro.name);
    console.log("Tamanho arquivo: "+fotoPerfilPro.size);
    console.log("Tipo arquivo: "+fotoPerfilPro.type);

    // PEGAR LATITUDE E LONGITUDE
    var request = $.ajax({
        method: "GET",
        async: false,
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+cadastroNumeroPro+"+"+cadastroRuaPro+",+"+cidadePro+",+"+estadoPro+"&key=AIzaSyCUGRiH2iey-c2WqqeegGF2qpxBDNLsmfQ"
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
              
        console.log("Latitude do Google: "+msg["results"][0]["geometry"]["location"]["lat"]+" Longitude do Google: "+msg["results"][0]["geometry"]["location"]["lng"]);
              
        latitude = msg["results"][0]["geometry"]["location"]["lat"];
        longitude = msg["results"][0]["geometry"]["location"]["lng"];

        localStorage.setItem("Latitude", msg["results"][0]["geometry"]["location"]["lat"]);
        localStorage.setItem("Longitude",msg["results"][0]["geometry"]["location"]["lng"]);

    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
       
    });
    // PEGAR LATITUDE E LONGITUDE

    console.log("Latitude atual: "+latitude+" Longitude atual: "+longitude);
      
    // SETAR NA SESSÃO O ID DA CIDADE
    getIdEstadoCidade(estadoPro,cidadePro);
      
    var idCidade = localStorage.getItem("cidadeId");

    // POPULAR ARRAY DO ENDEREÇO
      
    var endereco = [];
     
    endereco = {CidadeId: idCidade, nome: cadastroRuaPro, numero: cadastroNumeroPro, complemento: "n/a", bairro: cadastroBairroPro, cep: cadastroCepPro, latitude: latitude, longitude: longitude}   
      
    var espec = [];
    espec.push({"EspecializacaoId": especializacaoPro });

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/inserir",
        data: { nome: cadastroNomePro, 
            nomefoto: nomeFoto, 
            Descricao: cadastroCurriculoPro, 
            telefonefixo: telefoneFixoPro, 
            telefonecelular: telefoneCelularPro, 
            email: cadastroEmailPro, 
            cpf: cadastroCnpjPro, 
            senha: cadastroSenhaPro, 
            endereco: endereco,
            Especializacao: espec
        }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Cadastro de profissional Realizado com sucesso!");
        // REGISTRAR OS DADOS DA SESSÃO E LOGAR O USUÁRIO
            
        localStorage.setItem("idProfissionalLogado", msg["Data"]["ProfissionalId"]);
        localStorage.setItem("Nome", msg["Data"]["Nome"]);
        localStorage.setItem("TelefoneFixo", msg["Data"]["TelefoneFixo"]);
        localStorage.setItem("TelefoneCelular", msg["Data"]["TelefoneCelular"]);
        localStorage.setItem("Email", msg["Data"]["Email"]);  
        localStorage.setItem("Cpf", msg["Data"]["Cpf"]);
        localStorage.setItem("NomeFotoPro", msg["Data"]["Nomefoto"]);

        localStorage.setItem("CidadeId", msg["Data"]["Endereco"]["CidadeId"]);
        localStorage.setItem("NomeRua", msg["Data"]["Endereco"]["Nome"]);

        localStorage.setItem("Numero", msg["Data"]["Endereco"]["Numero"]);
        localStorage.setItem("Complemento", msg["Data"]["Endereco"]["Complemento"]);
        localStorage.setItem("Bairro", msg["Data"]["Endereco"]["Bairro"]);
        localStorage.setItem("Cep", msg["Data"]["Endereco"]["Cep"]);
        localStorage.setItem("Latitude", msg["Data"]["Endereco"]["Latitude"])
        localStorage.setItem("Longitude", msg["Data"]["Endereco"]["Longitude"]);

        console.log("Direcionando o profissional...");

        $("#conteudoLoginPro").attr("style", "display:block");
        $("#divAguardeCadPro").attr("style", "display:none;");

        location.href="dashboard-pro.html";

    });
    request.fail(function() {
        console.log("Deu ruim o cadastro");
        alert('Erro ao efetuar o cadastro! \r\n Por favor tente mais tarde!');
        $("#conteudoLoginPro").attr("style", "display:block");
        $("#divAguardeCadPro").attr("style", "display:none;");
    });

        
}


$(function () {
        
    $('#fotoPerfilPro').change(function (event) {
        form = new FormData();
        form.append('fileUpload', event.target.files[0]); // para apenas 1 arquivo
        //var name = event.target.files[0].content.name; // para capturar o nome do arquivo com sua extenção
    });

    $('#btnEnviar').click(function () {
        var retorno='';
        var request = $.ajax({
            url: 'http://api.csprofissionais.com.br/api/imagem/PostImagem', // Url do lado server que vai receber o arquivo
            data: form,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                //retorno = data;
                //alert(data); // utilizar o retorno
            }
        });
        //alert(retorno);
        request.done(function( msg ) {
            alert(msg);
        })		
        request.fail(function() {
            console.log("Deu ruim o cadastro");
        })
	   
        alert('Saiu');
    });
});

// D0002 - FUNÇÃO PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO
function verificarSessao(){

    var sessao = localStorage.getItem("ClienteId");
    if(!sessao){
        alert("Por favor, faça seu login novamente");
        location.href("index.html");
    }

}  


// D0003 - FUNÇÃO PARA O AUTO COMPLETE NA BUSCA
function autoCompleteBusca(){

    $('#tipoProfissionalLista').autocomplete({
        lookup: function (query, done) {
            // Do ajax call or lookup locally, when done,
            // call the callback and pass your results:
            var result = {
                suggestions: [
                                 
                    { "value": "Advogado", "data": "Advogado" },   
                    { "value": "Analista de Sistemas", "data": "Analista de Sistemas" },   
                    { "value": "Azulejista", "data": "Azulejista" },   
                    { "value": "Baba", "data": "Baba" },  
                    { "value": "Desenvolvedor", "data": "Desenvolvedor" },
                    { "value": "Eletricista", "data": "Eletricista" },
                    { "value": "Encanador", "data": "Encanador" },
                    { "value": "Faxineiro", "data": "Faxineiro" },
                    { "value": "Gesseiro", "data": "Gesseiro" },
                    { "value": "Pedreiro", "data": "Pedreiro" }, 
                            
                ]
            };

            done(result);
        },

    });
}


// D0004 - FUNÇÃO PARA CARREGAR OS BANNERS DE ANUNCIOS
function bannersAnuncios(){

    var request = $.ajax({
        method: "GET",
        url: "http://api.mdanave.com.br/api/MediaBox/Listar"
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        var totBanners = msg["Data"]["List"].length;
        totBanners = totBanners - 1;
        var chaveBanner = Math.floor((Math.random() * totBanners) + 1);  

        $("#areaBannerAnuncio").html("<a href='#'><img src='http://www.csprofissionais.com.br/upload/"+msg["Data"]["List"][chaveBanner]["Arquivo"]+"' /></a>")

    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar carregar os banners de anúncios");
    });

}


// D0005 - POPULAR HTML COM INFORMAÇÕES VINDAS DOS SERVIÇOS
function popularHtml(){

    // ESCREVER O NOME DO USUÁRIO NO HEADER DA PÁGINA             
    $("#nomeUsuario").html(localStorage.getItem("Nome"));  
    // SETAR O CEP NO CAMPO DE BUSCA AUTOMATICAMENTE  
    $("#cepPesquisa").val(localStorage.getItem("Cep")); 


}



// D0006 - CADASTRO DE USUÁRIOS TIPO CLIENTE
function procCadastro(){

    var msgerroCad = "";
    if ($("#cadastroNome").val() == "")
        msgerroCad = msgerroCad + "* Nome é obrigatório!  \r\n";

    if ($("#cadastroEmail").val() == "")
        msgerroCad = msgerroCad + "* E-mail é obrigatório!  \r\n";

    if ($("#telefoneCelular").val() == "")
        msgerroCad = msgerroCad + "* Telefone Celular é obrigatório!  \r\n";

    //if ($("#cadastroCnpjPro").val() == "")
    //    msgerro = msgerro + "* CPF/CNPJ é obrigatório! \r\n";

    if ($("#cadastroCep").val() == "")
        msgerroCad = msgerroCad + "* CEP é obrigatório! \r\n";

    if ($("#cadastroRua").val() == "")
        msgerroCad = msgerroCad + "* Endereço é obrigatório! \r\n";

    //if ($("#cadastroNumeroPro").val() == "")
    //    msgerro = msgerro + "* Número é obrigatório! \r\n";

    if ($("#cadastroBairro").val() == "")
        msgerroCad = msgerroCad + "* Bairro é obrigatório! \r\n";

    if ($("#estado").val() == "")
        msgerroCad = msgerroCad + "* Estado é obrigatório! \r\n";

    if ($("#cidade").val() == "" || $("#cidade").val() == null)
        msgerroCad = msgerroCad + "* Cidade é obrigatório! \r\n";


    if ($("#cadastroSenha").val() == "")
        msgerroCad = msgerroCad + "* Senha é obrigatório! \r\n";

    if (msgerroCad != "")
        alert(msgerroCad);

    var cadastroNome = $("#cadastroNome").val();
    var cadastroEmail = $("#cadastroEmail").val();
    var cadastroCpf = $("#cadastroCpf").val();
    var cadastroCep = $("#cadastroCep").val();
    var estado = $("#estado").val();
    var cidade = $("#cidade").val();
    var cadastroBairro = $("#cadastroBairro").val();
    var cadastroSenha = $("#cadastroSenha").val();

    var cadastroRua = $("#cadastroRua").val();
    var cadastroNumero = $("#cadastroNumero").val();

    var dddfixo = "nao informado";
    var telefonefixo = "";
    var dddcelular = "nao informado";
    var telefonecelular = $("#telefoneCelular").val();

    var latitude = "-23.5806447";
    var longitude = "-46.6187552";

      
    // PEGAR LATITUDE E LONGITUDE
    var request = $.ajax({
        method: "GET",
        async: false,
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+cadastroNumero+"+"+cadastroRua+",+"+cidade+",+"+estado+"&key=AIzaSyCUGRiH2iey-c2WqqeegGF2qpxBDNLsmfQ"
        //data: { email: login, senha: senha }
    }) 
    request.done(function( msg ) {
              
        console.log("Latitude do Google: "+msg["results"][0]["geometry"]["location"]["lat"]+" Longitude do Google: "+msg["results"][0]["geometry"]["location"]["lng"]);
        latitude = msg["results"][0]["geometry"]["location"]["lat"];
        longitude = msg["results"][0]["geometry"]["location"]["lng"];

        localStorage.setItem("Latitude", msg["results"][0]["geometry"]["location"]["lat"]);
        localStorage.setItem("Longitude",msg["results"][0]["geometry"]["location"]["lng"]);

    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
    });
    // PEGAR LATITUDE E LONGITUDE

    console.log("Latitude e Longitude descobertas: "+latitude+" Longitude atual: "+longitude);
      
    // SETAR NA SESSÃO O ID DA CIDADE
    getIdEstadoCidade(estado,cidade);
      
    var idCidade = localStorage.getItem("cidadeId");

    // POPULAR ARRAY DO ENDEREÇO

    var endereco = [];
     
    endereco = {cidadeId: idCidade, Nome: cadastroRua, numero: cadastroNumero, complemento: "n/a", bairro: cadastroBairro, cep: cadastroCep, latitude: latitude, longitude: longitude}   
      
    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/inserir",
        data: { nome: cadastroNome, 
            dddfixo: dddfixo, 
            telefonefixo: telefonefixo, 
            dddcelular: dddcelular, 
            telefonecelular: telefonecelular, 
            email: cadastroEmail, 
            cpf: cadastroCpf, 
            senha: cadastroSenha, 
            endereco: endereco }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Cadastro Realizado com sucesso!");
        // REGISTRAR OS DADOS DA SESSÃO E LOGAR O USUÁRIO
        localStorage.setItem("ClienteId", msg["Data"]["ClienteId"]);
        localStorage.setItem("Nome", msg["Data"]["Nome"]);
        localStorage.setItem("TelefoneFixo", msg["Data"]["TelefoneFixo"]);
        localStorage.setItem("TelefoneCelular", msg["Data"]["TelefoneCelular"]);
        localStorage.setItem("Email", msg["Data"]["Email"]);
        localStorage.setItem("Cpf", msg["Data"]["Cpf"]);
        localStorage.setItem("Senha", msg["Data"]["Senha"]);
        localStorage.setItem("CidadeId", msg["Data"]["Endereco"]["CidadeId"]);
        localStorage.setItem("NomeRua", msg["Data"]["Endereco"]["Nome"]);
        localStorage.setItem("Numero", msg["Data"]["Endereco"]["Numero"]);
        localStorage.setItem("Complemento", msg["Data"]["Endereco"]["Complemento"]);
        localStorage.setItem("Bairro", msg["Data"]["Endereco"]["Bairro"]);
        localStorage.setItem("Cep", msg["Data"]["Endereco"]["Cep"]);
        localStorage.setItem("Latitude", msg["Data"]["Endereco"]["Latitude"]);
        localStorage.setItem("Longitude", msg["Data"]["Endereco"]["Longitude"]);
        console.log("Direcionando o usuário para o dashboard...");
            
        location.href="dashboard.html";

    });
    request.fail(function() {
        console.log("Deu ruim o cadastro");
    });
}


// D0007 - FUNÇÃO PARA PEGAR O ID DO ESTADO CIDADE
function getIdEstadoCidade(estado,cidade){    

    console.log("Inicializando a função para pegar ID da cidade. Estado: "+estado+" Cidade: "+cidade);

    var retorno = 0;
    
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/Estado/Listar"
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        var totEstados = msg["Data"]["List"].length;

        for(i = 0; i < totEstados; i++){

            if(msg["Data"]["List"][i]["Sigla"]==estado){

                retorno = msg["Data"]["List"][i]["EstadoId"];
                console.log("Encontrados o ID do estado: "+estado+", resultado: "+retorno);
                localStorage.setItem("EstadoId", retorno);

            }            

        }
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
    });

    if(localStorage.getItem("EstadoId")!=0){
        var request = $.ajax({
            method: "GET",
            url: "http://api.csprofissionais.com.br/api/Cidade/Listar/"+localStorage.getItem("EstadoId")
            //data: { email: login, senha: senha }
        })
        request.done(function( msg ) {
                  
            var totCidades = msg["Data"]["List"].length;

            for(i = 0; i < totCidades; i++){

                if(msg["Data"]["List"][i]["Nome"]==cidade){

                    retorno = msg["Data"]["List"][i]["CidadeId"];
                    console.log("Encontrados o ID da cidade: "+cidade+", resultado: "+retorno);
                    localStorage.setItem("cidadeId", retorno);

                }            

            }
                  
        });
        request.fail(function() {
            console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
        });
    }else{
        console.log("O ID do estado não foi obtido, não foi possível pegar o ID da cidade.");
    }

}


// D0008 - ATUALIZAR SENHA DO USUARIO
function atualizarSenha(){

    var idUsuario = localStorage.getItem("ClienteId");
    var senhaUsuario = $("#senhaDeAcesso").val();

    localStorage.setItem("Senha", senhaUsuario);
  
    // CAMPOS OBRIGATÓRIOS DA API DO SERVIÇO
    var bairro = localStorage.getItem("Bairro");
    var cpf = localStorage.getItem("Cpf");
    var email = localStorage.getItem("Email");
    var nome = localStorage.getItem("Nome");
    var nomeRua = localStorage.getItem("NomeRua");
    var numero = localStorage.getItem("Numero");
    var telefoneCelular = localStorage.getItem("TelefoneCelular");
    var telefoneFixo = localStorage.getItem("TelefoneFixo");

    var cep = localStorage.getItem("Cep");
    var latitude = localStorage.getItem("Latitude");
    var longitude = localStorage.getItem("Longitude");
    var idCidade = localStorage.getItem("CidadeId");

    console.log("ID DO USUARIO: "+idUsuario);
    console.log("SENHA DO USUARIO: "+senhaUsuario);
    console.log("Vamos atualizar os dados agora...");

    endereco = {cidadeId: idCidade, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude}     

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/Editar",
        data: { clienteid: idUsuario,
            nome: nome,  
            telefonefixo: telefoneFixo, 
            telefonecelular: telefoneCelular, 
            email: email, 
            cpf: cpf, 
            senha: senhaUsuario, 
            endereco: endereco }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Dados (senha) atualizados com sucesso!");            

    });
    request.fail(function() {
        console.log("Não foi possível realizar a operação, tente novamente.");
    });

}

// D0009 - POPULAR FORMULARIOS DA PAGINA DE PERFIL
function popularCamposPerfil(){


    var bairro = localStorage.getItem("Bairro");
    var cep = localStorage.getItem("Cep");
    var cpf = localStorage.getItem("Cpf");
    var email = localStorage.getItem("Email");
    var nome = localStorage.getItem("Nome");
    var nomeRua = localStorage.getItem("NomeRua");
    var numero = localStorage.getItem("Numero");
    var senha = localStorage.getItem("Senha");
    var telefoneCelular = localStorage.getItem("TelefoneCelular");
    var telefoneFixo = localStorage.getItem("TelefoneFixo");

    var estadoSigla = localStorage.getItem("EstadoSigla");

    var cidadeNome = localStorage.getItem("CidadeNome");


    $("#senhaDeAcesso").val(senha);
    $("#nomeClienteEditar").val(nome);
    $("#cpfCliente").val(cpf);
    $("#emailCliente").val(email);
    $("#telefoneFixo").val(telefoneFixo);
    $("#telefoneCelular").val(telefoneCelular);
    $("#enderecoCliente").val(nomeRua);
    $("#numeroCliente").val(numero);
    $("#bairroCliente").val(bairro);
    $("#cepCliente").val(cep);

    new dgCidadesEstados(document.getElementById('estado'), document.getElementById('cidade'), true);

    $('#estado option').each(function () {
        if ($(this).val() == estadoSigla) {
            $(this).prop("selected", true);
        }
    });

    var dg = new dgCidadesEstados(document.getElementById('estado'), document.getElementById('cidade'), false);
    dg.run();

    //$('#estado option').each(function () {
    //    if ($(this).val() == estadoSigla) {
    //        $(this).prop("selected", true);
    //    }
    //});

    $('#cidade option').each(function () {
        if ($(this).text() == cidadeNome) {
            $(this).prop("selected", true);
        }
    });

    $('#estado option').each(function () {
        if ($(this).val() == estadoSigla) {
            $(this).prop("selected", true);
        }
    });


    console.log("Campos de perfil foram carregados!");

}


// D0010 - ATUALIZAR DADOS DO PERFIL
function editarMeuPerfil(){

    var idUsuario = localStorage.getItem("ClienteId");
    var senhaUsuario = localStorage.getItem("Senha");
  
    // RECUPERAR OS DADOS DO USUARIO

    var bairro = $("#bairroCliente").val();
    var cpf = $("#cpfCliente").val();
    var email = $("#emailCliente").val();
    var nome = $("#nomeClienteEditar").val();
    var nomeRua = $("#enderecoCliente").val();
    var numero = $("#numeroCliente").val();
    var telefoneCelular = $("#telefoneCelular").val();
    var telefoneFixo = $("#telefoneFixo").val();

    var cep = $("#cepCliente").val();


    var latitude = localStorage.getItem("Latitude");
    var longitude = localStorage.getItem("Longitude");
    var idCidade = localStorage.getItem("CidadeId");

    console.log("ID DO USUARIO: "+idUsuario);  console.log("Vamos atualizar os dados agora...");

    endereco = {cidadeId: idCidade, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude}     

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/Editar",
        data: { clienteid: idUsuario,
            nome: nome,  
            telefonefixo: telefoneFixo, 
            telefonecelular: telefoneCelular, 
            email: email, 
            cpf: cpf, 
            senha: senhaUsuario, 
            endereco: endereco }
    })
    request.done(function( msg ) {
        alert("Dados atualizados com sucesso!");
        console.log(msg);
        console.log("Dados (outras informações) atualizados com sucesso!");            

    });
    request.fail(function() {
        console.log("Não foi possível realizar a operação, tente novamente.");
    });


}



// D0011 - ATIVAR A PESQUISA DE PROFISSIONAIS
function ativarPesquisa(){   

    var tipoProfissional = $("#tipoProfissionalLista").val();
    var cepForm = $("#cepPesquisa").val();
   
    localStorage.setItem("TipoPesquisa", tipoProfissional);
    localStorage.setItem("cepPesquisa", cepForm);

    // SETAR OS VALORES DA SESSÃO E DIRECIONAR O USUÁRIO PARA A PÁGINA DE PESQUISA
    console.log("Tipo de Profissional: "+tipoProfissional);
    console.log("Cep do formulário: "+cepForm);

    // DIRECIONAR O USUÁRIO
    location.href="resultado.html";


}



// D0012 - LISTAR OS PROFISSIONAIS ENCONTRADOS NA PESQUISA
function procPesquisa(){  

    var tipoPesquisa = localStorage.getItem("TipoPesquisa");
    var cepPesquisa = localStorage.getItem("cepPesquisa");
    var clienteLogado = localStorage.getItem("ClienteId");
    var radius = 6371;
    var dist = 25;
  
    var estrelas = 0;
    var umaEstrela = '<span><i class="fa fa-star" aria-hidden="true"></i></span>';
    var duasEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span>';
    var tresEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span>';
    var quatroEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span>';
    var cincoEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span>';
  
    var nomeProfissional = "";
    var celularProfissional = "";
    var idProfissional = "";
  
    var latLng2 = "";
                                                                    


    console.log("Execução da busca de profissionais...");
    console.log("Tipo de profissional buscado: "+tipoPesquisa);
    console.log("Cep de pesquisa buscado: "+cepPesquisa);

    // FAZER A BUSCA NO SISTEMA
    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/listarporlatlon",
        data: { ClienteId: clienteLogado,  
            Radius: radius, 
            Dist: dist, 
            EspecializacaoId: tipoPesquisa }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Busca realizada com sucesso! Iniciando o desenho na tela:");   
            
        console.log("Total de profissionais encontrados: "+totProfissionais);

        if(!msg["Data"]){
            $("#workInner").html('<h3>Nenhum profissional encontrado<br><small>verique os critérios de busca informados e tente novamente</small></h3>');
        }else{
            
            var totProfissionais = msg["Data"]["List"].length; 
            for(i = 0; i < totProfissionais; i++){

                if(msg["Data"]["List"][i]["NroEstrela"]==1){ estrelas = umaEstrela; }
                if(msg["Data"]["List"][i]["NroEstrela"]==2){ estrelas = duasEstrelas; }
                if(msg["Data"]["List"][i]["NroEstrela"]==3){ estrelas = tresEstrelas; }
                if(msg["Data"]["List"][i]["NroEstrela"]==4){ estrelas = quatroEstrelas; }
                if(msg["Data"]["List"][i]["NroEstrela"]==5){ estrelas = cincoEstrelas; }

                nomeProfissional = msg["Data"]["List"][i]["Nome"];
                celularProfissional = msg["Data"]["List"][i]["Celular"];
                idProfissional = msg["Data"]["List"][i]["ProfissionalId"];

                latPro = msg["Data"]["List"][i]["Latitude"];
                lonPro = msg["Data"]["List"][i]["Longitude"];


                latLng2 = new google.maps.LatLng(latPro,lonPro); 
              
                var marker = new google.maps.Marker({
                    icon: image,
                    position: latLng2,
                    map: map,
                    title:"Ver perfil do profissional"
                });
                google.maps.event.addListener(marker,'click',function(){
                    verProfissional(idProfissional);
                });                                                                   
                                                                   
              

                $("#workInner").append('<div class="row"><div class="col-sm-12 col-xs-12 text-left user-preview"><h4>'+nomeProfissional+'</h4>'+estrelas+'&nbsp;<i class="fa fa-phone" aria-hidden="true"></i>'+celularProfissional+'&nbsp;</p><p class="btn-detalhe"><a style="cursor:pointer;" onclick="verProfissional('+idProfissional+')" class="btn btn-primary">DETALHES</a></p></div></div>');


            }           
        }


    });
    request.fail(function() {
        console.log("Nenhum resultado encontrado na busca de profissionais.");
        $("#workInner").html('<h3>Nenhum profissional encontrado<br><small>verique os critérios de busca informados e tente novamente</small></h3>');

    });


    // DESENHAR GOOGLE MAPS
    console.log("Vamos iniciar o desenho do GoogleMaps");  
    document.getElementById("GoogleMapa").style.height = "120px";


    var latLng = new google.maps.LatLng(-23.566525,-46.649680);  
    var mapOptions = {
        zoom: 12,
        center: latLng,
        panControl: true, 
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('GoogleMapa'), mapOptions);

    var image = {
        url: 'images/icon/icon-36-ldpi.png',
        size: new google.maps.Size(36, 36),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(60, 64)
    };

                                                                    
    // FINAL DESENHAR GOOGLE MAPS
    console.log("Desenho do GoogleMaps finalizado"); 
    console.log("Fim execução da listagem de profissionais encontrados");
                                                                        


}


// D0013 - DIRECIONAR O USUARIO PARA O PERFIL DO PROFISSIONAL
function verProfissional(idProfissional){

    console.log("Exibir perfil do profissional ID: "+idProfissional);
    localStorage.setItem("Profissional", idProfissional);
    console.log("Vamos direcionar o usuário...");
    location.href="detalhes-user.html";

}


// D0014 - ALIMENTAR PÁGINA DE DETALHE PROFISSIONAL
function alimentarDetalheProfissional(){

    var profissional = localStorage.getItem("Profissional");

    var nomePro = "";
    var fotoPro = "";
    var celularPro = "";
    var fixoPro = "";
    var emailPro = "";
    var descricao = "";
    var nroEstrelas = "";
    var ruaPro = "";
    var numeroPro = "";
    var bairroPro = "";

    console.log("Esse é o perfil do profissional ID: "+profissional);
  

    // PEGAR DADOS DO PROFISSIONAL
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/obter/"+profissional
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        console.log("Nome do Profissional: "+msg["Data"]["Nome"]);
        nomePro = msg["Data"]["Nome"];
        fotoPro = msg["Data"]["NomeFoto"];
        celularPro = msg["Data"]["TelefoneCelular"];
        fixoPro = msg["Data"]["TelefoneFixo"];
        emailPro = msg["Data"]["Email"];
        descricao = msg["Data"]["Descricao"];
        nroEstrelas = msg["Data"]["NroEstrela"];
        ruaPro = msg["Data"]["Endereco"]["Nome"];
        numeroPro = msg["Data"]["Endereco"]["Numero"];
        bairroPro = msg["Data"]["Endereco"]["Bairro"];

        // POPULAR HTML COM AS INFORMAÇÕES OBTIDAS
        $('#fotoPro').attr('src','http://www.csprofissionais.com.br/upload/'+fotoPro);
        $('#nomePro').html(nomePro);
        $('#fixoPro').append(fixoPro);
        $('#celularPro').append(celularPro);
        $('#enderecoPro').append(ruaPro+", "+numeroPro+" - "+bairroPro);
        $('#sobrePro').append(descricao);
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        alert("Ocorreu um erro ao tentar pegar os dados desse profissional");
        location.href="dashboard.html";
    });
    


}


// D0015 - BUSCAR ULTIMOS TRABALHOS DO PROFISSIONAL
function buscarUltimosTrabalhos(){

    var profissional = localStorage.getItem("Profissional");
    console.log("Vamos buscar os últimos trabalhos do profissional ID: "+profissional);


    // PEGAR IMAGENS DOS ÚLTIMOS TRABALHOS DO PROFISSIONAL
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterImagens/"+profissional
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        var totImagens = msg["Data"]["Imagens"].length;

        for(i = 0; i < totImagens; i++){

            $('#ultimosTrabalhosWork').append("<img src='http://www.csprofissionais.com.br/upload/"+msg["Data"]["Imagens"][i]["Nome"]+"' style='width:100%;height:auto;margin-bottom:8px;padding:3px;border:1px solid #efefef;' />")
            console.log("Imagem do trabalho do profissional impressa: http://www.csprofissionais.com.br/upload/"+msg["Data"]["Imagens"][i]["Nome"]);

        }  
          
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#ultimosTrabalhosWork').html("<p style='text-align:center;'>Nenhuma imagem encontrada ou disponível no servidor.</p>");          
    });



}


// D0016 - AVALIAR PROFISSIONAL
function avaliarProfissional(){

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");
    var comentario = $('#new-review').val();
    var estrelas = $('#ratings-hidden').val();

    console.log("O CLIENTE: "+idCli);
    console.log("AVALIOU O PROFISSIONAL: "+idPro);
    console.log("ELE DISSE QUE: "+comentario);
    console.log("E DEU: "+estrelas+" ESTRELAS AO ATENDIMENTO");
    console.log("salvando dados...");
 
    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/QualificacaoProfissional",
        data: { ProfissionalId: idPro, 
            ClienteId: idCli, 
            Nota: estrelas, 
            Mensagem: comentario }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Avaliação do Profissional enviada com sucesso");
        alert("Avaliação do Profissional enviada com sucesso!");
        $('#avaliarUsuario').modal("hide");
            

    });
    request.fail(function() {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        $('#avaliarUsuario').modal("hide");
    });


}


// D0017 - CARREGAR COMENTÁRIOS FEITOS PARA O PROFISSIONAL
function carregarComentarios(){

    var idPro = localStorage.getItem("Profissional");
    var nota = 0;

    console.log("Iniciando a busca por comentários a esse profissional: "+idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterQualificacaoProfissional/"+idPro
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        var totAval = msg["Data"]["List"].length;

        for(i = 0; i < totAval; i++){

            nota = msg["Data"]["List"][i]["Nota"] * 2;

            

            $('#areaComentarios').append('<!-- COMENTARIO --><div class="row"><div class="col-sm-12 col-xs-12"><p class="text-right" style="margin-top:-18px;"><i>'+getNome(msg["Data"]["List"][i]["ClienteId"])+' disse:</i><br>'+msg["Data"]["List"][i]["Mensagem"]+'<br><b>Nota:</b> '+nota+'</p></div></div><!-- COMENTARIO --><p>&nbsp;</p>')
            console.log("Avaliação Impressa com sucesso");

        }  
          
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaComentarios').html("<p style='text-align:center;'>Ninguem avaliou esse profissional ainda.</p>");          
    });



}


// D0018 - FUNÇÃO QUE DEVOLVE APENAS O NOME DO CLIENTE
function getNome(idCliente){

    var nome = "Usuário";

    console.log("Iniciando a busca pelo nome do cliente ID: "+idCliente);
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/cliente/obter/"+idCliente
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        console.log("Nome encontrado: "+msg["Data"]["Nome"]); 
        nome = msg["Data"]["Nome"];
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar a informação do cliente");
        return "Usuário";          
    });

    return nome;


}


// D0019 - TROCA DE MENSAGENS ENTRE CLIENTE E PROFISSIONAL
function trocaMensagens(){

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");

    console.log("Vamos começar a exibir as mensagens trocadas entre profissional e cliente");
    console.log("Cliente ID: "+idCli);
    console.log("Profissional ID: "+idPro);
  

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/BuscaMensagens",
        data: { ProfissionalId: idPro, 
            ClienteId: idCli }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Mensagens recuperadas com sucesso");

        var totMsg = msg["Data"]["List"].length;

        if(totMsg==0){
            $('#areaMsg').html("<p>Nenhuma mensagem ainda. Mande a primeira!</p>");
        }else{


            for(i = 0; i < totMsg; i++){

                if(msg["Data"]["List"][i]["Origem"]=="C"){
                    $('#areaMsg').prepend('<div class="row msg_container base_sent"><div class="col-md-12 col-xs-12"><div class="messages msg_sent"><p>'+msg["Data"]["List"][i]["Mensagem"]+'</p><time datetime="2009-11-13T20:00"></time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="images/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div></div>');
                }
                if(msg["Data"]["List"][i]["Origem"]=="P"){
                    $('#areaMsg').prepend('<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="images/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>'+msg["Data"]["List"][i]["Mensagem"]+'</p><time datetime="2009-11-13T20:00"></time></div></div></div>');
                }  

            }

        }
            

    });
    request.fail(function() {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });

    console.log("Final execução da busca por mensagens entre profissional e cliente");

}


// D0020 - ENVIAR MENSAGEM PARA PROFISSIONAL
function enviarNovaMensagen(){

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");
    var mensagem = $('#msgField').val();
    var origem = "C";

    console.log("Cliente quer enviar mensagem para profissional");
    console.log("Cliente ID: "+idCli);
    console.log("Profissional ID: "+idPro);
    console.log("Mensagem: "+mensagem);

    console.log("Enviando Menagem....");
  
    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/Inserir",
        data: { ClienteId: idCli, 
            ProfissionalId: idPro,
            Mensagem: mensagem,
            Origem: origem }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Mensagem foi enviada com sucesso");

        // LIMPAR O CAMPO DE MENSAGEM
        $('#msgField').val("");
            
        // ATUALIZAR A PÁGINA PARA MOSTRAR AS MENSAGENS ATUALIZADAS
        location.reload();            

    });
    request.fail(function() {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        //location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });


  

}
function enviarNovaMensagenPro(){

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");
    var mensagem = $('#msgField').val();
    var origem = "P";

    console.log("Cliente quer enviar mensagem para profissional");
    console.log("Cliente ID: "+idCli);
    console.log("Profissional ID: "+idPro);
    console.log("Mensagem: "+mensagem);

    console.log("Enviando Menagem....");
  
    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/Inserir",
        data: { ClienteId: idCli, 
            ProfissionalId: idPro,
            Mensagem: mensagem,
            Origem: origem }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Mensagem foi enviada com sucesso");

        // LIMPAR O CAMPO DE MENSAGEM
        $('#msgField').val("");
            
        // ATUALIZAR A PÁGINA PARA MOSTRAR AS MENSAGENS ATUALIZADAS
        location.reload();            

    });
    request.fail(function() {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        //location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });


  

}


// D0021 - PEGAR APENAS O NOME DO PROFISSIONAL
function getNomeProfissional(){

    var idPro = localStorage.getItem("Profissional");
    console.log("Vamos procurar o nome do profissional ID: "+idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/obter/"+idPro
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        $('#nomeProfissional').html(msg["Data"]["Nome"]); 
        console.log("Nome encontrado! é "+msg["Data"]["Nome"]);
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar a informação do profissional");
                  
    });  

}


// D0022 - PEGAR TODAS AS MENSAGENS EM QUE O CLIENTE INTERAGIU COM UM PROFISSIONAL
function TodasMensagens(){

    var idCli = localStorage.getItem("ClienteId");

    console.log("Iniciando a busca para saber se o cliente trocou mensagens com algum profissional");

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/mensagem/ListProfissionaisMensagemCliente/"+idCli
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        var totInt = msg["Data"]["List"].length;

        for(i = 0; i < totInt; i++){
          
            $('#areaTodasMsg').prepend('<div class="row" onclick="interagirProfissional(' + msg["Data"]["List"][i]["ProfissionalId"] + ');" style="padding:20px;"><div class="col-xs-3 col-md-3" style="padding-right:0px;"><img style="max-height:75px;max-width:75px;" src="http://www.csprofissionais.com.br/upload/' + msg["Data"]["List"][i]["NomeFoto"] + '" class="img-responsive" alt="" style="width:100%;" /></div><div class="col-xs-9 col-md-9"><div><b style="color:#d32f2f;">' + msg["Data"]["List"][i]["Nome"] + '</b><div class="mic-info"><i>celular: ' + msg["Data"]["List"][i]["TelefoneCelular"] + '</i></div></div><div class="comment-text">clique para abrir a conversa</div></div></div>');
            
        }  
          
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaTodasMsg').html("<p style='text-align:center;'>Ocorreu um erro em carregar as mensagens. Tente novamente mais tarde</p>");          
    });


}


// D0023 - SETAR E DIRECIONAR O USUARIO PARA A PAGINA DO PROFISSIONAL QUE ELE QUER VER A CONVERSA
function interagirProfissional(idPro){

    console.log("Vamos direcionar o usuário para o histórico de conversas entre ele e o profissional ID: "+idPro);

    localStorage.setItem("Profissional", idPro);

    console.log("Direcionando...");

    location.href="mensagens-trocadas.html";


}


// D0025 - UPLOAD DE IMAGENS
function uploadImagens(){

    var idProfissionalLogado = localStorage.getItem("idProfissionalLogado");

    var nomeFoto = "";
    var descricao = "";

    console.log("Iniciando a rotina para upload de imagem do profissional ID: "+idProfissionalLogado);

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/InserirImagem",
        data: { ProfissionalId: idProfissionalLogado, 
            Nome: nomeFoto,
            Descricao: descricao }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Imagem carregada com sucesso em http://www.csprofissionais.com.br/upload/"+nomeFoto);
            
    });
    request.fail(function() {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        //location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });

    console.log("Encerrada a rotina para upload de imagem do profissional ID: "+idProfissionalLogado);        


}


// D0026 - FUNÇÃO PARA O AUTO COMPLETE NO CADASTRO DO PROFISSIONAL
function autoCompletePro(){

    //$('#tipoProfissionalLista').autocomplete({
    //    lookup: function (query, done) {
    //        // Do ajax call or lookup locally, when done,
    //        // call the callback and pass your results:
    //        var result = {
    //            suggestions: [
                                 
    //                { "value": "Advogado", "data": "12" },   
    //                { "value": "Analista de Sistemas", "data": "1" },   
    //                { "value": "Azulejista", "data": "10" },   
    //                { "value": "Baba", "data": "9" },  
    //                { "value": "Desenvolvedor", "data": "2" },
    //                { "value": "Eletricista", "data": "4" },
    //                { "value": "Encanador", "data": "5" },
    //                { "value": "Faxineiro", "data": "8" },
    //                { "value": "Gesseiro", "data": "11" },
    //                { "value": "Pedreiro", "data": "3" }, 
                            
    //            ]
    //        };

    //        done(result);
    //    },

    //});
}


// D0027 - FUNÇÃO PARA LOGAR O USUÁRIO COMO PROFISSIONAL
function procLoginPro(){  

    var login = $("#loginPro").val();
    var senha = $("#senhaPro").val();

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/Login",
        data: { documento: login, senha: senha }
    })
    request.done(function( msg ) {

        if(!msg["Data"]){
            alert("Login ou Senha incorretos");
        }else{

            localStorage.setItem("idProfissionalLogado", msg["Data"]["ProfissionalId"]);
            localStorage.setItem("Nome", msg["Data"]["Nome"]);
            localStorage.setItem("TelefoneFixo", msg["Data"]["TelefoneFixo"]);
            localStorage.setItem("TelefoneCelular", msg["Data"]["TelefoneCelular"]);
            localStorage.setItem("Email", msg["Data"]["Email"]);
            localStorage.setItem("Cpf", msg["Data"]["DocumentoLogin"]);
            localStorage.setItem("Senha", msg["Data"]["Senha"]);
            localStorage.setItem("CidadeId", msg["Data"]["Endereco"]["CidadeId"]);
            localStorage.setItem("CidadeNome", msg["Data"]["Endereco"]["CidadeNome"]);
            localStorage.setItem("EstadoSigla", msg["Data"]["Endereco"]["EstadoSigla"]);
            localStorage.setItem("NomeRua", msg["Data"]["Endereco"]["Nome"]);
            localStorage.setItem("Numero", msg["Data"]["Endereco"]["Numero"]);
            localStorage.setItem("Complemento", msg["Data"]["Endereco"]["Complemento"]);
            localStorage.setItem("Bairro", msg["Data"]["Endereco"]["Bairro"]);
            localStorage.setItem("Cep", msg["Data"]["Endereco"]["Cep"]);
            localStorage.setItem("Latitude", msg["Data"]["Endereco"]["Latitude"])
            localStorage.setItem("Longitude", msg["Data"]["Endereco"]["Longitude"]);
            localStorage.setItem("NomefotoPro", msg["Data"]["NomeFoto"]);
            location.href="dashboard-pro.html";

        }  

    });
    request.fail(function() {
        alert("Não foi possível realizar o seu login, tente novamente");
        location.href="index.html";
    });

}


// D0028 - FUNÇÃO PARA VERIFICAR SE O USUÁRIO PROFISSIONAL ESTÁ LOGADO
function verificarSessaoPro(){

    var sessao = localStorage.getItem("idProfissionalLogado");
    if(!sessao){
        alert("Por favor, faça seu login novamente");
        location.href("index.html");
    }

}  


// D0029 - POPULAR HTML COM INFORMAÇÕES VINDAS DOS SERVIÇOS (PROFISSIONAL)
function popularHtmlPro(){

    // ESCREVER O NOME DO USUÁRIO NO HEADER DA PÁGINA             
    $("#nomeUsuario").html(localStorage.getItem("Nome"));  
    // SETAR O CEP NO CAMPO DE BUSCA AUTOMATICAMENTE  
    $("#cepPesquisa").val(localStorage.getItem("Cep"));

    $('#fotoPro').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomefotoPro"));


}

// D0030 - PEGAR TODAS AS MENSAGENS EM QUE O PROFISSIONAL INTERAGIU COM UM CLIENTE
function TodasMensagensPro(){

    var idCli = localStorage.getItem("idProfissionalLogado");

    console.log("Iniciando a busca para saber se o profissional trocou mensagens com algum cliente");

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/mensagem/ListaClientesMensagemProfissional/"+idCli
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        if(msg["Data"]){
            var totInt = msg["Data"]["List"].length;

            for(i = 0; i < totInt; i++){
          
                $('#areaTodasMsg').prepend('<div class="row" onclick="interagirProfissionalPro('+msg["Data"]["List"][i]["ClienteId"]+');" style="padding:20px;"><div class="col-xs-12 col-md-12"><div><b style="color:#d32f2f;">'+msg["Data"]["List"][i]["Nome"]+'</b><div class="mic-info"><i>celular: '+msg["Data"]["List"][i]["TelefoneCelular"]+'</i></div></div><div class="comment-text">clique para abrir a conversa</div></div></div>');
            
            }  
        }else{
            $('#areaTodasMsg').html("<p style='text-align:center;padding:25px;'>Nenhuma mensagem ainda. Tente novamente mais tarde</p>");  
        }
          
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaTodasMsg').html("<p style='text-align:center;padding:25px'>Nenhuma mensagem ainda</p>");          
    });


}


// D0031 - SETAR E DIRECIONAR O USUARIO PROFISSIONAL PARA A PAGINA DO CLIENTE QUE ELE QUER VER A CONVERSA
function interagirProfissionalPro(idPro){

    console.log("Vamos direcionar o usuário para o histórico de conversas entre ele e o cliente ID: "+idPro);

    localStorage.setItem("Cliente", idPro);

    console.log("Direcionando...");

    location.href="mensagens-trocadas-pro.html";


}


// D0032 - PEGAR APENAS O NOME DO CLIENTE
function getNomeCliente(){

    var idPro = localStorage.getItem("Cliente");
    console.log("Vamos procurar o nome do Cliente ID: "+idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/cliente/obter/"+idPro
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        $('#nomeCliente').html(msg["Data"]["Nome"]); 
        console.log("Nome encontrado! é "+msg["Data"]["Nome"]);
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar a informação do cliente");
                  
    });  

}



// D0033 - TROCA DE MENSAGENS ENTRE CLIENTE E PROFISSIONAL
function trocaMensagensPro(){

    var idPro = localStorage.getItem("Cliente");
    var idCli = localStorage.getItem("idProfissionalLogado");

    console.log("Vamos começar a exibir as mensagens trocadas entre profissional e cliente");
    console.log("Profissional ID: "+idCli);
    console.log("Cliente ID: "+idPro);
  

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/BuscaMensagens",
        data: { ProfissionalId: idCli, 
            ClienteId: idPro }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Mensagens recuperadas com sucesso");

        var totMsg = msg["Data"]["List"].length;

        if(totMsg==0){
            $('#areaMsg').html("<p>Nenhuma mensagem ainda. Mande a primeira!</p>");
        }else{


            for(i = 0; i < totMsg; i++){

                if(msg["Data"]["List"][i]["Origem"]=="C"){
                    
                    $('#areaMsg').prepend('<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="images/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>'+msg["Data"]["List"][i]["Mensagem"]+'</p><time datetime="2009-11-13T20:00"></time></div></div></div>');
                }
                if(msg["Data"]["List"][i]["Origem"]=="P"){

                    $('#areaMsg').prepend('<div class="row msg_container base_sent"><div class="col-md-12 col-xs-12"><div class="messages msg_sent"><p>'+msg["Data"]["List"][i]["Mensagem"]+'</p><time datetime="2009-11-13T20:00"></time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="images/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div></div>');
                  
                }  

            }

        }
            

    });
    request.fail(function() {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });

    console.log("Final execução da busca por mensagens entre profissional e cliente");

}


// D0034 - SOLICITAÇÃO DE DESTAQUE FEITA PELO PROFISSIONAL
function solicDestaque(){

    var idPro = localStorage.getItem("idProfissionalLogado");
  

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/SolicitaDestaque/"+idPro
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        //$('#nomeCliente').html(msg["Data"]["Nome"]); 
        console.log("Solicitação de destaque realizada com sucesso");
        alert("Solicitação de destaque realizada com sucesso");
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar realizar a solicitação");
                  
    });


}



// D0035 - CARREGAR COMENTÁRIOS FEITOS PARA O PROFISSIONAL (PROFISSIONAL)
function carregarComentariosPro(){

    var idPro = localStorage.getItem("idProfissionalLogado");
    var nota = 0;

    console.log("Iniciando a busca por comentários a esse profissional: "+idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterQualificacaoProfissional/"+idPro
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
          
        if(msg["Data"]){
            var totAval = msg["Data"]["List"].length;

            for(i = 0; i < totAval; i++){

                nota = msg["Data"]["List"][i]["Nota"] * 2;

            

                $('#areaComentarios').append('<!-- COMENTARIO --><div class="row"><div class="col-sm-12 col-xs-12"><p class="text-right" style="margin-top:-18px;"><i>'+getNome(msg["Data"]["List"][i]["ClienteId"])+' disse:</i><br>'+msg["Data"]["List"][i]["Mensagem"]+'<br><b>Nota:</b> '+nota+'</p></div></div><!-- COMENTARIO --><p>&nbsp;</p>')
                console.log("Avaliação Impressa com sucesso");

            }  
        }else{
            $('#areaComentarios').html("<p style='text-align:center;'>Ninguem o avaliou ainda.</p>"); 
        }
          
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaComentarios').html("<p style='text-align:center;'>Ninguem o avaliou ainda.</p>");          
    });



}


// D0036 - POPULAR FORMULARIOS DA PAGINA DE PERFIL
function popularCamposPerfilPro(){


    var bairro = localStorage.getItem("Bairro");
    var cep = localStorage.getItem("Cep");
    var cpf = localStorage.getItem("Cpf");
    var email = localStorage.getItem("Email");
    var nome = localStorage.getItem("Nome");
    var nomeRua = localStorage.getItem("NomeRua");
    var numero = localStorage.getItem("Numero");
    var senha = localStorage.getItem("Senha");
    var telefoneCelular = localStorage.getItem("TelefoneCelular");
    var telefoneFixo = localStorage.getItem("TelefoneFixo");
    var estadoSigla = localStorage.getItem("EstadoSigla");

    var cidadeNome = localStorage.getItem("CidadeNome");

    $("#senhaDeAcesso").val(senha);
    $("#nomeClienteEditar").val(nome);
    $("#cpfCliente").val(cpf);
    $("#emailCliente").val(email);
    $("#telefoneFixo").val(telefoneFixo);
    $("#telefoneCelular").val(telefoneCelular);
    $("#enderecoCliente").val(nomeRua);
    $("#numeroCliente").val(numero);
    $("#bairroCliente").val(bairro);
    $("#cepCliente").val(cep);

    new dgCidadesEstados(document.getElementById('estado'), document.getElementById('cidade'), true);

    $('#estado option').each(function () {
        if ($(this).val() == estadoSigla) {
            $(this).prop("selected", true);
        }
    });

    var dg = new dgCidadesEstados(document.getElementById('estado'), document.getElementById('cidade'), false);
    dg.run();

    //$('#estado option').each(function () {
    //    if ($(this).val() == estadoSigla) {
    //        $(this).prop("selected", true);
    //    }
    //});

    $('#cidade option').each(function () {
        if ($(this).text() == cidadeNome) {
            $(this).prop("selected", true);
        }
    });

    $('#estado option').each(function () {
        if ($(this).val() == estadoSigla) {
            $(this).prop("selected", true);
        }
    });

  

    console.log("Campos de perfil foram carregados!");

}



// D0037 - ATUALIZAR SENHA DO PROFISSIONAL
function atualizarSenhaPro(){

    var idUsuario = localStorage.getItem("idProfissionalLogado");
    var senhaUsuario = $("#senhaDeAcesso").val();

    localStorage.setItem("Senha", senhaUsuario);
  
    // CAMPOS OBRIGATÓRIOS DA API DO SERVIÇO
    var bairro = localStorage.getItem("Bairro");
    var cpf = localStorage.getItem("Cpf");
    var email = localStorage.getItem("Email");
    var nome = localStorage.getItem("Nome");
    var nomeRua = localStorage.getItem("NomeRua");
    var numero = localStorage.getItem("Numero");
    var telefoneCelular = localStorage.getItem("TelefoneCelular");
    var telefoneFixo = localStorage.getItem("TelefoneFixo");

    var cep = localStorage.getItem("Cep");
    var latitude = localStorage.getItem("Latitude");
    var longitude = localStorage.getItem("Longitude");
    var idCidade = localStorage.getItem("CidadeId");

    console.log("ID DO PROFISSIONAL: "+idUsuario);
    console.log("SENHA DO PROFISSIONAL: "+senhaUsuario);
    console.log("Vamos atualizar os dados agora...");

    endereco = {cidadeId: idCidade, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude}     

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/editar",
        data: { profissionalid: idUsuario,
            nome: nome,  
            telefonefixo: telefoneFixo, 
            telefonecelular: telefoneCelular, 
            email: email, 
            cpf: cpf, 
            senha: senhaUsuario, 
            endereco: endereco }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Dados (senha) atualizados com sucesso!");            

    });
    request.fail(function() {
        console.log("Não foi possível realizar a operação, tente novamente.");
    });

}



// D0038 - ATUALIZAR DADOS DO PROFISSIONAL
function editarMeuPerfilPro(){

    var idUsuario = localStorage.getItem("ClienteId");
    var senhaUsuario = localStorage.getItem("Senha");
  
    // RECUPERAR OS DADOS DO USUARIO

    var bairro = $("#bairroCliente").val();
    var cpf = $("#cpfCliente").val();
    var email = $("#emailCliente").val();
    var nome = $("#nomeClienteEditar").val();
    var nomeRua = $("#enderecoCliente").val();
    var numero = $("#numeroCliente").val();
    var telefoneCelular = $("#telefoneCelular").val();
    var telefoneFixo = $("#telefoneFixo").val();

    var cep = $("#cepCliente").val();


    var latitude = localStorage.getItem("Latitude");
    var longitude = localStorage.getItem("Longitude");
    var idCidade = localStorage.getItem("CidadeId");

    console.log("ID DO USUARIO: "+idUsuario);  console.log("Vamos atualizar os dados agora...");

    endereco = {cidadeId: idCidade, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude}     

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/editar",
        data: { profissionalid: idUsuario,
            nome: nome,  
            telefonefixo: telefoneFixo, 
            telefonecelular: telefoneCelular, 
            email: email, 
            cpf: cpf, 
            senha: senhaUsuario, 
            endereco: endereco }
    })
    request.done(function( msg ) {
        alert("Dados atualizados com sucesso!");
        console.log(msg);
        console.log("Dados (outras informações) atualizados com sucesso!");            

    });
    request.fail(function() {
        console.log("Não foi possível realizar a operação, tente novamente.");
    });


}


// D0039 - CLIENTE SOLICITA CONTATO DO PROFISSIONAL
function solicContato(){

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/SolicitarContato",
        data: { ClienteId: idCli,
            ProfissionalId: idPro }
    })
    request.done(function( msg ) {

        console.log(msg);
        console.log("Solicitação de contato realizada com sucesso!");     
        alert("Solicitação de contato realizada com sucesso");       

    });
    request.fail(function() {
        console.log("Não foi possível realizar a operação, tente novamente.");
    });

}

// D0040 - Busca Especializacoes
profissional.carregarEspecializacoes = function (data) {
    if (data.Data.List.length > 0) {

        $(data.Data.List).each(function (index, especializacao) {
            $("#EspecializacaoId").append("<option value='" + especializacao.EspecializacaoId + "'>" + especializacao.Nome + " </option>");
            currencies.push(especializacao.Nome);

        });
        profissional.disabledElement("#EspecializacaoId", false);
        listEspec = data.Data.List;
        //var currencies = [{ data: 'analista', value: 'analista' }, { data: 'advogado', value: 'advogado' }];

        //$("#autocomplete-profissionais").autocomplete({
        $("#tipoProfissionalLista").autocomplete({
            lookup: currencies
        });
    }
};

profissional.clearDropDown = function (attribute, texto) {
    $(attribute).html("");
    $(attribute).append("<option value=''>" + texto + "</option>");
}
profissional.disabledElement = function (attribute, action) {
    $(attribute).prop("disabled", action);
}

profissional.erroCarregarEspecializacoes = function (erro) {
    //gn.messageDialog("", false, Plataforma.Resources.JavaScript.MensagemJsErro, Plataforma.Resources.JavaScript.MensagemJsErroObterCampanhas);
}


$.ajax({
    type: "GET",
    url: "http://api.csprofissionais.com.br/api/Especializacao/Listar",
    success: profissional.carregarEspecializacoes,
    error: profissional.erroCarregarEspecializacoes,
    dataType: "json"
});

// D0041 - Carrega Endereço pelo CEP Cli
$(".itfCEPCli").change(function () {
    var cep_code = $(this).val();
    if (cep_code.length <= 0) return;
    var requestCep = $.ajax({
        method: "GET",
        async: true,
        url: "http://apps.widenet.com.br/busca-cep/api/cep/" + cep_code + ".json"
    })
    requestCep.done(function (dados) {

        $(".itfEnderecoCli").val(dados.address);
        $(".itfBairroCli").val(dados.district);

        $('.itfEstadoCli option').each(function () {
            if ($(this).val() == dados.state) {
                $(this).prop("selected", true);
            }
        });

        var dg = new dgCidadesEstados(document.getElementById('estado'), document.getElementById('cidade'), false);
        dg.run();


        $('.itfCidadeCli option').each(function () {
            if ($(this).text() == dados.city) {
                $(this).prop("selected", true);
            }
        });

    });
    requestCep.fail(function (erro) {
        var ret = erro;
        console.log("Ocorreu um erro ao tentar carregar a CEP");
    });

    function buscaCidadesCli(city) {
        $.ajax({
            method: "GET",
            async: true,
            url: "http://api.csprofissionais.com.br/api/Cidade/ListarEstado/" + $(".itfEstadoCli").val(),
            success: function (msg) {
                var totCidades = msg["Data"]["List"].length;

                $(msg.Data.List).each(function (index, cidade) {
                    $("#cidade").append("<option value='" + cidade.CidadeId + "'>" + cidade.Nome + " </option>");

                });

                $("#cidade option:selected").text(dados.city);
                // $('.id_100 option[value=val2]').attr('selected', 'selected');

                for (i = 0; i < totCidades; i++) {

                    if (msg["Data"]["List"][i]["Nome"] == city) {

                        retorno = msg["Data"]["List"][i]["CidadeId"];
                        console.log("Encontrados o ID da cidade: " + city + ", resultado: " + retorno);
                        localStorage.setItem("cidadeId", retorno);

                    }

                }
            }
            //data: { email: login, senha: senha }
        });

    }

});

// D0042 - Carrega Endereço pelo CEP Pro
$(".itfCEP").change(function () {
    var cep_code = $(this).val();
    if (cep_code.length <= 0) return;
    var requestCep = $.ajax({
        method: "GET",
        async: true,
        url: "http://apps.widenet.com.br/busca-cep/api/cep/" + cep_code + ".json"
    })
    requestCep.done(function (dados) {

        $(".itfEndereco").val(dados.address);
        $(".itfBairro").val(dados.district);

        $('.itfEstado option').each(function () {
            if ($(this).val() == dados.state) {
                $(this).prop("selected", true);
            }
        });

        var dg = new dgCidadesEstados(document.getElementById('estadoPro'), document.getElementById('cidadePro'), false);
        dg.run();


        $('.itfCidade option').each(function () {
            if ($(this).text() == dados.city) {
                $(this).prop("selected", true);
            }
        });

    });
    requestCep.fail(function (erro) {
        var ret = erro;
        console.log("Ocorreu um erro ao tentar carregar a CEP");
    });

    function buscaCidades(city) {
        $.ajax({
            method: "GET",
            async: true,
            url: "http://api.csprofissionais.com.br/api/Cidade/ListarEstado/" + $(".itfEstado").val(),
            success: function (msg) {
                var totCidades = msg["Data"]["List"].length;

                $(msg.Data.List).each(function (index, cidade) {
                    $("#cidadePro").append("<option value='" + cidade.CidadeId + "'>" + cidade.Nome + " </option>");

                });

                $("#cidadePro option:selected").text(dados.city);
                // $('.id_100 option[value=val2]').attr('selected', 'selected');

                for (i = 0; i < totCidades; i++) {

                    if (msg["Data"]["List"][i]["Nome"] == city) {

                        retorno = msg["Data"]["List"][i]["CidadeId"];
                        console.log("Encontrados o ID da cidade: " + city + ", resultado: " + retorno);
                        localStorage.setItem("cidadeId", retorno);

                    }

                }
            }
            //data: { email: login, senha: senha }
        });

    }

});


$("#formulario").submit(function () {
    var formData = new FormData(this);

    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: formData,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false,
        xhr: function () {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                myXhr.upload.addEventListener('progress', function () {
                    /* faz alguma coisa durante o progresso do upload */
                }, false);
            }
            return myXhr;
        }
    });
});

// D0043 - Pre Cadastro Profissional (verifica se tem imagem)
function procCadastroProPre() {

    var msgerro = "";
    if ($("#cadastroNomePro").val() == "")
        msgerro = msgerro + "* Nome é obrigatório!  \r\n";

    if ($("#tipoProfissionalLista").val() == "")
        msgerro = msgerro + "* Especialização é obrigatório!  \r\n";

    if ($("#telefoneCelularPro").val() == "")
        msgerro = msgerro + "* Telefone Celular é obrigatório!  \r\n";

    if ($("#cadastroCnpjPro").val() == "")
        msgerro = msgerro + "* CPF/CNPJ é obrigatório! \r\n";

    if ($("#cadastroCepPro").val() == "")
        msgerro = msgerro + "* CEP é obrigatório! \r\n";

    if ($("#cadastroRuaPro").val() == "")
        msgerro = msgerro + "* Endereço é obrigatório! \r\n";

    if ($("#cadastroNumeroPro").val() == "")
        msgerro = msgerro + "* Número é obrigatório! \r\n";

    if ($("#cadastroBairroPro").val() == "")
        msgerro = msgerro + "* Bairro é obrigatório! \r\n";

    if ($("#estadoPro").val() == "")
        msgerro = msgerro + "* Estado é obrigatório! \r\n";

    if ($("#cidadePro").val() == "" || $("#cidadePro").val() == null)
        msgerro = msgerro + "* Cidade é obrigatório! \r\n";


    if ($("#cadastroSenhaPro").val() == "")
        msgerro = msgerro + "* Senha é obrigatório! \r\n";

    if (msgerro != "") {
        alert(msgerro);
        return false;
    }


    if (form != undefined) {
        $("#conteudoLoginPro").attr("style", "display:none");
        $("#divAguardeCadPro").attr("style", "display:block;text-align:center; width:100%")
        $.ajax({
            url: 'http://api.csprofissionais.com.br/api/imagem/PostImagem', // Url do lado server que vai receber o arquivo
            data: form,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                nomeFoto = data[0];
                procCadastroPro();
                //retorno = data;
                //alert(data); // utilizar o retorno
            },
            beforeSend: function () {
                $("#conteudoLoginPro").attr("style", "display:none");
                $("#divAguardeCadPro").attr("style", "display:block")
            },
            complete: function () {
                $("#conteudoLoginPro").attr("style", "display:block");
                $("#divAguardeCadPro").attr("style", "display:none")
            },
        });
    } else {
        $("#conteudoLoginPro").attr("style", "display:none");
        $("#divAguardeCadPro").attr("style", "display:block;text-align:center; width:100%")
        procCadastroPro();
    }

};





// D0044 - BUSCAR ULTIMOS TRABALHOS DO PROFISSIONAL LOGAGO
function buscarUltimosTrabalhosPro(){

    var profissional = localStorage.getItem("idProfissionalLogado");
    console.log("Vamos buscar os últimos trabalhos do profissional ID: "+profissional);


    // PEGAR IMAGENS DOS ÚLTIMOS TRABALHOS DO PROFISSIONAL
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterImagens/"+profissional
        //data: { email: login, senha: senha }
    })
    request.done(function( msg ) {
      
      if(msg["Data"]["Imagens"].length>0){    
        var totImagens = msg["Data"]["Imagens"].length;

        for(i = 0; i < totImagens; i++){

            $('#ultimosTrabalhosWork').prepend("<img src='http://www.csprofissionais.com.br/upload/"+msg["Data"]["Imagens"][i]["Nome"]+"' style='width:100%;height:auto;margin-bottom:8px;padding:3px;border:1px solid #efefef;' />")
            console.log("Imagem do trabalho do profissional impressa: http://www.csprofissionais.com.br/upload/"+msg["Data"]["Imagens"][i]["Nome"]);

        }  
      }else{
            $('#ultimosTrabalhosWork').prepend("<p>Você ainda não enviou nenhum trabalho</p>");
      }  
          
          
    });
    request.fail(function() {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#ultimosTrabalhosWork').prepend("<p style='text-align:center;'>Nenhuma imagem encontrada ou disponível no servidor.</p>");          
    });



}