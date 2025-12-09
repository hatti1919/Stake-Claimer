// 設定
const CONFIG = {
    discordInviteUrl: "https://discord.gg/ueVedsjved",
    twitterUrl: "https://x.com/Stake_hatti"
};

// 共通処理
window.addEventListener('DOMContentLoaded', () => {
    const twitterLinks = document.querySelectorAll('.link-twitter');
    twitterLinks.forEach(el => el.href = CONFIG.twitterUrl);
});

// Supabase初期化関数 (各ページで必ずawaitする)
window.initSupabase = async () => {
    if (window.supabaseApp) return window.supabaseApp;
    try {
        const res = await fetch('/api/config');
        const env = await res.json();
        window.supabaseApp = window.supabase.createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
        return window.supabaseApp;
    } catch (e) {
        console.error("Config load failed:", e);
    }
};