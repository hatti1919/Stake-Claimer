/* setting.js */

const CONFIG = {
    // ★サイト共通設定
    siteName: "Stake Bonus Claimer",
    siteDescription: "Stakeのボーナスコード取得を自動化。PC常時起動は不要、スマホだけで完結します。",
    siteUrl: "https://stake-claimer.com",
    ogImage: "/image/server-logo.jpg",
    themeColor: "#00E701",

    // SNSリンク
    discordInviteUrl: "https://discord.gg/ueVedsjved",
    twitterUrl: "https://x.com/Stake_hatti",

    turnstilesitekey: "0x4AAAAAACI40UVssMImP7IY"
};

let currentUser = null;

// ヘッダーHTML
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
        
        <div id="auth-container">
            <button class="login-btn-nav" style="opacity:0.6; cursor:default;">
                <i class="fa-solid fa-spinner fa-spin"></i> Loading...
            </button>
        </div>
    </div>
</nav>
<div id="mobile-nav" class="mobile-nav-overlay">
    <a href="/" class="mobile-nav-link" id="mob-home">Home</a>
    <a href="/terms" class="mobile-nav-link" id="mob-terms">利用規約</a>
    <a href="/usage" class="mobile-nav-link" id="mob-usage">使用方法</a>
    <a href="/law" class="mobile-nav-link" id="mob-law">特商法表記</a>
</div>
`;

// フッターHTML
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
</footer>
`;

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

// メタタグ設定
function setupMetaTags() {
    const head = document.head;
    if (!document.querySelector("link[rel*='icon']")) {
        head.insertAdjacentHTML('beforeend', `<link rel="icon" href="${CONFIG.ogImage}">`);
    }
    if (document.title && !document.title.includes(CONFIG.siteName)) {
        document.title = `${document.title} - ${CONFIG.siteName}`;
    } else if (!document.title) {
        document.title = CONFIG.siteName;
    }
    if (!document.querySelector("meta[property='og:image']")) {
        const metaTags = `
            <meta property="og:site_name" content="${CONFIG.siteName}">
            <meta property="og:title" content="${document.title}">
            <meta property="og:description" content="${CONFIG.siteDescription}">
            <meta property="og:image" content="${CONFIG.siteUrl}${CONFIG.ogImage}">
            <meta property="og:url" content="${window.location.href}">
            <meta property="og:type" content="website">
            <meta name="theme-color" content="${CONFIG.themeColor}">
            <meta name="twitter:card" content="summary_large_image">
        `;
        head.insertAdjacentHTML('beforeend', metaTags);
    }
}

// メイン処理
window.addEventListener('DOMContentLoaded', async () => {
    setupMetaTags();
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
    document.body.insertAdjacentHTML('beforeend', GLOBAL_MODAL_HTML);

    const path = window.location.pathname;
    const highlight = (id) => document.getElementById(id)?.classList.add('active');
    if (path === '/' || path === '/index.html') { highlight('nav-home'); highlight('mob-home'); }
    else if (path.includes('terms')) { highlight('nav-terms'); highlight('mob-terms'); }
    else if (path.includes('usage')) { highlight('nav-usage'); highlight('mob-usage'); }
    else if (path.includes('law')) { highlight('mob-law'); }

    try {
        await initSupabase();
        const supabase = window.supabaseApp;
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            handleLoginSuccess(session);
        } else {
            showLoginButton();
        }

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                handleLoginSuccess(session);
            } else if (event === 'SIGNED_OUT') {
                showLoginButton();
            }
        });

    } catch (e) {
        console.error("Init Error:", e);
        showLoginButton();
    }
});

window.initSupabase = async () => {
    if (window.supabaseApp) return window.supabaseApp;
    const res = await fetch('/api/config');
    const env = await res.json();
    window.supabaseApp = window.supabase.createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
    return window.supabaseApp;
};

async function handleLoginSuccess(session) {
    currentUser = session.user;
    updateAuthUI(currentUser);
    if (session.provider_token) {
        try {
            await fetch('/api/join', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: session.user.user_metadata.provider_id,
                    provider_token: session.provider_token
                })
            });
        } catch (e) { }
    }
}

function showLoginButton() {
    currentUser = null;
    const container = document.getElementById('auth-container');
    if (container) {
        container.innerHTML = `
            <button onclick="login()" class="login-btn-nav">
                <i class="fa-brands fa-discord"></i> Login
            </button>
        `;
    }
}

// ★ユーザーメニュー設定
function updateAuthUI(user) {
    const container = document.getElementById('auth-container');
    if (container) {
        container.innerHTML = `
            <div style="position:relative;">
                <img src="${user.user_metadata.avatar_url}" class="user-avatar-nav" onclick="toggleUserMenu()">
                <div id="user-menu" class="dropdown-menu">
                    <a href="/history" class="menu-item"><i class="fa-solid fa-clock-rotate-left"></i> 購入履歴</a>
                    <a href="/contact" class="menu-item"><i class="fa-solid fa-envelope"></i> お問い合わせ</a>
                    
                    <a href="/dashboard" class="menu-item"><i class="fa-solid fa-gauge-high"></i> ダッシュボード</a>
                    
                    <div class="menu-item" onclick="logout()" style="color:#ff4444; border-top:1px solid #333;">
                        <i class="fa-solid fa-right-from-bracket"></i> ログアウト
                    </div>
                </div>
            </div>
        `;
    }
    checkNotifications(user.id);
}

