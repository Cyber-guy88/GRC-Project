document.addEventListener('DOMContentLoaded', function() {
    // Setup profile editing functionality
    setupProfileEditing();
    
    function setupProfileEditing() {
        // Get DOM elements
        const viewMode = document.getElementById('viewMode');
        const editMode = document.getElementById('editMode');
        const editProfileBtn = document.getElementById('editProfileBtn');
        const cancelEditBtn = document.getElementById('cancelEditBtn');
        const editProfileForm = document.getElementById('editProfileForm');
        const successMessage = document.getElementById('successMessage');
        
        // Edit form elements
        const editFullName = document.getElementById('editFullName');
        const editEmail = document.getElementById('editEmail');
        const editPhone = document.getElementById('editPhone');
        const editCompany = document.getElementById('editCompany');
        const editJobTitle = document.getElementById('editJobTitle');
        
        // Add event listeners if elements exist
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', showEditMode);
        }
        
        if (cancelEditBtn) {
            cancelEditBtn.addEventListener('click', cancelEdit);
        }
        
        if (editProfileForm) {
            editProfileForm.addEventListener('submit', saveProfileChanges);
        }
        
        // Pre-load user data
        const userData = getUserData();
        if (userData) {
            updateProfileDisplay(userData);
        }
        
        function showEditMode() {
            viewMode.style.display = 'none';
            editMode.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Pre-fill form with current values
            const userData = getUserData();
            if (userData) {
                editFullName.value = userData.fullName || '';
                editEmail.value = userData.email || '';
                editPhone.value = userData.phone || '';
                editCompany.value = userData.company || '';
                editJobTitle.value = userData.jobTitle || '';
            }
        }
        
        function cancelEdit() {
            viewMode.style.display = 'block';
            editMode.style.display = 'none';
            
            // Reset form validation errors
            document.getElementById('fullNameError').textContent = '';
            document.getElementById('emailError').textContent = '';
        }
        
        function saveProfileChanges(event) {
            event.preventDefault();
            
            // Validate form
            let isValid = true;
            
            if (!editFullName.value.trim()) {
                document.getElementById('fullNameError').textContent = 'Full name is required';
                isValid = false;
            } else {
                document.getElementById('fullNameError').textContent = '';
            }
            
            if (!editEmail.value.trim()) {
                document.getElementById('emailError').textContent = 'Email address is required';
                isValid = false;
            } else if (!isValidEmail(editEmail.value.trim())) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                document.getElementById('emailError').textContent = '';
            }
            
            if (!isValid) {
                return;
            }
            
            // Create updated user data
            const updatedUserData = {
                fullName: editFullName.value.trim(),
                email: editEmail.value.trim(),
                phone: editPhone.value.trim(),
                company: editCompany.value.trim(),
                jobTitle: editJobTitle.value.trim()
            };
            
            // Save user data
            saveUserData(updatedUserData);
            
            // Update display
            updateProfileDisplay(updatedUserData);
            
            // Update name in localStorage/sessionStorage
            if (localStorage.getItem('userEmail')) {
                localStorage.setItem('userName', updatedUserData.fullName);
            } else {
                sessionStorage.setItem('userName', updatedUserData.fullName);
            }
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Return to view mode after a delay
            setTimeout(() => {
                viewMode.style.display = 'block';
                editMode.style.display = 'none';
            }, 2000);
        }
    }
    
    function getUserData() {
        // Try to get user data from different sources
        let userData = null;
        
        // First check if there's dedicated userData
        const storedUserData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        if (storedUserData) {
            userData = JSON.parse(storedUserData);
        } else {
            // If not, check in the users collection
            const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
            const storedUsers = JSON.parse(localStorage.getItem('grcUsers') || '[]');
            const user = storedUsers.find(u => u.email === userEmail);
            
            if (user) {
                userData = user;
            }
        }
        
        return userData;
    }
    
    function saveUserData(userData) {
        const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
        
        // Save to userData in storage
        if (localStorage.getItem('userEmail')) {
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }
        
        // Also update in grcUsers if it exists
        const storedUsers = JSON.parse(localStorage.getItem('grcUsers') || '[]');
        const userIndex = storedUsers.findIndex(u => u.email === userEmail);
        
        if (userIndex !== -1) {
            // Update existing user
            storedUsers[userIndex] = { 
                ...storedUsers[userIndex],
                ...userData
            };
        } else {
            // Add new user
            storedUsers.push(userData);
        }
        
        localStorage.setItem('grcUsers', JSON.stringify(storedUsers));
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function updateProfileDisplay(userData) {
        // Update profile fields
        document.getElementById('profileName').textContent = userData.fullName || 'User';
        document.getElementById('profileEmail').textContent = userData.email || '';
        
        document.getElementById('fullNameValue').textContent = userData.fullName || 'Not provided';
        document.getElementById('emailValue').textContent = userData.email || '';
        document.getElementById('phoneValue').textContent = userData.phone || 'Not provided';
        document.getElementById('companyValue').textContent = userData.company || 'Not provided';
        document.getElementById('jobTitleValue').textContent = userData.jobTitle || 'Not provided';
        
        // Update avatar initial
        const initial = userData.fullName ? userData.fullName.charAt(0).toUpperCase() : 'U';
        document.getElementById('profileAvatar').innerHTML = initial;
    }
}); 