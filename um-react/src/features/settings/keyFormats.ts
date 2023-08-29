import { nanoid } from 'nanoid';
import { objectify } from 'radash';

export function productionKeyToStaging<S, P extends Record<string, unknown>>(
  src: P,
  make: (k: keyof P, v: P[keyof P]) => null | S
): S[] {
  const result: S[] = [];
  for (const [key, value] of Object.entries(src)) {
    const item = make(key, value as P[keyof P]);
    if (item) {
      result.push(item);
    }
  }
  return result;
}
export function stagingKeyToProduction<S, P>(src: S[], toKey: (s: S) => keyof P, toValue: (s: S) => P[keyof P]): P {
  return objectify(src, toKey, toValue) as P;
}

// QMCv2 (QQ)
export interface StagingQMCv2Key {
  id: string;
  name: string;
  ekey: string;
}

export type ProductionQMCv2Keys = Record<string /* filename */, string /* ekey */>;

export const qmc2StagingToProductionKey = (key: StagingQMCv2Key) => key.name.normalize();
export const qmc2StagingToProductionValue = (key: StagingQMCv2Key) => key.ekey.trim();
export const qmc2ProductionToStaging = (
  key: keyof ProductionQMCv2Keys,
  value: ProductionQMCv2Keys[keyof ProductionQMCv2Keys]
): StagingQMCv2Key => {
  return {
    id: nanoid(),
    name: key.normalize(),
    ekey: value.trim(),
  };
};

// KWMv2 (KuWo)

export interface StagingKWMv2Key {
  id: string;
  rid: string;
  quality: string;
  ekey: string;
}

export type ProductionKWMv2Keys = Record<string /* `${rid}-${quality}` */, string /* ekey */>;

export const parseKwm2ProductionKey = (key: string): null | { rid: string; quality: string } => {
  const m = key.match(/^(\d+)-(\w+)$/);
  if (!m) return null;
  const [_, rid, quality] = m;

  return { rid, quality };
};
export const kwm2StagingToProductionKey = (key: StagingKWMv2Key) => `${key.rid}-${key.quality}`;
export const kwm2StagingToProductionValue = (key: StagingKWMv2Key) => key.ekey;
export const kwm2ProductionToStaging = (
  key: keyof ProductionKWMv2Keys,
  value: ProductionKWMv2Keys[keyof ProductionKWMv2Keys]
): null | StagingKWMv2Key => {
  if (typeof value !== 'string') return null;

  const parsed = parseKwm2ProductionKey(key);
  if (!parsed) return null;

  return { id: nanoid(), rid: parsed.rid, quality: parsed.quality, ekey: value };
};
