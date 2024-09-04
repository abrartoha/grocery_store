<template>
    <div class="container mt-5" v-if="isAdmin">
        <p class="display-3">Admin Page</p>
        <!-- Add Product Form -->
        <form @submit.prevent="addProduct" class="col-12">
            <h2>{{ editing ? 'Edit Product' : 'Add Product' }}</h2>
            <!-- Product Name -->
            <div class="mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="productName" v-model="newProduct.name">
            </div>
            <!-- Product Price -->
            <div class="mb-3">
                <label for="productPrice" class="form-label">Product Price</label>
                <input type="number" class="form-control" id="productPrice" v-model="newProduct.price">
            </div>
            <!-- Product Description -->
            <div class="mb-3">
                <label for="productDescription" class="form-label">Product Description</label>
                <textarea class="form-control" id="productDescription" v-model="newProduct.description"></textarea>
            </div>
            <div class="mb-3">
                <label for="productPath" class="form-label">File Path</label>
                <input type="text" class="form-control" id="productPath" v-model="newProduct.source" placeholder="Enter file path here as '@/assets/Images/...'">
            </div>
            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">{{ editing ? 'Update Product' : 'Add Product' }}</button>
            <button type="button" class="btn btn-secondary ml-2" v-if="editing" @click="resetForm">Cancel Edit</button>
        </form>

        <p class="display-5 mt-5">Product List</p>
        <div class="table-responsive">
            <table class="table col-12">
                <thead>
                    <tr>
                        <th scope="col" id="productId">Product ID</th>
                        <th scope="col" id="productName">Product Name</th>
                        <th scope="col" id="productPrice">Product Price</th>
                        <th scope="col" id="productDescription">Product Description</th>
                        <th scope="col" id="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td :headers="productId">{{ product.id }}</td>
                        <td :headers="productName">{{ product.name }}</td>
                        <td :headers="productPrice">{{ product.price }}</td>
                        <td :headers="productDescription">{{ product.description }}</td>
                        <td :headers="actions">
                            <button class="btn btn-dark mb-2" @click="removeProduct(product.id)">Remove</button>
                            <button class="btn btn-success mb-2" @click="editProduct(product)">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="container mt-5 mb-5" v-else>
        <p class="display-3">You don't have access to the admin page</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newProduct: {
                id: null,
                name: '',
                price: 0,
                description: '',
                source: '',
            },
            products: [],
            loggedInUser: [],
            adminUsers: [],
            admin: false,
            editing: false, // New state to track editing
        };
    },
    methods: {
        getLoginStatus() {
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
        async addProduct() {
            if (this.editing) {
                // Update the product
                try {
                    const response = await fetch(`http://localhost:3000/admin/${this.newProduct.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.newProduct),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    this.fetchProducts(); // Refresh the product list
                    this.resetForm();
                    console.log(data);
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            } else {
                // Add the product
                try {
                    const response = await fetch('http://localhost:3000/admin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.newProduct),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    this.fetchProducts(); // Refresh the product list
                    this.resetForm();
                    console.log(data);
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            }
        },
        resetForm() {
            this.newProduct = {
                id: null,
                name: '',
                price: 0,
                description: '',
                source: '',
            };
            this.editing = false;
        },
        async removeProduct(productId) {
            this.products = this.products.filter(product => product.id !== productId);
            try {
                const response = await fetch(`http://localhost:3000/admin/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error removing product:', error);
            }
        },
        async editProduct(product) {
            this.newProduct = { ...product };
            this.editing = true;
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
        async getAdminUsers() {
            try {
                const response = await fetch('http://localhost:3000/adminusers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.adminUsers = data;
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
    mounted() {
        this.fetchProducts();
        this.getLoginStatus();
        this.getAdminUsers();
    },
    computed: {
        isAdmin() {
            return this.loggedInUser.some(user => {
                return this.adminUsers.some(admin => admin.email === user.email);
            });
        },
    },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
