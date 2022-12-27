import { GroupData, TitleData } from "../app/page";

const json = (text: string): any => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
};

function establish<T> (
  statename: string,
  defaultValue: T,
  setter: Function = () => {},
): T  {
  const stored = localStorage.getItem(statename);
  try {
    const place = stored ? json(stored) : defaultValue;
    setter(place);
    return place;
  } catch (error) {
    console.error(error, stored);
    setter(defaultValue);
    return defaultValue;
  }
};

const getTitleData = (groupDataList: Array<GroupData> , groupName: string, titleName: string) => {
  console.log('getTitleData ', groupDataList, groupName, titleName);
  const groupData = groupDataList.find((listData: GroupData) => listData.groupName == groupName);
  if (!groupData) {
    console.log('getTitleData: no group data');
      return {} as TitleData;
  }
  const td: TitleData = groupData.titles[titleName];
  if (!td) {
    console.log('getTitleData: no title data');

      return {} as TitleData;
  }
  console.log('getTitleData: td is ', td);
  return td;
}

export { establish, getTitleData };
;