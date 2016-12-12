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
// D0045 - UPLOAD DE NOVO TRABALHO DO PROFISSIONAL
// D0046 - APAGAR IMAGEM DA GALERIA DE TRABALHOS DO PROFISSIONAL
// D0047 - ATUALIZAR FOTO DE PERFIL DO PROFISSIONAL
// D0048 - BUSCAR SOLICITAÇÕES DE CONTATO DO PROFISSIONAL
// D0049 - VERIFICAR A VERSÃO ATUAL DO APLICATIVO
//
//
//
// #############################################################################


var form;
var nomeFoto;
// SETAR A VERSÃO ATUAL DO APLICATIVO NESSA VARIAVEL
var versaoApp = "v1.1";

var especializacaoData;

profissional = this;
var listEspec;
var currencies = [];

// D0001 - FUNÇÃO PARA LOGAR O USUÁRIO
function procLogin() {

    var login = $("#login").val();
    var senha = $("#senha").val();

    if (login == "" || senha == "") {
        alert("Login e Senha são obrigatórios");
        return 1;
    }

    $("#conteudoLogin2").attr("style", "display:none");
    $("#divAguardeLogCli").attr("style", "display:block;text-align:center; width:100%");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/Login",
        data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        if (!msg["Data"]) {
            alert("Login ou Senha incorretos");
            $("#conteudoLogin2").attr("style", "display:block");
            $("#divAguardeLogCli").attr("style", "display:none;text-align:center; width:100%");
        } else {

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
            // $("#conteudoLogin2").attr("style", "display:block");
            // $("#divAguardeLogCli").attr("style", "display:none;text-align:center; width:100%");
            location.href = "dashboard.html";

        }

    });
    request.fail(function (msg) {
        alert("Login/Senha incorreto!");
        $("#conteudoLogin2").attr("style", "display:block");
        $("#divAguardeLogCli").attr("style", "display:none;text-align:center; width:100%");
        var erro = msg;
        //location.href = "index.html";
    });

}


// D0024 - CADASTRO DE USUÁRIOS TIPO PROFISSIONAL
function procCadastroPro() {

    var msgerro = "";
    if ($("#cadastroNomePro").val().trim() == "")
        msgerro = msgerro + "* Nome é obrigatório!  \r\n";

    if ($("#tipoProfissionalLista").val().trim() == "")
        msgerro = msgerro + "* Especialização é obrigatório!  \r\n";
    
    if ($("#cadastroCnpjPro").val() == "")
        msgerro = msgerro + "* CPF/CNPJ é obrigatório! \r\n";
    else if ($("#cadastroCnpjPro").val().length < 10 || $("#cadastroCnpjPro").val().length > 15)
        msgerro = msgerro + "* CPF/CNPJ inválido! \r\n";


    if ($("#telefoneCelularPro").val() == "")
        msgerro = msgerro + "* Telefone Celular é obrigatório!  \r\n";
    else if ($("#telefoneCelularPro").val().length < 10 || $("#telefoneCelularPro").val().length > 11)
        msgerro = msgerro + "* Telefone Celular inválido!  \r\n";

    if ($("#telefoneFixoPro").val() != "" && ($("#telefoneFixoPro").val().length < 10 || $("#telefoneFixoPro").val().length > 10))
        msgerro = msgerro + "* Telefone fixo inválido!  \r\n";
        
    if ($("#cadastroCepPro").val() == "")
        msgerro = msgerro + "* CEP é obrigatório! \r\n";
    else if ($("#cadastroCepPro").val().length != 8)
        msgerro = msgerro + "* CEP inválido! \r\n";

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

    if ($("#cadastroCurriculoPro").val() == "")
        msgerro = msgerro + "* Curriculum é obrigatório! \r\n";
   

    if (msgerro != "") {
        alert(msgerro);
        return false;
    }

    //var validaDocumento = validaCpfCnpj($("#cadastroCnpjPro").val());

    //if (validaDocumento != true) {
    //    alert("* CPF/CNPJ inválido!");
    //    $("#cadastroCnpjPro").focus();
    //    return false;
    //}

    if ($("#cadastroEmailPro").val() != "") {
        var valida = validacaoEmail($("#cadastroEmailPro").val());
        if (valida != true) {
            alert("* E-mail inválido!");
            $("#cadastroEmailPro").focus();
            return false;
        }
    }

    if ($("#telefoneCelularPro").val().length < 10) {
        alert("Telefone Celular inválido!");
        $("#telefoneCelularPro").focus();
        return false;
    }

    if ($("#cadastroSenhaPro").val().length < 6) {
        alert("Senha deve ter no mínimo 6 caracters!");
        $("#cadastroSenhaPro").focus();
        return false;
    }

    $('#conteudoLoginPro').attr("style", "display:none");
    $('#divAguardeCadPro').attr("style", "display:block; text-align:center; width:100%;");

    var profs = window.currencies;
    var existProf = false;
    for (var i = 0; i < profs.length; i++) {
        
        if(profs[i] == $("#tipoProfissionalLista").val() )
        {
            existProf = true;
        }
    }

    if (existProf == false)
    {
        alert("Profissão não Encontrada!");
        $("#tipoProfissionalLista").focus();
        $('#conteudoLoginPro').attr("style", "display:block");
        $('#divAguardeCadPro').attr("style", "display:none; text-align:center; width:100%;");
        return;
    }

    //var request = $.ajax({
    //    method: "POST",
    //    //url: "http://api.csprofissionais.com.br/api/profissional/ValidaProfissao",
    //    url: "http://localhost:49723/api/profissional/ValidaProfissao",
    //    data: {
    //        Profissao: $("#tipoProfissionalLista").val()           
    //    }
    //})
    //request.done(function (msg) {

    //    if(msg["Retorno"]==false)
    //    {
    //        alert("Profissão não Encontrada!");

    //        return;
    //    }
    //});

    //request.fail(function () {
    //});


    $('#conteudoLoginPro').attr("style", "display:none");
    $('#divAguardeCadPro').attr("style", "display:block; text-align:center; width:100%;");

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
    console.log("Nome: " + cadastroNomePro);
    console.log("Email: " + cadastroEmailPro);
    console.log("CNPJ: " + cadastroCnpjPro);
    console.log("Foto perfil: " + fotoPerfilPro);

    console.log("Testando a imagem de perfil: ");

    //nomeFoto = fotoPerfilPro.name;
    var tamanhoFoto = fotoPerfilPro.size;

    console.log("Nome arquivo: " + fotoPerfilPro.name);
    console.log("Tamanho arquivo: " + fotoPerfilPro.size);
    console.log("Tipo arquivo: " + fotoPerfilPro.type);

    // PEGAR LATITUDE E LONGITUDE
    var request = $.ajax({
        method: "GET",
        async: false,
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + cadastroNumeroPro + "+" + cadastroRuaPro + ",+" + cidadePro + ",+" + estadoPro + "&key=AIzaSyCUGRiH2iey-c2WqqeegGF2qpxBDNLsmfQ"
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {
        try {
            console.log("Latitude do Google: " + msg["results"][0]["geometry"]["location"]["lat"] + " Longitude do Google: " + msg["results"][0]["geometry"]["location"]["lng"]);

            latitude = msg["results"][0]["geometry"]["location"]["lat"];
            longitude = msg["results"][0]["geometry"]["location"]["lng"];

            localStorage.setItem("Latitude", msg["results"][0]["geometry"]["location"]["lat"]);
            localStorage.setItem("Longitude", msg["results"][0]["geometry"]["location"]["lng"]);
        } catch (err) {

        }

    });
    request.fail(function () {
        try {
            alert(msg);
            $('#conteudoLoginPro').attr("style", "display:block");
            $('#divAguardeCadPro').attr("style", "display:none");
            console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
        } catch (err) {

        }

    });
    // PEGAR LATITUDE E LONGITUDE

    console.log("Latitude atual: " + latitude + " Longitude atual: " + longitude);

    // SETAR NA SESSÃO O ID DA CIDADE
    // getIdEstadoCidade(estadoPro, cidadePro);

    // var idCidade = localStorage.getItem("cidadeId");
    var idCidade = 0;
    // POPULAR ARRAY DO ENDEREÇO

    var endereco = [];

    endereco = { CidadeId: idCidade, Estado: estadoPro, Cidade: cidadePro, nome: cadastroRuaPro, numero: cadastroNumeroPro, complemento: "n/a", bairro: cadastroBairroPro, cep: cadastroCepPro, latitude: latitude, longitude: longitude }


    var espec = [];
    espec.push({ "EspecializacaoId": especializacaoPro });

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/inserir",
        data: {
            nome: cadastroNomePro,
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
    request.done(function (msg) {

        if (msg.Errors[0] == undefined) {
            //if (msg["Data"]["Erro"])
            console.log(msg);
            console.log("Cadastro de profissional Realizado com sucesso!");
            // REGISTRAR OS DADOS DA SESSÃO E LOGAR O USUÁRIO

            localStorage.setItem("idProfissionalLogado", msg["Data"]["ProfissionalId"]);
            localStorage.setItem("Nome", msg["Data"]["Nome"]);
            localStorage.setItem("TelefoneFixo", msg["Data"]["TelefoneFixo"]);
            localStorage.setItem("TelefoneCelular", msg["Data"]["TelefoneCelular"]);
            localStorage.setItem("Email", msg["Data"]["Email"]);
            localStorage.setItem("Cpf", msg["Data"]["DocumentoLogin"]);
            localStorage.setItem("NomeFotoPro", msg["Data"]["NomeFoto"]);

            localStorage.setItem("CidadeId", msg["Data"]["Endereco"]["CidadeId"]);
            localStorage.setItem("NomeRua", msg["Data"]["Endereco"]["Nome"]);

            localStorage.setItem("Numero", msg["Data"]["Endereco"]["Numero"]);
            localStorage.setItem("Complemento", msg["Data"]["Endereco"]["Complemento"]);
            localStorage.setItem("Bairro", msg["Data"]["Endereco"]["Bairro"]);
            localStorage.setItem("Cep", msg["Data"]["Endereco"]["Cep"]);
            localStorage.setItem("Latitude", msg["Data"]["Endereco"]["Latitude"])
            localStorage.setItem("Longitude", msg["Data"]["Endereco"]["Longitude"]);
            localStorage.setItem("Especializacao", msg["Data"]["Especializacao"][0]["Nome"]);
            localStorage.setItem("Curriculum", msg["Data"]["Descricao"]);

            localStorage.setItem("CidadeNome", msg["Data"]["Endereco"]["CidadeNome"]);
            localStorage.setItem("EstadoSigla", msg["Data"]["Endereco"]["EstadoSigla"]);

            console.log("Direcionando o profissional...");

            $("#conteudoLoginPro").attr("style", "display:block");
            $("#divAguardeCadPro").attr("style", "display:none;");

            window.location.href = "dashboard-pro.html?new=1";
        } else {
            $("#conteudoLoginPro").attr("style", "display:block");
            $("#divAguardeCadPro").attr("style", "display:none;");
            alert(msg.Errors[0]);
        }

    });
    request.fail(function (msg) {

        alert('Erro ao efetuar o cadastro! \r\n Por favor tente mais tarde!');
        $("#conteudoLoginPro").attr("style", "display:block");
        $("#divAguardeCadPro").attr("style", "display:none;");
        //if (msg.Errors[0] != undefined) {
        //    alert(msg.Errors[0]);
        //    return;
        //}
        //else {
        //    // console.log("Deu ruim o cadastro");
        //    alert('Erro ao efetuar o cadastro! \r\n Por favor tente mais tarde!');
           
        //}
    });
}


$(function () {

    $('#fotoPerfilPro').change(function (event) {
        form = new FormData();
        form.append('fileUpload', event.target.files[0]); // para apenas 1 arquivo
        //var name = event.target.files[0].content.name; // para capturar o nome do arquivo com sua extenção
    });

    $('#btnEnviar').click(function () {
        var retorno = '';
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
        request.done(function (msg) {
            alert(msg);
        })
        request.fail(function () {
            console.log("Deu ruim o cadastro");
        })

        alert('Saiu');
    });
});

// D0002 - FUNÇÃO PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO
function verificarSessao() {

    var sessao = localStorage.getItem("ClienteId");
    if (!sessao) {
        //alert("Por favor, faça seu login novamente");
        window.location.href = "index.html?clear=1";
    }

}


// D0003 - FUNÇÃO PARA O AUTO COMPLETE NA BUSCA
function autoCompleteBusca() {

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
function bannersAnuncios() {

    var request = $.ajax({
        method: "GET",
        url: "http://api.mdanave.com.br/api/MediaBox/Listar"
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

       // var totBanners = msg["Data"]["List"].length;
       // totBanners = totBanners - 1;
       // var chaveBanner = Math.floor((Math.random() * totBanners) + 1);

        //$("#areaBannerAnuncio").html("<a href='#'><img src='http://www.csprofissionais.com.br/upload/" + msg["Data"]["List"][chaveBanner]["Arquivo"] + "' /></a>")
        $("#areaBannerAnuncio").append("<br />");
        for (i = 0; i < msg["Data"]["List"].length; i++) {
                $("#areaBannerAnuncio").append("<a href='#'><img src='http://www.csprofissionais.com.br/upload/" + msg["Data"]["List"][i]["Arquivo"] + "' /></a>")

        }

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar os banners de anúncios");
    });

}


// D0005 - POPULAR HTML COM INFORMAÇÕES VINDAS DOS SERVIÇOS
function popularHtml() {

    // ESCREVER O NOME DO USUÁRIO NO HEADER DA PÁGINA             
    $("#nomeUsuario").html(localStorage.getItem("Nome"));
    // SETAR O CEP NO CAMPO DE BUSCA AUTOMATICAMENTE  
    $("#cepPesquisa").val(localStorage.getItem("Cep"));


}



// D0006 - CADASTRO DE USUÁRIOS TIPO CLIENTE
function procCadastro() {

    var msgerroCad = "";
    if ($("#cadastroNome").val().trim() == "")
        msgerroCad = msgerroCad + "* Nome é obrigatório!  \r\n";

    if ($("#cadastroEmail").val().trim() == "")
        msgerroCad = msgerroCad + "* E-mail é obrigatório!  \r\n";

    if ($("#telefoneCelular").val() == "")
        msgerroCad = msgerroCad + "* Telefone Celular é obrigatório!  \r\n";
    else if ($("#telefoneCelular").val().length < 10 || $("#telefoneCelular").val().length > 11)
        msgerroCad = msgerroCad + "* Telefone Celular inválido!  \r\n";

    //if ($("#cadastroCnpjPro").val() == "")
    //    msgerro = msgerro + "* CPF/CNPJ é obrigatório! \r\n";

    if ($("#cadastroCep").val() == "")
        msgerroCad = msgerroCad + "* CEP é obrigatório! \r\n";
    else if ($("#cadastroCep").val().length != 8)
        msgerroCad = msgerroCad + "* CEP inválido! \r\n";

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

    if (msgerroCad != "") {
        alert(msgerroCad);

        return false;
    }

    if ($("#cadastroEmail").val() != "") {
        var valida = validacaoEmail($("#cadastroEmail").val());
        if (valida != true) {
            alert("* E-mail inválido!");
            $("#cadastroEmail").focus();
            return false;
        }
    }

    if ($("#telefoneCelular").val().length < 10) {
        alert("Telefone Celular inválido!");
        $("#telefoneCelular").focus();
        return false;
    }


    if ($("#cadastroSenha").val().length < 6) {
        alert("Senha deve ter no mínimo 6 caracters!");
        $("#cadastroSenha").focus();
        return false;
    }


    $("#conteudoLogin").attr("style", "display:none");
    $("#divAguardeCadCli").attr("style", "display:block;text-align:center; width:100%");

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
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + cadastroNumero + "+" + cadastroRua + ",+" + cidade + ",+" + estado + "&key=AIzaSyCUGRiH2iey-c2WqqeegGF2qpxBDNLsmfQ"
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        console.log("Latitude do Google: " + msg["results"][0]["geometry"]["location"]["lat"] + " Longitude do Google: " + msg["results"][0]["geometry"]["location"]["lng"]);
        latitude = msg["results"][0]["geometry"]["location"]["lat"];
        longitude = msg["results"][0]["geometry"]["location"]["lng"];

        localStorage.setItem("Latitude", msg["results"][0]["geometry"]["location"]["lat"]);
        localStorage.setItem("Longitude", msg["results"][0]["geometry"]["location"]["lng"]);

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
    });
    // PEGAR LATITUDE E LONGITUDE

    console.log("Latitude e Longitude descobertas: " + latitude + " Longitude atual: " + longitude);

    // SETAR NA SESSÃO O ID DA CIDADE
    //getIdEstadoCidade(estado, cidade);

    var idCidade = 0;// localStorage.getItem("cidadeId");

    // POPULAR ARRAY DO ENDEREÇO

    var endereco = [];

    endereco = { cidadeId: idCidade, Estado: estado, Cidade: cidade, Nome: cadastroRua, numero: cadastroNumero, complemento: "n/a", bairro: cadastroBairro, cep: cadastroCep, latitude: latitude, longitude: longitude }

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/inserir",
        data: {
            nome: cadastroNome,
            dddfixo: dddfixo,
            telefonefixo: telefonefixo,
            dddcelular: dddcelular,
            telefonecelular: telefonecelular,
            email: cadastroEmail,
            cpf: cadastroCpf,
            senha: cadastroSenha,
            endereco: endereco
        }
    })
    request.done(function (msg) {

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

        localStorage.setItem("CidadeNome", msg["Data"]["Endereco"]["CidadeNome"]);
        localStorage.setItem("EstadoSigla", msg["Data"]["Endereco"]["EstadoSigla"]);

        console.log("Direcionando o usuário para o dashboard...");

        location.href = "dashboard.html";

    });
    request.fail(function () {

        alert('Erro ao efetuar cadastro! \r\n Tente novamente mais tarde!');
        console.log("Deu ruim o cadastro");
        $("#conteudoLogin").attr("style", "display:block");
        $("#divAguardeCadCli").attr("style", "display:none;text-align:center; width:100%");
    });
}


