import { BulletList } from '@tiptap/extension-bullet-list'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      /**
       * Toggle an indent
       */
      toggleIndent: () => ReturnType
    }
  }
}

/** インデント設定 */
export const Indent = BulletList.extend({
  name: 'indent',
  addAttributes() {
    return {
      'list-style': {
        default: null,
        renderHTML: () => {
          return {
            style: 'list-style: none',
          }
        },
      },
    }
  },
  addCommands() {
    return {
      toggleIndent:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, this.options.itemTypeName)
        },
    }
  },
})
