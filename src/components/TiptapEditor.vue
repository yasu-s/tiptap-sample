<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { withDefaults, onBeforeUnmount } from 'vue'

/** props */
const props = withDefaults(defineProps<{ modelValue: string }>(), { modelValue: '' })

/** Emit定義 */
const emit = defineEmits<{ (e: 'update:modelValue', value: string): string }>()

/** tiptap */
const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: (params) => {
    emit('update:modelValue', convertHtml(params.editor.getHTML()))
  },
})

/** unmound時 */
onBeforeUnmount(() => {
  editor.value?.destroy()
})

/** HTML加工 */
function convertHtml(html: string) {
  const tags = ['</h1>', '</h2>', '</h3>', '</h4>', '</ul>', '</li>', '</p>', '<br>', '<hr>']
  return tags.reduce((s, tag) => s.replaceAll(tag, `${tag}\r\n`), html)
}
</script>

<template>
  <div class="TiptapEditor">
    <EditorContent :editor="editor" class="TiptapEditor__Editor" />
  </div>
</template>

<style lang="scss" scoped>
.TiptapEditor {
  height: 100%;
  overflow-y: scroll;
  border: 1px solid #eee;
}

:deep(.ProseMirror) {
  border: none;
  outline: none;
}
</style>
