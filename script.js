 let currentIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        function showSlide(index) {
            if (index >= slides.length) currentIndex = 0;
            if (index < 0) currentIndex = slides.length - 1;
            
            const slider = document.querySelector('.slider');
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function changeSlide(direction) {
            currentIndex += direction;
            showSlide(currentIndex);
        }

        function currentSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }

        // Auto-advance slides
        setInterval(() => {
            currentIndex++;
            showSlide(currentIndex);
        }, 5000);

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    e.target.reset();
                } else {
                    alert('Error sending message: ' + data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error connecting to server. Please try again later.');
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });