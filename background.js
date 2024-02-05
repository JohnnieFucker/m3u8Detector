let detectedRequests = [];
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 检查标签页是否正在加载新内容
    if (changeInfo.status === 'loading') {
        // 清空detectedRequests数组
        detectedRequests = [];

        // 更新扩展图标上的角标，反映清空操作
        chrome.action.setBadgeText({ text: '', tabId: tabId });
    }
});

chrome.webRequest.onCompleted.addListener(
    async (d) => {
        const ext = (d.url.split('?')[0].split('.').pop() || '').toLowerCase();
        if (ext === 'm3u8' || ext === 'm3u') {
            console.log(d.url);
            chrome.tabs.get(d.tabId, (tab) => {
                detectedRequests.push({
                    url: d.url,
                    title: tab.title
                });
                // 更新插件图标上的计数
                chrome.action.setBadgeText({ text: detectedRequests.length.toString(), tabId: d.tabId });
            });
        }
    },
    {
        urls: ['<all_urls>']
    }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.msg === 'getUrls') {
        sendResponse({ data: detectedRequests });
    }
    return true; // 异步响应
});
