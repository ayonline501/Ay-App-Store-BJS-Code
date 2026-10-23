/*CMD
  command: ➕ Other Post
  help: 
  need_reply: true
  auto_retry_time: 
  folder: এডমিন প্যানেল
  answer: লিংক দেন 

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ১. এডমিন আইডিগুলোর তালিকা (একাধিক এডমিন)
var adminIds = [8825649789, 8718182111]; 

if (!adminIds.includes(user.telegramid)) {
  Bot.sendMessage("❌ আপনার এই কমান্ডটি ব্যবহার করার অনুমতি নেই।");
  return;
}

// ২. আপনার টার্গেট চ্যানেল (যেখানে পোস্টটি যাবে)
var targetChannel = "@ayappstore"; 

// ৩. আপনার অফিসিয়াল চ্যানেলের লিঙ্ক (যা বাটনে থাকবে)
var officialLink = "https://t.me/ayofficialbd";
var buttonName = "📢 Official Channel";

// ৪. ইউজারের পাঠানো পোস্ট লিঙ্ক থেকে আইডি বের করা
var postLink = message ? message.trim() : "";

if (postLink.includes("t.me/")) {
  var parts = postLink.split('/');
  var messageId = parts[parts.length - 1]; // পোস্ট আইডি (যেমন: ১২৩)
  var sourceUsername = "@" + parts[parts.length - 2]; // সোর্স ইউজারনেম

  // ৫. সোর্স চ্যানেল থেকে কপি করে টার্গেট চ্যানেলে পাঠানো
  Api.copyMessage({
    chat_id: targetChannel,
    from_chat_id: sourceUsername,
    message_id: messageId,
    reply_markup: {
      inline_keyboard: [
        [{ text: buttonName, url: officialLink }]
      ]
    }
  });

  Bot.sendMessage("✅ <b>সাফল্যের সাথে বাটনসহ পোস্ট করা হয়েছে!</b>\n\nচ্যানেল: " + targetChannel, {parse_mode: "HTML"});
} else {
  Bot.sendMessage("❌ <b>ভুল লিঙ্ক!</b> দয়া করে সঠিক টেলিগ্রাম পোস্ট লিঙ্ক দিন।");
}
