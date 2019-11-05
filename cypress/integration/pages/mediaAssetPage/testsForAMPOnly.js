import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
    it('should render a media player', () => {
      cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
        ({ body }) => {
          const { assetUri } = body.metadata.locators;
          const { versionId } = body.content.blocks[0].versions[0];
          const language = appConfig[service][variant].lang;

          cy.get(
            `amp-iframe[src*="${envConfig.avEmbedBaseUrl}/ws/av-embeds/cps${assetUri}/${versionId}/${language}"]`,
          ).should('be.visible');
        },
      );
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};