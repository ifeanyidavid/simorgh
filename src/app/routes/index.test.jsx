import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { matchPath } from 'react-router';
import routes from './index';
import liveRadioPageJson from '#data/korean/bbc_korean_radio/liveradio.json';
import onDemandRadioPageJson from '#data/indonesia/bbc_indonesian_radio/w172xh267fpn19l.json';
import articlePageJson from '#data/persian/articles/c4vlle3q337o.json';
import frontPageJson from '#data/pidgin/frontpage/index.json';
import mediaAssetPageJson from '#data/yoruba/cpsAssets/media-23256797.json';
import legacyMediaAssetPage from '#data/azeri/legacyAssets/multimedia/2012/09/120919_georgia_prison_video.json';
import photoGalleryPageJson from '#data/indonesia/cpsAssets/indonesia-41635759.json';
import storyPageJson from '#data/mundo/cpsAssets/noticias-internacional-51266689.json';
import featureIndexPageJson from '#data/afrique/cpsAssets/48465371.json';

afterEach(() => jest.clearAllMocks());

const getMatchingRoute = pathname =>
  routes.find(({ path }) =>
    matchPath(pathname, {
      path,
      exact: true,
    }),
  );

const renderRouter = ({
  pathname,
  pageData,
  pageType,
  service,
  status,
  errorCode,
}) =>
  render(
    <MemoryRouter initialEntries={[pathname]}>
      {renderRoutes(routes, {
        bbcOrigin: 'https://www.bbc.com',
        pathname,
        pageData,
        pageType,
        service,
        isAmp: false,
        status: status || 200,
        ...(errorCode && { errorCode }),
      })}
    </MemoryRouter>,
  );

it('should have correct properties in each route', () => {
  routes.forEach((route, index) => {
    expect(route).toEqual(expect.any(Object));
    expect(route).toHaveProperty('component');
    expect(route).toHaveProperty('pageType');

    // Last route should be catchall (no path specified) error page
    if (index === routes.length - 1) {
      expect(route.pageType).toEqual('error');
      expect(route).not.toHaveProperty('path');
    } else {
      expect(route).toHaveProperty('path');
    }
  });
});

it('should route to and render live radio page', async () => {
  fetch.mockResponse(JSON.stringify(liveRadioPageJson));
  const pathname = '/korean/bbc_korean_radio/liveradio';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'korean',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'BBC 코리아 라디오';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render the skeleton onDemand Radio page', async () => {
  fetch.mockResponse(JSON.stringify(onDemandRadioPageJson));
  const pathname = '/indonesia/bbc_indonesian_radio/w172xh267fpn19l';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'indonesia',
  });

  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'Dunia Pagi Ini';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render an article page', async () => {
  fetch.mockResponse(JSON.stringify(articlePageJson));
  const pathname = '/persian/articles/c4vlle3q337o';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'persian',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'پهپادی که برایتان قهوه می‌آورد';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a front page', async () => {
  fetch.mockResponse(JSON.stringify(frontPageJson));
  const pathname = '/pidgin';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({
    path: pathname,
    service: 'pidgin',
  });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'pidgin',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'Yarn Me Tori';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a media asset page', async () => {
  fetch.mockResponse(JSON.stringify(mediaAssetPageJson));
  const pathname = '/yoruba/media-23256797';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'yoruba',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
    'Ko ko koo, "lọdun 2014 bi ana ni arun buruku yii wọle tọ mi wa".';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a media asset page', async () => {
  fetch.mockResponse(JSON.stringify(mediaAssetPageJson));
  const pathname = '/yoruba/media-23256797';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'yoruba',
  });

  // TODO: use headline text when double headline bug is fixed https://github.com/bbc/simorgh/issues/5688
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
    'Ko ko koo, "lọdun 2014 bi ana ni arun buruku yii wọle tọ mi wa".';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a legacy media asset page', async () => {
  fetch.mockResponse(JSON.stringify(legacyMediaAssetPage));
  const pathname = '/azeri/multimedia/2012/09/120919_georgia_prison_video';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'azeri',
  });

  // TODO: use headline text when double headline bug is fixed https://github.com/bbc/simorgh/issues/5688
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
    'Gürcustanda məhbusların gözətçilər tərəfindən zorlandığını göstərən video görüntülər çərşənbə günü hökümətə qarşı nümayişlərlə nəticələnib.';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a photo gallery page', async () => {
  fetch.mockResponse(JSON.stringify(photoGalleryPageJson));
  const pathname = '/indonesia/indonesia-41635759';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'indonesia',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
    'Anies Baswedan, dari mantan menteri menjadi gubernur DKI Jakarta';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a story page', async () => {
  fetch.mockResponse(JSON.stringify(storyPageJson));
  const pathname = '/mundo/noticias-internacional-51266689';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'mundo',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
    'Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

// skipping this test until FIX pages are fully featured with correct metadata and Chartbeat
it.skip('should route to and render a feature index page', async () => {
  fetch.mockResponse(JSON.stringify(featureIndexPageJson));
  const pathname = '/afrique/48465371';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { pageData } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageData,
    pageType,
    service: 'afrique',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
    'CAN 2019 : le Sénégal qualifié pour les huitièmes de finale';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a 500 error page', async () => {
  const pathname = '/igbo/500';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { errorCode } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageType,
    errorCode,
    service: 'igbo',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '500';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should fallback to and render a 500 error page if there is a problem with page data', async () => {
  fetch.mockResponse(undefined);
  const pathname = '/afrique';
  const { getByText } = renderRouter({
    pathname,
    pageData: undefined,
    pageType: 'frontPage',
    service: 'afrique',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '500';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should route to and render a 404 error page', async () => {
  const pathname = '/igbo/404';
  const { getInitialData, pageType } = getMatchingRoute(pathname);
  const { errorCode } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageType,
    errorCode,
    service: 'igbo',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '404';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should render a 404 error page if a data fetch responds with a 404', async () => {
  fetch.mockResponse(null, { status: 404 });
  const pathname = '/pidgin/articles/cwl08rd38p6o';
  const { pageType, getInitialData } = getMatchingRoute(pathname);
  const { status } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageType,
    status,
    service: 'pidgin',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '404';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});

it('should fallback to and render a 404 error page if no route match is found', async () => {
  const pathname = '/a/path/that/does/not/exist';
  const { pageType, getInitialData } =
    getMatchingRoute(pathname) || routes[routes.length - 1];
  const { errorCode } = await getInitialData({ path: pathname });
  const { getByText } = renderRouter({
    pathname,
    pageType,
    errorCode,
    service: 'pidgin',
  });
  const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '404';

  expect(getByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT)).toBeInTheDocument();
});
