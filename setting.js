/* setting.js */
const CONFIG = {
    siteName: "Stake Bonus Claimer",
    siteDescription: "Stakeのボーナスコード取得を自動化。PC常時起動は不要、スマホだけで完結します。",
    siteUrl: "https://stake-claimer.com",
    ogImage: "/image/logo.jpg",
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
            <div class="notification-btn" onclick="toggleNotifPopup()" style="color: white;">
                <i class="fa-solid fa-bell"></i>
                <span class="badge" id="notif-badge" style="display:none; background: #ff4444; color: white;"></span>
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
                    <div class="menu-item" onclick="logout()" style="color:#ff4444; border-top:1px solid #333; cursor:pointer;"><i class="fa-solid fa-right-from-bracket" style="margin-right:8px;"></i>ログアウト</div>
                </div>
            </div>`;
    }
    checkNotifications(currentUser.id);
}

// 既読・通知システム
async function checkNotifications(userId) {
    try {
        const res = await fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ user_id: userId, action: 'get' }) });
        const notifs = await res.json();
        if (!Array.isArray(notifs)) return;

        const badge = document.getElementById('notif-badge');
        const list = document.getElementById('notif-list');
        const unreadCount = notifs.filter(n => !n.is_read).length;

        if (badge) {
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
            badge.innerText = unreadCount;
        }

        if (list) {
            if (notifs.length > 0) {
                list.innerHTML = "";
                notifs.forEach(n => {
                    const isRead = n.is_read;
                    const icon = n.type === 'success' ? '<i class="fa-solid fa-circle-check" style="color:#00E701"></i>' : '<i class="fa-solid fa-circle-info" style="color:#00AAFF"></i>';
                    const readAction = isRead ? '<span style="color:#555;font-size:0.7rem;">既読</span>' : `<span onclick="markAsRead('${n.id}','${userId}')" style="color:#00E701;font-size:0.7rem;cursor:pointer;text-decoration:underline;">既読にする</span>`;

                    list.innerHTML += `
                        <div class="notif-item" id="notif-${n.id}" style="opacity:${isRead ? '0.5' : '1'}">
                            <div style="display:flex; justify-content:space-between;">
                                <div style="display:flex; gap:8px;">${icon}<b>${n.title}</b></div>
                                ${readAction}
                            </div>
                            <div style="font-size:0.8rem; color:#ccc; margin-top:5px;">${n.message.replace(/\n/g, '<br>')}</div>
                        </div>`;
                });
            } else { list.innerHTML = '<div class="notif-empty">通知はありません</div>'; }
        }
    } catch (e) { }
}

window.markAsRead = async (id, userId) => {
    try {
        await fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ action: 'read', id: id, user_id: userId }) });
        checkNotifications(userId);
    } catch (e) { }
};

function showLoginButton() {
    const c = document.getElementById('auth-container');
    if (c) c.innerHTML = `<button onclick="login()" class="login-btn-nav">Login</button>`;
}

window.login = async () => { await window.supabaseApp.auth.signInWithOAuth({ provider: 'discord' }); };

window.logout = async () => {
    if (window.supabaseApp) {
        await window.supabaseApp.auth.signOut();
        window.location.href = "/";
    }
};

window.showModal = (title, message, buttons = []) => {
    const o = document.getElementById('global-modal-overlay'), t = document.getElementById('g-modal-title'), b = document.getElementById('g-modal-body'), a = document.getElementById('g-modal-actions');
    if (!o) return;
    t.innerText = title; b.innerHTML = message; a.innerHTML = '';
    if (buttons.length === 0) {
        const btn = document.createElement('button'); btn.className = 'g-modal-btn g-btn-secondary'; btn.innerText = '閉じる'; btn.onclick = closeModal; a.appendChild(btn);
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