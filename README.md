# spdx-license-identifiers

The package exports an array of strings. Each string is the [Software Package Data Exchange (SPDX)](https://spdx.org) identifier for a license, according to the SPDX [license list](https://spdx.org/licenses/).

## Building

`npm run build` generates package JSON files and updates the `version` property of `package.json`.

## History

This package was created from scratch as a replacement for [spdx-license-ids](https://npmjs.com/package/spdx-license-ids) in August of 2020, to incorporate many new license identifiers in recent releases of the SPDX license list.  The maintainer of spdx-license-ids, [@shinnn](https://github.com/shinnn), served the JavaScript community for years by updating that package for new versions of the SPDX license list.

## Licensing

### Software Package Data eXchange

"SPDX" is a federally registered United States trademark of The Linux Foundation Corporation.  This package is not a product of, or in any way endorsed by, The Linux Foundation.

From version 2.2 of the SPDX specification:

> Copyright © 2010-2020 Linux Foundation and its Contributors. This work is licensed under the Creative Commons Attribution License 3.0 Unported (CC-BY-3.0) reproduced in its entirety in Appendix VII herein. All other rights are expressly reserved.

### This Package

This package is created by downloading and processing the machine-readable JSON version of SPDX' license list from spdx.org, a purely mechanical and routine exercise involving no creativity whatever.  As a result, the package maintainer's believe that none of the data files included in the distribution tarballs of this package come under copyright.

Copyrights in any other content, such as the build script and this `README.md` file, is dedicated to the public domain under [Creative Commons' CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).
