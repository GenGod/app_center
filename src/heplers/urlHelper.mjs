import { user, projectName, apiToken } from "./constants.mjs";

export const branchesUrl = `https://api.appcenter.ms/v0.1/apps/${user}/${projectName}/branches?os=Android&platform=Java&maxSearchDepth=5`;

export const getBuildsUrl = (branch) => `https://api.appcenter.ms/v0.1/apps/${user}/${projectName}/branches/${branch}/builds`;

export const getLogsUrl = (id) => `https://api.appcenter.ms/v0.1/apps/${user}/${projectName}/builds/${id}/logs`;

export const headers = {
  'accept': 'application/json',
  'x-api-token': apiToken,
};
