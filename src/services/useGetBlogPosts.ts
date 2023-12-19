import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useBlogPosts = (id?: string) => {
  const [data, setData] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = id ? `/posts/${id}` : '/posts';
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: id ? {} : { _page: page, _limit: limit },
      });

      if (id) {
        setData([response.data]);
        setHasMore(false);
      } else {
        setData((prevPosts) => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, page, limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    allInfoBlog: data as BlogPost[],
    isLoadingBlog: isLoading,
    isErrorBlog: isError,
    hasMoreBlog: hasMore,
    setPage,
  };
};