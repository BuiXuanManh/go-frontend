/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
import axios from 'axios';
import Rating from 'src/types/Rating';
import { toast } from 'react-toastify';
import { User } from './type';
import {
  TokenRefreshRequest,
  IAuthTokens,
  getBrowserLocalStorage,
  applyAuthTokenInterceptor,
  clearAuthTokens,
  setAuthTokens
} from 'axios-jwt';
import Toast from 'src/components/Toast';
import Review from 'src/types/Review';
import Discussion from 'src/types/Discussion.type';
import DiscussionPart from 'src/types/DiscussionPart.type';

const BASE_URL = 'http://localhost:9090/v1';

export const authInstance = axios.create({
  baseURL: BASE_URL
});
export const instance = axios.create({
  baseURL: BASE_URL
});

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string
): Promise<IAuthTokens | string> => {
  const response = await axios.get(`${BASE_URL}/refresh_token`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });
  console.log(response);
  return response.data.access_token;
};
const getStorage = getBrowserLocalStorage;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      logout();

      toast.error(
        <Toast title={'Session Expired'} content={'Please click here to log in again.'} />,
        {
          onClick: () => {
            window.location.href = '/login';
          },
          onClose: () => {
            window.location.reload();
            console.log('onClose');
          }
        }
      );
    }

    // If there's an error and it's not a 401 status code, reject the promise with the error
    return Promise.reject(error);
  }
);

applyAuthTokenInterceptor(authInstance, {
  requestRefresh,
  getStorage, // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
  header: 'Authorization', // header name
  headerPrefix: 'Bearer ' // header value prefix
});

export const login = async (Username: string, Password: string) => {
  console.log({ Username, Password });
  const response = await instance.post('/login', { username: Username, password: Password });
  console.log(response.data.token);
  setAuthTokens({
    accessToken: response.data.token,
    refreshToken: response.data.token
  });
  return response.data;
};
export const logout = () => clearAuthTokens();

export const getMoviesByPage = async (page: number) => {
  const {data} = await instance.get(`/movie/get/page/${page}`);
  return data;
};

export const getTopRatedMovies = async () => {
  const response = await instance.get(`/topMovies/get`);
  return response.data;
};

export const updateAvgRating = async (movie_id: number) => {
  const { data } = await authInstance.post(`/topMovies/create/${movie_id}`);
  return data;
}

export const getLeaderboard = async () => {
  const response = await instance.get(`/leaderboard/get`);
  return response.data;
};
export const createLeaderBoard = async (movie_id:number, user_id:number, rate:number) => {
  console.log({movie_id, user_id, rate});
  const { data } = await authInstance.post(`/leaderboard/create/${movie_id}/${user_id}/${rate}`);
  return data;
};
export const getMovieCast = async (movieId: string) => {
  const { data } = await instance.get(`/cast/get/${movieId}`);
  return data;
};
export const getMovieCrew = async (movieId: string) => {
  const { data } = await instance.get(`/crew/get/${movieId}`);
  return data;
};
export const getMovieKeyword = async (movieId: string) => {
  const { data } = await instance.get(`/keyword/get/${movieId}`);
  return data.keyword_list;
};
export const getMovieDetail = async (movieId: string) => {
  const { data } = await instance.get(`/movie/get/${movieId}`);
  return data;
};

export const getMoviePopular = async (numOfMovie = 10) => {
  const { data } = await instance.get(`/movie/get/popular/${numOfMovie}`);
  return data;
};

export const getDiscussion = async (discussionId: string) => {
  const { data } = await instance.get(`/movieDiscussion/get/${discussionId}`);
  return data;
};

export const getDiscussionByPage = async (page: number) => {
  const { data } = await instance.get(`/movieDiscussion/get/discussion/page/${page}`);
  return data;
};

export const getMovieDiscussion = async (movieId: string) => {
  const { data } = await instance.get(`/movieDiscussion/getByMovie/${movieId}`);
  return data;
};

