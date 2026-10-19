export class RequestBodyTooLargeError extends RangeError {
  constructor() {
    super('Request body too large');
    this.name = 'RequestBodyTooLargeError';
  }
}

export async function readBoundedRequestBody(request: Request, maxBytes: number): Promise<Buffer> {
  const contentLengthHeader = request.headers.get('content-length');
  const contentLength = contentLengthHeader === null ? Number.NaN : Number(contentLengthHeader);
  if (Number.isFinite(contentLength) && contentLength > maxBytes) throw new RequestBodyTooLargeError();
  if (!request.body) return Buffer.alloc(0);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        try { await reader.cancel(); } catch { /* Preserve the size error if the stream cannot cancel. */ }
        throw new RequestBodyTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)), total);
}
