import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { getConversations } from "indexedDb/conversation";
import useConversation from "sidePanel/hooks/useConversation";
import { currentTabAtom } from "sidePanel/utils/atoms";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { Conversation, Order } from "utils/types";

import { ConversationItem, HistoryTabContent } from "./styled";

const HistoryTab = () => {
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { currentConversation, setCurrentConversation } = useConversation();

  useEffect(() => {
    getConversations({ page: 1, order: Order.desc }).then((conversations) => {
      setConversations(conversations);
    });
  }, []);

  const renderConversation = useCallback(
    (conversation: Conversation) => {
      return (
        <ConversationItem
          key={conversation.id}
          onClick={() => {
            if (currentConversation?.id === conversation.id) {
              setCurrentTab(TabTitlesEnum.chat);
              return;
            }
            setCurrentConversation(conversation);
          }}
        >
          <div>{conversation.createdAt}</div>
          <div>{conversation.preview}</div>
        </ConversationItem>
      );
    },
    [currentConversation?.id]
  );

  return (
    <HistoryTabContent $show={currentTab == TabTitlesEnum.history}>
      {conversations.map(renderConversation)}
    </HistoryTabContent>
  );
};

export default HistoryTab;