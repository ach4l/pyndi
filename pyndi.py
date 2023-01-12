import sys
 
# reading filename from the system arguments coming from command line
n = len(sys.argv)
print("Total arguments passed:", n)
print("Filename :",sys.argv[1])
filename = sys.argv[1]

# opening and reading the user's pyndi file
text_file = open(filename, "r") 
#read whole file to a string
code_pyndi = text_file.read() 
#close file
text_file.close()
print("Pyndi Code")
print(code_pyndi)

# All the translation happens here
# print statement
code_python = code_pyndi.replace("likh","print")
# if conditions
code_python = code_python.replace("nahin to agar","elif")
code_python = code_python.replace("agar","if")
code_python = code_python.replace("nahin to","else")
# for loop

# Final Python code
print("Python Code")
print(code_python)

# Saving the python code in a .py file just in case the user wants it
filename_py = filename.split(".")[0] + ".py"
py_file = open(filename_py, "w")
n = py_file.write(code_python)
py_file.close()


# Executing the translated python code
print("RESULT!")
try:
    exec(code_python)
# Catching the errors as exceptions. Need to translate the errors. 
except Exception as e:
    print("ERROR")
    print(e)
    print("ERROR LINE")
    traceback.print_exc()




