// Lets any part of the site open the assistant, optionally with a first message. Client-side only.
export const CHAT_EVENT = "mfc:chat";

export interface ChatOpenDetail {
  message?: string;
}

export const openAssistant = (message?: string) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ChatOpenDetail>(CHAT_EVENT, { detail: { message } }));
};
