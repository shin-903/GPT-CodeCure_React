import axios from 'axios';

// Axiosインスタンスを作成し、ベースURLを設定
const apiClient = axios.create({
  baseURL: 'http://localhost:3005', // APIのベースURL
  headers: {
    'Content-Type': 'application/json'
  }
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
