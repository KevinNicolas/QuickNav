export function openExtensionOptions() {
  chrome.runtime.openOptionsPage();
  // chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
}

export const localStorage = {
  getItem(itemName?: string | string[]) {
    return chrome.storage.local.get(itemName);
  },
  async getArrayItem<T>(itemName: string): Promise<T[]> {
    const item = await chrome.storage.local.get(itemName);
    if (!item[itemName]) return [];
    return Object.values(item[itemName])
  },
  setItem(itemName: string, value: unknown) {
    chrome.storage.local.set({
      [itemName]: value
    });
  }
}