// D0007 - FUNÇÃO PARA PEGAR O ID DO ESTADO CIDADE
function getIdEstadoCidade(estado, cidade) {

    console.log("Inicializando a função para pegar ID da cidade. Estado: " + estado + " Cidade: " + cidade);

    var retorno = 0;

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/Estado/Listar"
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        var totEstados = msg["Data"]["List"].length;

        for (i = 0; i < totEstados; i++) {

            if (msg["Data"]["List"][i]["Sigla"] == estado) {

                retorno = msg["Data"]["List"][i]["EstadoId"];
                console.log("Encontrados o ID do estado: " + estado + ", resultado: " + retorno);
                localStorage.setItem("EstadoId", retorno);

            }

        }

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
    });

    if (localStorage.getItem("EstadoId") != 0) {
        var request = $.ajax({
            method: "GET",
            url: "http://api.csprofissionais.com.br/api/Cidade/Listar/" + localStorage.getItem("EstadoId")
            //data: { email: login, senha: senha }
        })
        request.done(function (msg) {

            var totCidades = msg["Data"]["List"].length;

            for (i = 0; i < totCidades; i++) {

                if (msg["Data"]["List"][i]["Nome"] == cidade) {

                    retorno = msg["Data"]["List"][i]["CidadeId"];
                    console.log("Encontrados o ID da cidade: " + cidade + ", resultado: " + retorno);
                    localStorage.setItem("cidadeId", retorno);

                }

            }

        });
        request.fail(function () {
            console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
        });
    } else {
        console.log("O ID do estado não foi obtido, não foi possível pegar o ID da cidade.");
    }

}


// D0008 - ATUALIZAR SENHA DO USUARIO
function atualizarSenha() {

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

    console.log("ID DO USUARIO: " + idUsuario);
    console.log("SENHA DO USUARIO: " + senhaUsuario);
    console.log("Vamos atualizar os dados agora...");

    endereco = { cidadeId: idCidade, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude }

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/Editar",
        data: {
            clienteid: idUsuario,
            nome: nome,
            telefonefixo: telefoneFixo,
            telefonecelular: telefoneCelular,
            email: email,
            cpf: cpf,
            senha: senhaUsuario,
            endereco: endereco
        }
    })
    request.done(function (msg) {

        console.log(msg);
        console.log("Dados (senha) atualizados com sucesso!");

    });
    request.fail(function () {
        console.log("Não foi possível realizar a operação, tente novamente.");
    });

}

// D0009 - POPULAR FORMULARIOS DA PAGINA DE PERFIL
function popularCamposPerfil() {


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

    //$('#estado option').each(function () {
    //    if ($(this).val() == estadoSigla) {
    //        $(this).prop("selected", true);
    //    }
    //});

    var cep_code = cep;
    if (cep_code.length <= 0) return;
    var requestCep = $.ajax({
        method: "GET",
        async: true,
        url: "http://apps.widenet.com.br/busca-cep/api/cep/" + cep_code + ".json"
    })
    requestCep.done(function (dados) {

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


    console.log("Campos de perfil foram carregados!");

}


// D0010 - ATUALIZAR DADOS DO PERFIL
function editarMeuPerfil() {

    var msgerroCad = "";
    if ($("#nomeClienteEditar").val().trim() == "")
        msgerroCad = msgerroCad + "* Nome é obrigatório!  \r\n";

    if ($("#emailCliente").val().trim() == "")
        msgerroCad = msgerroCad + "* E-mail é obrigatório!  \r\n";

    if ($("#telefoneCelular").val() == "")
        msgerroCad = msgerroCad + "* Telefone Celular é obrigatório!  \r\n";

    //if ($("#cadastroCnpjPro").val() == "")
    //    msgerro = msgerro + "* CPF/CNPJ é obrigatório! \r\n";

    if ($("#cepCliente").val() == "")
        msgerroCad = msgerroCad + "* CEP é obrigatório! \r\n";

    if ($("#enderecoCliente").val() == "")
        msgerroCad = msgerroCad + "* Endereço é obrigatório! \r\n";

    //if ($("#cadastroNumeroPro").val() == "")
    //    msgerro = msgerro + "* Número é obrigatório! \r\n";

    if ($("#bairroCliente").val() == "")
        msgerroCad = msgerroCad + "* Bairro é obrigatório! \r\n";

    if ($("#estado").val() == "")
        msgerroCad = msgerroCad + "* Estado é obrigatório! \r\n";

    if ($("#cidade").val() == "" || $("#cidade").val() == null)
        msgerroCad = msgerroCad + "* Cidade é obrigatório! \r\n";


    if (msgerroCad != "") {
        alert(msgerroCad);
        return false;
    }

    if ($("#telefoneCelular").val().length < 10) {
        alert("Telefone Celular inválido!");
        $("#telefoneCelular").focus();
        return false;
    }

    $("#divEditarPerfil").attr("style", "display:none");
    $("#divAguardeCadPro").attr("style", "display:block;text-align:center; width:100%");


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
    var estado = $("#estado").val();
    var cidade = $("#cidade").val();

    var cep = $("#cepCliente").val();


    var latitude = localStorage.getItem("Latitude");
    var longitude = localStorage.getItem("Longitude");
    var idCidade = 0;//localStorage.getItem("CidadeId");

    console.log("ID DO USUARIO: " + idUsuario); console.log("Vamos atualizar os dados agora...");

    endereco = { cidadeId: idCidade, Estado: estado, Cidade: cidade, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude }

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/cliente/Editar",
        data: {
            clienteid: idUsuario,
            nome: nome,
            telefonefixo: telefoneFixo,
            telefonecelular: telefoneCelular,
            email: email,
            cpf: cpf,
            senha: senhaUsuario,
            endereco: endereco
        }
    })
    request.done(function (msg) {
        alert("Dados atualizados com sucesso!");

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

        localStorage.setItem("CidadeNome", msg["Data"]["Endereco"]["CidadeNome"]);
        localStorage.setItem("EstadoSigla", msg["Data"]["Endereco"]["EstadoSigla"]);

        console.log(msg);
        console.log("Dados (outras informações) atualizados com sucesso!");

        $("#divEditarPerfil").attr("style", "display:block");
        $("#divAguardeCadPro").attr("style", "display:none;text-align:center; width:100%");


    });
    request.fail(function () {
        console.log("Não foi possível realizar a operação, tente novamente.");
        $("#divEditarPerfil").attr("style", "display:block");
        $("#divAguardeCadPro").attr("style", "display:none;text-align:center; width:100%");

    });


}



// D0011 - ATIVAR A PESQUISA DE PROFISSIONAIS
function ativarPesquisa() {

    var tipoProfissional = $("#tipoProfissionalLista").val();
    var cepForm = $("#cepPesquisa").val();

    localStorage.setItem("TipoPesquisa", tipoProfissional);
    localStorage.setItem("cepPesquisa", cepForm);

    $('#btnPesquisar').attr("style", "display:none");
    $('#divPesquisando').attr("style", "display:block; text-align:center; width:100%;");
    var profs = window.currencies;
    var existProf = false;
    for (var i = 0; i < profs.length; i++) {

        if (profs[i] == tipoProfissional) {
            existProf = true;
        }
    }

    if (existProf == false) {
        alert("Profissão não Encontrada!");
        $("#tipoProfissionalLista").focus();
        $('#btnPesquisar').attr("style", "display:block");
        $('#divPesquisando').attr("style", "display:none; text-align:center; width:100%;");
        return;
    }


    // SETAR OS VALORES DA SESSÃO E DIRECIONAR O USUÁRIO PARA A PÁGINA DE PESQUISA
    console.log("Tipo de Profissional: " + tipoProfissional);
    console.log("Cep do formulário: " + cepForm);

    // DIRECIONAR O USUÁRIO
    location.href = "resultado.html";


}



