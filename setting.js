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
        pay_paypay: "PayPay", pay_card: "Card", pay_crypto: "仮想通貨", pay_soon: "Coming Soon",

        // purchase / checkout
        purchase_title: "購入手続き", plan_select: "プランを選択", payment_select: "支払い方法を選択", coupon_placeholder: "クーポンコード (任意)", checkout_btn: "注文へ進む",
        modal_err: "エラー", modal_login_req: "ログインしてください", modal_confirm_title: "注文確認", modal_close: "閉じる",
        confirm_plan: "プラン", confirm_price: "定価", confirm_total: "支払額", confirm_pay: "支払う", confirm_back: "戻る",
        order_detail: "注文詳細", payment_title: "お支払い", pay_info: "以下のボタンから決済ページへ進んでください。", pay_link_btn: "支払う", waiting_pay: "入金待ち...", timer_label: "残り時間",
        success_title: "支払い完了！", key_issued: "ライセンスキーが発行されました。", use_now_btn: "今すぐ使う", view_usage_btn: "使い方を確認",
        pay_help_title: "支払いが完了されませんか？", pay_help_reload: "ページをリロード", pay_help_msg: "それでも改善されない場合",

        // dashboard
        dash_title: "ダッシュボード", status_title: "現在のステータス", plan_label: "現在のプラン", state_label: "状態", expiry_label: "有効期限",
        active_status: "有効", inactive_status: "無効", stake_link_title: "Stake アカウント連携", linked_acc_label: "登録済み", limit_label: "上限",
        add_acc_placeholder: "Stake API Key (例: c4f...)", link_btn: "連携する", delete_confirm: "本当に解除しますか？",
        activate_btn: "有効化する", license_placeholder: "XXXXX-XXXXX-XXXXX-DAYS", delete_btn: "解除", limit_reached: "連携上限に達しています",

        // terms.html 全文
        terms_main_text: "この利用規約（以下，「本規約」といいます。）は，Stake Bonus Claimer（以下，「当サービス」といいます。）が提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。",
        terms_sec1: "第1条（適用）", terms_sec1_t: "本規約は，ユーザーと当サービスとの間の本サービスの利用に関わる一切の関係に適用されるものとします。",
        terms_sec2: "第2条（利用登録）", terms_sec2_t: "登録希望者が当サービスの定める方法によって利用登録を申請し，当サービスがこれを承認することによって，利用登録が完了するものとします。",
        terms_sec3_title: "第3条（禁止事項）", terms_sec3_intro: "ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。",
        terms_sec3_list: "<li>法令または公序良俗に違反する行為</li><li>犯罪行為に関連する行為</li><li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li><li>当サービス，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li><li>本サービスの運営を妨害するおそれのある行為</li><li>不正アクセスをし，またはこれを試みる行為</li><li>他のユーザーに成りすます行為</li><li>本サービスの他のユーザーに関する個人情報等を収集または蓄積する行為</li><li>当サービスのサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li><li>その他，当サービスが不適切と判断する行為</li>",
        terms_sec4: "第4条（本サービスの提供の停止等）", terms_sec4_t1: "当サービスは，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。",
        terms_sec4_list: "<li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li><li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li><li>コンピュータまたは通信回線等が事故により停止した場合</li><li>その他，当サービスが本サービスの提供が困難と判断した場合</li>",
        terms_sec4_t2: "当サービスは，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。",
        terms_sec5: "第5条（利用制限および登録抹消）", terms_sec5_t1: "当サービスは，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。",
        terms_sec5_list: "<li>本規約のいずれかの条項に違反した場合</li><li>その他，当サービスが本サービスの利用を適当でないと判断した場合</li>",
        terms_sec5_t2: "当サービスは，本条に基づき当サービスが行った行為によりユーザーに生じた損害について，一切の責任を負いません。",
        terms_sec6: "第6条（免責事項）", terms_risk_title: "【重要】リスクに関する免責",
        terms_risk_text: "本サービスは，対象となるプラットフォーム（Stake.com等）の仕様変更や規約変更により，予告なく利用できなくなる可能性があります。<br>また，本ツールの利用により発生したアカウントの凍結（BAN）、資金の損失、利益の逸失、その他いかなる損害についても、当サービスは一切の責任を負いません。全ての利用はユーザー自身の判断と責任において行ってください。",
        terms_sec6_t2: "当サービスの債務不履行責任は，当サービスの故意または重過失によらない場合には免責されるものとします。",
        terms_sec7: "第7条（サービス内容の変更等）", terms_sec7_t: "当サービスは，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。",
        terms_sec8: "第8条（利用規約の変更）", terms_sec8_t: "当サービスは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。",
        terms_sec9: "第9条（返金ポリシー）", terms_sec9_t: "本サービスで提供される商品はデジタルコンテンツおよびソフトウェアライセンスであり、その性質上、購入後の返品・返金はいかなる理由（動作環境の不一致、期待した結果が得られなかった場合を含む）であっても対応いたしかねます。",
        terms_sec10: "第10条（準拠法・裁判管轄）", terms_sec10_t: "本規約の解釈にあたっては，日本法を準拠法とします。<br>本サービスに関して紛争が生じた場合には，当サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。",
        terms_last_update: "最終更新日: 2025年12月10日",

        // law.html 全文
        law_title: "特定商取引法に基づく表記",
        law_row1_h: "販売業者の名称", law_row1_d: "hatti",
        law_row2_h: "所在地", law_row2_d: "請求があった場合は直ちに開示します",
        law_row3_h: "電話番号", law_row3_d: "請求があった場合は直ちに開示します<br><span style=\"font-size:0.8rem; color:#888;\">※お問い合わせはメールまたはDiscordチケットにて承ります。</span>",
        law_row4_h: "メールアドレス", law_row4_d: "stake-claimer@outlook.com",
        law_row5_h: "運営統括責任者", law_row5_d: "請求があった場合は直ちに開示します",
        law_row6_h: "販売価格", law_row6_d: "購入手続き画面に表示される価格（表示価格は消費税込み）とします。",
        law_row7_h: "商品代金以外の必要料金", law_row7_d: "インターネット接続料金、通信料金、および仮想通貨送金時のネットワーク手数料はお客様のご負担となります。",
        law_row8_h: "現在利用可能な支払方法", law_row8_d: "仮想通貨決済（oxapay）",
        law_row9_h: "代金の支払時期", law_row9_d: "購入申し込み時にお支払いいただきます。",
        law_row10_h: "商品の引渡時期", law_row10_d: "決済完了後、直ちにライセンスキーを発行・表示いたします。",
        law_row11_h: "返品・交換について", law_row11_d: "デジタルコンテンツという商品の性質上、決済完了後の返品・キャンセル・交換は原則としてお受けできません。<br>推奨環境や利用規約を十分にご確認の上、ご購入ください。",
        law_row12_h: "動作環境", law_row12_d: "インターネットに接続できるPCまたはスマートフォン。<br>その他詳細はトップページをご確認ください。",

        // usage.html 全文
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
        nav_home: "Home", nav_terms: "Terms of Service", nav_usage: "How to Use", nav_law: "Legal Notice",
        nav_history: "Order History", nav_contact: "Contact Support", nav_dashboard: "Dashboard", nav_logout: "Sign Out",
        login_btn: "Login via Discord", notif_title: "Notifications", notif_empty: "No new notifications found", notif_loading: "Synchronizing data...",
        notif_read: "Read", notif_mark_read: "Mark as read", footer_back_home: "Back to Home",

        // index.html
        hero_desc1: "Don't let your time be dictated by random drops.", hero_desc2: "Experience industry-leading speed in code acquisition.", hero_desc3: "Fully managed via our cloud-based mobile interface.",
        philosophy_title: "Our Core Philosophy",
        philosophy_text: "Bonus codes drop at the most unpredictable moments. It’s incredibly frustrating to miss a reward just because you were busy at work, right?<br><br>We handle the complexity behind the scenes to deliver a <span class=\"highlight-text\">\"Simple & Fast\"</span> experience for every user.<br><br>Our integration process is <span class=\"highlight-text\">fully standardized and secure.</span><br>Even if you have zero technical background, our environment is built for you to start smoothly and with total confidence.<br><br>Put professional-grade speed and reliability in the palm of your hand.",
        feature_title: "Key Features",
        feature_text: "<strong>🚀 Zero Hardware Dependency</strong><br>Conventional automation tools required a PC running 24/7. Our system shatters that rule. We handle the heavy lifting on our high-speed servers.<br><br><strong>📱 100% Mobile-Friendly Setup</strong><br>All configurations are performed directly within your mobile browser. Once set up, our cloud engine monitors and claims codes for you 24/7/365, even if your phone is powered off.<br><br>No expensive hardware, no complex environments—just results.",
        join_server: "Join Our Discord Community", buy_label: "Purchase Now",
        faq_title: "Frequently Asked Questions",
        q1: "What payment methods do you accept?", a1: "We support PayPay, Credit Cards, and various Cryptocurrencies.",
        q2: "Is the initial setup difficult?", a2: "Not at all. It's designed for mobile use and typically takes less than 5 minutes. No technical expertise required.",
        q3: "How responsive is your support team?", a3: "We pride ourselves on speed and strive to answer almost immediately during active hours.",
        q4: "How do I extend my current plan?", a4: "Simply purchase an additional license key to extend your service period.",
        q5: "Is there a risk of my account being banned?", a5: "We prioritize safety; the risk of restriction is minimal to non-existent under normal usage.",
        q6: "Can the tool claim every single code?", a6: "While we capture the vast majority, codes with extremely low claim limits may be missed due to unavoidable network latency.",

        // purchase / checkout
        pay_paypay: "PayPay", pay_card: "Credit Card", pay_crypto: "Crypto", pay_soon: "Coming Soon",
        purchase_title: "Secure Checkout", plan_select: "1. Select Plan", payment_select: "2. Payment Method", coupon_placeholder: "Coupon Code (Optional)", checkout_btn: "Proceed to Order Confirmation",
        modal_err: "System Error", modal_login_req: "Login Required", modal_confirm_title: "Confirm Your Order", modal_close: "Close",
        confirm_plan: "Plan", confirm_price: "List Price", confirm_total: "Amount Due", confirm_pay: "Pay Now", confirm_back: "Go Back",
        order_detail: "Order Summary", payment_title: "Secure Payment", pay_info: "Click the button below to be redirected to our secure payment processing page.", pay_link_btn: "Pay with Selected Method", waiting_pay: "Verifying your transaction...", timer_label: "Session expires in",
        success_title: "Payment Confirmed!", key_issued: "Your unique license key has been generated.", use_now_btn: "Activate Now", view_usage_btn: "View Setup Guide",
        pay_help_title: "Is your payment not reflecting?", pay_help_reload: "Refresh Status", pay_help_msg: "If the issue persists, please reach out to our support team.",

        // dashboard
        dash_title: "User Dashboard", status_title: "Current Status", plan_label: "Subscription Plan", state_label: "Status", expiry_label: "Expiration Date",
        active_status: "ACTIVE", inactive_status: "INACTIVE", stake_link_title: "Stake Account Integration", linked_acc_label: "Linked Accounts", limit_label: "Maximum Limit",
        add_acc_placeholder: "Paste Stake API Key (e.g., c4f...)", link_btn: "Link Account", delete_confirm: "Are you sure you want to disconnect this account?",
        activate_btn: "Activate License", license_placeholder: "XXXXX-XXXXX-XXXXX-DAYS", delete_btn: "Remove", limit_reached: "Account limit reached",

        // terms.html Full
        terms_main_text: "These Terms of Service (hereinafter 'Terms') define the usage conditions of the services provided by Stake Bonus Claimer (hereinafter 'the Service'). By accessing or using the Service, registered users (hereinafter 'Users') agree to abide by these Terms in their entirety.",
        terms_sec1: "Article 1 (Scope of Agreement)", terms_sec1_t: "These Terms apply to all interactions, transactions, and service usage between the User and the Service Provider.",
        terms_sec2: "Article 2 (User Registration)", terms_sec2_t: "Registration is considered complete when an applicant applies via the prescribed method and the Service Provider formally approves the request.",
        terms_sec3_title: "Article 3 (Prohibited Conduct)", terms_sec3_intro: "In using the Service, Users must not engage in any of the following acts:",
        terms_sec3_list: "<li>Violating laws, regulations, or public policy.</li><li>Activities related to criminal or fraudulent acts.</li><li>Infringing upon copyrights, trademarks, or intellectual property rights contained within the Service.</li><li>Interfering with or disrupting the functionality of servers or networks.</li><li>Actions that may obstruct the operation of the Service.</li><li>Unauthorized access or attempting to circumvent system security.</li><li>Impersonation of other users or third parties.</li><li>Collecting or storing personal information of other Users without authorization.</li><li>Providing benefits to anti-social forces or criminal organizations.</li><li>Any other conduct deemed inappropriate by the Service Provider.</li>",
        terms_sec4: "Article 4 (Suspension of Service)", terms_sec4_t1: "The Service Provider may suspend or interrupt all or part of the Service without prior notice in the following cases:",
        terms_sec4_list: "<li>Performing maintenance, inspection, or updates of computer systems.</li><li>Force majeure events such as earthquakes, lightning, fire, power outages, or natural disasters.</li><li>Accidental stoppage of computers or communication lines.</li><li>Any other situation where the Service Provider deems delivery of the Service impossible.</li>",
        terms_sec4_t2: "The Service Provider assumes no liability for any disadvantage or damage incurred by the User or third parties due to the suspension or interruption of the Service.",
        terms_sec5: "Article 5 (Restriction of Use and Deletion of Registration)", terms_sec5_t1: "The Service Provider may, without prior notice, restrict the use of the Service or delete a User's registration if the User meets any of the following criteria:",
        terms_sec5_list: "<li>Violation of any provision within these Terms.</li><li>Any other situation where the Service Provider deems the User's use of the Service inappropriate.</li>",
        terms_sec5_t2: "The Service Provider assumes no responsibility for damages caused to the User by actions taken under this Article.",
        terms_sec6: "Article 6 (Disclaimer of Liability)", terms_risk_title: "[Important] Risk Acknowledgement",
        terms_risk_text: "The Service may become unavailable without prior notice due to specification or policy changes on the target platforms (Stake.com, etc.).<br>Furthermore, the Service Provider assumes no liability for account restrictions (bans), loss of funds, loss of potential profit, or any other damages incurred through the use of this tool. All use is strictly at the User's own risk and responsibility.",
        terms_sec6_t2: "The Service Provider's liability for breach of contract is waived unless caused by intentional misconduct or gross negligence.",
        terms_sec7: "Article 7 (Modification of Service)", terms_sec7_t: "The Service Provider may modify or terminate the Service without prior notice and assumes no liability for any resulting damages.",
        terms_sec8: "Article 8 (Changes to Terms of Service)", terms_sec8_t: "The Service Provider may modify these Terms at any time without prior notice. Continued use of the Service after such modifications indicates agreement to the updated Terms.",
        terms_sec9: "Article 9 (Refund Policy)", terms_sec9_t: "Due to the irreversible nature of digital content and software licenses, all sales are final. No refunds or exchanges will be granted for any reason (including technical incompatibility or failure to achieve expected results) after the transaction is complete.",
        terms_sec10: "Article 10 (Governing Law and Jurisdiction)", terms_sec10_t: "These Terms shall be interpreted in accordance with Japanese law.<br>In the event of a dispute, the court having jurisdiction over the location of the Service Provider's head office shall be the exclusive court of jurisdiction.",
        terms_last_update: "Last Updated: December 10, 2025",

        // law.html Full
        law_title: "Legal Notice (Act on Specified Commercial Transactions)",
        law_row1_h: "Distributor Name", law_row1_d: "hatti",
        law_row2_h: "Business Location", law_row2_d: "Full details disclosed immediately upon valid request",
        law_row3_h: "Phone Number", law_row3_d: "Full details disclosed immediately upon valid request<br><span style=\"font-size:0.8rem; color:#888;\">*Please reach us via Email or Discord ticket for all inquiries.</span>",
        law_row4_h: "Contact Email", law_row4_d: "stake-claimer@outlook.com",
        law_row5_h: "Operation Manager", law_row5_d: "Full details disclosed immediately upon valid request",
        law_row6_h: "Selling Price", law_row6_d: "Prices are indicated on the purchase page (tax included).",
        law_row7_h: "Additional Fees", law_row7_d: "Customers are responsible for internet connection costs, communication fees, and network fees (gas fees) associated with cryptocurrency transactions.",
        law_row8_h: "Available Payment Methods", law_row8_d: "Cryptocurrency (via oxapay)",
        law_row9_h: "Payment Timing", law_row9_d: "Required at the time of order placement.",
        law_row10_h: "Delivery Schedule", law_row10_d: "License keys are issued and displayed instantly upon payment confirmation.",
        law_row11_h: "Returns & Exchanges", law_row11_d: "Due to the nature of digital products, all sales are final. No returns, refunds, or exchanges are accepted after payment completion.<br>Please ensure you review our technical requirements and Terms of Service carefully before purchasing.",
        law_row12_h: "Operating Environment", law_row12_d: "PC or Smartphone with a stable internet connection.<br>Please refer to the home page for additional technical specifications.",

        // usage.html Full
        usage_guide_title: "System Setup Guide",
        u_step1_title: "1. Account Authentication",
        u_step1_t1: "Tap the login button to authenticate your profile.<br>Alternatively, <a href=\"#\" class=\"link-text\" onclick=\"login()\">click here</a> to sign in.",
        u_step1_t2: "Once redirected, authorize your profile using your Discord account by clicking the 'Authorize' button as shown in the image below.",
        u_step1_info: "If you do not have a Discord account, please <a href=\"https://discord.com/register\" target=\"_blank\" class=\"link-text\">click here</a> to create one.",
        u_step2_title: "2. Purchase Plan",
        u_step2_t1: "Tap 'Buy Now' below to select your desired plan and preferred payment provider.",
        u_step2_btn: "<i class=\"fas fa-shopping-cart\"></i> Buy Now",
        u_step2_t2: "Enter a coupon code if you have one.",
        u_step2_t3: "Then, click the 'Proceed to Order' button.",
        u_step2_t4: "Check the box to agree to the Terms of Service and click 'Pay Now'.<br>You will be redirected to our secure checkout gateway.",
        u_step2_t5: "Once on the external payment site, select your preferred currency and complete the transaction.",
        u_step2_alert_title: "Crucial Note",
        u_step2_alert_text: "Please ensure your payment is completed within the provided time limit. We cannot automatically guarantee license issuance for payments received after the session has expired.<br><br><strong>Expired payments may result in a permanent loss of funds.</strong><br>Only initiate payment when you are ready to complete it immediately. We cannot provide support for losses caused by expired payment sessions.",
        u_step2_info: "If you accidentally close the browser window, you can return to the checkout page via 'Order History'.<br>Or <a href=\"history.html\" class=\"link-text\">click here</a> to verify your status.",
        u_step3_title: "3. Deployment",
        u_step3_t1: "Your license key will be issued immediately upon payment confirmation.<br><span style=\"font-size: 0.9em; color: #aaa;\">*If your key is not issued after payment, please contact support via the button below.</span>",
        u_step3_contact_btn: "Support Ticket",
        u_step3_t2: "Next, tap the button labeled 'Activate Now'.",
        u_step3_t3: "This will redirect you to your Dashboard.<br>Once there, enter the license key you just purchased into the activation field.",
        u_step3_t4: "Upon entering the key, your account permissions will be granted. If you encounter any issues, please <a href=\"contact.html\" class=\"link-text\">contact support</a>.",
        u_step3_t5: "Once the success message appears, your license is active. Next, you must link your Stake API key.",
        u_step3_api_btn: "Get API Key <i class=\"fas fa-external-link-alt\" style=\"font-size: 0.8em;\"></i>",
        u_step3_t6: "Clicking here will take you to the Stake API settings. Click the 'Show' button and copy your key.",
        u_step3_t7: "Finally, paste your Stake API key into the dashboard. Once the account is successfully added, the 24/7 cloud system will begin operation.",
        u_owner_req_title: "Message from the Developer",
        u_owner_req_text: "I hope you find this tool valuable—your support is much appreciated! (Seriously, please buy it! haha)",
        u_owner_buy_btn: "Buy Now"
    }
};

