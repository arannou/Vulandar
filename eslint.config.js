
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue'

export default [
   ...tseslint.configs.recommended,
   ...pluginVue.configs['flat/recommended'],
   { ignores: ['**/*.js'] },
   {
      rules: {
         '@typescript-eslint/no-non-null-assertion': 'off',
         'vue/multi-word-component-names': 'off',
      },
   },
];