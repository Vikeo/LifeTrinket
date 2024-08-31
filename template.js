const propTypesTemplate = (
  { interfaces, componentName, props, jsx },
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

  return tpl`
  import PropTypes from 'prop-types';
  import { SVGProps } from "react";
  
  ${interfaces}

  const ${title} = (${props}) => {
    return ${jsx};
  }

  ${title}.propTypes = {
    title: PropTypes.string,
  };

  export default ${title}`;
};

export default propTypesTemplate;
