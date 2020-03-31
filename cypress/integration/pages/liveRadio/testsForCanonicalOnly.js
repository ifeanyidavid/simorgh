import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import getEmbedUrl from './helper';

export default ({ service, variant }) => {
  describe('Audio Player', () => {
    const { lang } = appConfig[service][variant];
    let embedUrl;

    beforeEach(() => {
      cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
        embedUrl = getEmbedUrl(body, lang);
      });
    });

    it('embed URL should be reachable', () => {
      cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
    });
  });

  describe('Chartbeat', () => {
    if (envConfig.chartbeatEnabled) {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });
      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    } else {
      it('not enabled', () => {});
    }
  });
};
