var logado = 1;
var key = localStorage.getItem("email");
//alert(key);

// CARREGAR INFORMAÇÕES DO USUÁRIO LOGADO
var ClienteId = 0;
var Nome = 0;
var TelefoneFixo = 0;
var TelefoneCelular = 0;
var Email = 0;
var Cpf = 0;
var CidadeId = 0;
var NomeRua = 0;
var Numero = 0;
var Complemento = 0;
var Bairro = 0;
var Cep = 0;

function infoUsuario(info)
{
     jQuery.ajax({
        url: 'http://www.diogenesjunior.com.br/cs/json/info-usuario.php?valor='+info+'&chave='+key,
        type: 'get',
        //dataType: 'html',
        success:function(data)
        {
            if(info=="ClienteId"){ ClienteId = data; }
            if(info=="Nome"){ Nome = data; }
            if(info=="TelefoneFixo"){ TelefoneFixo = data; }
            if(info=="TelefoneCelular"){ TelefoneCelular = data; }
            if(info=="Email"){ Email = data; }
            if(info=="Cpf"){ Cpf = data; }
            if(info=="CidadeId"){ CidadeId = data; }
            if(info=="NomeRua"){ NomeRua = data; }
            if(info=="Numero"){ Numero = data; }
            if(info=="Complemento"){ Complemento = data; }
            if(info=="Bairro"){ Bairro = data; }
            if(info=="Cep"){ Cep = data; }
        }       
    });
}

infoUsuario("ClienteId");
infoUsuario("Nome");
infoUsuario("TelefoneFixo");
infoUsuario("TelefoneCelular");
infoUsuario("Email");
infoUsuario("Cpf");
infoUsuario("CidadeId");
infoUsuario("NomeRua");
infoUsuario("Numero");
infoUsuario("Complemento");
infoUsuario("Bairro");
infoUsuario("Cep");

function showGetResult()
{
     jQuery.ajax({
        url: 'http://www.diogenesjunior.com.br/cs/json/verificar-sessao.php?chave='+key,
        type: 'get',
        //dataType: 'text/html',
        success:function(data)
        {
            //alert(data);   
            if(data=="logado"){

              console.log("logado");
              logado = 0;              

              console.log("ID CLIENTE: "+ClienteId);
              console.log("NOME: "+Nome);
              console.log("CEP: "+Cep);

              console.log("CPF: "+Cpf);
              console.log("EMAIL: "+Email);
              console.log("TELEFONE FIXO: "+TelefoneFixo);
              console.log("TELEFONE CELULAR: "+TelefoneCelular);

              console.log("ENDERECO: "+NomeRua);
              console.log("NUMERO: "+Numero);
              console.log("BAIRRO: "+Bairro);
              console.log("CIDADE: "+CidadeId);
              
              // PASSAR VALOR DO CEP PARA O CAMPO DE BUSCA
              $("#cepPesquisa").val(Cep);
              $("#nomeUsuario").html(Nome);

              //
              // POPULAR CAMPOS DO PERFIL
              //
              if (Cep==0) { Cep = "01545010"; };
              $("#nomeClienteEditar").val(Nome);
              $("#cpfCliente").val(Cpf);
              $("#emailCliente").val(Email);
              $("#telefoneFixo").val(TelefoneFixo);
              $("#telefoneCelular").val(TelefoneCelular);
              $("#enderecoCliente").val(NomeRua);
              $("#numeroCliente").val(Numero);
              $("#bairroCliente").val(Bairro);
              // CIDADE VINDO EM BRANCO POR CAUSA QUE O RETORNO ESTÁ VINDO COM ID EM VEZ DO NOME DA CIDADE
              //$("#cidadeCliente").val(CidadeId);
              $("#cepCliente").val(Cep);

            }
            if(data!="logado"){
              console.log("nao-logado");
              location.href="index-erro-login.html";
            }

            //document.write(data);
            return data;
        }      
    });
}

showGetResult();
