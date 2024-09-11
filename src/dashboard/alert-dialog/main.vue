<template>
  <div>
    <component :is="currentComponent" :alert-data="alertData" @confirm="close(true)" @dismiss="close(false)" />
  </div>
</template>


<script setup lang="ts">
import { ref, markRaw, onMounted } from 'vue';
import ReturnToStartConfirm from './components/ReturnToStartConfirm.vue';
import RefreshScheduleConfirm from './components/RefreshScheduleConfirm.vue';
import { Alert, Run } from '@sre-frontend-layout/types';
import { NodeCGAPIClient } from '@nodecg/types/client/api/api.client';

// const dialog = ref<NodeCGAPIClient['getDialog']>()
let dialog: ReturnType<NodeCGAPIClient['getDialog']>
let callbackFunc: ((confirm: boolean) => void) | null = null;
let currentComponent = ref()
const alertData = ref<Run>({} as Run)

currentComponent.value = markRaw(ReturnToStartConfirm)

function confirm(): void {
  document.removeEventListener('dialog-dismissed', dismiss);
}

function dismiss(): void {
  document.removeEventListener('dialog-confirmed', confirm);
}

function open(opts: { name: Alert.Name, data?: { runData?: Run }, func?: (confirm: boolean) => void }): void {
  dialog?.open()
  document.addEventListener('dialog-opened', () => {
    currentComponent.value = ((name: string): any => {
      switch (name) {
        case 'ReturnToStartConfirm':
          return ReturnToStartConfirm
        case 'RefreshScheduleConfirm':
          return RefreshScheduleConfirm
        default:
          return undefined;
      }
    })(opts.name) || null;
    callbackFunc = opts.func || null
    if (opts.data) {
      alertData.value = (opts.data.runData) ? opts.data.runData : {} as Run
    }
  }, { once: true })
  document.addEventListener('dialog-confirmed', confirm, { once: true });
  document.addEventListener('dialog-dismissed', dismiss, { once: true });
}

function close(confirm: boolean): void {
  // Trigger callback function passed earlier if set.
  if (callbackFunc) {
    callbackFunc(confirm);
  }
  (dialog as any)._updateClosingReasonConfirmed(confirm); // eslint-disable-line no-underscore-dangle
  dialog?.close();
  currentComponent.value = null;
  alertData.value = {} as Run;
  callbackFunc = null;
}

onMounted(() => {
  dialog = nodecg.getDialog('alert_dialog') as any

  (window as Window as Alert.Dialog).openDialog = (opts: {
    name: Alert.Name,
    data?: { runData?: Run },
    func?: (confirm: boolean) => void,
  }): void => open(opts);

  const elem = dialog?.getElementsByTagName('paper-dialog-scrollable')[0] as HTMLElement;
  elem.style.marginBottom = '12px';

  // Allow alerts to be arbitrarily triggered.
  nodecg.listenFor('triggerAlert', (name: Alert.Name) => {
    open({ name });
  });
})
</script>