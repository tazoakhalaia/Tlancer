import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comment', () => {
  const comments = reactive({
    commentArray: []
  })
  
  return { comments, addComment }
})
