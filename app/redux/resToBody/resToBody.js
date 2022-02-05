export default async function resToBody(res) {
  //console.log("res_123", JSON.stringify(res));
  let body = null;
  if (res.headers["Content-Type"] === "application/json") {
    body = await res.json();
    //console.log("res_123_if", body);
  } else {
    body = await res.text();
    //console.log("res_123_else_text", body);
    try {
      body = JSON.parse(body);
      //console.log("res_123_else_try", body);
    } catch (err) {
      body = "error";
    }
  }
  return body;
}
