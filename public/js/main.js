var app = angular.module("chatApp",[]);

app.factory("socket",function(){
	var socket=io.connect("http://localhost:3000");
	socket.emit("connect");
	return socket;
});

app.controller("ChatCrtl",function($scope,socket){

	$scope.msgs=[];
	$scope.logmsgs=[];

	$scope.sendMsg = function(){
		socket.emit("message","html client : "+$scope.msg.text);
		$scope.msg.text="";
		$scope.count++;
	}
	
	socket.on("established",function(data){
		$scope.logmsgs.push(data);
		$scope.$digest();
	});
	
	
	socket.on("message",function(data){
		$scope.msgs.push(data);
		$scope.$digest();
	});
	
});