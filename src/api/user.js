import axios from 'axios';

// Axiosインスタンスを作成し、ベースURLを設定
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // APIのベースURL
  headers: {
    'Content-Type': 'application/json'
  }
});

// リクエストのインターセプターを設定
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// /signupエンドポイントにPOSTリクエストを送信する関数
export const signup = async (data) => {
  console.log(data);
  try {
    const response = await apiClient.post('/signup', {
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation
      }
    });
    console.log(response);
    if (response.status === 201) {
      return {
        message: response.data.message,
        user: response.data.user
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return {
        error: error.response.data.error
      };
    } else {
      console.error("An unexpected error occurred:", error);
      return { error: "An unexpected error occurred" };
    }
  }
};

// /signinエンドポイントにPOSTリクエストを送信する関数
export const signin = async (data) => {
  console.log(data);
  try {
    const response = await apiClient.post('/login', {
      email: data.email,
      password: data.password
    });   
    console.log(response);
    if (response.status === 200) {
      const token = response.data.token;
      const user = response.data.user;

      // トークンを保存
      localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(user));
      return {
        message: response.data.message,
        token: token,
        user: user // レスポンスにユーザー情報を追加

      };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return {
        // error: error.response.data.error
        error: error.response.data.error || "Unauthorized" 
      };
    } else {
      console.error("An unexpected error occurred:", error);
      return { error: "An unexpected error occurred" };
    }
  }
};

// /logoutエンドポイントにPOSTリクエストを送信する関数
// export const logout = async () => {
//   try {
//     const response = await apiClient.delete('/logout');
//     console.log(response);
//     if (response.status === 200) {
//       return {
//         message: response.data.message
//       };
//     }
//   } catch (error) {
//     console.error("An unexpected error occurred:", error);
//     return { error: "An unexpected error occurred" };
//   }
// };

// /userエンドポイントにGETリクエストを送信する関数
export const getUser = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    console.log(response);
    if (response.status === 200) {
      return {
        user: response.data.user
      };
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { error: "An unexpected error occurred" };
  }
};


// /userエンドポイントにPATCHリクエストを送信する関数
// export const updateUser = async (data) => {
//   try {
//     const response = await apiClient.patch('/user', {
//       user: {
//         name: data.name,
//         email: data.email
//       }
//     });
//     console.log(response);
//     if (response.status === 200) {
//       return {
//         message: response.data.message,
//         user: response.data.user
//       };
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 400) {
//       return {
//         error: error.response.data.error
//       };
//     } else {
//       console.error("An unexpected error occurred:", error);
//       return { error: "An unexpected error occurred" };
//     }
//   }
// };

// /userエンドポイントにDELETEリクエストを送信する関数
// export const deleteUser = async () => {
//   try {
//     const response = await apiClient.delete('/user');
//     console.log(response);
//     if (response.status === 200) {
//       return {
//         message: response.data.message
//       };
//     }
//   } catch (error) {
//     console.error("An unexpected error occurred:", error);
//     return { error: "An unexpected error occurred" };
//   }
// };

// /postsエンドポイントにGETリクエストを送信する関数
// export const getPosts = async () => {
//   try {
//     const response = await apiClient.get('/posts');
//     console.log(response);
//     if (response.status === 200) {
//       return {
//         posts: response.data.posts
//       };
//     }
//   } catch (error) {
//     console.error("An unexpected error occurred:", error);
//     return { error: "An unexpected error occurred" };
//   }
// };

// /postsエンドポイントにPOSTリクエストを送信する関数
// export const createPost = async (data) => {
//   try {
//     const response = await apiClient.post('/posts', {
//       post: {
//         title: data.title,
//         content: data.content
//       }
//     });
//     console.log(response);
//     if (response.status === 201) {
//       return {
//         message: response.data.message,
//         post: response.data.post
//       };
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 400) {
//       return {
//         error: error.response.data.error
//       };
//     } else {
//       console.error("An unexpected error occurred:", error);
//       return { error: "An unexpected error occurred" };
//     }
//   }
// };

// /posts/:idエンドポイントにGETリクエストを送信する関数
// export const getPost = async (id) => {
//   try {
//     const response = await apiClient.get(`/posts/${id}`);
//     console.log(response);
//     if (response.status === 200) {
//       return {
//         post: response.data.post
//       };
//     }
//   } catch (error) {
//     console.error("An unexpected error occurred:", error);
//     return { error: "An unexpected error occurred" };
//   }
// };

// /posts/:idエンドポイントにPATCHリクエストを送信する関数
// export const updatePost = async (id, data) => {
//   try {
//     const response = await apiClient.patch(`/posts/${id}`, {
//       post: {
//         title: data.title,
//         content: data.content
//       }
//     });
//     console.log(response);
//     if (response.status === 200) {
//       return {
//         message: response.data.message,
//         post: response.data.post
//       };
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 400) {
//       return {
//         error: error.response.data.error
//       };
//     } else {
//       console.error("An unexpected error occurred:", error);
//       return { error: "An unexpected error occurred" };
//     }
//   }
// };

// /posts/:idエンドポイントにDELETEリクエストを送信する関数
// export const deletePost = async (id) => {
//   try {
//     const response = await apiClient.delete(`/posts/${id}`);
//     console.log(response);
//     if (response.status === 200) {
//       return {
//         message: response.data.message
//       };
//     }
//   } catch (error) {
//     console.error("An unexpected error occurred:", error);
//     return { error: "An unexpected error occurred" };
//   }
// };

