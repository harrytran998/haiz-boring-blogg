import { watch, computed } from 'vue'
import { usePreferredDark } from '@vueuse/core'
import { colorSchema } from './store'
import { isServer } from '@/utils/environment'

const preferredDark = usePreferredDark()

export const isDark = computed({
  get() {
    return colorSchema.value === 'auto' ? preferredDark.value : colorSchema.value === 'light'
  },
  set(v: boolean) {
    if (v === preferredDark.value) colorSchema.value = 'auto'
    else colorSchema.value = v ? 'dark' : 'light'
  },
})

watch(isDark, (value) => isServer && document.documentElement.classList.toggle('dark', value), {
  immediate: true,
})
