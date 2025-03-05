function animateTitle() {
  const baseText = "i love you";
  let position = 0;
  
  setInterval(() => {
    const chars = baseText.split('');
    
    // Find next non-space position
    while (baseText[position] === ' ') {
      position = (position + 1) % baseText.length;
    }
    
    chars[position] = chars[position].toUpperCase();
    
    // Find previous non-space position
    let prevPosition = position;
    do {
      prevPosition = prevPosition === 0 ? chars.length - 1 : prevPosition - 1;
    } while (baseText[prevPosition] === ' ');
    
    chars[prevPosition] = chars[prevPosition].toLowerCase();
    
    // Update title
    document.title = `♥️ ${chars.join('')} ♥️`;
    
    // Move to next position
    position = (position + 1) % baseText.length;
  }, 500); // Change letter every 500ms
}

export { animateTitle };