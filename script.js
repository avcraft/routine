document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const routineCards = document.querySelectorAll('.routine-card');
    const scheduleContainer = document.getElementById('routines-schedule'); // Get the main container
    const header = document.querySelector('.header-container'); // Get the header

    const showRoutine = (day) => {
        // Find the currently active card and hide it with a transition
        const currentActiveCard = document.querySelector('.routine-card.is-visible');
        if (currentActiveCard) {
            currentActiveCard.classList.remove('is-visible');
            setTimeout(() => {
                currentActiveCard.style.display = 'none';
            }, 600); // Corresponds to CSS transition duration
        }

        // Deactivate all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show the new card after a slight delay
        setTimeout(() => {
            const selectedRoutine = document.getElementById(`${day}-routine`);
            if (selectedRoutine) {
                selectedRoutine.style.display = 'block';
                // Use a short delay to trigger the animation
                setTimeout(() => {
                    selectedRoutine.classList.add('is-visible');

                    // Calculate the target scroll position to keep the header in view
                    const headerHeight = header.offsetHeight;
                    const routinesTop = scheduleContainer.getBoundingClientRect().top;
                    const scrollY = window.scrollY;
                    const targetPosition = scrollY + routinesTop - headerHeight;

                    // Smoothly scroll the page to the new position
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 50); 
            }
        }, currentActiveCard ? 600 : 0);

        // Activate the new nav link
        const selectedLink = document.querySelector(`.main-nav a[data-day="${day}"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        }
    };

    // Add click event listeners to the navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const day = link.dataset.day;
            if (day) {
                showRoutine(day);
            }
        });
    });

    // Determine the current day and show the corresponding routine on page load
    const today = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[today];
    showRoutine(currentDay);
});