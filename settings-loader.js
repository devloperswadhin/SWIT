document.addEventListener('DOMContentLoaded', () => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Apply Favicon
        const faviconElement = document.getElementById('favicon-element');
        if (settings.favicon && settings.favicon.imageUrl) {
            faviconElement.href = settings.favicon.imageUrl;
        }
        
        // Apply Logo
        const siteLogo = document.getElementById('site-logo');
        if (settings.logo && settings.logo.imageUrl) {
            siteLogo.src = settings.logo.imageUrl;
            siteLogo.style.display = 'block';
        }
        
        // Apply Hero Section Settings
        document.querySelector('.hero h1').textContent = settings.hero.agencyName;
        document.querySelector('.hero .slogan').textContent = settings.hero.slogan;
        document.querySelector('.hero .cta-button').textContent = settings.hero.ctaText;

        // Apply About Section Settings
        const aboutContent = document.querySelector('.about-content p');
        if (aboutContent) {
            aboutContent.textContent = settings.about.description;
        }

        // Apply Values
        const valuesContainer = document.querySelector('.values');
        if (valuesContainer) {
            valuesContainer.innerHTML = settings.about.values.map(value => `
                <div class="value-item">
                    <h3>${value.title}</h3>
                    <p>${value.description}</p>
                </div>
            `).join('');
        }

        // Apply Projects
        const projectGrid = document.querySelector('.project-grid');
        if (projectGrid) {
            projectGrid.innerHTML = settings.projects.map(project => `
                <div class="project-card">
                    <div class="project-image" ${project.image ? `style="background-image: url('${project.image}')"` : ''}></div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `).join('');
        }

        // Apply Contact Form Settings
        const contactTitle = document.querySelector('.contact h2');
        if (contactTitle) {
            contactTitle.textContent = settings.contact.title;
        }

        // Apply Theme Colors
        const root = document.documentElement;
        root.style.setProperty('--primary-color', settings.theme.primaryColor);
        root.style.setProperty('--background-color', settings.theme.backgroundColor);
        root.style.setProperty('--text-color', settings.theme.textColor);
        root.style.setProperty('--accent-color', settings.theme.accentColor);
    }
});