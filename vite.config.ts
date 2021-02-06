import path from 'path'
import slugify from 'slugify'

import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'

import markdownPrism from 'markdown-it-prism'
import markdownAnchor from 'markdown-it-anchor'

import type { UserConfig } from 'vite'

const config: UserConfig = {
  alias: {
    '@/': `${path.resolve(__dirname, 'src')}/`,
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@iconify/iconify',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: 'pages',
    }),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperComponent: 'post',
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(markdownPrism),
          md.use(markdownAnchor, {
            slugify,
            permalink: true,
            permalinkBefore: true,
            permalinkSymbol: '#',
            permalinkAttrs: () => ({ 'aria-hidden': true }),
          })
      },
    }),

    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: (id) => id.endsWith('.md'),

      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/vite-plugin-icons
    ViteIcons(),
  ],
}

export default config
