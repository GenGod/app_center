export const branchesUrl = 'https://api.appcenter.ms/v0.1/apps/admin-gp9011.onmicrosoft.com/appcenter_test/branches?os=Android&platform=Java&maxSearchDepth=5';

export const getBuildsUrl = (branch) => `https://api.appcenter.ms/v0.1/apps/admin-gp9011.onmicrosoft.com/appcenter_test/branches/${branch}/builds`;

export const getLogsUrl = (id) => `https://api.appcenter.ms/v0.1/apps/admin-gp9011.onmicrosoft.com/appcenter_test/builds/${id}/logs`;

export const headers = {
  'accept': 'application/json',
  'x-api-token': '0f1236bc9581b4bea1b187d4c10ada3477c57353',
};
