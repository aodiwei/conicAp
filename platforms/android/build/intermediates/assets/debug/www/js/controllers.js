app = angular.module('starter.controllers', ['ionic', 'ngCordova']);

//录播图片
app.controller('SlideController', function($scope, $ionicSlideBoxDelegate) {

  $scope.myActiveSlide = 1;

});

//修改头像--打开相机
app.controller('ModifyPhoto', function($scope){
    $scope.headPic = "img/jobs.jpg";
    $scope.clickModify = function(){
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
        //调用Cardova 插件打开相册
        navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
    };
    $scope.onSuccess  = function(imageData) {
        $scope.headPic = imageData;
        $scope.$apply();

    };

    $scope.onFail  =function(message) {
//        alert('Failed because: ' + message);
    };

});

//修改电话--打开通讯录
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

//设置中的打开--打开相册和浏览器
app.controller('SetPush', function($scope){
    $scope.pushNotificationCam = { checked: false };
    $scope.pushCamera = function(){
        if(!$scope.pushNotificationCam.checked){
            return;
        }
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
        //调用Cardova 插件打开相机
        navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
    };
    $scope.onSuccess  = function(imageData) {
        $scope.pushNotificationCam.checked = !$scope.pushNotificationCam.checked;
    };

    $scope.onFail  =function(message) {
//        alert('Failed because: ' + message);
    };

    $scope.pushNotificationBro = { checked: false };
    //打开浏览器
    $scope.pushBrower = function(){
        if($scope.pushNotificationBro.checked)
        {
            cordova.InAppBrowser.open('http://cordova.apache.org/', '_blank', 'location=yes');
//            $scope.pushNotificationBro.checked = !$scope.pushNotificationBro.checked;
        }

    };

});

//侧面菜单-查看设备信息
app.controller('SideMenuDeviceCtrl', function($scope, $ionicModal){

    $ionicModal.fromTemplateUrl('templates/device-info.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    //获取设备信息
    $scope.showDeviceInfo = function(){
        $scope.modal.show();

        $scope.deviceName = device.model;
        $scope.platform  = device.platform;
        $scope.uuid  = device.uuid ;
        $scope.version  = device.version;
        $scope.$apply();
    }

});

//用cordova库定位--暂时隐藏-android有问题，后续研究解决
app.controller('SideMenuGeoCtrl', function($scope, $ionicModal){

    $ionicModal.fromTemplateUrl('templates/geo-info.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.showGeoInfo = function() {

        $scope.modal.show();
        var option = {
            maximumAge: 3000,
            timeout: 3000,
            enableHighAccuracy: false
        };
        navigator.geolocation.getCurrentPosition($scope.onSuccess, $scope.onError, option);
        navigator.geolocation

    };

    $scope.onSuccess = function(position) {
        $scope.Latitude  = position.coords.latitude ;
        $scope.Longitude = position.coords.longitude;
//        $scope.Altitude  = position.coords.altitude;
//        $scope.Accuracy  = position.coords.accuracy;
//        $scope.Altitude = position.coords.altitudeAccuracy;
//        $scope.Heading  = position.coords.heading;
//        $scope.Speed = position.coords.speed;
        $scope.Timestamp = position.timestamp;
        $scope.$apply();
        alert( $scope.Latitude + $scope.Longitude);

    };

    $scope.onError = function(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

});

//用ngcordova库定位--暂时隐藏-android有问题，后续研究解决
app.controller('SideMenuNGGeoCtrl', function($scope, $ionicModal, $cordovaGeolocation){

    $ionicModal.fromTemplateUrl('templates/geo-info.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.showGeoInfo = function() {

        $scope.modal.show();

        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                alert(lat + "--" + long);
                $scope.onSuccess(position);
            }, function (err) {
                alert("定位失败");
            });
    };

    $scope.onSuccess = function(position) {
        $scope.Latitude  = position.coords.latitude ;
        $scope.Longitude = position.coords.longitude;
        $scope.Timestamp = position.timestamp;
        $scope.$apply();
        alert( $scope.Latitude + $scope.Longitude);

    };

    });


