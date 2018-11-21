chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function(data) {
      console.log("The color is ." + data);
    });
  });