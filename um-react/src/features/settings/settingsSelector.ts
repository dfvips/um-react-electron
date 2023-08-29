import { parseKuwoHeader } from '~/crypto/parseKuwo';
import type { RootState } from '~/store';
import { closestByLevenshtein } from '~/util/levenshtein';
import { hasOwn } from '~/util/objects';
import { kwm2StagingToProductionKey } from './keyFormats';

export const selectIsSettingsNotSaved = (state: RootState) => state.settings.dirty;

export const selectStagingQMCv2Settings = (state: RootState) => state.settings.staging.qmc2;
export const selectFinalQMCv2Settings = (state: RootState) => state.settings.production.qmc2;

export const selectStagingKWMv2Keys = (state: RootState) => state.settings.staging.kwm2.keys;
export const selectFinalKWMv2Keys = (state: RootState) => state.settings.production.kwm2.keys;

export const selectQMCv2KeyByFileName = (state: RootState, name: string): string | undefined => {
  const normalizedName = name.normalize();

  let ekey: string | undefined;
  const { keys, allowFuzzyNameSearch } = selectFinalQMCv2Settings(state);
  if (hasOwn(keys, normalizedName)) {
    ekey = keys[normalizedName];
  } else if (allowFuzzyNameSearch) {
    const qmc2KeyStoreNames = Object.keys(keys);
    if (qmc2KeyStoreNames.length > 0) {
      const closestName = closestByLevenshtein(normalizedName, qmc2KeyStoreNames);
      console.debug('qmc2: key db could not find %o, using closest %o instead.', normalizedName, closestName);
      ekey = keys[closestName];
    }
  }

  return ekey;
};

export const selectKWMv2Key = (state: RootState, headerView: DataView): string | undefined => {
  const hdr = parseKuwoHeader(headerView);
  if (!hdr) {
    return;
  }

  const keys = selectFinalKWMv2Keys(state);
  const lookupKey = kwm2StagingToProductionKey({ id: '', ekey: '', quality: hdr.quality, rid: hdr.rid });

  let ekey: string | undefined;
  if (hasOwn(keys, lookupKey)) {
    ekey = keys[lookupKey];
  }

  return ekey;
};
