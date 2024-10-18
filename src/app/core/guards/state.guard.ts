import { CanActivateFn } from '@angular/router';

export enum Action {
  Update = 'Update',
  View = 'View',
  Create = 'Create',
}

export const createGuard: CanActivateFn = async (route) => {
  return route.data['action'] == Action.Create;
};

export const viewGuard: CanActivateFn = async (route) => {
  return route.data['action'] == Action.View;
};

export const updateGuard: CanActivateFn = async (route) => {
  return route.data['action'] == Action.Update;
};
