import propTypesTemplate from './template.js';

/* eslint-disable no-undef */
/* eslint-disable-next-line no-undef */
export default {
  template: propTypesTemplate,
  titleProp: true,
  svgProps: {
    height: '{props.size || 16}',
    width: '{props.size || 16}',
  },
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            inlineStyles: {
              onlyMatchedOnce: false,
            },
            removeDoctype: false,
            removeViewBox: false,
            mergePaths: true,
          },
        },
      },
    ],
  },
  typescript: true,
  outDir: './src/Icons/generated',
};
