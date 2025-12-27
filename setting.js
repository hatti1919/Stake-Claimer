/* setting.js */
const TRANSLATIONS = {
    ja: {
        // SEO関連
        meta_description: "Stakeのボーナスコード取得を自動化。PC常時起動は不要、スマホだけで完結します。",
        // ナビゲーション
        nav_home: "Home", nav_terms: "利用規約", nav_usage: "使用方法", nav_law: "特商法表記",
        nav_history: "購入履歴", nav_contact: "お問い合わせ", nav_dashboard: "ダッシュボード", nav_logout: "ログアウト",
        login_btn: "Login", notif_title: "お知らせ", notif_empty: "通知はありません", notif_loading: "読み込み中...",
        notif_read: "既読", notif_mark_read: "既読にする", footer_back_home: "ホームに戻る",

        // index.html 用
        hero_desc1: "自分の時間を大切に。", hero_desc2: "迅速にコードを取得します。", hero_desc3: "スマホ一台で完結。",
        philosophy_title: "私たちの行動理念",
        philosophy_text: "ボーナスコードはランダムに落ちてきます。仕事中に降ってきたら、取れなくてイライラしますよね？<br><br>私たちは複雑な作業はすべて自動化し、<span class=\"highlight-text\">「シンプルかつ迅速」</span>に結果を提供します。<br><br>また、システム導入の手順は<span class=\"highlight-text\">完全に確立されています。</span><br>専門的な知識がなくても、安心してスムーズにご利用いただける環境を整えています。<br><br>最先端のスピードと信頼を、あなたの手に。",
        feature_title: "機能概要",
        feature_text: "<strong>🚀 常時起動は一切不要</strong><br>既存の自動化ツールは、PCを24時間つけっぱなしにする必要がありましたが、本ツールはその常識を覆しました。<br><br><strong>📱 スマホだけで完結</strong><br>設定はすべてブラウザ上で完了します。あなたのスマホやPCの電源を切っても、クラウド上のシステムが24時間365日、あなたの代わりにコードを取得し続けます。<br><br>高価なPCも、面倒な環境構築も必要ありません。",
        join_server: "サーバーに参加", buy_label: "購入する",
        faq_title: "よくある質問",
        q1: "支払い方法は何がありますか？", a1: "PayPay、クレジットカード、仮想通貨に対応しています。",
        q2: "導入は難しいですか？", a2: "いいえ、スマホのみで完結し、数分で設定可能です。専門知識は不要です。",
        q3: "サポートはどの時間でも対応していますか？", a3: "ほぼ、即答できると思います。",
        q4: "プランの延長などはどうすればいいですか？", a4: "ライセンスを追加購入してもらう形になります。",
        q5: "アカウントの凍結リスクはありますか？", a5: "基本的にないです。",
        q6: "ボーナスコードは全て取れますか？", a6: "ほとんど取れますが、リミットの低いものだと取れない時があります。",

        // purchase.html / checkout.html 用
        purchase_title: "購入手続き", plan_select: "プランを選択", payment_select: "支払い方法を選択", coupon_placeholder: "クーポンコード (任意)", checkout_btn: "注文へ進む",
        modal_err: "エラー", modal_login_req: "購入するにはログインしてください。", modal_confirm_title: "注文確認",
        confirm_plan: "プラン", confirm_method: "方法", confirm_price: "定価", confirm_discount: "割引", confirm_total: "支払額",
        tos_agree_link: "利用規約", tos_agree_text: "に同意する", confirm_back: "戻る", confirm_pay: "支払う",
        order_detail: "注文詳細", payment_title: "お支払い", pay_info: "以下のボタンから決済ページへ進んでください。", pay_link_btn: "支払う", waiting_pay: "入金待ち...", timer_label: "残り時間", success_title: "支払い完了！", key_issued: "ライセンスキーが発行されました。", success_hint: "コピーして使用するか、ダッシュボードで有効化してください。", use_now_btn: "今すぐ使う",

        // dashboard.html 用
        dash_title: "ダッシュボード", status_title: "現在のステータス", plan_label: "現在のプラン", state_label: "状態", expiry_label: "有効期限",
        active_status: "有効", inactive_status: "無効", stake_link_title: "Stake アカウント連携", linked_acc_label: "登録済み", limit_label: "上限",
        add_acc_placeholder: "Stake API Key (例: c4f...)", link_btn: "連携する", delete_confirm: "本当に解除しますか？",
        activate_btn: "有効化する", license_placeholder: "XXXXX-XXXXX-XXXXX-DAYS",

        // history.html 用
        history_title: "購入履歴", filter_all: "全て", filter_paid: "🟢 完了", filter_pending: "🟡 確認中", filter_expired: "🔴 キャンセル", history_empty: "履歴はありません",

        // contact.html 用
        contact_title: "お問い合わせ", category_label: "カテゴリ", cat_placeholder: "カテゴリを選択", cat_pay: "支払いについて", cat_prod: "商品について", cat_err: "エラー・不具合", cat_other: "その他",
        order_id_label: "関連オーダーID", order_placeholder: "選択してください", detail_label: "詳細", image_label: "画像添付 (任意)", submit_btn: "送信する",

        // terms.html (利用規約 全文)
        terms_main_text: "この利用規約（以下，「本規約」といいます。）は，Stake Bonus Claimer（以下，「当サービス」といいます。）が提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。",
        terms_sec1: "第1条（適用）", terms_sec1_t: "本規約は，ユーザーと当サービスとの間の本サービスの利用に関わる一切の関係に適用されるものとします。",
        terms_sec2: "第2条（利用登録）", terms_sec2_t: "登録希望者が当サービスの定める方法によって利用登録を申請し，当サービスがこれを承認することによって，利用登録が完了するものとします。",
        terms_sec3: "第3条（禁止事項）", terms_sec3_list: "<li>法令または公序良俗に違反する行為</li><li>犯罪行為に関連する行為</li><li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li><li>当サービス，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li><li>本サービスの運営を妨害するおそれのある行為</li><li>不正アクセスをし，またはこれを試みる行為</li><li>他のユーザーに成りすます行為</li><li>本サービスの他のユーザーに関する個人情報等を収集または蓄積する行為</li><li>当サービスのサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li><li>その他，当サービスが不適切と判断する行為</li>",
        terms_sec4: "第4条（本サービスの提供の停止等）", terms_sec4_t1: "当サービスは，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。", terms_sec4_list: "<li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li><li>地震，落雷，火災，電または天災などの不可抗力により，本サービスの提供が困難となった場合</li><li>コンピュータまたは通信回線等が事故により停止した場合</li><li>その他，当サービスが本サービスの提供が困難と判断した場合</li>", terms_sec4_t2: "当サービスは，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。",
        terms_sec5: "第5条（利用制限および登録抹消）", terms_sec5_t1: "当サービスは，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。", terms_sec5_list: "<li>本規約のいずれかの条項に違反した場合</li><li>その他，当サービスが本サービスの利用を適当でないと判断した場合</li>", terms_sec5_t2: "当サービスは，本条に基づき当サービスが行った行為によりユーザーに生じた損害について，一切の責任を負いません。",
        terms_sec6: "第6条（免責事項）", terms_risk_title: "【重要】リスクに関する免責", terms_risk_text: "本サービスは，対象となるプラットフォーム（Stake.com等）の仕様変更や規約変更により，予告なく利用できなくなる可能性があります。<br>また，本ツールの利用により発生したアカウントの凍結（BAN）、資金の損失、利益の逸失、その他いかなる損害についても、当サービスは一切の責任を負いません。全ての利用はユーザー自身の判断と責任において行ってください。", terms_sec6_t2: "当サービスの債務不履行責任は，当サービスの故意または重過失によらない場合には免責されるものとします。",
        terms_sec7: "第7条（サービス内容の変更等）", terms_sec7_t: "当サービスは，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。",
        terms_sec8: "第8条（利用規約の変更）", terms_sec8_t: "当サービスは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。",
        terms_sec9: "第9条（返金ポリシー）", terms_sec9_t: "本サービスで提供される商品はデジタルコンテンツおよびソフトウェアライセンスであり、その性質上、購入後の返品・返金はいかなる理由（動作環境の不一致、期待した結果が得られなかった場合を含む）であっても対応いたしかねます。",
        terms_sec10: "第10条（準拠法・裁判管轄）", terms_sec10_t: "本規約の解釈にあたっては，日本法を準拠法とします。<br>本サービスに関して紛争が生じた場合には，当サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。",
        terms_last_update: "最終更新日: 2025年12月10日",

        // law.html (特商法 全文)
        law_title: "特定商取引法に基づく表記",
        law_seller_label: "販売業者の名称", law_seller_v: "hatti",
        law_addr_label: "所在地", law_addr_v: "請求があった場合は直ちに開示します",
        law_tel_label: "電話番号", law_tel_v: "請求があった場合は直ちに開示します<br><span style=\"font-size:0.8rem; color:#888;\">※お問い合わせはメールまたはDiscordチケットにて承ります。</span>",
        law_email_label: "メールアドレス", law_email_v: "stake-claimer@outlook.com",
        law_manager_label: "運営統括責任者", law_manager_v: "請求があった場合は直ちに開示します",
        law_price_label: "販売価格", law_price_v: "購入手続き画面に表示される価格（表示価格は消費税込み）とします。",
        law_other_label: "商品代金以外の必要料金", law_other_v: "インターネット接続料金、通信料金、および仮想通貨送金時のネットワーク手数料はお客様のご負担となります。",
        law_pay_method_label: "現在利用可能な支払方法", law_pay_method_v: "仮想通貨決済（oxapay）",
        law_pay_time_label: "代金の支払時期", law_pay_time_v: "購入申し込み時にお支払いいただきます。",
        law_delivery_label: "商品の引渡時期", law_delivery_v: "決済完了後、直ちにライセンスキーを発行・表示いたします。",
        law_return_label: "返品・交換について", law_return_v: "デジタルコンテンツという商品の性質上、決済完了後の返品・キャンセル・交換は原則としてお受けできません。<br>推奨環境や利用規約を十分にご確認の上、ご購入ください。",
        law_env_label: "動作環境", law_env_v: "インターネットに接続できるPCまたはスマートフォン。<br>その他詳細はトップページをご確認ください。",

        // usage.html (使用方法 全文)
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
        u_step2_alert_title: "<i class=\"fas fa-exclamation-triangle\"></i> 注意",
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
        u_owner_buy_btn: "<i class=\"fas fa-shopping-cart\"></i> 今すぐ購入する"
    },
    en: {
        // SEO Related
        meta_description: "Automate Stake bonus code acquisition. No PC required, works entirely on your smartphone.",
        // Navigation
        nav_home: "Home", nav_terms: "Terms", nav_usage: "Usage", nav_law: "Legal",
        nav_history: "History", nav_contact: "Contact", nav_dashboard: "Dashboard", nav_logout: "Logout",
        login_btn: "Login", notif_title: "Notifications", notif_empty: "No notifications", notif_loading: "Loading...",
        notif_read: "Read", notif_mark_read: "Mark as read", footer_back_home: "Back to Home",

        // index.html
        hero_desc1: "Value your time.", hero_desc2: "Get codes rapidly.", hero_desc3: "Done with just a phone.",
        philosophy_title: "Our Philosophy",
        philosophy_text: "Bonus codes drop randomly. It's frustrating to miss them while working, right?<br><br>We automate all complex tasks to provide <span class=\"highlight-text\">\"simple and fast\"</span> results.<br><br>Our setup process is <span class=\"highlight-text\">fully established.</span><br>You can use it smoothly without professional knowledge.<br><br>Cutting-edge speed and reliability in your hands.",
        feature_title: "Features",
        feature_text: "<strong>🚀 No constant uptime needed</strong><br>Existing automation tools required keeping a PC on 24/7, but this tool overturns that rule.<br><br><strong>📱 Phone-only setup</strong><br>All settings are done in your browser. Even if you turn off your phone, our cloud system claims codes for you 24/7/365.",
        join_server: "Join Server", buy_label: "Buy Now",
        faq_title: "FAQ",
        q1: "What payment methods are available?", a1: "We support PayPay, Credit Card, and Cryptocurrency.",
        q2: "Is it hard to set up?", a2: "No, it takes only a few minutes on your smartphone. No technical skills needed.",
        q3: "Is support always available?", a3: "I should be able to answer almost immediately.",
        q4: "How to extend plan?", a4: "You need to purchase an additional license.",
        q5: "Risk of account ban?", a5: "Basically no.",
        q6: "Can all codes be claimed?", a6: "Most can, but low-limit ones might be missed.",

        // Checkout / Purchase
        purchase_title: "Checkout", plan_select: "Select Plan", payment_select: "Select Payment", coupon_placeholder: "Coupon (Optional)", checkout_btn: "Proceed to Order",
        modal_err: "Error", modal_login_req: "Please login to purchase.", modal_confirm_title: "Confirm Order",
        confirm_plan: "Plan", confirm_method: "Method", confirm_price: "Price", confirm_discount: "Discount", confirm_total: "Total",
        tos_agree_link: "Terms", tos_agree_text: "I agree to the", confirm_back: "Back", confirm_pay: "Pay Now",
        order_detail: "Order Details", payment_title: "Payment", pay_info: "Click the button below to proceed to the payment page.", pay_link_btn: "Pay Now", waiting_pay: "Waiting for payment...", timer_label: "Time Left", success_title: "Payment Success!", key_issued: "License key issued.", success_hint: "Copy it or activate it in the dashboard.", use_now_btn: "Use Now",

        // Dashboard
        dash_title: "Dashboard", status_title: "Current Status", plan_label: "Current Plan", state_label: "Status", expiry_label: "Expires",
        active_status: "Active", inactive_status: "Inactive", stake_link_title: "Link Stake Account", linked_acc_label: "Registered", limit_label: "Limit",
        add_acc_placeholder: "Stake API Key (e.g. c4f...)", link_btn: "Link", delete_confirm: "Do you really want to unlink?",
        activate_btn: "Activate", license_placeholder: "XXXXX-XXXXX-XXXXX-DAYS",

        // History
        history_title: "Purchase History", filter_all: "All", filter_paid: "🟢 Done", filter_pending: "🟡 Pending", filter_expired: "🔴 Cancelled", history_empty: "No history found",

        // Contact
        contact_title: "Contact", category_label: "Category", cat_placeholder: "Select Category", cat_pay: "Payment", cat_prod: "Product", cat_err: "Bug/Issue", cat_other: "Other",
        order_id_label: "Order ID", order_placeholder: "Select Order", detail_label: "Details", image_label: "Attach Image (Optional)", submit_btn: "Submit",

        // terms.html (English Version)
        terms_main_text: "These Terms of Service (hereinafter referred to as the 'Terms') define the conditions for using the services (hereinafter referred to as the 'Service') provided by Stake Bonus Claimer (hereinafter referred to as the 'Service Provider'). Registered users (hereinafter referred to as 'Users') shall use the Service in accordance with these Terms.",
        terms_sec1: "Article 1 (Application)", terms_sec1_t: "These Terms shall apply to all relationships between the User and the Service Provider concerning the use of the Service.",
        terms_sec2: "Article 2 (User Registration)", terms_sec2_t: "Registration shall be completed when an applicant applies for registration by the method specified by the Service Provider and the Service Provider approves the application.",
        terms_sec3: "Article 3 (Prohibitions)", terms_sec3_list: "<li>Acts that violate laws or public order and morals</li><li>Acts related to criminal behavior</li><li>Acts that infringe on copyrights, trademarks, or other intellectual property rights included in the Service</li><li>Acts that destroy or interfere with the functions of the servers or networks of the Service Provider, other users, or third parties</li><li>Acts that may interfere with the operation of the Service</li><li>Acts of unauthorized access or attempting to do so</li><li>Acts of impersonating other users</li><li>Acts of collecting or accumulating personal information about other users</li><li>Acts of providing benefits directly or indirectly to anti-social forces in relation to the Service</li><li>Other acts that the Service Provider deems inappropriate</li>",
        terms_sec4: "Article 4 (Suspension of Service, etc.)", terms_sec4_t1: "The Service Provider may suspend or interrupt the provision of all or part of the Service without prior notice to the User if it determines that any of the following reasons exist:", terms_sec4_list: "<li>When performing maintenance, inspection, or updating of the computer system related to the Service</li><li>When the provision of the Service becomes difficult due to force majeure such as earthquakes, lightning, fire, power outages, or natural disasters</li><li>When computers or communication lines are stopped due to an accident</li><li>In other cases where the Service Provider determines that providing the Service is difficult</li>", terms_sec4_t2: "The Service Provider shall not be liable for any disadvantage or damage suffered by the User or a third party due to the suspension or interruption of the provision of the Service.",
        terms_sec5: "Article 5 (Usage Restrictions and Deregistration)", terms_sec5_t1: "The Service Provider may, without prior notice, restrict the use of all or part of the Service or deregister a User if the User falls under any of the following:", terms_sec5_list: "<li>If the User violates any provision of these Terms</li><li>In other cases where the Service Provider deems the use of the Service inappropriate</li>", terms_sec5_t2: "The Service Provider shall not be liable for any damage caused to the User by the actions taken by the Service Provider based on this Article.",
        terms_sec6: "Article 6 (Disclaimer)", terms_risk_title: "[Important] Risk Disclaimer", terms_risk_text: "This Service may become unavailable without notice due to specification changes or rule changes of the target platforms (Stake.com, etc.).<br>Furthermore, the Service Provider shall not be liable for any account bans (BAN), loss of funds, loss of profits, or any other damage caused by the use of this tool. All use is at the User's own judgment and responsibility.", terms_sec6_t2: "The Service Provider's liability for default shall be exempted if it is not due to the Service Provider's intentional or gross negligence.",
        terms_sec7: "Article 7 (Changes to Service Content, etc.)", terms_sec7_t: "The Service Provider may change the content of the Service or discontinue the provision of the Service without notice to the User, and shall not be liable for any damage caused to the User thereby.",
        terms_sec8: "Article 8 (Changes to Terms of Service)", terms_sec8_t: "The Service Provider may change these Terms at any time without notice to the User if it deems it necessary. If the User starts using the Service after the Terms have been changed, the User shall be deemed to have agreed to the changed Terms.",
        terms_sec9: "Article 9 (Refund Policy)", terms_sec9_t: "The products provided in this Service are digital content and software licenses. Due to their nature, returns or refunds after purchase will not be accepted for any reason (including mismatch of operating environment or failure to obtain expected results).",
        terms_sec10: "Article 10 (Governing Law and Jurisdiction)", terms_sec10_t: "In interpreting these Terms, Japanese law shall be the governing law.<br>In the event of a dispute regarding the Service, the court having jurisdiction over the location of the Service Provider's head office shall be the exclusive agreed jurisdiction.",
        terms_last_update: "Last Updated: December 10, 2025",

        // law.html (English Version)
        law_title: "Legal Notice",
        law_seller_label: "Seller Name", law_seller_v: "hatti",
        law_addr_label: "Location", law_addr_v: "Will be disclosed immediately upon request",
        law_tel_label: "Phone Number", law_tel_v: "Will be disclosed immediately upon request<br><span style=\"font-size:0.8rem; color:#888;\">*Inquiries are accepted via email or Discord ticket.</span>",
        law_email_label: "Email Address", law_email_v: "stake-claimer@outlook.com",
        law_manager_label: "Operations Manager", law_manager_v: "Will be disclosed immediately upon request",
        law_price_label: "Price", law_price_v: "The price displayed on the purchase process screen (tax included).",
        law_other_label: "Additional Fees", law_other_v: "Internet connection fees, communication charges, and network fees during cryptocurrency transfers are the responsibility of the customer.",
        law_pay_method_label: "Available Payment Methods", law_pay_method_v: "Cryptocurrency payment (oxapay)",
        law_pay_time_label: "Payment Timing", law_pay_time_v: "Payment is required at the time of purchase application.",
        law_delivery_label: "Delivery Timing", law_delivery_v: "The license key will be issued and displayed immediately after payment completion.",
        law_return_label: "Returns/Exchange", law_return_v: "Due to the nature of digital products, returns, cancellations, or exchanges after payment completion are generally not possible.<br>Please check the recommended environment and Terms of Service carefully before purchasing.",
        law_env_label: "Operating Environment", law_env_v: "PC or smartphone with internet connection.<br>Please check the top page for other details.",

        // usage.html (English Version)
        usage_guide_title: "Usage Guide",
        u_step1_title: "Login",
        u_step1_t1: "Tap the login button to log in.<br>You can also log in by clicking <a href=\"#\" class=\"link-text\" onclick=\"login()\">here</a>.",
        u_step1_t2: "Pressing the button will take you to a site where you should authorize using your Discord account by pressing 'Authorize' as shown in the image below.",
        u_step1_info: "If you don't have a Discord account yet, click <a href=\"https://discord.com/register\" target=\"_blank\" class=\"link-text\">here</a> to create one.",
        u_step2_title: "Purchase",
        u_step2_t1: "Tap 'Buy Now' below to select your desired plan and payment method.",
        u_step2_btn: "<i class=\"fas fa-shopping-cart\"></i> Buy Now",
        u_step2_t2: "Enter a coupon code if you have one.",
        u_step2_t3: "Then, click the 'Proceed to Order' button.",
        u_step2_t4: "Check the box to agree to the Terms of Service and click 'Pay Now'.<br>You will then be redirected to the checkout page.",
        u_step2_t5: "Clicking 'Pay Now' will take you to an external site. Select your preferred currency and complete the payment.",
        u_step2_alert_title: "<i class=\"fas fa-exclamation-triangle\"></i> Caution",
        u_step2_alert_text: "If you do not complete the payment within the time limit and it expires, we will not receive the funds and cannot guarantee service.<br><br><strong>This will lead to loss of funds, so please pay at a time when you can complete it immediately.</strong><br>We cannot guarantee service even if the license key is not delivered due to this. Thank you for your understanding.",
        u_step2_info: "Even if you accidentally close the screen, you can return to the checkout page from 'Purchase History'.<br>You can also check by clicking <a href=\"history.html\" class=\"link-text\">here</a>.",
        u_step3_title: "Setup",
        u_step3_t1: "A license key will be issued once payment is complete.<br><span style=\"font-size: 0.9em; color: #aaa;\">*If you completed payment but the key is not issued, please contact support from the button below.</span>",
        u_step3_contact_btn: "Contact Us",
        u_step3_t2: "Then, tap the button labeled 'Use Now'.",
        u_step3_t3: "You will be taken to the dashboard. Once there, enter the license key you just purchased.",
        u_step3_t4: "Permissions should be granted once you enter the key. If not, please <a href=\"contact.html\" class=\"link-text\">contact us</a>.",
        u_step3_t5: "Once this appears, permissions have been granted. Next, enter your Stake API key.",
        u_step3_api_btn: "Get API Key <i class=\"fas fa-external-link-alt\" style=\"font-size: 0.8em;\"></i>",
        u_step3_t6: "Clicking here will take you to the screen to get the API key. Press the 'Show' button and copy it.",
        u_step3_t7: "After that, enter the Stake API key you just obtained.<br>Setup is complete once the API is entered and the account is added.",
        u_owner_req_title: "From the Owner",
        u_owner_req_text: "Please buy it! lol",
        u_owner_buy_btn: "<i class=\"fas fa-shopping-cart\"></i> Buy Now"
    }
};

