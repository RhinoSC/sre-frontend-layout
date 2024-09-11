import { Run } from './Run';

export namespace Alert {
  type Name =
    'ImportConfirm' |
    'ReturnToStartConfirm' |
    'RemoveAllRunsConfirm' |
    'RemoveRunConfirm' |
    'TwitchLogoutConfirm' |
    'NoTwitchGame';

  interface Dialog extends Window {
    openDialog: (
      opts: { name: Name, data?: { runData?: Run }, func?: (confirm: boolean) => void }
    ) => void;
  }
}