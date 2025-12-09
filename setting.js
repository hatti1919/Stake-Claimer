/* setting.js */

const CONFIG = {
    discordInviteUrl: "https://discord.gg/ueVedsjved",
    twitterUrl: "https://x.com/Stake_hatti"
};

let currentUser = null;

// ヘッダーのHTMLテンプレート
// ログインボタンにはFontAwesomeのDiscordアイコンを入れています
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
                <div style="padding:12px; border-bottom:1px solid #222; font-weight:bold; color:#00E701;">お知らせ</div>
                <div id="notif-list"><div class="notif-empty">通知はありません</div></div>
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
</div>
`;

// フッターのHTMLテンプレート
const FOOTER_HTML = `
<div class="footer-links">
    <a href="/terms">利用規約</a>
    <a href="/usage">使用方法</a>
    <a href="/">ホームに戻る</a>
    <p style="margin-top:20px; color:#444; font-size:0.7rem;">© Stake Bonus Claimer</p>
</div>
`;

// 初期化フロー
window.addEventListener('DOMContentLoaded', async () => {
    // 1. ヘッダー・フッターの挿入
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

    // 2. 現在のページのリンクを緑にする
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
        if (document.getElementById('nav-home')) document.getElementById('nav-home').classList.add('active');
        if (document.getElementById('mob-home')) document.getElementById('mob-home').classList.add('active');
    } else if (path.includes('terms')) {
        if (document.getElementById('nav-terms')) document.getElementById('nav-terms').classList.add('active');
        if (document.getElementById('mob-terms')) document.getElementById('mob-terms').classList.add('active');
    } else if (path.includes('usage')) {
        if (document.getElementById('nav-usage')) document.getElementById('nav-usage').classList.add('active');
        if (document.getElementById('mob-usage')) document.getElementById('mob-usage').classList.add('active');
    }

    // 3. Supabase初期化 & 認証チェック
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
        // エラー時でもログインボタンを表示してリトライ可能にする
        const container = document.getElementById('auth-container');
        if (container) {
            container.innerHTML = `<button onclick="location.reload()" class="login-btn-nav"><i class="fa-solid fa-rotate-right"></i> Retry</button>`;
        }
    }
});

// --- 関数定義 ---

window.initSupabase = async () => {
    if (window.supabaseApp) return window.supabaseApp;
    const res = await fetch('/api/config');
    const env = await res.json();
    window.supabaseApp = window.supabase.createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
    return window.supabaseApp;
};

// ログイン成功時の処理 (UI更新 + サーバー参加)
async function handleLoginSuccess(session) {
    currentUser = session.user;
    updateAuthUI(currentUser);

    // サーバー自動参加 (Discordアクセストークンがある場合)
    if (session.provider_token) {
        try {
            console.log("Attempting to auto-join server...");
            await fetch('/api/join', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: session.user.user_metadata.provider_id, // Discord ID
                    provider_token: session.provider_token
                })
            });
        } catch (e) {
            console.error("Auto join failed:", e);
        }
    }
}

// ログインボタン表示 (Discordアイコン付き)
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

// ログイン後のUI (アバター表示 + メニュー)
function updateAuthUI(user) {
    const container = document.getElementById('auth-container');
    if (container) {
        container.innerHTML = `
            <div style="position:relative;">
                <img src="${user.user_metadata.avatar_url}" class="user-avatar-nav" onclick="toggleUserMenu()">
                <div id="user-menu" class="dropdown-menu">
                    <a href="/history" class="menu-item"><i class="fa-solid fa-clock-rotate-left"></i> 購入履歴</a>
                    <a href="/contact" class="menu-item"><i class="fa-solid fa-envelope"></i> お問い合わせ</a>
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
    await window.supabaseApp.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: window.location.origin,
            scopes: 'guilds.join identify email' // サーバー参加権限を要求
        }
    });
}

async function logout() {
    await window.supabaseApp.auth.signOut();
    window.location.href = "/";
}

// 通知チェック (未払いの注文があればバッジ表示)
async function checkNotifications(userId) {
    try {
        const res = await fetch('/api/history', { method: 'POST', body: JSON.stringify({ user_id: userId }) });
        const orders = await res.json();
        const pending = orders.filter(o => o.status === 'pending');

        const badge = document.getElementById('notif-badge');
        const list = document.getElementById('notif-list');

        if (pending.length > 0) {
            if (badge) {
                badge.style.display = 'flex';
                badge.innerText = pending.length;
            }
            if (list) {
                list.innerHTML = "";
                pending.forEach(o => {
                    list.innerHTML += `
                        <div class="notif-item">
                            <span style="color:#ffd700">未払い</span>: ${o.plan_type.toUpperCase()} PLAN<br>
                            <a href="/checkout/${o.order_id}" style="color:#00E701; text-decoration:underline;">支払う</a>
                        </div>
                    `;
                });
            }
        }
    } catch (e) { }
}

// メニュー開閉系
window.toggleUserMenu = () => {
    const m = document.getElementById('user-menu');
    if (m) m.classList.toggle('show');
};
window.toggleNotifPopup = () => {
    const p = document.getElementById('notif-popup');
    if (p) p.classList.toggle('show');
};
window.toggleMobileNav = () => {
    const n = document.getElementById('mobile-nav');
    if (n) n.classList.toggle('show');
};

// モーダル表示 (全ページ共通)
window.showModal = (title, bodyHtml, buttons) => {
    const modal = document.getElementById('custom-modal') || createModalElement();
    const t = modal.querySelector('.modal-title');
    if (t) t.innerText = title;

    const body = modal.querySelector('.modal-body');
    if (body) {
        if (bodyHtml) { body.innerHTML = bodyHtml; body.style.display = 'block'; }
        else { body.style.display = 'none'; }
    }

    const acts = modal.querySelector('.modal-actions');
    if (acts) {
        acts.innerHTML = '';
        buttons.forEach(b => {
            const btn = document.createElement('button');
            btn.className = `modal-btn ${b.class}`;
            btn.innerText = b.text;
            btn.onclick = b.onClick;
            acts.appendChild(btn);
        });
    }
    modal.style.display = 'flex';
};
window.closeModal = () => {
    const m = document.getElementById('custom-modal');
    if (m) m.style.display = 'none';
};

function createModalElement() {
    const div = document.createElement('div');
    div.id = 'custom-modal';
    div.className = 'custom-modal-overlay';
    div.innerHTML = `
        <div class="custom-modal">
            <div class="modal-title"></div>
            <div class="modal-body"></div>
            <div class="modal-actions"></div>
        </div>`;
    document.body.appendChild(div);
    return div;
}