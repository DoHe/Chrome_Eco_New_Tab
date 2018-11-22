chrome.runtime.onInstalled.addListener(function() {
	var settings={"mostViewed":1 ,"bookmarks":1 };
    chrome.storage.sync.set(settings);

  });

chrome.storage.onChanged.addListener(function(obj, area){
	console.log(obj);
	console.log(area);

});