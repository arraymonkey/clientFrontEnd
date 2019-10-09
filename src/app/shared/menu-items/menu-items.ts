import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  icon?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'My Panel',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'feather icon-dashboard'
      },
      {
        state: 'tasks',
        short_label: 'T',
        name: 'TaskBoard',
        type: 'link',
        icon: 'feather icon-calendar'
      },
      {
        state: 'scheduler',
        short_label: 'S',
        name: 'Scheduler',
        type: 'link',
        icon: 'feather icon-calendar'
      },
      {
        state: 'pos',
        short_label: 'P',
        name: 'POS',
        type: 'link',
        icon: 'feather icon-receipt'
      },
      {
        state: 'options',
        short_label: 'O',
        name: 'Salon Options',
        type: 'sub',
        icon: 'feather icon-settings',
        children: [
          {
            state: 'users',
            name: 'Users',
            icon: 'icon-user'
          },
          {
            state: 'employees',
            name: 'Employees'
          },
          {
            state: 'categories',
            name: 'Categories'
          },
          {
            state: 'services',
            name: 'Services'
          }
        ]
      },
      {
        state: 'reports',
        short_label: 'R',
        name: 'Reports',
        type: 'sub',
        icon: 'feather icon-bar-chart',
        children: [
          {
            state: 'daily',
            name: 'Daily'
          },
          {
            state: 'monthly',
            name: 'Monthly'
          },
          {
            state: 'employee',
            name: 'Employee'
          },
          {
            state: 'client',
            name: 'Client'
          }
        ]
      }
      // {
      //   state: 'coming-soon',
      //   short_label: 'CS',
      //   name: 'Coming Soon',
      //   type: 'link',
      //   icon: 'feather icon-watch',
      //   target: true
      // }
    ]
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
