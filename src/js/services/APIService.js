const BASE_URL = API_BASE_URL; //eslint-disable-line


function handleError(xhttp, status, cb) {
  return cb({
    message: xhttp.statusText,
    code: status,
  });
}

function handleSuccess(xhttp, cb) {
  const data = xhttp.responseText;
  let jsonResponse = {};
  try {
    jsonResponse = JSON.parse(data);
  } catch (e) {
    console.error('Error in parsing response text', e);
  } finally {
    cb(null, jsonResponse);
  }
}

function handleResponse(xhttp, status, cb) {
  if (status === 200 || status === 201) {
    return handleSuccess(xhttp, cb);
  }
  return handleError(xhttp, status, cb);
}

function GET(path, requireAuth, cb) {
  const xhttp = new XMLHttpRequest();
  const URL = `${BASE_URL}${path}`;
  xhttp.onreadystatechange = function onreadystatechange() {
    if (this.readyState === 4) {
      handleResponse(xhttp, this.status, cb);
    }
  };
  xhttp.open('GET', URL, true);
  if (requireAuth) {
    // addAuthentication(xhttp);
  }
  //   addXToken(xhttp);
  //   addAppVerion(xhttp);
  xhttp.send();
}

// function POST(path, body, requireAuth, cb) {
//   const xhttp = new XMLHttpRequest();
//   const URL = `${BASE_URL}${path}`;
//   xhttp.onreadystatechange = function onreadystatechange() {
//     if (this.readyState === 4) {
//       handleResponse(xhttp, this.status, cb);
//     }
//   };
//   xhttp.open('POST', URL, true);
//   //   if (requireAuth) {
//   //     addAuthentication(xhttp);
//   //   }
//   //   addXToken(xhttp);
//   //   addAppVerion(xhttp);
//   xhttp.setRequestHeader('Content-Type', 'application/json');
//   xhttp.send(body);
// }

function initApi(cb) {
  GET('api/users/2', false, cb);
}

module.exports = { initApi };
