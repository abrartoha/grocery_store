<template>
    <div class="container" id="form-container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Register Account</div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="form-group">
                                <label for="firstName" class="form-label">First Name<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="firstName" v-model="firstName">
                            </div>
                            <div class="form-group">
                                <label for="lastName" class="form-label">Last Name<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="lastName" v-model="lastName">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Gender<span class="text-danger">*</span></label><br>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="male" value="male" v-model="gender">
                                    <label class="form-check-label" for="male">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="female" value="female" v-model="gender">
                                    <label class="form-check-label" for="female">Female</label>
                                </div>
                            </div>
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
                            <div class="form-group">
                                <label for="dob" class="form-label">Date of Birth<span class="text-danger">*</span></label>
                                <input type="date" class="form-control" id="dob" v-model="dob">
                            </div>
                            <button type="submit" class="btn btn-primary mt-3 w-100">Sign Up</button>
                            <p class="mt-3">Already have an account? <router-link :to="{name: 'Login'}">Login</router-link></p>
                        </form>
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: '',
            gender: '',
            errors: [],
            users: [],
            
        };
    },
    methods: {
        checkInput() {
            this.errors = []; 

            if (this.firstName === '') {
                this.errors.push('First name is required');
            }
            if (this.lastName === '') {
                this.errors.push('Last name is required');
            }
            if(this.gender === '') {
                this.errors.push('Gender Can\'t be empty');
            }   
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
            if (this.dob === '') {
                this.errors.push('Date of birth is required');
            }
        },

        register() {
            this.checkInput();
            this.checkUser();
            if (this.errors.length === 0) {
                fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                        dob: this.dob,
                        gender: this.gender
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('Data sent to server successfully!');
                            alert('Account created successfully!');
                            this.firstName = '';
                            this.lastName = '';
                            this.email = '';
                            this.password = '';
                            this.confirmPassword = '';
                            this.dob = '';
                            this.gender = '';
                            this.$router.push({ name: 'Home' });
                        } else {
                            throw new Error('Failed to send data to server');
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                
                
                console.log('Data sent to database successfully!');
            } else{
                const errorList = document.getElementById('error-list');
                errorList.scrollIntoView( {behavior: 'smooth', block: 'start'});
            }
        },
        checkUser() {
            this.users.forEach(user => {
                if (user.email === this.email) {
                    this.errors.push('Email already exists');
                }
            });
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
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
    },
    mounted() {
            this.getUser();
        }
};
</script>

<style scoped>
    #form-container{
        margin-top: 8rem;
        margin-bottom: 8rem;
    }
</style>