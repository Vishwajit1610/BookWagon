document.addEventListener("DOMContentLoaded", () => {
  // --- "Add to Cart" Functionality ---
  // A simple counter for demonstration. In a real application, this would be managed more robustly.
  let cartItemCount = 0;
  const cartCountElement = document.getElementById("cart-count");

  // This function is attached to the window object to be accessible from inline 'onclick' attributes in the HTML.
  window.addToCart = function (bookTitle) {
    cartItemCount++;
    if (cartCountElement) {
      cartCountElement.innerText = cartItemCount;
    }
    showToast(`${bookTitle} was added to your cart!`);
  };

  // --- Utility Function for Toast Notifications ---
  function showToast(message, type = "success") {
    const toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      console.error("Toast container not found.");
      return;
    }

    const toastId = "toast-" + Date.now();
    const icon =
      type === "success"
        ? '<i class="fas fa-check-circle text-success me-2"></i>'
        : '<i class="fas fa-exclamation-circle text-danger me-2"></i>';
    const title = type === "success" ? "Success" : "Error";

    const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    ${icon}
                    <strong class="me-auto">${title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>`;

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    toastElement.addEventListener("hidden.bs.toast", () =>
      toastElement.remove()
    );
  }
});
