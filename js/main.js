// main.js - Minimal Add to Cart functionality (BookWagon)

// Simple cart object (stored in memory for now)
let cart = {};

// Function to add a book to the cart
function addToCart(bookId, bookTitle, bookPrice) {
  if (!cart[bookId]) {
    cart[bookId] = { title: bookTitle, price: bookPrice, qty: 1 };
  } else {
    cart[bookId].qty += 1;
  }

  updateCartCount();
  alert(bookTitle + " has been added to your cart!");
}

// Function to update the cart count badge
function updateCartCount() {
  let totalItems = 0;
  for (let id in cart) {
    totalItems += cart[id].qty;
  }
  document.getElementById("cart-count").innerText = totalItems;
}

document.getElementById("btn-view-cart").addEventListener("click", function () {
  showCart();
  let myModal = new bootstrap.Modal(document.getElementById("cartModal"));
  myModal.show();
});

// Function to display cart items (basic version)
function showCart() {
  let cartItemsDiv = document.getElementById("cart-items-container");
  cartItemsDiv.innerHTML = "";

  if (Object.keys(cart).length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let list = "<ul class='list-group'>";
  let total = 0;

  for (let id in cart) {
    let item = cart[id];
    let subtotal = item.qty * item.price;
    total += subtotal;
    list += `<li class='list-group-item d-flex justify-content-between align-items-center'>
                    ${item.title} (x${item.qty})
                    <span>₹${subtotal}</span>
                 </li>`;
  }

  list += "</ul>";
  list += `<p class="mt-3"><strong>Total: ₹${total}</strong></p>`;
  cartItemsDiv.innerHTML = list;
}
