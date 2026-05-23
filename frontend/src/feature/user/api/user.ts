import { AxiosError } from "axios";
import type { User } from "../type/user";
import UnauthorizedError from "@/error/common_errors/UnauthorizedError";
import type { UserMePatchApi } from "../type/api";

class UserMeApi {
  static get = async (): Promise<User> => {
    try {
      // TODO: user/me with GET method
      const test_user = {
        id: 1,
        student_id: "0CDIM0000",
        name: "東海太郎",
        mail: "0CDIM0000@tokai.ac.jp",
      };
      console.log("user/me");
      console.log("user/me: ", test_user);
      const res = test_user;
      const user: User = {
        studentId: res.student_id,
        ...res,
      };
      return Promise.resolve(user);
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.data.code) {
          case "UNAUTHORIZED":
            throw new UnauthorizedError("not logged in");
        }
      }
      throw error;
    }
  };

  static patch = async (data: UserMePatchApi): Promise<void> => {
    try {// TODO: user/me with PATCH method
    console.log("user/me: ", data);
    return Promise.resolve();
    
    } catch(error) {
      if (error instanceof AxiosError) {
        switch (error.response?.data.code) {
          case "UNAUTHORIZED":
            throw new UnauthorizedError("not logged in");
        }
      }
      throw error;
    }
  }
}

export default UserMeApi;
