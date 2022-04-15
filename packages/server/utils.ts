const characters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2',
  '3', '4', '5', '6', '7', '8', '9', '-', '_'
];

export const generateId = (length: number): string => {
  for(let i = characters.length - 1; i > 0; i--) {
    var j = (Math.floor(Math.random() * (i + 1)));
    
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  return characters.slice(0, length).join("")
}
