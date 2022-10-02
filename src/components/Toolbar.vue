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
]

/** フォーマットボタン */
const formatBtns = [
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

    <template v-for="(btn, index) in formatBtns" :key="index">
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
