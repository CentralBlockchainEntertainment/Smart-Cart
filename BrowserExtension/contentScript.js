// contentScript.js
chrome.contextMenus.create({
    id: "searchByImage",
    title: "Search for products by image",
    contexts: ["image"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "searchByImage") {
        const imageUrl = info.srcUrl;
        chrome.runtime.sendMessage({ action: 'SEARCH_BY_IMAGE', imageUrl }, (response) => {
            if (response.success) {
                alert(`Found matching products!`);
                console.log(response.products);
            } else {
                alert(`Failed to find products: ${response.error}`);
            }
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'SEARCH_BY_IMAGE') {
        const { imageUrl } = message;
        searchByImage(imageUrl)
            .then(products => sendResponse({ success: true, products }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});

const searchByImage = async (imageUrl) => {
    const response = await fetch('https://api.imagerecognition.com/search', {
        method: 'POST',
        body: JSON.stringify({ imageUrl }),
    });
    const products = await response.json();
    return products;
};
