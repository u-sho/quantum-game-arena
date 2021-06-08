var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        return fulfil(data);
      }
      const encoding = h["content-encoding"] || "utf-8";
      fulfil(new TextDecoder(encoding).decode(data));
    });
  });
}

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}<\/script>` : `<script type="svelte-data" url="${url}">${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = { ...opts.headers };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (error3) {
    options2.handle_error(error3);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error2 = e;
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error2,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({ ...request, params });
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let { status = 200, body, headers = {} } = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = { ...headers, "content-type": "application/json" };
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return { status, body: normalized_body, headers };
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const [type, ...directives] = headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var tasks = new Set();
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// .svelte-kit/output/server/app.js
var css$b = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$b);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="ja-JP">\n	<head>\n		<meta charset="utf-8" />\n		<!-- <link rel="canonical" href="" /> -->\n		<link rel="icon" sizes="16x16 24x24 32x32 48x48 64x64 128x128 256x256" href="/favicon.ico" />\n		<link rel="icon" type="image/png" sizes="144x144" href="/logo-144x144.png" />\n		<link rel="icon" type="image/png" sizes="192x192" href="/logo-192x192.png" />\n		<link rel="icon" type="image/png" sizes="512x512" href="/logo-512x512.png" />\n\n		<link rel="apple-touch-icon" href="/logo-192x192.png" />\n		<meta name="apple-mobile-web-app-title" content="Quantum Game Arena" />\n		<meta name="apple-mobile-web-app-status-bar-style" content="default" />\n		<meta name="apple-mobile-web-app-capable" content="yes" />\n\n		<meta name="mobile-web-app-capable" content="yes" />\n\n		<link rel="manifest" href="/manifest.webmanifest" />\n		<meta\n			name="viewport"\n			content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"\n		/>\n		<meta name="theme-color" content="#7a9de3" />\n		<meta name="background-color" content="#ffffff" />\n		<meta name="application-name" content="Quantum Game Arena" />\n		<meta\n			name="description"\n			content="Quantum Game Arena \u306F\uFF0C\u30B2\u30FC\u30E0\u3092\u901A\u3058\u3066\u91CF\u5B50\u529B\u5B66\u7684\u4E16\u754C\u89B3\u3092\u990A\u3046\u3053\u3068\u3092\u76EE\u7684\u3068\u3057\u305F\u91CF\u5B50\u30B2\u30FC\u30E0\u306E\u904A\u3073\u5834\u3067\u3059\uFF0E"\n		/>\n		<meta name="keywords" content="education,games" />\n\n		<!-- <meta property="og:url" content="https://xxx" /> -->\n		<!-- <meta property="og:image" content="https://xxx/ogp-img.png" /> -->\n		<meta property="og:type" content="website" />\n		<meta property="og:title" content="Quantum Game Arena" />\n		<meta\n			property="og:description"\n			content="Quantum Game Arena \u306F\uFF0C\u30B2\u30FC\u30E0\u3092\u901A\u3058\u3066\u91CF\u5B50\u529B\u5B66\u7684\u4E16\u754C\u89B3\u3092\u990A\u3046\u3053\u3068\u3092\u76EE\u7684\u3068\u3057\u305F\u91CF\u5B50\u30B2\u30FC\u30E0\u306E\u904A\u3073\u5834\u3067\u3059\uFF0E"\n		/>\n		<meta property="og:site_name" content="Quantum Game Arena" />\n\n		<!-- <meta property="fb:app_id" content="" /> -->\n		<meta name="twitter:card" content="summary" />\n		<!-- <meta name="twitter:url" content="https://xxx" /> -->\n		<!-- <meta name="twitter:site" content="https://xxx" /> -->\n		<meta name="twitter:title" content="Quantum Game Arena" />\n		<meta name="twitter:description" content="\u91CF\u5B50\u30B2\u30FC\u30E0\u306E\u904A\u3073\u5834" />\n		<!-- <meta name="twitter:image" content="https://xxx/ogp-img.png" /> -->\n		<meta name="twitter:creator" content="@QGameArena" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-dfffde7e.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-dfffde7e.js", "/./_app/chunks/vendor-d0243e53.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2) => {
      console.error(error2.stack);
      error2.stack = options.get_stack(error2);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: false,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": "favicon.ico", "size": 205924, "type": "image/vnd.microsoft.icon" }, { "file": "logo-144x144.png", "size": 11250, "type": "image/png" }, { "file": "logo-192x192.png", "size": 15341, "type": "image/png" }, { "file": "logo-512x512.png", "size": 64855, "type": "image/png" }, { "file": "manifest.webmanifest", "size": 913, "type": "application/manifest+json" }, { "file": "top-screenshot.png", "size": 235781, "type": "image/png" }],
  layout: "src/routes/__layout.svelte",
  error: "src/routes/__error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/games\/quantum-tictactoe\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/games/quantum-tictactoe/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/games\/quantum-tictactoe\/tutorial\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/games/quantum-tictactoe/tutorial/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/games\/quantum-tictactoe\/play\/human\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/games/quantum-tictactoe/play/human.svelte"],
      b: ["src/routes/__error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/__error.svelte": () => Promise.resolve().then(function() {
    return __error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/games/quantum-tictactoe/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/games/quantum-tictactoe/tutorial/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/games/quantum-tictactoe/play/human.svelte": () => Promise.resolve().then(function() {
    return human;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-0890587c.js", "css": ["/./_app/assets/pages/__layout.svelte-0bca6a0e.css"], "js": ["/./_app/pages/__layout.svelte-0890587c.js", "/./_app/chunks/vendor-d0243e53.js"], "styles": null }, "src/routes/__error.svelte": { "entry": "/./_app/pages/__error.svelte-1b8e89ca.js", "css": [], "js": ["/./_app/pages/__error.svelte-1b8e89ca.js", "/./_app/chunks/vendor-d0243e53.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-2762bf6c.js", "css": ["/./_app/assets/pages/index.svelte-6b7bec64.css", "/./_app/assets/index-fb8d875f.css"], "js": ["/./_app/pages/index.svelte-2762bf6c.js", "/./_app/chunks/vendor-d0243e53.js", "/./_app/chunks/index-a8ada427.js"], "styles": null }, "src/routes/games/quantum-tictactoe/index.svelte": { "entry": "/./_app/pages/games/quantum-tictactoe/index.svelte-26cf78d7.js", "css": ["/./_app/assets/pages/games/quantum-tictactoe/index.svelte-5dc44e4d.css", "/./_app/assets/index-fb8d875f.css"], "js": ["/./_app/pages/games/quantum-tictactoe/index.svelte-26cf78d7.js", "/./_app/chunks/vendor-d0243e53.js", "/./_app/chunks/index-a8ada427.js"], "styles": null }, "src/routes/games/quantum-tictactoe/tutorial/index.svelte": { "entry": "/./_app/pages/games/quantum-tictactoe/tutorial/index.svelte-d18bb604.js", "css": [], "js": ["/./_app/pages/games/quantum-tictactoe/tutorial/index.svelte-d18bb604.js", "/./_app/chunks/vendor-d0243e53.js"], "styles": null }, "src/routes/games/quantum-tictactoe/play/human.svelte": { "entry": "/./_app/pages/games/quantum-tictactoe/play/human.svelte-34349db2.js", "css": ["/./_app/assets/pages/games/quantum-tictactoe/play/human.svelte-8c7a7dd6.css"], "js": ["/./_app/pages/games/quantum-tictactoe/play/human.svelte-34349db2.js", "/./_app/chunks/vendor-d0243e53.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({ paths: { "base": "", "assets": "/." } });
function render(request, {
  prerender: prerender2
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender: prerender2 });
}
var css$a = {
  code: ":root{--theme-color:#7a9de3;--theme-light-color:#f0f7ff;--accent-color:#8b0204;--bg-color:#ffffff}body{margin:0;padding:0}#svelte{min-height:100vh;width:100%;height:100%;box-sizing:border-box;position:relative;top:0}a{text-decoration:none}",
  map: '{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<slot />\\n\\n<style lang=\\"scss\\">:root {\\n  --theme-color: #7a9de3;\\n  --theme-light-color: #f0f7ff;\\n  --accent-color: #8b0204;\\n  --bg-color: #ffffff;\\n}\\n\\n:global(body) {\\n  margin: 0;\\n  padding: 0;\\n}\\n\\n:global(#svelte) {\\n  min-height: 100vh;\\n  width: 100%;\\n  height: 100%;\\n  box-sizing: border-box;\\n  position: relative;\\n  top: 0;\\n}\\n\\n:global(a) {\\n  text-decoration: none;\\n}</style>\\n"],"names":[],"mappings":"AAEmB,KAAK,AAAC,CAAC,AACxB,aAAa,CAAE,OAAO,CACtB,mBAAmB,CAAE,OAAO,CAC5B,cAAc,CAAE,OAAO,CACvB,UAAU,CAAE,OAAO,AACrB,CAAC,AAEO,IAAI,AAAE,CAAC,AACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AAEO,OAAO,AAAE,CAAC,AAChB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,UAAU,CACtB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,AACR,CAAC,AAEO,CAAC,AAAE,CAAC,AACV,eAAe,CAAE,IAAI,AACvB,CAAC"}'
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$a);
  return `${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error2, status }) {
  return {
    props: { title: `${status}: ${error2.message}` }
  };
}
var _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<h1>${escape2(title)}</h1>`;
});
var __error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _error,
  load
});
var css$9 = {
  code: 'header.svelte-dl3egc.svelte-dl3egc{display:flex;justify-content:space-between;height:3rem;background-color:var(--theme-light-color)}.logo.svelte-dl3egc.svelte-dl3egc{height:3rem}.logo.svelte-dl3egc a.svelte-dl3egc{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.logo.svelte-dl3egc a img.svelte-dl3egc{height:2.5rem;width:2.5rem}.logo.svelte-dl3egc a h1.svelte-dl3egc{font-size:1.5rem;font-weight:bold;margin:0}nav.svelte-dl3egc.svelte-dl3egc{display:flex;justify-content:center}nav.svelte-dl3egc ul.svelte-dl3egc{position:relative;padding:0;margin:0;height:3rem;display:flex;justify-content:center;align-items:center;list-style:none;background-size:contain}nav.svelte-dl3egc ul li.svelte-dl3egc{position:relative;height:100%}nav.svelte-dl3egc ul li.svelte-dl3egc::before{--size:6px;content:"";width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}nav.svelte-dl3egc ul li a.svelte-dl3egc{display:flex;height:100%;align-items:center;padding:0 1em;color:var(--heading-color);font-weight:700;font-size:1rem;text-transform:uppercase;letter-spacing:10%;text-decoration:none;transition:color 0.2s linear}nav.svelte-dl3egc ul li a.svelte-dl3egc:hover{opacity:0.5}',
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<header>\\n\\t<hgroup class=\\"logo\\">\\n\\t\\t<a sveltekit:prefetch href=\\"/\\">\\n\\t\\t\\t<img src=\\"/logo-144x144.png\\" alt=\\"QuantumGameArena\\" />\\n\\t\\t\\t<h1>Quantum Game Arena</h1>\\n\\t\\t</a>\\n\\t</hgroup>\\n\\n\\t<nav>\\n\\t\\t<ul>\\n\\t\\t\\t<li><a sveltekit:prefetch href=\\"/#about\\">About</a></li>\\n\\t\\t\\t<li><a sveltekit:prefetch sveltekit:noscroll href=\\"/#games\\">Games</a></li>\\n\\t\\t</ul>\\n\\t</nav>\\n</header>\\n\\n<style lang=\\"scss\\">header {\\n  display: flex;\\n  justify-content: space-between;\\n  height: 3rem;\\n  background-color: var(--theme-light-color);\\n}\\n\\n.logo {\\n  height: 3rem;\\n}\\n.logo a {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  width: 100%;\\n  height: 100%;\\n}\\n.logo a img {\\n  height: 2.5rem;\\n  width: 2.5rem;\\n}\\n.logo a h1 {\\n  font-size: 1.5rem;\\n  font-weight: bold;\\n  margin: 0;\\n}\\n\\nnav {\\n  display: flex;\\n  justify-content: center;\\n}\\nnav ul {\\n  position: relative;\\n  padding: 0;\\n  margin: 0;\\n  height: 3rem;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  list-style: none;\\n  background-size: contain;\\n}\\nnav ul li {\\n  position: relative;\\n  height: 100%;\\n}\\nnav ul li::before {\\n  --size: 6px;\\n  content: \\"\\";\\n  width: 0;\\n  height: 0;\\n  position: absolute;\\n  top: 0;\\n  left: calc(50% - var(--size));\\n  border: var(--size) solid transparent;\\n  border-top: var(--size) solid var(--accent-color);\\n}\\nnav ul li a {\\n  display: flex;\\n  height: 100%;\\n  align-items: center;\\n  padding: 0 1em;\\n  color: var(--heading-color);\\n  font-weight: 700;\\n  font-size: 1rem;\\n  text-transform: uppercase;\\n  letter-spacing: 10%;\\n  text-decoration: none;\\n  transition: color 0.2s linear;\\n}\\nnav ul li a:hover {\\n  opacity: 0.5;\\n}</style>\\n"],"names":[],"mappings":"AAgBmB,MAAM,4BAAC,CAAC,AACzB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,AAC5C,CAAC,AAED,KAAK,4BAAC,CAAC,AACL,MAAM,CAAE,IAAI,AACd,CAAC,AACD,mBAAK,CAAC,CAAC,cAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AACD,mBAAK,CAAC,CAAC,CAAC,GAAG,cAAC,CAAC,AACX,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,MAAM,AACf,CAAC,AACD,mBAAK,CAAC,CAAC,CAAC,EAAE,cAAC,CAAC,AACV,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,AACX,CAAC,AAED,GAAG,4BAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,iBAAG,CAAC,EAAE,cAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,CAChB,eAAe,CAAE,OAAO,AAC1B,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,EAAE,cAAC,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,AACd,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,gBAAE,QAAQ,AAAC,CAAC,AACjB,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,CAC7B,MAAM,CAAE,IAAI,MAAM,CAAC,CAAC,KAAK,CAAC,WAAW,CACrC,UAAU,CAAE,IAAI,MAAM,CAAC,CAAC,KAAK,CAAC,IAAI,cAAc,CAAC,AACnD,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,cAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,MAAM,AAC/B,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,EAAE,CAAC,eAAC,MAAM,AAAC,CAAC,AACjB,OAAO,CAAE,GAAG,AACd,CAAC"}'
};
var TheHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `<header class="${"svelte-dl3egc"}"><hgroup class="${"logo svelte-dl3egc"}"><a sveltekit:prefetch href="${"/"}" class="${"svelte-dl3egc"}"><img src="${"/logo-144x144.png"}" alt="${"QuantumGameArena"}" class="${"svelte-dl3egc"}">
			<h1 class="${"svelte-dl3egc"}">Quantum Game Arena</h1></a></hgroup>

	<nav class="${"svelte-dl3egc"}"><ul class="${"svelte-dl3egc"}"><li class="${"svelte-dl3egc"}"><a sveltekit:prefetch href="${"/#about"}" class="${"svelte-dl3egc"}">About</a></li>
			<li class="${"svelte-dl3egc"}"><a sveltekit:prefetch sveltekit:noscroll href="${"/#games"}" class="${"svelte-dl3egc"}">Games</a></li></ul></nav>
</header>`;
});
var css$8 = {
  code: ".footer.svelte-ncccu2.svelte-ncccu2{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px;background-color:var(--theme-color)}@media(min-width: 480px){.footer.svelte-ncccu2.svelte-ncccu2{padding:40px 0}}.footer__logo.svelte-ncccu2 a.svelte-ncccu2{font-weight:bold;display:flex;align-items:center;justify-content:center}.footer__logo.svelte-ncccu2 a img.svelte-ncccu2{height:2rem}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<footer class=\\"footer\\">\\n\\t<div class=\\"footer__logo\\">\\n\\t\\t<a sveltekit:prefetch href=\\"/#top\\">\\n\\t\\t\\t<img src=\\"/logo-144x144.png\\" alt=\\"QuantumGameArena\\" />\\n\\t\\t\\t<h1 class=\\"footer__title\\">Quantum Game Arena</h1>\\n\\t\\t</a>\\n\\t</div>\\n\\ttwitter\\n</footer>\\n\\n<style lang=\\"scss\\">.footer {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  padding: 40px;\\n  background-color: var(--theme-color);\\n}\\n@media (min-width: 480px) {\\n  .footer {\\n    padding: 40px 0;\\n  }\\n}\\n\\n.footer__logo a {\\n  font-weight: bold;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\n.footer__logo a img {\\n  height: 2rem;\\n}</style>\\n"],"names":[],"mappings":"AAUmB,OAAO,4BAAC,CAAC,AAC1B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,IAAI,aAAa,CAAC,AACtC,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,OAAO,4BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CAAC,CAAC,AACjB,CAAC,AACH,CAAC,AAED,2BAAa,CAAC,CAAC,cAAC,CAAC,AACf,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,2BAAa,CAAC,CAAC,CAAC,GAAG,cAAC,CAAC,AACnB,MAAM,CAAE,IAAI,AACd,CAAC"}'
};
var TheFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<footer class="${"footer svelte-ncccu2"}"><div class="${"footer__logo svelte-ncccu2"}"><a sveltekit:prefetch href="${"/#top"}" class="${"svelte-ncccu2"}"><img src="${"/logo-144x144.png"}" alt="${"QuantumGameArena"}" class="${"svelte-ncccu2"}">
			<h1 class="${"footer__title"}">Quantum Game Arena</h1></a></div>
	twitter
