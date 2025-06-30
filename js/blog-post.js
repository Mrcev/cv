// blog-post.js

// Get blog post id from hash
function getPostId() {
    const hash = window.location.hash.replace('#', '');
    return parseInt(hash, 10);
}

// Render blog post detail
async function renderBlogPost() {
    const postId = getPostId();
    const detailSection = document.getElementById('blog-post-detail');
    if (!detailSection) return;
    try {
        const res = await fetch('blog-posts.json');
        const posts = await res.json();
        const post = posts.find(p => p.id === postId) || posts[0];
        if (!post) {
            detailSection.innerHTML = '<p>Post not found.</p>';
            return;
        }
        // Render post
        detailSection.innerHTML = `
            <div class="blog-post-detail-card">
                <img src="${post.image_url}" alt="Post image" class="blog-post-image">
                <h1 class="blog-title">${currentLanguage === 'tr' ? post.title_tr : post.title_en}</h1>
                <div class="blog-content-long">
                    ${(currentLanguage === 'tr' ? post.content_long_tr : post.content_long_en)}
                </div>
                <div class="blog-post-date">${post.date}</div>
            </div>
        `;
    } catch (e) {
        detailSection.innerHTML = '<p>Could not load post.</p>';
    }
}

// Render recent posts (last 3, excluding current)
async function renderRecentPosts() {
    const postId = getPostId();
    const recentSection = document.querySelector('.recent-posts-list');
    if (!recentSection) return;
    try {
        const res = await fetch('blog-posts.json');
        let posts = await res.json();
        posts = posts.filter(p => p.id !== postId).slice(-3).reverse();
        recentSection.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'recent-post-card';
            card.innerHTML = `
                <a href="blog-post.html#${post.id}" class="recent-post-link">
                    <img src="${post.image_url}" alt="Post image" class="recent-post-image">
                    <h3 class="recent-post-title">${currentLanguage === 'tr' ? post.title_tr : post.title_en}</h3>
                    <div class="recent-post-date">${post.date}</div>
                </a>
            `;
            recentSection.appendChild(card);
        });
    } catch (e) {
        recentSection.innerHTML = '<p>Could not load recent posts.</p>';
    }
}

// Update post and recent posts on language change
function updateBlogPostLanguage() {
    renderBlogPost();
    renderRecentPosts();
}

// Update post and recent posts on theme change
function updateBlogPostTheme() {
    renderBlogPost();
    renderRecentPosts();
}

// On DOMContentLoaded and hashchange
window.addEventListener('DOMContentLoaded', () => {
    renderBlogPost();
    renderRecentPosts();
});
window.addEventListener('hashchange', () => {
    renderBlogPost();
    renderRecentPosts();
});

// Patch global language toggle to also update blog post
const origToggleLanguage = window.CVWebsite.toggleLanguage;
window.CVWebsite.toggleLanguage = function() {
    origToggleLanguage();
    updateBlogPostLanguage();
};

// Patch global theme toggle to also update blog post
const origToggleTheme = window.toggleTheme;
window.toggleTheme = function() {
    origToggleTheme();
    updateBlogPostTheme();
}; 