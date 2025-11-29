// setting.js

// ▼▼▼ ここにリンクを設定してください ▼▼▼
const CONFIG = {
    // あなたのDiscordサーバーの招待リンク
    discordUrl: "https://discord.gg/ueVedsjved",
    
    // あなたのX(Twitter)プロフィールのリンク
    twitterUrl: "https://x.com/Stake_hatti",
    
    // プランをクリックした時の飛び先（基本はform.htmlのままでOK）
    planLink: "form.html"
};


// ---------------------------------------------------
// 以下は自動処理（触らなくてOK）
// ---------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    // Discordリンクの設定
    const discordLinks = document.querySelectorAll('.link-discord');
    discordLinks.forEach(el => el.href = CONFIG.discordUrl);

    // X(Twitter)リンクの設定
    const twitterLinks = document.querySelectorAll('.link-twitter');
    twitterLinks.forEach(el => el.href = CONFIG.twitterUrl);

    // プランボタンのリンク設定
    const planLinks = document.querySelectorAll('.link-plan');
    planLinks.forEach(el => el.href = CONFIG.planLink);
});