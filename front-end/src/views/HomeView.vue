<script>


export default {
  
}
</script>

<template>
  <main>
    <section class="container py-5" id="first-section">
      <div class="row">
        <div class="col-sm-12 col-lg-6">
          <img src="@/assets/Images/grocery-photo.jpg" alt="Grocery Photo" class="img-fluid rounded">
        </div>
        <div class="col-sm-12 col-lg-6">
          <h3>Best Product Quality</h3>
          <div class="display-3">Join The Organic Movement!</div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          
        </div>
      </div>
    </section>
    <section class="container-fluid bg-dark text-white d-flex justify-content-between flex-wrap" id="second-section">
      <div class="bg-success text-white p-4 m-3 rounded">
          <h5><i class="fa-solid fa-truck"></i> Free Shipping</h5>
          <p>Above $5 only</p>
      </div>
      <div class="bg-success text-white p-4 m-3 rounded">
          <h5><i class="fa-solid fa-book"></i> Certified Organic</h5>
          <p>100% Guarantee</p>
      </div>
      <div class="bg-success text-white p-4 m-3 rounded">
          <h5><i class="fa-regular fa-money-bill-1"></i> Huge Savings</h5>
          <p>At lowest price</p>
      </div>
      <div class="bg-success text-white p-4 m-3 rounded">
          <h5><i class="fa-solid fa-recycle"></i> Easy Returns</h5>
          <p>No Questions asked</p>
      </div>
    </section>
    <section class="container-fluid py-5" id="third-section">
      <h1 class="text-center text-white">Best Selling Products</h1>
      <div id="carousel" class="carousel slide p-4 " data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="2000">
            <img src="@/assets/Images/rice.jpg" class="d-block w-75 mx-auto rounded-3" alt="Rice Photo">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="@/assets/Images/cinnamon.jpg" class="d-block w-75 mx-auto rounded-3" alt="Cinnamon Photo">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="@/assets/Images/ginger.jpg" class="d-block w-75 mx-auto rounded-3" alt="Ginger Photo">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
    <section class="container-fluid bg-dark text-white text-center" id="fourth-section">
      <h2>Get 30% off On Your First Purchase</h2>
    </section>
    <h2 class="text-center bg-success py-5">Get First Order Free Delivery! Don't miss the chance</h2>
    <section class="container" id="fifth-section">
      <h2 class="text-center text-dark mb-4">Trending products</h2>
      <div class="row justify-content-center gy-4 text-center">
        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="card shadow">
            <img class="card-img-top" src="@/assets/Images/green_chilli.jpg" alt="Green Chilli Image">
            <div class="card-body">
              <h4 class="card-title">Green Chili</h4>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
              <p class="card-text"><strong>$30</strong></p>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="card shadow">
            <img class="card-img-top" src="@/assets/Images/red_chilli.jpg" alt="Red Chilli Image">
            <div class="card-body">
              <h4 class="card-title">Red Chilli</h4>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
              <p class="card-text"><strong>$20</strong></p>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="card shadow">
            <img class="card-img-top" src="@/assets/Images/onion.jpg" alt="Onion Image">
            <div class="card-body">
              <h4 class="card-title">Onion</h4>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
              <p class="card-text"><Strong>$18</Strong></p>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="card shadow">
            <img class="card-img-top w-100" src="@/assets/Images/oil.jpg" alt="Oil Image">
            <div class="card-body">
              <h4 class="card-title">Oil</h4>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
              <p class="card-text"><Strong>$35</Strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container" id="sixth-section">
      <h2 class="text-center text-dark mb-4">Customer's review</h2>
      <div class="row text-center gy-4">
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <p class="card-text">I have been shopping at this grocery market for over a year, and I am consistently impressed with the quality of their products and the level of service. The produce is always fresh, and they offer a wide variety of organic options, which is important to me. The staff is incredibly friendly and knowledgeable, always willing to help me find what I need or recommend new products. Their meat and seafood section is top-notch, with a great selection of high-quality items. I also appreciate their commitment to local suppliers, which makes me feel good about supporting my community. Overall, this market has everything I need and more, and I highly recommend it.</p>
              <hr>
              <h4 class="card-title">Abrar</h4>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <p class="card-text">This grocery market has become my go-to place for all my shopping needs. The store is always clean and well-organized, making it easy to find what I'm looking for. They have a fantastic selection of specialty and international foods that I can't find anywhere else in the area. The bakery section is a real highlight – their fresh bread and pastries are delicious and reasonably priced. I also love their prepared foods section, which offers a variety of healthy and tasty meals that are perfect for busy weeknights. The customer service is excellent; the cashiers are efficient, and the management is responsive to feedback. Shopping here is always a positive experience, and I highly recommend it to others.</p>
              <hr>
              <h4 class="card-title">Hossain</h4>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body">
              <p class="card-text">I recently moved to the area and was thrilled to find this amazing grocery market. From the moment I walked in, I was struck by the welcoming atmosphere and the wide selection of products. They have everything from everyday essentials to gourmet items, and their prices are very competitive. I particularly appreciate their focus on sustainability, with numerous eco-friendly products and efforts to reduce plastic waste. The in-store events and cooking demonstrations are a nice touch, making shopping here more than just a chore. The loyalty program offers great discounts and rewards, which is a big plus. I can't imagine shopping anywhere else now – this market has exceeded all my expectations.</p>
              <hr>
              <h4 class="card-title">Toha</h4>
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<style scoped>
#first-section{
  margin-top: 6rem;
}

#second-section, #third-section, #fourth-section, #fifth-section, #sixth-section{
  margin-top: 5rem;
}

#second-section div{
  width: 15rem;
  word-wrap: break-word;
}
#third-section{
 
  background: #0F2027;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#third-section img{
  height: 40vw;
}

#fourth-section{
  padding: 4rem 2rem;
}

#fifth-section img{
  height: 15vw;
}

@media screen and (max-width: 575px){
  #second-section div{
    width: 100%;
  }
}

@media screen and (max-width: 992px){
  #first-section{
    text-align: center;
  }
}

@media screen and (max-width: 575px) {
  #fifth-section img{
  height: 40vw;
}
}

</style>