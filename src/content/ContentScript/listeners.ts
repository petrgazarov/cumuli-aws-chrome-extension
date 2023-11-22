type ListenerFn = (message: any) => void;

export const addWindowListener = (type: string, listener: ListenerFn) => {
  window.addEventListener(type, listener);
};

export const removeWindowListener = (type: string, listener: ListenerFn) => {
  window.removeEventListener(type, listener);
};

export const addOnMessageListener = (listener: ListenerFn) => {
  chrome.runtime.onMessage.addListener(listener);
};

export const removeOnMessageListener = (listener: ListenerFn) => {
  chrome.runtime.onMessage.removeListener(listener);
};

export const addPortMessageListener = (
  port: chrome.runtime.Port,
  listener: ListenerFn
) => {
  port.onMessage.addListener(listener);
};

export const removePortMessageListener = (
  port: chrome.runtime.Port,
  listener: ListenerFn
) => {
  port.onMessage.removeListener(listener);
};

export const createPort = (channelName: string) => {
  return chrome.runtime.connect({ name: channelName });
};

export const removePort = (port: chrome.runtime.Port) => {
  port.disconnect();
};