const CONFIG = {
    siteName: "Stake Bonus Claimer",
    siteUrl: "https://stake-claimer.com",
    discordInviteUrl: "https://discord.gg/ueVedsjved",
    twitterUrl: "https://x.com/Stake_hatti"
};

/* 言語管理システム */
let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('ja') ? 'ja' : 'en');
function t(key) { return TRANSLATIONS[currentLang][key] || key; }
window.setLanguage = (l) => { localStorage.setItem('lang', l); location.reload(); };

const LANG_HTML = `
<select onchange="setLanguage(this.value)" class="lang-selector-nav">
    <option value="ja" ${currentLang === 'ja' ? 'selected' : ''}>JP</option>
    <option value="en" ${currentLang === 'en' ? 'selected' : ''}>EN</option>
</select>`;

/* 共通ヘッダー（通知の左に言語選択を配置） */
const HEADER_HTML = `
<nav class="sticky-nav">
    <div class="nav-left">
        <div class="mobile-menu-btn" onclick="toggleMobileNav()"><i class="fa-solid fa-bars"></i></div>
        <a href="/" class="nav-link" data-i18n="nav_home">${t('nav_home')}</a>
        <a href="/terms" class="nav-link" data-i18n="nav_terms">${t('nav_terms')}</a>
        <a href="/usage" class="nav-link" data-i18n="nav_usage">${t('nav_usage')}</a>
    </div>
    <div class="nav-right">
        ${LANG_HTML}
        <div style="position:relative;">
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
<div id="mobile-nav" class="mobile-nav-overlay"><a href="/" class="mobile-nav-link" data-i18n="nav_home">${t('nav_home')}</a><a href="/terms" class="mobile-nav-link" data-i18n="nav_terms">${t('nav_terms')}</a><a href="/usage" class="mobile-nav-link" data-i18n="nav_usage">${t('nav_usage')}</a><a href="/law" class="mobile-nav-link" data-i18n="nav_law">${t('nav_law')}</a><div style="padding:20px; text-align:center;">${LANG_HTML}</div></div>`;

