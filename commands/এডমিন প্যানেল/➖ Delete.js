/*CMD
  command: ➖ Delete
  help: 
  need_reply: true
  auto_retry_time: 
  folder: এডমিন প্যানেল

  <<ANSWER
যে সফটওয়্যারটি ডিলিট করতে চান, তার আইডি বা নাম নিচে লিখে পাঠান।
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

if (!adminIds.includes(user.telegramid)) {
  Bot.sendMessage("❌ আপনার এই কমান্ডটি ব্যবহার করার অনুমতি নেই।");
  return;
}

// ২. ইনপুট নাম চেক করা
var targetName = message ? message.trim().toLowerCase() : "";

if (!targetName) {
  Bot.sendMessage("❌ <b>ভুল হয়েছে!</b>\n\nযে সফটওয়্যারটি ডিলিট করতে চান, তার নামটি লিখে পাঠান (যেমন: <code>imo</code> বা <code>pixellab</code>)।", {parse_mode: "HTML"});
  withOpenAnswer(); // ইউজারের পরবর্তী মেসেজ শোনার জন্য
  return;
}

// ৩. ডাটাবেস থেকে সফটওয়্যার চেক ও ডিলিট করা
var storageKey = "storage_" + targetName;
var fileData = Bot.getProperty(storageKey);

if (fileData) {
  // ডাটাবেস থেকে প্রোপার্টিগুলো মুছে ফেলা
  Bot.setProperty(storageKey, null);
  Bot.setProperty("views_" + targetName, null);
  Bot.setProperty("viewed_users_" + targetName, null);

  Bot.sendMessage("✅ সফলভাবে <b>" + targetName + "</b> সফটওয়্যারটি ডাটাবেস থেকে ডিলিট করা হয়েছে!", {parse_mode: "HTML"});
} else {
  Bot.sendMessage("❌ <b>পাওয়া যায়নি!</b>\n\n'<b>" + targetName + "</b>' নামের কোনো সফটওয়্যার ডাটাবেসে নেই। সঠিক নাম দিয়ে আবার চেষ্টা করুন।", {parse_mode: "HTML"});
}
