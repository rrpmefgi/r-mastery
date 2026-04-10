export const VARIABLES_DATA_TYPES_DATA = {
  variables: [
    {
      id: 'var-variable',
      name: 'Variable',
      definition: 'A variable is a reserved memory location to store values. In R, variables are used to store data that can be manipulated and referenced throughout your code.',
      explanation: 'Variables are created using the assignment operator `<-` or `=`. They act as containers for data values.\n\nSyntax:\n`variable_name <- value` or `variable_name = value`',
      firstLevel: {
        code: 'x <- 10\nprint(x)',
        output: '[1] 10',
        explanation: 'In this simple example, we assign the numeric value 10 to a variable named `x`. When we print `x`, it displays the stored value.'
      },
      secondLevel: {
        code: '# Multiple assignment and calculation\na <- 5\nb <- 10\nresult <- (a * b) / 2\nprint(result)',
        output: '[1] 25',
        explanation: 'Here, we use multiple variables (`a` and `b`) to perform a mathematical operation. The result of the calculation is stored in a third variable named `result`.'
      }
    },
    {
      id: 'var-object',
      name: 'Object',
      definition: 'In R, everything is an object. An object is a data structure that has some values and attributes.',
      explanation: 'Objects are the basic building blocks of R. When you create a variable, you are actually creating an object in the R environment.\n\nSyntax:\n`object_name <- data_structure(values)`',
      firstLevel: {
        code: 'my_obj <- "Hello R"\nclass(my_obj)',
        output: '[1] "character"',
        explanation: 'We create a simple character object. The `class()` function tells us what kind of object it is.'
      },
      secondLevel: {
        code: '# Creating a complex object (list)\nstudent <- list(name="John", age=21, grades=c(85, 90, 78))\nprint(student)',
        output: '$name\n[1] "John"\n\n$age\n[1] 21\n\n$grades\n[1] 85 90 78',
        explanation: 'This creates a list object named `student` which contains different types of data (string, number, and a vector). Objects can store very complex information.'
      }
    },
    {
      id: 'var-identifier',
      name: 'Identifier',
      definition: 'An identifier is a name used to identify a variable, function, class, module, or other object.',
      explanation: 'Identifiers must start with a letter or a dot (not followed by a number). They can contain letters, numbers, dots, and underscores.\n\nSyntax:\n`valid_name <- value` (e.g., `my_data`, `.hidden_var`, `data2`)',
      firstLevel: {
        code: 'user_age <- 25\nprint(user_age)',
        output: '[1] 25',
        explanation: '`user_age` is a valid identifier. It uses an underscore to separate words, which is a common practice in R.'
      },
      secondLevel: {
        code: 'total.sales_2023 <- 5000\nprint(total.sales_2023)',
        output: '[1] 5000',
        explanation: 'This identifier `total.sales_2023` uses both dots and underscores. While valid, it\'s usually better to stick to one style (like snake_case) for consistency.'
      }
    }
  ],
  dataTypes: [
    {
      id: 'dt-numeric',
      name: 'Numeric',
      definition: 'Numeric is the default computational data type in R. it handles all real numbers, with or without decimal points.',
      explanation: 'Any number you type in R is treated as numeric unless specified otherwise.\n\nSyntax:\n`x <- 10.5` or `y <- 10`',
      firstLevel: {
        code: 'num <- 42.5\nclass(num)',
        output: '[1] "numeric"',
        explanation: 'A simple decimal number is automatically assigned the numeric data type.'
      },
      secondLevel: {
        code: 'a <- 10\nb <- 3\nresult <- a / b\nprint(result)\nclass(result)',
        output: '[1] 3.333333\n[1] "numeric"',
        explanation: 'Calculations involving integers often result in numeric values with decimals. R handles high-precision floating point numbers automatically.'
      }
    },
    {
      id: 'dt-integer',
      name: 'Integer',
      definition: 'Integers are whole numbers without decimal points. In R, you must explicitly specify a number as an integer.',
      explanation: 'To create an integer, you add a capital `L` suffix to the number.\n\nSyntax:\n`x <- 10L`',
      firstLevel: {
        code: 'int_val <- 5L\nclass(int_val)',
        output: '[1] "integer"',
        explanation: 'By adding `L`, we tell R to store this specifically as an integer rather than a numeric (double).'
      },
      secondLevel: {
        code: 'x <- as.integer(10.7)\nprint(x)\nclass(x)',
        output: '[1] 10\n[1] "integer"',
        explanation: 'We can use the `as.integer()` function to convert a numeric value to an integer. Note how it truncates the decimal part (10.7 becomes 10).'
      }
    },
    {
      id: 'dt-character',
      name: 'Character',
      definition: 'Character data type is used to store text or strings.',
      explanation: 'Strings are wrapped in either single (`\'`) or double (`"`) quotes.\n\nSyntax:\n`name <- "John Doe"`',
      firstLevel: {
        code: 'msg <- "Hello World"\nclass(msg)',
        output: '[1] "character"',
        explanation: 'A simple text string is stored as a character type.'
      },
      secondLevel: {
        code: 'first <- "Data"\nlast <- "Science"\nfull <- paste(first, last)\nprint(full)',
        output: '[1] "Data Science"',
        explanation: 'We can manipulate character data using functions like `paste()`, which combines multiple strings into one.'
      }
    },
    {
      id: 'dt-logical',
      name: 'Logical',
      definition: 'Logical data type represents boolean values: TRUE or FALSE.',
      explanation: 'Logical values are often the result of comparisons.\n\nSyntax:\n`is_valid <- TRUE` or `is_valid <- FALSE` (or `T` and `F`)',
      firstLevel: {
        code: 'check <- 10 > 5\nprint(check)\nclass(check)',
        output: '[1] TRUE\n[1] "logical"',
        explanation: 'Comparing two numbers results in a logical value (TRUE in this case).'
      },
      secondLevel: {
        code: 'x <- 10\ny <- 20\nresult <- (x < y) & (y == 20)\nprint(result)',
        output: '[1] TRUE',
        explanation: 'We can combine multiple logical comparisons using operators like `&` (AND) and `|` (OR).'
      }
    },
    {
      id: 'dt-complex',
      name: 'Complex',
      definition: 'Complex data type is used to represent numbers with an imaginary part.',
      explanation: 'Complex numbers are written in the form `a + bi` where `i` is the imaginary unit.\n\nSyntax:\n`z <- 3 + 2i`',
      firstLevel: {
        code: 'z <- 1 + 4i\nclass(z)',
        output: '[1] "complex"',
        explanation: 'R has built-in support for complex numbers using the `i` suffix.'
      },
      secondLevel: {
        code: 'z1 <- 2 + 3i\nz2 <- 1 - 2i\nprint(z1 * z2)',
        output: '[1] 8 - 1i',
        explanation: 'R can perform standard arithmetic on complex numbers, following the rules of complex algebra.'
      }
    },
    {
      id: 'dt-raw',
      name: 'Raw',
      definition: 'Raw data type is used to store a sequence of bytes.',
      explanation: 'Raw objects are used to hold binary data. They are not commonly used in basic data analysis but are important for low-level operations.\n\nSyntax:\n`r <- charToRaw("Hello")`',
      firstLevel: {
        code: 'r <- charToRaw("A")\nprint(r)\nclass(r)',
        output: '[1] 41\n[1] "raw"',
        explanation: 'The character "A" is converted to its hexadecimal byte value (41).'
      },
      secondLevel: {
        code: 'bytes <- as.raw(c(0x48, 0x65, 0x6c, 0x6c, 0x6f))\nprint(bytes)\nrawToChar(bytes)',
        output: '[1] 48 65 6c 6c 6f\n[1] "Hello"',
        explanation: 'We can create raw vectors from hexadecimal values and convert them back to characters.'
      }
    }
  ],
  dataStructures: [
    {
      id: 'ds-vector',
      name: 'Vector',
      definition: 'A vector is the most basic data structure in R. It is a sequence of data elements of the same basic type.',
      explanation: 'Vectors are created using the `c()` function (combine).\n\nSyntax:\n`v <- c(1, 2, 3)`',
      firstLevel: {
        code: 'fruits <- c("apple", "banana", "orange")\nprint(fruits)',
        output: '[1] "apple"  "banana" "orange"',
        explanation: 'A character vector storing three fruit names.'
      },
      secondLevel: {
        code: '# Vector arithmetic and filtering\nnums <- c(1, 5, 8, 12, 15)\nlarge_nums <- nums[nums > 10]\nprint(large_nums)',
        output: '[1] 12 15',
        explanation: 'R supports vectorized operations. Here we filter the vector to find all elements greater than 10.'
      }
    },
    {
      id: 'ds-list',
      name: 'List',
      definition: 'A list is a generic vector containing other objects of different types.',
      explanation: 'Unlike vectors, lists can store elements of different data types (numbers, strings, vectors, or even other lists).\n\nSyntax:\n`my_list <- list(val1, val2, ...)`',
      firstLevel: {
        code: 'my_list <- list(10, "R", TRUE)\nprint(my_list)',
        output: '[[1]]\n[1] 10\n\n[[2]]\n[1] "R"\n\n[[3]]\n[1] TRUE',
        explanation: 'A simple list containing a numeric, a character, and a logical value.'
      },
      secondLevel: {
        code: '# Named list with nested vector\nprofile <- list(name="Alice", scores=c(90, 85, 88))\nprint(profile$scores)',
        output: '[1] 90 85 88',
        explanation: 'Lists can have named elements, making it easy to access specific data using the `$` operator.'
      }
    },
    {
      id: 'ds-matrix',
      name: 'Matrix',
      definition: 'A matrix is a two-dimensional rectangular data set. It can be created using a vector input to the matrix function.',
      explanation: 'All elements in a matrix must be of the same data type.\n\nSyntax:\n`m <- matrix(vector, nrow, ncol)`',
      firstLevel: {
        code: 'm <- matrix(1:6, nrow=2, ncol=3)\nprint(m)',
        output: '     [,1] [,2] [,3]\n[1,]    1    3    5\n[2,]    2    4    6',
        explanation: 'Creates a 2x3 matrix using numbers from 1 to 6. By default, matrices are filled column-wise.'
      },
      secondLevel: {
        code: '# Matrix with row and column names\nm <- matrix(1:4, nrow=2)\nrownames(m) <- c("R1", "R2")\ncolnames(m) <- c("C1", "C2")\nprint(m)',
        output: '   C1 C2\nR1  1  3\nR2  2  4',
        explanation: 'We can add descriptive names to the rows and columns of a matrix for better readability.'
      }
    },
    {
      id: 'ds-array',
      name: 'Array',
      definition: 'Arrays are multi-dimensional data structures. While matrices are 2D, arrays can have any number of dimensions.',
      explanation: 'Like matrices, all elements in an array must be of the same type.\n\nSyntax:\n`a <- array(vector, dim=c(rows, cols, layers))`',
      firstLevel: {
        code: 'a <- array(1:12, dim=c(2, 3, 2))\nprint(a)',
        output: ', , 1\n\n     [,1] [,2] [,3]\n[1,]    1    3    5\n[2,]    2    4    6\n\n, , 2\n\n     [,1] [,2] [,3]\n[1,]    7    9   11\n[2,]    8   10   12',
        explanation: 'This creates a 3D array consisting of two 2x3 matrices.'
      },
      secondLevel: {
        code: '# Accessing specific elements in 3D array\na <- array(1:8, dim=c(2,2,2))\n# Get element at row 1, col 2, layer 2\nprint(a[1, 2, 2])',
        output: '[1] 7',
        explanation: 'We use indexing to access specific values. `a[1, 2, 2]` targets the first row and second column of the second layer.'
      }
    },
    {
      id: 'ds-dataframe',
      name: 'Data Frame',
      definition: 'A data frame is a table or a two-dimensional array-like structure in which each column contains values of one variable and each row contains one set of values from each column.',
      explanation: 'Columns can have different data types, but all columns must have the same length.\n\nSyntax:\n`df <- data.frame(col1, col2, ...)`',
      firstLevel: {
        code: 'df <- data.frame(ID=1:2, Name=c("A", "B"))\nprint(df)',
        output: '  ID Name\n1  1    A\n2  2    B',
        explanation: 'A basic data frame with two columns of different types (integer and character).'
      },
      secondLevel: {
        code: '# Creating and filtering a data frame\nstudents <- data.frame(\n  name = c("Alex", "Bob", "Cathy"),\n  age = c(20, 22, 21),\n  passed = c(T, F, T)\n)\n# Get students older than 20\nprint(students[students$age > 20, ])',
        output: '  name age passed\n2  Bob  22  FALSE',
        explanation: 'Data frames are the standard for storing datasets in R. We can easily filter rows based on conditions.'
      }
    },
    {
      id: 'ds-factor',
      name: 'Factor',
      definition: 'Factors are used to categorize data and store it as levels. They are useful for columns with a limited number of unique values (categorical data).',
      explanation: 'Factors are created from vectors using the `factor()` function.\n\nSyntax:\n`f <- factor(vector)`',
      firstLevel: {
        code: 'gender <- factor(c("male", "female", "male"))\nprint(gender)',
        output: '[1] male   female male  \nLevels: female male',
        explanation: 'The vector is converted to a factor, and R automatically identifies the unique categories (Levels).'
      },
      secondLevel: {
        code: '# Factor with custom levels and order\nsizes <- factor(c("M", "S", "L", "M"), \n                levels=c("S", "M", "L"), \n                ordered=TRUE)\nprint(sizes)\nprint(min(sizes))',
        output: '[1] M S L M\nLevels: S < M < L\n[1] S',
        explanation: 'Ordinal data (data with a natural order) can be represented using ordered factors. This allows R to understand that "S" is less than "M".'
      }
    }
  ]
};
