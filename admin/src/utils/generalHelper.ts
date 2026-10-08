import { getToken } from "./tokenHandler";

export const messageGenerator = (user, userID, senderID, type) => {
  const lang = getToken("lang");
  let senderName;
  let typeRequest;

  switch (type) {
    case "Approval_Request":
      lang === "jp"
        ? (typeRequest = "が承認依頼を送った")
        : (typeRequest = "has sent Approval request to");
      break;
    case "Approved":
      lang === "jp"
        ? (typeRequest = "の要請を承認した")
        : (typeRequest = "has Approved the request of");
      break;
    case "Rejected":
      lang === "jp"
        ? (typeRequest = "の要求を拒否した")
        : (typeRequest = "has Rejected the request of");
      break;
    default:
      lang === "jp"
        ? (typeRequest = "へのリクエストは保留となっている。")
        : (typeRequest = "has PENDING Request to");
      break;
  }

  //   if sender is supervisor
  if (user.supervisor !== null) {
    if (user.supervisor.id === senderID) {
      senderName = user.supervisor.username;
    }
  }

  //   if sender is sub ordinate
  if (user.subordinates.length > 0) {
    console.log(user, "user");
    const sender = user.subordinates.filter((each) => each.id === senderID);
    console.log(sender, "Sender", senderID, "Sender id");
    senderName =
      sender && sender.length > 0 && sender[0].username
        ? sender[0].username
        : "Anonymous";
  }

  return `${senderName} ${typeRequest} ${user.username}`;
};

export const changeTagType = (value: string) => {
  if (typeof value === "string") {
    return JSON.parse(value);
  } else if (Array.isArray(value)) {
    return value;
  } else {
    console.log("value type is neither string nor array");
    return [];
  }
};
