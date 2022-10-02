<script setup lang="ts">
import { ref } from 'vue'
import TiptapEditor from './components/TiptapEditor.vue'
import HtmlPreviewPanel from './components/HtmlPreviewPanel.vue'

/** HTMLコンテンツ */
const content = ref('<h1>Hh</h1><br /><h2>h2</h2><h2>h2</h2><h2>h2</h2><h2>h2</h2><h2>h2</h2>')
</script>

<template>
  <div class="App">
    <div class="App__EditorPane">
      <TiptapEditor v-model="content" class="App__TiptapEditor" />
    </div>
    <div class="App__SidePanes">
      <v-textarea v-model="content" label="HTML入力" rows="15" no-resize="true" hide-details="true"></v-textarea>
      <div>HTML表示</div>
      <HtmlPreviewPanel class="App__HtmlPreviewPanel" :content="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.App {
  padding: 24px;
  display: flex;
  gap: 8px;
  width: 100%;
  height: calc(100vh - 48px);

  &__EditorPane {
    width: 50%;
  }

  &__SidePanes {
    width: 50%;
    height: 100%;
  }

  &__HtmlPreviewPanel {
    height: calc(100% - 360px - 58px);
  }
}
</style>

<style lang="scss">
body {
  background: #eee;
}
</style>
