"use strict";

export default async function handleInvalidResponse(response) {
  if (!response.ok) {
    throw await response.json();
  }
  let type = response.headers.get("Content-Type");
  if (type !== null && type.indexOf("application/json") === -1) {
    throw new TypeError(`Expected JSON, got ${type}`);
  }
  return response;
}
