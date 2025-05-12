// DOM Elements
const sections = document.querySelectorAll('.settings-section');
const navItems = document.querySelectorAll('.sidebar nav ul li');
const saveButton = document.getElementById('save-changes');

// State Management
let siteSettings = {
    favicon: {
        imageUrl: ''
    },
    logo: {
        imageUrl: ''
    },
    hero: {
        agencyName: 'SWIT',
        slogan: 'Crafting Digital Excellence',
        ctaText: 'Get Started'
    },
    about: {
        description: 'We are SWIT, a forward-thinking digital agency dedicated to transforming ideas into exceptional digital experiences.',
        values: [
            { title: 'Innovation', description: 'Pushing boundaries in digital solutions' },
            { title: 'Quality', description: 'Delivering excellence in every project' },
            { title: 'Collaboration', description: 'Working together for better results' }
        ]
    },
    projects: [
        { title: 'Project One', description: 'Digital transformation project', image: '' },
        { title: 'Project Two', description: 'E-commerce solution', image: '' },
        { title: 'Project Three', description: 'Brand identity design', image: '' }
    ],
    contact: {
        title: 'Contact Us',
        recipientEmail: ''
    },
    theme: {
        primaryColor: '#00f0ff',
        backgroundColor: '#0a0a0a',
        textColor: '#ffffff',
        accentColor: '#ff3366'
    }
};

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        
        // Update active states
        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        item.classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Values Management
function renderValues() {
    const valuesList = document.getElementById('values-list');
    valuesList.innerHTML = '';

    siteSettings.about.values.forEach((value, index) => {
        const valueCard = document.createElement('div');
        valueCard.className = 'card';
        valueCard.innerHTML = `
            <div class="card-header">
                <input type="text" value="${value.title}" onchange="updateValue(${index}, 'title', this.value)">
                <button class="delete-btn" onclick="deleteValue(${index})">Delete</button>
            </div>
            <textarea onchange="updateValue(${index}, 'description', this.value)">${value.description}</textarea>
        `;
        valuesList.appendChild(valueCard);
    });
}

function addValue() {
    siteSettings.about.values.push({
        title: 'New Value',
        description: 'Value description'
    });
    renderValues();
}

function updateValue(index, field, value) {
    siteSettings.about.values[index][field] = value;
}

function deleteValue(index) {
    siteSettings.about.values.splice(index, 1);
    renderValues();
}

// Projects Management
function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';

    siteSettings.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card';
        projectCard.innerHTML = `
            <div class="card-header">
                <input type="text" value="${project.title}" onchange="updateProject(${index}, 'title', this.value)">
                <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
            </div>
            <textarea onchange="updateProject(${index}, 'description', this.value)">${project.description}</textarea>
            <input type="file" onchange="handleProjectImage(${index}, this)">
        `;
        projectsList.appendChild(projectCard);
    });
}

function addProject() {
    siteSettings.projects.push({
        title: 'New Project',
        description: 'Project description',
        image: ''
    });
    renderProjects();
}

function updateProject(index, field, value) {
    siteSettings.projects[index][field] = value;
}

function deleteProject(index) {
    siteSettings.projects.splice(index, 1);
    renderProjects();
}

function handleProjectImage(index, input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            siteSettings.projects[index].image = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Theme Management
function updateTheme() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', siteSettings.theme.primaryColor);
    root.style.setProperty('--background-color', siteSettings.theme.backgroundColor);
    root.style.setProperty('--text-color', siteSettings.theme.textColor);
    root.style.setProperty('--accent-color', siteSettings.theme.accentColor);
}

// Save Settings
function saveSettings() {
    // Update hero section
    siteSettings.hero.agencyName = document.getElementById('agency-name').value;
    siteSettings.hero.slogan = document.getElementById('agency-slogan').value;
    siteSettings.hero.ctaText = document.getElementById('cta-text').value;

    // Update about section
    siteSettings.about.description = document.getElementById('about-description').value;

    // Update contact section
    siteSettings.contact.title = document.getElementById('contact-title').value;
    siteSettings.contact.recipientEmail = document.getElementById('contact-email').value;

    // Update theme colors
    siteSettings.theme.primaryColor = document.getElementById('primary-color').value;
    siteSettings.theme.backgroundColor = document.getElementById('background-color').value;
    siteSettings.theme.textColor = document.getElementById('text-color').value;
    siteSettings.theme.accentColor = document.getElementById('accent-color').value;

    // Save to localStorage
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    
    // Update theme
    updateTheme();
    
    // Show success message
    alert('Settings saved successfully!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
        siteSettings = JSON.parse(savedSettings);
    }

    // Initialize form values
    document.getElementById('agency-name').value = siteSettings.hero.agencyName;
    document.getElementById('agency-slogan').value = siteSettings.hero.slogan;
    document.getElementById('cta-text').value = siteSettings.hero.ctaText;
    document.getElementById('about-description').value = siteSettings.about.description;
    document.getElementById('contact-title').value = siteSettings.contact.title;
    document.getElementById('contact-email').value = siteSettings.contact.recipientEmail;
    document.getElementById('primary-color').value = siteSettings.theme.primaryColor;
    document.getElementById('background-color').value = siteSettings.theme.backgroundColor;
    document.getElementById('text-color').value = siteSettings.theme.textColor;
    document.getElementById('accent-color').value = siteSettings.theme.accentColor;

    // Render dynamic content
    renderValues();
    renderProjects();

    // Add event listeners
    document.getElementById('add-value').addEventListener('click', addValue);
    document.getElementById('add-project').addEventListener('click', addProject);
    saveButton.addEventListener('click', saveSettings);

    // Initialize theme
    updateTheme();
    
    // Logo upload handling
    const logoUpload = document.getElementById('logo-upload');
    const logoPreview = document.getElementById('logo-preview');

    logoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                siteSettings.logo.imageUrl = e.target.result;
                logoPreview.src = e.target.result;
                logoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved logo
    if (siteSettings.logo.imageUrl) {
        logoPreview.src = siteSettings.logo.imageUrl;
        logoPreview.style.display = 'block';
    }
    
    // Favicon upload handling
    const faviconUpload = document.getElementById('favicon-upload');
    const faviconPreview = document.getElementById('favicon-preview');

    faviconUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                siteSettings.favicon.imageUrl = e.target.result;
                faviconPreview.src = e.target.result;
                faviconPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved favicon
    if (siteSettings.favicon.imageUrl) {
        faviconPreview.src = siteSettings.favicon.imageUrl;
        faviconPreview.style.display = 'block';
    }
});

// Add this at the beginning of the file
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'swit2024' // Change this to a secure password
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        localStorage.setItem('adminLoggedIn', 'true');
    } else {
        alert('Invalid credentials');
    }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
    }

    // Add logout button to the sidebar
    const sidebar = document.querySelector('.sidebar nav ul');
    const logoutItem = document.createElement('li');
    logoutItem.textContent = 'Logout';
    logoutItem.onclick = () => {
        localStorage.removeItem('adminLoggedIn');
        window.location.reload();
    };
    sidebar.appendChild(logoutItem);
});