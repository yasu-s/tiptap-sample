<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<template>
  <pre class="HtmlPreviewPanel" v-html="props.content" />
</template>
