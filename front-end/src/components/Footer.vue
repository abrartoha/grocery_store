<script>
    export default {
        
    }
</script>

<template>

<footer class="container-fluid mt-5 bg-dark text-white">
    <div class="row gx-5 gy-5">
        <div class="col-xs-12 col-lg-6">
            <router-link to="/" class="h2">Home</router-link>
            <p class="lead">Welcome to <strong>Abrar's Grocery Store</strong>, your number one source for fresh, high-quality groceries. We're dedicated to giving you the very best of produce, meat, seafood, bakery items, and more, with a focus on sustainability, local sourcing, and exceptional customer service.</p>
        </div>
        <div class="col-xs-12 col-lg-3">
         <h3 class="mb-4">Quick Links</h3>
         <router-link to="/about">About</router-link><br>
         <router-link to="/cart">Cart</router-link><br>
         <router-link to="/checkout">Checkout</router-link><br>
         <router-link to="/contact">Contact</router-link><br>
         <router-link to="/">Home</router-link><br>
         <router-link to="/login">Login</router-link><br>
         <router-link to="/products">Products</router-link><br>
         <router-link to="/admin">Admin</router-link><br>
         <router-link to="/orderHistory">Order History</router-link>
        </div>
        <div class="col-xs-12 col-lg-3">
           <h3 class="mb-4">Site Links</h3> 
           <router-link to="/">Privacy Policy</router-link><br>
           <router-link to="/">Shipping Details</router-link><br>
           <router-link to="/">Offers Coupons</router-link><br>
           <router-link to="/">Terms & Conditions</router-link><br>
        </div>
    </div><hr>
    <div>
        <p>Copyright © 2024 | Abrar's Store</p>
        <i class="fa-brands fa-facebook me-3"></i><i class="fa-brands fa-instagram mx-3"></i><i class="fa-brands fa-twitter ms-3"></i>
    </div>
</footer>

</template>


<style scoped>

footer a{
    font-weight: 700;
    color: grey;
    text-decoration: none;
    transition: color 0.5s ease;
}

footer a:hover{
    color: white;
}

i{
    transition: color 0.5s ease;
}
i:hover{
    color: grey;
}
footer{
    padding: 6rem 3rem;
}

</style>