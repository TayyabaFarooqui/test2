var selectedcourseid;
var filename='';
var extension='';
var url;
var stdid="";
var refresh2=function(){};
var refreshf=function(){};
var code="";
var facultypno;
var type;

//function notification(){
//
//}

angular.module('starter.controllers', [])

  .controller('studentLoginCtrl', function($ionicHistory,$scope,$http,$state,$ionicPopup,RequestsService,StorageService) {
    $scope.data = {};
    $scope.login = function() {

      $http.get(base_url+'/student/' + $scope.data.id + '/' + $scope.data.password).success(function (response) {
        // $http.get('student/' + $scope.data.id + '/' + $scope.data.password).success(function (response) {
window.localStorage.setItem("stdid",$scope.data.id);
        //console.log('success');
        //console.log('before if'+response);
        if (response == JSON.stringify('0'))
        {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        }
        //if (response == JSON.stringify('1'))
        else
        {//console.log('in state');
          console.log('success');
          console.log(JSON.stringify(response));
          window.localStorage.setItem("stdid",$scope.data.id);
          window.localStorage.setItem('dept',response[0].DEPT_ID);
          window.localStorage.setItem('batch',response[0].BATCH);
          window.localStorage.setItem('sec',response[0].SECTION);

          stdid=window.localStorage.getItem('stdid');


          pushNotification = window.plugins.pushNotification;


            window.onNotification = function (e) {

              console.log('notification received in login');
              switch (e.event) {
                case 'registered':
                  if (e.regid.length > 0) {

                    var device_token = e.regid;
                    type='Student';
                    console.log('stdid'+stdid);
                    RequestsService.register(device_token,stdid,type).then(function (response) {
                      window.localStorage.setItem("Stdlogin","Stdlogin");
                      alert('STUDENT registered!');
                      $ionicHistory.nextViewOptions({
                        disableBack: true
                      });
                      $state.go('home');
                    });
                  }
                  break;

                case 'message':

                  alert('msg received');
                  //// alert(JSON.stringify(e));
                  //alert('msg received: ' + e.payload.title);
                  //alert('date: ' + e.payload.date1);
                  //alert(e.title);

                //  mmsg.mtitle= e.payload.title;
                //  mmsg.mmessage= e.message;
                //  mmsg.mdate= e.payload.date1;
                //  mmsg.url= e.payload.url;
                ////  mmsg.file= e.paylaod.file;
                //  console.log(e.payload.type1);
                //  console.log('url is'+e.payload.url);
                //  console.log('file is'+e.payload.file);
                //  if(e.payload.type1 == 'faculty')
                //  {
                //    console.log('faculty notice');
                //    StorageService.addann(mmsg);
                //    refreshf();
                //    $state.go('Announcements');
                //  }
                //  else {
                //    StorageService.add(mmsg);
                //    refresh2();
                //    $state.go('Notifications');
                //  }
                //
                //  if ( e.foreground )
                //  {
                //    alert("Notification Received");
                //
                //  }
                //  else
                //  {  // otherwise we were launched because the user touched a notification in the notification tray.
                //    if ( e.coldstart )
                //    {
                //      alert("coldstart");
                //    }
                //    else
                //    {
                //      alert("other than coldstart");
                //    }
                //  }
                //




                  break;

                case 'error':
                  alert('error occured');
                  break;

              }
            };
          //function onResume() {
          //
          //  alert('on resume uper');
          //
          //  alert('on resume');
          //
          //}
         // document.addEventListener("resume", onResume, true);

            window.errorHandler = function (error) {
              alert('an error occured');
            }


            pushNotification.register(
              onNotification,
              errorHandler,
              {
                'badge': 'true',
                'sound': 'true',
                'alert': 'true',
                'senderID': '518119464074',
                'ecb': 'onNotification'
              }
            );
         // });
//notification end


        }
        //else {
        //  var alertPopup = $ionicPopup.alert({
        //    title: 'Login failed!',
        //    template: 'Please check your credentials!'
        //  });
        //}
      })
    }
  })

  .controller('notices2Ctrl', function($scope,$http,StorageService,$interval) {


    //function refresh() {
    //  $scope.tasks = StorageService.getAll();
    //  var id = $scope.tasks[($scope.tasks.length) - 1].N_ID;
    //  console.log(id);
    //  $http.get('/student/' + id).success(function (response) {
    //    //  $scope.v=response[0];
    //    bval=response.length;
    //    console.log(response);
    //    for (i = 0; i < response.length; i++) {
    //      StorageService.add(response[i]);
    //    }
    //  //  $scope.tasks = StorageService.getAll();
    //  })
    //};
    refresh1();
    function refresh1() {
     // if(inc>0) {
     //   StorageService.add(mmsg);
        $scope.tasks = StorageService.getAll();
      //  inc=0;
      //}
    }
    $interval(refresh1, 10000);

    $scope.update= function(msg)
    {
      console.log('in update');
      console.log('title' +msg.mtitle);

      console.log('prev flag' +msg.flag);
      msg.flag='1';
      console.log('updated flag' +msg.flag);

    }

  })

  .controller('viewCompleteNotice2Ctrl', function($scope,$stateParams) {
    $scope.v={};
    //  console.log($stateParams.sender  + " is the sender")
    $scope.v.SENDER=$stateParams.sender;
   // $scope.v.RECIEVER=$stateParams.reciever;
    $scope.v.NOTICE=$stateParams.notice;
$scope.v.date1=$stateParams.mdate;
    $scope.v.url=$stateParams.url;
    $scope.v.file=$stateParams.file;

    $scope.download=function()
    {
      window.open($stateParams.url, '_system');
    }

  })

  .controller('viewCompleteAnnCtrl', function($scope,$stateParams) {
    $scope.v={};
    //  console.log($stateParams.sender  + " is the sender")
    $scope.v.SENDER=$stateParams.sender;
    // $scope.v.RECIEVER=$stateParams.reciever;
    $scope.v.NOTICE=$stateParams.notice;
    $scope.v.date1=$stateParams.mdate;
  })


  .controller('menu2Ctrl', function($scope,$state,$http,$interval,StorageService,$ionicPopup,RequestsService) {

    ////case'msg'
    //
    //
    stdid=window.localStorage.getItem('stdid');

    pushNotification = window.plugins.pushNotification;


    window.onNotification = function (e) {

      console.log('notification received in home');
      switch (e.event) {
        case 'registered':
        if (e.regid.length > 0) {
//
            var device_token = e.regid;
            type='Student';
//console.log('stdid in home:'+stdid);
            //RequestsService.register(device_token,stdid,type).then(function (response) {
            //  console.log('from home controller');
            //  window.localStorage.setItem("Stdlogin","Stdlogin");
            //  alert('STUDENT registered!');
            //
            //  $state.go('home');
            //});
          }
          break;

        case 'message':

          alert('msg received');
          //// alert(JSON.stringify(e));
          //alert('msg received: ' + e.payload.title);
          //alert('date: ' + e.payload.date1);
          //alert(e.title);

          mmsg.mtitle= e.payload.title;
          mmsg.mmessage= e.message;
          mmsg.mdate= e.payload.date1;
          mmsg.url= e.payload.url;
          console.log('url is'+e.payload.url);
          console.log('file is'+e.payload.file1);
          mmsg.file= JSON.stringify( e.payload.file1);

          console.log(e.payload.type1);


          if(e.payload.type1 == 'faculty')
          {
            console.log('faculty notice');
            StorageService.addann(mmsg);
            refreshf();
            $state.go('Announcements');
          }
          else {
            StorageService.add(mmsg);
            refresh2();
            $state.go('Notifications');
          }

          if ( e.foreground )
          {
            alert("Notification Received");

          }
          else
          {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
              alert("coldstart");
            }
            else
            {
              alert("other than coldstart");
            }
          }





          break;

        case 'error':
          alert('error occured');
          break;

      }
    };
    //function onResume() {
    //
    //  alert('on resume uper');
    //
    //  alert('on resume');
    //
    //}
    // document.addEventListener("resume", onResume, true);

    window.errorHandler = function (error) {
      alert('an error occured');
    }


    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'senderID': '518119464074',
        'ecb': 'onNotification'
      }
    );

    refresh2=function () {
      // if(inc>0) {
      //   StorageService.add(mmsg);
      $scope.data = batch;
      //  inc=0;
      //}
    }
    refreshf=function () {
      // if(inc>0) {
      //   StorageService.add(mmsg);
      $scope.dataf = fbatch;
      //  inc=0;
      //}
    }
    //$interval(refresh2, 500);
    $scope.valresetf= function()
    {
      $scope.dataf=null;
      fbatch=null;
    }
    $scope.valreset= function()
    {
      $scope.data=null;
      batch=null;
    }
   //if(inc>0) {
   //  StorageService.add(mmsg);
   //  mmsg.mmessage ="";
   //  inc=0;
   //}
    //refresh();
    //function refresh() {
    //  $scope.tasks = StorageService.getAll();
    //  var id = $scope.tasks[($scope.tasks.length) - 1].N_ID;
    //  console.log(id);
    //  $http.get('http://192.168.1.104:3000/student/' + id).success(function (response) {
    //    $scope.data = response.length;
    //    if(response.length > 0) {
    //      // $scope.showAlert();
    //      $ionicPopup.alert({
    //
    //        title: 'NEW MESSAGE',
    //
    //        template: 'New Notice From NRN',
    //
    //      });
    //    }
    //    console.log(response);
    //    //for (i = 0; i < response.length; i++) {
    //    //  StorageService.add(response[i]);
    //    //}
    //    ////  $scope.tasks = StorageService.getAll();
    //  })
    //}
    //$interval(refresh, 10000);
    //$scope.valreset= function()
    //{
    //  $scope.data=null;
    //}
    //$scope.showAlert = function() {
    //
    //  var alertPopup = $ionicPopup.alert({
    //
    //    title: 'NEW MESSAGE',
    //
    //    template: 'New Notice From NRN',
    //
    //  });
    //
    //  alertPopup.then(function(res) {
    //
    //    console.log('Thanks');
    //
    //  });
    //
    //};
  })

  //std lecture
  .controller('StdLecturectrl', function($scope,$state,$stateParams,$http) {
    var id=window.localStorage.getItem("stdid");
    console.log('stdid='+window.localStorage.getItem("stdid"));
    $scope.courses=[];
    $http.get(base_url+'/studentcourses/' + id).success(function (response) {
      $scope.courses=response;
      console.log($scope.courses);


    });

    $scope.select=function(course)
    {
      window.localStorage.setItem("courseid",course.C_ID);
      console.log(window.localStorage.getItem("courseid"));
      $state.go('StdlecDownload');
    }
    })

  .controller('StdlecDownloadctrl', function($scope,$stateParams,$http) {
    console.log('in stdlec download');
   $scope.info=[];

    if(window.localStorage.getItem("sec") == null) {
      window.localStorage.setItem("sec",'null');
    }
    console.log('cid'+window.localStorage.getItem("courseid"));
    console.log('dept'+window.localStorage.getItem("dept"));
    console.log('batch'+window.localStorage.getItem("batch"));
    console.log('sec'+window.localStorage.getItem("sec"));

    $http.get(base_url+"/fetchfiles?C_ID=" +window.localStorage.getItem("courseid")+'&DEPT_ID='+window.localStorage.getItem("dept")+'&BATCH='+window.localStorage.getItem("batch")+'&SEC='+window.localStorage.getItem("sec")).success(function (response) {
        console.log('success');
        $scope.info=response;
        console.log('scope.info'+ $scope.info);
//       StorageService.addann($scope.nmsg);
//$state.go('teacAnn');
      });

    $scope.download=function(inf)
    {
      console.log('in download');
      console.log('url is'+ inf.URL);
      window.open(inf.URL, '_system');
    }

  })


