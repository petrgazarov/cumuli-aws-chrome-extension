import { useCallback } from "react";

type UseKeyDownChatMessageListenerParams = {
  handleSubmitMessage: (value: string) => void;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

const useKeyDownChatMessageListener = ({
  handleSubmitMessage,
  setTextInput,
  textareaRef,
}: UseKeyDownChatMessageListenerParams) => {
  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();

      // If Shift + Enter is pressed, insert a new line at cursor position
      if (event.shiftKey) {
        const cursorPosition = textareaRef.current?.selectionStart || 0;
        setTextInput((prev) => {
          const newValue =
            prev.slice(0, cursorPosition) + "\n" + prev.slice(cursorPosition);
          // After state update, move the cursor after the inserted newline
          setTimeout(() => {
            textareaRef.current?.setSelectionRange(
              cursorPosition + 1,
              cursorPosition + 1
            );
          }, 0);
          return newValue;
        });
        return;
      }

      const currentInputValue = textareaRef.current?.value || "";
      // Disallow sending empty messages
      if (!currentInputValue.trim()) {
        return;
      }

      handleSubmitMessage(currentInputValue);
    },
    [handleSubmitMessage, textareaRef, setTextInput]
  );

  return handleKeyDown;
};

export default useKeyDownChatMessageListener;
