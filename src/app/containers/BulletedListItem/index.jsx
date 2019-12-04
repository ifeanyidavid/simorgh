import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, oneOfType, bool, oneOf } from 'prop-types';
import Blocks from '../Blocks';
import paragraph from '../Paragraph';

const componentsToRender = { paragraph };

const Wrapper = styled.div`
  display: inline-block;
`;

const BulletedListItemContainer = ({ blocks }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem">
      <Wrapper>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </Wrapper>
    </li>
  );
};

const FragmentPropTypes = {
  type: oneOf(['fragment']),
  model: shape({
    text: string.isRequired,
    attributes: arrayOf(string.isRequired).isRequired,
  }),
};

const InlineLinkPropTypes = {
  type: oneOf(['urlLink']),
  model: shape({
    locator: string.isRequired,
    isExternal: bool.isRequired,
    text: string,
    blocks: arrayOf(shape(FragmentPropTypes)).isRequired,
  }),
};

export const ParagraphPropTypes = {
  blocks: arrayOf(
    oneOfType([
      shape(FragmentPropTypes),
      shape(InlineLinkPropTypes),
      shape({
        type: oneOf(['inline']),
        model: shape({
          language: string.isRequired,
          text: string.isRequired,
          blocks: arrayOf(
            oneOfType([shape(FragmentPropTypes), shape(InlineLinkPropTypes)])
              .isRequired,
          ).isRequired,
        }),
      }),
    ]).isRequired,
  ).isRequired,
};

export const ListItemPropTypes = {
  blocks: arrayOf(
    shape({
      type: oneOf(['paragraph']),
      model: shape({
        text: string,
        ...ParagraphPropTypes,
      }),
    }),
  ).isRequired,
};

BulletedListItemContainer.propTypes = { ...ListItemPropTypes };

export default BulletedListItemContainer;