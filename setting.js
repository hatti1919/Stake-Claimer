/* setting.js */
const TRANSLATIONS = {
    ja: {
        meta_description: "Stakeのボーナスコード取得を自動化。PC常時起動は不要、スマホだけで完結します。",
        nav_home: "Home", nav_terms: "利用規約", nav_usage: "使用方法", nav_law: "特商法表記",
        nav_history: "購入履歴", nav_contact: "お問い合わせ", nav_dashboard: "ダッシュボード", nav_logout: "ログアウト",
        login_btn: "Login", notif_title: "お知らせ", notif_empty: "通知はありません", notif_loading: "読み込み中...",
        notif_read: "既読", notif_mark_read: "既読にする", footer_back_home: "ホームに戻る",

        // index.html
        hero_desc1: "自分の時間を大切に。", hero_desc2: "迅速にコードを取得します。", hero_desc3: "スマホ一台で完結。",
        philosophy_title: "私たちの行動理念",
        philosophy_text: "ボーナスコードはランダムに落ちてきます。仕事中に降ってきたら、取れなくてイライラしますよね？<br><br>私たちは複雑な作業はすべて自動化し、<span class=\"highlight-text\">「シンプルかつ迅速」</span>に結果を提供します。<br><br>また、システム導入の手順は<span class=\"highlight-text\">完全に確立されています。</span><br>専門的な知識がなくても、安心してスムーズにご利用いただける環境を整えています。<br><br>最先端のスピードと信頼を、あなたの手に。",
        feature_title: "機能概要",
        feature_text: "<strong>🚀 常時起動は一切不要</strong><br>既存の自動化ツールは、PCを24時間つけっぱなしにする必要がありましたが、本ツールはその常識を覆しました。<br><br><strong>📱 スマホだけで完結</strong><br>設定はすべてブラウザ上で完了します。あなたのスマホやPCの電源を切っても、クラウド上のシステムが24時間365日、あなたの代わりにコードを取得し続けます。<br><br>高価なPCも、面倒な環境構築も必要ありません。",
        join_server: "サーバーに参加", buy_label: "購入する",
        faq_title: "よくある質問",
        q1: "支払い方法は何がありますか？", a1: "PayPay、カード、仮想通貨に対応しています。",
        q2: "導入は難しいですか？", a2: "いいえ、スマホのみで完結し、数分で設定可能です。専門知識は不要です。",
        q3: "サポートはどの時間でも対応していますか？", a3: "ほぼ、即答できると思います。",
        q4: "プランの延長などはどうすればいいですか？", a4: "ライセンスを追加購入してもらう形になります。",
        q5: "アカウントの凍結リスクはありますか？", a5: "基本的にないです。",
        q6: "ボーナスコードは全て取れますか？", a6: "ほとんど取れますが、リミットの低いものだと取れない時があります。",

        // 支払い
        pay_paypay: "PayPay", pay_card: "カード", pay_crypto: "仮想通貨", pay_soon: "カミングスーン",

        // purchase / checkout
        purchase_title: "購入手続き", plan_select: "プランを選択", payment_select: "支払い方法を選択", coupon_placeholder: "クーポンコード (任意)", checkout_btn: "注文へ進む",
        modal_err: "エラー", modal_login_req: "購入するにはログインしてください。", modal_confirm_title: "注文確認", modal_close: "閉じる",
        confirm_plan: "プラン", confirm_price: "定価", confirm_total: "支払額", confirm_pay: "支払う", confirm_back: "戻る",
        order_detail: "注文詳細", payment_title: "お支払い", pay_info: "以下のボタンから決済ページへ進んでください。", pay_link_btn: "支払う", waiting_pay: "入金待ち...", timer_label: "残り時間",
        success_title: "支払い完了！", key_issued: "ライセンスキーが発行されました。", use_now_btn: "今すぐ使う", view_usage_btn: "使い方を確認",
        pay_help_title: "支払いが完了されませんか？", pay_help_reload: "ページをリロード", pay_help_msg: "それでも改善されない場合",

        // dashboard
        dash_title: "ダッシュボード", status_title: "現在のステータス", plan_label: "現在のプラン", state_label: "状態", expiry_label: "有効期限",
        active_status: "有効", inactive_status: "無効", stake_link_title: "Stake アカウント連携", linked_acc_label: "登録済み", limit_label: "上限",
        add_acc_placeholder: "Stake API Key (例: c4f...)", link_btn: "連携する", delete_confirm: "本当に解除しますか？",
        activate_btn: "有効化する", license_placeholder: "XXXXX-XXXXX-XXXXX-DAYS", delete_btn: "解除", limit_reached: "連携上限に達しています",

        // terms.html 全文 (省略なし)
        terms_main_text: "この利用規約（以下，「本規約」といいます。）は，Stake Bonus Claimer（以下，「当サービス」といいます。）が提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。",
        terms_sec1: "第1条（適用）", terms_sec1_t: "本規約は，ユーザーと当サービスとの間の本サービスの利用に関わる一切の関係に適用されるものとします。",
        terms_sec2: "第2条（利用登録）", terms_sec2_t: "登録希望者が当サービスの定める方法によって利用登録を申請し，当サービスがこれを承認することによって，利用登録が完了するものとします。",
        terms_sec3_title: "第3条（禁止事項）", terms_sec3_intro: "ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。",
        terms_sec3_list: "<li>法令または公序良俗に違反する行為</li><li>犯罪行為に関連する行為</li><li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li><li>当サービス，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li><li>不正アクセスをし，またはこれを試みる行為</li><li>他のユーザーに成りすます行為</li><li>反社会的勢力に対して直接または間接に利益を供与する行為</li><li>その他，当サービスが不適切と判断する行為</li>",
        terms_sec4: "第4条（本サービスの提供の停止等）", terms_sec4_t1: "当サービスは，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。",
        terms_sec4_list: "<li>保守点検または更新を行う場合</li><li>地震，落雷，火災，停電または天災などの不可抗力により提供が困難となった場合</li><li>コンピュータ通信回線等が事故により停止した場合</li>",
        terms_sec4_t2: "当サービスは，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。",
        terms_sec5: "第5条（利用制限および登録抹消）", terms_sec5_t1: "当サービスは，ユーザーが規約のいずれかの条項に違反した場合、またはその他当サービスが本サービスの利用を適当でないと判断した場合には，事前の通知なく，本サービスの利用を制限し，または登録を抹消することができるものとします。",
        terms_sec5_t2: "当サービスは，本条に基づき当サービスが行った行為によりユーザーに生じた損害について，一切の責任を負いません。",
        terms_sec6: "第6条（免責事項）", terms_risk_title: "【重要】リスクに関する免責",
        terms_risk_text: "本サービスは，対象となるプラットフォーム（Stake.com等）の仕様変更や規約変更により，予告なく利用できなくなる可能性があります。<br>また，本ツールの利用により発生したアカウントの凍結（BAN）、資金の損失、利益の逸失、その他いかなる損害についても、当サービスは一切の責任を負いません。全ての利用はユーザー自身の判断と責任において行ってください。",
        terms_sec6_t2: "当サービスの債務不履行責任は，当サービスの故意または重過失によらない場合には免責されるものとします。",
        terms_sec7: "第7条（サービス内容の変更等）", terms_sec7_t: "当サービスは，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。",
        terms_sec8: "第8条（利用規約の変更）", terms_sec8_t: "当サービスは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。",
        terms_sec9: "第9条（返金ポリシー）", terms_sec9_t: "本サービスで提供される商品はデジタルコンテンツおよびソフトウェアライセンスであり、その性質上、購入後の返品・返金はいかなる理由（動作環境の不一致、期待した結果が得られなかった場合を含む）であっても対応いたしかねます。",
        terms_sec10: "第10条（準拠法・裁判管轄）", terms_sec10_t: "本規約の解釈にあたっては，日本法を準拠法とします。<br>本サービスに関して紛争が生じた場合には，当サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。",
        terms_last_update: "最終更新日: 2025年12月10日",

        // law.html 全文 (全12項目)
        law_row1_h: "販売業者の名称", law_row1_d: "hatti",
        law_row2_h: "所在地", law_row2_d: "請求があった場合は直ちに開示します",
        law_row3_h: "電話番号", law_row3_d: "請求があった場合は直ちに開示します<br><span style=\"font-size:0.8rem; color:#888;\">※お問い合わせはメールまたはDiscordチケットにて承ります。</span>",
        law_row4_h: "メールアドレス", law_row4_d: "stake-claimer@outlook.com",
        law_row5_h: "運営統括責任者", law_row5_d: "請求があった場合は直ちに開示します",
        law_row6_h: "販売価格", law_row6_d: "購入手続き画面に表示される価格（表示価格は消費税込み）とします。",
        law_row7_h: "商品代金以外の必要料金", law_row7_d: "インターネット接続料金、通信料金、および仮想通貨送金時のネットワーク手数料はお客様のご負担となります。",
        law_row8_h: "現在利用可能な支払方法", law_row8_d: "PayPay、カード、仮想通貨決済（oxapay）",
        law_row9_h: "代金の支払時期", law_row9_d: "購入申し込み時にお支払いいただきます。",
        law_row10_h: "商品の引渡時期", law_row10_d: "決済完了後、直ちにライセンスキーを発行・表示いたします。",
        law_row11_h: "返品・交換について", law_row11_d: "デジタルコンテンツという商品の性質上、決済完了後の返品・キャンセル・交換は原則としてお受けできません。<br>推奨環境や利用規約を十分にご確認の上、ご購入ください。",
        law_row12_h: "動作環境", law_row12_d: "インターネットに接続できるPCまたはスマートフォン。<br>その他詳細はトップページをご確認ください。",

        // usage.html 全文 (全STEP)
        usage_guide_title: "使用方法ガイド",
        u_step1_title: "ログイン",
        u_step1_t1: "ログインボタンをタップしログインをしてください。<br><a href=\"#\" class=\"link-text\" onclick=\"login()\">こちら</a>をクリックしてもログインできます。",
        u_step1_t2: "ボタンを押すとサイトに飛ぶので、そのサイトで、ディスコードのアカウントを使用して下記の画像の「認証」というところを押して認証してください。",
        u_step1_info: "Discordのアカウントをまだ持っていない方は <a href=\"https://discord.com/register\" target=\"_blank\" class=\"link-text\">こちら</a> をクリックして作成してください。",
        u_step2_title: "購入",
        u_step2_t1: "以下の「今すぐ購入」というところをタップしてご希望のプラン、お支払い方法を選択してください。",
        u_step2_btn: "<i class=\"fas fa-shopping-cart\"></i> 今すぐ購入",
        u_step2_t2: "あればクーポンコードを入力してください。",
        u_step2_t3: "そして、「注文へ進む」というボタンをクリックしてください。",
        u_step2_t4: "利用規約に同意するという所にチェックして、「支払う」というボタンをクリックしてください。<br>そうすると、画面が切り替わって、チェックアウトのところに飛ばされると思います。",
        u_step2_t5: "「支払う」というボタンをクリックすると外部サイトに飛びますので、ご都合の良い通貨を選択して、お支払いを完了させてください。",
        u_step2_alert_title: "注意",
        u_step2_alert_text: "残り時間以内に入金をせず、時間切れになって入金をしてしまうとこちらにお金が一切入ってきませんので、保証ができません。<br><br><strong>資金の損失につながりますので、すぐに購入できるタイミングでお支払いしてください。</strong><br>また、これをしてしまってライセンスキーが届かなくても保証は出来かねます。ご了承ください。",
        u_step2_info: "また、画面を間違って消してしまった場合でも「購入履歴を確認」からチェックアウトページに飛べます。<br><a href=\"history.html\" class=\"link-text\">こちら</a> をクリックしても確認できます。",
        u_step3_title: "導入",
        u_step3_t1: "お支払いが完了いたしますとライセンスキーが発行されます。<br><span style=\"font-size: 0.9em; color: #aaa;\">※もし支払いを完了したのに発行されない場合は下のボタンからサポートにお問い合わせしてください。</span>",
        u_step3_contact_btn: "お問い合わせ",
        u_step3_t2: "そして「今すぐ利用」と書かれているボタンをタップしてください。",
        u_step3_t3: "そうすると、ダッシュボードに飛びます。<br>ダッシュボードに飛びましたら、先ほど購入したライセンスキーを入力してください。",
        u_step3_t4: "ライセンスキーを入力すると権限が付与されると思います。<br>付与されない場合は <a href=\"contact.html\" class=\"link-text\">お問い合わせ</a> してください。",
        u_step3_t5: "このように出ましたら、権限が付与されました。次にStakeのAPIkeyを入力してください。",
        u_step3_api_btn: "API取得する <i class=\"fas fa-external-link-alt\" style=\"font-size: 0.8em;\"></i>",
        u_step3_t6: "こちらをクリックしていただくとAPIを取得する画面に飛ぶと思います。表示というボタンを押していただいてコピーしてください。",
        u_step3_t7: "それができましたら、先ほど取得したStakeのAPIkeyを入力してください。<br>APIの入力が完了してアカウントが追加されたら、完了です。",
        u_owner_req_title: "オーナーからのお願い",
        u_owner_req_text: "購入してください！笑",
        u_owner_buy_btn: "今すぐ購入する"
    },
    en: {
        meta_description: "Automate your Stake bonus code claims. No 24/7 PC uptime required—manage everything seamlessly from your smartphone.",
        nav_home: "Home", nav_terms: "Terms", nav_usage: "Usage", nav_law: "Legal",
        nav_history: "History", nav_contact: "Contact", nav_dashboard: "Dashboard", nav_logout: "Logout",
        login_btn: "Login", notif_title: "Notifications", notif_empty: "No notifications",
        notif_read: "Read", notif_mark_read: "Mark as read", footer_back_home: "Back to Home",

        // index.html
        hero_desc1: "Value your time.", hero_desc2: "Claim codes instantly.", hero_desc3: "Smartphone only.",
        philosophy_title: "Our Philosophy",
        philosophy_text: "Bonus codes drop randomly. Missing them while working is frustrating, right?<br><br>We automate all complex tasks to provide <span class=\"highlight-text\">\"Simple & Fast\"</span> results.<br><br>Our setup process is <span class=\"highlight-text\">fully established.</span><br>We provide an environment where you can use it smoothly even without technical knowledge.<br><br>Cutting-edge speed and reliability in your hands.",
        feature_title: "Key Features",
        feature_text: "<strong>🚀 Zero Hardware Dependency</strong><br>Existing automation tools required a PC running 24/7. Our system shatters that rule. We handle everything on our cloud servers.<br><br><strong>📱 100% Mobile Setup</strong><br>All configurations are done in your browser. Once set up, our cloud claims codes for you 24/7/365, even if your phone is off.<br><br>No expensive hardware, no complex setup required.",
        join_server: "Join Our Server", buy_label: "Buy Now",
        faq_title: "FAQ",
        q1: "What payment methods are available?", a1: "We support PayPay, Card, and Cryptocurrency.",
        q2: "Is setup difficult?", a2: "No, it takes only a few minutes on your smartphone. No technical skills needed.",
        q3: "Support hours?", a3: "I should be able to answer almost immediately during active hours.",
        q4: "How to extend plan?", a4: "Simply purchase an additional license key to extend your service.",
        q5: "Risk of account ban?", a5: "Safety is our priority; the risk is minimal under normal usage.",
        q6: "Claims every code?", a6: "Most are captured, though extremely low-limit ones may be missed due to latency.",

        // Payment
        pay_paypay: "PayPay", pay_card: "Credit Card", pay_crypto: "Cryptocurrency", pay_soon: "Coming Soon",

        // purchase / checkout
        purchase_title: "Checkout", plan_select: "Select Plan", payment_select: "Payment Method", checkout_btn: "Proceed",
        modal_err: "Error", modal_login_req: "Please login to purchase.", modal_confirm_title: "Order Details", modal_close: "Close",
        confirm_plan: "Plan", confirm_price: "Price", confirm_total: "Total", confirm_pay: "Pay Now", confirm_back: "Back",
        order_detail: "Order Summary", payment_title: "Secure Payment", pay_info: "Click the button below to proceed to the secure payment page.", pay_link_btn: "Pay Now", waiting_pay: "Verifying...", timer_label: "Remaining",
        success_title: "Success!", key_issued: "License key generated.", use_now_btn: "Use Now", view_usage_btn: "View Guide",
        pay_help_title: "Payment not completing?", pay_help_reload: "Reload Page", pay_help_msg: "If still not fixed,",

        // terms (Full English)
        terms_main_text: "These Terms of Service (hereinafter 'Terms') define the usage conditions of the Service provided by Stake Bonus Claimer. Registered users agree to these Terms by using the Service.",
        terms_sec1: "Article 1 (Scope)", terms_sec1_t: "These Terms apply to all relationships between Users and the Service Provider.",
        terms_sec2: "Article 2 (Registration)", terms_sec2_t: "Registration is complete when an applicant applies and the Service Provider approves.",
        terms_sec3_title: "Article 3 (Prohibited)", terms_sec3_intro: "Users must not engage in the following acts:",
        terms_sec3_list: "<li>Violating laws or public order</li><li>Criminal acts</li><li>Infringing intellectual property</li><li>Server disruption</li><li>Unauthorized access</li><li>Impersonation</li>",
        terms_sec4: "Article 4 (Suspension)", terms_sec4_t1: "We may suspend service without notice for maintenance, force majeure, or accidents.",
        terms_sec4_list: "<li>Maintenance or system updates</li><li>Force majeure (earthquake, fire, etc.)</li><li>Communication line accidents</li>",
        terms_sec4_t2: "The Provider is not liable for disadvantages caused by suspension of service.",
        terms_sec5: "Article 5 (Restriction)", terms_sec5_t1: "We may restrict service or delete registration without notice if terms are violated.",
        terms_sec6: "Article 6 (Disclaimer)", terms_risk_title: "[Important] Risk Acknowledgement",
        terms_risk_text: "The Service may become unavailable due to platform changes. We are not responsible for account bans (BAN), fund loss, or any damages. Use at your own risk.",
        terms_sec7: "Article 7 (Modifications)", terms_sec7_t: "We may change or stop service without notice and aren't liable for damages caused.",
        terms_sec8: "Article 8 (Changes to Terms)", terms_sec8_t: "We may change terms at any time. Continued use after changes implies agreement.",
        terms_sec9: "Article 9 (Refund Policy)", terms_sec9_t: "Due to the digital nature of software licenses, all sales are final. No refunds or returns.",
        terms_sec10: "Article 10 (Law)", terms_sec10_t: "These Terms shall be interpreted in accordance with Japanese law.",
        terms_last_update: "Last Updated: Dec 10, 2025",

        // law (Full English)
        law_title: "Legal Notice",
        law_row1_h: "Seller Name", law_row1_d: "hatti",
        law_row2_h: "Location", law_row2_d: "Disclosed immediately upon request",
        law_row3_h: "Phone Number", law_row3_d: "Disclosed immediately upon request<br><span style=\"font-size:0.8rem; color:#888;\">*Contact via Email or Discord.</span>",
        law_row4_h: "Email Address", law_row4_d: "stake-claimer@outlook.com",
        law_row5_h: "Manager", law_row5_d: "Disclosed immediately upon request",
        law_row6_h: "Price", law_row6_d: "As indicated on checkout page (tax incl.)",
        law_row7_h: "Extra Fees", law_row7_d: "Customer pays for internet and crypto network fees.",
        law_row8_h: "Payments", law_row8_d: "PayPay, Card, Cryptocurrency (via oxapay)",
        law_row9_h: "Timing", law_row9_d: "Payment required at the time of order.",
        law_row10_h: "Delivery", law_row10_d: "License key is issued immediately after payment.",
        law_row11_h: "Returns/Refunds", law_row11_d: "No returns or refunds after payment due to digital nature.",
        law_row12_h: "Environment", law_row12_d: "PC or Smartphone with internet. See home page.",

        // usage (Full English)
        usage_guide_title: "Setup Guide",
        u_step1_title: "Authentication", u_step1_t1: "Tap login and authorize via Discord.<br><a href=\"#\" class=\"link-text\" onclick=\"login()\">Click here</a> to login.",
        u_step1_t2: "Authorize using your Discord profile by clicking 'Authorize'.",
        u_step1_info: "Create a Discord account <a href=\"https://discord.com/register\" target=\"_blank\">here</a>.",
        u_step2_title: "Purchase", u_step2_t1: "Select plan and payment via 'Buy Now' button.", u_step2_btn: "Buy Now",
        u_step2_alert_title: "Caution", u_step2_alert_text: "Pay within the time limit. Expired payments cannot be guaranteed. <strong>Risk of fund loss.</strong>",
        u_step3_title: "Setup", u_step3_t1: "License key is issued after payment. Contact support if missing.",
        u_step3_t7: "Setup complete once API is entered and account is added.",
        u_owner_req_title: "From Developer", u_owner_req_text: "Please buy it! lol", u_owner_buy_btn: "Buy Now"
    }
};

