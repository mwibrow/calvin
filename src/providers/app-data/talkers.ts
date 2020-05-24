export namespace Talkers {
  export const TALKERS: any = {
    emma: {
      id: "emma",
      realName: "Emma",
      displayName: "Emma",
      avatar: "emma",
    },
    dan: {
      id: "dan",
      realName: "Dan",
      displayName: "Dan",
      avatar: "dan",
    },
    mark: {
      id: "mark",
      realName: "Mark",
      displayName: "Mark",
      avatar: "mark",
    },
    kerry: {
      id: "kerry",
      realName: "Kerry",
      displayName: "Kerry",
      avatar: "kerry",
    },
  };

  export const CALVIN: any = {
    id: "mark",
    realName: "Mark",
    displayName: "Calvin",
    avatar: "calvin",
  };

  let talkerList: string[] = [],
    property: any;
  for (property in TALKERS) {
    if (TALKERS.hasOwnProperty(property)) {
      talkerList.push(property);
    }
  }
  export const TALKER_LIST: string[] = talkerList.sort();
}
