import runCoreTests from '../../common/core.amp';
import runAnalyticsTests from '../../common/analytics.amp';

runCoreTests();
runAnalyticsTests();

it('Audio Player Placeholder Image', () => {
  const audioPlaceholderImage = document.querySelector(
    'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
  );

  expect(audioPlaceholderImage).toBeInTheDocument();
});

it('Audio Player Title', () => {
  const audioPlayerIframe = document.querySelector('amp-iframe');

  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot();
});

it('Audio Player Embed URL', () => {
  const audioPlayerIframe = document.querySelector('amp-iframe');

  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot();
});
