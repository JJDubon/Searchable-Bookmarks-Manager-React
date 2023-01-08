import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export function useObservable<T>(
  observable: Observable<T>,
  defaultValue: T,
  deps: React.DependencyList = []
): T {
  const [value, setValue] = useState(defaultValue);

  useObserver(
    observable,
    useCallback((newValue) => {
      setValue(newValue);
    }, []),
    deps
  );

  return value;
}

export function useObserver<T>(
  observable: Observable<T>,
  observer: (value: T) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const subscription = observable.subscribe((value: T) => {
      observer(value);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observable, observer, ...deps]);
}

export function useBehaviorSubject<T>(subject: BehaviorSubject<T>, deps: React.DependencyList = []): T {
  return useObservable(subject, subject.value, deps);
}

export function safeSubscribe<T>(observable: Observable<T>, fn: (value: T) => void): Subscription {
  return observable.subscribe((value) => {
    try {
      fn(value);
    } catch (err) {
      console.error(err);
    }
  });
}

export function emitIfModified<T>(subject: BehaviorSubject<T>, value: T) {
  if (!isEqual(subject.value, value)) {
    subject.next(value);
  }
}
