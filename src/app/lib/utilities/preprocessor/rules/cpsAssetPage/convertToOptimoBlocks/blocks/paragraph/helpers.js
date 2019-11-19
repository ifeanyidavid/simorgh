/* eslint-disable import/prefer-default-export */
import path from 'ramda/src/path';

const boldWrap = text => `<bold>${text}</bold>`;

const replacements = {
  '&quot;': '"',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
};
const replacementsRegex = new RegExp(Object.keys(replacements).join('|'), 'gi');

const parseReplacements = text =>
  text.replace(replacementsRegex, match => replacements[match]);

export const processBlock = _block => {
  const block = _block;

  if (path(['text'], block)) {
    // escape quotes in all text
    block.text = parseReplacements(block.text);

    // make introductions bold
    if (block.role === 'introduction') {
      block.text = boldWrap(block.text);
      block.markupType = 'candy_xml';
    }
  }

  return block;
};
