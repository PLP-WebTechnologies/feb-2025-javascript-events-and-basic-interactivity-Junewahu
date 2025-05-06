document.addEventListener('DOMContentLoaded', () => {
    // Event Handling
    const clickButton = document.getElementById('clickButton');
    clickButton.addEventListener('click', () => {
        alert('Button clicked!');
    });

    const hoverElement = document.getElementById('hoverElement');
    hoverElement.addEventListener('mouseover', () => {
        hoverElement.style.backgroundColor = '#dee2e6';
    });
    hoverElement.addEventListener('mouseout', () => {
        hoverElement.style.backgroundColor = '#e9ecef';
    });

    const keypressInput = document.getElementById('keypressInput');
    keypressInput.addEventListener('keypress', (event) => {
        console.log('Key pressed:', event.key);
    });

    const secretAction = document.getElementById('secretAction');
    let pressTimer;
    
    secretAction.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            alert('Long press detected!');
        }, 1000);
    });
    
    secretAction.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });
    
    secretAction.addEventListener('dblclick', () => {
        alert('Double click detected!');
    });

    // Interactive Elements
    const colorChangeButton = document.getElementById('colorChangeButton');
    colorChangeButton.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colorChangeButton.style.backgroundColor = randomColor;
    });

    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-images img');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');
    let currentImageIndex = 0;
    let slideshowInterval = null;
    const slideshowDelay = 3000; // 3 seconds between slides

    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    }

    function startSlideshow() {
        if (!slideshowInterval) {
            slideshowInterval = setInterval(nextImage, slideshowDelay);
            slideshowButton.textContent = 'Stop Slideshow';
            slideshowButton.classList.add('active');
        }
    }

    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
            slideshowButton.textContent = 'Start Slideshow';
            slideshowButton.classList.remove('active');
        }
    }

    // Add slideshow button to the gallery
    const slideshowButton = document.createElement('button');
    slideshowButton.textContent = 'Start Slideshow';
    slideshowButton.classList.add('slideshow-btn');
    document.querySelector('.gallery-container').appendChild(slideshowButton);

    slideshowButton.addEventListener('click', () => {
        if (slideshowInterval) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });

    // Show first image initially
    showImage(currentImageIndex);

    // Manual navigation
    prevButton.addEventListener('click', () => {
        stopSlideshow();
        prevImage();
    });

    nextButton.addEventListener('click', () => {
        stopSlideshow();
        nextImage();
    });

    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form Validation
    const validationForm = document.getElementById('validationForm');
    const requiredField = document.getElementById('requiredField');
    const emailField = document.getElementById('emailField');
    const passwordField = document.getElementById('passwordField');

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        input.classList.add('error');
        input.classList.remove('valid');
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        input.classList.remove('error');
        input.classList.add('valid');
        errorMessage.classList.remove('show');
    }

    // Real-time validation
    requiredField.addEventListener('input', () => {
        if (!requiredField.value.trim()) {
            showError(requiredField, 'This field is required');
        } else {
            showSuccess(requiredField);
        }
    });

    emailField.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
        } else {
            showSuccess(emailField);
        }
    });

    passwordField.addEventListener('input', () => {
        if (passwordField.value.length < 8) {
            showError(passwordField, 'Password must be at least 8 characters long');
        } else {
            showSuccess(passwordField);
        }
    });

    validationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        // Validate required field
        if (!requiredField.value.trim()) {
            showError(requiredField, 'This field is required');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (passwordField.value.length < 8) {
            showError(passwordField, 'Password must be at least 8 characters long');
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully!');
            validationForm.reset();
            [requiredField, emailField, passwordField].forEach(input => {
                input.classList.remove('valid', 'error');
                input.parentElement.querySelector('.error-message').classList.remove('show');
            });
        }
    });
}); 