angular.module("User").controller("UserController", function($scope, UserFactory, AddressFactory){

    // Lista de Usuários (Inicia vazia)
    $scope.users = [];

    // Variavel para receber os valores do formulário ao cadastrar um usuário (Inicia vazia)
    $scope.newUser = {};

    // Função para carregar todos os usuários
    var loadUsers = function(){
        UserFactory.listAll().then(function(allUsers){
            $scope.users = allUsers;
        });
    }

    // Lista de endereços (Inica vazia)
    $scope.addresses = [];

    // Variavel para receber os valores do formuário ao cadastrar um endereço (Incia Vazia)
    $scope.newAddress = {};

    // Função para carregar todos os endereços de um usuário
    var loadAddresses = function(pessoaId){
        AddressFactory.listAll(pessoaId).then(function(allAddresses){
            $scope.addresses = allAddresses;
        });
    }

    // Função para adicionar um usuário. Ao final, a função limpa a variável newUser para limpar os campos do formulário
    $scope.addUser = function(){
        var user = {
            "nome": $scope.newUser.nome,
            "dataNascimento": $scope.newUser.dataNascimento,
            "idade": $scope.newUser.idade,
            "email": $scope.newUser.email,
            "telefone": $scope.newUser.telefone,
            "celular": $scope.newUser.celular
        };
        
        UserFactory.add(user);

        $scope.newUser = {};

        window.location.href = "index.html";
    }

    // Variavel que armazena um usuário pesquisado para ser editado (inicia vazia)
    $scope.searchedUser = {};

    // Função de pesquisa de usuário para editar
    $scope.searchUser = function(){
        var url = new URL(window.location.href);
        var pessoaId = url.searchParams.get("pessoaId");
        UserFactory.search(pessoaId).then(function(user){
            user.dataNascimento = new Date(user.dataNascimento);
            $scope.searchedUser = user;
        });
        loadAddresses(pessoaId);
    }

    // Função para salvar as edições em um usuário
    $scope.editUser = function(user){
        UserFactory.edit(user, user.pessoaId);

        $scope.searchedUser = {};

        window.location.href = "index.html";
    }

    // Função para deletar um usuário
    $scope.deleteUser = function(pessoaId){
        UserFactory.delete(pessoaId);
        setTimeout(function () {
            loadUsers();
        }, 500);        
    }

    // Função para adicionar um endereço
    $scope.addAddress = function(pessoaId){
        var address = {
            "pessoaId": pessoaId,
            "logradouro": $scope.newAddress.logradouro,
            "numero": $scope.newAddress.numero.toString(),
            "bairro": $scope.newAddress.bairro,
            "cidade": $scope.newAddress.cidade,
            "uf": $scope.newAddress.uf,
        };
        
        AddressFactory.add(address);
        setTimeout(function () {
            loadAddresses(pessoaId);
        }, 500);   

        $scope.newAddress = {};
    }

    // Função para deletar um endereço
    $scope.deleteAddress = function(enderecoId, pessoaId){
        AddressFactory.delete(enderecoId);
        setTimeout(function () {
            loadAddresses(pessoaId);
        }, 500);        
    }

    // Carrega todos os usuários ao iniciar
    loadUsers();
});