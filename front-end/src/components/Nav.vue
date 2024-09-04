<script>
export default {
  
}
</script>


<template>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
            <router-link :to="{name: 'Products'}" class="nav-link mx-2">Products</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{name: 'Cart'}"  class="nav-link mx-2"><i class="fa-solid fa-cart-shopping"></i></router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'About'}" class="nav-link mx-2">About</router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'Contact'}" class="nav-link mx-2">Contact</router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'Register'}" class="nav-link mx-2"><i class="fa-solid fa-user"></i></router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>


<style scoped>


.nav-link{
    transition: color 0.6s ease;
}
.nav-link:hover{
    color: #198754;
}

.nav-item{
    font-weight: 500;
}

a.router-link-exact-active{
  color: #198754;
}

span{
    color: white;
}
</style>