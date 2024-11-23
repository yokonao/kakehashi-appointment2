export function normalizeNumber(str: string):string {
  // return str.replace(/[０-９]/g, function (s) {
  //   return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  // });
  return str
    .split("")
    .map((e) => {
      if (/[０-９]/.test(e)) {
        return String.fromCharCode(e.charCodeAt(0) - 65248);
      } else {
        return String.fromCharCode(e.charCodeAt(0));
      }
    })
    .join("");
}
