/*CMD
  command: Mt Manager
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 🛠 Modified

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// 🛑 ১. ইনবক্স সিকিউরিটি চেক (গ্রুপ বা চ্যানেলে কাজ করবে না)
if (chat.chat_type !== "private") {
  return;
}
// ১. আপনার দেওয়া কাস্টম নাম এবং চ্যানেলের পোস্ট আইডি
var myName = "mtmanager";    // আপনি ফাইল সেভ করার সময় ক্যাপশনে যা লিখেছিলেন
var postId = "177";   // আপনার চ্যানেলের সেই পোস্টের আইডি

// ২. সরাসরি আপনার সাজানো স্টার্ট কমান্ড রান করা হচ্ছে
Bot.runCommand("/start " + myName + "_" + postId);
