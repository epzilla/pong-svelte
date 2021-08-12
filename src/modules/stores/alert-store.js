import { writable } from 'svelte/store';
import { generateGuid } from '../helpers';

export const alerts = writable([]);

export const addAlert = (alert) => {
  alerts.update((n) => {
    const id = generateGuid();
    setTimeout(() => {
      alerts.update((al) => al.filter((a) => a.id !== id));
    }, 5000);
    return [...n, { ...alert, id }];
  });
};