// D0012 - LISTAR OS PROFISSIONAIS ENCONTRADOS NA PESQUISA
function procPesquisa() {

    var tipoPesquisa = localStorage.getItem("TipoPesquisa");
    var cepPesquisa = localStorage.getItem("cepPesquisa");
    var clienteLogado = localStorage.getItem("ClienteId");
    var radius = 6371;
    var dist = 50;

    var estrelas = 0;
    var zeroEstrela = '<span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>'
    var umaEstrela = '<span><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
    var duasEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
    var tresEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
    var quatroEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
    var cincoEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span>';

    var nomeProfissional = "";
    var celularProfissional = "";
    var idProfissional = "";

    var latLng2 = "";

    console.log("Execução da busca de profissionais...");
    console.log("Tipo de profissional buscado: " + tipoPesquisa);
    console.log("Cep de pesquisa buscado: " + cepPesquisa);

    var lat = localStorage.getItem("Latitude");
    var long = localStorage.getItem("Longitude");

    var cadastroNumero = 10;
    var cadastroRua = "";
    var cidade = "";
    var estado = "";

    var requestCep = $.ajax({
        method: "GET",
        async: true,
        url: "http://apps.widenet.com.br/busca-cep/api/cep/" + cepPesquisa + ".json"
    })
    requestCep.done(function (dados) {
        cadastroRua = dados.address.split('-')[0];
        //$(".itfBairroCli").val(dados.district);
        estado = dados.state;
        cidade = dados.city;

        var request = $.ajax({
            method: "GET",
            async: false,
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + cadastroNumero + "+" + cadastroRua + ",+" + cidade + ",+" + estado + "&key=AIzaSyCUGRiH2iey-c2WqqeegGF2qpxBDNLsmfQ"
            //data: { email: login, senha: senha }
        })
        request.done(function (msg) {

            console.log("Latitude do Google: " + msg["results"][0]["geometry"]["location"]["lat"] + " Longitude do Google: " + msg["results"][0]["geometry"]["location"]["lng"]);
            lat = msg["results"][0]["geometry"]["location"]["lat"];
            long = msg["results"][0]["geometry"]["location"]["lng"];

        });
        request.fail(function () {
            console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
        });



        // FAZER A BUSCA NO SISTEMA
        var request = $.ajax({
            method: "POST",
            url: "http://api.csprofissionais.com.br/api/profissional/listarporlatlon",
            data: {
                ClienteId: clienteLogado,
                Radius: radius,
                Dist: dist,
                EspecializacaoId: tipoPesquisa,
                Latitude: lat,
                Longitude: long
            }
        })
        request.done(function (msg) {

            console.log(msg);
            console.log("Busca realizada com sucesso! Iniciando o desenho na tela:");

            console.log("Total de profissionais encontrados: " + totProfissionais);

            if (!msg["Data"]) {
                $("#workInner").html('<h3>Nenhum profissional encontrado<br><small>verique os critérios de busca informados e tente novamente</small></h3>');
            } else {

                var totProfissionais = msg["Data"]["List"].length;
                for (i = 0; i < totProfissionais; i++) {

                    if (msg["Data"]["List"][i]["NroEstrela"] == 0) { estrelas = zeroEstrela; }
                    if (msg["Data"]["List"][i]["NroEstrela"] == 1) { estrelas = umaEstrela; }
                    if (msg["Data"]["List"][i]["NroEstrela"] == 2) { estrelas = duasEstrelas; }
                    if (msg["Data"]["List"][i]["NroEstrela"] == 3) { estrelas = tresEstrelas; }
                    if (msg["Data"]["List"][i]["NroEstrela"] == 4) { estrelas = quatroEstrelas; }
                    if (msg["Data"]["List"][i]["NroEstrela"] == 5) { estrelas = cincoEstrelas; }

                    nomeProfissional = msg["Data"]["List"][i]["Nome"];
                    celularProfissional = msg["Data"]["List"][i]["Celular"];
                    var idProfissionalMapa = msg["Data"]["List"][i]["ProfissionalId"];

                    var foto = msg["Data"]["List"][i]["NomeFoto"];

                    latPro = msg["Data"]["List"][i]["Latitude"];
                    lonPro = msg["Data"]["List"][i]["Longitude"];


                    var latLngPro = new google.maps.LatLng(latPro, lonPro);
                    $.each(msg["Data"]["List"], function (index, address) {
                        var marker = criarPonto(address, image, map);
                        //var marker = new google.maps.Marker({
                        //    icon: image,
                        //    position: new google.maps.LatLng(msg["Data"]["List"][i]["Latitude"], msg["Data"]["List"][i]["Longitude"]),//latLng2,
                        //    map: map,
                        //    id: msg["Data"]["List"][i]["ProfissionalId"],
                        //    title: msg["Data"]["List"][i]["Nome"],
                        //    da: msg["Data"]["List"][i]["ProfissionalId"]
                        //});


                        google.maps.event.addListener(marker, 'click', function (e) {
                            // localStorage.setItem("Profissional", idProfissional);
                            // console.log("Vamos direcionar o usuário...");
                            //location.href = "detalhes-user.html";
                            //var id = msg["Data"]["List"][i]["ProfissionalId"];
                            //verProfissional(marker.id);
                            localStorage.setItem("Profissional", address.ProfissionalId);

                            location.href = "detalhes-user.html";
                        });
                    });

                    //var detalhes = '<div class="row"><table width="100%"><tr><td style="width:45px">&nbsp;<img src="http://www.csprofissionais.com.br/upload/' + foto + '" style="height: auto; max-height: 40px; max-width: 40px;min-height: 40px;min-width: 40px;width: auto; border-radius: 10px;" /></td><td><div class="col-sm-12 col-xs-12 text-left user-preview"><p style="padding-top:7px; font-size: 12px;"><b>' + nomeProfissional + '</b></p>' + estrelas + '&nbsp;<i class="fa fa-phone" aria-hidden="true"></i><a href="tel:0' + celularProfissional + '">' + celularProfissional + '</a>&nbsp;&nbsp;<font style="font-size:12px; color:gray;"><b>Dist: ' + msg["Data"]["List"][i]["Distancia"] + '</b></font></p><p class="btn-detalhe"><a style="cursor:pointer;" onclick="verProfissional(' + idProfissional + ')" class="btn btn-primary">DETALHES</a></p></div></td></tr></table></div>';
                    var detalhes = '<div class="row"><table width="100%"><tr><td style="width:45px">&nbsp;<img src="http://www.csprofissionais.com.br/upload/' + foto + '" style="height: auto; max-height: 40px; max-width: 40px;min-height: 40px;min-width: 40px;width: auto; border-radius: 10px;" /></td><td><div class="col-sm-12 col-xs-12 text-left user-preview"><p style="padding-top:7px; font-size: 10px;"><b>' + nomeProfissional + '</b></p>' + estrelas + '&nbsp;<i class="fa fa-phone" aria-hidden="true" ></i><a style="font-size: 13px;" href="tel:0' + celularProfissional + '">' + celularProfissional + '</a></p><p class="btn-detalhe"><a style="cursor:pointer;" onclick="verProfissional(' + idProfissionalMapa + ')" class="btn btn-primary">DETALHES</a></p></div></td></tr></table></div>';

                   // markers.push(marker);
                    $("#workInner").append(detalhes);


                }
            }


        });
        request.fail(function (msg) {
            var erro = msg;
            console.log("Nenhum resultado encontrado na busca de profissionais.");
            $("#workInner").html('<h3>Nenhum profissional encontrado<br><small>verique os critérios de busca informados e tente novamente</small></h3>');

        });


        // DESENHAR GOOGLE MAPS
        console.log("Vamos iniciar o desenho do GoogleMaps");
        document.getElementById("GoogleMapa").style.height = "180px";


        var latLng = new google.maps.LatLng(lat, long);
        var mapOptions = {
            zoom: 12,
            center: latLng,
            panControl: true,
            //draggable: true,
            zoomControl: true,
            // scrollwheel: true //,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('GoogleMapa'), mapOptions);

        var image = {
            url: 'images/icon/icon-36-ldpi.png',
            size: new google.maps.Size(36, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(60, 64)
        };

        var marker = new google.maps.Marker({
            icon: image2,
            position: latLng,
            map: map,
            title: "Onde estou"
        });
        var image2 = {
            url: 'images/icon/cliente1.png',
            size: new google.maps.Size(36, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(60, 64)
        };

    });
    requestCep.fail(function (erro) {
        var ret = erro;
        console.log("Ocorreu um erro ao tentar carregar a CEP");
    });

    // FINAL DESENHAR GOOGLE MAPS
    console.log("Desenho do GoogleMaps finalizado");
    console.log("Fim execução da listagem de profissionais encontrados");

}

var criarPonto = function (prof, image, map) {

    var marker = new google.maps.Marker({
        icon: image,
        position: new google.maps.LatLng(prof.Latitude, prof.Longitude),//latLng2,
        map: map,
        id: prof.ProfissionalId,
        title: prof.Nome
    });

    return marker;
};

// D0013 - DIRECIONAR O USUARIO PARA O PERFIL DO PROFISSIONAL
function verProfissional(idProfissional) {

    console.log("Exibir perfil do profissional ID: " + idProfissional);
    localStorage.setItem("Profissional", idProfissional);
    console.log("Vamos direcionar o usuário...");
    location.href = "detalhes-user.html";

}


// D0014 - ALIMENTAR PÁGINA DE DETALHE PROFISSIONAL
function alimentarDetalheProfissional() {

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

    console.log("Esse é o perfil do profissional ID: " + profissional);


    // PEGAR DADOS DO PROFISSIONAL
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/obter/" + profissional
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        console.log("Nome do Profissional: " + msg["Data"]["Nome"]);
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
        $('#fotoPro').attr('src', 'http://www.csprofissionais.com.br/upload/' + fotoPro);
        $('#nomePro').html(nomePro);
        $('#fixoPro').append('<a href="tel:0' + fixoPro + '">' + fixoPro + '</a>');
        $('#celularPro').append('<a href="tel:0' + celularPro + '">' + celularPro + '</a>');
        $('#enderecoPro').append(ruaPro + ", " + numeroPro + " - " + bairroPro);
        $('#sobrePro').append(descricao);

        var zeroEstrela = '<span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>'
        var umaEstrela = '<span><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
        var duasEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
        var tresEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
        var quatroEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span><span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
        var cincoEstrelas = '<span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></span>';


        var estrelas = zeroEstrela;
        if (msg["Data"]["NroEstrela"] == 0) { estrelas = zeroEstrela; }
        if (msg["Data"]["NroEstrela"] == 1) { estrelas = umaEstrela; }
        if (msg["Data"]["NroEstrela"] == 2) { estrelas = duasEstrelas; }
        if (msg["Data"]["NroEstrela"] == 3) { estrelas = tresEstrelas; }
        if (msg["Data"]["NroEstrela"] == 4) { estrelas = quatroEstrelas; }
        if (msg["Data"]["NroEstrela"] == 5) { estrelas = cincoEstrelas; }

        $("#spanEstrelas").html(estrelas);

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        alert("Ocorreu um erro ao tentar pegar os dados desse profissional");
        location.href = "dashboard.html";
    });



}


// D0015 - BUSCAR ULTIMOS TRABALHOS DO PROFISSIONAL
function buscarUltimosTrabalhos() {

    var profissional = localStorage.getItem("Profissional");
    console.log("Vamos buscar os últimos trabalhos do profissional ID: " + profissional);


    // PEGAR IMAGENS DOS ÚLTIMOS TRABALHOS DO PROFISSIONAL
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterImagens/" + profissional
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        var totImagens = msg["Data"]["Imagens"].length;

        for (i = 0; i < totImagens; i++) {

            $('#ultimosTrabalhosWork').append("<img src='http://www.csprofissionais.com.br/upload/" + msg["Data"]["Imagens"][i]["Nome"] + "' style='width:100%;height:auto;margin-bottom:8px;padding:3px;border:1px solid #efefef;' />")
            console.log("Imagem do trabalho do profissional impressa: http://www.csprofissionais.com.br/upload/" + msg["Data"]["Imagens"][i]["Nome"]);

        }


    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#ultimosTrabalhosWork').html("<p style='text-align:center;'>Nenhuma imagem encontrada ou disponível no servidor.</p>");
    });



}


// D0016 - AVALIAR PROFISSIONAL
function avaliarProfissional() {

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");
    var comentario = $('#new-review').val();
    var estrelas = $('#ratings-hidden').val();

    console.log("O CLIENTE: " + idCli);
    console.log("AVALIOU O PROFISSIONAL: " + idPro);
    console.log("ELE DISSE QUE: " + comentario);
    console.log("E DEU: " + estrelas + " ESTRELAS AO ATENDIMENTO");
    console.log("salvando dados...");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/QualificacaoProfissional",
        data: {
            ProfissionalId: idPro,
            ClienteId: idCli,
            Nota: estrelas,
            Mensagem: comentario
        }
    })
    request.done(function (msg) {

        console.log(msg);
        console.log("Avaliação do Profissional enviada com sucesso");
        alert("Avaliação do Profissional enviada com sucesso!");
        $('#avaliarUsuario').modal("hide");


    });
    request.fail(function () {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        $('#avaliarUsuario').modal("hide");
    });


}


