import { branchesUrl, getBuildsUrl, getLogsUrl } from './src/heplers/urlHelper.mjs';
import makeRequest from './src/requesters/mainRequester.mjs';

const getResultString = (status, sourceBranch, id, startTime, finishTime) => `${sourceBranch} build ${status} in ${(new Date(finishTime).getTime() - new Date(startTime).getTime()) / 1000} seconds. Link to build logs: ${getLogsUrl(id)}`;

const branches = await makeRequest(branchesUrl);
console.log('Branches to build:');
const parsedBranches = branches.map(({ branch }) => {
  console.log(branch.name);
  return [branch.name, branch.commit.sha];
});

const getBuildsForBranches = async () => {
  const getBuildsRequests = parsedBranches.map((branch) => makeRequest(getBuildsUrl(branch[0]), 'GET'));
  const currentBuilds = await Promise.allSettled(getBuildsRequests);
  const result = [];
  currentBuilds.forEach((element) => {
    if (element.status === 'fulfilled') {
      const { statusCode } = element.value;
      if (statusCode && statusCode !== 200) {
        console.error(element.value);
        throw new Error(element.value.message);
      }
      result.push(element.value);
    } else {
      throw new Error(element.reason);
    }
  });
  return result;
}

const initialDataAboutBranches = new Map();
parsedBranches.forEach((element) => initialDataAboutBranches.set(element[0], false));

const initiateBuildsRequests = parsedBranches.map((branch) => makeRequest(getBuildsUrl(branch[0]), 'POST', { sourceVersion: branch[1], debug: false }));
await Promise.allSettled(initiateBuildsRequests);

const checkBranchesInterval = setInterval(async () => {
  const builds = await getBuildsForBranches();
  let isCompleted = true;
  Array.from(initialDataAboutBranches.entries()).forEach((value, index) => {
    const build = builds[index];
    if (initialDataAboutBranches.get(value[0])) {
      return;
    }
    const isAllCompleted = build.filter((e) => e.status !== 'completed').length === 0;
    if (isAllCompleted) {
      // remove here branch name from checking
      // and print result string
      initialDataAboutBranches.set(value[0], true);
    } else {
      isCompleted = false;
    }
  });
  if (isCompleted) {
    clearInterval(checkBranchesInterval);
    builds.forEach((build) => {
      if (build[0]) {
        const { status, sourceBranch, id, startTime, finishTime } = build[0];
        console.log(getResultString(status, sourceBranch, id, startTime, finishTime));
      }
    });
    process.exit();
  }
}, 15000);
