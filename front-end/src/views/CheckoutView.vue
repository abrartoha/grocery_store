<script>

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            streetAddress: '',
            suburb: '',
            state: 'VIC', 
            postCode: '',
            phone: '',
            email: '',
            orderNotes: '',
            payment: 'credit',
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvv: '',
            errors: [],
            loggedInUser: [],
            cart: [],
        }
    },
    methods: {
        checkout() {
            console.log(this.loggedInUser);
            this.checkInput();
            if (this.errors.length === 0) {
                this.placeOrder();
            } else {
                // Scroll to the error list
                const errorElement = document.getElementById('error-list');
                if (errorElement) {
                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        },

        checkInput() {
            this.errors = []; 

            if (this.loggedInUser.length === 0) {
                this.errors.push('You must be logged in to place an order');
            } else {
                if (this.firstName === '') {
                this.errors.push('First name is required');
            }
            if (this.lastName === '') {
                this.errors.push('Last name is required');
            }
            if (this.streetAddress === '') {
                this.errors.push('Street address is required');
            }
            if (this.suburb === '') {
                this.errors.push('Suburb is required');
            }
            if (this.state === '') {
                this.errors.push('State is required');
            }
            if (this.postCode === '') {
                this.errors.push('Postcode is required');
            }
            if (this.phone === '') {
                this.errors.push('Phone is required');
            }
            if (this.email === '') {
                this.errors.push('Email is required');
            } else if (!this.isValidEmail(this.email)) {
                this.errors.push('Invalid email format');
            }
            if (this.payment === 'credit') {
                if (this.cardNumber === '') {
                    this.errors.push('Card number is required');
                } else if (this.cardNumber.length !== 16) {
                    this.errors.push('Card number must be 16 digits');
                }
                if (this.cardName === '') {
                    this.errors.push('Cardholder name is required');
                }
                if (this.expiryDate === '') {
                    this.errors.push('Expiry date is required');
                } else if (!/^\d{2}-\d{2}$/.test(this.expiryDate)) {
                        this.errors.push('Invalid expiry date format');
                }
                if (this.cvv === '') {
                    this.errors.push('CVV is required');
                } else if (!/^\d{3}$/.test(this.cvv)) {
                        this.errors.push('Invalid CVV format');
                }
            }if(this.cart.length === 0){
                this.errors.push('Cart is empty. You have to order first');
            }
            }
            
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
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
                    console.log(this.loggedInUser);
                })
                .catch(error => {
                    console.error(error);
                });
        },
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
                this.cart = [];
                alert('Order placed successfully');
                this.$router.push({ name: 'Home' });
                console.log('Cart deleted successfully');
                
            } catch (error) {
                console.error('Error deleting cart:', error);
            }
    },
    async placeOrder() {
    try {
        const orderDetails = {
            user_id: this.loggedInUser[0].user_id,
            firstName: this.firstName,
            lastName: this.lastName,
            streetAddress: this.streetAddress,
            suburb: this.suburb,
            state: this.state,
            postCode: this.postCode,
            phone: this.phone,
            email: this.email,
            orderNotes: this.orderNotes,
            payment: this.payment,
            amount: this.amount,
            cardNumber: this.payment === 'credit' ? this.cardNumber : null,
            cardName: this.payment === 'credit' ? this.cardName : null,
            expiryDate: this.payment === 'credit' ? this.expiryDate : null,
            cvv: this.payment === 'credit' ? this.cvv : null,
            orderItems: this.cart, // Ensuring the items are part of the order details
        };

        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
            throw new Error('Failed to place order');
        }

        await this.deleteCart();

    } catch (error) {
        console.error('Error placing order:', error);
        this.errors.push('Error placing order. Please try again.');
    }
}

        
    
    },
    mounted() {
        this.getLoginStatus();
        this.fetchCart();
    },
    computed: {
        amount() {
            return this.cart.reduce((total, product) => total + product.price * product.quantity, 0);
        }
    },
    

}
</script>