// D0017 - CARREGAR COMENTÁRIOS FEITOS PARA O PROFISSIONAL
function carregarComentarios() {

    var idPro = localStorage.getItem("Profissional");
    var nota = 0;

    console.log("Iniciando a busca por comentários a esse profissional: " + idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterQualificacaoProfissional/" + idPro
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        var totAval = msg["Data"]["List"].length;

        for (i = 0; i < totAval; i++) {

            nota = msg["Data"]["List"][i]["Nota"] * 2;



            $('#areaComentarios').append('<!-- COMENTARIO --><div class="row"><div class="col-sm-12 col-xs-12"><p class="text-right" style="margin-top:-18px;"><i>' + getNome(msg["Data"]["List"][i]["ClienteId"]) + ' disse:</i><br>' + msg["Data"]["List"][i]["Mensagem"] + '<br><b>Nota:</b> ' + (nota / 2) + '</p></div></div><!-- COMENTARIO --><p>&nbsp;</p>')
            console.log("Avaliação Impressa com sucesso");

        }


    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaComentarios').html("<p style='text-align:center;'>Ninguem avaliou esse profissional ainda.</p>");
    });



}


// D0018 - FUNÇÃO QUE DEVOLVE APENAS O NOME DO CLIENTE
function getNome(idCliente) {

    var nome = "Usuário";

    console.log("Iniciando a busca pelo nome do cliente ID: " + idCliente);
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/cliente/obter/" + idCliente
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        console.log("Nome encontrado: " + msg["Data"]["Nome"]);
        nome = msg["Data"]["Nome"];

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar a informação do cliente");
        return "Usuário";
    });

    return nome;


}


// D0019 - TROCA DE MENSAGENS ENTRE CLIENTE E PROFISSIONAL
function trocaMensagens() {

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");

    console.log("Vamos começar a exibir as mensagens trocadas entre profissional e cliente");
    console.log("Cliente ID: " + idCli);
    console.log("Profissional ID: " + idPro);


    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/BuscaMensagens",
        data: {
            ProfissionalId: idPro,
            ClienteId: idCli
        }
    })
    request.done(function (msg) {

        console.log(msg);
        console.log("Mensagens recuperadas com sucesso");

        var totMsg = msg["Data"]["List"].length;

        if (totMsg == 0) {
            $('#areaMsg').html("<p>Nenhuma mensagem ainda. Mande a primeira!</p>");
        } else {


            for (i = 0; i < totMsg; i++) {

                if (msg["Data"]["List"][i]["Origem"] == "C") {
                    //$('#areaMsg').prepend('<div class="row msg_container base_sent"><div class="col-md-12 col-xs-12"><div class="messages msg_sent" style="background:#DDFFFF"><p>' + msg["Data"]["List"][i]["Mensagem"] + '</p><time datetime="2009-11-13T20:00"></time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="images/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div></div>');
                    $('#areaMsg').prepend('<div class="row msg_container base_sent"><div class="col-md-12 col-xs-12"><div class="messages msg_sent" style="background:#DDFFFF"><p>' + msg["Data"]["List"][i]["Mensagem"] + '</p><time datetime="2009-11-13T20:00"></time></div></div></div>');
                }
                if (msg["Data"]["List"][i]["Origem"] == "P") {
                    $('#areaMsg').prepend('<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="images/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>' + msg["Data"]["List"][i]["Mensagem"] + '</p><time datetime="2009-11-13T20:00"></time></div></div></div>');
                }

            }

        }


    });
    request.fail(function () {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        location.href = "dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });

    console.log("Final execução da busca por mensagens entre profissional e cliente");

}


// D0020 - ENVIAR MENSAGEM PARA PROFISSIONAL
function enviarNovaMensagen() {


    $("#btn-chat").attr("style", "display:none");
    $("#divAguardeMensagem").attr("style", "display:block;text-align:left; width:30px;");


    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");
    var mensagem = $('#msgField').val();
    var origem = "C";

    console.log("Cliente quer enviar mensagem para profissional");
    console.log("Cliente ID: " + idCli);
    console.log("Profissional ID: " + idPro);
    console.log("Mensagem: " + mensagem);

    console.log("Enviando Menagem....");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/Inserir",
        data: {
            ClienteId: idCli,
            ProfissionalId: idPro,
            Mensagem: mensagem,
            Origem: origem
        }
    })
    request.done(function (msg) {

        console.log(msg);
        console.log("Mensagem foi enviada com sucesso");

        // LIMPAR O CAMPO DE MENSAGEM
        $('#msgField').val("");

        // ATUALIZAR A PÁGINA PARA MOSTRAR AS MENSAGENS ATUALIZADAS
        location.reload();

        $("#btn-chat").attr("style", "display:block");
        $("#divAguardeMensagem").attr("style", "display:none;");

    });
    request.fail(function () {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        $("#btn-chat").attr("style", "display:block");
        $("#divAguardeMensagem").attr("style", "display:none;");
        //location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });




}
function enviarNovaMensagenPro() {


    $("#btn-chat").attr("style", "display:none");
    $("#divAguardeMensagem").attr("style", "display:block;text-align:left; width:30px;");

    var idPro = localStorage.getItem("idProfissionalLogado");
    var idCli = localStorage.getItem("ClienteMensagem");
    var mensagem = $('#msgField').val();
    var origem = "P";

    console.log("Cliente quer enviar mensagem para profissional");
    console.log("Cliente ID: " + idCli);
    console.log("Profissional ID: " + idPro);
    console.log("Mensagem: " + mensagem);

    console.log("Enviando Menagem....");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/Inserir",
        data: {
            ClienteId: idCli,
            ProfissionalId: idPro,
            Mensagem: mensagem,
            Origem: origem
        }
    })
    request.done(function (msg) {

        $("#btn-chat").attr("style", "display:block");
        $("#divAguardeMensagem").attr("style", "display:none;text-align:left; width:30px;");
        console.log(msg);
        console.log("Mensagem foi enviada com sucesso");

        // LIMPAR O CAMPO DE MENSAGEM
        $('#msgField').val("");

        // ATUALIZAR A PÁGINA PARA MOSTRAR AS MENSAGENS ATUALIZADAS
        location.reload();

    });
    request.fail(function () {
        $("#btn-chat").attr("style", "display:block");
        $("#divAguardeMensagem").attr("style", "display:none;text-align:left; width:30px;");

        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        //location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });




}


// D0021 - PEGAR APENAS O NOME DO PROFISSIONAL
function getNomeProfissional() {

    var idPro = localStorage.getItem("Profissional");
    console.log("Vamos procurar o nome do profissional ID: " + idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/obter/" + idPro
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        $('#nomeProfissional').html(msg["Data"]["Nome"]);
        console.log("Nome encontrado! é " + msg["Data"]["Nome"]);

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar a informação do profissional");

    });

}


// D0022 - PEGAR TODAS AS MENSAGENS EM QUE O CLIENTE INTERAGIU COM UM PROFISSIONAL
function TodasMensagens() {

    var idCli = localStorage.getItem("ClienteId");

    console.log("Iniciando a busca para saber se o cliente trocou mensagens com algum profissional");

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/mensagem/ListProfissionaisMensagemCliente/" + idCli
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        var totInt = msg["Data"]["List"].length;

        for (i = 0; i < totInt; i++) {

            $('#areaTodasMsg').prepend('<div class="row" onclick="interagirProfissional(' + msg["Data"]["List"][i]["ProfissionalId"] + ');" style="padding:20px;"><div class="col-xs-3 col-md-3" style="padding-right:0px;"><img style="max-height:75px;max-width:75px;" src="http://www.csprofissionais.com.br/upload/' + msg["Data"]["List"][i]["NomeFoto"] + '" class="img-responsive" alt="" style="width:100%;" /></div><div class="col-xs-9 col-md-9"><div><b style="color:#d32f2f;">' + msg["Data"]["List"][i]["Nome"] + '</b><div class="mic-info"><i>celular: ' + msg["Data"]["List"][i]["TelefoneCelular"] + '</i></div></div><div class="comment-text">clique para abrir a conversa</div></div></div>');

        }


    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaTodasMsg').html("<p style='text-align:center;'>Ocorreu um erro em carregar as mensagens. Tente novamente mais tarde</p>");
    });


}


// D0023 - SETAR E DIRECIONAR O USUARIO PARA A PAGINA DO PROFISSIONAL QUE ELE QUER VER A CONVERSA
function interagirProfissional(idPro) {

    console.log("Vamos direcionar o usuário para o histórico de conversas entre ele e o profissional ID: " + idPro);

    localStorage.setItem("Profissional", idPro);

    console.log("Direcionando...");

    location.href = "mensagens-trocadas.html";


}


// D0025 - UPLOAD DE IMAGENS
function uploadImagens() {

    var idProfissionalLogado = localStorage.getItem("idProfissionalLogado");

    var nomeFoto = "";
    var descricao = "";

    console.log("Iniciando a rotina para upload de imagem do profissional ID: " + idProfissionalLogado);

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/InserirImagem",
        data: {
            ProfissionalId: idProfissionalLogado,
            Nome: nomeFoto,
            Descricao: descricao
        }
    })
    request.done(function (msg) {

        console.log(msg);
        console.log("Imagem carregada com sucesso em http://www.csprofissionais.com.br/upload/" + nomeFoto);

    });
    request.fail(function () {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        //location.href="dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });

    console.log("Encerrada a rotina para upload de imagem do profissional ID: " + idProfissionalLogado);


}


// D0026 - FUNÇÃO PARA O AUTO COMPLETE NO CADASTRO DO PROFISSIONAL
function autoCompletePro() {

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
function procLoginPro() {

    btnLogProf
    divAguardeLogProf
    var login = $("#loginPro").val();
    var senha = $("#senhaPro").val();

    if (login == "" || senha == "") {
        alert("Login e Senha são obrigatórios");
        return 1;
    }

    $("#btnLogProf").attr("style", "display:none");
    $("#divAguardeLogProf").attr("style", "display:block;text-align:center; width:100%");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/Login",
        data: { documento: login, senha: senha }
    })
    request.done(function (msg) {

        if (!msg["Data"]) {
            alert("Login ou Senha incorretos");
            $("#btnLogProf").attr("style", "display:block");
            $("#divAguardeLogProf").attr("style", "display:none;text-align:center; width:100%");
            return false;
        } else {

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
            localStorage.setItem("NomeFotoPro", msg["Data"]["NomeFoto"]);
            localStorage.setItem("Ativo", msg["Data"]["Ativo"]);
            try {
                localStorage.setItem("Especializacao", msg["Data"]["Especializacao"][0]["Nome"]);
            } catch (err) { }

            localStorage.setItem("Curriculum", msg["Data"]["Descricao"]);
            $("#btnLogProf").attr("style", "display:block");
            $("#divAguardeLogProf").attr("style", "display:none;text-align:center; width:100%");
            location.href = "dashboard-pro.html";

        }

    });
    request.fail(function (msg) {
        var retorno = msg;
        alert("Login/Senha incorreto!");
        $("#btnLogProf").attr("style", "display:block");
        $("#divAguardeLogProf").attr("style", "display:none;text-align:center; width:100%");
        return false;
        //location.href = "index.html";
    });

}


// D0028 - FUNÇÃO PARA VERIFICAR SE O USUÁRIO PROFISSIONAL ESTÁ LOGADO
function verificarSessaoPro() {

    var sessao = localStorage.getItem("idProfissionalLogado");
    if (!sessao) {
        // alert("Por favor, faça seu login novamente");
        window.location.href = "index.html?clear=1";
    }

}


// D0029 - POPULAR HTML COM INFORMAÇÕES VINDAS DOS SERVIÇOS (PROFISSIONAL)
function popularHtmlPro() {

    // ESCREVER O NOME DO USUÁRIO NO HEADER DA PÁGINA             
    $("#nomeUsuario").html(localStorage.getItem("Nome"));
    // SETAR O CEP NO CAMPO DE BUSCA AUTOMATICAMENTE  
    $("#cepPesquisa").val(localStorage.getItem("Cep"));

    $('#fotoPro').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomeFotoPro"));
    

}

function atualizarFotocadastro()
{
    $('#imgFotoPerfilnew').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomeFotoPro"));

}

