/*CMD
  command: *
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

if (chat.chat_type != "private") {
  let new_members = request.new_chat_members

  if (new_members.length > 0) {
    Api.deleteMessage({
      chat_id: request.chat_id,
      message_id: request.message_id
    })
  }
let pinned = request.pinned_message

if (pinned != null) {
  Api.deleteMessage({
    chat_id: request.chat_id,
    message_id: request.message_id
  })
}
let videoStarted = request.video_chat_started;

if (videoStarted != null) {
  Api.deleteMessage({
    chat_id: request.chat_id,
    message_id: request.message_id
  });
}
let videoEnded = request.video_chat_ended;

if (videoEnded != null) {
  Api.deleteMessage({
    chat_id: request.chat_id,
    message_id: request.message_id
  });
}
  let left_members = request.left_chat_member

  if (left_members != null) {
    Api.deleteMessage({
      chat_id: request.chat_id,
      message_id: request.message_id
    })
  }
}

if (chat.chat_type != "private") {
  let new_members = request.new_chat_members

  if (new_members.length > 0) {
    Api.deleteMessage({
      chat_id: request.chat_id,
      message_id: request.message_id
    })
  }
let pinned = request.pinned_message

if (pinned != null) {
  Api.deleteMessage({
    chat_id: request.chat_id,
    message_id: request.message_id
  })
}
let videoStarted = request.video_chat_started;

if (videoStarted != null) {
  Api.deleteMessage({
    chat_id: request.chat_id,
    message_id: request.message_id
  });
}
let videoEnded = request.video_chat_ended;

if (videoEnded != null) {
  Api.deleteMessage({
    chat_id: request.chat_id,
    message_id: request.message_id
  });
}
  let left_members = request.left_chat_member

  if (left_members != null) {
    Api.deleteMessage({
      chat_id: request.chat_id,
      message_id: request.message_id
    })
  }
}

var myEmoji = ["😐", "😑","🌚", "🥴","🤯", "🙏", "👌", "🥱", "🕊️", "🤡", "😂", "😊", "🐋", "🏆", "💔", "⚡", "👍", "😱", "👻", "😢", " 👀", "🎃", "🍾", "🖌️", "❤️", "💻" , "🥰", "🔥", "🎉", "🤗", "😁", "👎", "👏", "💯", "🍓", "🌟", "🌭", "👎", "🤝", "🙉", "🦄", "⛄", "🎄", "🤔", "🤩", "🤮", "🤖" , "🍿"]

var doEmoji = myEmoji[Math.floor(Math.random() * myEmoji.length)];

HTTP.post({
  url: "https://api.telegram.org/bot" + bot.token + "/setMessageReaction",
  body: {
    chat_id: request.chat.id,
    message_id: request.message_id,
    reaction: JSON.stringify([
      {
        type: "emoji",
        emoji: doEmoji,
        is_big: true 
      }
    ])
  }
});
