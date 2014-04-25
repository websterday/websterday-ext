chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status === 'complete') {
		var exclude = ['chrome://newtab/', 'chrome://extensions/', 'chrome://bookmarks/', 'chrome://bookmarks/#1'];

		if ($.inArray(tab.url, exclude) && localStorage.getItem('token') !== null) {
			console.log('save link : ' + tab.url);
			$.ajax({
				type: 'POST',
				url: 'http://websterday.skurty.com/ws/links?token=' + localStorage.getItem('token'),
				data: { url: tab.url, folder_id: null }
			});
		}
	}
});