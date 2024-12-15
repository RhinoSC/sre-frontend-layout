<script setup lang="ts">
import { ExampleType } from '@sre-frontend-layout/types';
import { Configschema, ExampleReplicant } from '@sre-frontend-layout/types/schemas';
import { useHead } from '@vueuse/head';
import { useReplicant } from 'nodecg-vue-composable';
import { onMounted, ref } from 'vue';

const text = ref('Example');

// Set the title of this page.
useHead({ title: 'example' });

// Helper composable to make accessing/modifying replicants easier.
// For more information see https://github.com/Dan-Shields/nodecg-vue-composable
const exampleReplicant = useReplicant<ExampleReplicant>(
  'apiToken',
  'sre-frontend-layout',
);


// console.log(exampleReplicant.)
// Access the bundle configuration with types.
const config = nodecg.bundleConfig as Configschema;

// Accessing normal types.
const exampleType: ExampleType = { exampleProperty: 'exampleString' };

onMounted(() => {
  const rep1 = nodecg.Replicant('apiToken');

  NodeCG.waitForReplicants(rep1).then(() => {
    console.log('rep1 and rep2 are fully declared and ready to use!');
    console.log(exampleReplicant?.data, exampleReplicant?.changed)
  });

})
</script>

<template>
  <div>
    {{ exampleReplicant?.data }}
    <br><br>
    <img src="./image.png" :style="{ width: '100%' }">
    <br><br>
    <QBtn color="primary" label="Example" />
  </div>
</template>
