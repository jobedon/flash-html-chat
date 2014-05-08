var app = angular.module("chatApp",[]);

/*app.factory("socket",function(){
	var socket=io.connect("http://localhost:3000");
	socket.emit("connect");
	return socket;
});*/

app.controller("ChatCrtl",function($scope){

	$scope.msgs=[];
	$scope.logmsgs=[];

	var socket=null;

	$scope.sendMsg = function(){
		socket.emit("message","html client : "+$scope.msg.text);
		$scope.msg.text="";
		$scope.count++;
	}

	$scope.connectSocketIo = function(){
		socket=io.connect($scope.server);
		socket.emit("connect");

		socket.on("established",ESTABLISHED);
		socket.on("message",MESSAGE);


	}

	function ESTABLISHED(data){
		$scope.logmsgs.push(data);
		$scope.$digest();
	}

	function MESSAGE(data){
		$scope.msgs.push(data);
		$scope.$digest();
	}
	

	
});