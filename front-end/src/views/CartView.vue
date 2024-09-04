<script>
export default {
  data() {
    return {
        products: [],
        cart: [],
        loggedInUser: []
    }
  },
  methods: {
    async fetchCart() {
        try {
            const response = await fetch('http://localhost:3000/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
    
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.cart = data;
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    
    async fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.products = data;
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
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
        async updateCart() {
        try {
            const response = await fetch('http://localhost:3000/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.cart),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Cart updated:', data);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    },
    async removeProduct(product_id) {
        try {
            const response = await fetch(`http://localhost:3000/cart/${product_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Product removed from cart');
            console.log('Product removed:', data);
            this.cart = this.cart.filter(product => product.product_id !== product_id);
        } catch (error) {
            console.error('Error removing product:', error);
        }
    }
  },
  

   mounted() {
    this.fetchProducts();
    this.fetchCart();
    this.getLoginStatus();
  },
    computed: {
        totalAmount() {
            return this.cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
        }
    },
    watch: {
        cart: {
            handler() {
                this.updateCart();
            },
            deep: true
        }
    }
}
</script>




<template>
    <main>
        <section class="container" id="first-section">
            <h2>Shopping Cart</h2>
            <div class="row">
                <div class="col-xs-12">
                    <div class="table-responsive">
                        <table class="table border">
                            <thead>
                                <tr>
                                    <th scope="col" class="bg-success text-white" id="product">Product</th>
                                    <th scope="col" class="bg-success text-white" id="price">Price</th>
                                    <th scope="col" class="bg-success text-white" id="quantity">Quantity</th>
                                    <th scope="col" class="bg-success text-white" id="subtotal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in cart" :key="product.name">
                                    <td class="fs-2" :headers="product"><img :src="product.source" :alt="product.description" class="rounded w-75"><button class="btn btn-success" @click="removeProduct(product.product_id)">Remove</button> {{ product.name }}</td>
                                    <td :headers="price">${{ product.price }}</td>
                                    <td :headers="quantity"><input type="number" v-model="product.quantity" min="0"></td>
                                    <td :headers="subtotal">{{ product.quantity * product.price }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr v-if="cart.length !== 0">
                                    <td>Total</td>
                                    <td colspan="3" class="text-end">${{totalAmount}}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>  
                </div>
            </div>
            <h2 v-if="this.cart.length === 0" class="mt-2 alert alert-danger">
                Cart is empty.
                Do Some Shopping.
            </h2>
            <div class="row">
                <div class="col-lg-6">
                    <table class="table border" v-if="totalAmount!== 0">
                            <thead>
                                <tr>
                                <th colspan="2" scope="col" class="bg-success text-white" id="total">Cart Total</th>
                                </tr>
                            </thead>
                            <tbody class="fs-2">
                                <tr>
                                    <td :headers="total" class="d-flex justify-content-between"><span>Total Amount</span> <span>${{ totalAmount }}</span></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2"><router-link to="/checkout" class="btn btn-success w-100">Proceed to checkout</router-link></td>
                                </tr>
                            </tfoot>
                        </table>
                </div>
            </div>
        </section>
    </main>
</template>


<style scoped>

#first-section{
    margin-top: 6rem;
}

th{
    padding: 1.5rem;
}

td{
    padding: 2rem;
}

tfoot{
    font-size: 1.5rem;
    font-weight: 500;
}
tbody img{
    display: block;
    height: 8vw;
    width: 12vw;

}
</style>