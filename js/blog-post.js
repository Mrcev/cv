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
            <div class="blog-post-detail-card" style="background:white;padding:2rem;border-radius:1rem;box-shadow:0 2px 16px rgba(44,90,160,0.07);max-width:800px;margin:auto;">
                <img src="${post.image_url}" alt="Post image" style="width:100%;max-height:350px;object-fit:cover;border-radius:0.75rem;margin-bottom:2rem;">
                <h1 class="blog-title" style="margin-bottom:1rem;">${currentLanguage === 'tr' ? post.title_tr : post.title_en}</h1>
                <div class="blog-content-long" style="font-size:1.1rem;line-height:1.7;">
                    ${(currentLanguage === 'tr' ? post.content_long_tr : post.content_long_en)}
                </div>
                <div style="margin-top:2rem;color:#95a5a6;font-size:0.95rem;">${post.date}</div>
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
            card.style = 'background:white;padding:1rem;border-radius:0.75rem;box-shadow:0 2px 8px rgba(44,90,160,0.05);display:flex;flex-direction:column;align-items:center;';
            card.innerHTML = `
                <a href="blog-post.html#${post.id}" style="text-decoration:none;color:inherit;width:100%;">
                    <img src="${post.image_url}" alt="Post image" style="width:100%;height:120px;object-fit:cover;border-radius:0.5rem 0.5rem 0 0;">
                    <h3 style="margin:1rem 0 0.5rem 0;font-size:1.1rem;">${currentLanguage === 'tr' ? post.title_tr : post.title_en}</h3>
                    <div style="color:#95a5a6;font-size:0.95rem;">${post.date}</div>
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