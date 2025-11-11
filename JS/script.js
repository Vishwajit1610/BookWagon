document.addEventListener("DOMContentLoaded", () => {
  // --- "Add to Cart" Functionality ---
  let cartItemCount = 0;
  const cartCountElement = document.getElementById("cart-count");

  window.addToCart = function (bookTitle) {
    cartItemCount++;
    if (cartCountElement) {
      cartCountElement.innerText = cartItemCount;
    }
    showToast(`${bookTitle} was added to your cart!`);
  };

  // ---------- Utility Function for Toast Notifications ----------
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

  // ---------- FORM VALIDATION  ----------
  function enableFormValidation() {
    // target forms you need validated: contactForm and bookForm
    const forms = document.querySelectorAll("#contactForm, #bookForm");

    forms.forEach((form) => {
      if (!form) return;

      form.addEventListener(
        "submit",
        function (e) {
          // Use HTML5 constraint validation API
          if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add("was-validated");

            // find first invalid control to focus it (nice UX)
            const firstInvalid = form.querySelector(":invalid");
            if (firstInvalid) firstInvalid.focus();

            // show toast to explain
            showToast(
              "Please correct the errors in the form before submitting.",
              "error"
            );
          } else {
            // Form valid
            e.preventDefault(); // prevent navigation in demo
            e.stopPropagation();
            form.classList.add("was-validated");

            // For demo: show success toast and optionally reset
            showToast("Form submitted successfully.");

            // If you want to actually clear the form after success, uncomment:
            form.reset();
            form.classList.remove("was-validated");
          }
        },
        false
      );
    });
  }

  enableFormValidation();

  // ---------- LOGIN HANDLER (moved into this global script) ----------
  (function enableLogin() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const clientRadio = document.getElementById("clientRadio");
    const adminRadio = document.getElementById("adminRadio");

    // Preselect role if ?role=admin in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("role") === "admin" && adminRadio) {
      adminRadio.checked = true;
    }

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const roleEl = document.querySelector('input[name="userType"]:checked');
      const role = roleEl ? roleEl.value : "client";
      const username = usernameInput ? usernameInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value.trim() : "";

      // Demo credentials
      const creds = {
        client: { username: "client", password: "client123" },
        admin: { username: "admin", password: "admin123" },
      };

      if (
        creds[role] &&
        username === creds[role].username &&
        password === creds[role].password
      ) {
        // success
        if (role === "client") {
          window.location.href = "./Client Pages/homepage.html";
        } else {
          window.location.href = "./Admin Pages/admin_dashboard.html";
        }
      } else {
        // invalid - visual feedback + toast
        const card = document.querySelector(".login-card");
        if (card) {
          card.classList.add("border-danger");
          setTimeout(() => card.classList.remove("border-danger"), 1500);
        }
        showToast(`Incorrect username or password for ${role}.`, "error");
      }
    });
  })();
});
