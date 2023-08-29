import { CryptoFactory } from './CryptoBase';

import { QMC1Crypto } from './qmc/qmc_v1';
import { QMC2Crypto, QMC2CryptoWithKey } from './qmc/qmc_v2';
import { XiamiCrypto } from './xiami/xiami';
import { KGMCrypto } from './kgm/kgm_pc';
import { NCMCrypto } from './ncm/ncm_pc';
import { XimalayaAndroidCrypto } from './xmly/xmly_android';
import { KWMCrypto } from './kwm/kwm';
import { MiguCrypto } from './migu/migu3d_keyless';
import { TransparentCrypto } from './transparent/transparent';

export const allCryptoFactories: CryptoFactory[] = [
  // Xiami (*.xm)
  XiamiCrypto.make,

  // QMCv2 (*.mflac)
  QMC2CryptoWithKey.make,
  QMC2Crypto.make,

  // NCM (*.ncm)
  NCMCrypto.make,

  // KGM (*.kgm, *.vpr)
  KGMCrypto.make,

  // KWMv1 (*.kwm)
  KWMCrypto.make,

  // Migu3D/Keyless (*.wav; *.m4a)
  MiguCrypto.make,

  // Crypto that does not implement "checkBySignature" or need to decrypt the entire file and then check audio type,
  //   should be moved to the bottom of the list for performance reasons.

  // QMCv1 (*.qmcflac)
  QMC1Crypto.make,

  // Ximalaya (Android)
  XimalayaAndroidCrypto.makeX2M,
  XimalayaAndroidCrypto.makeX3M,

  // Transparent crypto (not encrypted)
  TransparentCrypto.make,
];
