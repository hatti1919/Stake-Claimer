/* setting.js */
const CONFIG = {
    siteName: "Stake Bonus Claimer",
    siteDescription: "Stakeのボーナスコード取得を自動化。PC常時起動は不要、スマホだけで完結します。",
    siteUrl: "https://stake-claimer.vercel.app",
    ogImage: "/image/server-logo.jpg",
    themeColor: "#00E701",
    discordInviteUrl: "https://discord.gg/ueVedsjved",
    twitterUrl: "https://x.com/Stake_hatti"
};

let currentUser = null;
window.TURNSTILE_SITE_KEY = null; // 環境変数から取得したキーを保持

// 共通モーダルHTML
const GLOBAL_MODAL_HTML = `
<div id="global-modal-overlay" class="global-modal-overlay">
    <div class="global-modal-box">
        <div id="g-modal-title" class="global-modal-title"></div>
        <div id="g-modal-body" class="global-modal-body"></div>
        <div id="g-modal-actions" class="global-modal-actions"></div>
    </div>
</div>
`;

const HEADER_HTML = `
<nav class="sticky-nav">
    <div class="nav-left">
        <div class="mobile-menu-btn" onclick="toggleMobileNav()"><i class="fa-solid fa-bars"></i></div>
        <a href="/" class="nav-link">Home</a>
        <a href="/terms" class="nav-link">利用規約</a>
        <a href="/usage" class="nav-link">使用方法</a>
    </div>
    <div class="nav-right">
        <div class="notification-btn" onclick="toggleNotifPopup()"><i class="fa-solid fa-bell"></i><span class="badge" id="notif-badge"></span></div>
        <div id="notif-popup" class="notif-popup">
            <div style="padding:15px; border-bottom:1px solid #222; font-weight:bold; color:#00E701;">お知らせ</div>
            <div id="notif-list"></div>
        </div>
        <div class="nav-divider"></div>
        <div id="auth-container"></div>
    </div>
</nav>
<div id="mobile-nav" class="mobile-nav-overlay">
    <a href="/" class="mobile-nav-link">Home</a>
    <a href="/terms" class="mobile-nav-link">利用規約</a>
    <a href="/usage" class="mobile-nav-link">使用方法</a>
</div>
`;

const FOOTER_HTML = `
<footer class="footer-wrapper">
    <div class="footer-content">
        <div class="footer-links"><a href="/terms">利用規約</a><a href="/law">特定商取引法</a><a href="/usage">使用方法</a></div>
        <div class="footer-icons"><a href="${CONFIG.discordInviteUrl}" target="_blank"><i class="fa-brands fa-discord"></i></a></div>
    </div>
    <div class="footer-copyright">© ${CONFIG.siteName}</div>
</footer>
`;

window.addEventListener('DOMContentLoaded', async () => {
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
    document.body.insertAdjacentHTML('beforeend', GLOBAL_MODAL_HTML);
    try {
        await initSupabase();
        const { data: { session } } = await window.supabaseApp.auth.getSession();
        if (session) handleLoginSuccess(session); else showLoginButton();
    } catch (e) { showLoginButton(); }
});

window.initSupabase = async () => {
    if (window.supabaseApp) return window.supabaseApp;
    const res = await fetch('/api/config');
    const env = await res.json();
    window.TURNSTILE_SITE_KEY = env.TURNSTILE_SITE_KEY; // キーを保存
    window.supabaseApp = window.supabase.createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
    return window.supabaseApp;
};

function handleLoginSuccess(session) {
    currentUser = session.user;
    const container = document.getElementById('auth-container');
    if (container) {
        container.innerHTML = `
            <div style="position:relative;">
                <img src="${currentUser.user_metadata.avatar_url}" class="user-avatar-nav" onclick="toggleUserMenu()">
                <div id="user-menu" class="dropdown-menu">
                    <a href="/history" class="menu-item">履歴</a>
                    <a href="/contact" class="menu-item">問合せ</a>
                    <div class="menu-item" onclick="logout()" style="color:#f44;">ログアウト</div>
                </div>
            </div>`;
    }
}
function showLoginButton() {
    const c = document.getElementById('auth-container');
    if (c) c.innerHTML = `<button onclick="login()" class="login-btn-nav">Login</button>`;
}
async function login() { await window.supabaseApp.auth.signInWithOAuth({ provider: 'discord' }); }
async function logout() { await window.supabaseApp.auth.signOut(); location.href = "/"; }

window.showModal = (title, message, buttons = []) => {
    const o = document.getElementById('global-modal-overlay');
    const t = document.getElementById('g-modal-title');
    const b = document.getElementById('g-modal-body');
    const a = document.getElementById('g-modal-actions');
    if (!o) return;
    t.innerText = title;
    b.innerHTML = message; // HTMLとして描画
    a.innerHTML = '';
    if (buttons.length === 0) {
        const btn = document.createElement('button');
        btn.className = 'g-modal-btn g-btn-secondary'; btn.innerText = '閉じる'; btn.onclick = closeModal; a.appendChild(btn);
    } else {
        buttons.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `g-modal-btn ${opt.class || 'g-btn-secondary'}`;
            btn.innerText = opt.text; btn.onclick = opt.onClick; a.appendChild(btn);
        });
    }
    o.classList.add('show');
};
window.closeModal = () => document.getElementById('global-modal-overlay')?.classList.remove('show');
window.toggleUserMenu = () => document.getElementById('user-menu')?.classList.toggle('show');
window.toggleNotifPopup = () => document.getElementById('notif-popup')?.classList.toggle('show');
window.toggleMobileNav = () => document.getElementById('mobile-nav')?.classList.toggle('show');