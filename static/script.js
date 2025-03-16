document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!");

    // Validate emergency contact number (must be 10 digits)
    const emergencyContactInput = document.getElementById("emergency_contact");
    if (emergencyContactInput) {
        emergencyContactInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 10);
        });
    }

    // Validate alternate contact number (must be 10 digits)
    const alternateContactInput = document.getElementById("alternate_contact");
    if (alternateContactInput) {
        alternateContactInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 10);
        });
    }

    // Toggle allergies input field based on dropdown selection
    const allergiesDropdown = document.getElementById("allergies_select");
    const allergiesInput = document.getElementById("allergies_input");
    if (allergiesDropdown && allergiesInput) {
        function toggleAllergyInput() {
            allergiesInput.style.display = allergiesDropdown.value === "Yes" ? "block" : "none";
            if (allergiesDropdown.value !== "Yes") allergiesInput.value = "";
        }
        allergiesDropdown.addEventListener("change", toggleAllergyInput);
        toggleAllergyInput(); // Initialize on page load
    }

    // Toggle differently-abled input field based on dropdown selection
    const disabledDropdown = document.getElementById("disabled_select");
    const disabledInput = document.getElementById("disabled_input");
    if (disabledDropdown && disabledInput) {
        function toggleDisabledInput() {
            disabledInput.style.display = disabledDropdown.value === "Yes" ? "block" : "none";
            if (disabledDropdown.value !== "Yes") disabledInput.value = "";
        }
        disabledDropdown.addEventListener("change", toggleDisabledInput);
        toggleDisabledInput(); // Initialize on page load
    }

    // Prevent form submission if required fields are empty
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            if (allergiesDropdown.value === "Yes" && !allergiesInput.value.trim()) {
                showTemporaryMessage("Please specify allergy type.", "error");
                event.preventDefault();
            }
            if (disabledDropdown.value === "Yes" && !disabledInput.value.trim()) {
                showTemporaryMessage("Please specify disability type.", "error");
                event.preventDefault();
            }
        });
    }

    // Copy UID to clipboard when clicked
    document.querySelectorAll(".uid").forEach(uid => {
        uid.addEventListener("click", function () {
            if (this.textContent.trim()) {
                navigator.clipboard.writeText(this.textContent)
                    .then(() => showTemporaryMessage("UID copied to clipboard!", "success"))
                    .catch(() => showTemporaryMessage("Failed to copy UID!", "error"));
            } else {
                showTemporaryMessage("No UID to copy!", "error");
            }
        });
    });

    // Aztec Code Generator
    const generateAztecBtn = document.getElementById("generate_aztec");
    if (generateAztecBtn) {
        generateAztecBtn.addEventListener("click", function () {
            const uid = document.getElementById("uid")?.textContent;
            if (uid) {
                fetch(`/generate_aztec?uid=${uid}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const aztecImg = document.getElementById("aztec_code");
                            aztecImg.src = data.image_url;
                            aztecImg.onerror = function () {
                                showTemporaryMessage("Error loading Aztec Code. Please try again.", "error");
                            };
                        } else {
                            showTemporaryMessage("Failed to generate Aztec Code!", "error");
                        }
                    });
            } else {
                showTemporaryMessage("UID not found. Cannot generate Aztec Code.", "error");
            }
        });
    }

    // Show temporary messages
    function showTemporaryMessage(message, type) {
        const msgBox = document.createElement("div");
        msgBox.textContent = message;
        msgBox.className = `message-box ${type}`;
        document.body.appendChild(msgBox);
        setTimeout(() => msgBox.remove(), 3000);
    }

    // Apply hidden fields logic in `view_details.html`
    const detailsContainer = document.querySelector(".detail-box");
    if (detailsContainer) {
        document.querySelectorAll(".hidden-field").forEach(field => {
            if (!field.textContent.trim()) {
                field.closest("p").style.display = "none";
            }
        });
    }
});