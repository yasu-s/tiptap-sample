<script setup lang="ts">
import { defineProps } from 'vue'

/** props */
const props = defineProps<{ content: string }>()
</script>

<template>
  <pre class="HtmlPreviewPanel" v-html="props.content" />
</template>
