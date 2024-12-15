<template>
  <q-tooltip v-if="!disabled" :content="tooltip" anchor="top right">
    <q-btn flat dense round icon="icon" :disable="disabled" @click="$emit('click')">
      <q-icon :name="icon" size="sm" />
    </q-btn>
  </q-tooltip>
  <q-btn v-else flat dense round icon="icon" :disable="disabled" @click="$emit('click')">
    <q-icon :name="icon" size="sm" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