// D0030 - PEGAR TODAS AS MENSAGENS EM QUE O PROFISSIONAL INTERAGIU COM UM CLIENTE
function TodasMensagensPro() {

    var idCli = localStorage.getItem("idProfissionalLogado");

    console.log("Iniciando a busca para saber se o profissional trocou mensagens com algum cliente");

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/mensagem/ListaClientesMensagemProfissional/" + idCli
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        if (msg["Data"]) {
            var totInt = msg["Data"]["List"].length;

            for (i = 0; i < totInt; i++) {

                $('#areaTodasMsg').prepend('<div class="row" onclick="interagirProfissionalPro(' + msg["Data"]["List"][i]["ClienteId"] + ');" style="padding:20px;"><div class="col-xs-12 col-md-12"><div><b style="color:#d32f2f;">' + msg["Data"]["List"][i]["Nome"] + '</b><div class="mic-info"><i>celular: ' + msg["Data"]["List"][i]["TelefoneCelular"] + '</i></div></div><div class="comment-text">clique para abrir a conversa</div></div></div>');

            }
        } else {
            $('#areaTodasMsg').html("<p style='text-align:center;padding:25px;'>Nenhuma mensagem ainda. Tente novamente mais tarde</p>");
        }


    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaTodasMsg').html("<p style='text-align:center;padding:25px'>Nenhuma mensagem ainda</p>");
    });


}


// D0031 - SETAR E DIRECIONAR O USUARIO PROFISSIONAL PARA A PAGINA DO CLIENTE QUE ELE QUER VER A CONVERSA
function interagirProfissionalPro(idPro) {

    console.log("Vamos direcionar o usuário para o histórico de conversas entre ele e o cliente ID: " + idPro);

    localStorage.setItem("ClienteMensagem", idPro);

    console.log("Direcionando...");

    location.href = "mensagens-trocadas-pro.html";


}


// D0032 - PEGAR APENAS O NOME DO CLIENTE
function getNomeCliente() {

    var idPro = localStorage.getItem("Cliente");
    console.log("Vamos procurar o nome do Cliente ID: " + idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/cliente/obter/" + idPro
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        $('#nomeCliente').html(msg["Data"]["Nome"]);
        console.log("Nome encontrado! é " + msg["Data"]["Nome"]);

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar a informação do cliente");

    });

}



// D0033 - TROCA DE MENSAGENS ENTRE CLIENTE E PROFISSIONAL
function trocaMensagensPro() {

    var idPro = localStorage.getItem("idProfissionalLogado");
    var idCli = localStorage.getItem("ClienteMensagem");

    console.log("Vamos começar a exibir as mensagens trocadas entre profissional e cliente");
    console.log("Profissional ID: " + idPro);
    console.log("Cliente ID: " + idCli);


    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/mensagem/BuscaMensagens",
        data: {
            ProfissionalId: idPro,
            ClienteId: idCli
        }
    })
    request.done(function (msg) {

        console.log(msg);
        console.log("Mensagens recuperadas com sucesso");

        var totMsg = msg["Data"]["List"].length;

        if (totMsg == 0) {
            $('#areaMsg').html("<p>Nenhuma mensagem ainda. Mande a primeira!</p>");
        } else {


            for (i = 0; i < totMsg; i++) {

                if (msg["Data"]["List"][i]["Origem"] == "C") {

                    $('#areaMsg').prepend('<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="images/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive "></div><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>' + msg["Data"]["List"][i]["Mensagem"] + '</p><time datetime="2009-11-13T20:00"></time></div></div></div>');
                }
                if (msg["Data"]["List"][i]["Origem"] == "P") {

                    $('#areaMsg').prepend('<div class="row msg_container base_sent"><div class="col-md-12 col-xs-12"><div class="messages msg_receive" style="background:#DDFFFF"><p>' + msg["Data"]["List"][i]["Mensagem"] + '</p><time datetime="2009-11-13T20:00"></time></div></div></div>');

                }

            }

        }


    });
    request.fail(function () {
        alert("Ocorreu um erro no servidor. Tente novamente mais tarde");
        location.href = "dashboard.html";
        //$('#avaliarUsuario').modal("hide");
    });

    console.log("Final execução da busca por mensagens entre profissional e cliente");

}


// D0034 - SOLICITAÇÃO DE DESTAQUE FEITA PELO PROFISSIONAL
function solicDestaque() {

    var field = 'new';
    var url = window.location.href;
    if (url.indexOf('?' + field + '=') != -1) {
        $("#btnAnucioGratis").attr("style", "display:block");
    }
    else if (url.indexOf('&' + field + '=') != -1) {
        $("#btnAnucioGratis").attr("style", "display:block");
    }
    else {
        $("#btnAnucioGratis").attr("style", "display:none");
    }

    var idPro = localStorage.getItem("idProfissionalLogado");

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterValorDestaque"
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {
        $('#valorDestaque30').html(msg["Data"]["Valores"][0]["Valor"]);
        $('#valorDestaque90').html(msg["Data"]["Valores"][1]["Valor"]);
        console.log("Valor da solicitação de destaque capturada com sucesso");


    });
    request.fail(function (msg) {
        var erro = msg;
        console.log("Ocorreu um erro ao tentar realizar a solicitação");

    });

}

function confirmarDestaque() {

    var idPro = localStorage.getItem("idProfissionalLogado");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/SolicitaDestaque",
        data: { Id: idPro, Periodo: $("input:radio[name='rdDestaque']:checked").val() }
    })
    request.done(function (msg) {

        //$('#nomeCliente').html(msg["Data"]["Nome"]); 
        console.log("Solicitação de destaque realizada com sucesso");
        alert("Solicitação de destaque realizada com sucesso");
        location.href = "dashboard-pro.html";

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar realizar a solicitação");

    });
}

function AnuncioGratis() {

    location.href = "dashboard-pro.html";

}


// D0035 - CARREGAR COMENTÁRIOS FEITOS PARA O PROFISSIONAL (PROFISSIONAL)
function carregarComentariosPro() {


    $('#areaComentarios').html('');
    var idPro = localStorage.getItem("idProfissionalLogado");
    var nota = 0;

    console.log("Iniciando a busca por comentários a esse profissional: " + idPro);


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterQualificacaoProfissional/" + idPro
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        if (msg["Data"]) {
            var totAval = msg["Data"]["List"].length;

            for (i = 0; i < totAval; i++) {

                nota = msg["Data"]["List"][i]["Nota"];

                $('#areaComentarios').append('<!-- COMENTARIO --><div class="row"><div class="col-sm-12 col-xs-12"><p class="text-right" style="margin-top:-18px;"><i>' + getNome(msg["Data"]["List"][i]["ClienteId"]) + ' disse:</i><br>' + msg["Data"]["List"][i]["Mensagem"] + '<br><b>Nota:</b> ' + nota + '</p></div></div><!-- COMENTARIO --><p>&nbsp;</p>')
                console.log("Avaliação Impressa com sucesso");

            }
        } else {
            $('#areaComentarios').html("<p style='text-align:center;'>Ninguem o avaliou ainda.</p>");
        }


    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#areaComentarios').html("<p style='text-align:center;'>Ninguem o avaliou ainda.</p>");
    });



}


// D0036 - POPULAR FORMULARIOS DA PAGINA DE PERFIL
function popularCamposPerfilPro() {

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
    var curriculum = localStorage.getItem("Curriculum");
    var ativo = localStorage.getItem("Ativo");

    var especializacao = localStorage.getItem("Especializacao");

    var estadoSigla = localStorage.getItem("EstadoSigla");

    var cidadeNome = localStorage.getItem("CidadeNome");

    $('#imgFotoPerfil').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomeFotoPro"));


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

    $("#tipoProfissionalLista").val(especializacao);

    $("#cadastroCurriculoPro").val(curriculum);
    //$("#CadastroAtivo").val(ativo);

    $("input[name=CadastroAtivo][value=" + ativo + "]").attr('checked', 'checked');


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

    //$('#estado option').each(function () {
    //    if ($(this).val() == estadoSigla) {
    //        $(this).prop("selected", true);
    //    }
    //});


    var cep_code = cep;
    if (cep_code.length <= 0) return;
    var requestCep = $.ajax({
        method: "GET",
        async: true,
        url: "http://apps.widenet.com.br/busca-cep/api/cep/" + cep_code + ".json"
    })
    requestCep.done(function (dados) {

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


    console.log("Campos de perfil foram carregados!");

}



// D0037 - ATUALIZAR SENHA DO PROFISSIONAL
function atualizarSenhaPro() {

    if ($("#senhaDeAcesso").val() == '') {
        alert("Senha deve ser preenchida!");

        return false;
    }

    if ($("#senhaDeAcesso").val().length < 6) {
        alert("Senha deve ter no mínimo 6 caracters!");

        return false;
    }

    $("#divAtualizarSenha").attr("style", "display:none");
    $("#divCarregaAtualizarSenha").attr("style", "display:block;text-align:center; width:100%");

    var idUsuario = localStorage.getItem("idProfissionalLogado");
    var senhaUsuario = $("#senhaDeAcesso").val();

    localStorage.setItem("Senha", senhaUsuario);


    // CAMPOS OBRIGATÓRIOS DA API DO SERVIÇO
    //var bairro = localStorage.getItem("Bairro");
    //var cpf = localStorage.getItem("Cpf");
    //var email = localStorage.getItem("Email");
    //var nome = localStorage.getItem("Nome");
    //var nomeRua = localStorage.getItem("NomeRua");
    //var numero = localStorage.getItem("Numero");
    //var telefoneCelular = localStorage.getItem("TelefoneCelular");
    //var telefoneFixo = localStorage.getItem("TelefoneFixo");

    //var cep = localStorage.getItem("Cep");
    //var latitude = localStorage.getItem("Latitude");
    //var longitude = localStorage.getItem("Longitude");
    //var idCidade = localStorage.getItem("CidadeId");

    console.log("ID DO PROFISSIONAL: " + idUsuario);
    console.log("SENHA DO PROFISSIONAL: " + senhaUsuario);
    //console.log("Vamos atualizar os dados agora...");

    //endereco = { cidadeId: idCidade, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude }

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/AlterarSenha",
        data: {
            UsuarioId: idUsuario,
            Senha: senhaUsuario
            //nome: nome,
            //telefonefixo: telefoneFixo,
            //telefonecelular: telefoneCelular,
            //email: email,
            //cpf: cpf,
            //senha: senhaUsuario,
            //endereco: endereco
        }
    })
    request.done(function (msg) {
        alert("Senha alterada com sucesso!");
        console.log(msg);
        console.log("Dados (senha) atualizados com sucesso!");
        $("#divAtualizarSenha").attr("style", "display:block");
        $("#divCarregaAtualizarSenha").attr("style", "display:none;text-align:center; width:100%");

    });
    request.fail(function (msg) {
        if ($("#senhaDeAcesso").val() == '') {
            alert("Senha deve ser preenchida!");
        }
        else {
            alert("Erro ao alterar a Senha!");
        }
        console.log(msg);
        console.log("Não foi possível realizar a operação, tente novamente.");
        $("#divAtualizarSenha").attr("style", "display:block");
        $("#divCarregaAtualizarSenha").attr("style", "display:none;text-align:center; width:100%");
    });

}



