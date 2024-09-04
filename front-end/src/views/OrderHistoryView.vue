<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <h1 v-if="filterOrder !== null">Order History</h1>
                <div class="table-responsive" v-if="filterOrder !== null">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" id="id">Order ID</th>
                                <th scope="col" id="date">Date</th>
                                <th scope="col" id="items">Items</th>
                                <th scope="col" id="status">Status</th>
                                <th scope="col" id="total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in filterOrder" :key="order.order_id" >
                                <td :headers="id">{{ order.order_id }}</td>
                                <td :headers="date">{{ new Date(order.order_date).toLocaleString() }}</td>
                                <td :headers="items">
                                    <ul>
                                        <li v-for="item in orderItems(order)" :key="item.product_id">
                                            <h4>{{ item.name }}</h4> 
                                            Quantity: <b>{{ item.quantity }}</b>, 
                                            Price: <b>{{ item.price }}</b>, 
                                            Total Price: <b>{{ item.totalPrice }}</b> 
                                        </li>
                                    </ul>
                                </td>
                                <td :headers="status">{{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}</td> <!-- Display the status -->
                                <td :headers="total"><h4>{{ calculateTotal(order) }}</h4></td> 
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="(filterOrder == false) || (loggedInUser == false)" class="mt-2">
                    <p class="display-2 alert alert-danger rounded p-3">No orders found</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loggedInUser: null,
            orders: [],
            filterOrder: null
        };
    },
    methods: {
        async getLoginStatus() {
            try {
                const response = await fetch('http://localhost:3000/login');
                if (!response.ok) {
                    throw new Error('Failed to fetch login status');
                }
                const data = await response.json();
                this.loggedInUser = data;
                console.log('Logged in user:', data);
            } catch (error) {
                console.error('Error fetching login status:', error);
            }
        },
        async getOrders() {
            try {
                const response = await fetch('http://localhost:3000/orderHistory');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                this.orders = data;
                this.filteredOrders();
                console.log('Orders:', data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        filteredOrders() {
            if (this.loggedInUser && this.loggedInUser[0].user_id) {
                const userId = this.loggedInUser[0].user_id;
                this.filterOrder = this.orders.filter(order => order.user_id === userId);
                console.log('Filtered orders:', this.filterOrder);
            }
        },
        orderItems(order) {
            return JSON.parse(order.order_items).map(item => {
                const totalPrice = item.price * item.quantity;
                return {
                    ...item,
                    totalPrice // Include total price for each item
                };
            });
        },
        calculateTotal(order) {
            const items = this.orderItems(order);
            return items.reduce((total, item) => total + item.totalPrice, 0); // Calculate total purchase amount
        }
    },
    async mounted() {
        await this.getLoginStatus();
        await this.getOrders();
    },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
