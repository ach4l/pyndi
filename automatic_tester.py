import os
from difflib import Differ
 
# Get the list of all files and directories
path = "test_files"
dir_list = os.listdir(path)
 
print("Files and directories in '", path, "' :")
 

list_of_diff_found = []
for file in dir_list:
    if file.endswith(".pnd"):
        print(file)
        os.system("python pyndi.py test_files/" + file)
        filename_prefix = file.split(".")[0]
        file_correct = "test_files/" + filename_prefix + "_correct_output.txt"
        file_to_check = "test_files/" + filename_prefix + "_output.txt"
        diff_found = 0
        with open(file_correct) as file_1, open(file_to_check) as file_2:
            differ = Differ()
            line_counter = 1     
            for line in differ.compare(file_1.readlines(), file_2.readlines()):
                line_counter = line_counter + 1
                if line[0] == "+" or line[0] == "-":
                    diff_found = 1
                    message_to_return = "Diff found in : " + file + "\n" + "Line Differing : " + line + "Line Number : " + str(line_counter) 
                    list_of_diff_found.append(message_to_return)
                    print("@@@@@@@@@@@@ FOUND A DIFF @@@@@@@@@@@@@@@@")
                    print(line)
                        
print(list_of_diff_found)
            
                    




def add(a, b):
    return a + b


def test_add():
    assert add(2, 3) == 5
    assert add('space', 'ship') == 'spaceship'


def subtract(a, b):
    return a + b  # <--- fix this in step 7


# uncomment the following test in step 5
#def test_subtract():
#    assert subtract(2, 3) == -1