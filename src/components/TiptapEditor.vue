<script setup lang="ts">
import { withDefaults, onBeforeUnmount, watch, toRefs } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import pretty from 'pretty'
import { Indent } from '../extensions/Indent'
import Toolbar from './Toolbar.vue'

/** props */
const props = withDefaults(defineProps<{ modelValue: string }>(), { modelValue: '' })
const { modelValue } = toRefs(props)

/** emit */
const emit = defineEmits<{ (e: 'update:modelValue', value: string): string }>()

/** tiptap */
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    Indent,
    StarterKit,
    Color,
    TextStyle,
    Underline,
    Link,
    Image.configure({ allowBase64: true }),
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right'],
    }),
  ],
  onUpdate: (params) => {
    emit('update:modelValue', pretty(params.editor.getHTML()))
  },
})

/** modelValue監視 */
watch(modelValue, () => {
  if (modelValue.value === pretty(editor.value?.getHTML() || '')) return
  editor.value?.commands.setContent(modelValue.value)
})

/** unmound時 */
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="TiptapEditor">
    <Toolbar v-if="editor" :editor="editor" class="TiptapEditor__Toolbar" />
    <EditorContent :editor="editor" class="TiptapEditor__Editor" />
  </div>
</template>

<style lang="scss" scoped>
.TiptapEditor {
  height: 100%;
  overflow-y: scroll;
  background: #fff;
  border: 1px solid #ccc;
}

:deep(.ProseMirror) {
  border: none;
  outline: none;
  padding: 8px;

  ul {
    padding: 0 1rem;
    list-style: disc;
  }
  ol {
    padding: 0 1rem;
    list-style: reset;
  }
}
</style>