const CONFIG = { siteName: "Stake Bonus Claimer", siteUrl: "https://stake-claimer.com", discordInviteUrl: "https://discord.gg/ueVedsjved", twitterUrl: "https://x.com/Stake_hatti" };

let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('ja') ? 'ja' : 'en');
function t(key) { return TRANSLATIONS[currentLang][key] || key; }
window.setLanguage = (l) => { localStorage.setItem('lang', l); location.reload(); };

/* 言語セレクター（バグ修正済：HeaderとFooterでIDを分離） */
function getLangHTML(idSuffix) {
    return `
    <div class="lang-selector-custom" onclick="toggleLangMenu('${idSuffix}')">
        <i class="fa-solid fa-language" style="font-size:1.1rem;"></i>
        <span>${currentLang === 'ja' ? '日本語' : 'English'}</span>
        <i class="fa-solid fa-chevron-down" style="font-size:0.6rem; opacity:0.7;"></i>
        <div id="lang-menu-${idSuffix}" class="lang-dropdown">
            <div onclick="setLanguage('ja')">日本語</div>
            <div onclick="setLanguage('en')">English</div>
        </div>
    </div>`;
}

const HEADER_HTML = `
<nav class="sticky-nav">
    <div class="nav-left">
        <div class="mobile-menu-btn" onclick="toggleMobileNav()"><i class="fa-solid fa-bars"></i></div>
        <a href="/" class="nav-link" data-i18n="nav_home">${t('nav_home')}</a>
        <a href="/terms" class="nav-link" data-i18n="nav_terms">${t('nav_terms')}</a>
        <a href="/usage" class="nav-link" data-i18n="nav_usage">${t('nav_usage')}</a>
    </div>
    <div class="nav-right">
        ${getLangHTML('header')}
        <div class="nav-divider-v"></div> <div style="position:relative;">
            <div class="notification-btn" onclick="toggleNotifPopup()" style="color: white;"><i class="fa-solid fa-bell"></i><span class="badge" id="notif-badge" style="display:none; background: #ff4444;"></span></div>
            <div id="notif-popup" class="notif-popup">
                <div style="padding:15px; border-bottom:1px solid #222; font-weight:bold; color:#00E701; display:flex; justify-content:space-between; position:sticky; top:0; background:#111; z-index:10; align-items:center;"><span data-i18n="notif_title"><i class="fa-solid fa-inbox"></i> ${t('notif_title')}</span><span onclick="toggleNotifPopup()" style="cursor:pointer; color:#666; font-size:1.2rem;">&times;</span></div>
                <div id="notif-list"><div class="notif-empty" data-i18n="notif_loading">${t('notif_loading')}</div></div>
            </div>
        </div>
        <div class="nav-divider"></div>
        <div id="auth-container"></div>
    </div>
</nav>
<div id="mobile-nav" class="mobile-nav-overlay"><a href="/" class="mobile-nav-link" data-i18n="nav_home">${t('nav_home')}</a><a href="/terms" class="mobile-nav-link" data-i18n="nav_terms">${t('nav_terms')}</a><a href="/usage" class="mobile-nav-link" data-i18n="nav_usage">${t('nav_usage')}</a><a href="/law" class="mobile-nav-link" data-i18n="nav_law">${t('nav_law')}</a><div style="padding:20px; text-align:center;">${getLangHTML('mobile')}</div></div>`;