</footer>`;
});
var css$7 = {
  code: ".hero.svelte-qaq6qt.svelte-qaq6qt{display:flex;align-items:center;justify-content:center;height:10rem;width:100%;background:var(--theme-color)}.hero.svelte-qaq6qt h1.svelte-qaq6qt{color:var(--bg-color);font-size:2.5rem}section.svelte-qaq6qt.svelte-qaq6qt{display:flex;align-items:center;justify-content:center;width:100%;flex-direction:column}section.svelte-qaq6qt.svelte-qaq6qt:nth-child(even){background-color:var(--theme-light-color)}section.svelte-qaq6qt h1.svelte-qaq6qt{font-weight:bold;font-size:2rem;border-bottom:2px solid var(--theme-color)}section.svelte-qaq6qt p.svelte-qaq6qt{max-width:512px}.game-list.svelte-qaq6qt.svelte-qaq6qt{display:flex;align-items:center;justify-content:center}.game-list.svelte-qaq6qt li.svelte-qaq6qt{list-style-type:none;margin:1rem;box-sizing:border-box;display:flex;align-items:center;justify-content:center;height:125px;width:100px;border:2px solid var(--accent-color)}.game-list.svelte-qaq6qt li a.svelte-qaq6qt{font-weight:bold}.game-list.svelte-qaq6qt .comming-soon.svelte-qaq6qt{background:#aaaaaaaa}.game-list.svelte-qaq6qt .comming-soon a.svelte-qaq6qt{opacity:0.5}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\" lang=\\"ts\\">export const prerender = true;\\n<\/script>\\n\\n<script lang=\\"ts\\">import TheHeader from '$lib/TheHeader/index.svelte';\\nimport TheFooter from '$lib/TheFooter/index.svelte';\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Quantum Game Arena</title>\\n</svelte:head>\\n\\n<TheHeader />\\n<article>\\n\\t<header class=\\"hero\\" id=\\"top\\">\\n\\t\\t<h1>Quantum Game Arena</h1>\\n\\t</header>\\n\\t<section id=\\"about\\">\\n\\t\\t<h1>About</h1>\\n\\t\\t<p>\\n\\t\\t\\tQuantum Game Arena\\n\\t\\t\\t\u306F\uFF0C\u30B2\u30FC\u30E0\u3092\u901A\u3058\u3066\u91CF\u5B50\u529B\u5B66\u7684\u4E16\u754C\u89B3\u3092\u990A\u3046\u3053\u3068\u3092\u76EE\u7684\u3068\u3057\u305F\u91CF\u5B50\u30B2\u30FC\u30E0\u306E\u904A\u3073\u5834\u3067\u3059\uFF0E\\n\\t\\t</p>\\n\\t</section>\\n\\t<section id=\\"games\\">\\n\\t\\t<h1>Games</h1>\\n\\t\\t<nav>\\n\\t\\t\\t<ul class=\\"game-list\\">\\n\\t\\t\\t\\t<li>\\n\\t\\t\\t\\t\\t<a sveltekit:prefetch href=\\"/games/quantum-tictactoe\\" type=\\"text/html\\">\u91CF\u5B50\u4E09\u76EE\u4E26\u3079</a>\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t<li class=\\"comming-soon\\">\\n\\t\\t\\t\\t\\t<span>\u91CF\u5B50\u56F2\u7881</span>\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t<li class=\\"comming-soon\\">\\n\\t\\t\\t\\t\\t<span>\u91CF\u5B50\u5C06\u68CB</span>\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t<li class=\\"comming-soon\\">\\n\\t\\t\\t\\t\\t<span>\u91CF\u5B50\u4EBA\u72FC</span>\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t</ul>\\n\\t\\t</nav>\\n\\t</section>\\n</article>\\n<TheFooter />\\n\\n<style lang=\\"scss\\">.hero {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  height: 10rem;\\n  width: 100%;\\n  background: var(--theme-color);\\n}\\n.hero h1 {\\n  color: var(--bg-color);\\n  font-size: 2.5rem;\\n}\\n\\nsection {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  width: 100%;\\n  flex-direction: column;\\n}\\nsection:nth-child(even) {\\n  background-color: var(--theme-light-color);\\n}\\nsection h1 {\\n  font-weight: bold;\\n  font-size: 2rem;\\n  border-bottom: 2px solid var(--theme-color);\\n}\\nsection p {\\n  max-width: 512px;\\n}\\n\\n.game-list {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\n.game-list li {\\n  list-style-type: none;\\n  margin: 1rem;\\n  box-sizing: border-box;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  height: 125px;\\n  width: 100px;\\n  border: 2px solid var(--accent-color);\\n}\\n.game-list li a {\\n  font-weight: bold;\\n}\\n.game-list .comming-soon {\\n  background: #aaaaaaaa;\\n}\\n.game-list .comming-soon a {\\n  opacity: 0.5;\\n}</style>\\n"],"names":[],"mappings":"AA6CmB,KAAK,4BAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAAI,aAAa,CAAC,AAChC,CAAC,AACD,mBAAK,CAAC,EAAE,cAAC,CAAC,AACR,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,SAAS,CAAE,MAAM,AACnB,CAAC,AAED,OAAO,4BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,MAAM,AACxB,CAAC,AACD,mCAAO,WAAW,IAAI,CAAC,AAAC,CAAC,AACvB,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,AAC5C,CAAC,AACD,qBAAO,CAAC,EAAE,cAAC,CAAC,AACV,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,aAAa,CAAC,AAC7C,CAAC,AACD,qBAAO,CAAC,CAAC,cAAC,CAAC,AACT,SAAS,CAAE,KAAK,AAClB,CAAC,AAED,UAAU,4BAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,wBAAU,CAAC,EAAE,cAAC,CAAC,AACb,eAAe,CAAE,IAAI,CACrB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,cAAc,CAAC,AACvC,CAAC,AACD,wBAAU,CAAC,EAAE,CAAC,CAAC,cAAC,CAAC,AACf,WAAW,CAAE,IAAI,AACnB,CAAC,AACD,wBAAU,CAAC,aAAa,cAAC,CAAC,AACxB,UAAU,CAAE,SAAS,AACvB,CAAC,AACD,wBAAU,CAAC,aAAa,CAAC,CAAC,cAAC,CAAC,AAC1B,OAAO,CAAE,GAAG,AACd,CAAC"}`
};
var prerender$2 = true;
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$7);
  return `${$$result.head += `${$$result.title = `<title>Quantum Game Arena</title>`, ""}`, ""}

${validate_component(TheHeader, "TheHeader").$$render($$result, {}, {}, {})}
<article><header class="${"hero svelte-qaq6qt"}" id="${"top"}"><h1 class="${"svelte-qaq6qt"}">Quantum Game Arena</h1></header>
	<section id="${"about"}" class="${"svelte-qaq6qt"}"><h1 class="${"svelte-qaq6qt"}">About</h1>
		<p class="${"svelte-qaq6qt"}">Quantum Game Arena
			\u306F\uFF0C\u30B2\u30FC\u30E0\u3092\u901A\u3058\u3066\u91CF\u5B50\u529B\u5B66\u7684\u4E16\u754C\u89B3\u3092\u990A\u3046\u3053\u3068\u3092\u76EE\u7684\u3068\u3057\u305F\u91CF\u5B50\u30B2\u30FC\u30E0\u306E\u904A\u3073\u5834\u3067\u3059\uFF0E
		</p></section>
	<section id="${"games"}" class="${"svelte-qaq6qt"}"><h1 class="${"svelte-qaq6qt"}">Games</h1>
		<nav><ul class="${"game-list svelte-qaq6qt"}"><li class="${"svelte-qaq6qt"}"><a sveltekit:prefetch href="${"/games/quantum-tictactoe"}" type="${"text/html"}" class="${"svelte-qaq6qt"}">\u91CF\u5B50\u4E09\u76EE\u4E26\u3079</a></li>
				<li class="${"comming-soon svelte-qaq6qt"}"><span>\u91CF\u5B50\u56F2\u7881</span></li>
				<li class="${"comming-soon svelte-qaq6qt"}"><span>\u91CF\u5B50\u5C06\u68CB</span></li>
				<li class="${"comming-soon svelte-qaq6qt"}"><span>\u91CF\u5B50\u4EBA\u72FC</span></li></ul></nav></section></article>
${validate_component(TheFooter, "TheFooter").$$render($$result, {}, {}, {})}`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  prerender: prerender$2
});
var css$6 = {
  code: ".main.svelte-1a96xjj.svelte-1a96xjj{display:flex;flex-direction:column;padding:0;margin:0;width:100%;box-sizing:border-box}.main--title.svelte-1a96xjj.svelte-1a96xjj{text-align:center}.nav.svelte-1a96xjj.svelte-1a96xjj{text-align:center}.nav.svelte-1a96xjj li.svelte-1a96xjj{list-style-type:none;box-sizing:border-box;margin:1.5rem;padding:auto}.nav.svelte-1a96xjj li .btn.svelte-1a96xjj{display:inline-block;box-sizing:border-box;border-radius:1.2rem;width:10rem;height:2.5rem;line-height:1.5;font-size:1.25rem;background-color:var(--theme-color);color:var(--bg-color)}.nav.svelte-1a96xjj .comming-soon.svelte-1a96xjj{opacity:0.5}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\" lang=\\"ts\\">export const prerender = true;\\n<\/script>\\n\\n<script lang=\\"ts\\">import TheHeader from '$lib/TheHeader/index.svelte';\\nimport TheFooter from '$lib/TheFooter/index.svelte';\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>\\n</svelte:head>\\n\\n<TheHeader />\\n<main class=\\"main\\">\\n\\t<h1 class=\\"main--title\\">Quantum Tic-Tac-Toe</h1>\\n\\t<ul class=\\"nav\\">\\n\\t\\t<li>\\n\\t\\t\\t<a\\n\\t\\t\\t\\tclass=\\"btn\\"\\n\\t\\t\\t\\tsveltekit:prefetch\\n\\t\\t\\t\\thref=\\"/games/quantum-tictactoe/tutorial\\"\\n\\t\\t\\t\\ttype=\\"text/html;charset=utf-8\\">\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB</a\\n\\t\\t\\t>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t\\t<a\\n\\t\\t\\t\\tclass=\\"btn\\"\\n\\t\\t\\t\\tsveltekit:prefetch\\n\\t\\t\\t\\thref=\\"/games/quantum-tictactoe/play/human\\"\\n\\t\\t\\t\\ttype=\\"application/ecmascript\\">\u30AA\u30D5\u30E9\u30A4\u30F3\u5BFE\u5C40</a\\n\\t\\t\\t>\\n\\t\\t</li>\\n\\t\\t<li class=\\"comming-soon\\"><span class=\\"btn\\">\u30AA\u30F3\u30E9\u30A4\u30F3\u5BFE\u5C40</span></li>\\n\\t</ul>\\n</main>\\n<TheFooter>\\n\\t<!--TODO: <menu>\\n\\t<li>seetings</li>\\n\\t<li>license</li>\\n\\t<li>share</li>\\n\\t<li>help</li>\\n</menu> -->\\n</TheFooter>\\n\\n<style lang=\\"scss\\">.main {\\n  display: flex;\\n  flex-direction: column;\\n  padding: 0;\\n  margin: 0;\\n  width: 100%;\\n  box-sizing: border-box;\\n}\\n\\n.main--title {\\n  text-align: center;\\n}\\n\\n.nav {\\n  text-align: center;\\n}\\n.nav li {\\n  list-style-type: none;\\n  box-sizing: border-box;\\n  margin: 1.5rem;\\n  padding: auto;\\n}\\n.nav li .btn {\\n  display: inline-block;\\n  box-sizing: border-box;\\n  border-radius: 1.2rem;\\n  width: 10rem;\\n  height: 2.5rem;\\n  line-height: 1.5;\\n  font-size: 1.25rem;\\n  background-color: var(--theme-color);\\n  color: var(--bg-color);\\n}\\n.nav .comming-soon {\\n  opacity: 0.5;\\n}</style>\\n"],"names":[],"mappings":"AA2CmB,KAAK,8BAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,UAAU,AACxB,CAAC,AAED,YAAY,8BAAC,CAAC,AACZ,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,IAAI,8BAAC,CAAC,AACJ,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,mBAAI,CAAC,EAAE,eAAC,CAAC,AACP,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,MAAM,CACd,OAAO,CAAE,IAAI,AACf,CAAC,AACD,mBAAI,CAAC,EAAE,CAAC,IAAI,eAAC,CAAC,AACZ,OAAO,CAAE,YAAY,CACrB,UAAU,CAAE,UAAU,CACtB,aAAa,CAAE,MAAM,CACrB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,MAAM,CACd,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,OAAO,CAClB,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC,AACD,mBAAI,CAAC,aAAa,eAAC,CAAC,AAClB,OAAO,CAAE,GAAG,AACd,CAAC"}`
};
var prerender$1 = true;
var Quantum_tictactoe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `${$$result.head += `${$$result.title = `<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>`, ""}`, ""}

