import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useBlogPosts = (id?: string, pages?: number) => {
  const [data, setData] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const limit = 10;

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = id ? `/posts/${id}` : '/posts';
      const uri = id
        ? `${BASE_URL}${endpoint}`
        : `${BASE_URL}${endpoint}?_page=${page || 1}&_limit=${limit}`;
      const response = await axios.get(uri, {
        params: id ? {} : { _page: page, _limit: limit },
      });

      const total = parseInt(response.headers['x-total-count'], 10);
      setTotalPosts(total);

      if (id) {
        setData([response.data]);
        setHasMore(false);
      } else {
        setData(response.data);
        setHasMore(response.data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id, page, limit]);

  const totalPages = Math.ceil(totalPosts / limit);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, page]);

  useEffect(() => {
    setPage(pages || 1);
  }, [pages]);

  return {
    allInfoBlog: data as BlogPost[],
    isLoadingBlog: isLoading,
    isErrorBlog: isError,
    hasMoreBlog: hasMore,
    setPage,
    totalPages,
  };
};
