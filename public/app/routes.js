var app = angular.module("angularRoutes", ["ngRoute"])
//appRoutes ... 

.config(function($routeProvider){

    $routeProvider
    
    .when("/",{
        templateUrl: "../../app/views/pages/home.html"
    })

    .when("/about",{
        templateUrl: "../../app/views/pages/about.html"
    })

    .when("/register",{
        templateUrl: "../../app/views/pages/users/register.html",
        controller: "regCtrl",
        controllerAs: "register",
        authenticated: true,
        permission: ["admin"]
    })
    .when("/admin",{
        templateUrl: "../../app/views/pages/management/Admin.html",
        authenticated: true,
        permission: ["admin"]
    })

    .when("/login",{
        templateUrl: "../../app/views/pages/users/login.html",
        authenticate: false 
    })

    .when("/logout",{
        templateUrl: "../../app/views/pages/users/logout.html",
        authenticated: true
    })

    .when("/profile",{
        templateUrl: "../../app/views/pages/users/profile.html",
        authenticated: true
    })
    .when("/inquiry",{
        templateUrl: "../../app/views/pages/users/inquiry.html",
        controller: "reqInq",
        controllerAs: "inquiry",
        authenticated: true
    })
    //this is the admin order
    .when("/adminorders",{
        templateUrl: "../../app/views/pages/management/adminorders.html",
        authenticated: true,
        permission: ["admin"]
    })
    //this is the chef order
    .when("/cheforders",{
        templateUrl: "../../app/views/pages/users/cheforders.html",
        controller: "chefordersCtrl",
        controllerAs: "chefordersCtrl",
        authenticated: true
    })
    .when("/message",{
        templateUrl: "../../app/views/pages/users/message.html",
        controller: "messageCtrl",
        controllerAs: "message",
        authenticated: true
    })
    .when("/requests",{
        templateUrl: "../../app/views/pages/management/requests.html",
        controller: "reqCtrl",
        controllerAs: "requests",
        authenticated: true,
        permission: ["admin"]
    })

    .when("/contact",{
        templateUrl: "../../app/views/pages/users/contact.html",
        controller: "conCtrl",
        controllerAs: "contact",
        authenticated: false
    })
    .when("/management",{
        templateUrl: "../../app/views/pages/management/management.html",
        controller: "managementCtrl",
        controllerAs: "management",
        authenticated: true,
        permission: ["admin"]
    })
    .when("/spices",{
        templateUrl: "./app/views/pages/users/spices.html",
        controller: "spicesCtrl",
        controllerAs: "spicesCtrl",
        authenticated: false
    })
    .otherwise({redirectTo: "/"});

});
//restricting routes
app.run(['$rootScope', 'Auth', '$location', 'User', function($rootScope, Auth, $location, User) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        if (next.$$route !== undefined) {
            if (next.$$route.authenticated === true) {
                if (!Auth.isLoggedIn()) {
                    event.preventDefault(); 
                    $location.path('/'); 
                } else if (next.$$route.permission) {
                    User.getPermission().then(function(data) {
                        if (next.$$route.permission[0] !== data.data.permission) {
                            if (next.$$route.permission[1] !== data.data.permission) {
                                event.preventDefault(); 
                                $location.path('/');
                            }
                        }
                    });
                }
            } else if (next.$$route.authenticated === false) {
                if (Auth.isLoggedIn()) {
         
                }
            }
        }
    });
}]);
