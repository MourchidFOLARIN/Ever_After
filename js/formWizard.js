document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    const steps = Array.from(form.querySelectorAll('.wizard-step'));
    const indicators = Array.from(document.querySelectorAll('.wizard-step-indicator'));
    const nextBtn = form.querySelector('.btn-next');
    const backBtn = form.querySelector('.btn-back');
    const submitBtn = form.querySelector('.btn-submit');
    let currentStepIndex = 0;

    function showStep(index) {
        steps.forEach((step, idx) => {
            if (idx === index) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update indicators
        indicators.forEach((indicator, idx) => {
            if (idx < index) {
                indicator.className = 'wizard-step-indicator completed';
            } else if (idx === index) {
                indicator.className = 'wizard-step-indicator active';
            } else {
                indicator.className = 'wizard-step-indicator';
            }
        });

        // Update buttons visibility
        if (index === 0) {
            backBtn.classList.remove('visible');
        } else {
            backBtn.classList.add('visible');
        }

        if (index === steps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }

        currentStepIndex = index;
    }

    function validateStep(index) {
        const stepContainer = steps[index];
        const inputs = Array.from(stepContainer.querySelectorAll('input[required], select[required], textarea[required]'));
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                // Optional: focus or shake input
            } else {
                input.classList.remove('error');
            }

            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        });

        return isValid;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateStep(currentStepIndex)) {
                if (currentStepIndex < steps.length - 1) {
                    showStep(currentStepIndex + 1);
                }
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStepIndex > 0) {
                showStep(currentStepIndex - 1);
            }
        });
    }

    form.addEventListener('submit', (e) => {
        if (!validateStep(currentStepIndex)) {
            e.preventDefault();
            return;
        }

        // Run flower fall / confetti if confetti is loaded
        if (window.confetti) {
            window.confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });
        }

        // The onsubmit attribute was removed from contact.html.
        // This event listener now handles the confirmation alert.
        setTimeout(() => {
            const lang = document.documentElement.getAttribute('lang') || 'fr';
            const message = lang === 'en'
                ? 'Your VIP inquiry has been registered. Ever After Events thanks you.'
                : 'Votre demande VIP a été enregistrée. Ever After Events vous remercie.';
            alert(message);
        }, 100); // Small delay to let confetti animation start

    });

    // Initialize first step
    showStep(0);
});
