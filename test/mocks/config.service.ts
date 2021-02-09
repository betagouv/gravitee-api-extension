export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'gravitee.apiParticulierPlanId':
        return 'api-particulier-plan-id';
    }
  },
};
