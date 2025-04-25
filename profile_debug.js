/**
 * Profile Debug Tools
 * This script provides functions to help diagnose profile update issues
 */

// Check user data in storage
function checkUserData() {
    const localStorageData = {
        userEmail: localStorage.getItem('userEmail'),
        userName: localStorage.getItem('userName'),
        userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
        grcUsers: localStorage.getItem('grcUsers') ? JSON.parse(localStorage.getItem('grcUsers')) : []
    };
    
    const sessionStorageData = {
        userEmail: sessionStorage.getItem('userEmail'),
        userName: sessionStorage.getItem('userName'),
        userData: sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : null
    };
    
    console.log('---- USER DATA DIAGNOSTIC RESULTS ----');
    console.log('Local Storage Data:', localStorageData);
    console.log('Session Storage Data:', sessionStorageData);
    
    // Check if email is consistent across storage types
    const emailsMatch = localStorageData.userEmail === sessionStorageData.userEmail;
    console.log('Emails match across storage:', emailsMatch);
    
    if (!emailsMatch) {
        console.warn('Email mismatch detected between localStorage and sessionStorage!');
        console.log('localStorage email:', localStorageData.userEmail);
        console.log('sessionStorage email:', sessionStorageData.userEmail);
    }
    
    // Check if user exists in grcUsers collection
    const emailToCheck = localStorageData.userEmail || sessionStorageData.userEmail;
    if (emailToCheck) {
        const userFound = localStorageData.grcUsers.find(u => u.email === emailToCheck);
        console.log('User found in grcUsers collection:', userFound ? true : false);
        if (!userFound) {
            console.warn('User email not found in grcUsers collection!');
        }
    }
    
    return {
        localStorageData,
        sessionStorageData,
        emailsMatch
    };
}

// Check session data with the server
async function checkSessionData() {
    try {
        const response = await fetch('check_session.php');
        const data = await response.json();
        
        console.log('---- SERVER SESSION DIAGNOSTIC RESULTS ----');
        console.log('Server session data:', data);
        
        // Compare with browser storage
        const localEmail = localStorage.getItem('userEmail');
        const sessionEmail = sessionStorage.getItem('userEmail');
        const serverEmail = data.session.userEmail || data.session.email;
        
        console.log('Email comparison:');
        console.log('- localStorage email:', localEmail);
        console.log('- sessionStorage email:', sessionEmail);
        console.log('- Server session email:', serverEmail);
        
        if (serverEmail && (serverEmail !== localEmail && serverEmail !== sessionEmail)) {
            console.warn('Email mismatch between server session and browser storage!');
        }
        
        return data;
    } catch (error) {
        console.error('Error checking session data:', error);
        return null;
    }
}

// Fix profile data consistency
function fixProfileData() {
    const localEmail = localStorage.getItem('userEmail');
    const sessionEmail = sessionStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');
    
    console.log('---- FIXING PROFILE DATA ----');
    
    // Determine which email to use (preference: userData > localStorage > sessionStorage)
    const primaryEmail = userData.email || localEmail || sessionEmail;
    
    if (!primaryEmail) {
        console.warn('No email found in any storage. Unable to fix profile data.');
        return false;
    }
    
    console.log('Using primary email:', primaryEmail);
    
    // Update all storages to use this email
    localStorage.setItem('userEmail', primaryEmail);
    sessionStorage.setItem('userEmail', primaryEmail);
    
    // Update userData if it exists
    if (userData) {
        userData.email = primaryEmail;
        localStorage.setItem('userData', JSON.stringify(userData));
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
    
    // Update grcUsers collection
    const grcUsers = JSON.parse(localStorage.getItem('grcUsers') || '[]');
    const userIndex = grcUsers.findIndex(u => 
        u.email === localEmail || u.email === sessionEmail || u.email === primaryEmail
    );
    
    if (userIndex >= 0) {
        grcUsers[userIndex].email = primaryEmail;
        localStorage.setItem('grcUsers', JSON.stringify(grcUsers));
    } else if (userData) {
        // If user not found in collection but we have userData, add it
        grcUsers.push({
            ...userData,
            email: primaryEmail
        });
        localStorage.setItem('grcUsers', JSON.stringify(grcUsers));
    }
    
    console.log('Profile data fixed. Refresh the page to see changes.');
    return true;
}

// Run diagnostics and apply fix
function runFullDiagnostic() {
    const storageResults = checkUserData();
    
    // Call the async function and handle its result
    checkSessionData().then(sessionResults => {
        console.log('---- FULL DIAGNOSTIC COMPLETE ----');
        
        // Check if we found any issues
        const hasStorageIssues = !storageResults.emailsMatch;
        const hasSessionIssues = sessionResults && 
            sessionResults.session && 
            (sessionResults.session.userEmail !== storageResults.localStorageData.userEmail);
        
        if (hasStorageIssues || hasSessionIssues) {
            console.log('Issues detected. Attempting to fix...');
            const fixed = fixProfileData();
            
            if (fixed) {
                console.log('Fix applied. Please refresh the page.');
            } else {
                console.log('Unable to fix automatically. Manual intervention required.');
            }
        } else {
            console.log('No issues detected.');
        }
    });
}

// Add diagnostic button to the page if in dev mode
function addDiagnosticTools() {
    const footer = document.querySelector('footer');
    if (footer) {
        const toolsDiv = document.createElement('div');
        toolsDiv.className = 'diagnostic-tools';
        toolsDiv.style.cssText = 'position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 5px; z-index: 9999;';
        
        const runButton = document.createElement('button');
        runButton.textContent = 'Run Profile Diagnostics';
        runButton.style.cssText = 'background: #0f4c81; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;';
        runButton.onclick = function() {
            runFullDiagnostic();
        };
        
        toolsDiv.appendChild(runButton);
        
        const fixButton = document.createElement('button');
        fixButton.textContent = 'Fix Profile Data';
        fixButton.style.cssText = 'background: #10b981; color: white; border: none; padding: 8px 12px; border-radius: 4px; margin-left: 10px; cursor: pointer;';
        fixButton.onclick = function() {
            if (fixProfileData()) {
                alert('Profile data fixed! The page will now reload.');
                window.location.reload();
            } else {
                alert('Unable to fix profile data automatically.');
            }
        };
        
        toolsDiv.appendChild(fixButton);
        
        document.body.appendChild(toolsDiv);
    }
}

// Wait for document to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if we should add debug tools (you can control this with a URL parameter)
    if (window.location.search.includes('debug=true')) {
        addDiagnosticTools();
    }
    
    // Add a global function for console access
    window.profileDebug = {
        checkUserData,
        checkSessionData,
        fixProfileData,
        runFullDiagnostic
    };
    
    console.log('Profile debugging tools available. Type window.profileDebug in console to access.');
}); 