//techlogin
  .controller('teacLoginCtrl', function($scope,$stateParams,$http,$state,$cordovaSms,$ionicPopup) {
    $scope.data = {};

    $scope.login = function() {
      var cellno=$scope.data.cellno;
      console.log('cell no'+ cellno);
      $http.get(base_url+"/cellverify/" + $scope.data.cellno).success(function (response) {
facultypno=response[0].PNO;
        window.localStorage.setItem("pno",facultypno);
        console.log('facultypno '+ facultypno);
        if (facultypno != null)
        { console.log('success');

          //for code generation
          function randomString() {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 8;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
              var rnum = Math.floor(Math.random() * chars.length);
              randomstring += chars.substring(rnum,rnum+1);
            }
            //document.randform.randomfield.value = randomstring;

           // console.log('randomstring'+randomstring);
            return randomstring;
          }
          var rno1=randomString();
          window.localStorage.setItem("rno", rno1);
          var rno2=window.localStorage.getItem("rno");
          console.log('rno1'+rno1);
console.log('rno2'+rno2);
code=rno1;
          $state.go('teacCode');

sendSMS();
          //for sms
          var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
              intent: '' // send SMS with the native android SMS messaging
              //intent: '' // send SMS without open any other app
              //intent: 'INTENT' // send SMS inside a default SMS app
            }
          };

          function sendSMS() {
console.log('sending sms');
            $cordovaSms
              .send($scope.data.cellno, 'activation code is  '+rno2, options)
              .then(function() {
                alert('Success');
                // Success! SMS was sent
              }, function(error) {
                alert('Error');
                // An error occurred
              });
          }


        }
        else {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'NO such Record exist!'
          });
        }

      })


    }


    })

  .controller('teacCodeCtrl', function($scope,$stateParams,$ionicPopup,$state,RequestsService,StorageService,$ionicHistory) {

    $scope.data = {};
    var pno;
    $scope.check = function() {
      if (code == $scope.data.code) {
 console.log('code matched');
        pushNotification = window.plugins.pushNotification;


        window.onNotification = function (e) {

          console.log('notification received');
          switch (e.event) {
            case 'registered':
              if (e.regid.length > 0) {
type='Faculty';
                var device_token = e.regid;
                facultypno= window.localStorage.getItem("pno");
                RequestsService.register(device_token,facultypno,type).then(function (response) {
                  alert(' Faculty registered!');
                  window.localStorage.setItem("teacLogin","teacLogin");
                  $ionicHistory.nextViewOptions({
                    disableBack: true
                  });
                  $state.go('teachome');
                });
              }
              break;

            case 'message':
                console.log('faculty recieving notice from admin');
              alert('faculty recieving notice from admin');

              if ( e.foreground )
              {
                alert("Notification Received");

              }
              else
              {  // otherwise we were launched because the user touched a notification in the notification tray.
                if ( e.coldstart )
                {
                  alert("coldstart");
                }
                else
                {
                  alert("other than coldstart");
                }
              }

             // $state.go('Notifications');



              break;

            case 'error':
              alert('error occured');
              break;

          }
        };
        window.errorHandler = function (error) {
          alert('an error occured');
        }


        pushNotification.register(
          onNotification,
          errorHandler,
          {
            'badge': 'true',
            'sound': 'true',
            'alert': 'true',
            'senderID': '518119464074',
            'ecb': 'onNotification'
          }
        );

      //  $state.go('teachome');
      }
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'No such code verified!'
        });
         $state.go('teacLogin');
      }
    }
  })

  .controller('teachomeCtrl', function($scope,$state,$http,$interval,StorageService,$ionicPopup,RequestsService) {

    ////case'msg'
    //
    //
    //stdid=window.localStorage.getItem('stdid');

    pushNotification = window.plugins.pushNotification;


    window.onNotification = function (e) {

      console.log('notification received in teac home');
      switch (e.event) {
        case 'registered':
          //if (e.regid.length > 0) {
          //
          //  var device_token = e.regid;
          //  type='Student';
          //  console.log('stdid in home:'+stdid);
          //  //RequestsService.register(device_token,stdid,type).then(function (response) {
          //  //  console.log('from home controller');
          //  //  window.localStorage.setItem("Stdlogin","Stdlogin");
          //  //  alert('STUDENT registered!');
          //  //
          //  //  $state.go('home');
          //  //});
          //}
          break;

        case 'message':

          alert('msg received for faculty');
          //// alert(JSON.stringify(e));
          //alert('msg received: ' + e.payload.title);
          //alert('date: ' + e.payload.date1);
          //alert(e.title);

          mmsg.mtitle= e.payload.title;
          mmsg.mmessage= e.message;
          mmsg.mdate= e.payload.date1;
          mmsg.url= e.payload.url;
          console.log('url is'+e.payload.url);
          console.log('file is'+e.payload.file1);
          mmsg.file= JSON.stringify( e.payload.file1);

          console.log(e.payload.type1);


          //if(e.payload.type1 == 'faculty')
          //{
          //  console.log('faculty notice');
          //  StorageService.addann(mmsg);
          //  refreshf();
          //  $state.go('Announcements');
          //}
          //else {
            StorageService.add(mmsg);
            refresh2();
            $state.go('teacNote');
          //}

          if ( e.foreground )
          {
            alert("Notification Received");

          }
          else
          {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
              alert("coldstart");
            }
            else
            {
              alert("other than coldstart");
            }
          }





          break;

        case 'error':
          alert('error occured');
          break;

      }
    };


    window.errorHandler = function (error) {
      alert('an error occured');
    }


    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'senderID': '518119464074',
        'ecb': 'onNotification'
      }
    );

    refresh2=function () {
      // if(inc>0) {
      //   StorageService.add(mmsg);
      $scope.data = batch;
      //  inc=0;
      //}
    }
    $scope.valreset= function()
    {
      $scope.data=null;
      batch=null;
    }

  })

  .controller('teacNoteCtrl', function($scope,$http,StorageService,$interval) {



    refresh1();
    function refresh1() {
      // if(inc>0) {
      //   StorageService.add(mmsg);
      $scope.tasks = StorageService.getAll();
      //  inc=0;
      //}
    }
    $interval(refresh1, 10000);

    $scope.update= function(msg)
    {
      console.log('in update');
      console.log('title' +msg.mtitle);

      console.log('prev flag' +msg.flag);
      msg.flag='1';
      console.log('updated flag' +msg.flag);

    }

  })

  .controller('teacDetailNoteCtrl', function($scope,$stateParams) {
    $scope.v={};
    //  console.log($stateParams.sender  + " is the sender")
    $scope.v.SENDER=$stateParams.sender;
    // $scope.v.RECIEVER=$stateParams.reciever;
    $scope.v.NOTICE=$stateParams.notice;
    $scope.v.date1=$stateParams.mdate;
    $scope.v.url=$stateParams.url;
    $scope.v.file=$stateParams.file;

    $scope.download=function()
    {
      window.open($stateParams.url, '_system');
    }

  })

  .controller('NewAnnouncementCtrl', function($scope,$stateParams,$http,$state,StorageService) {
    var pgrefresh=function(){};

    var ressave;
    $scope.courserefresh = function()
    {
      // window.localStorage.clear();
      console.log('in update');
      $http.get(base_url + '/fetchcourses/' + window.localStorage.getItem("pno")).success(function (response) {
        window.localStorage.setItem("ressave",JSON.stringify(response) );
        ressave = JSON.parse(window.localStorage.getItem("ressave"));
        console.log('ressave'+JSON.stringify(ressave));
        pgrefresh();
        // $state.go('teacLecture');
      });
    }

    $scope.nmsg={};
    $scope.data = {
      availableOptions: [

      ]}
    //window.localStorage.clear();
  if(window.localStorage.getItem("ressave") == null) {
console.log('in if');
    $http.get(base_url + '/fetchcourses/' + facultypno).success(function (response) {
      window.localStorage.setItem("ressave",JSON.stringify(response) );
      ressave = JSON.parse(window.localStorage.getItem("ressave"));

      for (var i = 0; i < ressave.length; i++) {
        var object = {id: '', value: ''};

        if (ressave[i].SEC == null) {
          ressave[i].SEC = '';
          object.id = i;
          object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ')' + ressave[i].SEC;
          $scope.data.availableOptions.push(object);
        }
        else {
          object.id = i;
          object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ') SEC:' + ressave[i].SEC;

          $scope.data.availableOptions.push(object);
        }
        //console.log($scope.data.availableOptions[i]);

      }

    });
  }
    else {

    pgrefresh=function()
    {
      $scope.data = {
        availableOptions: [

        ]}
      console.log("inpgrefresh");
      ressave = JSON.parse(window.localStorage.getItem("ressave"));

      //$http.get(base_url+'/fetchcourses/' + facultypno).success(function (response) {

      for (var i = 0; i < ressave.length; i++) {
        var object = {id: '', value: ''};

        if (ressave[i].SEC == null) {
          ressave[i].SEC = '';
          object.id = i;
          object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ')' + ressave[i].SEC;
          $scope.data.availableOptions.push(object);
        }
        else {
          object.id = i;
          object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ') SEC:' + ressave[i].SEC;

          $scope.data.availableOptions.push(object);
        }
        //console.log($scope.data.availableOptions[i]);

      }
    }
    pgrefresh();
    //ressave = JSON.parse(window.localStorage.getItem("ressave"));
    //console.log('ressave var is' + ressave);
    //for (var i = 0; i < ressave.length; i++) {
    //  var object = {id: '', value: ''};
    //
    //  if (ressave[i].SEC == null) {
    //    ressave[i].SEC = '';
    //    object.id = i;
    //    object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ')' + ressave[i].SEC;
    //    $scope.data.availableOptions.push(object);
    //  }
    //  else {
    //    object.id = i;
    //    object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ') SEC:' + ressave[i].SEC;
    //
    //    $scope.data.availableOptions.push(object);
    //  }
    //  //console.log($scope.data.availableOptions[i]);
    //}
    //    window.localStorage.setItem("courses", JSON.stringify($scope.data.availableOptions));

    //for(var i=0; i<response.length;i++)
    //{
    //  console.log($scope.data.availableOptions[i]);
    //}
  }
   $scope.send=function() {
     var result=$scope.data.selectedOption.id;
     //console.log("response is"+ JSON.stringify(response));
     //console.log("data.available is"+ JSON.stringify($scope.data.availableOptions));
     console.log( "cname for check" +ressave[result].C_NAME);
     console.log('title='+$scope.nmsg.title);
     console.log('title='+$scope.nmsg.msg);
     $scope.nmsg.cname=ressave[result].C_NAME;
     $scope.nmsg.dept=ressave[result].DEPT_NAME;
     $scope.nmsg.batch=ressave[result].BATCH;
     $scope.nmsg.sec=ressave[result].SEC;
     $scope.nmsg.msgdate=new Date().toJSON().slice(0,10);
     console.log('cname='+$scope.nmsg.cname);
     console.log('d='+$scope.nmsg.dept);
     console.log('s='+$scope.nmsg.sec);

     StorageService.addteacann($scope.nmsg);
     $state.go('teacAnn');
     $http.get(base_url+"/faculty/getstudenttoken/"+$scope.nmsg.title+'/'+$scope.nmsg.msg+'?C_NAME=' + ressave[result].C_NAME+'&DEPT_NAME='+ ressave[result].DEPT_NAME+'&BATCH='+ ressave[result].BATCH+'&SEC='+ ressave[result].SEC).success(function (response) {
console.log('success');
//       StorageService.addann($scope.nmsg);
//$state.go('teacAnn');
     });
     console.log('reciever is' + result);
   }
   // });

  })

  .controller('AnnCtrl', function($scope,$http,StorageService,$interval) {

    refreshf();
    function refreshf() {
      // if(inc>0) {
      //   StorageService.add(mmsg);
      $scope.announcement = StorageService.getAllann();
      //  inc=0;
      //}
    }
    $interval(refreshf(), 10000);
    $scope.update= function(msg)
    {
      console.log('in update');
      console.log('title' +msg.mtitle);

      console.log('prev flag' +msg.flag);
      msg.flag='1';
      console.log('updated flag' +msg.flag);

    }


  })
  .controller('teacDetailAnnCtrl', function($scope,$stateParams) {
    $scope.v={};
    //  console.log($stateParams.sender  + " is the sender")
    $scope.v.SENDER=$stateParams.sender;
    // $scope.v.RECIEVER=$stateParams.reciever;
    $scope.v.NOTICE=$stateParams.notice;
    $scope.v.date1=$stateParams.mdate;
    $scope.v.cname=$stateParams.cname;
    $scope.v.dept=$stateParams.dept;
    $scope.v.batch=$stateParams.batch;
    $scope.v.sec=$stateParams.sec;

  })

  .controller('teacAnnCtrl', function($scope,StorageService) {
    refresh=function() {
      $scope.teacann = StorageService.getAllteacann();
      //$http.get("/admin").success(function (response) {
      //  console.log("I got the data i requested");
      //  $scope.tasks = response;
      //});
    };

    refresh();
  })

  .controller('teaclecturectrl', function($scope,$stateParams,$http,$state) {
var pgrefresh=function(){};

    var ressave;
    $scope.courserefresh = function()
    {
     // window.localStorage.clear();
      console.log('in update');
      $http.get(base_url + '/fetchcourses/' + window.localStorage.getItem("pno")).success(function (response) {
        window.localStorage.setItem("ressave",JSON.stringify(response) );
        ressave = JSON.parse(window.localStorage.getItem("ressave"));
       console.log('ressave'+JSON.stringify(ressave));
        pgrefresh();
       // $state.go('teacLecture');
      });
    }

    $scope.nmsg={};

    if(window.localStorage.getItem("ressave") == null) {
      $scope.data = {
        availableOptions: [

        ]}
      console.log('in if');
      $http.get(base_url + '/fetchcourses/' + facultypno).success(function (response) {
        window.localStorage.setItem("ressave",JSON.stringify(response) );
        ressave = JSON.parse(window.localStorage.getItem("ressave"));

        //$http.get(base_url+'/fetchcourses/' + facultypno).success(function (response) {

        for (var i = 0; i < ressave.length; i++) {
          var object = {id: '', value: ''};

          if (ressave[i].SEC == null) {
            ressave[i].SEC = '';
            object.id = i;
            object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ')' + ressave[i].SEC;
            $scope.data.availableOptions.push(object);
          }
          else {
            object.id = i;
            object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ') SEC:' + ressave[i].SEC;

            $scope.data.availableOptions.push(object);
          }
          //console.log($scope.data.availableOptions[i]);

        }

      });
    }
    else {

      pgrefresh=function()
      {
        $scope.data = {
          availableOptions: [

          ]}
        console.log("inpgrefresh");
        ressave = JSON.parse(window.localStorage.getItem("ressave"));

        //$http.get(base_url+'/fetchcourses/' + facultypno).success(function (response) {

        for (var i = 0; i < ressave.length; i++) {
          var object = {id: '', value: ''};

          if (ressave[i].SEC == null) {
            ressave[i].SEC = '';
            object.id = i;
            object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ')' + ressave[i].SEC;
            $scope.data.availableOptions.push(object);
          }
          else {
            object.id = i;
            object.name = ressave[i].C_NAME + ' ' + ressave[i].DEPT_NAME + ' (' + ressave[i].BATCH + ') SEC:' + ressave[i].SEC;

            $scope.data.availableOptions.push(object);
          }
          //console.log($scope.data.availableOptions[i]);

        }
      }
      pgrefresh();
    }
    $scope.select=function(option) {
          selectedcourseid=option.id;
          console.log('result is' + selectedcourseid);
$state.go('lectureupload');
//          });
         // console.log('reciever is' + result);
        }



    //})

})

  .controller('lectureuploadctrl', function($scope,$stateParams,$state,$http,ImageUploadFactory) {
var rurl,ressave;
    $scope.info=[];
    ressave = JSON.parse(window.localStorage.getItem("ressave"));

    //for download
    $scope.download=function(inf)
    {
      console.log('in download');
      console.log('url is'+ inf.URL);
      window.open(inf.URL, '_system');
    }
    //var getfiles= function(){};
    getfiles= function()
    {


      if(ressave[selectedcourseid].SEC == null) {
        ressave[selectedcourseid].SEC = 'null';

      }
// + "?C_ID=" + ressave[selectedcourseid].C_ID+'&DEPT_ID='+ ressave[selectedcourseid].DEPT_ID+'&BATCH='+ ressave[selectedcourseid].BATCH+'&SEC='+ ressave[selectedcourseid].SEC
      $http.get(base_url+"/fetchfiles?C_ID=" + ressave[selectedcourseid].C_ID+'&DEPT_ID='+ ressave[selectedcourseid].DEPT_ID+'&BATCH='+ ressave[selectedcourseid].BATCH+'&SEC='+ ressave[selectedcourseid].SEC
      ).success(function (response) {
        console.log('success');
        $scope.info=response;
        console.log('scope.info'+ $scope.info);
//       StorageService.addann($scope.nmsg);
//$state.go('teacAnn');
      });
    }
    getfiles();
    $scope.upload= function()
    {
      window.plugins.mfilechooser.open([], function (uri) {
        //Here uri provides the selected file path.
        console.log('file path', uri);
        alert(uri);
        //url=uri;
        extension =uri.split(".").pop().toString();
        filename= uri.split("/").pop();
      //  $scope.collection.selectedfile = filename;

        ImageUploadFactory.uploadImage(uri).then(
          function (result) {
            alert('return from imageuploadfactory');

             rurl = result.secure_url || '';
           // rurl = url;
            alert('rurl is' + rurl);
            console.log('dept id'+ressave[selectedcourseid].DEPT_ID);
            $scope.object={
              C_ID:ressave[selectedcourseid].C_ID,
              DEPT:ressave[selectedcourseid].DEPT_ID,
              BATCH:ressave[selectedcourseid].BATCH,
              SEC:ressave[selectedcourseid].SEC,
              filename:filename,
              rurl:rurl
            }

            $http.post(base_url+'/lecupload',$scope.object)
              .success(function (response) {
              console.log("succ");
                getfiles();

            })
              .error(function (data) {

              });



            console.log('value is'+ ressave[selectedcourseid].C_NAME);
          },
          function (err) {
            alert('fail');
            // Do something with the error here
            // $cordovaCamera.cleanup();

          }
        );

      }, function (error) {
        console.log('Error', error);
        alert(error);
      });


  }

  })
