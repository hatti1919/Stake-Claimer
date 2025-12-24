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
window.TURNSTILE_SITE_KEY = null;

const HEADER_HTML = `
<nav class="sticky-nav">
    <div class="nav-left">
        <div class="mobile-menu-btn" onclick="toggleMobileNav()"><i class="fa-solid fa-bars"></i></div>
        <a href="/" class="nav-link" id="nav-home">Home</a>
        <a href="/terms" class="nav-link" id="nav-terms">利用規約</a>
        <a href="/usage" class="nav-link" id="nav-usage">使用方法</a>
    </div>
    <div class="nav-right">
        <div style="position:relative;">
            <div class="notification-btn" onclick="toggleNotifPopup()">
                <i class="fa-solid fa-bell"></i>
                <span class="badge" id="notif-badge"></span>
            </div>
            <div id="notif-popup" class="notif-popup">
                <div style="padding:15px; border-bottom:1px solid #222; font-weight:bold; color:#00E701; display:flex; justify-content:space-between; position:sticky; top:0; background:#111; z-index:10; align-items:center;">
                    <span><i class="fa-solid fa-inbox"></i> お知らせ</span>
                    <span onclick="toggleNotifPopup()" style="cursor:pointer; color:#666; font-size:1.2rem;">&times;</span>
                </div>
                <div id="notif-list"><div class="notif-empty">読み込み中...</div></div>
            </div>
        </div>
        <div class="nav-divider"></div>
        <div id="auth-container"><button class="login-btn-nav" style="opacity:0.6;"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</button></div>
    </div>
</nav>
<div id="mobile-nav" class="mobile-nav-overlay">
    <a href="/" class="mobile-nav-link" id="mob-home">Home</a>
    <a href="/terms" class="mobile-nav-link" id="mob-terms">利用規約</a>
    <a href="/usage" class="mobile-nav-link" id="mob-usage">使用方法</a>
    <a href="/law" class="mobile-nav-link" id="mob-law">特商法表記</a>
</div>`;

const FOOTER_HTML = `
<footer class="footer-wrapper">
    <div class="footer-content">
        <div class="footer-links">
            <a href="/terms">利用規約</a>
            <a href="/law">特定商取引法に基づく表記</a>
            <a href="/usage">使用方法</a>
            <a href="/">ホームに戻る</a>
        </div>
        <div class="footer-icons">
            <a href="${CONFIG.discordInviteUrl}" target="_blank"><i class="fa-brands fa-discord"></i></a>
            <a href="${CONFIG.twitterUrl}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
        </div>
    </div>
    <div class="footer-copyright">© ${CONFIG.siteName}</div>
</footer>`;

const GLOBAL_MODAL_HTML = `
<div id="global-modal-overlay" class="global-modal-overlay">
    <div class="global-modal-box">
        <div id="g-modal-title" class="global-modal-title"></div>
        <div id="g-modal-body" class="global-modal-body"></div>
        <div id="g-modal-actions" class="global-modal-actions"></div>
    </div>
</div>`;

window.addEventListener('DOMContentLoaded', async () => {
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
    document.body.insertAdjacentHTML('beforeend', GLOBAL_MODAL_HTML);
    try {
        await initSupabase();
        const { data: { session } } = await window.supabaseApp.auth.getSession();
        if (session) handleLoginSuccess(session); else showLoginButton();
        window.supabaseApp.auth.onAuthStateChange((event, s) => { if (s) handleLoginSuccess(s); else showLoginButton(); });
    } catch (e) { showLoginButton(); }
});

window.initSupabase = async () => {
    if (window.supabaseApp) return window.supabaseApp;
    const res = await fetch('/api/config');
    const env = await res.json();
    window.TURNSTILE_SITE_KEY = env.TURNSTILE_SITE_KEY;
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
                    <a href="/history" class="menu-item"><i class="fa-solid fa-clock-rotate-left" style="color:#00E701; margin-right:8px;"></i>購入履歴</a>
                    <a href="/contact" class="menu-item"><i class="fa-solid fa-envelope" style="color:#00E701; margin-right:8px;"></i>お問い合わせ</a>
                    <a href="/dashboard" class="menu-item"><i class="fa-solid fa-gauge-high" style="color:#00E701; margin-right:8px;"></i>ダッシュボード</a>
                    <div class="menu-item" onclick="logout()" style="color:#ff4444; border-top:1px solid #333;"><i class="fa-solid fa-right-from-bracket" style="margin-right:8px;"></i>ログアウト</div>
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
    const o = document.getElementById('global-modal-overlay'), t = document.getElementById('g-modal-title'), b = document.getElementById('g-modal-body'), a = document.getElementById('g-modal-actions');
    if (!o) return;
    t.innerText = title;
    b.innerHTML = message;
    a.innerHTML = '';
    if (buttons.length === 0) {
        const btn = document.createElement('button'); btn.className = 'g-modal-btn g-btn-secondary'; btn.innerText = '閉じる'; btn.onclick = closeModal; a.appendChild(btn);
    } else {
        buttons.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `g-modal-btn ${opt.class || 'g-btn-secondary'}`;
            btn.innerText = opt.text;
            btn.onclick = opt.onClick;
            a.appendChild(btn);
        });
    }
    o.classList.add('show');
};
window.closeModal = () => document.getElementById('global-modal-overlay')?.classList.remove('show');
window.toggleUserMenu = () => document.getElementById('user-menu')?.classList.toggle('show');
window.toggleNotifPopup = () => document.getElementById('notif-popup')?.classList.toggle('show');
window.toggleMobileNav = () => document.getElementById('mobile-nav')?.classList.toggle('show');