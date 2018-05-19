function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.deleteUser = deleteUser;
    this.findUserById = findUserById;
    this.updateUser = updateUser;
    this.findUserByUsername = findUserByUsername;
    this.login = login;
    this.url = 'http://localhost:8080/api/user';
    this.login_url = 'http://localhost:8080/api/login';
    this.profile_url = 'http://localhost:8080/api/profile'
    var self = this;


    function login(username, password) {
        return fetch(self.login_url, {
            method: 'post',
            body: JSON.stringify({username:username, password:password}),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(function(response){
            if(response.status==200) {
                return response.json();
            } else {
                return null;
            }
        });
    }

    function updateUser(userId, user) {
        return fetch(self.url + '/' + userId, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(function(response){
            if(response.status==200) {
                return response.json();
            } else {
                return null;
            }
        });
    }

    function findUserById(userId) {
        return fetch(self.url + '/' + userId)
            .then(function(response){
                return response.json();
            });
    }
    
    function findUserId(user){
    	return fetch(self.url)
        .then(function (response) {
            return response.json();
        });	
    }

    function deleteUser(userId) {
        return fetch(self.url + '/' + userId, {
            method: 'delete'
        })
    }

    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            });
    }
    
    function findUserByUsername(username) {
        return fetch(self.profile_url + '/' + username)
            .then(function(response){
            	if(response == null)
            		return null;
            	else{
            		return response.text().then(function(text) {
            		    return text ? JSON.parse(text) : {}
            	})
            });
    }

    function createUser(user) {
        return fetch(self.url, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}