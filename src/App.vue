<script setup lang="ts">
import { ref } from 'vue'
import TiptapEditor from './components/TiptapEditor.vue'
import HtmlPreviewPanel from './components/HtmlPreviewPanel.vue'

/** サンプルHTML */
const sampleHtml = `<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h4>h4</h4>
<h5>h5</h5>
<p>text</p>
<p><strong>太字</strong></p>
<p><em>斜体</em></p>
<p><s>取り消し</s></p>
<p><u>下線</u></p>
<p><mark data-color="#ffcc00" style="background-color: #ffcc00">マーカー</mark></p>
<p><span style="color: #0000ff">色付き</span></p>
改行<br><br>
<p style="text-align: center">中央寄せ</p>
<p style="text-align: right">右寄せ</p>
<hr>
<p></p>
<ul>
  <li><p>リスト</p>
    <ul>
      <li><p>リストネスト１</p>
        <ul>
          <li><p>リストネスト２</p>
            <ul><li><p>リストネスト３</p></li></ul>
          </li>
          <li><p>リストネスト２</p></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
<p></p>
<ol>
  <li><p>数字リスト</p>
    <ol>
      <li><p>リストネスト１</p>
        <ol>
          <li><p>リストネスト２</p>
            <ol>
              <li><p>リストネスト３</p></li>
              <li><p>リストネスト３</p></li>
              <li><p>リストネスト３</p></li>
            </ol>
          </li>
          <li><p>リストネスト２</p></li>
        </ol>
      </li>
    </ol>
  </li>
</ol>
<br>
<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.google.com/">URLリンク</a></p>
`

/** HTMLコンテンツ */
const content = ref(sampleHtml)
</script>

<template>
  <div class="App">
    <div class="App__EditorPane">
      <TiptapEditor v-model="content" class="App__TiptapEditor" />
    </div>
    <div class="App__SidePanes">
      <v-textarea v-model="content" label="HTML入力" rows="18" :no-resize="true" hide-details="true" />
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
  height: calc(100vh - 24px);

  &__EditorPane {
    width: 50%;
  }

  &__SidePanes {
    width: 50%;
    height: 100%;
  }

  &__HtmlPreviewPanel {
    height: calc(100% - 464px - 25px);
  }
}
</style>

<style lang="scss">
body {
  background: #eee;
}
</style>
