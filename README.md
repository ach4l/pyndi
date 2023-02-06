
![Pyndi](https://i.postimg.cc/52w5dqk0/pyndi-logo.png)

Web interface : [Pyndi Web App](https://pyndi.netlify.app)

Join Discord : [Invitation](https://discord.gg/tSH8f2vufQ)

The aim of this project is to help new learners to **learn coding in Hindi**. It helps beginners learn coding by simplyfying the language as well as syntax barriers. Since we provide **live translation to python code**, we hope users will learn python quickly as well. It is essentially a wrapper over python which lets users code in 'hindi' and in future other regional languages.

This repository contain both the web interface as well as the 'compiler' code which essentially translates pyndi to python.

For now, this readme serves as documentation.

### Important Files
- Web-interface/index.html - The single page application
- pyndi_effic.py - All the translation and syntax simplification happen here
- automatic_tester.py - Any modification to pyndi effic can be tested by running them on test files and see if none of the output changes

### Features of Web Interface
- Pyndi Editor online (mobile friendly)
- Live Translation to Python Code

### Features of Pyndi
- Flexible Hindi Vocabulary (tolerant to certain spelling variations)
- case-insensitive
- Flexible and tolerant syntax
- Helpful error messages in Hindi

### Future Developments
- Gamified tutorial for learning
- More functions and libraries of python in Hindi
- Shift web interface to pyscript(?)
- Generate code for other languages apart from python like C, Java etc.
- Make similar project for other languages like spanish, french, regional Indian languages

### Tech Stack
- Web-interface - HTML, tailwindcss, javascript, jquery
- Backend - python, flask


## Understanding pyndi_effic.py

This is the main backend file which handles conversion from pyndi code to python as well as the exectuion. It is called _effic because it is 'efficient' compared to earlier version. We are essentially processing the pyndi code line by line. That is why we can do live translation to python code in the web interface.

pyndi_effic.py consists of 3 functions : 
- string_replacement - This function is to help ensure user entered strings stay immutable. it removes all strings and replaces them with a string-identifier. At the right end, we stick back all the user entered strings back in the code.
- translate keywords - This function does all the translation. In few cases the order of translation is important like for if-else. We provide multiple spelling options to the user as there is no fixed spelling convention for hindi in english script.
- for_and_dec_op_syntax_simpli - This function does a lot of the heavy lifting. It helps parse different lines of the code as well as simplify syntax.

Here's the psuedocode for the three functions (As on 6 Feb 2023)

### string_replacement

**Input** - Raw Pyndi code

**Output** - Pyndi code with string's replaced by codes, list of strings replaced (string_list)

string_list <- Find all strings between "" or ''  
counter <- 0  
for string in string_list:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in Raw Pyndi code, replace string by str_<counter>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;increase counter by 1  
return Pyndi code with string removed, string_list  
    



The user can write a code in "pyndi" like the given test_script.pnd. This is then "compiled" by pyndi.py and converted to python code.

The error messages are also in Hindi to make it more understandable for the user.

Still under development phase.






Pre-processing steps:
1. Removed all the blank lines from the pyndi code

Minor semantics:
1. user may write agar or agr, not going to make a difference, nahin/nhi/nahi; jbtk/jabtk/jbtak all interpreted identically.

Semantics:

1. Keywords: if, elif, else, while, print, for

2. Vocabulary
 

"if" :=  "agar"/"agr"/"yadi"/"ydi"

"elif":= "nahi to agar"

"else":= "nahi to"

"print":="likh"/"bol"/"dikha"

"while":= "jabtak"/"jbtk"/"jabtk"/"jbtak"
"for":= "hr"

For any re-assignment operations, 

(i) the variable to be re-assigned should be the first string in a line;
(ii) the third string should be either a variable or a number (added, subtracted, multiplied, divided) to be used for re-assignment operations.


Example:" a ko 3 se guna " (a=a*3); "a  se 1 km krdo (ghtao)" (a=a-1); "a ko 3 se bhdaao" (a=a+3)
