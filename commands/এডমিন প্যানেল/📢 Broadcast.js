/*CMD
  command: 📢 Broadcast
  help: 
  need_reply: true
  auto_retry_time: 
  folder: এডমিন প্যানেল
  answer: ⚠️ যে মেসেজটি (টেক্সট, ছবি, ভিডিও বা ফাইল) সকল ইউজারের কাছে পাঠাতে চান, সেটি এখানে ফরোয়ার্ড করুন অথবা সরাসরি লিখে পাঠান।

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

// ২. যদি এডমিন শুধু কমান্ডে ক্লিক করে (অর্থাৎ কোনো মেসেজ বা ফাইল না পাঠিয়ে থাকে)
if (!request.message_id) {
  Bot.sendMessage("📢 <b>ব্রডকাস্ট প্যানেল</b>\n\n" +
                  "⚠️ যে মেসেজটি (টেক্সট, ছবি, ভিডিও বা ফাইল) সকল ইউজারের কাছে পাঠাতে চান, সেটি এখানে ফরোয়ার্ড করুন অথবা সরাসরি লিখে পাঠান।", 
                  {parse_mode: "HTML"});
  return;
}

// ৩. ইউজার লিস্ট চেক করা
var allUsers = Bot.getProperty("total_users_list", []);

if (allUsers.length == 0) {
  Bot.sendMessage("❌ দুঃখিত, বটে কোনো ইউজার পাওয়া যায়নি!");
  return;
}

Bot.sendMessage("🚀 ব্রডকাস্ট শুরু হয়েছে! মোট " + allUsers.length + " জন ইউজারের কাছে মেসেজ পাঠানো হচ্ছে...");

// ৪. লুপ চালিয়ে সবার কাছে মেসেজ পৌঁছে দেওয়া
var sentCount = 0;
for (var i = 0; i < allUsers.length; i++) {
  var userId = allUsers[i];
  
  // এডমিন যে মেসেজ বা ফাইল পাঠিয়েছে তা কপি করে ইউজারের কাছে পাঠানো
  Api.copyMessage({
    chat_id: userId,
    from_chat_id: chat.chatid,
    message_id: request.message_id
  });
  sentCount++;
}

Bot.sendMessage("✅ <b>সফলভাবে ব্রডকাস্ট সম্পন্ন হয়েছে!</b>\n\n" +
                "📤 মোট প্রেরিত ইউজার: <b>" + sentCount + " জন</b>", 
                {parse_mode: "HTML"});
