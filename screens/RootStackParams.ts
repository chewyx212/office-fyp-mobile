export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Passcode: undefined;
  Home: undefined;
  Order: {
    orderType: number;
    tableId?: number;
    pax?: number;
    orders?: any[];
    refresher: Function;
  };
  Table: undefined;
  Printer: undefined;
  Camera: undefined;
  Member: undefined;
  Menu: undefined;
  Transaction: undefined;
  Setting: undefined;
  Payment: {
    order: any;
  };

  TableSetting: undefined;
  TableCategorySetting: undefined;
  GlobalSetting: undefined;
  StaffSetting: undefined;
  AccountSetting: undefined;

  OfficeHome: undefined;
  OfficeProfile: undefined;
  OfficeLanding: undefined;
  OfficeDesk: undefined;
  OfficeDeskList: undefined;
  OfficeDeskSchedule: undefined;
  OfficeAddDesk: {
    areaId: string;
  };
  OfficeArea: undefined;
  OfficeRoom: undefined;
  OfficeRoomList: undefined;
  OfficeRoomSchedule: undefined;
  OfficeAddRoomSchedule: {
    roomId: string;
  };
};
