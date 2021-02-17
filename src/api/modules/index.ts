const USER_ROSTER_API = {
    queryUserBlackList: {
      url: "/blacklist/user",
      method: "POST"
    },
    getUserListExportFilePath: {
      url: "/blacklist/userExport",
      method: "POST"
    }
  };
  

  

  
  export const API = {
    ...USER_ROSTER_API
  };
  