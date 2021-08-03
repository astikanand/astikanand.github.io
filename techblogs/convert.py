import re

new = 'https://raw.githubusercontent.com/astikanand/techblogs/master/1_data_structures/assets/'

with open("./1_data_structures/10_graph.md", "r") as main_file:
    with open("test.txt", "w+") as test_file:
        for line in main_file.readlines():
            if("<img" in line):
                whitespace = len(line) - len(line.lstrip())
                src = re.search('src="(.+?)"', line).group(1)
                width= 100
                try:
                    width = re.search('width="(.+?)%"', line).group(1)
                except:
                    pass
                title = src.split('/')[-1].split('.')[0] + '__' + str(width) + '.'

                line = " "*whitespace + "![" + title + "](" + src + ")\n"
            
            line = line.replace('assets/', new)

            if not ('class="prev-button"' in line or 'class="next-button"' in line):
                test_file.write(line)  
