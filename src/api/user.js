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

      // ユーザー情報,トークンを保存
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return {
        message: response.data.message,
        token: token
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