const FOOTER_HTML = `
<footer class="footer-wrapper"><div class="footer-content"><div class="footer-links"><a href="/terms" data-i18n="nav_terms">${t('nav_terms')}</a><a href="/law" data-i18n="nav_law">${t('nav_law')}</a><a href="/usage" data-i18n="nav_usage">${t('nav_usage')}</a><a href="/" data-i18n="footer_back_home">${t('footer_back_home')}</a></div><div style="margin:10px 0; text-align:center;">${getLangHTML('footer')}</div><div class="footer-icons"><a href="${CONFIG.discordInviteUrl}" target="_blank"><i class="fa-brands fa-discord"></i></a><a href="${CONFIG.twitterUrl}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></div></div><div class="footer-copyright">© ${CONFIG.siteName}</div></footer>`;

function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); el.innerHTML = t(k); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const k = el.getAttribute('data-i18n-placeholder'); el.placeholder = t(k); });
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.name = "description"; meta.content = t('meta_description'); document.head.appendChild(meta);
}

const EXTRA_STYLE = `
.lang-selector-custom { position: relative; cursor: pointer; background: #000; color: #00E701; border: 1px solid #333; padding: 6px 12px; border-radius: 4px; font-size: 0.85rem; margin-right: 15px; display: flex; align-items: center; gap: 8px; user-select: none; transition: 0.2s; }
.lang-selector-custom:hover { border-color: #00E701; }
.lang-dropdown { display: none; position: absolute; top: calc(100% + 5px); left: 0; background: #111; border: 1px solid #333; width: 100%; min-width: 100px; z-index: 100; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
.lang-dropdown div { padding: 10px; text-align: center; color: #ccc; }
.lang-dropdown div:hover { background: #00E701; color: #000; font-weight: bold; }
.lang-dropdown.show { display: block; }
.nav-divider-v { width: 1px; height: 18px; background: #444; margin-right: 15px; }
.notification-btn:hover { color: #00E701; transition: 0.2s; }
`;
const styleSheet = document.createElement("style"); styleSheet.innerText = EXTRA_STYLE; document.head.appendChild(styleSheet);

