var mathQuiz = angular.module('mathQuiz', ["ngStorage"]);

mathQuiz.controller("QuestionListCtrl", [ "$scope","$http","$localStorage", function ($scope,$http,$localStorage) {
	$http.get("json/questions.json").success(function(data){
		$scope.questions = data;
	});

	$scope.orderProp = 'correct';
	$scope.images = { 
		true : "img/yesgrn.gif",
		false : "img/nored.gif",
		"" : ""
	};

	if ( !$localStorage.attempts ) {
		$localStorage.attempts = [];
	}
	$scope.attempts = $localStorage.attempts; 
	
	$scope.validate = function() {
		for (var i = 0; i < $scope.questions.length; i++) {
			 question = $scope.questions[i];
			 if (question.op == "+") {
				 question.correct = question.value.trim() == (Number(question.arg1) + Number(question.arg2)).toString();  	 
			 } else if (question.op == "-") {
				 question.correct = question.value.trim() == (Number(question.arg1) - Number(question.arg2)).toString();  	 
			}
		}
		
		var correctAnswers = 0; 
		for (var i = 0; i < $scope.questions.length; i++) {
			question = $scope.questions[i];
			if (question.correct) {
				correctAnswers++;
			}
		}
		$scope.attempts.push({
			"number" : $scope.attempts.length+1,
			"results" : $scope.questions, 
			"passed" : correctAnswers==$scope.questions.length
		});
	}
	$scope.reset = function() {
		$localStorage.$reset();	
	}
	
}]);