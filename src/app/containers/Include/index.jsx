/* eslint-disable react/no-danger */
import React, { useRef, useEffect } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';

const IncludeContainer = ({ html = '', type }) => {
  const scriptTagRegExp = new RegExp(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);
  const { enabled } = useToggle('include');
  const isInitialMount = useRef(true);

  const supportedTypes = {
    idt2: 'idt2',
    vj: 'vj',
  };

  const shouldNotRenderInclude = !enabled || !html || !supportedTypes[type];

  const createAppendScriptTag = (code, src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.classList.add('include');
      if (src) {
        script.src = src;
        // eslint-disable-next-line func-names
        script.onload = function () {
          resolve();
        };
      } else if (code) {
        script.appendChild(document.createTextNode(code));
      }
      // eslint-disable-next-line func-names
      script.onerror = function () {
        reject();
      };
      document.body.append(script);
      if (code) {
        resolve();
      }
    });
  };

  // Keep the DOM up to date with our script tags.
  useEffect(() => {
    const originalHtml = html || '';
    const scriptTagMatches = originalHtml.matchAll(scriptTagRegExp);
    const scriptTags = Array.from(scriptTagMatches);
    async function placeScriptsOneAfterTheOther() {
      isInitialMount.current = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const scriptTag of scriptTags) {
        const [textContent, contents] = scriptTag;
        const srcRegex = new RegExp(/src="(.*?)"/gm);
        const [srcContent] = Array.from(textContent.matchAll(srcRegex));
        if (srcContent) {
          const [src] = srcContent.slice(-1);
          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptTag('', src);
        } else {
          // eslint-disable-next-line no-await-in-loop
          await createAppendScriptTag(contents);
        }
      }
    }
    if (isInitialMount.current) {
      placeScriptsOneAfterTheOther();
    }
    return () => {
      const includeScripts = document.querySelectorAll('script.include');
      includeScripts.forEach((script) => {
        script.parentNode.removeChild(script);
      });
    };
  }, [html, type, scriptTagRegExp]);

  if (shouldNotRenderInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <Link to="/pidgin/world-23252817">Pidgin STY</Link>
      <div>
        <Link to="/mundo/23263889">Mundo STY</Link>
      </div>

      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: (html || '').replace(scriptTagRegExp, ''),
        }}
      />
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  html: string,
  type: string.isRequired,
};

IncludeContainer.defaultProps = {
  html: null,
};

export default IncludeContainer;