let currentUser = null;
window.addEventListener('DOMContentLoaded', async () => {
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
    document.body.insertAdjacentHTML('beforeend', `<div id="global-modal-overlay" class="global-modal-overlay"><div class="global-modal-box"><div id="g-modal-title" class="global-modal-title"></div><div id="g-modal-body" class="global-modal-body"></div><div id="g-modal-actions" class="global-modal-actions"></div></div></div>`);
    applyI18n();
    try {
        await initSupabase();
        const { data: { session } } = await window.supabaseApp.auth.getSession();
        if (session) handleLoginSuccess(session); else showLoginButton();
        window.supabaseApp.auth.onAuthStateChange((_, s) => { if (s) handleLoginSuccess(s); else showLoginButton(); });
    } catch (e) { showLoginButton(); }
});

window.toggleLangMenu = (idSuffix) => {
    document.querySelectorAll('.lang-dropdown').forEach(d => { if (d.id !== 'lang-menu-' + idSuffix) d.classList.remove('show'); });
    document.getElementById('lang-menu-' + idSuffix).classList.toggle('show');
};
window.initSupabase = async () => { if (window.supabaseApp) return window.supabaseApp; const res = await fetch('/api/config'); const env = await res.json(); window.TURNSTILE_SITE_KEY = env.TURNSTILE_SITE_KEY; window.supabaseApp = window.supabase.createClient(env.SUPABASE_URL, env.SUPABASE_KEY); return window.supabaseApp; };
function handleLoginSuccess(s) {
    currentUser = s.user; const c = document.getElementById('auth-container');
    if (c) c.innerHTML = `<div style="position:relative;"><img src="${currentUser.user_metadata.avatar_url}" class="user-avatar-nav" onclick="toggleUserMenu()"><div id="user-menu" class="dropdown-menu"><a href="/history" class="menu-item"><i class="fa-solid fa-clock-rotate-left" style="color:#00E701; margin-right:8px;"></i>${t('nav_history')}</a><a href="/contact" class="menu-item"><i class="fa-solid fa-envelope" style="color:#00E701; margin-right:8px;"></i>${t('nav_contact')}</a><a href="/dashboard" class="menu-item"><i class="fa-solid fa-gauge-high" style="color:#00E701; margin-right:8px;"></i>${t('nav_dashboard')}</a><div class="menu-item" onclick="logout()" style="color:#ff4444; border-top:1px solid #333; cursor:pointer;"><i class="fa-solid fa-right-from-bracket" style="margin-right:8px;"></i>${t('nav_logout')}</div></div></div>`;
    checkNotifications(currentUser.id);
}
async function checkNotifications(uid) {
    try {
        const res = await fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ user_id: uid, action: 'get' }) });
        const ns = await res.json(); const b = document.getElementById('notif-badge'); const l = document.getElementById('notif-list');
        if (b) { const unread = ns.filter(n => !n.is_read).length; b.style.display = unread > 0 ? 'flex' : 'none'; b.innerText = unread; }
        if (l) { if (ns.length > 0) { l.innerHTML = ""; ns.forEach(n => { const act = n.is_read ? `<span style="color:#555;font-size:0.7rem;">${t('notif_read')}</span>` : `<span onclick="markAsRead('${n.id}','${uid}')" style="color:#00E701;font-size:0.7rem;cursor:pointer;text-decoration:underline;">${t('notif_mark_read')}</span>`; l.innerHTML += `<div class="notif-item" style="opacity:${n.is_read ? 0.5 : 1}"><div style="display:flex; justify-content:space-between;"><b>${n.title}</b>${act}</div><div style="font-size:0.8rem; color:#ccc;">${n.message.replace(/\n/g, '<br>')}</div></div>`; }); } else l.innerHTML = `<div class="notif-empty">${t('notif_empty')}</div>`; }
    } catch (e) { }
}
window.markAsRead = async (id, uid) => { try { await fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ action: 'read', id, user_id: uid }) }); checkNotifications(uid); } catch (e) { } };
function showLoginButton() { const c = document.getElementById('auth-container'); if (c) c.innerHTML = `<button onclick="login()" class="login-btn-nav">${t('login_btn')}</button>`; }
window.login = async () => { await window.supabaseApp.auth.signInWithOAuth({ provider: 'discord' }); };
window.logout = async () => { await window.supabaseApp.auth.signOut(); location.href = "/"; };
window.showModal = (title, msg, btns = []) => { const o = document.getElementById('global-modal-overlay'), t_el = document.getElementById('g-modal-title'), b = document.getElementById('g-modal-body'), a = document.getElementById('g-modal-actions'); t_el.innerText = title; b.innerHTML = msg; a.innerHTML = ''; if (btns.length === 0) { const btn = document.createElement('button'); btn.className = 'g-modal-btn g-btn-secondary'; btn.innerText = currentLang === 'ja' ? '閉じる' : 'Close'; btn.onclick = closeModal; a.appendChild(btn); } else btns.forEach(opt => { const btn = document.createElement('button'); btn.className = `g-modal-btn ${opt.class || 'g-btn-secondary'}`; btn.innerText = opt.text; btn.onclick = opt.onClick; a.appendChild(btn); }); o.classList.add('show'); };
window.closeModal = () => document.getElementById('global-modal-overlay').classList.remove('show');
window.toggleUserMenu = () => document.getElementById('user-menu')?.classList.toggle('show');
window.toggleNotifPopup = () => document.getElementById('notif-popup')?.classList.toggle('show');
window.toggleMobileNav = () => document.getElementById('mobile-nav')?.classList.toggle('show');