/*CMD
  command: 6305
  help: 
  need_reply: false
  auto_retry_time: 
  folder: এডমিন প্যানেল

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (chat.chat_type != "private") {
  return;
}

// শুধুমাত্র এডিটিং ক্যাটাগরির কিবোর্ড (১২টি Coming + ১টি Back বাটন)
var editingKeyboard = [
  [{ text: "➕ Add App" }, { text: "📢 Broadcast" }, { text: "➖ Delete" }],
  [{ text: "📊 Statistics" }, { text: "➕ Other Post" }, { text: "Coming" }],
  [{ text: "Coming" }, { text: "Coming" }, { text: "Coming" }],
  [{ text: "Coming" }, { text: "Coming" }, { text: "Coming" }],
  [{ text: "🔙 Back" }]
];

var txt = message ? message.trim() : "";

// Coming বা Back বাটনে ক্লিক করলে অন্য কোনো কমান্ড আসবে না
if (txt == "Coming" || txt == "🔙 Back") {
  return;
}

// বটে মেসেজ দিলেই সরাসরি এই কিবোর্ড আসবে
Api.sendMessage({
  text: "**Admin Panels**",
  parse_mode: "Markdown",
  reply_markup: {
    keyboard: editingKeyboard,
    resize_keyboard: true
  }
});


