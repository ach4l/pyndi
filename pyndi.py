# -*- coding: utf-8 -*-
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

keyword_list=['if','elif','else:','while','print','for']

def translate_keywords(code_pyndi):



    # All the translation happens here




     #minor_translations_(similar_words_into_one_convention)
    #maybe a better idea is to use arrays to handle them
    code_python = code_pyndi.replace("jabtk","jbtk")
    code_python = code_python.replace("jbtak","jbtk")
    code_python = code_python.replace("jabtak","jbtk")
    code_python = code_python.replace("agr","agar")
    code_python = code_python.replace("nhi to","nahin to")
    code_python = code_python.replace("nhin to","nahin to")
    code_python = code_python.replace("nahi to","nahin to")
    code_python = code_python.replace("naahi to","nahin to")
    code_python = code_python.replace("ydi","yadi")
    code_python = code_python.replace("har","hr")
    code_python = code_python.replace("lekar","lekr")
    # print statement
    code_python = code_python.replace("likh","print")
    code_python = code_python.replace("bol","print")
    code_python = code_python.replace("dikha","print")

    # if else conditions
    code_python = code_python.replace("nahin to agar","elif")
    code_python = code_python.replace("agar","if")
    code_python = code_python.replace("yadi","if")
    code_python = code_python.replace("nahin to","else")

    #while loop
    code_python = code_python.replace("jbtk","while")
    return code_python

code_python = translate_keywords(code_pyndi)

# for_loop_numbers

def for_numbers_translate(code_python):
    """
    this function takes 'translated' pyndi code and processes for loop
    hr (har) is the keyword used to know that the for loop begins there
    currently only works for numbers
    need to generalise it for all for loop    
    """     
    code_python_list=code_python.splitlines()
    line_list_for=[]
    for line in code_python_list:
        if 'hr' in line:
            word_list=line.strip().split(' ')
            hr_index=word_list.index('hr')
            var=word_list[hr_index+1]
            low_limit=word_list[0]
            upp_limit=word_list[3]
            line='for '+var+' in range('+ low_limit + ','+upp_limit+ '):'        
        line_list_for.append(line) 
    code_python = "\n".join(line_list_for) 
    return code_python
code_python = for_numbers_translate(code_python)

def while_translate(code_python):
    #line-segmentation-while
    code_python_lines=code_python.splitlines()
    line_list_while = []
    for line in code_python_lines:
        first_word = line.strip().split(" ")[0]    
        # if these three conditions are not met, we assume that the line contains updating a variable
        if (first_word not in keyword_list):
            if ('=' not in line):
                if "print" not in line:
                    # Need number of spaces to keep track of indentation
                    # currently only works when indentation is done using tab
                    number_of_spaces = len(line) - len(line.lstrip())
                    # var is the variable and r_var is the number it needs to be updated by            
                    r_var=line.strip().split(" ")[2]                            
                    var=first_word
                    # reassignment can be of four types, add subtract multiply or divide                
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
                        print(line + " ko is trh se likh bhai: a ko 1 se bdhaa do")
                    line =  ' '*number_of_spaces*6+line
        line_list_while.append(line)       
    code_python = "\n".join(line_list_while)
    return code_python

code_python = while_translate(code_python)

def syntax_simplifier(code_python):
    # simplyfying comparison operators == is not very intuitive
    code_python_lines=code_python.splitlines()
    line_list = []
    for line in code_python_lines:
        if 'if' in line:
            # comparison operator two different ways      
            if ("barabar h" in line):
                line=line.replace("barabar h",'==')
            if  line.count('=')==1:
                line=line.replace("=","==")
        # Removing the need for colon in if for and while statements
        if 'for' in line or 'while' in line or 'if' in line:
            if line.count(':')==0:
                line=line+':'
        line_list.append(line)
	  
    code_python = "\n".join(line_list)
    return(code_python)

code_python = syntax_simplifier(code_python)
# Final Python code
print("Final Python Code")
print(code_python)

# Saving the python code in a .py file just in case the user wants it
filename_py = filename.split(".")[0] + ".py"
py_file = open(filename_py, "w")
n = py_file.write(code_python)
py_file.close()

# Executing the translated python code
print("Code chalane pe ye mila")
try:
    exec(code_python)
# Catching the errors as exceptions. Need to translate the errors. 
except Exception as e:    
    error_message = traceback.format_exc()
    print("Kuch to Gadbad hai...")
    error_message = error_message.replace("Traceback (most recent call last)","Aapke code mein yahan galti hai")
    error_message = error_message.replace('File "<string>", ',"")
    error_message = error_message.replace('if',"agar")
    error_message_list = error_message.splitlines(True)
    print(error_message)