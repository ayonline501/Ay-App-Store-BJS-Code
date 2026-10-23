/*CMD
  command: 🛠 Utility
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🛠 Utility
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// শুধুমাত্র বটের পার্সোনাল ইনবক্সে চলবে (গ্রুপে চলবে না)
if (chat.chat_type != "private") {
  return;
}

// ১২টি Coming + ১টি Back বাটন
var editingKeyboard = [
  [{ text: "Coming" }, { text: "Coming" }, { text: "Coming" }],
  [{ text: "Coming" }, { text: "Coming" }, { text: "Coming" }],
  [{ text: "Coming" }, { text: "Coming" }, { text: "Coming" }],
  [{ text: "Coming" }, { text: "Coming" }, { text: "Coming" }],
  [{ text: "🔙 Back" }]
];

var txt = message ? message.trim() : "";

// Coming বা Back বাটনে ক্লিক করলে অন্য কোনো কমান্ড আসবে না
if (txt == "Coming" || txt == "🔙 Back") {
  return;
}

// ইউজার যে মেসেজটি পাঠাবে/বাটনে চাপবে সেই নামেই টেক্সট তৈরি হবে
Api.sendMessage({
  text: "**" + txt + " Apps**",
  parse_mode: "Markdown",
  reply_markup: {
    keyboard: editingKeyboard,
    resize_keyboard: true
  }
});