//signin controller
  .controller('signctrl', function($scope,$stateParams,$state) {
$scope.faculty= function()
{
  window.localStorage.setItem("type","faculty");
$state.go('teacLogin');
}
    $scope.student= function()
    {
      window.localStorage.setItem("type","student");
$state.go('login');
    }
  })
//for startup

  //events


  .controller('Eventsctrl', function($scope,$state,$http, $timeout, $stateParams,StorageService) {
    $scope.events = {};

    $http.get(base_url + '/getevents').success(function (response) {
      $scope.events=response;
    });

    $scope.decide=function()
    {
      var type=window.localStorage.getItem("type");
     // type="faculty";
      if(type== "faculty")
        $state.go('teachome');
      else
        $state.go('home');

    }



    })

  .controller('EventDetailsctrl', function($scope,$http, $timeout, $stateParams) {
    $scope.e={};
    $scope.e.title=$stateParams.title;
    $scope.e.desc=$stateParams.desc;
  })

  .controller('startupctrl', function($scope,$stateParams,$state) {
  //window.localStorage.clear();
window.setTimeout(function()
{
  console.log('func ky andr');
  if(window.localStorage.getItem("type") !=null)
  {

var type=window.localStorage.getItem("type");
    console.log('type'+ type);
    if(type== "faculty")
    {
      if(window.localStorage.getItem("teacLogin") !=null)
      {
        console.log('teaclogin');
        $state.go('teachome');
      }
      else
      {
        console.log('faculty==null');
        $state.go('teacLogin');
      }

    }
    else
    {
      if(window.localStorage.getItem("Stdlogin") !=null)
      {
        console.log('stdlogin');
        $state.go('home');
      }
      else
      {
        console.log('stdlogin==null');
        $state.go('login');
      }
    }
  }
  else
  {
    console.log('type= null');
    $state.go('SignIn');
  }
},2000);

  })
