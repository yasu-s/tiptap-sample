<script setup lang="ts">
import { Level as HeadingLevel } from '@tiptap/extension-heading'
import { Editor } from '@tiptap/vue-3'

/** props */
const props = defineProps<{ editor: Editor }>()

/** h1-h4設定 */
const headings: { level: HeadingLevel; text: string }[] = [
  { level: 1, text: 'h1' },
  { level: 2, text: 'h2' },
  { level: 3, text: 'h3' },
  { level: 4, text: 'h4' },
  { level: 5, text: 'h5' },
]

/** スタイルボタン */
const styleBtns = [
  {
    icon: 'mdi-format-bold',
    actionName: 'bold',
    click: () => props.editor.chain().focus().toggleBold().run(),
  },
  {
    icon: 'mdi-format-italic',
    actionName: 'italic',
    click: () => props.editor.chain().focus().toggleItalic().run(),
  },
  {
    icon: 'mdi-format-strikethrough',
    actionName: 'strike',
    click: () => props.editor.chain().focus().toggleStrike().run(),
  },
  {
    icon: 'mdi-format-underline',
    actionName: 'underline',
    click: () => props.editor.chain().focus().toggleUnderline().run(),
  },
  {
    icon: 'mdi-marker',
    actionName: 'highlight',
    click: () => props.editor.chain().focus().toggleHighlight({ color: '#ffcc00' }).run(),
  },
]

/** TextAlign */
const textAlign = ['left', 'center', 'right']

/** フォーマットボタン */
const formatBtns = [
  {
    icon: 'mdi-minus',
    actionName: 'horizontalRule',
    click: () => props.editor.chain().focus().setHorizontalRule().run(),
  },
  {
    icon: 'mdi-format-list-bulleted',
    actionName: 'bulletList',
    click: () => props.editor.chain().focus().toggleBulletList().run(),
  },
  {
    icon: 'mdi-format-list-numbered',
    actionName: 'orderedList',
    click: () => props.editor.chain().focus().toggleOrderedList().run(),
  },
]

/** variant取得 */
function getVariant(name: string) {
  return props.editor.isActive(name) ? 'tonal' : 'plain'
}

/** 色取得 */
function getColor(name: string) {
  return props.editor.isActive(name) ? 'drakgrey' : undefined
}
/** 色設定 */
function setColor(event: Event): void {
  const target = event.target as HTMLInputElement
  if (!target) return
  props.editor.chain().focus().setColor(target.value).run()
}
</script>

<template>
  <div class="Toolbar">
    <!-- h1-h4 p -->
    <template v-for="(btn, index) in headings" :key="index">
      <v-btn
        rounded="lg"
        :variant="props.editor.isActive('heading', { level: btn.level }) ? 'tonal' : 'plain'"
        :color="props.editor.isActive('heading', { level: btn.level }) ? 'drakgrey' : undefined"
        @click="props.editor.chain().focus().toggleHeading({ level: btn.level }).run()"
        >{{ btn.text }}
      </v-btn>
    </template>

    <v-btn
      rounded="lg"
      :variant="props.editor.isActive('paragraph') ? 'tonal' : 'plain'"
      :color="props.editor.isActive('paragraph') ? 'drakgrey' : undefined"
      @click="props.editor.chain().focus().setParagraph().run()"
      >Text</v-btn
    >
    <v-divider vertical />

    <!-- フォントスタイル変更 -->
    <template v-for="(btn, index) in styleBtns" :key="index">
      <v-btn
        :icon="btn.icon"
        rounded="lg"
        :variant="getVariant(btn.actionName)"
        :color="getColor(btn.actionName)"
        @click="btn.click()"
      />
    </template>
    <input type="color" :value="props.editor.getAttributes('textStyle').color" @input="setColor($event)" />
    <v-divider vertical />

    <!-- 配置変更 -->
    <template v-for="(t, index) in textAlign" :key="index">
      <v-btn
        rounded="lg"
        :icon="'mdi-format-align-' + t"
        :variant="editor.isActive({ textAlign: t }) ? 'tonal' : 'plain'"
        :color="editor.isActive('heading', { textAlign: t }) ? 'drakgrey' : undefined"
        @click="editor.chain().focus().setTextAlign(t).run()"
      />
    </template>
    <v-divider vertical />

    <!-- フォーマット変更 -->
    <template v-for="(btn, index) in formatBtns" :key="index">
      <v-btn
        :icon="btn.icon"
        rounded="lg"
        :variant="getVariant(btn.actionName)"
        :color="getColor(btn.actionName)"
        @click="btn.click()"
      />
    </template>
    <v-btn
      rounded="lg"
      icon="mdi-format-indent-increase"
      :variant="editor.can().sinkListItem('listItem') ? 'tonal' : 'plain'"
      :color="editor.can().sinkListItem('listItem') ? 'drakgrey' : undefined"
      @click="editor.chain().focus().sinkListItem('listItem').run()"
    />
    <v-btn
      rounded="lg"
      icon="mdi-format-indent-decrease"
      :variant="editor.can().liftListItem('listItem') ? 'tonal' : 'plain'"
      :color="editor.can().liftListItem('listItem') ? 'drakgrey' : undefined"
      @click="editor.chain().focus().liftListItem('listItem').run()"
    />
  </div>
</template>

<style lang="scss" scoped>
.Toolbar {
  background: #eee;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
