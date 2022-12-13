angular.module("User").controller("UserController", function($scope, UserFactory){

    // Lista de Usuários (Inicia vazia)
    $scope.users = [];


    // Função para carregar todos os usuários
    var loadUsers = function(){
        UserFactory.listAll().then(function(allUsers){
            $scope.users = allUsers;
        });
    }

    // Variavel para receber os valores do formulário ao cadastrar um usuário (Inicia vazia)
    $scope.newUser = {};

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

    // Carrega todos os usuários ao iniciar
    loadUsers();
});