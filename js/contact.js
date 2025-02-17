document.addEventListener('DOMContentLoaded', function() {
    function validateForm(event) {
        event.preventDefault(); // Prevent the form from submitting

        let errorMessages = []; // To store error messages
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        // Validate Name (non-empty)
        if (!name) {
            errorMessages.push("Name is required.");
        }

        // Validate Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailRegex.test(email)) {
            errorMessages.push("Please enter a valid email.");
        }

        // Validate Subject (non-empty)
        if (!subject) {
            errorMessages.push("Subject is required.");
        }

        // Validate Message (non-empty)
        if (!message) {
            errorMessages.push("Message is required.");
        }

        // If there are error messages, show them and stop form submission
        if (errorMessages.length > 0) {
            document.getElementById('errorMessages').innerHTML = errorMessages.join('<br>');
            return false;
        }

        // Save the form data in localStorage
        localStorage.setItem('contactName', name);
        localStorage.setItem('contactEmail', email);
        localStorage.setItem('contactSubject', subject);
        localStorage.setItem('contactMessage', message);

        // Reset the form and clear error messages
        document.getElementById('contactForm').reset();

        // Show success toast notification using Toastify
        Toastify({
            text: "Your message has been sent successfully!",
            gravity: "top",          // Position it at the top
            position: "center",      // Center the notification
            backgroundColor: "#28a745",  // Success green color
            duration: 3000           // Show for 3 seconds
        }).showToast();

        // Log form data to the console (or process it further)
        console.log({
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        return true;
    }

    // Attach the form submission event listener after DOM is ready
    document.getElementById('contactForm').addEventListener('submit', validateForm);

    // Clear LocalStorage after the page is Loaded
    window.addEventListener('load', function() {
        localStorage.removeItem('contactName');
        localStorage.removeItem('contactEmail');
        localStorage.removeItem('contactSubject');
        localStorage.removeItem('contactMessage');
    });
});