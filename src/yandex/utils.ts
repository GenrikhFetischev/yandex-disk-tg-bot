import fetch from "isomorphic-fetch";
import secret from "../../secret";

const baseUrl = "https://cloud-api.yandex.net/v1/disk";

const headers = {
  "Authorization": secret.yandexToken,
  "Content-Type": "application/json",
};

export const makeRequest = ({
  path,
  method = "GET",
  customHeaders = {},
  parameters = {},
}: {
  path: string;
  method?: string;
  customHeaders?: {
    [index: string]: string;
  };
  parameters?: {
    [index: string]: string;
  };
}) => {
  let queryString = `${baseUrl}/${path}?`;
  if (method === "GET") {
    Object.entries(parameters).forEach(([key, value]) => {
      queryString += `${key}=${value}&`;
    });
  }

  return fetch(encodeURI(queryString), {
    headers: { ...headers, ...customHeaders },
    method,
  }).then((r) => r.json());
};

export const uploadFile = (file: Buffer, url: string) =>
  fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "img/jpeg",
    },
  })
    .then((r) => {
      return r.status === 201 || r.status === 202;
    })
    .catch(console.log);
