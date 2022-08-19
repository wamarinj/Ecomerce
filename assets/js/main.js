const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    }
  ]


  document.getElementById('cart-count').innerHTML = 
document.addEventListener( "DOMContentLoaded", () =>{
  //load()
  showProducts( items )

})

function getDataFromLocalStorage() {
  let total = 0
  if(localStorage.getItem('cart')){
    const cartItems = JSON.parse(localStorage.getItem('cart'))
    total = cartItems.reduce((acc, current) => acc + current.quantity, 0)
  }
  document.getElementById('cart-count').innerHTML = total
}

getDataFromLocalStorage()


function addProduct( productId ){
  if(localStorage.getItem('cart')){
    const cartItems = JSON.parse(localStorage.getItem('cart'))
    const cartProduct = cartItems.find(item => item.id === productId)
    if(!cartProduct){
      const cartObj = [{id: productId, quantity: 1 }]
      const newCart = [...cartItems , ...cartObj]
      localStorage.setItem('cart', JSON.stringify(newCart))
    }else {
      const productIndex = (product) => product.id === productId;
      cartProduct.quantity = cartProduct.quantity + 1
      cartItems[productIndex] = cartProduct
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }else{
      const cartObj = [{id: productId, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(cartObj))
  }
  getDataFromLocalStorage()

}

const productContainer = document.querySelector( "#products-lists" )

  function showProducts( products ){
    let fragment = ``

    products.map(  product =>{
      fragment += `
      <div class="product-card" id="${product.id}">
          <img src=${product.image} class="image-product" alt="">
          <button class="btn-add" onclick="addProduct(${product.id})">ADD</button>
        </div>
        `
    } )

    productContainer.innerHTML = fragment

  }