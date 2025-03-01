import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  theme: {
    colors: {
      primary: '#D72638',  // Vermelho
      gold: '#FFCC00',     // Dourado
      brown: '#8B4513',    // Marrom
      dark: '#2B2B2B',     // Cinza Escuro
      light: '#CCCCCC',    // Cinza Claro
      success: '#4CAF50',  // Verde
    },
  },
})