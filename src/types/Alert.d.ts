import { Run } from './Run';

export namespace Alert {
  type Name =
    'ReturnToStartConfirm' |
    'RefreshScheduleConfirm'

  interface Dialog extends Window {
    openDialog: (
      opts: { name: Name, data?: { runData?: Run }, func?: (confirm: boolean) => void }
    ) => void;
  }
}