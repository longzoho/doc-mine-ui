import {useMutation} from 'react-query';
import {useGoogleAuth} from "./UseGoogleAuth";

export const useAuthPost = (path: string) => {
  const {accessToken} = useGoogleAuth();
  const {mutate: post, isLoading, error} = useMutation(path, async (post: any) => {
    return fetch(path, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken!
      }
    }).then(res => res.json());
  });
  return {
    post, isLoading, error
  }
}