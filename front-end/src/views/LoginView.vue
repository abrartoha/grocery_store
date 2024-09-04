<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="password" class="form-label">Password<span class="text-danger">*</span></label>
                                <input type="password" class="form-control" id="password" v-model="password">
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword" class="form-label">Confirm Password<span class="text-danger">*</span></label>
                                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
                            </div>
                            <button type="submit" class="btn btn-primary mt-3 w-100">Login</button>
                            <p class="mt-3">Don't have an account? <router-link :to="{ name: 'Register' }">Register</router-link></p>
                        </form>
                        <button type="button" class="btn btn-dark w-100" v-if="loggedInUser.length > 0" @click="logout">Log Out</button>
                        <div v-if="errors.length > 0" class="alert alert-danger mt-3" id="error-list">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            errors: [],
            users: [],
            loggedInUser: []
            
        };
    },
    methods: {
        
        checkInput() {
            this.errors = []; 

            if (this.email === '') {
                this.errors.push('Email is required');
            } else if (!this.isValidEmail(this.email)) {
                this.errors.push('Invalid email format');
            }
            if (this.password === '') {
                this.errors.push('Password is required');
            } else if (this.password.length < 8) {
                this.errors.push('Password must be at least 8 characters');
            } else if (!/[&@%]/.test(this.password)) {
                this.errors.push('Password must contain at least one of the following characters: @, &, %');
            }
            if(this.confirmPassword === '') {
                this.errors.push('Confirm password is required');
            } else if (this.password !== this.confirmPassword) {
                this.errors.push('Passwords do not match');
            }
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        async login() {
            this.checkInput();
            this.getLoginStatus();
            if(this.loggedInUser.length > 0){
                this.errors.push('User is already logged in. Logout first to login with another account');
            }                       
            if (this.errors.length === 0) {
                this.getUser();
                if (this.checkUser()) {
                    fetch('http://localhost:3000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: this.users.find(user => user.email === this.email).id,
                            email: this.email,
                            password: this.password,
                        }),
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error('Failed to login');
                        })
                        .then(data => {
                            alert('Logged in successfully');
                            console.log(data);
                            this.$router.push({ name: 'Home' });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    this.errors.push('Invalid email or password. If you don\'t have an account, please register.');
                }
            } else {
                const errorList = document.getElementById('error-list');
                errorList.scrollIntoView({behavior: 'smooth', block: 'start'});

            }
            
        },
        checkUser() {
            for (let i = 0; i < this.users.length; i++) {
                if (this.email === this.users[i].email && this.password === this.users[i].password) {
                    return true;
                }
            }
            return false;
        },
        getUser(){
            fetch('http://localhost:3000/register')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to fetch users');
                })
                .then(data => {
                    this.users = data;
                    console.log(this.users);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getLoginStatus(){
            fetch('http://localhost:3000/login')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to fetch login status');
                })
                .then(data => {
                    this.loggedInUser = data;
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        logout() {
            fetch('http://localhost:3000/login', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to logout');
            })
            .then(data => {
                console.log(data);
                this.deleteCart();
                alert('Logged out successfully');
                this.$router.push({ name: 'Home' });
            })
            .catch(error => {
                console.error(error);
            });
        },
        async deleteCart() {
            try {
                const response = await fetch('http://localhost:3000/cart', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.$router.push({ name: 'Home' });
                console.log('Cart deleted successfully');
                
            } catch (error) {
                console.error('Error deleting cart:', error);
            }
    },

    },
    mounted() {
        this.getUser();
        this.getLoginStatus();
        
    },
};
</script>

<style scoped>

</style>