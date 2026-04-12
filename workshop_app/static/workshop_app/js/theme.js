// Theme switcher - allows users to switch between light and dark modes
// Preference is saved in browser localStorage

(function() {
    const STORAGE_KEY = 'theme-preference';
    
    function initializeTheme() {
        // check if user has saved preference
        let savedTheme = localStorage.getItem(STORAGE_KEY);
        
        // if no preference, check system preference
        if (!savedTheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            savedTheme = prefersDark ? 'dark' : 'light';
        }
        
        // apply the saved theme
        applyTheme(savedTheme);
    }
    
    function applyTheme(theme) {
        // set the theme on document
        document.documentElement.setAttribute('data-theme', theme);
        
        // save to localStorage
        localStorage.setItem(STORAGE_KEY, theme);
        
        // update button display
        updateThemeButton(theme);
    }
    
    function updateThemeButton(currentTheme) {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            // show opposite icon of current theme
            if (currentTheme === 'dark') {
                btn.innerHTML = '<i class="fa fa-sun-o"></i>';
                btn.setAttribute('title', 'Switch to Light Mode');
            } else {
                btn.innerHTML = '<i class="fa fa-moon-o"></i>';
                btn.setAttribute('title', 'Switch to Dark Mode');
            }
        }
    }
    
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    
    // apply theme when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }
    
    // listen for theme button clicks
    document.addEventListener('DOMContentLoaded', function() {
        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        }
    });
    
    // listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // only auto-switch if user hasn't set preference
        if (!localStorage.getItem(STORAGE_KEY)) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
})();
