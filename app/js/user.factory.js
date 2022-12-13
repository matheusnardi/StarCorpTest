// Interação com a API de USUÁRIOS

angular.module("User").factory("UserFactory", function($q, $http){
    var chave = '';
    return {
        listAll: function(){
            var promessa = $q.defer();

            $http({
                method: "GET",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/GetAll",
                headers: {'chave': chave}
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
                headers: {'chave': chave}
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
                headers: {'chave': chave},
                data: user
              });
        },

        edit: function(user, pessoaId){
            return $http({
                method: "PUT",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/"+pessoaId,
                headers: {'chave': chave},
                data: user
              });
        },

        delete: function(pessoaId){
            return $http({
                method: "DELETE",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/"+pessoaId,
                headers: {'chave': chave}
            });
        }
    };
})