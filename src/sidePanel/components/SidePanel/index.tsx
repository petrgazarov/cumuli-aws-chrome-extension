import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import useConversations from "sidePanel/hooks/useConversations";
import { currentTabAtom, openaiApiKeyAtom } from "sidePanel/utils/atoms";
import { PANEL_CONTENT_ID } from "sidePanel/utils/constants";
import { TabTitlesEnum } from "sidePanel/utils/types";
import { getOpenaiApiKey } from "utils/helpers";

import { Container, Content, TabTitle, TabTitlesContainer } from "./styled";
import ChatTab from "./tabs/ChatTab";
import ConfigTab from "./tabs/ConfigTab";
import HistoryTab from "./tabs/HistoryTab";

const SidePanel = () => {
  const [, setOpenaiApiKey] = useAtom(openaiApiKeyAtom);
  const [currentTab, setCurrentTab] = useAtom(currentTabAtom);
  const { getConversations } = useConversations();

  useEffect(() => {
    getOpenaiApiKey().then((apiKey: string) => {
      setOpenaiApiKey(apiKey);
    });
  }, []);

  useEffect(() => {
    getConversations();
  }, []);

  const onTabTitleClick = useCallback(
    (tabTitle: TabTitlesEnum) =>
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (currentTab === tabTitle) {
          // TODO: Scroll to top
        } else {
          setCurrentTab(tabTitle);
        }
      },
    [currentTab]
  );

  return (
    <Container>
      <TabTitlesContainer>
        <TabTitle
          $active={currentTab === TabTitlesEnum.chat}
          onClick={onTabTitleClick(TabTitlesEnum.chat)}
        >
          Chat
        </TabTitle>
        <TabTitle
          $active={currentTab === TabTitlesEnum.history}
          onClick={onTabTitleClick(TabTitlesEnum.history)}
        >
          History
        </TabTitle>

        <TabTitle
          $active={currentTab === TabTitlesEnum.config}
          onClick={onTabTitleClick(TabTitlesEnum.config)}
        >
          Config
        </TabTitle>
      </TabTitlesContainer>
      <Content id={PANEL_CONTENT_ID}>
        <ChatTab />
        {currentTab == TabTitlesEnum.history && <HistoryTab />}
        {currentTab == TabTitlesEnum.config && <ConfigTab />}
      </Content>
    </Container>
  );
};

export default SidePanel;
