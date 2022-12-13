// Interação com a API

angular.module("User").factory("UserFactory", function($q, $http){
    return {
        listAll: function(){
            var promessa = $q.defer();

            $http({
                method: "GET",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/GetAll",
                headers: {'chave': '6447450C-FCB7-461D-A8A1-AAD083E452DF'}
              })
            .then(function(result){
                var allUsers = [];

                angular.forEach(result.data.data, function(user, id){
                    user.id = id;
                    allUsers.push(user);
                });

                promessa.resolve(allUsers);
            }
            );

            return promessa.promise;
        },

        search: function(pessoaId){
            var promessa = $q.defer();

            $http({
                method: "GET",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/"+pessoaId,
                headers: {'chave': '6447450C-FCB7-461D-A8A1-AAD083E452DF'}
              })
            .then(function(result){
                var user = result.data.data;

                promessa.resolve(user);
            }
            );

            return promessa.promise;
        },

        add: function(user){
            return $http({
                method: "POST",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas",
                headers: {'chave': '6447450C-FCB7-461D-A8A1-AAD083E452DF'},
                data: user
              });
        },

        edit: function(user, pessoaId){
            return $http({
                method: "PUT",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/"+pessoaId,
                headers: {'chave': '6447450C-FCB7-461D-A8A1-AAD083E452DF'},
                data: user
              });
        },

        delete: function(pessoaId){
            return $http({
                method: "DELETE",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/"+pessoaId,
                headers: {'chave': '6447450C-FCB7-461D-A8A1-AAD083E452DF'}
            });
        }
    };
})