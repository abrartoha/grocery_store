<template>
    <main>
      <section class="container-fluid" id="first-section">
          <div class="row">
              <aside class="col-lg-4 border-end border-2 p-5">
                  <input type="text" class="form-control mb-4" placeholder="Search products..." aria-label="Search products..." aria-describedby="button-addon" v-model="searchFilter.name"> 
                  <h2>Filter by price</h2>
                  <div class="input-group mt-3">
                      <span class="input-group-text">Max $</span>
                      <input type="text" class="form-control" v-model="searchFilter.maxPrice">
                      <input type="text" class="form-control" v-model="searchFilter.minPrice">
                      <span class="input-group-text">$ Min</span>
                  </div>
              </aside>
              <div class="col-lg-8 d-flex flex-row flex-wrap">
                  <h3 v-if="getItems.length === 0">No products with the given category</h3>
                  <TransitionGroup>
                      <prod-card-comp 
                          v-for="product in getItems"
                          :key="product.id"
                          :name="product.name"
                          :source="product.source"
                          :description="product.description"
                          :price="product.price"
                          class="m-4 prod-card"
                      >
                        <div class="d-flex justify-content-between">
                          <button type="button" class="btn btn-success" v-on:click="addToCart(product)"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                          <i id="like" class="fa-heart" :class="[{'fa-regular': product.likeStatus !== 'fa-solid'}, {'fa-solid': product.likeStatus === 'fa-solid'}]" @click="changeStatus(product)" v-if="loggedInUser.length > 0"></i>
                        </div>
                      </prod-card-comp>
                  </TransitionGroup>
              </div>
              <paginate
                  :page-count="getPageCount"
                  :page-range="3"
                  :margin-pages="1"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :click-handler="callCallback"
                  :container-class="'pagination justify-content-center mt-4'"
                  :page-class="'page-item'"
                  :active-class="'active'"
              >
              </paginate>
          </div>
      </section>
    </main>
  </template>
  
  <script>
import Paginate from 'vuejs-paginate-next';
import ProductCard from '../components/ProductCard.vue'
  
export default {
      components: {
          'prod-card-comp': ProductCard,
          'paginate': Paginate,
      },
      data() {
          return {
              searchFilter: { name: '', minPrice: '', maxPrice: '' },
              products: [],
              itemPerPage: 5,
              currentPage: 1,
              cart: [],
              loggedInUser: [],
          }
      }, 
      methods: {
          callCallback(pageNum) {
              this.currentPage = Number(pageNum);
          },
          isProductInCart(product) {
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].product_id === product.id) { 
                    console.log('Product is in cart');
                    return true;
                }
            }
            console.log('Product is not in cart');
            return false;
            },
            handleSearchFilter() {
                this.currentPage = 1;
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
                  this.products = data.map(product => ({ ...product, likeStatus: 'fa-regular' })); // Add initial likeStatus to each product
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          },
          addToCart(product) {
            if(this.loggedInUser.length === 0){
                alert('Please login to add products to the cart!');
                return;
            }
            this.fetchCart().then(() => {
                if (this.isProductInCart(product)) {
                alert(`${product.name} is already in the cart!`);
                return;
                }
                fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
                })
                .then(response => {
                if (response.ok) {
                    console.log('Data sent to server successfully!');
                    alert(`${product.name} has been added to the cart!`);
                    this.cart.push(product);
                    
                } else {
                    throw new Error('Failed to send data to server');
                }
                })
                .catch(error => {
                console.error(error);
                });
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


          changeStatus(product) {
                if (product.likeStatus === 'fa-regular') {
                    product.likeStatus = 'fa-solid';
                    alert(`${product.name} has been liked by the user!`);
                } else {
                    product.likeStatus = 'fa-regular';
                }
            }

      },
      computed: {
          filteredProducts() {
            this.handleSearchFilter();
              return this.products.filter(product => {
                  const nameMatch = product.name.toLowerCase().includes(this.searchFilter.name.toLowerCase());
                  const minPriceMatch = !this.searchFilter.minPrice || product.price >= parseFloat(this.searchFilter.minPrice);
                  const maxPriceMatch = !this.searchFilter.maxPrice || product.price <= parseFloat(this.searchFilter.maxPrice);
                  return nameMatch && minPriceMatch && maxPriceMatch;
              });
          },
          getItems() {
              let current = this.currentPage * this.itemPerPage;
              let start = current - this.itemPerPage;
              return this.filteredProducts.slice(start, current);
          },
          getPageCount() {
              return Math.ceil(this.filteredProducts.length / this.itemPerPage);
          }
      },
      mounted() {
          this.fetchProducts();
          this.fetchCart();
          this.getLoginStatus();
      },
}
</script>
  
  <style scoped>

  #like{
        font-size: 2.5rem;
        color: #212529;
        cursor: pointer;
        transition: all 0.3s ease;;

    }
    #like:hover{
        transform: scale(1.4);
        text-shadow: 0 0 16px #000000;
    }
  
  .form-control:focus {
      border: solid 1px #198754;
      outline: none;
      box-shadow: none;
  }
  #first-section {
      margin-top: 6rem;
  }
  
  /* Custom styles for the range input thumb */
  .form-range::-webkit-slider-thumb {
      background-color: #198754; /* Change the color of the thumb */
  }
  
  /* For Firefox */
  .form-range::-moz-range-thumb {
      background-color: #198754; /* Change the color of the thumb */
  }
  
  /* For IE */
  .form-range::-ms-thumb {
      background-color: #198754; /* Change the color of the thumb */
  }
  
  .prod-card{
      width: 40%;
      transition: all 0.3s ease;
  }
  
  .v-enter-from, .v-leave-to{
    opacity: 0;
    scale: 0;
  }
  .v-enter-to, .v-leave-from {
    opacity: 1;
    scale: 1;
  }
  
  @media screen and (max-width: 575px){
      .prod-card {
          width: 100%;
          margin: auto;
      }
  }
  </style>
  