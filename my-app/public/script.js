async function fetchListings() {
    try {
        console.log('Fetching listings from the server...');
        const response = await fetch('/api/listings'); 

        if (!response.ok) {
            console.error('Fetch failed:', response.status, response.statusText);
            return [];
        }

        const listings = await response.json();
        console.log('Listings fetched successfully:', listings);
        return listings;
    } catch (error) {
        console.error('Error fetching listings:', error);
        return [];
    }
}


document.addEventListener('DOMContentLoaded', function () {
    
    async function initializeListings() {
        console.log('🔄 Running initializeListings() on:', window.location.pathname);
        const listings = await fetchListings(); 

        if (listings.length === 0) {
            console.warn('No listings found.');
        }

        if (window.location.pathname.includes('browse')) {
            console.log('Populating browse listings...');
            populateListings('browseListings', listings);
        } else if (window.location.pathname.includes('index')) {
            console.log('Populating recent listings...');
            populateListings('recentListings', listings);
        }
    }

    
    initializeListings();

    const productDetails = {
        1: {
            title: "Calculus Early Transcendentals",
            price: 950,
            condition: "Like new",
            description: "8th edition, like new condition. Perfect for Calculus classes. Only used for one term. No highlights or marks inside. Comes with practice problems booklet.",
            details: {
                author: "James Stewart",
                edition: "8th Edition",
                year: "2023",
                isbn: "836-1823648507",
                location: "Quezon City"
            },
            seller: {
                name: "Maria Santos",
                program: "BS Mathematics",
                memberSince: "January 2025",
                sellerImage: "images/seller1.jpg"
            },
            images: [
                "images/textbook.jpg",
                "images/textbook2.jpg",
            ]
        },
        2: {
            title: "DLSU Windbreaker",
            price: 1000,
            condition: "Lightly used",
            description: "DLSU Official Windbreaker in size M. Only worn once. Perfect condition with no stains or damage. Original price was ₱1,500.",
            details: {
                size: "Medium",
                color: "Green and White",
                material: "Nylon and Cotton",
                brand: "DLSU Official Merchandise",
                location: "Taft Area"
            },
            seller: {
                name: "John Lim",
                program: "BS Marketing Management",
                memberSince: "December 2024",
                sellerImage: "images/seller2.jpg"
            },
            images: [
                "images/uniform.jpg",
                "images/uniform2.jpg"
            ]
        },
        3: {
            title: "Casio fx-991ES Plus",
            price: 1000,
            condition: "Excellent",
            description: "Scientific calculator, perfect working condition. All buttons work perfectly. Includes original case and manual.",
            details: {
                brand: "Casio",
                model: "fx-991ES Plus",
                features: "Natural Textbook Display",
                warranty: "Calculator tested and verified",
                location: "Pasay City"
            },
            seller: {
                name: "Ana Reyes",
                program: "BS Civil Engineering",
                memberSince: "February 2025",
                sellerImage: "images/seller3.jpg"
            },
            images: [
                "images/calculator.jpg"
            ]
        },
        4: {
            title: "Engineering Drawing Set",
            price: 600,
            condition: "Like new",
            description: "Complete engineering drawing set used only for one term. Includes compass, divider, protractor, and various rulers. All items are clean and well-maintained.",
            details: {
                brand: "Staedtler",
                components: "Full 8-piece set",
                usage: "Used for 1 term only",
                storage: "Includes original case",
                location: "Manila"
            },
            seller: {
                name: "Mike Tan",
                program: "BS Mechanical Engineering",
                memberSince: "January 2025",
                sellerImage: "images/seller4.jpg"
            },
            images: [
                "images/drawing-set.jpg"
            ]
        },
        5: {
            title: "Business Statistics Textbook",
            price: 950,
            condition: "Good",
            description: "2023 Edition Business Statistics textbook. Has some highlighting in key chapters but otherwise in great condition.",
            details: {
                author: "Anderson, Sweeney, Williams",
                edition: "14th Edition",
                year: "2023",
                isbn: "732-2167482612",
                location: "BGC"
            },
            seller: {
                name: "Sarah Garcia",
                program: "BS Business Management",
                memberSince: "December 2024",
                sellerImage: "images/seller5.jpg"
            },
            images: [
                "images/business-book.jpg"
            ]
        }
    };

    function setupHeaderEventListeners() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        const signInBtn = document.getElementById('signInBtn');
        const profileIcon = document.getElementById('profileIcon');

        mobileMenu?.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        signInBtn?.addEventListener('click', showModal);

        profileIcon?.addEventListener('click', function () {
            window.location.href = 'profile.html';
        });
    }

    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            setupHeaderEventListeners();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    function createListingCard(listing) {
        const listingElement = document.createElement('div');
        listingElement.className = 'listing-card';
        listingElement.innerHTML = `
            <img src="${listing.image}" alt="${listing.title}" class="listing-image" 
                onerror="this.src='/api/placeholder/400/300'">
            <div class="listing-details">
                <h3>${listing.title}</h3>
                <p>${listing.description}</p>
                <p class="listing-price">₱${listing.price.toLocaleString()}</p>
                <div class="listing-meta">
                    <span class="seller">${listing.seller}</span>
                    <span class="date">${formatDate(listing.date)}</span>
                </div>
                <button class="btn-primary view-details" data-id="${listing.id}">View Details</button>
            </div>
        `;
        return listingElement;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function populateListings(containerId, listings) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = ''; 
        listings.forEach((listing, index) => {
            setTimeout(() => {
                const card = createListingCard(listing);
                card.style.opacity = '0';
                container.appendChild(card);

                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease-in';
                    card.style.opacity = '1';
                }, 50);
            }, index * 100);
        });
    }

    if (window.location.pathname.includes('browse')) {
        populateListings('browseListings', sampleListings);
    } else if (window.location.pathname.includes('index')) {
        populateListings('recentListings', sampleListings);
    }

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const category = this.dataset.category;
            const filteredListings = sampleListings.filter(listing => listing.category === category);
            populateListings('recentListings', filteredListings); 
            console.log(`Filtering by category: ${category}`);
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    const modal = document.getElementById('loginModal');
    const signInBtn = document.getElementById('signInBtn');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');

    function showModal() {
        if (!modal) return;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    signInBtn?.addEventListener('click', showModal);
    closeModal?.addEventListener('click', hideModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email.endsWith('@dlsu.edu.ph')) {
            showError('Please use your DLSU email address');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({dlsuEmail: email, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert('✅ Login successful!');

                // Store session in localStorage
                localStorage.setItem('user', JSON.stringify(result.user));

                // Redirect to homepage
                window.location.href = 'index.html';
            } else {
                showError(result.message || '❌ Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            showError('❌ Something went wrong. Please try again.');
        }
    });

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        const existingError = loginForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        loginForm.insertBefore(errorDiv, loginForm.firstChild);
    }

    function simulateLogin() {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;

        setTimeout(() => {
            hideModal();
            window.location.href = 'index.html';
        }, 1500);
    }

    if (window.location.pathname.includes('register')) {
        const registerForm = document.getElementById('registerForm');
    
        registerForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            const fullName = document.getElementById('fullName').value;
            const dlsuEmail = document.getElementById('dlsuEmail').value;
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('password').value;
    
            // Validate DLSU Email
            if (!dlsuEmail.endsWith('@dlsu.edu.ph')) {
                alert('Please use your DLSU email address.');
                return;
            }
    
            try {
                // Send form data to the server
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ fullName, dlsuEmail, studentId, password }),
                });
    
                if (response.ok) {
                    alert('✅ Registration successful!');
                    window.location.href = 'index.html';
                } else {
                    alert('❌ Registration failed. Please try again.');
                }
            } catch (error) {
                console.error("❌ Error submitting form:", error);
                alert('❌ Something went wrong. Please try again.');
            }
        });
    }
    

    const profileIcon = document.getElementById('profileIcon');

    profileIcon?.addEventListener('click', function() {
        window.location.href = 'profile.html';
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-details')) {
            const productId = e.target.dataset.id;
            sessionStorage.setItem('selectedProductId', productId);
            window.location.href = 'product-details.html';
        }
    });
    
    if (window.location.pathname.includes('product-details')) {
        const productId = sessionStorage.getItem('selectedProductId') || '1';
        const product = productDetails[productId];
    
        document.title = `${product.title} - Archers Market`;
        document.querySelector('.product-info h1').textContent = product.title;
        document.querySelector('.price').textContent = `₱${product.price.toLocaleString()}`;
        document.querySelector('.condition').textContent = `Condition: ${product.condition}`;
        document.querySelector('.product-description p').textContent = product.description;
    
        const detailsList = document.querySelector('.product-details-list');
        detailsList.innerHTML = '';
        for (const [key, value] of Object.entries(product.details)) {
            const li = document.createElement('li');
            li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
            detailsList.appendChild(li);
        }
    
        const sellerName = document.querySelector('.seller-details h3');
        const sellerDetails = document.querySelector('.seller-details p');
        const sellerImage = document.querySelector('.seller-image');
        sellerName.textContent = product.seller.name;
        sellerDetails.innerHTML = `${product.seller.program}<br>Member since ${product.seller.memberSince}`;
        sellerImage.src = product.seller.sellerImage; 
        sellerImage.alt = `Profile of ${product.seller.name}`;
    
        const mainImage = document.getElementById('mainProductImage');
        const thumbnailsContainer = document.querySelector('.image-thumbnails');
        
        if (product.images && product.images.length > 0) {
            mainImage.src = product.images[0];
            mainImage.alt = product.title;
    
            thumbnailsContainer.innerHTML = '';
    
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image;
                thumbnail.alt = `Thumbnail ${index + 1}`;
                thumbnail.classList.add('thumbnail');
                if (index === 0) thumbnail.classList.add('active'); 
                thumbnailsContainer.appendChild(thumbnail);
            });
    
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    mainImage.src = this.src;
                });
            });
        }
    
        const messageSellerBtn = document.getElementById('messageSellerBtn');
        const saveItemBtn = document.getElementById('saveItemBtn');
    
        messageSellerBtn?.addEventListener('click', () => {
            alert(`This would show a link to ${product.seller.name}'s number or social media`);
        });
    
        saveItemBtn?.addEventListener('click', function() {
            this.textContent = this.textContent === 'Save Item' ? 'Saved!' : 'Save Item';
        });
    }
});

