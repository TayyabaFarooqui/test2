/**
 * Created by Tayyaba Farooqui on 4/3/2016.
 */


(function(){

  angular.module('starter')
    .service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

  function RequestsService($http, $q, $ionicLoading,$scope){



    function register(device_token,id,type) {
      console.log('id' + id);
      var temp = {
        // STD_ID:JSON.stringify(id),
        //STD_NAME:'tayyaba'
        TOKEN: device_token

      };

      var deferred = $q.defer();
      console.log('going to acess api');
      console.log('type'+type);
      // console.log(stuid);
      $ionicLoading.show();

      //  $http.put('http://192.168.1.104:3000/register', {'device_token': device_token})
      if (type == 'Student') {
        //$http.put('http://192.168.1.103:3000/pp/' + id, temp)
        $http.put(base_url+'/pp/' + id, temp)
          // $http.get('http://192.168.1.105:3000/checking/'+id)

          .success(function (response) {
            console.log("1");
            $ionicLoading.hide();
            deferred.resolve(response);

          })
          .error(function (data) {
            deferred.reject();
          });


        return deferred.promise;

      }
else
      {
        $http.put(base_url+'/ppfaculty/' + id, temp)
          // $http.get('http://192.168.1.105:3000/checking/'+id)

          .success(function (response) {
            console.log("1");
            $ionicLoading.hide();
            deferred.resolve(response);

          })
          .error(function (data) {
            deferred.reject();
          });


        return deferred.promise;

      }
    }


    return {
      register: register
    };
  }
})();
