const toString = dataCookie => {
    let t = '';
    for (let x = 0, l = dataCookie.length; x < l; ++x) {
        t += ((t !== '') ? "; " : '') + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
}

const toObject = cookie => {
    let t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (let x = 0, l = cookie.length; x < l; ++x) {
        cookie[x] = cookie[x].split('; ');
        j = cookie[x][0].split('=');
        t = { key: j[0], value: j[1] };
        for (let i = 1, j = cookie[x].length; i < j; ++i) {
            j = cookie[x][i].split('=');
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }
    return cookie;
}

const toInline = cookie => toString(
    toObject(cookie)
)

export default {
    toString,
    toObject,
    toInline
}