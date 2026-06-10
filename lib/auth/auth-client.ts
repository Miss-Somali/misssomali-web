"use client";

import { authClient as existingAuthClient } from "./client";

type AuthResult = {
  data: unknown;
  error: { message?: string } | null;
};

const emptyAuthResult = async (): Promise<AuthResult> => ({
  data: null,
  error: null,
});

export const authClient = {
  ...existingAuthClient,
  updateUser: async (_data: unknown) => emptyAuthResult(),
};

export async function getSession() {
  return null;
}

export const signIn = {
  email: async (_data: unknown) => emptyAuthResult(),
  social: async (_data: unknown) => emptyAuthResult(),
};

export const signUp = {
  email: async (_data: unknown) => emptyAuthResult(),
};

export async function signOut() {
  return existingAuthClient.signOut();
}

export function useSession() {
  return { data: null, isPending: false };
}
