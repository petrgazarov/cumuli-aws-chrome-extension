import { AWS_HOST } from "utils/constants";
import { CommandChannelAction } from "utils/types";

export { chatChannelListener } from "./channelListeners";

export const commandListener = async (command: string) => {
  if (command === CommandChannelAction.submit_with_screenshot) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      const isPageSupported =
        activeTab.url?.indexOf(AWS_HOST) &&
        activeTab.url?.indexOf(AWS_HOST) > -1;

      if (!isPageSupported) {
        console.debug(
          `[Cumuli] Attempted to take screenshot, but page not supported: ${activeTab.url}`
        );
        return;
      }

      chrome.runtime.sendMessage({ action: command });
    });
  }
};

export const onTabUpdatedListener = async (
  tabId: number,
  _: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  if (!tab.url) {
    return;
  }
  const url = new URL(tab.url);

  if (url.origin.includes(AWS_HOST)) {
    await chrome.sidePanel.setOptions({
      enabled: true,
      path: "sidepanel.html",
      tabId,
    });
  } else {
    await chrome.sidePanel.setOptions({
      enabled: false,
      tabId,
    });
  }
};
