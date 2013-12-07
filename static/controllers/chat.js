angular.module('RobbleControllers').
controller("ChatController", ['$scope', '$timeout', '$window', '$element', function($scope, $timeout, $window, $element) {
    var roomId = $window.location.pathname.split('/').pop();

    $scope.messages = [];
    $scope.userName = localStorage.getItem('userName for room ' + roomId);
    $scope.setupNeeded = true;

    var timeout;

    $scope.setupComplete = function() {
        if ($scope.userName) {
            $scope.setupNeeded = false;
            $scope.readyToChat = true;
            localStorage.setItem('userName for room ' + roomId, $scope.userName);
            firebase = new Firebase('https://robblebase.firebaseio-demo.com/' + roomId);
            firebase.on('child_added', function(snapshot) {
                var message = snapshot.val();
                $scope.messages.push({
                    name: message.name,
                    text: message.text
                });
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    var chatList = $element.find('ul.chat-list');
                    chatList.animate({scrollTop: chatList[0].scrollHeight});
                });
                $timeout(function(){});
            });
        }
    }

    $scope.sendMessage = function() {
        firebase.push({
            name: $scope.userName,
            text: $scope.textToSend
        });
        delete $scope.textToSend;
    }
}]);
