interface MenuItem {
  name: string; //menu item name
  label: {
    zh_CN: string;
    en_US: string;
  };
  icon?: string; //child menu not need icon
  key: string; //menu id
  path: string; //menu route path
  hidden?: boolean; //menu hidden
  children?: MenuItem[]; //child menu
}

export type MenuList = MenuItem[];
export type MenuChild = Omit<MenuItem, 'children'>;
