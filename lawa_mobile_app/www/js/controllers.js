var server = "http://localhost";
var port = "8888";
var socket = io.connect(server +":"+ port);
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup) {
  $scope.logout = function(){
    localStorage.setItem('token_key', null);
  }
  if(window.location.hash == '#/tab/dash') {
    var token_key = localStorage.getItem('token_key');
    socket.emit('requestCurrentState', {
      token_key: token_key
    });
    socket.on('respondCurrentState', function (datatrave) {
      console.log(datatrave);
      $scope.$apply(function() {
        var result_laser = datatrave;
        if (datatrave.thongbao != 1) {
          $scope.thongtinhethong = "Hệ thống làm việc bình thường";
        } else {
          $scope.thongtinhethong = "Hệ thống không nhận được dữ liệu trong 5 phút gần đây";
        }
        $scope.waterlevel = datatrave.data.mucnuoc;
        $scope.dlpincot1 = datatrave.data.dungluongpin[0];
        $scope.dlpincot2 = datatrave.data.dungluongpin[1];
        $scope.dlpincot3 = datatrave.data.dungluongpin[2];
        $scope.dlpincot4 = datatrave.data.dungluongpin[3];
        $scope.dlpincottrungtam = datatrave.data.dungluongpin[4];
        $scope.dlpincotcanhbao1 = datatrave.data.dungluongpin[5];
        $scope.dlpincotcanhbao2 = datatrave.data.dungluongpin[6]; 
        var time = new Date(datatrave.time * 1000);
        $scope.thoidiem = time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear() + " - " + time.getHours() + ":" + time.getMinutes();//(datatrave.thoidiem).format("HH:mm:ss");
        if (!datatrave.sysStatus) {
          $scope.message = "Phát hiện tàu vi phạm";
          $scope.safestyle = "warningstyle";
          $scope.icon = "ion-alert-circled";
        } else {
          $scope.message = "An toàn";
          $scope.safestyle = "safestyle";
          $scope.icon = "ion-android-checkbox-outline";
        }
      });
    });
  }
})
.controller('ChatsCtrl', function($scope, Chats, $ionicPopup) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var token_key = localStorage.getItem('token_key') ;
    $scope.requestState = function(){
      socket.emit('requestCurrentState', {
        token_key: token_key
      });
     if(window.location.hash == '#/tab/chats'){
        socket.emit('requestCurrentLaserState', {
          token_key: token_key
        }); 
      } 
    setTimeout(function(){ $scope.requestState(); }, 1000);

  }
        socket.on('respondCurrentLaserState', function (datatrave) {

        var result_laser = datatrave;
         console.log(datatrave);
        $scope.$apply(function() {
          if (!result_laser.laser1) {
            $scope.classlaser1 = "overheight";
            $scope.infolaser1 = "Vượt quá độ cao";
            $scope.classinfolaser1 = "badge-assertive";
          } else {
            $scope.classlaser1 = "";
            $scope.infolaser1 = "An toàn";
            $scope.classinfolaser1 = "badge-balanced";
          }
          if (!result_laser.laser2) {
            $scope.classlaser2 = "overheight";
            $scope.infolaser2 = "Vượt quá độ cao";
            $scope.classinfolaser2 = "badge-assertive";
          } else {
            $scope.classlaser2 = "";
            $scope.infolaser2 = "An toàn";
            $scope.classinfolaser2 = "badge-balanced";
          }
          if (!result_laser.laser3 ) {
            $scope.classlaser3 = "overheight";
            $scope.infolaser3 = "Vượt quá độ cao";
            $scope.classinfolaser3 = "badge-assertive";
          } else {
            $scope.classlaser3 = "";
            $scope.infolaser3 = "An toàn";
            $scope.classinfolaser3 = "badge-balanced";
          }
          if (!result_laser.laser4 ) {
            $scope.classlaser4 = "overheight";
            $scope.infolaser4 = "Vượt quá độ cao";
            $scope.classinfolaser4 = "badge-assertive";
          } else {
            $scope.classlaser4 = "";
            $scope.infolaser4 = "An toàn";
            $scope.classinfolaser4 = "badge-balanced";
          }
        });
      });
  $scope.requestState();
  $scope.setCurrentSafe = function() {  
    $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'ĐẶT LẠI AN TOÀN',
       template: '<center>Bạn có chắc đã kiểm tra và đặt lại an toàn?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         socket.emit('setCurrentSafe', {
          token_key: token_key
        }); 
       } else {
         //console.log('You are not sure');
       }
   });
 };
     $scope.showConfirm();
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {

})
.controller('loginCtrl', function($scope, $location) {
  $scope.formelement = "false"; 
  $scope.login = function(){
     var username = $scope.username;
      var password = $scope.passwd;   
      console.log(username.length); 
      if(username.length > 4 && password.length > 4){
        $scope.loading = true;
        $scope.message = "Đang đăng nhập...";      
        socket.emit('Logindata', {
          username: username,
          password: password
        });
      }else{
        $scope.classmessage = "errmessage";
        $scope.message = "Tài khoản/mật khẩu không hợp lệ ! ";
      }
    } 
  socket.on('login_result', function (datatrave) {
    setTimeout(function(){  
      if(datatrave == "null"){
        $scope.$apply(function(){
          $scope.loading = false;
          $scope.message = "Đăng nhập thất bại! ";
          $scope.classmessage = "errmessage";
          $scope.isLogin = false;
          localStorage.setItem('token_key', null);
        });
      }else{
        $scope.$apply(function(){
          $scope.classmessage = "successmessage"; 
          $scope.loading = false;
          $scope.isLogin = true;
          $scope.message = "Đăng nhập thành công";
          localStorage.setItem('token_key', datatrave);
        });
        setTimeout(function(){ 
          window.location.href = "#/tab/dash";
          $scope.message = "";
         }, 1000); 
      }
     }, 1000);
  });
})
.controller('laserCtrl', function($scope) {

})
.controller('sysController', function($scope, $ionicPopup) {
  var token_key = localStorage.getItem('token_key') ;
  console.log(token_key);
  $scope.checklogin = function(){
      var token_key = localStorage.getItem('token_key');
      socket.emit('isLogin', {
        token_key: token_key
      });   
    setTimeout(function(){  $scope.checklogin(); }, 1000);
  }
 socket.on('isloginresult', function (datatrave) {
    if(window.location.hash != '#/tab/login'){
      if(!datatrave){
        window.location.href = "#/tab/login";
        var alertPopup = $ionicPopup.alert({
          title: 'Login require !',
          template: '<center>Bạn phải đăng nhập trước'
        });
      }
    }
    if(window.location.hash == '#/tab/login'){
      if(datatrave){
        window.location.href = "#/tab/dash";
      }
    }
  });
  $scope.checklogin();
})
    
