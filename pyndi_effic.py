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



#removing blank lines from the pyndi file before-hand
with open(filename) as reader, open(filename, 'r+') as writer:
  for line in reader:
    if line.strip():
      writer.write(line)
  writer.truncate()



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
    code_python = code_python.replace("bdhao","bdhaao")
    code_python = code_python.replace("bdha","bdhaao")
    code_python = code_python.replace("jodo","bdhaao")
    code_python = code_python.replace("ghtao","ghtaao")
    code_python = code_python.replace("ghtao","ghtaao")
    code_python = code_python.replace("kam kro","ghtaao")
    code_python = code_python.replace("kam krdo","ghtaao")
    code_python = code_python.replace("km kro","ghtaao")
    code_python = code_python.replace("km krdo","ghtaao")
    code_python = code_python.replace("bhag","bhaag")
    code_python = code_python.replace("bhiwajit","bhaag")
    code_python = code_python.replace("bhiwajan","bhaag")
    code_python = code_python.replace("bhiwajn","bhaag")

    # print statement
    code_python = code_python.replace("likh","print")
    code_python = code_python.replace("likho","print")
    code_python = code_python.replace("bol","print")
    code_python = code_python.replace("dikha","print")
    code_python = code_python.replace("dikhao","print")
    code_python = code_python.replace("dikhaao","print")

    # if else conditions
    code_python = code_python.replace("nahin to agar","elif")
    code_python = code_python.replace("agar","if")
    code_python = code_python.replace("yadi","if")
    code_python = code_python.replace("nahin to","else")

    #while loop
    code_python = code_python.replace("jbtk","while")
    return code_python

code_python = translate_keywords(code_pyndi)




#making_efficient_by_performing_splitting_only_once

def for_and_dec_op_syntax_simpli(code_python):
    """
    this function takes 'translated' pyndi code and processes for loop
    hr (har) is the keyword used to know that the for loop begins there
    currently only works for numbers
    need to generalise it for all for loop 
    then deciphers the operations and operands present in all the lines
    finally some syntax simplification stuff
    """     
    
    code_python_list=code_python.splitlines()                                          # extracting_lines
    line_list=[]                                                                        #collect lines in line_list
    
    #line-wise processing starts here
    
    for line in code_python_list:
        
        #### handling if statement----starts
        
        if 'hr' in line:                                                            #seeking if it has 'hr'; if so it has to be 'if' statement
            word_list=line.strip().split(' ')                                       #splitting line
            hr_index=word_list.index('hr')                                          #where is 'hr'?
            var=word_list[hr_index+1]
            low_limit=word_list[0]                                                  #extracting the lower_limit of variable
            upp_limit=word_list[3]                                                  #extracting the upper_limit of variable
            line='for '+var+' in range('+ low_limit + ','+upp_limit+ '):'           #rephrasing line as a standard python code
       #### handling if statement----ends
            
        ####deciphering operations and operands-----starts
        first_word = line.strip().split(" ")[0]                                     #extracting first string in line    
    
    
    
           ### if these three conditions are not met, we assume that the line contains statement for updating a variable
    
        if (first_word not in keyword_list):                                        ## (1) first word is not a keyword
            if ('=' not in line):                                                   ## (2) no assignment/comparison present
                if "print" not in line:                                             ##(3) no print statement
                    # Need number of spaces to keep track of indentation
                    # currently only works when indentation is done using tab
                    number_of_spaces = len(line) - len(line.lstrip())               #indentation thing
                    ## var is the variable and r_var is the number by which it needs to be updated by
                    ## assuming semantic-rule is followed (specified in readme)
                    r_var=line.strip().split(" ")[2]                                #extracting r_var                     
                    var=first_word                                                  #extracting var
                    # updation can be of four types, add subtract multiply or divide                
                    if 'bdhaao'in line:                                             #addition
                        line = var + '=' + var + '+' + r_var                        #rephrasing line as a standard python code
                    elif 'ghtaao'in line:                                           #subtraction
                        line = var + '=' + var + '-' + r_var                        #rephrasing line as a standard python code          
                    elif 'guna'in line:                                             #multiplication
                        line = var + '=' + var + '*' + r_var                        #rephrasing line as a standard python code
                    elif 'bhag' in line or 'bhaag' in line:                         #divison
                        if (r_var=="0"):                                                                        
                            print("maaf kijiye, 0 se bhaag nhi krste")              #divison by zero error
                            line = var + '=' + var + '/' + r_var                   #rephrasing line as a standard python code
                        else:
                            line = var + '=' + var + '/' + r_var                   #rephrasing line as a standard python code
                    else:
                        print(line + " ko is trh se likh bhai: a ko 1 se bdhaa do") #if user does not follow semantic-rule
                    line =  ' '*number_of_spaces*6+line                             #indentation thing
        ####deciphering operations and operands-----ends
        
        
                    
        ####handling minor syntax things in if statement---starts
        
        ###(based on the observation that only comparison operator should follow if/elif statements)  
          
        if 'if' in line:                                                    
            # comparison operator two different ways      
            if ("barabar h" in line):
                line=line.replace("barabar h",'==')
            if  line.count('=')==1:
                line=line.replace("=","==")
                
        ### Removing the need for colon in if, for and while statements
        if 'for' in line or 'while' in line or 'if' in line or 'elif' in line or 'else' in line:
            if line.count(':')==0:
                line=line+':'
                
       ####handling minor syntax things in if statement---ends
       
        line_list.append(line)                                                  #appending the modified line to line_list
    code_python = "\n".join(line_list)                                          #code in python!!!
    return code_python

code_python = for_and_dec_op_syntax_simpli(code_python)




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
