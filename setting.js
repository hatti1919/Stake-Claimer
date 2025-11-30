const SUPABASE_URL = 'https://tntgjxlfaddyqvaxefll.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudGdqeGxmYWRkeXF2YXhlZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODc0ODQsImV4cCI6MjA4MDA2MzQ4NH0.WSRr0Z_4e68fNVHHaXGaC8HIPuX4KptxopIQmco4TBQ';

const CONFIG = {
    discordInviteUrl: "https://discord.gg/ueVedsjved",
    twitterUrl: "https://x.com/Stake_hatti"
};

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.addEventListener('DOMContentLoaded', () => {
    const twitterLinks = document.querySelectorAll('.link-twitter');
    twitterLinks.forEach(el => el.href = CONFIG.twitterUrl);
});
