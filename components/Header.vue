<template>
  <div>
    <div
      class="sticky max-w-7xl mx-auto bg-black py-2 px-8 flex items-center justify-between top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
    >
      <div class="">
        <nuxt-link to="/" class="font-black text-xl">Notepad</nuxt-link>
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center justify-center w-full md:mr-3 cursor-pointer rounded-full hover:bg-gray-900 px-4 py-2"
        >
          <label for="toggle" class="flex items-center cursor-pointer">
            <div class="relative">
              <input
                id="toggle"
                v-model="toggleAutoSave"
                type="checkbox"
                class="sr-only"
              />
              <div class="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div
                class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-700"
              ></div>
            </div>
            <div class="ml-3 text-white text-sm font-medium hidden sm:block">
              Auto Save
            </div>
          </label>
        </div>
        <div
          class="flex items-center cursor-pointer rounded-full hover:bg-gray-900 px-4 py-2"
          @click="saveToLocal"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z"
            ></path>
            <path d="M4 9a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2H4V9z"></path>
          </svg>
          <span class="pl-2 hidden sm:block text-sm">Save</span>
        </div>
      </div>
    </div>
    <div id="save-popup" class="popup">
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-green-500 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p>Notepad Saved</p>
      </div>
    </div>
    <div id="toggle-popup" class="popup">
      <div class="flex items-center">
        <svg
          class="w-6 h-6 text-green-500 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p>
          Auto Save <span v-if="toggleAutoSave">On</span><span v-else>Off</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'HeaderComponent',
  setup() {},
  data() {
    return {}
  },
  computed: {
    toggleAutoSave: {
      get() {
        return this.$store.state.toggleAutoSave
      },
      set(value) {
        document.getElementById('toggle-popup')!.classList.add('visible')

        setTimeout(function () {
          document.getElementById('toggle-popup')!.classList.remove('visible')
        }, 2000)
        this.$store.commit('toggleAutoSaveState', value)
        return value
      },
    },
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
  },
})
</script>

<style lang="scss" scoped>
input:checked ~ .dot {
  @apply bg-green-500;
  transform: translateX(100%);
}

.popup {
  @apply fixed right-16 z-50 bg-white text-black px-4 py-2 rounded-md text-sm font-bold shadow-lg;
  transition: all 0.8s ease-in-out;
  bottom: -100px;
  &.visible {
    @apply bottom-16;
    transition: all 0.3s ease-in-out;
  }
}
</style>
