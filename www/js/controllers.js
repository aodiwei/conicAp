app = angular.module('starter.controllers', ['ionic']);

app.controller('SlideController', function($scope, $ionicSlideBoxDelegate) {

  $scope.myActiveSlide = 1;
  //$scope.doesContinue = true;
  //$scope.delegateHandle = $ionicSlideBoxDelegate;

});

app.controller('ModifyPhoto', function($scope){
    $scope.headPic = "../img/jobs.jpg";
    $scope.clickModify = function(){
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: false,
            encodingType:Camera.EncodingType.JPEG,
            targetWidth: 200,
            targetHeight: 200,
            mediaType:0,
            cameraDirection:0,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
        //调用Cardova 插件打开相册
        navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
    };
    $scope.onSuccess  = function(imageData) {
        $scope.headPic = imageData;
        $scope.$apply();

    };

    $scope.onFail  =function(message) {
        alert('Failed because: ' + message);
    };

});

app.controller('GetContactCtrl', function($scope){
    $scope.phoneNumber = "15827500682";
    $scope.getContacts = function(){
        //调用Cardova 插件通讯录
        navigator.contacts.pickContact(function(contact){
            var phoneNum = contact.phoneNumbers[0].value;
            $scope.phoneNumber = phoneNum;
            $scope.$apply();
        },function(err){
            console.log('Error: ' + err);
        });
    };

});

app.controller('SetPush', function($scope){
    $scope.pushNotificationCam = { checked: false };
    $scope.pushCamera = function(){
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType:Camera.EncodingType.JPEG,
            targetWidth: 200,
            targetHeight: 200,
            mediaType:0,
            cameraDirection:0,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
        //调用Cardova 插件打开相机
        navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
    };
    $scope.onSuccess  = function(imageData) {
        $scope.pushNotificationCam.checked = !$scope.pushNotificationCam.checked;
    };

    $scope.onFail  =function(message) {
        alert('Failed because: ' + message);
    };

    $scope.pushNotificationBro = { checked: false };
    //打开浏览器
    $scope.pushBrower = function(){
        var ref = cordova.InAppBrowser.open('http://www.baidu.com', '_blank', 'location=yes');
        $scope.pushNotificationBro.checked = !$scope.pushNotificationBro.checked;
    };

});


app.controller('SideMenuCtrl', function($scope, $ionicModal){

    $ionicModal.fromTemplateUrl('templates/device-info.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    //获取设备信息
    $scope.showDeviceInfo = function(){
        $scope.deviceName = device.model;
        $scope.platform  = device.platform;
        $scope.uuid  = device.uuid ;
        $scope.version  = device.version;
        $scope.$apply();
    }

});


