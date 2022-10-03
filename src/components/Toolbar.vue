<script setup lang="ts">
import { reactive } from 'vue'
import { Level as HeadingLevel } from '@tiptap/extension-heading'
import { Editor } from '@tiptap/vue-3'

/** props */
const props = defineProps<{ editor: Editor }>()

/** state */
const state = reactive({
  dialog: false,
  url: '',
})

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

/** URLダイアログオープン */
function openUrlDialog(): void {
  const previousUrl = props.editor.getAttributes('link').href as string
  state.url = previousUrl ? previousUrl : ''
  state.dialog = true
}

/** Link設定 */
function setLink(): void {
  if (state.url) {
    props.editor.chain().focus().extendMarkRange('link').setLink({ href: state.url }).run()
  } else {
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
  }
  state.dialog = false
}
</script>

<template>
  <div class="Toolbar">
    <!-- h1-h4 p -->
    <template v-for="(btn, index) in headings" :key="index">
      <v-btn
        class="Toolbar__TextButton"
        rounded="lg"
        :variant="props.editor.isActive('heading', { level: btn.level }) ? 'tonal' : 'plain'"
        :color="props.editor.isActive('heading', { level: btn.level }) ? 'drakgrey' : undefined"
        @click="props.editor.chain().focus().toggleHeading({ level: btn.level }).run()"
        >{{ btn.text }}
      </v-btn>
    </template>

    <v-btn
      class="Toolbar__TextButton"
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
        class="Toolbar__Button"
        :icon="btn.icon"
        rounded="lg"
        :variant="getVariant(btn.actionName)"
        :color="getColor(btn.actionName)"
        @click="btn.click()"
      />
    </template>
    <input
      class="Toolbar__ColorInput"
      type="color"
      :value="props.editor.getAttributes('textStyle').color"
      @input="setColor($event)"
    />
    <v-divider vertical />

    <!-- 配置変更 -->
    <template v-for="(t, index) in textAlign" :key="index">
      <v-btn
        class="Toolbar__Button"
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
        class="Toolbar__Button"
        :icon="btn.icon"
        rounded="lg"
        :variant="getVariant(btn.actionName)"
        :color="getColor(btn.actionName)"
        @click="btn.click()"
      />
    </template>
    <v-btn
      class="Toolbar__Button"
      rounded="lg"
      icon="mdi-format-indent-increase"
      variant="plain"
      :disabled="!editor.can().sinkListItem('listItem')"
      @click="editor.chain().focus().sinkListItem('listItem').run()"
    />
    <v-btn
      class="Toolbar__Button"
      rounded="lg"
      icon="mdi-format-indent-decrease"
      variant="plain"
      :disabled="!editor.can().liftListItem('listItem')"
      @click="editor.chain().focus().liftListItem('listItem').run()"
    />

    <!-- その他設定 -->
    <v-dialog v-model="state.dialog" class="Toolbar__UrlDialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">URL設定</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="state.url" class="Toolbar__UrlInput" label="URL" clearable persistent-clear />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" @click="state.dialog = false"> 閉じる </v-btn>
          <v-btn color="blue-darken-1" @click="setLink()"> URL設定 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn class="Toolbar__Button" icon="mdi-link" rounded="lg" variant="plain" @click="openUrlDialog()" />
  </div>
</template>

<style lang="scss" scoped>
.Toolbar {
  background: #eee;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  &__TextButton {
    height: 36px;
    padding: 0;
  }

  &__Button {
    height: 36px;
    --v-btn-height: 24px;
  }

  &__ColorInput {
    width: 32px;
    height: 32px;
    margin: 4px;
  }

  &__UrlDialog {
    width: 750px;
  }

  &__UrlInput {
    width: 600px;
  }
}
</style>
