import type { Alert, Bid, Dialog, Run, Team, User } from '@sre-frontend-layout/types';
import { RunArray } from '@sre-frontend-layout/types/schemas';
import { useReplicant } from 'nodecg-vue-composable';

/**
 * Checks if number needs a 0 adding to the start and does so if needed.
 * @param num Number which you want to turn into a padded string.
 */
export function padTimeNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

/**
 * Converts milliseconds into a time string (HH:MM:SS).
 * @param ms Milliseconds you wish to convert.
 */
export function msToTimeStr(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${padTimeNumber(hours)
    }:${padTimeNumber(minutes)
    }:${padTimeNumber(seconds)}`;
}

export function checkDialog(name: string): Promise<void> {
  return new Promise<void>((res) => {
    const dialog: (HTMLElement & {
      opened: boolean;
      close: () => void;
      open: () => void;
    }) | undefined = nodecg.getDialog(name) as any;
    const iframe = dialog?.querySelector('iframe');
    if (iframe && dialog) {
      // We check if it's loaded or not if our custom "openDialog" function exists.
      const openDialog = (iframe.contentWindow as Alert.Dialog | null)?.openDialog;
      if (openDialog) {
        res();
      } else {
        iframe.addEventListener('load', () => {
          dialog.close();
          res();
        }, { once: true });
        dialog.open();
      }
    } else {
      res();
    }
  });
}

/**
 * Gets dialog's contentWindow based on name, if possible.
 * @param name Name of dialog.
 */
export function getDialog(name: string): Window | null {
  try {
    const dialog = nodecg.getDialog(name);
    const iframe = dialog?.querySelector('iframe')?.contentWindow || null;
    if (!iframe) {
      throw new Error('Could not find the iFrame');
    }
    return iframe;
  } catch (err) {
    nodecg.log.error(`getDialog could not successfully find dialog "${name}":`, err);
    // eslint-disable-next-line no-alert
    window.alert('Attempted to open a NodeCG dialog but failed (if you'
      + ' are using a standalone version of a dashboard panel, this is not yet supported).');
  }
  return null;
}

export const getRunnerString = (item: Run) => {
  const runnerArr = item.teams.map((team: Team) => {
    let teamString = team.players.map((player: User) => { return player.name })
    const teamAsString = teamString.join(', ')
    return teamAsString
  })
  return runnerArr.join(', ')
}

export const currencyFormat = (amount: number, currency?: string) => {
  if (currency === "USD") {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    })
    return formatter.format(amount)
  } else {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency || 'EUR'
    })
    return formatter.format(amount)
  }

}

export const getRunBidName = (bid: Bid): string => {
  const runArrayReplicant = useReplicant<RunArray>('runArray', 'sre-frontend-layout');

  if (runArrayReplicant) {
    const run = runArrayReplicant.data?.find(run => {
      const bd = run.bids?.find(bd => bd.id === bid.id)
      if (bd) {
        return run
      }
    })
    return run ? run.name : ""
  }
  return ""
}

export const getTimeDifferenceString = (startTimeMili: number): string => {
  // const currentTimeMili = Date.now(); // Obtén la hora actual en milisegundos
  const currentTimeMili = new Date(1727017200000); // Obtén la hora actual en milisegundos
  const diffInMili = startTimeMili - currentTimeMili.getTime(); // Diferencia en milisegundos

  if (diffInMili <= 0) {
    return '0m';
  }

  const diffInMinutes = Math.ceil(diffInMili / (1000 * 60)); // Convertir la diferencia en minutos
  const roundedMinutes = Math.ceil(diffInMinutes / 10) * 10; // Redondear a 10 minutos más cercano

  if (roundedMinutes >= 60) {
    const diffInHours = Math.ceil(roundedMinutes / 60); // Convertir a horas si son más de 60 minutos
    // if (diffInHours > 8) {
    //   return `en ZZZ...`
    // }
    return `${diffInHours}h`; // Retornar el formato en horas
  } else {
    return `${roundedMinutes}m`; // Retornar el formato en minutos
  }
};