// D0038 - ATUALIZAR DADOS DO PROFISSIONAL
function editarMeuPerfilPro() {

    var msgerro = "";
    if ($("#nomeClienteEditar").val().trim() == "")
        msgerro = msgerro + "* Nome é obrigatório!  \r\n";

    if ($("#tipoProfissionalLista").val().trim() == "")
        msgerro = msgerro + "* Especialização é obrigatório!  \r\n";

    if ($("#cpfCliente").val() == "")
        msgerro = msgerro + "* CPF/CNPJ é obrigatório! \r\n";

    if ($("#telefoneCelular").val() == "")
        msgerro = msgerro + "* Telefone Celular é obrigatório!  \r\n";

    if ($("#cepCliente").val() == "")
        msgerro = msgerro + "* CEP é obrigatório! \r\n";

    if ($("#enderecoCliente").val() == "")
        msgerro = msgerro + "* Endereço é obrigatório! \r\n";

    if ($("#numeroCliente").val() == "")
        msgerro = msgerro + "* Número é obrigatório! \r\n";

    if ($("#bairroCliente").val() == "")
        msgerro = msgerro + "* Bairro é obrigatório! \r\n";

    if ($("#estado").val() == "")
        msgerro = msgerro + "* Estado é obrigatório! \r\n";

    if ($("#cidade").val() == "" || $("#cidade").val() == null)
        msgerro = msgerro + "* Cidade é obrigatório! \r\n";


    if (msgerro != "") {
        alert(msgerro);
        return false;
    }

    if ($("#telefoneCelular").val().length < 10) {
        alert("Telefone Celular inválido!");
        $("#telefoneCelular").focus();
        return false;
    }

    if ($("#emailCliente").val() != "") {
        var valida = validacaoEmail($("#emailCliente").val());
        if (valida != true) {
            alert("* E-mail inválido!");
            $("#emailCliente").focus();
            return false;
        }
    }

    $("#divEditarPerfil").attr("style", "display:none");
    $("#divCarregaEditarPerfil").attr("style", "display:block;text-align:center; width:100%");

    var profs = window.currencies;
    var existProf = false;
    for (var i = 0; i < profs.length; i++) {

        if (profs[i] == $("#tipoProfissionalLista").val()) {
            existProf = true;
        }
    }

    if (existProf == false) {
        alert("Profissão não Encontrada!");
        $("#tipoProfissionalLista").focus();
        $("#divEditarPerfil").attr("style", "display:block");
        $("#divCarregaEditarPerfil").attr("style", "display:none;text-align:center; width:100%");
        return;
    }

    

    var idUsuario = localStorage.getItem("idProfissionalLogado");
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
    var curriculum = $("#cadastroCurriculoPro").val();
    //var Ativo = $("#CadastroAtivo").val();

    var Ativo = $("[name=CadastroAtivo]:checked").val();

    var estadoPro = $("#estado").val();
    var cidadePro = $("#cidade").val();

    var latitude = localStorage.getItem("Latitude");
    var longitude = localStorage.getItem("Longitude");
    var idCidade = localStorage.getItem("CidadeId");

    var especializacaoPro = $("#tipoProfissionalLista").val();

    var espec = [];
    espec.push({ "EspecializacaoId": especializacaoPro });

    // PEGAR LATITUDE E LONGITUDE
    var request = $.ajax({
        method: "GET",
        async: false,
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + numero + "+" + nomeRua + ",+" + cidadePro + ",+" + estadoPro + "&key=AIzaSyCUGRiH2iey-c2WqqeegGF2qpxBDNLsmfQ"
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        console.log("Latitude do Google: " + msg["results"][0]["geometry"]["location"]["lat"] + " Longitude do Google: " + msg["results"][0]["geometry"]["location"]["lng"]);

        latitude = msg["results"][0]["geometry"]["location"]["lat"];
        longitude = msg["results"][0]["geometry"]["location"]["lng"];

        localStorage.setItem("Latitude", msg["results"][0]["geometry"]["location"]["lat"]);
        localStorage.setItem("Longitude", msg["results"][0]["geometry"]["location"]["lng"]);

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar a Lista de estados");
        $("#divEditarPerfil").attr("style", "display:block");
        $("#divCarregaEditarPerfil").attr("style", "display:none;text-align:center; width:100%");

    });
    // PEGAR LATITUDE E LONGITUDE

    console.log("Latitude atual: " + latitude + " Longitude atual: " + longitude);

    // SETAR NA SESSÃO O ID DA CIDADE
    //getIdEstadoCidade(estadoPro, cidadePro);

    var idCidade = 0;// localStorage.getItem("cidadeId");

    console.log("ID DO USUARIO: " + idUsuario); console.log("Vamos atualizar os dados agora...");

    endereco = { cidadeId: idCidade, Cidade: cidadePro, Estado: estadoPro, Nome: nomeRua, numero: numero, bairro: bairro, cep: cep, latitude: latitude, longitude: longitude }

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/editar",
        data: {
            profissionalid: idUsuario,
            nome: nome,
            telefonefixo: telefoneFixo,
            telefonecelular: telefoneCelular,
            email: email,
            cpf: cpf,
            Descricao: curriculum,
            //senha: senhaUsuario,
            endereco: endereco,
            Especializacao: espec,
            ativo: Ativo
        }
    })
    request.done(function (msg) {

        //localStorage.setItem("idProfissionalLogado", msg["Data"]["ProfissionalId"]);
        localStorage.setItem("Nome", msg["Data"]["Nome"]);
        localStorage.setItem("TelefoneFixo", msg["Data"]["TelefoneFixo"]);
        localStorage.setItem("TelefoneCelular", msg["Data"]["TelefoneCelular"]);
        localStorage.setItem("Email", msg["Data"]["Email"]);
        localStorage.setItem("Cpf", msg["Data"]["DocumentoLogin"]);
        //localStorage.setItem("NomeFotoPro", msg["Data"]["NomeFoto"]);
        localStorage.setItem("Ativo", msg["Data"]["Ativo"]);

        localStorage.setItem("CidadeId", msg["Data"]["Endereco"]["CidadeId"]);
        localStorage.setItem("NomeRua", msg["Data"]["Endereco"]["Nome"]);

        localStorage.setItem("Numero", msg["Data"]["Endereco"]["Numero"]);
        localStorage.setItem("Complemento", msg["Data"]["Endereco"]["Complemento"]);
        localStorage.setItem("Bairro", msg["Data"]["Endereco"]["Bairro"]);
        localStorage.setItem("Cep", msg["Data"]["Endereco"]["Cep"]);
        localStorage.setItem("Latitude", msg["Data"]["Endereco"]["Latitude"])
        localStorage.setItem("Longitude", msg["Data"]["Endereco"]["Longitude"]);
        localStorage.setItem("Especializacao", msg["Data"]["Especializacao"][0]["Nome"]);
        localStorage.setItem("Curriculum", msg["Data"]["Descricao"]);

        localStorage.setItem("CidadeNome", msg["Data"]["Endereco"]["CidadeNome"]);
        localStorage.setItem("EstadoSigla", msg["Data"]["Endereco"]["EstadoSigla"]);
  

        alert("Dados atualizados com sucesso!");
        console.log(msg);
        console.log("Dados (outras informações) atualizados com sucesso!");

        $("#divEditarPerfil").attr("style", "display:block");
        $("#divCarregaEditarPerfil").attr("style", "display:none;text-align:center; width:100%");

    });
    request.fail(function (msg) {
        console.log(msg);
        console.log("Não foi possível realizar a operação, tente novamente.");
        $("#divEditarPerfil").attr("style", "display:block");
        $("#divCarregaEditarPerfil").attr("style", "display:none;text-align:center; width:100%");
    });


}


// D0039 - CLIENTE SOLICITA CONTATO DO PROFISSIONAL
function solicContato() {

    $("#btnSolicitarContato").attr("style", "display:none");
    $("#divAguardeSolContato").attr("style", "display:block;text-align:center; width:100%");

    var idPro = localStorage.getItem("Profissional");
    var idCli = localStorage.getItem("ClienteId");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/SolicitarContato",
        data: {
            ClienteId: idCli,
            ProfissionalId: idPro
        }
    })
    request.done(function (msg) {

        console.log(msg);
        console.log("Solicitação de contato realizada com sucesso!");
        alert("Solicitação de contato realizada com sucesso");
        $("#btnSolicitarContato").attr("style", "display:block");
        $("#divAguardeSolContato").attr("style", "display:none;text-align:center; width:100%");

    });
    request.fail(function () {
        alert("Erro ao solicitar contato. \r\n Tente novamente mais tarde!");
        console.log("Não foi possível realizar a operação, tente novamente.");
        $("#btnSolicitarContato").attr("style", "display:block");
        $("#divAguardeSolContato").attr("style", "display:none;text-align:center; width:100%");
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

        $(".itfEnderecoCli").val(dados.address.split("-")[0]);
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

        $(".itfEndereco").val(dados.address.split('-')[0]);
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
    if ($("#cadastroNomePro").val().trim() == "")
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

    if ($("#cadastroSenhaPro").val().length < 6) {
        alert("Senha deve ter no mínimo 6 caracters!");
        $("#cadastroSenhaPro").focus();
        return false;
    }


    //var img = document.getElementById('fotoPerfilPro').files[0];
    if (form != undefined) {
        $("#conteudoLoginPro").attr("style", "display:none");
        $("#divAguardeCadPro").attr("style", "display:block;text-align:center; width:100%");
        var dtImg = new Date().toLocaleString().replace('/', '').replace('/', '').replace(':', '').replace(':', '').replace(' ', '').replace(' ', '');
        $.ajax({
            //url: 'http://api.csprofissionais.com.br/api/imagem/PostImagem', // Url do lado server que vai receber o arquivo
            url: 'http://api.csprofissionais.com.br/api/imagem/PostImg/' + dtImg,
            data: form,
            processData: false,
            contentType: false,
            cache: false,
            async: false,
            type: 'POST',
            success: function (data) {
                nomeFoto = data[0];
                nomeFoto = dtImg + document.getElementById('fotoPerfilPro').files[0].name;
                procCadastroPro();
                //retorno = data;
                //alert(data); // utilizar o retorno
            },
            error: function (data) {
                // nomeFoto = data[0];
                nomeFoto = dtImg + document.getElementById('fotoPerfilPro').files[0].name;
                procCadastroPro();
                $("#conteudoLoginPro").attr("style", "display:block");
                $("#divAguardeCadPro").attr("style", "display:none;text-align:center; width:100%")
            }

            //,
            //beforeSend: function (data) {
            //    nomeFoto = data[0];
            //    procCadastroPro();
            //    $("#conteudoLoginPro").attr("style", "display:none");
            //    $("#divAguardeCadPro").attr("style", "display:block")
            //},
            //complete: function (data) {
            //    nomeFoto = data[0];
            //    procCadastroPro();
            //    $("#conteudoLoginPro").attr("style", "display:block");
            //    $("#divAguardeCadPro").attr("style", "display:none")
            //},
        });
    } else {
        $("#conteudoLoginPro").attr("style", "display:none");
        $("#divAguardeCadPro").attr("style", "display:block;text-align:center; width:100%")
        procCadastroPro();
    }

};


// D0044 - BUSCAR ULTIMOS TRABALHOS DO PROFISSIONAL LOGAGO
function buscarUltimosTrabalhosPro() {

    $('#ultimosTrabalhosWork').val('');
    //$('#ultimosTrabalhosWork').html("");
    var profissional = localStorage.getItem("idProfissionalLogado");
    console.log("Vamos buscar os últimos trabalhos do profissional ID: " + profissional);


    // PEGAR IMAGENS DOS ÚLTIMOS TRABALHOS DO PROFISSIONAL
    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/ObterImagens/" + profissional
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        if (msg["Data"]["Imagens"].length > 0) {
            var totImagens = msg["Data"]["Imagens"].length;

            for (i = 0; i < totImagens; i++) {

                $('#ultimosTrabalhosWork').prepend("<div id='imagemTrabalhoDiv" + msg["Data"]["Imagens"][i]["ImagensProfissionalId"] + "'><img src='http://www.csprofissionais.com.br/upload/" + msg["Data"]["Imagens"][i]["Nome"] + "' style='width:100%;height:auto;margin-bottom:8px;padding:3px;border:1px solid #efefef;' /><p><button onclick='apagarImagemPro(" + msg["Data"]["Imagens"][i]["ImagensProfissionalId"] + ");' class='btn btn-danger btn-xs'>apagar</button></p><br></div>")
                console.log("Imagem do trabalho do profissional impressa: http://www.csprofissionais.com.br/upload/" + msg["Data"]["Imagens"][i]["Nome"]);

            }
        } else {
            $('#ultimosTrabalhosWork').prepend("<p>Você ainda não enviou nenhum trabalho</p>");
        }


    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar pegar os dados desse profissional");
        $('#ultimosTrabalhosWork').prepend("<p style='text-align:center;'>Nenhuma imagem encontrada ou disponível no servidor.</p>");
    });



}


// D0045 - UPLOAD DE NOVO TRABALHO DO PROFISSIONAL

$('#fotoTrabalho').change(function (event) {
    form = new FormData();
    form.append('fileUpload', event.target.files[0]); // para apenas 1 arquivo
    //var name = event.target.files[0].content.name; // para capturar o nome do arquivo com sua extenção
});

$('#SendfotoTrabalho').click(function () {
    $('#SendfotoTrabalho').html("enviando....");

    $("#divBtnSendFoto").attr("style", "display:none");
    $("#divEnviandoFoto").attr("style", "display:block;text-align:center; width:100%");


    setTimeout(function () {



        var retorno = '';
        var imagemTrabalho = '';
        var dtImg = new Date().toLocaleString().replace('/', '').replace('/', '').replace(':', '').replace(':', '').replace(' ', '').replace(' ', '');
        var nomeFotoTrabalho = dtImg + document.getElementById('fotoTrabalho').files[0].name;
        var request = $.ajax({
            url: 'http://api.csprofissionais.com.br/api/imagem/PostImg/' + dtImg, // Url do lado server que vai receber o arquivo
            data: form,
            processData: false,
            contentType: false,
            async: false,
            type: 'POST',
            success: function (data) {
                //retorno = data;
                //alert(data); // utilizar o retorno
            }
        });
        //alert(retorno);
        request.done(function (msg) {

            imagemTrabalho = msg;
            imagemTrabalho = nomeFotoTrabalho;
            console.log(imagemTrabalho);
            $('#SendfotoTrabalho').html("enviar novo trabalho");
            $("#divBtnSendFoto").attr("style", "display:block");
            $("#divEnviandoFoto").attr("style", "display:none;text-align:center; width:100%");

        })
        request.fail(function () {
            imagemTrabalho = nomeFotoTrabalho;
            alert("Erro ao subir imagem!");
            console.log("Deu ruim o cadastro");
            $("#divBtnSendFoto").attr("style", "display:block");
            $("#divEnviandoFoto").attr("style", "display:none;text-align:center; width:100%");

        });


        if (imagemTrabalho != '') {
            console.log("Salvando na API " + imagemTrabalho);
            var profissionalTrabalho = localStorage.getItem("idProfissionalLogado");


            var request = $.ajax({
                method: "POST",
                url: "http://api.csprofissionais.com.br/api/profissional/InserirImagem",
                data: { ProfissionalId: profissionalTrabalho, Nome: imagemTrabalho }
            })
            request.done(function (msg) {

                if (!msg["Data"]) {
                    alert("Ocorreu um erro em tentar salvar a imagem no servidor, tente novamente mais tarde");
                } else {
                    alert("Imagem enviada com sucesso");

                    $('#ultimosTrabalhosWork').prepend("<div id='imagemTrabalhoDiv" + msg["Data"]["ImagensProfissionalId"] + "'><img src='http://www.csprofissionais.com.br/upload/" + msg["Data"]["Nome"] + "' style='width:100%;height:auto;margin-bottom:8px;padding:3px;border:1px solid #efefef;' /><p><button onclick='apagarImagemPro(" + msg["Data"]["ImagensProfissionalId"] + ");' class='btn btn-danger btn-xs'>apagar</button></p><br></div>")
                    console.log("Imagem salva na galeria do profissional com sucesso");
                }
                //buscarUltimosTrabalhosPro();
            });
            request.fail(function () {

                alert("Ocorreu um erro em tentar salvar a imagem no servidor, tente novamente mais tarde");
                //buscarUltimosTrabalhosPro();
            });


        }

    }, 3000);

});

