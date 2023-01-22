# -*- coding: utf-8 -*-
"""
Created on Sun Jan 22 10:43:51 2023

@author: avinash.kumar
"""

import sys
import time
# reading filename from the system arguments coming from command line
n = len(sys.argv)
print("Total arguments passed:", n)
print("First argument :",sys.argv[0])
print("Filename :",sys.argv[1])
#filename = input("Enter filename")
filename = sys.argv[1]

# opening and reading the user's pyndi file
text_file = open(filename, "r") 
#read whole file to a string
code_pyndi = text_file.read() 
#close file
text_file.close()
#print("Pyndi Code")
#print(code_pyndi)

keyword_list=['if','elif','else:','while','print'];

# All the translation happens here
# print statement
code_python = code_pyndi.replace("likh","print")
code_python = code_python.replace("bol","print")
code_python = code_python.replace("dikha","print")

# if conditions
code_python = code_python.replace("nahin to agar","elif")
code_python = code_python.replace("agar","if")
code_python = code_python.replace("agr","if")
code_python = code_python.replace("ydi","if")
code_python = code_python.replace("yadi","if")
code_python = code_python.replace("nahin to","else")

#while loop
code_python = code_python.replace("jbtk","while")

 
#line-segmentation-while
code_python_lines=code_python.splitlines()
line_list_while = []
for line in code_python_lines:

    first_word = line.strip().split(" ")[0]
    
    if (first_word not in keyword_list):
        if ('=' not in line):
            if "print" not in line:
                number_of_spaces = len(line) - len(line.lstrip())
                len(line) - len(line.lstrip())
                print("@@@@@@@@@@@@@@@@@@")
                print(number_of_spaces)
                print(line)
                print(first_word)
                print("@@@@@@@@@@@@@@@@@@")
                third_word=line.strip().split(" ")[2]
                print('jfoiwhi')
            
                var=first_word
                print(var)
                r_var=third_word
                print(r_var)
                
                
                
                if 'bdhaao'in line or 'bdhao' in line or 'bdha' in line or 'jodo' in line:
                    line = var + '=' + var + '+' + r_var
                elif 'ghtao'in line or 'ghtaao' in line or 'kam kro' in line or 'km kro' in line:
                    line = var + '=' + var + '-' + r_var
                elif 'guna'in line:
                    line = var + '=' + var + '*' + r_var
                elif 'bhag' in line or 'bhaag' in line:
                    if r_var ==0:
                        print("0 se bhaag nhi krste")
                    else:
                        line = var + '=' + var + '/' + r_var
                else:
                    print("is trh se likh bhai: a ko 1 se bdhaa do")
                line =  ' '*number_of_spaces*6+line
    line_list_while.append(line)

                    
       
code_python = "\n".join(line_list_while)            
        
        




# comparison operators






#line-segmentation for colon, ==, for if and while

code_python_lines=code_python.splitlines()
print(code_python_lines)
line_list = []

for line in code_python_lines:
    if 'if' in line:
        print("******************************************")
        print(line)
        if ("barabar h" in line):
            line=line.replace("barabar h",'==')
        if line.count(':')==0:
            line=line+':'
        if  line.count('=')==1:
            line=line.replace("=","==")
    line_list.append(line)
 

code_python_corrected = "\n".join(line_list)



# for loop

# Final Python code
print("Python Code")
print(code_python_corrected)

# Saving the python code in a .py file just in case the user wants it
filename_py = filename.split(".")[0] + ".py"
py_file = open(filename_py, "w")
n = py_file.write(code_python)
py_file.close()


# Executing the translated python code
print("RESULT!")
try:
    exec(code_python_corrected)
# Catching the errors as exceptions. Need to translate the errors. 
except Exception as e:
    print("ERROR")
    print(e)
    print("ERROR LINE")
    traceback.print_exc()