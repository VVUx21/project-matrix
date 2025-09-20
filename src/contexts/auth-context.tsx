"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { account, ID } from "@/lib/appwrite";
import { AuthContextType } from "@/types/auth-context";
import { User } from "@/types/user";
import { handleError } from "@/utils/handleError";

const defaultAuthContext: AuthContextType = {
  user: null,
  error: "",
  loading: true,
  login: async () => {},
  createAccount: async () => true,
  logout: async () => false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const setUserFromAccount = async () => {
    try {
      const currentUser = await account.get();
      setUser({
        name: currentUser.name,
        email: currentUser.email,
        id: currentUser.$id,
        phoneNumber: currentUser.phone,
        isAdmin: currentUser.labels.includes("admin"),
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUser(null);
    }
  };

  const checkSession = async () => {
    try {
      await setUserFromAccount();
    } catch (err) {
      const message = handleError(err, "Failed to fetch user session.");
      setError(message?.data || "");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      await setUserFromAccount();
      setError("");
    } catch (err) {
      const message = handleError(err, "Invalid email or password.");
      setError(message?.data || "");
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      toast.success("Account created successfully.");
      return true;
    } catch (err) {
      const message = handleError(
        err,
        "Registration failed. Please check your details."
      );
      setError(message?.data || "");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setError("");
      return true;
    } catch (err) {
      const message = handleError(err, "Failed to log out.");
      setError(message?.data || "");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, loading, login, createAccount, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
