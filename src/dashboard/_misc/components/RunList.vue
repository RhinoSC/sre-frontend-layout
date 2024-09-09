<template>
  
</template>

<script lang="ts" setup>

</script>


<!-- <template>
  <q-expansion-item :expanded.sync="expanded"
    :header-class="!editor && activeRun && activeRun.id === run.id ? 'bg-grey-8' : ''"
    header-style="overflow-x: hidden;" :content-style="{ 'overflow-wrap': 'break-word' }">
    <template v-slot:header>
      <span>
        <q-icon v-if="!moveDisabled" name="drag_vertical" class="cursor-pointer" />
        {{ run.game }}
      </span>
    </template>

    <template v-slot:default>
      <div v-if="playerStr">
        <span class="font-weight-bold">Players:</span>
        <span>{{ playerStr }}</span>
      </div>
      <div v-if="run.category">
        <span class="font-weight-bold">Category:</span>
        <span>{{ run.category }}</span>
      </div>
      <div v-if="run.estimate">
        <span class="font-weight-bold">Estimate:</span>
        <span>{{ run.estimate }}</span>
      </div>
      <div v-if="run.plaftorm">
        <span class="font-weight-bold">Platform:</span>
        <span>{{ run.plaftorm }}</span>
      </div>
      <div v-if="run.relay">
        <span class="font-weight-bold">Relay:</span>
        <span>✅</span>
      </div>
      <div v-if="runFinishTime">
        <span class="font-weight-bold">Final Time:</span>
        <span>{{ runFinishTime.time }}</span>
      </div>

      <div class="q-mt-sm">
        <div v-if="!editor">
          <modify-button icon="play_arrow" tooltip="Play Run" :disabled="disableChange" @click="playRun" />
        </div>
        <div v-else>
          <modify-button icon="content_copy" tooltip="Duplicate Run" @click="duplicateRun" />
          <modify-button icon="add_box" tooltip="New Run After" @click="addNewRunAfter" />
          <modify-button icon="edit" tooltip="Edit Run" @click="editRun" />
          <modify-button icon="delete" tooltip="Remove Run" @click="removeRunConfirm" />
        </div>
      </div>
    </template>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import ModifyButton from './ModifyButton.vue';
import { getDialog } from '../../_misc/helpers';
import { ActiveRun, RunFinishTimes } from '@sre-frontend-layout/types/schemas';
import { useReplicant } from 'nodecg-vue-composable';
import { Team } from '@sre-frontend-layout/types';

export default defineComponent({
  components: { ModifyButton },
  props: {
    run: {
      type: Object,
      required: true,
    },
    editor: Boolean,
    disableChange: Boolean,
    moveDisabled: Boolean,
  },
  setup(props) {

    const activeRun = useReplicant<ActiveRun>(
      'activeRun',
      'sre-frontend-layout',
    );

    const runFinishTimes = useReplicant<RunFinishTimes>(
      'runFinishTimes',
      'sre-frontend-layout',
    );

    const playerStr = computed(() =>
      props.run.teams
        .map(
          (team: Team) =>
            `${team.name ? `${team.name}: ` : ''}${team.players
              .map((player) => player.name)
              .join(', ')}`
        )
        .join(' vs. ')
    );

    const activeRunRep = nodecg.Replicant<ActiveRun>('activeRun');
    const runFinishTimesRep = nodecg.Replicant<RunFinishTimes>('runFinishTimes');

    NodeCG.waitForReplicants(activeRunRep, runFinishTimesRep).then(() => {

      if (runFinishTimes && runFinishTimes.data) {
        const runFinishTime = computed(() => [props.run.id]);
      }
    });


    const playRun = async () => {
      try {
        const noTwitchGame = await nodecg.sendMessage('changeActiveRun', props.run.id);
        if (noTwitchGame) {
          const dialog = getDialog('alert-dialog');
          if (dialog) dialog.openDialog({ name: 'NoTwitchGame' });
        }
      } catch (err) {
        // handle error
      }
    };

    const duplicateRun = () => {
      const dialog = getDialog('run-modification-dialog');
      if (dialog) {
        dialog.openDialog({
          mode: 'Duplicate',
          run: props.run,
        });
      }
    };

    const addNewRunAfter = () => {
      const dialog = getDialog('run-modification-dialog');
      if (dialog) {
        dialog.openDialog({
          mode: 'New',
          prevID: props.run.id,
        });
      }
    };

    const editRun = () => {
      const dialog = getDialog('run-modification-dialog');
      if (dialog) {
        dialog.openDialog({
          mode: 'EditOther',
          run: props.run,
        });
      }
    };

    const removeRunConfirm = () => {
      const dialog = getDialog('alert-dialog');
      if (dialog) {
        dialog.openDialog({
          name: 'RemoveRunConfirm',
          data: { run: props.run },
          func: removeRun,
        });
      }
    };

    const removeRun = async (confirm: boolean) => {
      if (confirm) {
        try {
          await nodecg.sendMessage('removeRun', props.run.id);
        } catch (err) {
          // handle error
        }
      }
    };

    return {
      activeRun,
      runFinishTime,
      playerStr,
      playRun,
      duplicateRun,
      addNewRunAfter,
      editRun,
      removeRunConfirm,
    };
  },
});
</script> -->
