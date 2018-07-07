
export function getRedirectTo({type, avatar}) {
  let url = (type === 'boss')?'/boss':'/genius';
  if(!avatar){
    url = url + 'info'
  }
  return url;
}