const CONFIG = { siteName: "Stake Bonus Claimer", siteUrl: "https://stake-claimer.com", discordInviteUrl: "https://discord.gg/ueVedsjved", twitterUrl: "https://x.com/Stake_hatti" };

let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('ja') ? 'ja' : 'en');
function t(key) { return TRANSLATIONS[currentLang][key] || key; }
window.setLanguage = (l) => { localStorage.setItem('lang', l); location.reload(); };

/* 言語セレクターのバグ修正：HeaderとFooterでIDを分ける */
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

window.toggleLangMenu = (idSuffix) => { document.getElementById('lang-menu-' + idSuffix).classList.toggle('show'); };
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
window.showModal = (title, msg, btns = []) => { const o = document.getElementById('global-modal-overlay'), t_el = document.getElementById('g-modal-title'), b = document.getElementById('g-modal-body'), a = document.getElementById('g-modal-actions'); t_el.innerText = title; b.innerHTML = msg; a.innerHTML = ''; if (btns.length === 0) { const btn = document.createElement('button'); btn.className = 'g-modal-btn g-btn-secondary'; btn.innerText = t('modal_close'); btn.onclick = closeModal; a.appendChild(btn); } else btns.forEach(opt => { const btn = document.createElement('button'); btn.className = `g-modal-btn ${opt.class || 'g-btn-secondary'}`; btn.innerText = opt.text; btn.onclick = opt.onClick; a.appendChild(btn); }); o.classList.add('show'); };
window.closeModal = () => document.getElementById('global-modal-overlay').classList.remove('show');
window.toggleUserMenu = () => document.getElementById('user-menu')?.classList.toggle('show');
window.toggleNotifPopup = () => document.getElementById('notif-popup')?.classList.toggle('show');
window.toggleMobileNav = () => document.getElementById('mobile-nav')?.classList.toggle('show');