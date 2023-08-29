import type { Parakeet } from '@jixun/libparakeet';
import { SEED, ENC_V2_KEY_1, ENC_V2_KEY_2 } from '../crypto/qmc/qmc_v2.key';

export const makeQMCv2KeyCrypto = (p: Parakeet) => p.make.QMCv2KeyCrypto(SEED, ENC_V2_KEY_1, ENC_V2_KEY_2);
