// Interação com a API de ENDEREÇO

angular.module("User").factory("AddressFactory", function($q, $http){
    var chave = '';
    return {
        listAll: function(pessoaId){
            var promessa = $q.defer();

            $http({
                method: "GET",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Endereco/GetAll/"+pessoaId,
                headers: {'chave': chave}
              })
            .then(function(result){
                var allAddresses = [];

                angular.forEach(result.data.data, function(address, id){
                    address.id = id;
                    allAddresses.push(address);
                });

                promessa.resolve(allAddresses);
            }
            );

            return promessa.promise;
        },

        add: function(address){
            return $http({
                method: "POST",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Endereco",
                headers: {'chave': chave},
                data: address
              });
        },

        delete: function(enderecoId){
            return $http({
                method: "DELETE",
                url: "https://www.selida.com.br/avaliacaotecnica/api/Endereco/"+enderecoId,
                headers: {'chave': chave}
            });
        }
    };
})