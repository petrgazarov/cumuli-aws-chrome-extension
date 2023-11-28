import { useAtom } from "jotai";
import cloneDeep from "lodash.clonedeep";
import { useCallback } from "react";

import { currentChatMessagesAtom } from "sidePanel/utils/atoms";
import { getChatMessageText, getImageContentFromMessage } from "utils/helpers";
import { ChatMessage, Role, UserChatMessage } from "utils/types";

const useChatMessages = () => {
  const [currentChatMessages, setCurrentChatMessages] = useAtom(
    currentChatMessagesAtom
  );

  const appendMessage = useCallback((chatMessage: ChatMessage) => {
    setCurrentChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      chatMessage,
    ]);
  }, []);

  const appendChunk = useCallback((chunk: string) => {
    setCurrentChatMessages((prevChatMessages) => {
      const newMessages = cloneDeep(prevChatMessages);
      const lastMessage = newMessages[newMessages.length - 1];

      if (lastMessage?.role === Role.assistant) {
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + chunk,
        };
      }

      return newMessages;
    });
  }, []);

  const replaceMessage = useCallback((chatMessage: UserChatMessage) => {
    setCurrentChatMessages((prevChatMessages): ChatMessage[] => {
      const messageIndex = prevChatMessages.findIndex(
        (m) => m.id === chatMessage.id
      );

      if (messageIndex === -1) {
        return prevChatMessages;
      }

      return [...prevChatMessages.slice(0, messageIndex), chatMessage];
    });
  }, []);

  const removeImageFromMessage = useCallback((chatMessage: UserChatMessage) => {
    setCurrentChatMessages((prevChatMessages): ChatMessage[] => {
      const messageIndex = prevChatMessages.findIndex(
        (m) => m.id === chatMessage.id
      );

      if (messageIndex === -1) {
        return prevChatMessages;
      }

      const newChatMessages = cloneDeep(prevChatMessages);

      const prevChatMessage = newChatMessages[messageIndex];
      const imageContent = getImageContentFromMessage(prevChatMessage);

      if (imageContent) {
        return [
          ...newChatMessages.slice(0, messageIndex),
          { ...prevChatMessage, content: getChatMessageText(chatMessage) },
          ...newChatMessages.slice(messageIndex + 1),
        ];
      }

      return newChatMessages;
    });
  }, []);

  return {
    currentChatMessages,
    setCurrentChatMessages,
    appendMessage,
    appendChunk,
    replaceMessage,
    removeImageFromMessage,
  };
};

export default useChatMessages;