${validate_component(TheHeader, "TheHeader").$$render($$result, {}, {}, {})}
<main class="${"main svelte-1a96xjj"}"><h1 class="${"main--title svelte-1a96xjj"}">Quantum Tic-Tac-Toe</h1>
	<ul class="${"nav svelte-1a96xjj"}"><li class="${"svelte-1a96xjj"}"><a class="${"btn svelte-1a96xjj"}" sveltekit:prefetch href="${"/games/quantum-tictactoe/tutorial"}" type="${"text/html;charset=utf-8"}">\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB</a></li>
		<li class="${"svelte-1a96xjj"}"><a class="${"btn svelte-1a96xjj"}" sveltekit:prefetch href="${"/games/quantum-tictactoe/play/human"}" type="${"application/ecmascript"}">\u30AA\u30D5\u30E9\u30A4\u30F3\u5BFE\u5C40</a></li>
		<li class="${"comming-soon svelte-1a96xjj"}"><span class="${"btn svelte-1a96xjj"}">\u30AA\u30F3\u30E9\u30A4\u30F3\u5BFE\u5C40</span></li></ul></main>
${validate_component(TheFooter, "TheFooter").$$render($$result, {}, {}, {})}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Quantum_tictactoe,
  prerender: prerender$1
});
var prerender = true;
var Tutorial = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Tutorial - Quantum Tic-Tac-Toe - Quantum Game Arena</title>`, ""}`, ""}

