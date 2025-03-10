const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint for handling form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

    // For now, log the data to the console
    console.log(`Form submitted:
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message: ${message}`);

    // Respond with success
    res.status(200).json({ message: 'Form submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    let nav = document.querySelector(".nav-links");
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        nav.classList.add("hidden");
    } else {
        nav.classList.remove("hidden");
    }
    lastScrollTop = currentScroll;
});

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollintoView({ behavior: 'smooth' });
    }
}

const form = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventlistener('submit', async (event) => {
event.preventDefault();

// Collect form data
const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
};

// Send form data to the backend
try {
    const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();
    responseMessage.textContent = data.message;

    // Clear the form
    form.reset();
} catch (error) {
    responseMessage.textContent = 'Error submitting the form. Please try again later.';
    console.error(error);
}
});

// Category Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventlistener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classlist.remove('active'));
        button.classlist.add('active');

        const category = button.getAttribute('data-category');
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal View
const modal = document.getElementById('projectModal');
const modalimage = document.getElementById('modalimage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
    card.addEventlistener('click', () => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;

        modalimage.src = img;
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modal.style.display = 'flex';
    });
});

closeModal.addEventlistener('click', () => {
    modal.style.display = 'none';
});

modal.addEventlistener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


document.addEventlistener('DOMContentLoaded', function () {
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventlistener('click', () => {
    hamburger.classlist.toggle('active');
    nav.classlist.toggle('active');
});
});