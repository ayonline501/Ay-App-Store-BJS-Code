/*CMD
  command: appstore
  help: 
  need_reply: false
  auto_retry_time: 
  folder: সিস্টেম

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🔙 back
  group: 
CMD*/

// শুধুমাত্র বটের পার্সোনাল ইনবক্সে চলবে (গ্রুপে কিছুই করবে না)
if (chat.chat_type != "private") {
  return;
}

// মূল ক্যাটাগরি কিবোর্ড
var mainKeyboard = [
  [{ text: "🎨 Editing" }, { text: "🌐 Social" }, { text: "🎮 Game" }],
  [{ text: "🛠 Modified" }, { text: "🎭 Hack" }, { text: "☪️ Islamic" }],
  [{ text: "🛠 Utility" }, { text: "🎬 Players" }, { text: "🔒 Premium" }],
  [{ text: "📊 Statistics" }, { text: "ℹ️ About" }]
];

var txt = message ? message.trim() : "";

// বাটনগুলোর তালিকা
var categories = [
  "🎨 Editing", "🌐 Social", "🎮 Game",
  "🛠 Modified", "🎭 Hack", "☪️ Islamic",
  "🛠 Utility", "🎬 Players", "🔒 Premium",
  "📊 Statistics", "ℹ️ About"
];

// ক্যাটাগরির কোনো বাটনে ক্লিক করলে অন্য কোনো কমান্ড আসবে না (কিছুই হবে না)
if (categories.indexOf(txt) > -1) {
  return; 
}

// বটের ইনবক্সে মেসেজ দিলে শুধুমাত্র কিবোর্ডটি আসবে
Api.sendMessage({
  text: "Select Your Category",
  reply_markup: {
    keyboard: mainKeyboard,
    resize_keyboard: true
  }
});
