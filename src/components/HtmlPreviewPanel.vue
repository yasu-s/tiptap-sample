<script setup lang="ts">
const props = defineProps<{ content: string }>()

function convert(html: string) {
  const h = html.split('\n')
  return h.map((s) => s || '<p></p>').join('')
}
</script>

<template>
  <div class="HtmlPreviewPanel" v-html="convert(props.content)" />
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

:deep(p:empty) {
  height: 24px;
}
</style>
