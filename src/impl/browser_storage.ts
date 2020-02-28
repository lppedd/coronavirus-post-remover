import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Dictionary<T = any> = { [k: string]: T };

export interface BrowserStorage {
  getValue<T>(key: string, defaultValue: T): Observable<T>;

  getValues(keys: Dictionary): Observable<Dictionary>;

  setValues(values: Dictionary): Observable<void>;
}

class ChromeStorage implements BrowserStorage {
  getValue<T>(key: string, defaultValue: T): Observable<T> {
    const keys = {};
    keys[key] = defaultValue;
    return this.getValues(keys).pipe(map(values => values[key]));
  }

  getValues(keys: Dictionary): Observable<Dictionary> {
    return new Observable(subscriber =>
      chrome.storage.sync.get(keys, items => {
        subscriber.next(items);
        subscriber.complete();
      })
    );
  }

  setValues(values: Dictionary): Observable<void> {
    return new Observable(subscriber =>
      chrome.storage.sync.set(values, () => {
        if (chrome.runtime.lastError) {
          subscriber.error(chrome.runtime.lastError.message);
        } else {
          subscriber.next();
          subscriber.complete();
        }
      })
    );
  }
}

export function getBrowserStorage(): BrowserStorage {
  return new ChromeStorage();
}
