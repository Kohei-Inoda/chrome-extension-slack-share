import config from './config.js';
//Chrome拡張機能が呼び出された際に動く。
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const webhookUrl = config.Slack_webhookUrl; //config.jsからWebhook URLを読み込む
    const payload = {
      text: `${request.message || ''}\n${request.url}`
    };
  
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        console.log("Slackにメッセージを送信しました！");
        sendResponse({ success: true });
      } else {
        console.error("Slackへのメッセージ送信に失敗しました:", response.statusText);
        sendResponse({ success: false });
      }
    } catch (error) {
      console.error("Slackへのメッセージ送信エラー:", error);
      sendResponse({ success: false });
    }
  
    return true;  // 非同期のsendResponseをサポートするため
  });