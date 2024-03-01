import { v4 } from 'uuid';

export const generateShortId = () => {
  const sheetName = v4();
  return getShortUUID(sheetName);
}

const getShortUUID = (uuid) => {
  if (uuid.length !== 36) {
    return '';
  }
  let short = '';
  const chars = ['a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z'];
  const str = uuid.replace(/\-/g, '');
  for (let i = 0; i < 8; i++) {
    const ary = str.substring(i * 4, i * 4 + 4);
    const char = chars[parseInt(ary, 16) % 0x3E];
    short = short.concat(`${char}`);
  }
  return short;
};