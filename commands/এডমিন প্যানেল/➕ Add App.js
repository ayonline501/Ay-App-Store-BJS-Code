/*CMD
  command: ➕ Add App
  help: 
  need_reply: true
  auto_retry_time: 
  folder: এডমিন প্যানেল

  <<ANSWER
ফাইলটি পাঠানোর সময় ক্যাপশনে (Caption) আপনার পছন্দের নাম বা আইডি লিখে পাঠান।
উদাহরণস্বরূপ:
• imo
• pixellab
• kinemaster
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ১. এডমিন আইডিগুলোর তালিকা (একাধিক এডমিন যুক্ত করা হলো)
var adminIds = [8825649789, 8718182111]; 

// ইউজারের আইডি এডমিন লিস্টে আছে কি না চেক করা
if (!adminIds.includes(user.telegramid)) {
  Bot.sendMessage("❌ আপনার এই কমান্ডটি ব্যবহার করার অনুমতি নেই।");
  return;
}

// ২. ফাইলের সাথে ক্যাপশন (নাম) আছে কি না চেক
var customName = request.caption;

if (!customName) {
  Bot.sendMessage("❌ <b>ভুল হয়েছে!</b>\n\nফাইলটি (Apk/Document) পাঠানোর সময় ক্যাপশনে (Caption) আপনার পছন্দের নাম লিখে পাঠান (যেমন: <code>imo</code> বা <code>pixellab</code>)।", {parse_mode: "HTML"});
  return;
}

// ৩. ডাটাবেসে ফাইল সেভ করা (নামটিকে ছোট হাতের অক্ষরে রূপান্তর করে সেভ হবে)
var cleanName = customName.trim().toLowerCase();
var storageKey = "storage_" + cleanName;

Bot.setProperty(storageKey, {
  msg_id: request.message_id,
  chat_id: chat.chatid
}, "json");

// ৪. ইউনিক লিঙ্ক তৈরি (আপনার start.txt লজিকের সাথে মিলিয়ে তৈরি করা)
var botUsername = bot.name; 
var baseLink = "https://t.me/" + botUsername + "?start=" + cleanName + "_";

Bot.sendMessage("✅ <b>সাফল্যের সাথে সফটওয়্যারটি সেভ হয়েছে!</b>\n\n" +
                "📦 সফটওয়্যার নাম: <b>" + cleanName + "</b>\n\n" +
                "🚀 আপনার ইউনিক লিঙ্ক (পোস্ট আইডি ছাড়া):\n<code>" + baseLink + "</code>\n\n" +
                "💡 <b>নির্দেশনা:</b> চ্যানেলে পোস্ট করার সময় এই লিঙ্কের শেষে আপনার চ্যানেলের পোস্ট আইডি বসিয়ে দিন।\n" +
                "<i>উদাহরণ:</i> <code>" + baseLink + "78</code>", 
                {parse_mode: "HTML"});
