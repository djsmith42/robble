angular.module('RobbleControllers').
controller("ChatController", ['$scope', '$timeout', '$window', '$element', function($scope, $timeout, $window, $element) {
    $scope.messages = [];
    $scope.setupNeeded = true;

    var timeout;

    $scope.setupComplete = function() {
        $scope.setupNeeded = false;
        $scope.readyToChat = true;
        var roomId = $window.location.pathname.split('/').pop();
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

    $scope.sendMessage = function() {
        firebase.push({
            name: $scope.userName,
            text: $scope.textToSend
        });
        delete $scope.textToSend;
    }
}]);
