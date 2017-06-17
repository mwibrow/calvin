export namespace Talkers {
    export const TALKERS = {
      emma: {
        realName: 'Emma',
        displayName: 'Emma',
        avatar: 'emma'
      },
      dan: {
        realName: 'Dan',
        displayName: 'Dan',
        avatar: 'dan'
      },
      mark: {
        realName: 'Mark',
        displayName: 'Mark',
        avatar: 'mark'
      }
    }

    let talkerList: Array<string> = new Array(), property: any;
    for (property in TALKERS) {
        if (TALKERS.hasOwnProperty(property)) {
            talkerList.push(property);
        }
    }
    export const TALKER_LIST: Array<string> = talkerList;


}
