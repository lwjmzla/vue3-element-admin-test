import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { CaptchaResult } from "./types";

/**
 * 获取验证码
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
  return request({
    url: "/api/v1/auth/captcha",
    method: "get",
  });
}
