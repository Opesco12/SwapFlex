import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from "react-native-flash-message";

interface NetworkContextType {
  isConnected: boolean | null;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: null,
});

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state?.isInternetReachable);

      if (!state.isInternetReachable) {
        showMessage({
          message: "You are not connected to the internet",
          type: "warning",
        });
      } else if (isConnected === false) {
        showMessage({
          message: "Back online",
          type: "success",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
