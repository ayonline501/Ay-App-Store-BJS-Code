/*CMD
  command: 📊 Statistics
  help: 
  need_reply: false
  auto_retry_time: 
  folder: সাধারণ কমান্ড

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ১. এডমিন বা যেকেউ যেন এটি দেখতে পারে (চাইলে এখানেও এডমিন চেক দিতে পারেন)
var totalUsers = Bot.getProperty("total_users_count", 0);

// ২. মান্থলি বা অ্যাক্টিভ ইউজারের একটি আনুমানিক হিসাব (বা মোট ইউজারের সমান রাখা)
var monthlyUsers = totalUsers; 

// ৩. স্ট্যাটিস্টিক্স মেসেজ ডিজাইন
Bot.sendMessage("📊 <b>Bot Statistics Dashboard</b>\n\n" +
                "👤 Total Users: <b>" + totalUsers + "</b>\n" +
                "📈 Monthly Active: <b>" + monthlyUsers + "+</b>\n" +
                "🤖 Bot Status: <b>Online ✅</b>\n\n" +
                "<i>Powered by Bot System</i>", 
                { parse_mode: "HTML" });