<h1>Quantum Tic-Tac-Toe Tutorial</h1>
nee`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Tutorial,
  prerender
});
var css$5 = {
  code: ".white.svelte-j9qzjh{color:#e0e0e0}.blue.svelte-j9qzjh{color:#00bbd3}.red.svelte-j9qzjh{color:#e74c3c}",
  map: `{"version":3,"file":"QuantumMarks.svelte","sources":["QuantumMarks.svelte"],"sourcesContent":["<script lang=\\"ts\\">;\\nexport let qMarks;\\nexport let cycleMarks;\\nexport let isHighlighted;\\nexport let isBeingCollapsed;\\n$: marks = (qMarks === null || qMarks === void 0 ? void 0 : qMarks.filter((x) => x)) || [];\\nfunction spanClass(mark) {\\n    if (cycleMarks === null || cycleMarks === void 0 ? void 0 : cycleMarks.includes(mark)) {\\n        if (isBeingCollapsed)\\n            return 'red';\\n        if (isHighlighted)\\n            return 'blue';\\n    }\\n    return 'white';\\n}\\n<\/script>\\n\\n<div>\\n\\t{#each marks as m, i (m)}\\n\\t\\t<span class={spanClass(m)}>{m[0]}<sub>{m[1]}</sub>{i === marks.length - 1 ? '' : ', '}</span>\\n\\t{/each}\\n</div>\\n\\n<style lang=\\"scss\\">.white {\\n  color: #e0e0e0;\\n}\\n\\n.blue {\\n  color: #00bbd3;\\n}\\n\\n.red {\\n  color: #e74c3c;\\n}</style>\\n"],"names":[],"mappings":"AAuBmB,MAAM,cAAC,CAAC,AACzB,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,KAAK,cAAC,CAAC,AACL,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,IAAI,cAAC,CAAC,AACJ,KAAK,CAAE,OAAO,AAChB,CAAC"}`
};
var QuantumMarks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let marks;
  let { qMarks } = $$props;
  let { cycleMarks } = $$props;
  let { isHighlighted } = $$props;
  let { isBeingCollapsed } = $$props;
  function spanClass(mark) {
    if (cycleMarks === null || cycleMarks === void 0 ? void 0 : cycleMarks.includes(mark)) {
      if (isBeingCollapsed)
        return "red";
      if (isHighlighted)
        return "blue";
    }
    return "white";
  }
  if ($$props.qMarks === void 0 && $$bindings.qMarks && qMarks !== void 0)
    $$bindings.qMarks(qMarks);
  if ($$props.cycleMarks === void 0 && $$bindings.cycleMarks && cycleMarks !== void 0)
    $$bindings.cycleMarks(cycleMarks);
  if ($$props.isHighlighted === void 0 && $$bindings.isHighlighted && isHighlighted !== void 0)
    $$bindings.isHighlighted(isHighlighted);
  if ($$props.isBeingCollapsed === void 0 && $$bindings.isBeingCollapsed && isBeingCollapsed !== void 0)
    $$bindings.isBeingCollapsed(isBeingCollapsed);
  $$result.css.add(css$5);
  marks = (qMarks === null || qMarks === void 0 ? void 0 : qMarks.filter((x) => x)) || [];
  return `<div>${each(marks, (m, i) => `<span class="${escape2(null_to_empty(spanClass(m))) + " svelte-j9qzjh"}">${escape2(m[0])}<sub>${escape2(m[1])}</sub>${escape2(i === marks.length - 1 ? "" : ", ")}</span>`)}
