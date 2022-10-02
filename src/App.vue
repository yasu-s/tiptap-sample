<script setup lang="ts">
import { reactive } from 'vue'
import 'splitpanes/dist/splitpanes.css'
import { Splitpanes, Pane } from 'splitpanes'
import HtmlPreviewPanel from './components/HtmlPreviewPanel.vue'

/** state */
const state = reactive({
  content: '<h1>Hh</h1><br /><h2>h2</h2><h2>h2</h2><h2>h2</h2><h2>h2</h2><h2>h2</h2>',
})
</script>

<template>
  <div class="App">
    <Splitpanes class="default-theme" horizontal style="height: 400px">
      <Pane class="App__Pane" min-size="30" max-size="80">
        <span>1</span>
      </Pane>
      <Pane class="App__Pane">
        <HtmlPreviewPanel class="App__HtmlPreviewPanel" :content="state.content" />
      </Pane>
    </Splitpanes>
  </div>
</template>

<style lang="scss" scoped>
.App {
  &__Pane {
    overflow-y: scroll;
  }
}
</style>
