document.getElementById("sendButton").addEventListener("click", async () => {
    const sendButton = document.getElementById("sendButton");
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });//現在アクティブなタブの取得
    const message = document.getElementById("message").value;//ユーザ入力のテキスト内容を取得
    const url = tab.url;//タブのurlを取得
  
    // 送信ボタンをクリック時に無効化して送信中の状態に
    sendButton.disabled = true;
    sendButton.innerText = "送信中...";
  
    try {
      // メッセージとURLをbackground.jsに送信
      chrome.runtime.sendMessage({ url, message }, (response) => {
        // Slackへの送信が完了したら「送信完了」に変更
        sendButton.innerText = "送信完了";
      });
    } catch (error) {
      console.error("メッセージ送信エラー:", error);
      sendButton.innerText = "送信エラー"; // エラー時のテキスト変更
    } finally {
      // 一定時間後に元の「Slackに送信」に戻す
      setTimeout(() => {
        sendButton.innerText = "Slackに送信";
        sendButton.disabled = false;
      }, 2000);
    }
  });