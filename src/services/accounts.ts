import axios from "axios";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post("http://localhost:3003/api/account/login", {
      username,
      password,
    });

    return response; // axios automatically parses JSON
  } catch (error) {
    throw new Error("Login failed");
  }
}
