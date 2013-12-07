angular.module('RobbleDirectives').
directive("focusOn", function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.focusOn, function(doFocus) {
            setTimeout(function() { // to give the DOM time to rearrange first
                if (doFocus) {
                    element.focus();
                } else {
                    element.blur();
                }
            });
        });
    }
});
