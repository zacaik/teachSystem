import qs from "qs";
import { baseUrl } from "../consts";
import { useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";

export const http = async (
  url,
  { data, token, headers, isBody = false, ...customConfig }
) => {
  console.log(token);
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
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
      return Promise.reject(dataRes);
    }
  });
};

export const useHttp = () => {
  const { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );
  console.log(user);
  return useCallback(
    (url, config) => {
      return http(url, { ...config, token: user.token });
    },
    [user.token]
  );
};
