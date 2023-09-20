import useSWR from 'swr';
import APIFetcher from '@/lib/APIFetcher';
import { User } from '@/types';

export default function useUser() {
  const { data: user, isLoading, error, mutate } = useSWR<User>('/user', APIFetcher)

  return { user, isLoading, error, mutate }
}
