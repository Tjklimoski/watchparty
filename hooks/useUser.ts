import useSWR from 'swr';
import APIFetcher from '@/lib/APIFetcher';

export default function useUser() {
  const { data: user, isLoading, error, mutate } = useSWR('/user', APIFetcher)

  return { user, isLoading, error, mutate }
}