// D0046 - APAGAR IMAGEM DA GALERIA DE TRABALHOS DO PROFISSIONAL
function apagarImagemPro(idImagem) {

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/profissional/DeletarImagem/" + idImagem
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        console.log("Imagem removida com sucesso");
        alert("Imagem removida com sucesso");
        $('#imagemTrabalhoDiv' + idImagem).fadeOut();
        //buscarUltimosTrabalhosPro();
    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar apagar a imagem");
        //buscarUltimosTrabalhosPro();
    });

}


// D0047 - ATUALIZAR FOTO DE PERFIL DO PROFISSIONAL
$('#fotoPerfilPro2').change(function (event) {
    form = new FormData();
    form.append('fileUpload', event.target.files[0]); // para apenas 1 arquivo
    //var name = event.target.files[0].content.name; // para capturar o nome do arquivo com sua extenção
});

$('#updateProfilePicture_old').click(function () {


    $("#divAtualizarFotoPerfil").attr("style", "display:none");
    $("#divFotoPerfil").attr("style", "display:block;text-align:center; width:100%");


    if (form != undefined) {
        var imagemPerfil = '';

        var dtImg = new Date().toLocaleString().replace('/', '').replace('/', '').replace(':', '').replace(':', '').replace(' ', '').replace(' ', '');

        nomeFoto = dtImg + document.getElementById('fotoPerfilPro2').files[0].name;

        var request = $.ajax({
            url: 'http://api.csprofissionais.com.br/api/imagem/PostImg/' + dtImg, // Url do lado server que vai receber o arquivo
            data: form,
            processData: false,
            contentType: false,
            async: false,
            type: 'POST',
            success: function (data) {
                //retorno = data;
                //alert(data); // utilizar o retorno
            }
        });
        //alert(retorno);
        request.done(function (msg) {

            imagemPerfil = msg;
            imagemPerfil = nomeFoto;
            localStorage.setItem("NomeFotoPro", nomeFoto);
            console.log(imagemPerfil);
            alert("Imagem atualizada com sucesso");
            $("#divAtualizarFotoPerfil").attr("style", "display:block");
            $("#divFotoPerfil").attr("style", "display:none;text-align:center; width:100%");

            $('#imgFotoPerfil').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomeFotoPro"));
        })
        request.fail(function () {
            imagemPerfil = nomeFoto;
            localStorage.setItem("NomeFotoPro", nomeFoto);
            console.log("Deu ruim o cadastro");
            $("#divAtualizarFotoPerfil").attr("style", "display:block");
            $("#divFotoPerfil").attr("style", "display:none;text-align:center; width:100%");
        });


        if (imagemPerfil != '') {
            console.log("Atualizando Perfil " + imagemPerfil);
            var profissionalPicture = localStorage.getItem("idProfissionalLogado");

            var request = $.ajax({
                method: "POST",
                url: "http://api.csprofissionais.com.br/api/profissional/AlterarImagemPerfil",
                data: {
                    UsuarioId: profissionalPicture,
                    Foto: imagemPerfil
                }
            })
            request.done(function (msg) {

                console.log(msg);
                console.log("Dados (profile picture) atualizados com sucesso!");

            });
            request.fail(function () {
                console.log("Não foi possível realizar a operação, tente novamente.");
            });


        }
    }
    else {
        alert('Selecionar a imagem!');
    }


});

function AtualizaFotoPerfilAll() {
    ExibeIconeCarregandoFotoPerfil();

    // alert('carregando');

    setTimeout(function () {
        AtualizaFotoPerfil();
    }, 3000);



    //RemoveIconeCarregandoFotoPerfil();
}
function AtualizaFotoPerfilAllNew() {
    ExibeIconeCarregandoFotoPerfil();

    // alert('carregando');

    setTimeout(function () {
        AtualizaFotoPerfilNew();
    }, 3000);



    //RemoveIconeCarregandoFotoPerfil();
}




function ExibeIconeCarregandoFotoPerfil() {

    $('.updateProfilePicture').css({ display: "none" });
    //$("#divAtualizarFotoPerfil").attr("style", "display:none");
    $('.divFotoPerfil').css({ display: "block" });
}

function RemoveIconeCarregandoFotoPerfil() {

    $('.updateProfilePicture').css({ display: "block" });
    //$("#divAtualizarFotoPerfil").attr("style", "display:none");
    $('.divFotoPerfil').css({ display: "none" });
}



function AtualizaFotoPerfil() {
    //$("#updateProfilePicture").attr("style", "display:none");
    ////$("#divAtualizarFotoPerfil").attr("style", "display:none");
    //$("#divFotoPerfil").attr("style", "display:block;text-align:center; width:100%");


    if (form != undefined) {
        var imagemPerfil = '';

        var dtImg = new Date().toLocaleString().replace('/', '').replace('/', '').replace(':', '').replace(':', '').replace(' ', '').replace(' ', '');

        nomeFoto = dtImg + document.getElementById('fotoPerfilPro2').files[0].name;

        var request = $.ajax({
            url: 'http://api.csprofissionais.com.br/api/imagem/PostImg/' + dtImg, // Url do lado server que vai receber o arquivo
            data: form,
            processData: false,
            contentType: false,
            async: false,
            type: 'POST',
            success: function (data) {
                //retorno = data;
                //alert(data); // utilizar o retorno
            }
        });
        //alert(retorno);
        request.done(function (msg) {

            imagemPerfil = msg;
            imagemPerfil = nomeFoto;
            localStorage.setItem("NomeFotoPro", nomeFoto);
            //console.log(imagemPerfil);

            // $("#updateProfilePicture").attr("style", "display:block");
            //// $("#divAtualizarFotoPerfil").attr("style", "display:block");
            // $("#divFotoPerfil").attr("style", "display:none;text-align:center; width:100%");

            $('#imgFotoPerfil').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomeFotoPro"));
        })
        request.fail(function () {
            imagemPerfil = nomeFoto;
            localStorage.setItem("NomeFotoPro", nomeFoto);
            //console.log("Deu ruim o cadastro");
            //$("#updateProfilePicture").attr("style", "display:block");
            ////$("#divAtualizarFotoPerfil").attr("style", "display:block");
            //$("#divFotoPerfil").attr("style", "display:none;text-align:center; width:100%");
        });


        if (imagemPerfil != '') {
            //console.log("Atualizando Perfil " + imagemPerfil);
            var profissionalPicture = localStorage.getItem("idProfissionalLogado");

            var request = $.ajax({
                method: "POST",
                url: "http://api.csprofissionais.com.br/api/profissional/AlterarImagemPerfil",
                data: {
                    UsuarioId: profissionalPicture,
                    Foto: imagemPerfil
                }
            })
            request.done(function (msg) {
                alert("Imagem atualizada com sucesso!");
                $('.updateProfilePicture').css({ display: "block" });
                //$("#divAtualizarFotoPerfil").attr("style", "display:none");
                $('.divFotoPerfil').css({ display: "none" });
                //console.log(msg);
                //console.log("Dados (profile picture) atualizados com sucesso!");

            });
            request.fail(function () {
                alert("Falha ao atualizar imagem!");
                $('.updateProfilePicture').css({ display: "block" });
                //$("#divAtualizarFotoPerfil").attr("style", "display:none");
                $('.divFotoPerfil').css({ display: "none" });
                //console.log("Não foi possível realizar a operação, tente novamente.");
            });


        }
    }
    else {
        alert('Selecionar a imagem!');
        $('.updateProfilePicture').css({ display: "block" });
        //$("#divAtualizarFotoPerfil").attr("style", "display:none");
        $('.divFotoPerfil').css({ display: "none" });
    }

}

function AtualizaFotoPerfilNew() {
    //$("#updateProfilePicture").attr("style", "display:none");
    ////$("#divAtualizarFotoPerfil").attr("style", "display:none");
    //$("#divFotoPerfil").attr("style", "display:block;text-align:center; width:100%");


    if (form != undefined) {
        var imagemPerfil = '';

        var dtImg = new Date().toLocaleString().replace('/', '').replace('/', '').replace(':', '').replace(':', '').replace(' ', '').replace(' ', '');

        nomeFoto = dtImg + document.getElementById('fotoPerfilPro2').files[0].name;

        var request = $.ajax({
            url: 'http://api.csprofissionais.com.br/api/imagem/PostImg/' + dtImg, // Url do lado server que vai receber o arquivo
            data: form,
            processData: false,
            contentType: false,
            async: false,
            type: 'POST',
            success: function (data) {
                //retorno = data;
                //alert(data); // utilizar o retorno
            }
        });
        //alert(retorno);
        request.done(function (msg) {

            imagemPerfil = msg;
            imagemPerfil = nomeFoto;
            localStorage.setItem("NomeFotoPro", nomeFoto);
            //console.log(imagemPerfil);

            // $("#updateProfilePicture").attr("style", "display:block");
            //// $("#divAtualizarFotoPerfil").attr("style", "display:block");
            // $("#divFotoPerfil").attr("style", "display:none;text-align:center; width:100%");

            $('#imgFotoPerfilnew').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomeFotoPro"));
            $('#fotoPro').attr('src', 'http://www.csprofissionais.com.br/upload/' + localStorage.getItem("NomeFotoPro"));

        })
        request.fail(function () {
            imagemPerfil = nomeFoto;
            localStorage.setItem("NomeFotoPro", nomeFoto);
            //console.log("Deu ruim o cadastro");
            //$("#updateProfilePicture").attr("style", "display:block");
            ////$("#divAtualizarFotoPerfil").attr("style", "display:block");
            //$("#divFotoPerfil").attr("style", "display:none;text-align:center; width:100%");
        });


        if (imagemPerfil != '') {
            //console.log("Atualizando Perfil " + imagemPerfil);
            var profissionalPicture = localStorage.getItem("idProfissionalLogado");

            var request = $.ajax({
                method: "POST",
                url: "http://api.csprofissionais.com.br/api/profissional/AlterarImagemPerfil",
                data: {
                    UsuarioId: profissionalPicture,
                    Foto: imagemPerfil
                }
            })
            request.done(function (msg) {
                alert("Imagem atualizada com sucesso!");
                $('.updateProfilePicture').css({ display: "block" });
                //$("#divAtualizarFotoPerfil").attr("style", "display:none");
                $('.divFotoPerfil').css({ display: "none" });
                //console.log(msg);
                //console.log("Dados (profile picture) atualizados com sucesso!");

            });
            request.fail(function () {
                alert("Falha ao atualizar imagem!");
                $('.updateProfilePicture').css({ display: "block" });
                //$("#divAtualizarFotoPerfil").attr("style", "display:none");
                $('.divFotoPerfil').css({ display: "none" });
                //console.log("Não foi possível realizar a operação, tente novamente.");
            });


        }
    }
    else {
        alert('Selecionar a imagem!');
        $('.updateProfilePicture').css({ display: "block" });
        //$("#divAtualizarFotoPerfil").attr("style", "display:none");
        $('.divFotoPerfil').css({ display: "none" });
    }

}

