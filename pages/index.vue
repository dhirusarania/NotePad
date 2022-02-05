<template>
  <div>
    <Header id="header" />
    <div
      id="note-editor"
      contenteditable="true"
      class="w-full"
      data-placeholder="Hey there, What's on your mind?"
      @paste="onPasteThis"
    ></div>
    <div id="footer">
      <div class="text-xs mr-5">Chars {{ characters }}</div>
      <div class="text-xs mr-5">Words {{ wordCount }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

declare global {
  interface Window {
    clipboardData?: any
  }
}

export default defineComponent({
  name: 'IndexPage',
  setup() {},
  data() {
    return {
      wordCount: 0,
      characters: 0,
    }
  },
  computed: {
    toggleAutoSave() {
      return this.$store.state.toggleAutoSave
    },
  },
  mounted() {
    const _this = this
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        _this.saveToLocal()
      }
    })

    document.getElementById('note-editor')!.addEventListener(
      'input',
      function () {
        const val = document.getElementById('note-editor')!.innerText

        if (_this.toggleAutoSave) {
          _this.$store.commit('notepadTextState', val)
        }
        _this.WordCount(val)
        _this.LetterCount(val)
      },
      false
    )

    document.getElementById('note-editor')!.focus()
    document.getElementById('note-editor')!.style.minHeight = `${
      window.innerHeight - document.getElementById('header')!.offsetHeight
    }px`

    if ('notepad_text' in localStorage) {
      const notepadText = localStorage.getItem('notepad_text')
      document.getElementById('note-editor')!.innerText = notepadText as string
      _this.WordCount(notepadText as string)
      _this.LetterCount(notepadText as string)
    }
  },
  methods: {
    saveToLocal() {
      document.getElementById('save-popup')!.classList.add('visible')

      setTimeout(function () {
        document.getElementById('save-popup')!.classList.remove('visible')
      }, 2000)
      this.$store.dispatch(
        'saveToLocal',
        document.getElementById('note-editor')!.innerText
      )
    },
    onPasteThis(e: ClipboardEvent) {
      e.preventDefault()
      let content
      if (e.clipboardData) {
        content = e.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, content)
        return false
      } else if (window.clipboardData) {
        content = window.clipboardData.getData('Text')
        if (window.getSelection)
          window
            .getSelection()!
            .getRangeAt(0)
            .insertNode(document.createTextNode(content))
      }
    },
    WordCount(str: String) {
      this.wordCount = str.split(' ').filter(function (n) {
        return n !== ''
      }).length
    },
    LetterCount(str: String) {
      this.characters = str.length
    },
  },
})
</script>

<style lang="scss" scoped>
#note-editor {
  @apply px-8 pt-10 pb-32 max-w-7xl mx-auto appearance-none outline-none;
}

[contenteditable='true']:empty:before {
  content: attr(data-placeholder);
  color: grey;
  font-size: 18px;
}

#footer {
  @apply fixed bottom-0 left-0 right-0 py-2 px-8 flex justify-end;
  backdrop-filter: blur(12px);
}
</style>
