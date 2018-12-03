//how to detect if a user typed a word
//track the words they typed in v
//if at any moment there  is a letter and a space in the v
  //the user typed a word
  //clear the v
//keep listening

/**
 * @param string[] internal keypress buffer
 */

const wordListener = (_buffer) => {
  if (_buffer.length > 1 && _buffer.includes(' ')) {
    //reset buffer
    //reset countdown
    return true
  } else {
    return false
  }
}