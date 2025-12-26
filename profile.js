document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profile-form");
  const phoneInput = document.getElementById("phone");
  const profileData = document.getElementById("profile-data");
  const profileIdDisplay = document.getElementById("profile-id-display");
  const phoneDisplay = document.getElementById("phone-display");
  const logoutButton = document.getElementById("logout-button");
  const saveProfileButton = document.getElementById("save-profile-button");

  const nameInput = document.getElementById("profile-name-input");
  const emailInput = document.getElementById("profile-email-input");
  const addressInput = document.getElementById("profile-address-input");
  
  const registrationDateDisplay = document.getElementById("registration-date-display");
  const totalDetectionsDisplay = document.getElementById("total-detections-display");
  const totalWeightDisplay = document.getElementById("total-weight-display");
  const totalEarningsDisplay = document.getElementById("total-earnings-display");


  // Function to show profile data and hide login form
  function showProfile(user) {
    localStorage.setItem('user', JSON.stringify(user));
    profileIdDisplay.textContent = user.profileId;
    nameInput.value = user.name;
    emailInput.value = user.email || '';
    addressInput.value = user.address || '';
    phoneDisplay.textContent = user.phoneNumber;
    registrationDateDisplay.textContent = new Date(user.createdAt).toLocaleDateString();

    totalDetectionsDisplay.textContent = user.stats.detections || 0;
    totalWeightDisplay.textContent = (user.stats.totalWeight || 0).toFixed(2) + " kg";
    totalEarningsDisplay.textContent = "₹" + (user.stats.totalEarnings || 0).toFixed(2);

    profileForm.style.display = "none";
    profileData.style.display = "block";
  }

  // Function to show login form and hide profile data
  function showLoginForm() {
    profileForm.style.display = "block";
    profileData.style.display = "none";
  }

  // Check for active session on page load
  fetch("/api/profile")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Not authenticated");
    })
    .then((data) => {
      if (data.status === "success") {
        showProfile(data.user);
      } else {
        showLoginForm();
      }
    })
    .catch(() => {
      showLoginForm();
    });

  // Handle profile/login form submission
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phoneNumber = phoneInput.value;

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      return;
    }
    if (!name) {
      return;
    }

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phoneNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          showProfile(data.user);
        } else {
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  });

  // Handle profile save
  saveProfileButton.addEventListener("click", () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const address = addressInput.value;

    fetch("/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, address }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Profile updated successfully!");
          localStorage.setItem('user', JSON.stringify(data.user));
          showProfile(data.user);
        } else {
          alert("Error updating profile: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Profile update error:", err);
        alert("An error occurred while updating your profile.");
      });
  });

  // Handle logout
  logoutButton.addEventListener("click", () => {
    fetch("/api/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.removeItem('user');
          showLoginForm();
        } else {
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  });
});