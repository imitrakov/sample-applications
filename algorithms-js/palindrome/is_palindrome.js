function isPalindrome(x) {
    if(x < 0 || (x % 10 === 0  && x !== 0)) {
        return false;
    }
    
    const str = String(x)
    
    let startIndex = 0;
    let endIndex = str.length - 1 ;
    while(startIndex < endIndex) {
        if(str[startIndex] !== str[endIndex]) return false;
        
        startIndex++;
        endIndex--;
    }
    
    return true;
    
    
};