const FOOTER_HTML = `
<footer class="footer-wrapper"><div class="footer-content"><div class="footer-links"><a href="/terms" data-i18n="nav_terms">${t('nav_terms')}</a><a href="/law" data-i18n="nav_law">${t('nav_law')}</a><a href="/usage" data-i18n="nav_usage">${t('nav_usage')}</a><a href="/" data-i18n="footer_back_home">${t('footer_back_home')}</a></div><div style="margin:10px 0; text-align:center;">${LANG_HTML}</div><div class="footer-icons"><a href="${CONFIG.discordInviteUrl}" target="_blank"><i class="fa-brands fa-discord"></i></a><a href="${CONFIG.twitterUrl}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></div></div><div class="footer-copyright">© ${CONFIG.siteName}</div></footer>`;

/* ページ上の全テキストを一括置換する関数 */
function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); el.innerHTML = t(k); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const k = el.getAttribute('data-i18n-placeholder'); el.placeholder = t(k); });

    // SEOメタタグの動的更新
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.name = "description"; meta.content = t('meta_description'); document.head.appendChild(meta);
    const og = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    og.setAttribute('property', 'og:description'); og.content = t('meta_description'); document.head.appendChild(og);
}

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

/* 既存のシステムロジック（そのまま維持） */
window.initSupabase = async () => { if (window.supabaseApp) return window.supabaseApp; const res = await fetch('/api/config'); const env = await res.json(); window.TURNSTILE_SITE_KEY = env.TURNSTILE_SITE_KEY; window.supabaseApp = window.supabase.createClient(env.SUPABASE_URL, env.SUPABASE_KEY); return window.supabaseApp; };
function handleLoginSuccess(s) { currentUser = s.user; const c = document.getElementById('auth-container'); if (c) c.innerHTML = `<div style="position:relative;"><img src="${currentUser.user_metadata.avatar_url}" class="user-avatar-nav" onclick="toggleUserMenu()"><div id="user-menu" class="dropdown-menu"><a href="/history" class="menu-item"><i class="fa-solid fa-clock-rotate-left" style="color:#00E701; margin-right:8px;"></i>${t('nav_history')}</a><a href="/contact" class="menu-item"><i class="fa-solid fa-envelope" style="color:#00E701; margin-right:8px;"></i>${t('nav_contact')}</a><a href="/dashboard" class="menu-item"><i class="fa-solid fa-gauge-high" style="color:#00E701; margin-right:8px;"></i>${t('nav_dashboard')}</a><div class="menu-item" onclick="logout()" style="color:#ff4444; border-top:1px solid #333; cursor:pointer;"><i class="fa-solid fa-right-from-bracket" style="margin-right:8px;"></i>${t('nav_logout')}</div></div></div>`; checkNotifications(currentUser.id); }
async function checkNotifications(uid) { try { const res = await fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ user_id: uid, action: 'get' }) }); const ns = await res.json(); const b = document.getElementById('notif-badge'); const l = document.getElementById('notif-list'); const unread = ns.filter(n => !n.is_read).length; if (b) { b.style.display = unread > 0 ? 'flex' : 'none'; b.innerText = unread; } if (l) { if (ns.length > 0) { l.innerHTML = ""; ns.forEach(n => { const act = n.is_read ? `<span style="color:#555;font-size:0.7rem;">${t('notif_read')}</span>` : `<span onclick="markAsRead('${n.id}','${uid}')" style="color:#00E701;font-size:0.7rem;cursor:pointer;text-decoration:underline;">${t('notif_mark_read')}</span>`; l.innerHTML += `<div class="notif-item" style="opacity:${n.is_read ? 0.5 : 1}"><div style="display:flex; justify-content:space-between;"><b>${n.title}</b>${act}</div><div style="font-size:0.8rem; color:#ccc;">${n.message.replace(/\n/g, '<br>')}</div></div>`; }); } else l.innerHTML = `<div class="notif-empty">${t('notif_empty')}</div>`; } } catch (e) { } }
window.markAsRead = async (id, uid) => { try { await fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ action: 'read', id, user_id: uid }) }); checkNotifications(uid); } catch (e) { } };
function showLoginButton() { const c = document.getElementById('auth-container'); if (c) c.innerHTML = `<button onclick="login()" class="login-btn-nav">${t('login_btn')}</button>`; }
window.login = async () => { await window.supabaseApp.auth.signInWithOAuth({ provider: 'discord' }); };
window.logout = async () => { await window.supabaseApp.auth.signOut(); location.href = "/"; };
window.showModal = (title, msg, btns = []) => { const o = document.getElementById('global-modal-overlay'), t_el = document.getElementById('g-modal-title'), b = document.getElementById('g-modal-body'), a = document.getElementById('g-modal-actions'); t_el.innerText = title; b.innerHTML = msg; a.innerHTML = ''; if (btns.length === 0) { const btn = document.createElement('button'); btn.className = 'g-modal-btn g-btn-secondary'; btn.innerText = t('modal_close'); btn.onclick = closeModal; a.appendChild(btn); } else btns.forEach(opt => { const btn = document.createElement('button'); btn.className = `g-modal-btn ${opt.class || 'g-btn-secondary'}`; btn.innerText = opt.text; btn.onclick = opt.onClick; a.appendChild(btn); }); o.classList.add('show'); };
window.closeModal = () => document.getElementById('global-modal-overlay').classList.remove('show');
window.toggleUserMenu = () => document.getElementById('user-menu')?.classList.toggle('show');
window.toggleNotifPopup = () => document.getElementById('notif-popup')?.classList.toggle('show');
window.toggleMobileNav = () => document.getElementById('mobile-nav')?.classList.toggle('show');