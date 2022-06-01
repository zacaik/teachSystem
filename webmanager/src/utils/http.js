import qs from "qs";
import { baseUrl } from "../consts";
import { useCallback } from "react";

export const http = async (
  url,
  { data, token, headers, isBody = false, ...customConfig }
) => {
  console.log(token);
  const config = {
    method: "GET",
    headers: {
      Authorization: token || "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (
    config.method.toUpperCase() === "GET" ||
    (config.method.toUpperCase() === "PUT" && !isBody)
  ) {
    if (data) {
      url = `${url}?${qs.stringify(data)}`;
    }
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${baseUrl}/${url}`, config).then(async (res) => {
    console.log(res);
    if (res.status === 401) {
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const dataRes = await res.json();
    if (res.ok) {
      return dataRes;
    } else {
      return Promise.reject(dataRes.error);
    }
  });
};

export const useHttp = () => {
  const token = localStorage.getItem("__auth-provider-token__");
  return useCallback(
    (url, config) => {
      return http(url, { ...config, token });
    },
    [token]
  );
};
