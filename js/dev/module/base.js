define(["angular", "angular-route", "config", "dict", "common", "angular-cookies", "service", "component"], function(angular) {
	return angular.module('ngView', ["ngRoute", "ngConfig", "ngDict", "ngCommon", "ngCookies", "ngService", "ngComponent"])

	.config(
	    ["$routeProvider", "$httpProvider", "$controllerProvider", function($routeProvider, $httpProvider, $controllerProvider) {
//		    var interceptor = ['$q', function($q) {
//		    	var $loading = $("#loadingFrame").contents().find("#loading");
//		    	function ajax_before() {
//		    		$("#loadingFrame").show();
//		    		$loading.show();
//	        	}
//		    	function ajax_after() {
//		    		$("#loadingFrame").hide();
//		    		$loading.hide();
//	        	}
//
//		    	var promises;
//				return function(promise) {
//					promises = $q.all(promises? [promise].concat([promises]): [promise]);
//					ajax_before();
//					return promise.then(function(response) {
//						promises.then(function() {
//							ajax_after();
//						});
//						return response;
//					}, function(response) {
//						ajax_after();
//						return $q.reject(response);
//					});
//				};
//		    }];
//		    $httpProvider.responseInterceptors.push();

		    var lazyCtrl = function(ctrlName) {
		    	return ["$q", "$rootScope", function($q, $rootScope) {
					var deferred = $q.defer();
					require(["base", ctrlName], function(base, ctrl) {
						$controllerProvider.register.apply(base, ctrl);
						deferred.resolve();
						$rootScope.$digest();
					});
					return deferred.promise;
				}];
		    };

		    $routeProvider.when("/login", {
				templateUrl: "pages/user/login.html",
				controller: "loginCtrl",
				resolve: {
					ctrl: lazyCtrl("login")
				}
			});
		    $routeProvider.when("/todoList", {
				templateUrl: "pages/todoList/todoList.html",
				controller: "TodoListCtrl",
				resolve: {
					ctrl: lazyCtrl("todoList")
				}
			});
		    $routeProvider.when("/searchTodo", {
				templateUrl: "pages/todoList/searchTodo.html",
				controller: "SearchTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("searchTodo")
				}
			});
			$routeProvider.when("/editTodo", {
				templateUrl: "pages/todoList/editTodo.html",
				controller: "editTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("editTodo")
				}
			});
			$routeProvider.when("/addTodo", {
				templateUrl: "pages/todoList/addTodo.html",
				controller: "addTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("addTodo")
				}
			});
			$routeProvider.when("/viewTodo", {
				templateUrl: "pages/todoList/viewTodo.html",
				controller: "viewTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("viewTodo")
				}
			});
			$routeProvider.when("/userList", {
				templateUrl: "pages/user/userList.html",
				controller: "UserListCtrl",
				resolve: {
					ctrl: lazyCtrl("userList")
				}
			});
			$routeProvider.when("/addUser", {
				templateUrl: "pages/user/addUser.html",
				controller: "addUserCtrl",
				resolve: {
					ctrl: lazyCtrl("addUser")
				}
			});
			$routeProvider.when("/editUser", {
				templateUrl: "pages/user/editUser.html",
				controller: "editUserCtrl",
				resolve: {
					ctrl: lazyCtrl("editUser")
				}
			});
			$routeProvider.when("/viewUser", {
				templateUrl: "pages/user/viewUser.html",
				controller: "viewUserCtrl",
				resolve: {
					ctrl: lazyCtrl("viewUser")
				}
			});
			$routeProvider.when("/groupList", {
				templateUrl: "pages/group/groupList.html",
				controller: "groupListCtrl",
				resolve: {
					ctrl: lazyCtrl("groupList")
				}
			});
			$routeProvider.when("/addGroup", {
				templateUrl: "pages/group/addGroup.html",
				controller: "addGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("addGroup")
				}
			});
			$routeProvider.when("/editGroup", {
				templateUrl: "pages/group/editGroup.html",
				controller: "editGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("editGroup")
				}
			});
			$routeProvider.when("/deleteGroup", {
				templateUrl: "pages/group/deleteGroup.html",
				controller: "deleteGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("deleteGroup")
				}
			});
			$routeProvider.when("/viewGroup", {
				templateUrl: "pages/group/viewGroup.html",
				controller: "viewGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("viewGroup")
				}
			});

	        $routeProvider.otherwise({redirectTo: '/todoList'});
	    }]
	)

	/** 初始化ngView对象，初始化定义$rootScope相关方法 **/
	.run(['$rootScope', '$config', "$route", "$remote",
	function($rootScope, $config, $route, $remote) {

		$rootScope.post2SRV = function(action,formData,callBack,failBack) {
			return $remote.post(action,formData,function(data) {
	            // data = $transLate(data);
	            callBack && callBack(data);
	        },failBack,function(data) {
				alert("与服务器连接失败");
			});
	    };

		/**页面跳转统一方法*/
		var flag;
		$rootScope.locate = function(url) {
	    	setTimeout(function() {
	    		flag = true;
	    		if (window.location.hash == url) {
	    	    	$route.reload();
	    	    	$rootScope.$apply();
	    		} else {
	    			window.location.href=url;
	    		}
	    	}, 1);
	    };

	    $rootScope.$on("$locationChangeStart", function(event, next, current) {
	    	/*if (!flag) {
	    		event.preventDefault();
	    		flag = false;
	    		return;
	    	}
	    	flag = false;*/
	    });

	    $rootScope.template = {};
	    $rootScope.template.addUser = {
	    	_rowBegin: 2,  //数据起始行
	    	loginId: 1,
	    	password: 2,
	    	status: 3,
	    	email: 4,
	    	group: 5,
	    	role: 6,
	    	position: 7,
	    	sex: 8,
	    	idNo: 9,
	    	birthday: 10,
	    	nativeplace: 11,
	    	residenceType: 12,
	    	nation: 13,
	    	marital: 14,
	    	political: 15,
	    	education: 16,
	    	graduated: 17,
	    	major: 18,
	    	graduationTime: 19,
	    	experience: 20,
	    	contractBeginDate: 21,
	    	contractEndDate: 22,
	    	phoneno: 23,
	    	address: 24
	    };

	}])

	.controller("BaseCtrl", ["$scope", "$rootScope", "$http", "$cookies", "$location", "$window", "$remote", "$restful", 
		function ($scope, $rootScope, $http, $cookies, $location, $window, $remote, $restful) {
		$scope.logout = function(){
			$remote.post("/userBiz/logout", null, function(data){  //url request for production
//			$remote.post("/test/todo/logout.php", null, function(data){  //url request for testing
				alert("您已安全退出");
				$cookies.isLogin = '';
				$cookies._loginId = '';
				$cookies.loginId = '';
				$cookies.loginRole = '';
				$location.path('todoList');
				$rootScope.loginInfo = {};
			});
		}
		$rootScope.loginInfo = $rootScope.loginInfo || {};
		$rootScope.loginInfo.isLogin = $cookies.isLogin=='true';
		$rootScope.loginInfo.loginRole = !!$cookies.isLogin && !!$cookies._loginId && !!$cookies.loginRole 
				? parseInt($cookies.loginRole) : -1;
		$rootScope.loginInfo._loginId = $cookies._loginId;
	}])
	;
	
});
