import { writable } from "svelte/store";
import { nanoid } from 'nanoid'

export const notifs = writable([]);

export function notif(notification) {
    let _notif = {
        id: nanoid(),
        timeout: 10000,
        ...notification
    }
    notifs.update(_notifs => {
        setTimeout(() => {
            removeNotif(_notif.id)
        }, _notif.timeout);
        return [..._notifs, _notif];
    });
}

export function removeNotif(notifId) {
    notifs.update(_notifs => {
        return _notifs.filter(n => n.id !== notifId);
    });
}
