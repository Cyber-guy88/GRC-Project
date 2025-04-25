// Debugging script for chatbot initialization
(function() {
    console.log("Chatbot debug script loaded");
    
    // Check if document is already fully loaded
    if (document.readyState === 'complete') {
        console.log("Document already loaded - running debug checks immediately");
        runDebugChecks();
    } else {
        // Add listener for DOM content loaded
        console.log("Adding DOMContentLoaded event listener for debug checks");
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOMContentLoaded event fired - running debug checks");
            runDebugChecks();
        });
        
        // Also add window.onload listener as backup
        window.addEventListener('load', function() {
            console.log("Window load event fired - running debug checks");
            runDebugChecks();
        });
    }
    
    function runDebugChecks() {
        // Check if chatbot elements exist
        console.log("Checking chatbot elements:");
        
        const elements = {
            'chatbotButton': document.getElementById('chatbotButton'),
            'chatbotWindow': document.getElementById('chatbotWindow'),
            'chatbotMessages': document.getElementById('chatbotMessages'),
            'userInput': document.getElementById('userInput'),
            'sendMessage': document.getElementById('sendMessage')
        };
        
        // Log availability of each element
        for (const [name, element] of Object.entries(elements)) {
            console.log(`- ${name}: ${element ? 'Found' : 'NOT FOUND'}`);
        }
        
        // Check if chatbot script is loaded
        const allScripts = document.querySelectorAll('script');
        let chatbotScriptFound = false;
        
        for (const script of allScripts) {
            if (script.src && script.src.includes('chatbot.js')) {
                chatbotScriptFound = true;
                console.log(`- chatbot.js script: Found (src: ${script.src})`);
                break;
            }
        }
        
        if (!chatbotScriptFound) {
            console.error("- chatbot.js script: NOT FOUND - This is likely the issue!");
        }
        
        // Check if chatbotConfig and chatState objects are defined
        console.log("Checking chatbot globals:");
        console.log(`- chatbotConfig: ${typeof window.chatbotConfig !== 'undefined' ? 'Defined' : 'NOT DEFINED'}`);
        console.log(`- chatState: ${typeof window.chatState !== 'undefined' ? 'Defined' : 'NOT DEFINED'}`);
        
        // Try to manually initialize the chatbot
        console.log("Attempting manual initialization:");
        if (typeof window.initChatbot === 'function') {
            console.log("- initChatbot function found, calling it now");
            try {
                window.initChatbot();
                console.log("- Manual initialization completed without errors");
            } catch (error) {
                console.error("- Error during manual initialization:", error);
            }
        } else {
            console.error("- initChatbot function NOT FOUND - Check if chatbot.js is loading correctly");
        }
        
        // Add a direct click handler to the chatbot button
        const chatbotButton = document.getElementById('chatbotButton');
        if (chatbotButton) {
            console.log("Adding test click handler to chatbot button");
            chatbotButton.addEventListener('click', function() {
                console.log("Debug: Chatbot button clicked directly");
                const chatbotWindow = document.getElementById('chatbotWindow');
                if (chatbotWindow) {
                    if (chatbotWindow.style.display === 'flex') {
                        console.log("Debug: Hiding chatbot window");
                        chatbotWindow.style.display = 'none';
                    } else {
                        console.log("Debug: Showing chatbot window");
                        chatbotWindow.style.display = 'flex';
                    }
                }
            });
        }
    }
})(); 