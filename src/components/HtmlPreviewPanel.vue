<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<template>
  <div class="HtmlPreviewPanel" v-html="props.content" />
</template>

<style lang="scss" scoped>
.HtmlPreviewPanel {
  background: #fff;
  height: 100%;
  overflow-y: scroll;
}
</style>