export const getMovieReview = async (movieId: string) => {
  const { data } = await instance.get(`/userReview/get/movie/${movieId}`);
  return data;
};
export const getSimilarMovies = async (movieId: string) => {
  const { data } = await instance.get(`/similarMovie/get/${movieId}`);
  return data;
};

export const createMovieDiscussion = async (discussion: Discussion) => {
  console.log(discussion);
  const { data } = await authInstance.post(`/movieDiscussion/create`, discussion);
  return data;
};

export const createDiscussionPart = async (
  discussionId: string,
  discussionPart: DiscussionPart
) => {
  const { data } = await authInstance.patch(
    `movieDiscussion/create/part/${discussionId}`,
    discussionPart
  );
  return data;
};

export const updateDiscussionPart = async (
  discussionId: string,
  discussionPart: DiscussionPart
) => {
  const { data } = await authInstance.patch(
    `movieDiscussion/update/part/${discussionId}/${discussionPart.part_id}`,
    discussionPart
  );
  return data;
};

export const deleteDiscussion = async (discussionId: string) => {
  const { data } = await authInstance.delete(`/movieDiscussion/delete/${discussionId}`);
  return data;
};

export const deleteDiscussionPart = async (discussionId: string, partId: number) => {
  const { data } = await authInstance.patch(
    `movieDiscussion/delete/part/${discussionId}/${partId}`
  );
  return data;
};

export const createMovieRating = async (rating: Rating) => {
  const { data } = await authInstance.post(`/rating/create`, {
    movie_id: rating.movie_id,
    user_id: rating.user_id,
    rating: rating.rating,
    timestamp: Math.floor(Date.now() / 1000)
  });
  return data;
};


export const createMovieReview = async (review: Review) => {
  const { data } = await authInstance.post(`userReview/create`, review);
  return data;
};

export const updateMovieRating = async (rating: Rating) => {
  const { data } = await authInstance.patch(`rating/update`, {
    movie_id: rating.movie_id,
    user_id: rating.user_id,
    rating: rating.rating,
    timestamp: Math.floor(Date.now() / 1000)
  });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await authInstance.get(`currentUser`);
  return data;
};

export const searchMovie = async (query: string, page: number) => {
  const { data } = await instance.get(`movie/search/${query}/${page}`);
  return data;
};

export const getUserRating = async (userId: string) => {
  const { data } = await instance.get(`rating/get/user/${userId}`);
  return data;
};

export const getUserReview = async (userId: string) => {
  const { data } = await instance.get(`userReview/get/user/${userId}`);
  return data;
};

export const deleteUserReview = async (userId: string, movieId: string) => {
  const { data } = await authInstance.delete(`userReview/delete/${userId}/${movieId}`);
  return data;
};

export const updateUserReview = async (review: Partial<Review>) => {
  const { data } = await authInstance.patch(`userReview/update`, review);
  return data;
};

export const getMovieRatingByUser = async (userId: number, movieId: string) => {
  const { data } = await instance.get(`rating/get/${userId}/${movieId}`);
  return data;
};

export const deleteMovieRating = async (reqData: { userId: number; movieId: string }) => {
  const { data } = await authInstance.delete(`rating/delete/${reqData.userId}/${reqData.movieId}`);
  return data;
};

export const getUserProfile = async (userId: string) => {
  const { data } = await instance.get(`user/get/${userId}`);
  return data;
};

export const getUserDiscussion = async (userId: string) => {
  const { data } = await instance.get(`movieDiscussion/getByUser/${userId}`);
  return data;
};

export const createUserProfile = async (user: User) => {
  const { data } = await instance.post(`user/create`, user);
  return data;
};

export const updateUserProfile = async (user: User) => {
  console.log(user);
  try {
    const { data } = await authInstance.patch(`user/update`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async ({
  userId,
  oldPassword,
  newPassword
}: {
  userId: number;
  oldPassword: string;
  newPassword: string;
}) => {
  const { data } = await authInstance.patch(`user/change_password`, {
    id: userId,
    old_password: oldPassword,
    new_password: newPassword
  });
  return data;
};

export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  const baseUrl = 'http://localhost:9090/v1';
  let url = `${baseUrl}/${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  return url;
};
