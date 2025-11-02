declare global {
  interface Window {
    pMain?: {
      removeLoading: () => void;
      Minimize: () => void;
      Maximize: () => void;
      Close: () => void;
      sendMessage: (message: string) => void;
      on: (channel: string, callback: (data: any) => void) => void;
    };
  }
}

export {};