</div>`;
});
var css$4 = {
  code: ".marks.svelte-1xoo0gw.svelte-1xoo0gw{margin:5px;margin-top:5px}.adjustCenter.svelte-1xoo0gw.svelte-1xoo0gw{margin-top:20px;margin-left:30px}.square.svelte-1xoo0gw.svelte-1xoo0gw{background:#374046;border:2px solid #999;float:left;font-size:24px;font-weight:bold;line-height:34px;height:160px;width:160px;margin-right:-1px;margin-top:-1px;border-color:#00bbd3;user-select:none}.classical.svelte-1xoo0gw.svelte-1xoo0gw{font-size:60px;display:flex;flex-direction:row;justify-content:center;align-items:center;color:#e0e0e0}.selected.svelte-1xoo0gw.svelte-1xoo0gw{color:#e74c3c}.rotating-dashed.svelte-1xoo0gw.svelte-1xoo0gw{position:relative;overflow:hidden;color:#00bbd3}.rotating-dashed.svelte-1xoo0gw .dashing.svelte-1xoo0gw{display:block;width:100%;height:100%;position:absolute}.rotating-dashed.svelte-1xoo0gw .dashing.svelte-1xoo0gw:nth-of-type(1){transform:rotate(0deg)}.rotating-dashed.svelte-1xoo0gw .dashing.svelte-1xoo0gw:nth-of-type(2){transform:rotate(90deg)}.rotating-dashed.svelte-1xoo0gw .dashing.svelte-1xoo0gw:nth-of-type(3){transform:rotate(180deg)}.rotating-dashed.svelte-1xoo0gw .dashing.svelte-1xoo0gw:nth-of-type(4){transform:rotate(270deg)}.rotating-dashed.svelte-1xoo0gw .dashing i.svelte-1xoo0gw{display:block;position:absolute;left:0;top:0;width:200%;border-bottom:5px dashed;animation:svelte-1xoo0gw-slideDash 2.5s infinite linear}@keyframes svelte-1xoo0gw-slideDash{from{transform:translateX(-50%)}to{transform:translateX(0%)}}",
  map: `{"version":3,"file":"BoardSquare.svelte","sources":["BoardSquare.svelte"],"sourcesContent":["<script lang=\\"ts\\">;\\nexport let cMark;\\nexport let qMarks;\\nexport let cycleMarks;\\nexport let isHighlighted;\\nexport let isBeingCollapsed;\\nexport let onClick;\\nimport QuantumMarks from './QuantumMarks.svelte';\\n$: squareClass = cMark\\n    ? 'square classical'\\n    : \`square\${isHighlighted ? ' rotating-dashed' : ''}\${isBeingCollapsed ? ' selected' : ''}\`;\\n$: marksClass = cMark ? 'marks adjustCenter' : 'marks';\\n<\/script>\\n\\n<div class={squareClass} on:click|preventDefault={(_) => onClick()}>\\n\\t<div>\\n\\t\\t<span class=\\"dashing\\"><i /></span>\\n\\t\\t<span class=\\"dashing\\"><i /></span>\\n\\t\\t<span class=\\"dashing\\"><i /></span>\\n\\t\\t<span class=\\"dashing\\"><i /></span>\\n\\t</div>\\n\\t<div class={marksClass}>\\n\\t\\t{#if cMark}\\n\\t\\t\\t{cMark[0]}<sub>{cMark[1]}</sub>\\n\\t\\t{:else}\\n\\t\\t\\t<QuantumMarks {isHighlighted} {isBeingCollapsed} {qMarks} {cycleMarks} />\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style lang=\\"scss\\">.marks {\\n  margin: 5px;\\n  margin-top: 5px;\\n}\\n\\n.adjustCenter {\\n  margin-top: 20px;\\n  margin-left: 30px;\\n}\\n\\n.square {\\n  background: #374046;\\n  border: 2px solid #999;\\n  float: left;\\n  font-size: 24px;\\n  font-weight: bold;\\n  line-height: 34px;\\n  height: 160px;\\n  width: 160px;\\n  margin-right: -1px;\\n  margin-top: -1px;\\n  border-color: #00bbd3;\\n  user-select: none;\\n}\\n\\n.classical {\\n  font-size: 60px;\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: center;\\n  align-items: center;\\n  color: #e0e0e0;\\n}\\n\\n.selected {\\n  color: #e74c3c;\\n}\\n\\n.rotating-dashed {\\n  position: relative;\\n  overflow: hidden;\\n  color: #00bbd3;\\n}\\n.rotating-dashed .dashing {\\n  display: block;\\n  width: 100%;\\n  height: 100%;\\n  position: absolute;\\n}\\n.rotating-dashed .dashing:nth-of-type(1) {\\n  transform: rotate(0deg);\\n}\\n.rotating-dashed .dashing:nth-of-type(2) {\\n  transform: rotate(90deg);\\n}\\n.rotating-dashed .dashing:nth-of-type(3) {\\n  transform: rotate(180deg);\\n}\\n.rotating-dashed .dashing:nth-of-type(4) {\\n  transform: rotate(270deg);\\n}\\n.rotating-dashed .dashing i {\\n  display: block;\\n  position: absolute;\\n  left: 0;\\n  top: 0;\\n  width: 200%;\\n  border-bottom: 5px dashed;\\n  animation: slideDash 2.5s infinite linear;\\n}\\n\\n@keyframes slideDash {\\n  from {\\n    transform: translateX(-50%);\\n  }\\n  to {\\n    transform: translateX(0%);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AA8BmB,MAAM,8BAAC,CAAC,AACzB,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,GAAG,AACjB,CAAC,AAED,aAAa,8BAAC,CAAC,AACb,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,OAAO,8BAAC,CAAC,AACP,UAAU,CAAE,OAAO,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,YAAY,CAAE,IAAI,CAClB,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,OAAO,CACrB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,UAAU,8BAAC,CAAC,AACV,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,SAAS,8BAAC,CAAC,AACT,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,gBAAgB,8BAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MAAM,CAChB,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,+BAAgB,CAAC,QAAQ,eAAC,CAAC,AACzB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,AACpB,CAAC,AACD,+BAAgB,CAAC,uBAAQ,aAAa,CAAC,CAAC,AAAC,CAAC,AACxC,SAAS,CAAE,OAAO,IAAI,CAAC,AACzB,CAAC,AACD,+BAAgB,CAAC,uBAAQ,aAAa,CAAC,CAAC,AAAC,CAAC,AACxC,SAAS,CAAE,OAAO,KAAK,CAAC,AAC1B,CAAC,AACD,+BAAgB,CAAC,uBAAQ,aAAa,CAAC,CAAC,AAAC,CAAC,AACxC,SAAS,CAAE,OAAO,MAAM,CAAC,AAC3B,CAAC,AACD,+BAAgB,CAAC,uBAAQ,aAAa,CAAC,CAAC,AAAC,CAAC,AACxC,SAAS,CAAE,OAAO,MAAM,CAAC,AAC3B,CAAC,AACD,+BAAgB,CAAC,QAAQ,CAAC,CAAC,eAAC,CAAC,AAC3B,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,GAAG,CAAC,MAAM,CACzB,SAAS,CAAE,wBAAS,CAAC,IAAI,CAAC,QAAQ,CAAC,MAAM,AAC3C,CAAC,AAED,WAAW,wBAAU,CAAC,AACpB,IAAI,AAAC,CAAC,AACJ,SAAS,CAAE,WAAW,IAAI,CAAC,AAC7B,CAAC,AACD,EAAE,AAAC,CAAC,AACF,SAAS,CAAE,WAAW,EAAE,CAAC,AAC3B,CAAC,AACH,CAAC"}`
};
var BoardSquare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let squareClass;
  let marksClass;
  let { cMark } = $$props;
  let { qMarks } = $$props;
  let { cycleMarks } = $$props;
  let { isHighlighted } = $$props;
  let { isBeingCollapsed } = $$props;
  let { onClick } = $$props;
  if ($$props.cMark === void 0 && $$bindings.cMark && cMark !== void 0)
    $$bindings.cMark(cMark);
  if ($$props.qMarks === void 0 && $$bindings.qMarks && qMarks !== void 0)
    $$bindings.qMarks(qMarks);
  if ($$props.cycleMarks === void 0 && $$bindings.cycleMarks && cycleMarks !== void 0)
    $$bindings.cycleMarks(cycleMarks);
  if ($$props.isHighlighted === void 0 && $$bindings.isHighlighted && isHighlighted !== void 0)
    $$bindings.isHighlighted(isHighlighted);
  if ($$props.isBeingCollapsed === void 0 && $$bindings.isBeingCollapsed && isBeingCollapsed !== void 0)
    $$bindings.isBeingCollapsed(isBeingCollapsed);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  $$result.css.add(css$4);
  squareClass = cMark ? "square classical" : `square${isHighlighted ? " rotating-dashed" : ""}${isBeingCollapsed ? " selected" : ""}`;
  marksClass = cMark ? "marks adjustCenter" : "marks";
  return `<div class="${escape2(null_to_empty(squareClass)) + " svelte-1xoo0gw"}"><div><span class="${"dashing svelte-1xoo0gw"}"><i class="${"svelte-1xoo0gw"}"></i></span>
		<span class="${"dashing svelte-1xoo0gw"}"><i class="${"svelte-1xoo0gw"}"></i></span>
		<span class="${"dashing svelte-1xoo0gw"}"><i class="${"svelte-1xoo0gw"}"></i></span>
		<span class="${"dashing svelte-1xoo0gw"}"><i class="${"svelte-1xoo0gw"}"></i></span></div>
	<div class="${escape2(null_to_empty(marksClass)) + " svelte-1xoo0gw"}">${cMark ? `${escape2(cMark[0])}<sub>${escape2(cMark[1])}</sub>` : `${validate_component(QuantumMarks, "QuantumMarks").$$render($$result, {
    isHighlighted,
    isBeingCollapsed,
    qMarks,
    cycleMarks
  }, {}, {})}`}</div>
</div>`;
});
var css$3 = {
  code: '.board-row.svelte-zounfu:after{clear:both;content:"";display:table}',
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script lang=\\"ts\\">import BoardSquare from './BoardSquare.svelte';\\n;\\nexport let cSquares;\\nexport let qSquares;\\nexport let cycleSquares;\\nexport let cycleMarks;\\nexport let collapseSquare;\\n// Passes index of square that was clicked up to Game.handleSquareClick.\\nexport let onSquareClick;\\nconst rows = [0, 1, 2];\\nconst columns = [0, 1, 2];\\n$: onClick = (row, column) => onSquareClick((row * 3 + column));\\n<\/script>\\n\\n<div>\\n\\t{#each rows as row}\\n\\t\\t<div class=\\"board-row\\">\\n\\t\\t\\t{#each columns as column}\\n\\t\\t\\t\\t<BoardSquare\\n\\t\\t\\t\\t\\tcMark={cSquares[row * 3 + column]}\\n\\t\\t\\t\\t\\tqMarks={qSquares[row * 3 + column]}\\n\\t\\t\\t\\t\\t{cycleMarks}\\n\\t\\t\\t\\t\\tisHighlighted={!!cycleSquares?.includes(row * 3 + column)}\\n\\t\\t\\t\\t\\tisBeingCollapsed={collapseSquare === row * 3 + column}\\n\\t\\t\\t\\t\\tonClick={() => onClick(row, column)}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t{/each}\\n</div>\\n\\n<style lang=\\"scss\\">.board-row:after {\\n  clear: both;\\n  content: \\"\\";\\n  display: table;\\n}</style>\\n"],"names":[],"mappings":"AA+BmB,wBAAU,MAAM,AAAC,CAAC,AACnC,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,AAChB,CAAC"}`
};
var GameBoard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let onClick;
  let { cSquares } = $$props;
  let { qSquares } = $$props;
  let { cycleSquares } = $$props;
  let { cycleMarks } = $$props;
  let { collapseSquare } = $$props;
  let { onSquareClick } = $$props;
  const rows = [0, 1, 2];
  const columns = [0, 1, 2];
  if ($$props.cSquares === void 0 && $$bindings.cSquares && cSquares !== void 0)
    $$bindings.cSquares(cSquares);
  if ($$props.qSquares === void 0 && $$bindings.qSquares && qSquares !== void 0)
    $$bindings.qSquares(qSquares);
  if ($$props.cycleSquares === void 0 && $$bindings.cycleSquares && cycleSquares !== void 0)
    $$bindings.cycleSquares(cycleSquares);
  if ($$props.cycleMarks === void 0 && $$bindings.cycleMarks && cycleMarks !== void 0)
    $$bindings.cycleMarks(cycleMarks);
  if ($$props.collapseSquare === void 0 && $$bindings.collapseSquare && collapseSquare !== void 0)
    $$bindings.collapseSquare(collapseSquare);
  if ($$props.onSquareClick === void 0 && $$bindings.onSquareClick && onSquareClick !== void 0)
    $$bindings.onSquareClick(onSquareClick);
  $$result.css.add(css$3);
  onClick = (row, column) => onSquareClick(row * 3 + column);
  return `<div>${each(rows, (row) => `<div class="${"board-row svelte-zounfu"}">${each(columns, (column) => `${validate_component(BoardSquare, "BoardSquare").$$render($$result, {
    cMark: cSquares[row * 3 + column],
    qMarks: qSquares[row * 3 + column],
    cycleMarks,
    isHighlighted: !!(cycleSquares == null ? void 0 : cycleSquares.includes(row * 3 + column)),
    isBeingCollapsed: collapseSquare === row * 3 + column,
    onClick: () => onClick(row, column)
  }, {}, {})}`)}
		</div>`)}
</div>`;
});
var css$2 = {
  code: ".collapseChoice.svelte-17iue0h{display:flex;flex-direction:row;justify-content:center;align-items:center;width:50px;height:50px;border:2px;border-color:#e74c3c;text-align:center;cursor:default;border-style:solid;margin:5px;user-select:none}.collapseChoice.svelte-17iue0h:hover{background-color:#e74c3c}.game-info.svelte-17iue0h{margin-left:20px;top:0px}.status.svelte-17iue0h{margin-bottom:10px;width:300px}",
  map: '{"version":3,"file":"SideBar.svelte","sources":["SideBar.svelte"],"sourcesContent":["<script lang=\\"ts\\">;\\n// Contains marks in selected square if collapse ongoing\\nexport let choices;\\n// Passes selected choice of mark up to Game.handleCollapse\\nexport let onChoiceClick;\\n// Conveys player information about the state of the game\\nexport let status;\\n<\/script>\\n\\n<div class=\\"game-info\\">\\n\\t<div class=\\"status\\">{status}</div>\\n\\t{#if choices}\\n\\t\\t{#each choices as choice (choice)}\\n\\t\\t\\t<div class=\\"collapseChoice\\" on:click|preventDefault={(_) => onChoiceClick(choice)}>\\n\\t\\t\\t\\t{choice}\\n\\t\\t\\t</div>\\n\\t\\t{/each}\\n\\t{/if}\\n</div>\\n\\n<style lang=\\"scss\\">.collapseChoice {\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: center;\\n  align-items: center;\\n  width: 50px;\\n  height: 50px;\\n  border: 2px;\\n  border-color: #e74c3c;\\n  text-align: center;\\n  cursor: default;\\n  border-style: solid;\\n  margin: 5px;\\n  user-select: none;\\n}\\n.collapseChoice:hover {\\n  background-color: #e74c3c;\\n}\\n\\n.game-info {\\n  margin-left: 20px;\\n  top: 0px;\\n}\\n\\n.status {\\n  margin-bottom: 10px;\\n  width: 300px;\\n}</style>\\n"],"names":[],"mappings":"AAoBmB,eAAe,eAAC,CAAC,AAClC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CACX,YAAY,CAAE,OAAO,CACrB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,OAAO,CACf,YAAY,CAAE,KAAK,CACnB,MAAM,CAAE,GAAG,CACX,WAAW,CAAE,IAAI,AACnB,CAAC,AACD,8BAAe,MAAM,AAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,UAAU,eAAC,CAAC,AACV,WAAW,CAAE,IAAI,CACjB,GAAG,CAAE,GAAG,AACV,CAAC,AAED,OAAO,eAAC,CAAC,AACP,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,AACd,CAAC"}'
};
var SideBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { choices } = $$props;
  let { onChoiceClick } = $$props;
  let { status } = $$props;
  if ($$props.choices === void 0 && $$bindings.choices && choices !== void 0)
    $$bindings.choices(choices);
  if ($$props.onChoiceClick === void 0 && $$bindings.onChoiceClick && onChoiceClick !== void 0)
    $$bindings.onChoiceClick(onChoiceClick);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  $$result.css.add(css$2);
  return `<div class="${"game-info svelte-17iue0h"}"><div class="${"status svelte-17iue0h"}">${escape2(status)}</div>
	${choices ? `${each(choices, (choice) => `<div class="${"collapseChoice svelte-17iue0h"}">${escape2(choice)}
			</div>`)}` : ``}
</div>`;
});
var Node = class {
  constructor(id) {
    this.id = id;
    this.edges = [];
  }
};
var Edge = class {
  constructor(node1, node2, key) {
    this.start = node1;
    this.end = node2;
    this.key = key;
  }
};
var Graph = class {
  constructor() {
    this.nodes = {};
    this.edges = {};
  }
  addNode(id) {
    this.nodes[id] = new Node(id);
  }
  getNode(id) {
    return this.nodes[id];
  }
  hasNode(id) {
    return id in this.nodes;
  }
  addEdge(id1, id2, key) {
    if (!(id1 in this.nodes))
      this.addNode(id1);
    if (!(id2 in this.nodes))
      this.addNode(id2);
    const edge = new Edge(this.getNode(id1), this.getNode(id2), key);
    const reverseEdge = new Edge(this.getNode(id2), this.getNode(id1), key);
    this.getNode(id1).edges.push(edge);
    this.getNode(id2).edges.push(reverseEdge);
    this.edges[key] = edge;
  }
  numNodes() {
    return Object.keys(this.nodes).length;
  }
  getCycle(startId) {
    var _a;
    if (this.numNodes() < 2)
      return null;
    const start = this.getNode(startId);
    const visited = new Set();
    const endToEdge = new Map();
    for (const edge of start.edges) {
      if (visited.has(edge.end)) {
        return [
          [edge.start.id, edge.end.id],
          [edge.key, (_a = endToEdge.get(edge.end)) == null ? void 0 : _a.key]
        ];
      }
      visited.add(edge.end);
      endToEdge.set(edge.end, edge);
    }
    const q = [start];
    const layers = new Map();
    const prev = new Map();
    layers.set(start, 0);
    prev.set(start, null);
    while (q !== void 0 && q.length > 0) {
      const curr = q.shift();
      const layer = layers.get(curr);
      for (const edge of curr.edges) {
        if (layers.has(edge.end)) {
          if (layers.get(edge.end) === layer - 1)
            continue;
          return this._constructPath(edge, prev);
        }
        q.push(edge.end);
        layers.set(edge.end, layer + 1);
        prev.set(edge.end, edge);
      }
    }
    return null;
  }
  _constructPath(edge, prev) {
    const cycleNodeIds = [];
    const cycleEdgeKeys = [edge.key];
    let currNode, currEdge;
    currNode = edge.start;
    while (prev.get(currNode)) {
      currEdge = prev.get(currNode);
      cycleNodeIds.push(currNode.id);
      cycleEdgeKeys.push(currEdge.key);
      currNode = currEdge.start;
    }
    cycleNodeIds.push(currNode.id);
    currNode = edge.end;
    while (prev.get(currNode)) {
      currEdge = prev.get(currNode);
      cycleNodeIds.unshift(currNode.id);
      cycleEdgeKeys.unshift(currEdge.key);
      currNode = currEdge.start;
    }
    return [cycleNodeIds, cycleEdgeKeys];
  }
};
var Game = class {
  constructor() {
    this.g = new Graph();
    this.timer = this.timer.bind(this);
    this.state = {
      cSquares: Array(9).fill(null),
      qSquares: Array(9).fill(null),
      turnNum: 1,
      subTurnNum: 0,
      cycleSquares: null,
      cycleMarks: null,
      collapseSquare: null,
      isGameOver: false,
      xTimeLeft: 60 * 5,
      yTimeLeft: 60 * 5,
      xScore: 0,
      yScore: 0
    };
  }
  setState(obj) {
    Object.assign(this.state, obj);
  }
  setStatus(msg) {
    this.setState({ status: msg });
  }
  whoseTurn() {
    return this.state.subTurnNum < 2 ? "X" : "Y";
  }
  notWhoseTurn() {
    return this.state.subTurnNum < 2 ? "Y" : "X";
  }
  timer() {
    if (this.whoseTurn() === "X") {
      if (this.state.xTimeLeft <= 0) {
        this.setState({
          isGameOver: true,
          status: "Player X has run out of time. Player Y wins!"
        });
      } else
        this.setState({ xTimeLeft: this.state.xTimeLeft - 1 });
    }
    if (this.whoseTurn() === "Y") {
      if (this.state.yTimeLeft <= 0) {
        this.setState({
          isGameOver: true,
          status: "Player Y has run out of time. Player X wins!"
        });
      } else
        this.setState({ yTimeLeft: this.state.yTimeLeft - 1 });
    }
  }
  handleSquareClick(i) {
    if (this.state.turnNum === 1 && this.state.subTurnNum === 0)
      setInterval(this.timer, 1e3);
    if (this.state.isGameOver)
      return {
        X: "This game is already over! Start a new game!!",
        Y: "This game is already over! Start a new game!!"
      };
    if (this.state.cycleSquares)
      return this._handleCyclicEntanglement(i);
    if (this.state.cSquares[i])
      return {
        [this.whoseTurn()]: "This square already has a classical mark! No more quantum marks can go here >:("
      };
    if (this.isSecondMove() && this.state.lastMove === i)
      return {
        [this.whoseTurn()]: "Can't move twice in the same square! \n What do you think this is... regular tic-tac-toe??"
      };
    return this.handleNormalMove(i);
  }
  handleNormalMove(i) {
    const qSquares = this.state.qSquares;
    const marker = `${this.whoseTurn()}${this.state.turnNum}`;
    if (qSquares[i])
      qSquares[i].push(marker);
    else
      qSquares[i] = [marker];
    if (!this.g.hasNode(i))
      this.g.addNode(i);
    if (this.isSecondMove())
      this.g.addEdge(this.state.lastMove, i, marker);
    const cycle = this.g.getCycle(i);
    this.setState({
      qSquares,
      cycleSquares: cycle == null ? void 0 : cycle[0],
      cycleMarks: cycle == null ? void 0 : cycle[1],
      turnNum: this.state.turnNum + Number(this.state.subTurnNum === 3),
      subTurnNum: (this.state.subTurnNum + 1) % 4,
      lastMove: i
    });
    if (cycle) {
      const msg = `A loop of entanglement has occurred! Player ${this.notWhoseTurn()} will decide which of the possible states the board will collapse into.`;
      return {
        [this.notWhoseTurn()]: `${msg} Click one of the squares involved in the loop.`,
        [this.whoseTurn()]: msg
      };
    }
    if (this.isSecondMove())
      return {
        [this.whoseTurn()]: "Now put a second quantum move. This move is entangled with your previous move. When there is a cycle of entanglement, a collapse will occur and only one of these quantum marks will turn into a classical mark.",
        [this.notWhoseTurn()]: `Player ${this.whoseTurn()}'s move.`
      };
    return {
      [this.whoseTurn()]: "Your turn! Put down a quantum move (these are the small marks).",
      [this.notWhoseTurn()]: `Now it's ${this.whoseTurn()}'s turn.`
    };
  }
  _handleCyclicEntanglement(i) {
    var _a;
    if (!((_a = this.state.cycleSquares) == null ? void 0 : _a.includes(i)))
      return {
        [this.whoseTurn()]: "Must pick square involved in cyclic entanglement! (is highlighted in blue)"
      };
    this.setState({ collapseSquare: i });
    return {
      [this.whoseTurn()]: "Now, choose below which state you want to occupy the selected square."
    };
  }
  handleCollapse(mark) {
    console.log(mark);
    const i = this.state.collapseSquare;
    const visited = new Set([mark]);
    this._handleCollapseHelper(mark, i, visited);
    const scores = calculateScores(this.state.cSquares);
    if (scores === null) {
      this.setState({
        cycleSquares: null,
        cycleMarks: null,
        collapseSquare: null
      });
      return {
        X: `${this.whoseTurn()} next!`,
        Y: `${this.whoseTurn()} next!`
      };
    }
    const status = {
      X: getWinnerMsg(scores),
      Y: getWinnerMsg(scores)
    };
    this.setState({
      status,
      isGameOver: true,
      xScore: this.state.xScore + scores.X,
      yScore: this.state.yScore + scores.Y,
      cycleSquares: null,
      cycleMarks: null,
      collapseSquare: null
    });
    return status;
  }
  _handleCollapseHelper(mark, i, visited) {
    const cSquares = this.state.cSquares;
    const qSquares = this.state.qSquares;
    cSquares[i] = mark;
    qSquares[i] = null;
    this.setState({
      cSquares,
      qSquares
    });
    for (const edge of this.g.getNode(i).edges) {
      if (!visited.has(edge.key)) {
        visited.add(edge.key);
        this._handleCollapseHelper(edge.key, edge.end.id, visited);
      }
    }
  }
  handleNotYourTurn() {
    return [this[this.notWhoseTurn()], "It's not your turn!"];
  }
  getPlayer(socketID) {
    if (this.X === socketID)
      return "X";
    if (this.Y === socketID)
      return "Y";
  }
  isTurn(id) {
    return this[this.whoseTurn()] === id;
  }
  isSecondMove() {
    return this.state.subTurnNum === 1 || this.state.subTurnNum === 3;
  }
};
function getWinnerMsg(scores) {
  const winner = scores.X > scores.Y ? "X" : "Y";
  const loser = winner === "X" ? "Y" : "X";
  if (scores.X + scores.Y === 1)
    return `${winner} wins!!! 
 ${winner} gets 1 point 
 ${loser} gets 0 points`;
  if (scores.X === 1.5 || scores.Y === 1.5)
    return `${winner} wins with a double three-in-a-row!!! 
 ${winner} gets 1.5 points 
 ${loser} gets 0 points`;
  if (scores.X + scores.Y === 1.5)
    return `Both players got three-in-a-row, but ${winner} got it first! (The mark placed in${winner}'s three-in-a-row has a smaller subscript than ${loser} 
 ${winner} gets 1 point 
 ${loser} gets 0.5 points`;
  return "No players get three-in-a-row...";
}
function _calculateWinners(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const winners = [];
  for (const line of lines) {
    const [s1, s2, s3] = [squares[line[0]], squares[line[1]], squares[line[2]]];
    if (s1 && s2 && s3 && s1[0] === s2[0] && s1[0] === s3[0]) {
      const subscripts = [s1[1], s2[1], s3[1]].map(Number);
      winners.push([Math.max(...subscripts), s1[0], line]);
    }
  }
  return winners;
}
function calculateScores(squares) {
  const winners = _calculateWinners(squares);
  if (winners.length === 0 && squares.filter((x) => !x).length > 1)
    return null;
  winners.sort();
  const scores = { X: 0, Y: 0 };
  if (winners.length >= 1)
    scores[winners[0][1]] = 1;
  else if (winners.length >= 2)
    scores[winners[1][1]] += 0.5;
  else if (winners.length === 3)
    scores[winners[2][1]] += 0.5;
  return scores;
}
var css$1 = {
  code: ".title.svelte-1hu7fe7{text-align:center}.game.svelte-1hu7fe7{display:flex;flex-direction:row;justify-content:center;margin-top:50px}.game-board.svelte-1hu7fe7{width:500px}.xScore.svelte-1hu7fe7{margin-top:10px;font-size:20px;float:left}.yScore.svelte-1hu7fe7{margin-top:10px;font-size:20px;float:right}",
  map: `{"version":3,"file":"OfflineApp.svelte","sources":["OfflineApp.svelte"],"sourcesContent":["<script lang=\\"ts\\">var _a;\\nimport GameBoard from '$lib/quantum-tictactoe/GameBoard/index.svelte';\\nimport SideBar from '$lib/quantum-tictactoe/SideBar.svelte';\\n;\\nimport Game from './Game';\\nconst game = new Game();\\ngame.setStatus(\\"Player X's turn!\\");\\nlet state = game.state;\\n$: status = state.status;\\n$: choices =\\n    state.collapseSquare !== null\\n        ? (_a = state.qSquares[state.collapseSquare]) === null || _a === void 0 ? void 0 : _a.filter((choice) => { var _a; return (_a = state.cycleMarks) === null || _a === void 0 ? void 0 : _a.includes(choice); })\\n        : undefined;\\nfunction handleSquareClick(i) {\\n    console.table(game);\\n    const statuses = game.handleSquareClick(i);\\n    const status = statuses[game.whoseTurn()];\\n    game.setStatus(status);\\n    state = Object.assign({}, game.state);\\n}\\nfunction handleCollapse(mark) {\\n    const statuses = game.handleCollapse(mark);\\n    const status = statuses[game.whoseTurn()];\\n    game.setStatus(status);\\n    state = Object.assign({}, game.state);\\n}\\n<\/script>\\n\\n<div>\\n\\t<h1 class=\\"title\\">Quantum Tic-Tac-Toe</h1>\\n\\t<div class=\\"game\\">\\n\\t\\t<div class=\\"game-board\\">\\n\\t\\t\\t<GameBoard\\n\\t\\t\\t\\tcSquares={state.cSquares}\\n\\t\\t\\t\\tqSquares={state.qSquares}\\n\\t\\t\\t\\tcycleSquares={state.cycleSquares}\\n\\t\\t\\t\\tcycleMarks={state.cycleMarks}\\n\\t\\t\\t\\tcollapseSquare={state.collapseSquare}\\n\\t\\t\\t\\tonSquareClick={handleSquareClick}\\n\\t\\t\\t/>\\n\\t\\t\\t<div class=\\"xScore\\">X: {state.xScore}</div>\\n\\t\\t\\t<div class=\\"yScore\\">Y: {state.yScore}</div>\\n\\t\\t</div>\\n\\t\\t<SideBar {status} {choices} onChoiceClick={handleCollapse} />\\n\\t</div>\\n</div>\\n\\n<style lang=\\"scss\\">.title {\\n  text-align: center;\\n}\\n\\n.game {\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: center;\\n  margin-top: 50px;\\n}\\n\\n.game-board {\\n  width: 500px;\\n}\\n\\n.xScore {\\n  margin-top: 10px;\\n  font-size: 20px;\\n  float: left;\\n}\\n\\n.yScore {\\n  margin-top: 10px;\\n  font-size: 20px;\\n  float: right;\\n}</style>\\n"],"names":[],"mappings":"AA+CmB,MAAM,eAAC,CAAC,AACzB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,KAAK,eAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,WAAW,eAAC,CAAC,AACX,KAAK,CAAE,KAAK,AACd,CAAC,AAED,OAAO,eAAC,CAAC,AACP,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,AACb,CAAC,AAED,OAAO,eAAC,CAAC,AACP,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,KAAK,AACd,CAAC"}`
};
var OfflineApp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let status;
  let choices;
  var _a;
  const game = new Game();
  game.setStatus("Player X's turn!");
  let state = game.state;
  function handleSquareClick(i) {
    console.table(game);
    const statuses = game.handleSquareClick(i);
    const status2 = statuses[game.whoseTurn()];
    game.setStatus(status2);
    state = Object.assign({}, game.state);
  }
  function handleCollapse(mark) {
    const statuses = game.handleCollapse(mark);
    const status2 = statuses[game.whoseTurn()];
    game.setStatus(status2);
    state = Object.assign({}, game.state);
  }
  $$result.css.add(css$1);
  status = state.status;
  choices = state.collapseSquare !== null ? (_a = state.qSquares[state.collapseSquare]) === null || _a === void 0 ? void 0 : _a.filter((choice) => {
    var _a2;
    return (_a2 = state.cycleMarks) === null || _a2 === void 0 ? void 0 : _a2.includes(choice);
  }) : void 0;
  return `<div><h1 class="${"title svelte-1hu7fe7"}">Quantum Tic-Tac-Toe</h1>
	<div class="${"game svelte-1hu7fe7"}"><div class="${"game-board svelte-1hu7fe7"}">${validate_component(GameBoard, "GameBoard").$$render($$result, {
    cSquares: state.cSquares,
    qSquares: state.qSquares,
    cycleSquares: state.cycleSquares,
    cycleMarks: state.cycleMarks,
    collapseSquare: state.collapseSquare,
    onSquareClick: handleSquareClick
  }, {}, {})}
			<div class="${"xScore svelte-1hu7fe7"}">X: ${escape2(state.xScore)}</div>
			<div class="${"yScore svelte-1hu7fe7"}">Y: ${escape2(state.yScore)}</div></div>
		${validate_component(SideBar, "SideBar").$$render($$result, {
    status,
    choices,
    onChoiceClick: handleCollapse
  }, {}, {})}</div>
</div>`;
});
var css = {
  code: ".overlay.svelte-nqqnsd{position:absolute;left:50%;top:50%}.withinOverlay.svelte-nqqnsd{position:relative;left:-50%;margin-top:-25%}.board.svelte-nqqnsd{position:relative;margin-top:-40%}",
  map: `{"version":3,"file":"human.svelte","sources":["human.svelte"],"sourcesContent":["<script lang=\\"ts\\">import OfflineApp from '$lib/quantum-tictactoe/OfflineApp.svelte';\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>\\n</svelte:head>\\n\\n<div class=\\"container\\">\\n\\t<!-- <ReactDipper styleParams={{ backgroundColor: 'none !important' }} /> -->\\n\\n\\t<div class=\\"overlay\\">\\n\\t\\t<div class=\\"withinOverlay\\">\\n\\t\\t\\t<div class=\\"board\\"><OfflineApp /></div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style lang=\\"scss\\">.overlay {\\n  position: absolute;\\n  left: 50%;\\n  top: 50%;\\n}\\n\\n.withinOverlay {\\n  position: relative;\\n  left: -50%;\\n  margin-top: -25%;\\n}\\n\\n.board {\\n  position: relative;\\n  margin-top: -40%;\\n}</style>\\n"],"names":[],"mappings":"AAiBmB,QAAQ,cAAC,CAAC,AAC3B,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,GAAG,CAAE,GAAG,AACV,CAAC,AAED,cAAc,cAAC,CAAC,AACd,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,AAClB,CAAC"}`
};
var Human = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>`, ""}`, ""}

<div class="${"container"}">

	<div class="${"overlay svelte-nqqnsd"}"><div class="${"withinOverlay svelte-nqqnsd"}"><div class="${"board svelte-nqqnsd"}">${validate_component(OfflineApp, "OfflineApp").$$render($$result, {}, {}, {})}</div></div></div>
</div>`;
});
var human = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Human
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
