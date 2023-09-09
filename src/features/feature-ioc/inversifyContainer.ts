import { FC } from 'react';
import { Container, decorate, injectable, METADATA_KEY } from 'inversify';

const container = new Container();

const reigstrars: { [symbol: string]: any[] } = {};

const iocContainer = {
  register: (symbol: string, implementor: any) => {
    if (container.isBound(symbol)) return;

    if (!Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, implementor)) {
      decorate(injectable(), implementor);
    }

    container.bind(symbol).toFactory(implementor);
  },
  get: <T>(symbol: string) => {
    return container.isBound(symbol) ? container.get<T>(symbol) : undefined;
  },
  removeAll: () => {
    container.unbindAll();
  },
  onRegister: (symbol: any, event: any) => {
    if (reigstrars[symbol]) {
      reigstrars[symbol].push(event);
    } else {
      reigstrars[symbol] = [event];
    }
  },
  notifyRegistrars: () => {
    Object.entries(reigstrars).forEach(([_symbol, registrarFns]) => {
      registrarFns.forEach((fn) => fn());
    });
  },
};

const resolveDependencies = (deps: string[]) => {
  const resolved: any[] = [];
  deps.forEach((dep) => {
    if (!container.isBound(dep)) {

      throw new Error(`${dep} was not registered properly. Please make sure to register it into the container.`);
    }
    const resolvedDep: any = iocContainer.get(dep);
    resolved.push(resolvedDep);
  });

  return resolved;
};

export const withDependencies = <T, K>(
  factory: (deps: T) => FC<K>,
  deps: string[]
) => {
  return factory(resolveDependencies(deps) as any);
};

export const withServiceDependencies =
  <T>(factory: (deps: any) => any, deps: string[]) =>
  () => {
    return factory(resolveDependencies(deps) as any) as T;
  };

export default iocContainer;
