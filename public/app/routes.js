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

    .when("/spices",{
        templateUrl: "../../app/views/pages/users/spices.html",
        authenticate: false
    })
    .when("/inquiry",{
        templateUrl: "../../app/views/pages/users/inquiry.html",
        controller: "reqInq",
        controllerAs: "inquiry",
        authenticated: true
    })
    .when("/order",{
        templateUrl: "../../app/views/pages/users/order.html",
        authenticated: true
    })
    .when("/messages",{
        templateUrl: "../../app/views/pages/management/messages.html",
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
                    event.preventDefault(); 
                    $location.path('/profile'); 
                }
            }
        }
    });
}]);