.controller('AccountCtrl', function($scope) {
  window.click_change = false;
  $scope.safestyle = "safestyle";
  var i =0;
  var token_key = localStorage.getItem('token_key'); 
  $scope.requestState = function(){ 
      if(window.location.hash == '#/tab/account' && window.click_change == false){ 
        socket.emit('requestWarningStatus', {
          token_key: token_key
        }); 
      }
      setTimeout(function(){ $scope.requestState(); }, 1000);
  }
  $scope.requestState();
  socket.on('respondWarningStatus', function (data) {  
    if(window.click_change == false) console.log(window.click_change);
    $scope.$apply(function(){ 
      if(!data.generalWarningstate) {
         $scope.safestyle = "safestyle";
         $scope.message = "Báo động đang tắt";
          $scope.icon = "ion-volume-mute";
      }else{
          $scope.safestyle = "warningstyle";
          $scope.message = "Báo động đang bật";
           $scope.icon = "ion-volume-high";
      }
      if(data.WarningStatus1 )  {
          $scope.enable1 = true; 
      }else {
          $scope.enable1 = false;
      }
      if(data.WarningStatus2  ) { 
          $scope.enable2 = true; 
      }else {
          $scope.enable2 = false;
      }
    }); 
  }); 
  $scope.changeWarningState = function(warningNumber) {    
      window.click_change = true;
      setTimeout(function(){ window.click_change = false; }, 3000);
      var value; 
      if(warningNumber == 1) value = $scope.enable1;      
      if(warningNumber == 2) value = $scope.enable2;
      socket.emit('requestWarningChangeStatus', {
          token_key: token_key,
          data: {
            warning_number: warningNumber,
            value: value
          }});
  }
   
  
});
