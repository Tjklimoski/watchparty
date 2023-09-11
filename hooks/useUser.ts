import useSWR from 'swr';
import APIFetcher from '@/lib/APIFetcher';
import { User } from '@/types';

export default function useUser(id?: string) {
  let route = '/user'
  if (id) route = `/users/${id}`

  const { data: user, isLoading, error, mutate } = useSWR<User>(route, APIFetcher)

  return { user, isLoading, error, mutate }
}
