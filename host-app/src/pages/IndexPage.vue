<template>
  <div>
    <h5>Host Application</h5>
    <RemoteComponent />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const RemoteComponent = defineAsyncComponent(() =>
  import("remoteAppComponents/RemoteComponent.vue")
);
</script>