async function login() {
    if (!window.supabaseApp) await initSupabase();
    await window.supabaseApp.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: window.location.origin,
            scopes: 'guilds.join identify email'
        }
    });
}

async function logout() {
    if (window.supabaseApp) await window.supabaseApp.auth.signOut();
    window.location.href = "/";
}

// --- 通知関連ロジック ---

async function checkNotifications(userId) {
    try {
        const res = await fetch('/api/notifications', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, action: 'get' })
        });
        const notifs = await res.json();
        const unreadCount = notifs.filter(n => !n.is_read).length;
        const badge = document.getElementById('notif-badge');

        if (unreadCount > 0) {
            if (badge) {
                badge.style.display = 'flex';
                badge.innerText = unreadCount;
            }
        } else {
            if (badge) badge.style.display = 'none';
        }

        const list = document.getElementById('notif-list');
        if (list) {
            if (notifs.length > 0) {
                list.innerHTML = "";
                notifs.forEach(n => {
                    const isRead = n.is_read;
                    const opacity = isRead ? '0.5' : '1.0';
                    const icon = n.type === 'success' ? '<i class="fa-solid fa-circle-check" style="color:#00E701"></i>' : '<i class="fa-solid fa-circle-info" style="color:#00AAFF"></i>';
                    const readBtn = isRead
                        ? `<span style="font-size:0.75rem; color:#444;">既読</span>`
                        : `<span id="btn-read-${n.id}" onclick="markAsRead('${n.id}', '${userId}')" style="font-size:0.75rem; color:#00E701; cursor:pointer; text-decoration:underline;">既読にする</span>`;

                    list.innerHTML += `
                        <div class="notif-item" id="notif-${n.id}" style="opacity:${opacity};">
                            <div style="display:flex; gap:10px; margin-bottom:5px; align-items:center;">
                                ${icon} <span style="font-weight:bold; font-size:0.9rem;">${n.title}</span>
                            </div>
                            <div style="font-size:0.85rem; line-height:1.4; color:#ccc;">${n.message.replace(/\n/g, '<br>')}</div>
                            <div style="text-align:right; margin-top:8px;">${readBtn}</div>
                        </div>
                    `;
                });
            } else {
                list.innerHTML = '<div class="notif-empty"><i class="fa-regular fa-bell-slash"></i> 通知はありません</div>';
            }
        }
    } catch (e) { console.error("Notif Error:", e); }
}

window.markAsRead = async (notifId, userId) => {
    try {
        const item = document.getElementById(`notif-${notifId}`);
        const btn = document.getElementById(`btn-read-${notifId}`);
        if (item) item.style.opacity = '0.5';
        if (btn) {
            btn.innerText = "既読";
            btn.style.color = "#444";
            btn.style.textDecoration = "none";
            btn.onclick = null;
        }
        const badge = document.getElementById('notif-badge');
        if (badge) {
            let current = parseInt(badge.innerText) || 0;
            if (current > 1) badge.innerText = current - 1;
            else badge.style.display = 'none';
        }
        await fetch('/api/notifications', {
            method: 'POST',
            body: JSON.stringify({ action: 'read', id: notifId, user_id: userId })
        });
    } catch (e) { }
};

// 共通モーダル表示関数
window.showModal = (title, message, buttons = []) => {
    const overlay = document.getElementById('global-modal-overlay');
    const mTitle = document.getElementById('g-modal-title');
    const mBody = document.getElementById('g-modal-body');
    const mActions = document.getElementById('g-modal-actions');

    if (!overlay) return alert(message);

    mTitle.innerText = title;
    mBody.innerHTML = message.replace(/\n/g, '<br>');
    mActions.innerHTML = '';

    if (buttons.length === 0) {
        const btn = document.createElement('button');
        btn.className = 'g-modal-btn g-btn-secondary';
        btn.innerText = '閉じる';
        btn.onclick = closeModal;
        mActions.appendChild(btn);
    } else {
        buttons.forEach(b => {
            const btn = document.createElement('button');
            btn.className = `g-modal-btn ${b.class || 'g-btn-secondary'}`;
            btn.innerText = b.text;
            btn.onclick = () => {
                if (b.onClick) b.onClick();
                if (!b.onClick) closeModal();
            };
            mActions.appendChild(btn);
        });
    }
    overlay.classList.add('show');
};

window.closeModal = () => {
    const overlay = document.getElementById('global-modal-overlay');
    if (overlay) overlay.classList.remove('show');
};

window.toggleUserMenu = () => document.getElementById('user-menu')?.classList.toggle('show');
window.toggleNotifPopup = () => document.getElementById('notif-popup')?.classList.toggle('show');
window.toggleMobileNav = () => document.getElementById('mobile-nav')?.classList.toggle('show');