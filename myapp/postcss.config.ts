import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import postcssPresetEnv from 'postcss-preset-env';
import csso from 'postcss-csso';
import postcssGlobalData from '@csstools/postcss-global-data';
import { Plugin } from 'postcss';

const config: {
  plugins: Plugin[];
} = {
  plugins: [
    postcssGlobalData({
      files: ['src/lib/styles/custom-media-queries.css']
    }) as Plugin,
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      }
    }) as Plugin,
    autoprefixer() as Plugin,
    csso() as Plugin,
    tailwindcss() as Plugin
  ]
};

export default config;