<template>
    <main class="container">
        <div class="display-4 pb-4 mt-5" id="checkout-title">Checkout</div>
        <section class="row mt-5 gx-5">
            <div class="col-lg-7">
                <h3 class="pb-3 border-bottom">Billing Details</h3>
                <form @submit.prevent>
                    <div class="mb-3 d-flex justify-content-between">
                        <span class="input-span">
                            <label for="fName" class="form-label">First Name<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="fName" v-model="firstName">
                        </span>
                        <span class="input-span">
                            <label for="fName" class="form-label">Last Name<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="fName" v-model="lastName">
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="sAddress" class="form-label">Street Address<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="sAddress" v-model="streetAddress">
                    </div>
                    <div class="mb-3">
                        <label for="suburb" class="form-label">Suburb<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="suburb" v-model="suburb">
                    </div>
                    <div class="mb-3">
                        <label for="state">State<span class="text-danger">*</span></label>
                        <select id="state" class="form-select" v-model="state">
                            <option selected value="VIC">VIC</option>
                            <option value="NSW">NSW</option>
                            <option value="TAS">TAS</option>
                            <option value="ACT">ACT</option>
                            <option value="QUE">QUE</option>
                            <option value="WES">WES</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="postcode" class="form-label">Postcode<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="postcode" v-model="postCode">
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="phone" v-model="phone">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="payment">Payment Method</label>
                        <select id="payment" class="form-select" v-model="payment">
                            <option selected value="credit">Credit Card</option>
                            <option value="cash">Cash On Delivery</option>
                        </select>
                    </div>
                    <h3 class="pb-3 border-bottom mb-3">Additional Information</h3>
                    <div class="mb-3">
                        <label for="note">Order notes (optional)</label><br>
                        <textarea name="note" id="note" rows="8"  placeholder="Any special note about the order, e.g. special notes for delivery" class="w-100 p-2" v-model="orderNotes"></textarea>
                    </div>
                </form>
            </div>
            <div class="col-lg-5">
                <div class="p-4 border border-2">
                    <h3 class="mb-4">Your Order</h3>
                    <table class="table">
                            <thead>
                                <tr>
                                <th scope="col" class="text-dark" id="product">Product</th>
                                <th scope="col" class="text-dark" id="subtotal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="fs-2">
                                <tr v-for="(product, index) in cart" :key="product.name">
                                    <td :headers="product">{{ product.name }} x {{ product.quantity }}</td>
                                    <td :headers="subtotal">${{ product.quantity * product.price }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total Amount</td>
                                    <td :headers="subtotal">${{ amount }}</td>
                                </tr>
                            </tfoot>
                    </table>
                </div>
                <TransitionGroup>
                    <div v-if="payment==='credit'" class="mt-5 card" id="card">
                        <div>
                            <h3 class="mb-4 card-header">Card Details</h3>
                            <div class="card-body">
                                <div class="mb-3">
                                    <label for="cardNumber" class="form-label">Card Number<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control rounded" id="cardNumber" v-model="cardNumber" placeholder="xxxx-xxxx-xxxx-xxxx">
                                </div>
                                <div class="mb-3">
                                    <label for="cardName" class="form-label">Cardholder Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control rounded" id="cardName" v-model="cardName">
                                </div>
                                <div class="mb-3">
                                    <label for="expiryDate" class="form-label">Expiry Date<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control rounded" id="expiryDate" v-model="expiryDate" placeholder="xx-xx">
                                </div>
                                <div class="mb-3">
                                    <label for="cvv" class="form-label">CVV<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control rounded" id="cvv" v-model="cvv" placeholder="xxx">
                                </div>
                            </div>
                        </div>
                    </div> 
                </TransitionGroup> 
                <button @click="checkout" class="btn btn-success w-100 mt-2">Place Order</button>                 
            </div>
        </section>
        <div v-if="errors.length > 0" class="alert alert-danger mt-3" id="error-list">
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
    </main>
</template>


<style scoped>

    #checkout-title{
        border-bottom: solid 3px #198754;
    }

    input, select{
        border: solid 2px grey;
        border-radius: 0;
    }
    input:focus, select:focus{
        outline: none;
        box-shadow: none;
        border: solid 2px black;  
    }
    label span{
        font-weight: 1000;
    }

    .input-span{
        width: 48%;
    }
    td{
        font-size: 1.5rem;
    }
    tfoot tr:last-child {
        border-top: 2px solid black; 
    }
    
    .v-enter-from, .v-leave-to{
        opacity: 0;
        scale: 0;
    }
    .v-enter-to, .v-leave-from {
        opacity: 1;
        scale: 1;
    }
    #card{
    transition: all 0.3s ease;
}

   
</style>