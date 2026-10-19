import { describe, expect, it, vi } from 'vitest';
import { readBoundedRequestBody, RequestBodyTooLargeError } from './bounded-request-body';

function makeRequest(body: ReadableStream<Uint8Array> | null, contentLength?: string) {
  const headers = new Headers();
  if (contentLength) headers.set('content-length', contentLength);
  return { headers, body } as unknown as Request;
}

describe('readBoundedRequestBody', () => {
  it('reads a body within the limit when no Content-Length is present', async () => {
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('valid'));
        controller.close();
      },
    });

    const result = await readBoundedRequestBody(makeRequest(body), 16);

    expect(result.toString('utf8')).toBe('valid');
  });

  it('rejects a declared oversized body before opening its stream', async () => {
    const body = new ReadableStream<Uint8Array>({ start() {} });

    await expect(readBoundedRequestBody(makeRequest(body, '17'), 16)).rejects.toBeInstanceOf(RequestBodyTooLargeError);
    expect(body.locked).toBe(false);
  });

  it('cancels an oversized streamed body without Content-Length', async () => {
    const cancel = vi.fn();
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        controller.enqueue(new Uint8Array(17));
      },
      cancel,
    });

    await expect(readBoundedRequestBody(makeRequest(body), 16)).rejects.toBeInstanceOf(RequestBodyTooLargeError);
    expect(cancel).toHaveBeenCalledTimes(1);
  });
});
