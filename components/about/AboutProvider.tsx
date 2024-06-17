/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { ReactChildren } from '@/lib/types';
import { createContext, useContext, useState } from 'react';

// Create the context.
const WeatherContext = createContext({} as any);

// Create a custom hook to use the context.
export function useWeatherContext(): any {
  return useContext(WeatherContext);
}

/**
 * The WeatherProvider component.
 */
export default function WeatherProvider({
  children,
}: ReactChildren): JSX.Element {
  const [location, setLocation] = useState<string>('Enterprise, AL');

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
