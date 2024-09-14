interface Youtube extends Window {
  onYouTubeIframeAPIReady: () => void;
  YT: {
    Player: new (element: Element | null, options: any) => void;
    PlayerState: {
      PLAYING: any;
      PAUSED: any;
      ENDED: any;
      [key: string]: any;
    };
  };
}
