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

//用cordova库定位-由于cordova定位插件的问题，这里卸载它的插件，用H5的定位接口
app.controller('SideMenuGeoCtrl', function($scope, $ionicModal){

    $ionicModal.fromTemplateUrl('templates/geo-info.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.showGeoInfo = function() {
        $scope.modal.show();

        var option = {
            maximumAge: 0,
            timeout: 15000,
            enableHighAccuracy: false
        };
        //navigator.geolocation.getCurrentPosition($scope.onSuccess, $scope.onError, option);
        $scope.watchId = navigator.geolocation.watchPosition($scope.onSuccess, $scope.onError, option);

    };

    $scope.onSuccess = function(position) {
        navigator.geolocation.clearWatch($scope.watchId);
        $scope.Latitude  = position.coords.latitude ;
        $scope.Longitude = position.coords.longitude;
        $scope.Timestamp = position.timestamp;
        $scope.$apply();

    };

    $scope.onError = function(error) {
//        alert('code: '    + error.code    + '\n' +
//            'message: ' + error.message + '\n');
        alert("定位失败，请检查是否打开GPS");
        $scope.baiAPILocation();
    };

});

//用ngcordova库定位--
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

 //使用百度定位功能
app.controller('SideMenuBDGeoCtrl', function($scope, $ionicModal, $cordovaGeolocation) {

    $ionicModal.fromTemplateUrl('templates/geo-info.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.showGeoInfo = function(){
        if(!$scope.checkConnection()){
            return false;
        }
        $scope.modal.show();
        try{

            //基于百度API的插件
                window.locationService.getCurrentPosition(function(pos) {
//                    alert(JSON.stringify(pos));
                    $scope.setGeo(pos);
//                    window.locationService.stop({}, {})
                });
                return;

            //直接用百度API,但是它需要在线加载Key，如果没有打开网络会导致APP起不来
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        console.log('您的位置：'+r.point.lng+','+r.point.lat + "," + r.address.province + "," + r.address.city);
                        $scope.onSuccess(r);
                    }
                    else {
                        console.log('failed'+this.getStatus());
                    }
                },{
                    enableHighAccuracy: true,
                    timeout: 10 * 1000,
                    maximumAge: 1000 * 30
                });
        }catch(e)
        {
            console.log("write fail");
        }

    };

    $scope.checkConnection = function () {
        var networkState = navigator.connection.type;
        if(networkState == Connection.NONE){
            alert("请打开网络");
            return false;
        }
        else{
            return true;
        }
    };

    $scope.setGeo = function(pos){
        $scope.Latitude  = pos.coords.latitude;
        $scope.Longitude = pos.coords.longitude;
        $scope.$apply();
    };

    $scope.onSuccess = function(r) {
        navigator.geolocation.clearWatch($scope.watchId);
        $scope.Latitude  = r.point.lat  ;
        $scope.Longitude = r.point.lng;
        $scope.province =  r.address.province ;
        $scope.city = r.address.city;

        $scope.$apply();
//        alert( $scope.Latitude + $scope.Longitude);

    };

});