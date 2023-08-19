const propTypesTemplate = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) => {
  const title = componentName.split('Svg')[1];

  interfaces[0].body.body.push({
    type: 'TSPropertySignature',
    key: { type: 'Identifier', name: 'size' },
    typeAnnotation: {
      type: 'TSTypeAnnotation',
      typeAnnotation: {
        type: 'TSStringKeyword',
      },
    },
    initializer: null,
    optional: true,
  });

  return tpl`${imports}

import PropTypes from 'prop-types';
${interfaces}

const ${title} = (${props}) => {
  return ${jsx};
}

${title}.propTypes = {
  title: PropTypes.string,
};

export default ${title}`;
};

module.exports = propTypesTemplate;