// D0048 - BUSCAR SOLICITAÇÕES DE CONTATO
function buscarTrabalhos() {

    var profissionalLogado = localStorage.getItem("idProfissionalLogado");
    // var profissionalLogado = 27;

    console.log("Buscando as solicitações de contato do Profissional: " + profissionalLogado);
    $("#solicitacoesContatoWork").html('');


    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/profissional/SolicitacoesContato/" + profissionalLogado
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        if (msg["Data"]) {
            var totContato = msg["Data"].length;
            totContato = totContato - 1;


            for (i = totContato; i >= 0; i--) {
                if (msg["Data"][i]["DataLeitura"] == "") {
                    $("#solicitacoesContatoWork").prepend("<p style='background:#DDFFFF'><b>Nome do cliente: </b> " + msg["Data"][i]["ClienteNome"] + "<br><b>Telefone: </b><a href='tel:0" + msg["Data"][i]["Telefone"] + "'>" + msg["Data"][i]["Telefone"] + "</a><br><b>E-mail: </b>" + msg["Data"][i]["Email"] + "<br><b>Data solicitação: </b>" + msg["Data"][i]["DataSolicitacao"] + "<hr /></p>");
                } else {
                    $("#solicitacoesContatoWork").prepend("<b>Nome do cliente: </b> " + msg["Data"][i]["ClienteNome"] + "<br><b>Telefone: </b>" + msg["Data"][i]["Telefone"] + "<br><b>E-mail: </b>" + msg["Data"][i]["Email"] + "<br><b>Data solicitação: </b>" + msg["Data"][i]["DataSolicitacao"] + "<hr />");
                }
            }

            var requestLidas = $.ajax({
                method: "GET",
                url: "http://api.csprofissionais.com.br/api/profissional/SolicitacoesContatoLidas/" + profissionalLogado
                //data: { email: login, senha: senha }
            });
            requestLidas.done(function (msg) {
                //alert('Passou');
            });
            requestLidas.fail(function () {
                //alert('Erro');
            });

        } else {
            $("#solicitacoesContatoWork").html("Nenhuma solicitação de contato ainda");
        }
    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar as solicitações de contato");
        $("#solicitacoesContatoWork").html("<p>Ocorreu um erro ao tentar carregar as solicitações de contato</p>");
    });



}

// D0049 - VERIFICAR A VERSÃO ATUAL DO APLICATIVO
function verificaVersaoAtual() {

    var request = $.ajax({
        method: "GET",
        url: "http://api.csprofissionais.com.br/api/versao/getversao"
        //data: { email: login, senha: senha }
    })
    request.done(function (msg) {

        console.log("VERSÃO MAIS RECENTE DO APLICATIVO: " + msg["Data"]["Versao"]);
        console.log("VERSÃO ATUAL INSTALADA: " + versaoApp);

        if (msg["Data"]["Versao"] == versaoApp) {
            console.log("APLICATIVO ESTÁ ATUALIZADO");
        } else {
            console.log("DIRECIONANDO O USUÁRIO PARA A LOJA DE APLICATIVO");
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;


            // USER ANDROID
            if (/android/i.test(userAgent)) {
                alert('Nova Versão disponível! \r\n Favor efetuar a atualização');
                //location.href = "https://play.google.com/store/search?q=csprofissionais";
                //location.href ="https://play.google.com/store/apps/details?id=com.CSPROFISSIONAIS_2016BETA1";
                location.href = "https://play.google.com/store?hl=pt_BR";
            }

            // USER IOS
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                location.href = "http://www.apple.com/us/search/csprofissionais";
                //location.href = "https://www.appstore.com/";

            }
        }

    });
    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar as solicitações de contato");
        $("#solicitacoesContatoWork").html("<p>Ocorreu um erro ao tentar carregar as solicitações de contato</p>");
    });

}
function ClickTextPro(val) {

    $('#modalCadastroProfissional').animate({
        scrollTop: val//$('.' + val).offset().top
    }, 1500);
    //alert($('.' + val).offset().top);
}

function ClickTextCli(val) {

    $('#modalCadastroCliente').animate({
        scrollTop: val//$('.' + val).offset().top
    }, 1500);
    //alert($('.' + val).offset().top);
}

function ClickTextEditCli(val) {

    $('html, body').animate({
        scrollTop: val//$('.' + val).offset().top
    }, 1500);
    //alert($('.' + val).offset().top);
}

function ClickTextEditPro(val) {

    $('html, body').animate({
        scrollTop: val//$('.' + val).offset().top
    }, 1500);
    //alert($('.' + val).offset().top);
}


function ClickTextMensPro(val) {

    $('html, body').animate({
        scrollTop: $('.' + val).offset().top - 100
    }, 1500);
    //alert($('.' + val).offset().top);
}

function EfetuaLogOff() {


    $('#efetuarlogoff').attr("style", "display:none");
    //$("#divAtualizarFotoPerfil").attr("style", "display:none");
    $('#divefetuarlogoff').attr("style", "display:block; width:100%; text-align:center;");

    setTimeout(function () {
        localStorage.clear();
        history.go(-(history.length - 1));

        $('#efetuarlogoff').attr("style", "display:block");
        //$("#divAtualizarFotoPerfil").attr("style", "display:none");
        $('#divefetuarlogoff').attr("style", "display:none");
    }, 3000);


    //location.href = "index.html?clear=1";
    
}

function exitFromApp() {
    //console.log("in button");
    //navigator.app.exitApp();
    //try{
    //    window.close();
    //}catch(err)
    //{
    //    alert('Erro window close');
    //}
    //try{
    //    navigator.app.exitApp();
    //}
    //catch (err) {
    //    alert('Erro exitApp');
    //}
    // window.closed();
    //this.webView.postMessage("exit", null);
    // finish();

    try {
        navigator.app.exitApp();

    } catch (err) {

    }

    try {
        if (navigator.app) {
            navigator.app.exitApp();
        }
        else if (navigator.device) {
            navigator.device.exitApp();
        }
    }
    catch (err) {
    }

    try {
        app.exitApp();
    }
    catch (err) {
    }
}
function onLoad() {
    try {
        document.addEventListener("deviceready", onDeviceReady, true);
    }
    catch (err) {
    }
}

function procVerificaUsuarioLogado() {

    var sessaoUser = localStorage.getItem("ClienteId");
    if (!sessaoUser) {

        var sessaoProf = localStorage.getItem("idProfissionalLogado");
        if (!sessaoProf) {
            //alert("Por favor, faça seu login novamente");
        }
        else {
            window.location.href = "dashboard-pro.html";
        }

    }
    else {
        location.href = "dashboard.html";
    }

}

function procEsqueciSenhaCliente() {

    var login = $("#loginEsqueci").val();
   

    if (login == "") {
        alert("E-mail obrigatório!");
        return 1;
    }

    $("#conteudoEsqueciCli").attr("style", "display:none");
    $("#divAguardeEsqueciCli").attr("style", "display:block;text-align:center; width:100%");

    var request = $.ajax({
        method: "POST",
        //url: "http://api.csprofissionais.com.br/api/EsqueciSenha/Cliente",
        url: "http://api.csprofissionais.com.br/api/EsqueciSenha/Cliente",
        data: { email: login}
    })

    request.done(function (msg) {

        if (!msg["Data"]) {
            alert("Cadastro não encontrado!");
            $("#conteudoEsqueciCli").attr("style", "display:block");
            $("#divAguardeEsqueciCli").attr("style", "display:none;text-align:center; width:100%");
        } else {
            alert("Senha enviada com sucesso!");
            $("#conteudoEsqueciCli").attr("style", "display:block");
            $("#divAguardeEsqueciCli").attr("style", "display:none;text-align:center; width:100%");
        }
    });

    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar as solicitações de contato");
        $("#conteudoEsqueciCli").attr("style", "display:block");
        $("#divAguardeEsqueciCli").attr("style", "display:none;text-align:center; width:100%");
    });

}


function procEsqueciSenhaProfissional() {

    var login = $("#loginEsqueciProf").val();
    
    if (login == "") {
        alert("Documento obrigatório!");
        return 1;
    }

    $("#conteudoEsqueciPro").attr("style", "display:none");
    $("#divAguardeEsqueciPro").attr("style", "display:block;text-align:center; width:100%");

    var request = $.ajax({
        method: "POST",
        url: "http://api.csprofissionais.com.br/api/EsqueciSenha/Profissional",
        data: { documento: login }
    })

    request.done(function (msg) {

        if (!msg["Data"]) {
            alert("Cadastro não encontrado!");
            $("#conteudoEsqueciPro").attr("style", "display:block");
            $("#divAguardeEsqueciPro").attr("style", "display:none;text-align:center; width:100%");
        } else {
            alert("Senha enviada com sucesso!");
            $("#conteudoEsqueciPro").attr("style", "display:block");
            $("#divAguardeEsqueciPro").attr("style", "display:none;text-align:center; width:100%");
        }
    });

    request.fail(function () {
        console.log("Ocorreu um erro ao tentar carregar as solicitações de contato");
        $("#conteudoEsqueciPro").attr("style", "display:block");
        $("#divAguardeEsqueciPro").attr("style", "display:none;text-align:center; width:100%");
    });

}



function validaCpfCnpj(val) {
    var valid = null;
    valid = validate_cpf(val);
    if (valid != true) {
        valid = validate_cnpj(val);
    }
}

function validate_cnpj(val) {

    if (val.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/) != null) {
        var val1 = val.substring(0, 2);
        var val2 = val.substring(3, 6);
        var val3 = val.substring(7, 10);
        var val4 = val.substring(11, 15);
        var val5 = val.substring(16, 18);

        var i;
        var number;
        var result = true;

        number = (val1 + val2 + val3 + val4 + val5);

        s = number;

        c = s.substr(0, 12);
        var dv = s.substr(12, 2);
        var d1 = 0;

        for (i = 0; i < 12; i++)
            d1 += c.charAt(11 - i) * (2 + (i % 8));

        if (d1 == 0)
            result = false;

        d1 = 11 - (d1 % 11);

        if (d1 > 9) d1 = 0;

        if (dv.charAt(0) != d1)
            result = false;

        d1 *= 2;
        for (i = 0; i < 12; i++) {
            d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
        }

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(1) != d1)
            result = false;

        return result;
    }
    return false;
}

function validate_cpf(val) {

    if (val.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/) != null) {
        var val1 = val.substring(0, 3);
        var val2 = val.substring(4, 7);
        var val3 = val.substring(8, 11);
        var val4 = val.substring(12, 14);

        var i;
        var number;
        var result = true;

        number = (val1 + val2 + val3 + val4);

        s = number;
        c = s.substr(0, 9);
        var dv = s.substr(9, 2);
        var d1 = 0;

        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (10 - i);
        }

        if (d1 == 0)
            result = false;

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(0) != d1)
            result = false;

        d1 *= 2;
        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (11 - i);
        }

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(1) != d1)
            result = false;

        return result;
    }

    return false;
}

function validacaoEmail(val) {
    var retorno = true;
    usuario = val.substring(0, val.indexOf("@"));
    dominio = val.substring(val.indexOf("@") + 1, val.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {

    }
    else {
        retorno = false;
    }

    return retorno;
}


function closeBrowser() {
    try {
        // if(history.length==1){
        //  window.open('mobile/close');
        // }else{
        //history.back();
        // }
        navigator.app.exitApp();
    } catch (erro) {

    }
    try {
        var ref = window.open('Sair.html', 'location=no');
        window.addEventListener('loadstart', function (event) {
            if (event.url.match("mobile/close")) {
                ref.close();
            }
        });

    } catch (erro) {
        alert(erro);
    }
}

//document.addEventListener("deviceready", onDeviceReady(), true);
function onDeviceReady() {
    // var today = new Date();
    //  var dd = today.getDate();
    //  if (dd == 19) {
    //      alert("Your application has been expired");
    // navigator.app.exitApp();
    //navigator.device.exitApp()
    // }
}

function closeMeNow() {
    if (typeof cordova !== 'undefined') {
        if (navigator.app) {
            navigator.app.exitApp();
        }
        else if (navigator.device) {
            navigator.device.exitApp();
        }
    } else {
        window.close();
        $timeout(function () {
            //   self.showCloseMessage = true;  //since the browser can't be closed (otherwise this line would never run), ask the user to close the window
        });
    }
}


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // document.addEventListener("backbutton", function (e) {
    //if ($.mobile.activePage.is('#index')) {
    //  e.preventDefault();
    navigator.app.exitApp();
    //}
    //else {
    //  navigator.app.backHistory()
    // }
    //}, false);
}

document.addEventListener("exitButton", function () {

    navigator.notification.confirm(
           'Do you want to quit',
           onConfirmQuit,
           'QUIT TITLE',
           'OK,Cancel'
    );

}, true);

function onConfirmQuit(button) {
    if (button == "1") {
        navigator.app.exitApp();
    }
}

document.addEventListener("backbutton", function () {
    if ($('.ui-page-active').attr('id') == 'main') {
        exitAppPopup();
    } else {
        history.back();
    }
}, false);

function exitAppPopup() {
    navigator.app.exitApp();
    navigator.notification.confirm(
          'Exit PhoneGap ' + device.cordova + ' Demo?'
        , function (button) {
            if (button == 2) {
                navigator.app.exitApp();
            }
        }
        , 'Exit'
        , 'No,Yes'
    );
    return false;
}