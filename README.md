# gddirecturl
Google drive public link to direct downloadable media url (Video only)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mnsrulz/gddirecturl/blob/master/LICENSE)
[![CI](https://github.com/mnsrulz/gddirecturl/actions/workflows/main.yml/badge.svg)](https://github.com/mnsrulz/gddirecturl/actions/workflows/main.yml)
[![npm latest package](https://img.shields.io/npm/v/gddirecturl/latest.svg)](https://www.npmjs.com/package/gddirecturl)
[![npm downloads](https://img.shields.io/npm/dm/gddirecturl.svg)](https://www.npmjs.com/package/gddirecturl)
[![github forks](https://img.shields.io/github/forks/mnsrulz/gddirecturl.svg)](https://github.com/mnsrulz/gddirecturl/network/members)
[![github stars](https://img.shields.io/github/stars/mnsrulz/gddirecturl.svg)](https://github.com/mnsrulz/gddirecturl/stargazers)


**Installation**

```
npm install gddirecturl
```

**Usage:**

```
var output = await gddirect.getMediaLink(gdriveid);

/*Output==>
{
    "src": "https://doc-0o-1c-docs.googleusercontent.com/docs/securesc/XXXXXXXXXXXXXXXX?e=download",
    "thumbnail": "https://lh3.googleusercontent.com/XXXXXXXXXXXXXXXXXXXXXXXc=w320"
}
*/
```

**Testing**
```
npm run test
```

## Related

- [nurlresolver](https://github.com/mnsrulz/nurlresolver) - An extensive url resolver includes many in built resolvers

