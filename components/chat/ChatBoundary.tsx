"use client";

import { Component, type ReactNode } from "react";

/** The chat is an extra. If anything inside it throws, it disappears and the page carries on. */
export default class ChatBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
