export const state = () => ({
  toggleAutoSave: true,
  notepadText: '',
})

export const mutations = {
  toggleAutoSaveState(state, payload) {
    state.toggleAutoSave = payload
    localStorage.setItem('toggleAutoSave', state.toggleAutoSave)
  },
  notepadTextState(state, payload) {
    state.notepadText = payload
    localStorage.setItem('notepad_text', state.notepadText)
  },
}

export const actions = {
  saveToLocal(_, payload) {
    localStorage.setItem('notepad_text', payload)
  },
  getInitialData({ state }) {
    // Get notepad autosave config
    if ('toggleAutoSave' in localStorage) {
      const toggleAutoSave = localStorage.getItem('toggleAutoSave')
      this.commit('toggleAutoSaveState', JSON.parse(toggleAutoSave))
    } else {
      localStorage.setItem('toggleAutoSave', state.toggleAutoSave)
    }
  },
}
