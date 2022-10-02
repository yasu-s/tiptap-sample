<script setup lang="ts">
import { ref } from 'vue'
import 'splitpanes/dist/splitpanes.css'
import { Splitpanes, Pane } from 'splitpanes'
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
    <Splitpanes class="default-theme App__SidePanes" horizontal>
      <Pane class="App__SplitPane" min-size="30" max-size="80">
        <span>1</span>
      </Pane>
      <Pane class="App__SplitPane">
        <HtmlPreviewPanel class="App__HtmlPreviewPanel" :content="content" />
      </Pane>
    </Splitpanes>
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

  &__SplitPane {
    overflow-y: scroll;
  }
}
</style>
