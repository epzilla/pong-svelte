import { writable } from 'svelte/store';
import { generateGuid } from './helpers';

export const alerts = writable([]);

export const addAlert = (alert) => {
  alerts.update((n) => {
    const id = generateGuid();
    const timeoutId = setTimeout(() => {
      alerts.update((al) => al.filter((a) => a.id !== id));
    }, alert.timeout || 5000);

    if (
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted'
    ) {
      const notif = new Notification('Pong', {
        body: alert.msg
      });
      if (alert.action) {
        notif.addEventListener('click', (e) => {
          alert.action();
          clearTimeout(timeoutId);
          alerts.update((al) => al.filter((a) => a.id !== id));
        });
      }
    }
    return [...n, { ...alert, id }];
  });
};

export const dismissAlert = (id) => {
  alerts.update((n) => n.filter((al) => al.id !== id));
};

export const currentMatch = writable({});
