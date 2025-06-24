import { createContext, useContext, useState } from "react";
import { Reservoir } from "../types";

export interface ReservoirContextType {
  reservoirs: Reservoir[];
  setReservoirs: (r: Reservoir[]) => void;
  selected: Reservoir | null;
  setSelected: (r: Reservoir | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  error: Error | null;
  setError: (e: Error | null) => void;
}

export const ReservoirContext = createContext<ReservoirContextType | undefined>(undefined);

export function useReservoirContext() {
  const ctx = useContext(ReservoirContext);
  if (!ctx) throw new Error("useReservoirContext must be used within ReservoirProvider");
  return ctx;
}

export function ReservoirProvider({ children }: { children: React.ReactNode }) {
  const [reservoirs, setReservoirs] = useState<Reservoir[]>([]);
  const [selected, setSelected] = useState<Reservoir | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <ReservoirContext.Provider
      value={{
        reservoirs,
        setReservoirs,
        selected,
        setSelected,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </ReservoirContext.Provider>
  );
}