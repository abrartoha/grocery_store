<script>
    export default {
        props: [
            'source', 'description', 'name', 'price',
        ],
        
    }
</script>

<template>

<div class="card shadow">
    <img :src="source" class="card-img-top" :alt="description">
    <div class="card-body">
        <h4 class="card-title">{{ name }}</h4>
        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
        <p class="card-text"><strong>${{ price }}</strong></p>
        <slot></slot>
    </div>
</div>

</template>


<style scoped>
img{
    width: 100%;
    height:15vw;
}


@media screen and (max-width:576px){
    img{
    height:40vw;
}
}

</style>