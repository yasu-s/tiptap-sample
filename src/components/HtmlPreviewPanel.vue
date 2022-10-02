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
  padding: 8px;
}

:deep(ul) {
  padding: 0 1rem;
  list-style: disc;
}

:deep(ol) {
  padding: 0 1rem;
  list-style: reset;
}
</style>
