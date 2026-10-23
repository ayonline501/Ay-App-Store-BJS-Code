/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: সিস্টেম

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ১. শুরুতে চ্যানেলে জয়েনিং চেক (গেট ১)
if (!options) {
  Api.getChatMember({
    chat_id: "@ayofficialbd",
    user_id: user.telegramid,
    on_result: "/start check_group_" + params
  });
  return;
}

// ২. চ্যানেল চেক শেষে গ্রুপ চেক (গেট ২)
if (params && params.startsWith("check_group_")) {
  var originalParams = params.replace("check_group_", "");

  if (options.result.status == "member" || options.result.status == "administrator" || options.result.status == "creator") {
    // চ্যানেলে আছে, এখন গ্রুপ চেক করো
    Api.getChatMember({
      chat_id: "@ayofficialbdchat",
      user_id: user.telegramid,
      on_result: "/start verify_all_" + originalParams
    });
  } else {
    handleNoJoin(originalParams);
  }
  return;
}

// ৩. সব চেক শেষে মেইন রুম (সফটওয়্যার/ফাইল ডেলিভারি)
if (params && params.startsWith("verify_all_")) {
  var query = params.replace("verify_all_", "");

  if (options.result.status == "member" || options.result.status == "administrator" || options.result.status == "creator") {

    // ✅ ইউজার এখন ভেরিফাইড! মেইন লজিক শুরু:

    // ক. ইউজার কাউন্টার
    var users = Bot.getProperty("total_users_list", []);
    if (!users.includes(user.telegramid)) {
      users.push(user.telegramid);
      Bot.setProperty("total_users_list", users, "json");
      Bot.setProperty("total_users_count", (Bot.getProperty("total_users_count", 0) + 1), "integer");
    }

    // খ. যদি কোনো লিঙ্ক না থাকে
    if (!query || query == "undefined" || query == "" || query == "null") {
      Bot.runCommand("appstore");
      return;
    }

    // গ. সফটওয়্যার/ফাইল ডাউনলোডার লজিক
    if (query.includes("_")) {
      var ids = query.split("_");
      var storageKey = ids[0].toLowerCase();
      var postId = ids[1];
      var fileData = Bot.getProperty("storage_" + storageKey);

      if (fileData) {

        var viewProp = "views_" + storageKey;
        var userViewProp = "viewed_users_" + storageKey;

        var viewedUsers = Bot.getProperty(userViewProp, []);

        // 👉 এক ইউজার = এক ভিউ
        if (!viewedUsers.includes(user.telegramid)) {
          viewedUsers.push(user.telegramid);
          Bot.setProperty(userViewProp, viewedUsers, "json");

          var currentViews = Bot.getProperty(viewProp, 0) + 1;
          Bot.setProperty(viewProp, currentViews, "integer");
        } else {
          var currentViews = Bot.getProperty(viewProp, 0);
        }

        Api.copyMessage({
          from_chat_id: fileData.chat_id,
          message_id: fileData.msg_id,
          chat_id: chat.chatid,
          caption: "<b>🚀 Your Software Ready!</b>\n\n📊 <b>Total Views: " + currentViews + "</b>\n\n📌 বিস্তারিত তথ্য নিচে দেখুন 👇🏻",
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "ℹ️ App Details", url: "https://t.me/ayofficialbd/" + postId }],
              [
                { text: "👍 Like", url: "https://t.me/ayofficialbd/" + postId },
                { text: "💬 Comment", url: "https://t.me/ayofficialbd/" + postId + "?comment=1" }
              ],
              [{ text: "👨‍💻 Developer", url: "https://t.me/ayownerbot" }],
              [{ text: " Copy Share Link", copy_text: { text: "https://t.me/" + bot.name + "?start=" + query } }]
            ]
          }
        });
        return;
      } else {
        Bot.sendMessage("❌ <b>দুঃখিত!</b> এই সফটওয়্যারটি বর্তমানে আমাদের ডাটাবেস থেকে  পাওয়া যাচ্ছে না।", {parse_mode: "HTML"});
        return;
      }
    }

    // ঘ. ডিলিট সিস্টেম লজিক (যদি কেউ /start delete_appname লিখে দেয়)
    if (query.startsWith("delete_")) {
      var adminIds = [8825649789, 8718182111]; // আপনার এডমিন আইডিগুলো
      if (!adminIds.includes(user.telegramid)) {
        Bot.sendMessage("❌ আপনার এই কমান্ডটি ব্যবহার করার অনুমতি নেই।");
        return;
      }

      var appToDelete = query.replace("delete_", "").toLowerCase();
      var storageKey = "storage_" + appToDelete;
      
      var fileCheck = Bot.getProperty(storageKey);
      if (fileCheck) {
        Bot.setProperty(storageKey, null);
        Bot.setProperty("views_" + appToDelete, null);
        Bot.setProperty("viewed_users_" + appToDelete, null);
        Bot.sendMessage("✅ সফলভাবে <b>" + appToDelete + "</b> সফটওয়্যারটি ডাটাবেস থেকে ডিলিট করা হয়েছে!", {parse_mode: "HTML"});
      } else {
        Bot.sendMessage("❌ '<b>" + appToDelete + "</b>' নামের কোনো সফটওয়্যার ডাটাবেসে পাওয়া যায়নি।", {parse_mode: "HTML"});
      }
      return;
    }

    // ঙ. অন্যান্য কমান্ড
    switch (query) {
      case "rules":
        Bot.runCommand("rules");
        break;
      case "categories":
        Bot.runCommand("categories");
        break;
      default:
        Bot.runCommand("appstore");
        break;
    }

  } else {
    handleNoJoin(query);
  }
  return;
}

// ৪. জয়েন না করলে হ্যান্ডেল করার ফাংশন
function handleNoJoin(p) {

  if (request.data) {
    Api.answerCallbackQuery({
      callback_query_id: request.id,
      text: "⚠️ আপনি এখনো চ্যানেল বা গ্রুপে জয়েন করেননি!\n\nদয়া করে নিচে দেওয়া বাটনে ক্লিক করে জয়েন করুন এবং আবার চেষ্টা করুন።",
      show_alert: true
    });
    return;
  }

  var joinButtons = [
    [{ text: "📢 চ্যানেল", url: "https://t.me/ayofficialbd" }],
    [{ text: "👥 গ্রুপ", url: "https://t.me/ayofficialbdchat" }],
    [{ text: "✅ জয়েন করেছি", callback_data: "/start " + p }]
  ];

  Api.sendMessage({
    text: "🕌 <b>আসসালামুয়ালাইকুম প্রিয় ইউজার ✨</b>\n\n📢 আমাদের বট ব্যবহার করার জন্য প্রথমে আমাদের চ্যানেল এবং গ্রুপে জয়েন করুন। জয়েন না করলে কোনো সফটওয়্যার বা কমান্ড কাজ করবে না।",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: joinButtons }
  });
}
