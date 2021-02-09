import { registerAs } from '@nestjs/config';

export default registerAs('gravitee', () => ({
  apiParticulierPlanId: process.env.API_PARTICULIER_PLAN_ID,
}));
