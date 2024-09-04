<template>
  <div class="container mt-5">
    <h1>Contact Us</h1>
    <div class="row">
      <div class="col-lg-6">
        <form @submit.prevent>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="name">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email">
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea class="form-control" id="message" rows="5" v-model="message"></textarea>
          </div>
          <button type="submit" class="btn btn-success w-25" @click="submitForm">Submit</button>
        </form>
        <div v-if="errors.length > 0" class="mt-3 alert alert-danger">
          <h3>Errors:</h3>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6">
        <h3>Contact Information</h3>
        <p><strong>Address:</strong> 123 Main St, City, State, ZIP</p>
        <p><strong>Phone:</strong> 123-456-7890</p>
        <p><strong>Email:</strong> info@example.com</p>
      </div>
    </div>
    <div class="mt-5">
        <p>Copyright © 2024 | Abrar's Store</p>
        <i class="fa-brands fa-facebook me-3"></i><i class="fa-brands fa-instagram mx-3"></i><i class="fa-brands fa-twitter ms-3"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      errors: [],
    };
  },
  methods: {
    submitForm() {
      this.checkInput();
      if(this.errors.length === 0){
        alert('Form submitted');
      }
      
    },
    checkInput(){
      this.errors = [];
      if(this.name === ''){
        this.errors.push('Name required');
      }
      if(this.email === ''){
        this.errors.push('Email required');
      } else if(!this.email.includes('@')){
        this.errors.push('Invalid email'); 
      }   
      if(this.message === ''){
        this.errors.push('Message required');
      }
    }
  },
};
  
  
  

</script>

<style>

i{
    transition: color 0.5s ease;
}
i:hover{
    color: grey;
}
</style>