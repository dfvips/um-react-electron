export const toArrayBuffer = async (src: Blob | ArrayBuffer) => (src instanceof Blob ? await src.arrayBuffer() : src);
export const toBlob = (src: Blob | ArrayBuffer) => (src instanceof Blob ? src : new Blob([src]));
