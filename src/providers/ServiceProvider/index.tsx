import { createContext } from 'react';
import { ServiceList } from '../../services';

interface ContextType extends ServiceList {}

export const ServiceProviderContext = createContext<ContextType | undefined>(undefined);

interface ServiceProviderProps extends ServiceList {
  children: JSX.Element | JSX.Element[];
}

export const ServiceProvider = ({ children, ...services }: ServiceProviderProps) => {
  return <ServiceProviderContext.Provider value={services}>{children}</ServiceProviderContext.Provider>;
};
