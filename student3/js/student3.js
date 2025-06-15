/*  Name: Tri Waluyono
    Class: 1 ITF WT
    R-number: r1012723  */

document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://fullstack-2025-backend.ashyisland-75fa9c90.westeurope.azurecontainerapps.io';

    async function loadTeamMembers() {
        try {
            const response = await fetch(`${API_BASE_URL}/team`);

            // Instead of throwing, just return if response isn't OK
            if (!response.ok) {
                console.error('Failed to fetch team members:', response.status);
                return; // Exit the function
            }

            const teamMembers = await response.json();
            const teamContainer = document.querySelector('#team .row.justify-content-center.text-center.g-4');
            const teamMemberCards = "";
            teamMembers.forEach(member => {
                teamMemberCards += `
                    <div class="col-lg-3 col-md-6">
                        <div class="card team-member-card border-0 position-relative">
                            <img src="../common/img/${member.name.toLowerCase().split(' ')[0]}.jpg" 
                                 class="card-img-top rounded-circle w-75 mx-auto mt-3" 
                                 alt="${member.name}">
                            <div class="card-body">
                                <h5 class="card-title fw-semibold mb-1">${member.name}</h5>
                                <p class="card-text text-muted">${member.role}</p>
                            </div>
                            <div class="team-member-info">
                                <h6 class="text-white fw-bold">${member.name}</h6>
                                <p class="small text-white-50">"${member.bio}"</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            teamContainer.innerHTML = teamMemberCard;
        } catch (error) {
            console.error('Network error loading team members:', error);

        }
    }

    async function loadTestimonials() {
        try {
            const response = await fetch(`${API_BASE_URL}/testimonials`);

            if (!response.ok) {
                console.error('Failed to fetch testimonials:', response.status);
                return;
            }

            const testimonials = await response.json();
            const carouselInner = document.querySelector('#testimonials .carousel-inner');
            const testimonialItems = "";

            testimonials.forEach((testimonial, index) => {
                testimonialItems += `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <div class="bg-light rounded p-4">
                            <p>${testimonial.content}</p>
                            <p class="mt-20 mb-0 fw-bold">${testimonial.client_name}</p>
                            <p>${testimonial.company_name}</p>
                        </div>
                    </div>
                `;
            });
            carouselInner.innerHTML = testimonialItems;

            // Update indicators if needed
            const indicatorsContainer = document.querySelector('#testimonials .carousel-indicators');
            if (indicatorsContainer) {
                indicatorsContainer.innerHTML = testimonials.map((_, index) => `
                    <button type="button" data-bs-target="#carouselControls" 
                            data-bs-slide-to="${index}" 
                            ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                            aria-label="Slide ${index + 1}"></button>
                `).join('');
            }
        } catch (error) {
            console.error('Network error loading testimonials:', error);
        }
    }

    loadTeamMembers();
    loadTestimonials();
});

