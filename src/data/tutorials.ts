import { Tutorial } from '../types';

export const tutorials: Tutorial[] = [
  {
    id: 'intro-to-r',
    title: 'Introduction to R',
    description: 'Get started with the basics of R programming and its environment.',
    category: 'R Programming Setup & Syntax',
    content: `
# Welcome to R Programming

R is a powerful language and environment for statistical computing and graphics. It is widely used by statisticians and data miners for developing statistical software and data analysis.

## Why R?
- **Open Source**: Free to use and contribute.
- **Data Visualization**: Exceptional tools like \`ggplot2\`.
- **Large Community**: Thousands of packages available on CRAN.

## Your First R Code
In R, you can use it as a simple calculator:
\`\`\`r
# Addition
2 + 2

# Assignment
x <- 10
y <- 5
z <- x + y
print(z)
\`\`\`

## Getting Help
You can get help on any function by typing \`?function_name\`:
\`\`\`r
?print
?sum
\`\`\`
`
  },
  {
    id: 'intro-to-data',
    title: 'Introduction to Data',
    description: 'Understand the nature, types, and characteristics of data in R.',
    category: 'R Programming Setup & Syntax',
    content: `
# Introduction to Data

Before diving into R code, it is essential to understand the "raw material" we work with: **Data**.

## Nature of Data
Data can be broadly classified into two categories:
1.  **Qualitative (Categorical)**: Describes qualities or characteristics (e.g., Color, Gender, Name).
2.  **Quantitative (Numerical)**: Describes quantities that can be measured (e.g., Height, Temperature, Price).

## Types of Data (Measurement Scales)
- **Nominal**: Categories without a natural order (e.g., Eye color).
- **Ordinal**: Categories with a specific order (e.g., Low, Medium, High).
- **Interval**: Numeric scales where the difference between values is meaningful (e.g., Celsius temperature).
- **Ratio**: Numeric scales with a true zero point (e.g., Weight, Income).

## Characteristics of Good Data
- **Accuracy**: Correctness of the values.
- **Completeness**: No missing critical information.
- **Consistency**: Data follows the same format throughout.

---

## Example 1: Qualitative Data in R
In R, we often represent qualitative data using **Factors**.
\`\`\`r
# Creating a vector of eye colors (Nominal Data)
eye_colors <- factor(c("Blue", "Green", "Brown", "Blue", "Brown"))

# Display the data and its levels
print(eye_colors)
levels(eye_colors)
\`\`\`

## Example 2: Quantitative Data in R
Numerical data is stored as **Numeric** or **Integer** vectors.
\`\`\`r
# Creating a vector of heights in cm (Ratio Data)
heights <- c(170.5, 165.2, 180.0, 155.8)

# Calculate basic statistics
mean_height <- mean(heights)
max_height <- max(heights)

cat("Average Height:", mean_height, "cm\\n")
cat("Tallest Person:", max_height, "cm\\n")
\`\`\`
`
  },
  {
    id: 'installation',
    title: 'Installation: R & RStudio',
    description: 'Step-by-step guide to setting up your R development environment.',
    category: 'R Programming Setup & Syntax',
    content: `
# Setting Up Your R Environment

To start programming, you need two main components: the **R Language** (the engine) and **RStudio** (the dashboard).

## Step 1: Install R
1.  Go to [CRAN (The Comprehensive R Archive Network)](https://cran.r-project.org/).
2.  Choose "Download R for Windows/macOS/Linux".
3.  Download and run the installer for the latest version.

## Step 2: Install RStudio
1.  Go to [Posit (formerly RStudio)](https://posit.co/download/rstudio-desktop/).
2.  Download the free "RStudio Desktop" version.
3.  Install it like any other application.

## Why RStudio?
RStudio is an **IDE (Integrated Development Environment)**. It makes writing R code easier by providing a text editor, a console, a workspace viewer, and a plot window all in one place.

---

## Example 1: Verifying Your Installation
Once installed, open RStudio and type this in the console to check your version:
\`\`\`r
# Check R version details
version

# Simple test calculation
print("R is successfully installed!")
2 + 2 == 4
\`\`\`

## Example 2: Installing Your First Package
Packages are collections of functions that extend R's capabilities.
\`\`\`r
# Install the 'fortunes' package (contains R wisdom)
# install.packages("fortunes") 

# Load and use the package
library(fortunes)
fortune() # Displays a random quote from the R community
\`\`\`
`
  },
  {
    id: 'r-environment',
    title: 'The R Environment',
    description: 'Master workspace management, console commands, and file execution.',
    category: 'R Programming Setup & Syntax',
    content: `
# Navigating the R Environment

Mastering the environment helps you keep your work organized and your memory clean.

## Workspace Management
The **Workspace** is your current R working environment and includes any user-defined objects (vectors, matrices, functions, data frames).

- **ls()**: List all objects in your current workspace.
- **rm(x)**: Remove object 'x' from the workspace.
- **rm(list = ls())**: Clear your entire workspace (use with caution!).

## Console Commands
- **Ctrl + L**: Clears the console screen (visual cleanup only).
- **Esc**: Interrupts a running command.

## Working Directory
The **Working Directory** is the folder on your computer where R looks for files to read and where it saves files.
- **getwd()**: Find out where you are currently working.
- **setwd("path/to/folder")**: Change your working directory.

---

## Example 1: Managing Your Workspace
\`\`\`r
# Create some variables
apple <- 5
banana <- 10
cherry <- 15

# List all variables
ls()

# Remove one variable
rm(apple)

# Check list again
ls()
\`\`\`

## Example 2: Executing R Files
You can save your R code in a \`.R\` file and run the whole thing at once.
\`\`\`r
# Assume you have a file named "my_script.R"
# You can execute it using the source() function:

# source("my_script.R")

# You can also print the current working directory
current_dir <- getwd()
print(paste("I am currently working in:", current_dir))
\`\`\`
`
  },
  {
    id: 'r-syntax-basics',
    title: 'R Syntax & Scope',
    description: 'Learn basic commands, variable assignment, and understanding scope.',
    category: 'R Programming Setup & Syntax',
    content: `
# R Syntax and Variable Scope

R has a specific "grammar" that you must follow for the computer to understand your instructions.

## Basic Syntax Rules
1.  **Case Sensitivity**: \`MyVar\` and \`myvar\` are different variables.
2.  **Comments**: Use \`#\` to write notes that the computer ignores.
3.  **Assignment**: Use \`<- \` (preferred) or \`=\` to assign values to variables.
4.  **Commands**: Commands are separated by a new line or a semicolon \`;\`.

## Understanding Scope
**Scope** refers to where a variable is accessible within your code.
- **Global Scope**: Variables defined in the main workspace are accessible everywhere.
- **Local Scope**: Variables defined inside a function are only accessible within that function.

---

## Example 1: Basic Commands and Assignment
\`\`\`r
# This is a comment
x <- 100  # Assign 100 to x
y <- 200  # Assign 200 to y

# A simple command on one line
sum_val <- x + y; print(sum_val)

# Case sensitivity check
Name <- "Alice"
name <- "Bob"
print(Name) # Prints "Alice"
print(name) # Prints "Bob"
\`\`\`

## Example 2: Demonstrating Scope
\`\`\`r
# Global variable
global_var <- "I am global"

my_function <- function() {
  # Local variable
  local_var <- "I am local"
  print(global_var) # Can see global
  print(local_var)  # Can see local
}

my_function()

# This will work
print(global_var)

# This will cause an error because local_var doesn't exist here
# print(local_var) 
\`\`\`
`
  },
  {
    id: 'building-blocks',
    title: 'Building Blocks of R',
    description: 'Explore keywords, operators, and primitive data types.',
    category: 'R Programming Setup & Syntax',
    content: `
# The Building Blocks of R

Every R program is built from three core components: Keywords, Operators, and Data Types.

## 1. Keywords
Keywords are reserved words that have special meaning in R. You cannot use them as variable names.
- **Control Flow**: \`if\`, \`else\`, \`repeat\`, \`while\`, \`for\`, \`in\`, \`next\`, \`break\`.
- **Functions**: \`function\`, \`return\`.
- **Constants**: \`TRUE\`, \`FALSE\`, \`NULL\`, \`Inf\`, \`NaN\`, \`NA\`.

## 2. Operators
Operators are symbols used to perform operations on data.
- **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`^\` (exponent), \`%%\` (modulus).
- **Relational**: \`==\`, \`!=\`, \`< \`, \`> \`, \`<= \`, \`>= \`.
- **Logical**: \`&\` (AND), \`|\` (OR), \`!\` (NOT).

## 3. Primitive Data Types
R has 6 basic "atomic" types:
1.  **Logical**: \`TRUE\`, \`FALSE\`
2.  **Numeric**: \`12.3\`, \`5\`
3.  **Integer**: \`2L\` (The 'L' tells R it's a whole number)
4.  **Complex**: \`3 + 2i\`
5.  **Character**: \`"a"\`, \`"hello"\`
6.  **Raw**: Used to store bytes (rarely used by beginners)

---

## Example 1: Using Operators
\`\`\`r
a <- 10
b <- 3

# Arithmetic
cat("10 divided by 3 is", a / b, "\\n")
cat("The remainder of 10/3 is", a %% b, "\\n")

# Relational and Logical
is_greater <- a > b
is_even <- (a %% 2 == 0)

print(is_greater & is_even) # TRUE AND TRUE = TRUE
\`\`\`

## Example 2: Checking Primitive Types
Use the \`typeof()\` function to see the internal type of an object.
\`\`\`r
# Logical
typeof(TRUE)

# Numeric (Double precision)
typeof(3.14)

# Integer
typeof(5L)

# Character
typeof("R Programming")
\`\`\`
`
  },
  {
    id: 'data-types',
    title: 'Variables & Data Types',
    description: 'Learn about numeric, character, logical, and factor types in R.',
    category: 'R Programming Setup & Syntax',
    content: `
# Variables and Data Types

R has several basic data types that you'll use constantly.

## Basic Types
1. **Numeric**: Decimal values (e.g., \`10.5\`, \`5\`)
2. **Integer**: Whole numbers (e.g., \`1L\`)
3. **Character**: Text strings (e.g., \`"Hello R"\`)
4. **Logical**: Boolean values (\`TRUE\` or \`FALSE\`)

## Examples
\`\`\`r
my_numeric <- 42.5
my_character <- "R is fun"
my_logical <- TRUE

# Check the type
class(my_numeric)
class(my_character)
\`\`\`

## Factors
Factors are used to represent categorical data.
\`\`\`r
gender <- factor(c("male", "female", "female", "male"))
levels(gender)
\`\`\`
`
  },
  {
    id: 'input-output',
    title: 'Input & Output',
    description: 'Interactive user input and formatted output functions.',
    category: 'Logic & Data Structures',
    content: `
# Input and Output in R

## Interactive User Input
The primary function for capturing user input from the console is \`readline()\`.

\`\`\`r
# Example 1: Basic Input
name <- readline(prompt = "Enter your name: ")
cat("Hello,", name, "\\n")

# Example 2: Numeric Input (needs conversion)
age_input <- readline(prompt = "Enter your age: ")
age <- as.numeric(age_input)
cat("Next year you will be", age + 1, "\\n")
\`\`\`

## Formatted Output Functions
R provides several ways to display information.

### 1. print()
Best for quick checks; handles new lines automatically.
\`\`\`r
print("Hello World")
\`\`\`

### 2. cat()
Best for clean reports; allows mixing text and variables. Requires \`\\n\` for new lines.
\`\`\`r
cat("The value of pi is approximately", 3.14, "\\n")
\`\`\`

### 3. sprintf()
Best for precise formatting (e.g., decimal places).
\`\`\`r
# Format to 2 decimal places
val <- 3.14159
sprintf("Pi to 2 decimal places: %.2f", val)
\`\`\`
`
  },
  {
    id: 'decision-making',
    title: 'Decision Making',
    description: 'If-Else statements and Switch cases.',
    category: 'Logic & Data Structures',
    content: `
# Decision Making in R

## If-Else Statements
Used to execute code based on a condition.

\`\`\`r
# Example 1: If-Else
x <- 10
if (x > 5) {
  print("x is greater than 5")
} else {
  print("x is 5 or less")
}

# Example 2: Else If
score <- 85
if (score >= 90) {
  print("Grade: A")
} else if (score >= 80) {
  print("Grade: B")
} else {
  print("Grade: C")
}
\`\`\`

## Switch Case
Useful when you have multiple specific values to check against a single variable.

\`\`\`r
# Example 3: Switch
day_num <- 3
day_name <- switch(day_num,
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
)
print(day_name) # Prints "Wednesday"
\`\`\`
`
  },
  {
    id: 'loops-iteration',
    title: 'Loops & Iteration',
    description: 'For, While, Repeat, and control statements (Break, Next, Return).',
    category: 'Logic & Data Structures',
    content: `
# Loops and Iteration

## For Loops
Iterate over a sequence.
\`\`\`r
# Example 1: For Loop
for (i in 1:5) {
  cat("Number:", i, "\\n")
}
\`\`\`

## While Loops
Repeat as long as a condition is true.
\`\`\`r
# Example 2: While Loop
count <- 1
while (count <= 3) {
  cat("Count is", count, "\\n")
  count <- count + 1
}
\`\`\`

## Repeat Loops & Break
Execute indefinitely until a \`break\` statement is reached.
\`\`\`r
# Example 3: Repeat and Break
x <- 1
repeat {
  print(x)
  x <- x + 1
  if (x > 3) {
    break # Exit the loop
  }
}
\`\`\`

## Control Statements: Next & Return
- **next**: Skip the rest of the current iteration and move to the next one.
- **return**: Exit a function and return a value.

\`\`\`r
# Example 4: Next statement
for (i in 1:5) {
  if (i == 3) next # Skip 3
  print(i)
}
\`\`\`
`
  },
  {
    id: '1d-storage',
    title: '1D Storage: Vectors and Lists',
    description: 'Master the fundamental 1D data structures of R.',
    category: 'Logic & Data Structures',
    content: `
# 1D Data Storage

## Vectors
A vector is a sequence of elements of the same type.
\`\`\`r
# Example 1: Vectors
numeric_vec <- c(1, 2, 3, 4)
char_vec <- c("A", "B", "C")

# Accessing elements
char_vec[2] # Returns "B"
\`\`\`

## Lists
Lists can contain elements of different types and structures.
\`\`\`r
# Example 2: Lists
my_list <- list(
  name = "Alice",
  age = 22,
  grades = c(90, 85, 88)
)

# Accessing elements
my_list$name
my_list[[3]] # Accesses the grades vector
\`\`\`
`
  },
  {
    id: '2d-storage',
    title: '2D Storage: Matrices and Data Frames',
    description: 'Learn about 2D data structures in R.',
    category: 'Logic & Data Structures',
    content: `
# 2D Data Storage

## Matrices
A matrix is a 2D collection of elements of the same type.
\`\`\`r
# Example 1: Creating a Matrix
# 3 rows, 2 columns
mat <- matrix(1:6, nrow = 3, ncol = 2)
print(mat)

# Accessing: [row, column]
mat[1, 2] # Row 1, Column 2
\`\`\`

## Data Frames
Data frames are table-like structures where columns can have different types.
\`\`\`r
# Example 2: Data Frames
students <- data.frame(
  ID = 101:103,
  Name = c("John", "Jane", "Joe"),
  Score = c(88, 92, 85)
)

# Accessing a column
students$Name
\`\`\`
`
  },
  {
    id: 'multid-storage',
    title: 'Multi-D Storage: Arrays',
    description: 'Learn about multi-dimensional arrays in R.',
    category: 'Logic & Data Structures',
    content: `
# Multi-Dimensional Storage: Arrays

Arrays can store data in more than two dimensions.

## Creating an Array
Use the \`array()\` function and specify the dimensions in the \`dim\` argument.

\`\`\`r
# Example 1: 3D Array
# Create a 3x3x2 array (two 3x3 matrices)
my_array <- array(1:18, dim = c(3, 3, 2))
print(my_array)
\`\`\`

## Accessing Elements
Access elements using indices for each dimension: \`[row, column, matrix_index]\`.

\`\`\`r
# Example 2: Accessing Array
# Get element at 1st row, 2nd column of the 2nd matrix
val <- my_array[1, 2, 2]
print(val)
\`\`\`
`
  },
  {
    id: 'viz-base-intro',
    title: 'Introduction to Base R Graphics',
    description: 'Learn the built-in plotting functions of R.',
    category: 'Data visualisation basic graphs',
    content: `
# Base R Graphics

Base R provides a powerful set of functions for creating static graphics without needing any external packages.

## The "Canvas" Model
In Base R, you start with a blank canvas and add layers (points, lines, text) on top of it. Once something is drawn, it cannot be easily removed or modified without redrawing the entire plot.

## Common Functions
- \`plot()\`: General purpose plotting.
- \`hist()\`: Histograms.
- \`barplot()\`: Bar charts.
- \`boxplot()\`: Box-and-whisker plots.
- \`pie()\`: Pie charts.
`
  },
  {
    id: 'viz-base-histograms',
    title: 'Histograms (Base R)',
    description: 'Create histograms using the built-in hist() function.',
    category: 'Data visualisation basic graphs',
    content: `
# Histograms in Base R

Use the \`hist()\` function to visualize the distribution of a numeric variable.

\`\`\`r
# Example 1: Basic Histogram
data <- rnorm(1000)
hist(data, col="skyblue", border="white", main="Normal Distribution")

# Example 2: Customizing Bins
hist(data, breaks=50, col="coral", main="Histogram with 50 Bins")
\`\`\`
`
  },
  {
    id: 'viz-base-bar-charts',
    title: 'Bar Charts (Base R)',
    description: 'Create bar charts using the built-in barplot() function.',
    category: 'Data visualisation basic graphs',
    content: `
# Bar Charts in Base R

Use \`barplot()\` to compare categorical data.

\`\`\`r
# Example 1: Simple Bar Chart
counts <- table(mtcars$gear)
barplot(counts, main="Gears Distribution", col="orange")

# Example 2: Horizontal Bar Chart
barplot(counts, main="Gears Distribution", col="lightgreen", horiz=TRUE)
\`\`\`
`
  },
  {
    id: 'viz-base-line-graphs',
    title: 'Line Graphs (Base R)',
    description: 'Create line graphs using the built-in plot() function.',
    category: 'Data visualisation basic graphs',
    content: `
# Line Graphs in Base R

Use \`plot()\` with \`type="l"\` to create line graphs.

\`\`\`r
# Example 1: Simple Line Graph
x <- 1:10
y <- x^2
plot(x, y, type="l", col="red", lwd=2, main="Trend Line")

# Example 2: Lines and Points
plot(x, y, type="b", col="blue", pch=19, main="Lines and Points")
\`\`\`
`
  },
  {
    id: 'viz-base-boxplots',
    title: 'Boxplots (Base R)',
    description: 'Create boxplots using the built-in boxplot() function.',
    category: 'Data visualisation basic graphs',
    content: `
# Boxplots in Base R

Use \`boxplot()\` to visualize data spread and outliers.

\`\`\`r
# Example 1: Single Boxplot
boxplot(mtcars$mpg, col="lightblue", main="MPG Distribution")

# Example 2: Grouped Boxplot
boxplot(mpg ~ cyl, data = mtcars, col = "gold", main = "MPG by Cylinder")
\`\`\`
`
  },
  {
    id: 'viz-base-scatterplots',
    title: 'Scatterplots (Base R)',
    description: 'Create scatterplots using the built-in plot() function.',
    category: 'Data visualisation basic graphs',
    content: `
# Scatterplots in Base R

Use \`plot()\` to visualize the relationship between two numeric variables.

\`\`\`r
# Example 1: Basic Scatterplot
plot(mtcars$wt, mtcars$mpg, pch=19, col="blue", main="Weight vs MPG")

# Example 2: Adding a Regression Line
plot(mtcars$wt, mtcars$mpg, pch=19, col="darkgray")
abline(lm(mpg ~ wt, data=mtcars), col="red", lwd=2)
\`\`\`
`
  },
  {
    id: 'viz-base-pie-charts',
    title: 'Pie Charts (Base R)',
    description: 'Create pie charts using the built-in pie() function.',
    category: 'Data visualisation basic graphs',
    content: `
# Pie Charts in Base R

Use \`pie()\` to show proportions.

\`\`\`r
# Example 1: Basic Pie Chart
slices <- c(10, 12, 4, 16, 8)
lbls <- c("US", "UK", "Australia", "Germany", "France")
pie(slices, labels = lbls, main="Market Share")

# Example 2: Colored Pie Chart
pie(slices, labels = lbls, col=rainbow(length(lbls)), main="Colored Market Share")
\`\`\`
`
  },
  {
    id: 'viz-ggplot-intro',
    title: 'Introduction to ggplot2',
    description: 'Learn the Grammar of Graphics with ggplot2.',
    category: 'ggplot2 in R',
    content: `
# Introduction to ggplot2

\`ggplot2\` is based on the **Grammar of Graphics**, which allows you to build plots by adding layers.

## The Basic Template
\`\`\`r
# ggplot(data = <DATA>, mapping = aes(<MAPPINGS>)) + 
#   <GEOM_FUNCTION>()
\`\`\`

## Key Concepts
- **Aesthetics (aes)**: Mapping data variables to visual properties (x, y, color, size).
- **Geoms**: The geometric objects used to represent data (points, bars, lines).
- **Themes**: Controlling the non-data parts of the plot (background, grid lines).
`
  },
  {
    id: 'viz-ggplot-histograms',
    title: 'Histograms (ggplot2)',
    description: 'Create histograms using geom_histogram().',
    category: 'ggplot2 in R',
    content: `
# Histograms in ggplot2

\`\`\`r
library(ggplot2)

# Example 1: Basic Histogram
ggplot(mtcars, aes(x=mpg)) + 
  geom_histogram(bins=10, fill="steelblue", color="white") +
  theme_minimal()

# Example 2: Density Overlay
ggplot(mtcars, aes(x=mpg)) + 
  geom_histogram(aes(y=..density..), bins=10, fill="gray") +
  geom_density(color="red", size=1)
\`\`\`
`
  },
  {
    id: 'viz-ggplot-bar-charts',
    title: 'Bar Charts (ggplot2)',
    description: 'Create bar charts using geom_bar() and geom_col().',
    category: 'ggplot2 in R',
    content: `
# Bar Charts in ggplot2

\`\`\`r
library(ggplot2)

# Example 1: Counting categories
ggplot(mtcars, aes(x=factor(gear))) + 
  geom_bar(fill="coral") +
  labs(x="Gears")

# Example 2: Stacked Bar Chart
ggplot(mtcars, aes(x=factor(cyl), fill=factor(am))) + 
  geom_bar(position="stack") +
  labs(x="Cylinders", fill="Transmission")
\`\`\`
`
  },
  {
    id: 'viz-ggplot-line-graphs',
    title: 'Line Graphs (ggplot2)',
    description: 'Create line graphs using geom_line().',
    category: 'ggplot2 in R',
    content: `
# Line Graphs in ggplot2

\`\`\`r
library(ggplot2)

# Example 1: Basic Line Graph
df <- data.frame(x=1:10, y=(1:10)^2)
ggplot(df, aes(x=x, y=y)) + 
  geom_line(color="blue") +
  geom_point()

# Example 2: Multiple Lines
ggplot(economics, aes(x=date, y=unemploy)) + 
  geom_line(color="darkgreen") +
  theme_bw()
\`\`\`
`
  },
  {
    id: 'viz-ggplot-boxplots',
    title: 'Boxplots (ggplot2)',
    description: 'Create boxplots using geom_boxplot().',
    category: 'ggplot2 in R',
    content: `
# Boxplots in ggplot2

\`\`\`r
library(ggplot2)

# Example 1: Basic Boxplot
ggplot(mtcars, aes(x=factor(cyl), y=mpg)) + 
  geom_boxplot(fill="lightgreen")

# Example 2: Adding Points (Jitter)
ggplot(mtcars, aes(x=factor(cyl), y=mpg)) + 
  geom_boxplot() +
  geom_jitter(width=0.2, alpha=0.5)
\`\`\`
`
  },
  {
    id: 'viz-ggplot-scatterplots',
    title: 'Scatterplots (ggplot2)',
    description: 'Create scatterplots using geom_point().',
    category: 'ggplot2 in R',
    content: `
# Scatterplots in ggplot2

\`\`\`r
library(ggplot2)

# Example 1: Basic Scatterplot
ggplot(mtcars, aes(x=wt, y=mpg)) + 
  geom_point(size=3, alpha=0.7)

# Example 2: Mapping Color and Size
ggplot(mtcars, aes(x=wt, y=mpg, color=hp, size=qsec)) + 
  geom_point() +
  scale_color_gradient(low="blue", high="red")
\`\`\`
`
  },
  {
    id: 'viz-ggplot-pie-charts',
    title: 'Pie Charts (ggplot2)',
    description: 'Create pie charts using coord_polar().',
    category: 'ggplot2 in R',
    content: `
# Pie Charts in ggplot2

In ggplot2, a pie chart is a bar chart in polar coordinates.

\`\`\`r
library(ggplot2)

# Example 1: Basic Pie Chart
df <- data.frame(group=c("A", "B", "C"), value=c(10, 20, 30))
ggplot(df, aes(x="", y=value, fill=group)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  theme_void()

# Example 2: Donut Chart
ggplot(df, aes(x=2, y=value, fill=group)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  xlim(0.5, 2.5) +
  theme_void()
\`\`\`
`
  },
  {
    id: 'viz-plotly-intro',
    title: 'Introduction to Plotly',
    description: 'Create interactive web-based graphics with Plotly.',
    category: 'Plotly in R',
    content: `
# Introduction to Plotly

\`plotly\` is an R library for creating interactive, web-based charts.

## Key Features
- **Interactivity**: Zoom, pan, and hover effects are built-in.
- **ggplotly**: Easily convert existing ggplot2 objects to interactive Plotly charts.
- **Customization**: Highly customizable using the \`layout()\` function.
`
  },
  {
    id: 'viz-plotly-histograms',
    title: 'Histograms (Plotly)',
    description: 'Create interactive histograms with plot_ly().',
    category: 'Plotly in R',
    content: `
# Histograms in Plotly

\`\`\`r
library(plotly)

# Example 1: Basic Interactive Histogram
plot_ly(x = rnorm(1000), type = "histogram")

# Example 2: Customizing Colors
plot_ly(x = rnorm(1000), type = "histogram", 
        marker = list(color = "rgba(100, 200, 100, 0.7)",
                     line = list(color = "white", width = 1)))
\`\`\`
`
  },
  {
    id: 'viz-plotly-bar-charts',
    title: 'Bar Charts (Plotly)',
    description: 'Create interactive bar charts with plot_ly().',
    category: 'Plotly in R',
    content: `
# Bar Charts in Plotly

\`\`\`r
library(plotly)

# Example 1: Basic Bar Chart
df <- data.frame(gear=c(3, 4, 5), count=c(15, 12, 5))
plot_ly(df, x = ~gear, y = ~count, type = "bar")

# Example 2: Grouped Bar Chart
plot_ly(mtcars, x = ~factor(cyl), y = ~hp, type = "bar", name = "HP") %>%
  add_trace(y = ~qsec, name = "QSec") %>%
  layout(yaxis = list(title = 'Value'), barmode = 'group')
\`\`\`
`
  },
  {
    id: 'viz-plotly-line-graphs',
    title: 'Line Graphs (Plotly)',
    description: 'Create interactive line graphs with plot_ly().',
    category: 'Plotly in R',
    content: `
# Line Graphs in Plotly

\`\`\`r
library(plotly)

# Example 1: Simple Line Graph
plot_ly(x = 1:10, y = (1:10)^2, type = 'scatter', mode = 'lines')

# Example 2: Lines and Markers
plot_ly(x = 1:10, y = (1:10)^2, type = 'scatter', mode = 'lines+markers')
\`\`\`
`
  },
  {
    id: 'viz-plotly-boxplots',
    title: 'Boxplots (Plotly)',
    description: 'Create interactive boxplots with plot_ly().',
    category: 'Plotly in R',
    content: `
# Boxplots in Plotly

\`\`\`r
library(plotly)

# Example 1: Basic Boxplot
plot_ly(mtcars, y = ~mpg, type = "box")

# Example 2: Grouped Boxplot
plot_ly(mtcars, y = ~mpg, color = ~factor(cyl), type = "box")
\`\`\`
`
  },
  {
    id: 'viz-plotly-scatterplots',
    title: 'Scatterplots (Plotly)',
    description: 'Create interactive scatterplots with plot_ly().',
    category: 'Plotly in R',
    content: `
# Scatterplots in Plotly

\`\`\`r
library(plotly)

# Example 1: Basic Scatterplot
plot_ly(mtcars, x = ~wt, y = ~mpg, type = 'scatter', mode = 'markers')

# Example 2: Mapping Color and Hover Text
plot_ly(mtcars, x = ~wt, y = ~mpg, 
        text = ~paste("Car:", rownames(mtcars)),
        color = ~hp, size = ~qsec,
        type = 'scatter', mode = 'markers')
\`\`\`
`
  },
  {
    id: 'viz-plotly-pie-charts',
    title: 'Pie Charts (Plotly)',
    description: 'Create interactive pie charts with plot_ly().',
    category: 'Plotly in R',
    content: `
# Pie Charts in Plotly

\`\`\`r
library(plotly)

# Example 1: Basic Pie Chart
df <- data.frame(labels = c('A','B','C'), values = c(10, 20, 30))
plot_ly(df, labels = ~labels, values = ~values, type = 'pie')

# Example 2: Donut Chart
plot_ly(df, labels = ~labels, values = ~values, type = 'pie', hole = 0.6)
\`\`\`
`
  },
  {
    id: 'functions',
    title: 'Writing Functions',
    description: 'Learn how to write reusable code with custom R functions.',
    category: 'Logic & Data Structures',
    content: `
# Writing Functions in R

Functions allow you to automate repetitive tasks and make your code more readable.

## Basic Syntax
\`\`\`r
my_function <- function(arg1, arg2) {
  # Code to execute
  result <- arg1 + arg2
  return(result)
}

# Call the function
my_function(10, 20)
\`\`\`

## Default Arguments
You can set default values for your arguments.
\`\`\`r
greet <- function(name = "Student") {
  print(paste("Hello,", name))
}

greet()           # Uses default
greet("Alice")    # Uses provided value
\`\`\`
`
  },
  {
    id: 'tidyverse',
    title: 'The Tidyverse',
    description: 'An introduction to data manipulation with dplyr.',
    category: 'Data Engineering & ETL',
    content: `
# The Tidyverse

The Tidyverse is a collection of R packages designed for data science. The most famous one is \`dplyr\`.

## The Pipe Operator (%>%)
The pipe allows you to chain functions together.
\`\`\`r
library(dplyr)

mtcars %>%
  filter(mpg > 20) %>%
  select(mpg, hp, wt) %>%
  arrange(desc(mpg))
\`\`\`

## Core dplyr Verbs
- **filter()**: Pick rows based on values.
- **select()**: Pick columns by name.
- **mutate()**: Create new columns.
- **summarize()**: Collapse many values into a single summary.
- **arrange()**: Reorder rows.
\`\`\`r
mtcars %>%
  group_by(cyl) %>%
  summarize(avg_mpg = mean(mpg))
\`\`\`
`
  },
  {
    id: 'basic-stats',
    title: 'Descriptive Statistics',
    description: 'Master Mean, Median, Mode, Variance, and Standard Deviation.',
    category: 'Statistics using R',
    content: `
# Descriptive Statistics in R

Descriptive statistics summarize and describe the features of a dataset.

## 1. Central Tendency
- **Mean**: The average value.
- **Median**: The middle value when sorted.
- **Mode**: The most frequent value.

\`\`\`r
# Example 1: Calculating Central Tendency
data <- c(10, 20, 20, 30, 40, 50)

mean_val <- mean(data)
median_val <- median(data)

# R doesn't have a built-in mode function, so we create one
get_mode <- function(v) {
  uniqv <- unique(v)
  uniqv[which.max(tabulate(match(v, uniqv)))]
}
mode_val <- get_mode(data)

cat("Mean:", mean_val, " Median:", median_val, " Mode:", mode_val, "\n")
\`\`\`

## 2. Dispersion (Spread)
- **Variance**: How far values are spread from the mean.
- **Standard Deviation**: Square root of variance.

\`\`\`r
# Example 2: Calculating Spread
variance_val <- var(data)
sd_val <- sd(data)
range_val <- range(data) # Min and Max

cat("Variance:", variance_val, "\n")
cat("SD:", sd_val, "\n")
cat("Range:", range_val[1], "to", range_val[2], "\n")
\`\`\`
`
  },
  {
    id: 'probability-distributions',
    title: 'Probability Distributions',
    description: 'Explore Normal and Binomial distributions in R.',
    category: 'Statistics using R',
    content: `
# Probability Distributions

R provides functions for many probability distributions (prefix with d, p, q, r).

## 1. Normal Distribution
The "Bell Curve" is the most important distribution in statistics.

\`\`\`r
# Example 1: Normal Distribution
# Generate 100 random numbers from N(0, 1)
samples <- rnorm(100, mean = 0, sd = 1)

# Find probability of x < 1.96
prob <- pnorm(1.96, mean = 0, sd = 1)
cat("Probability (z < 1.96):", prob, "\n")
\`\`\`

## 2. Binomial Distribution
Used for binary outcomes (success/failure).

\`\`\`r
# Example 2: Binomial Distribution
# Probability of getting exactly 5 heads in 10 flips (p=0.5)
prob_5 <- dbinom(5, size = 10, prob = 0.5)

# Simulate 10 sets of 20 coin flips
sim <- rbinom(10, size = 20, prob = 0.5)
cat("Prob of 5 heads:", prob_5, "\n")
cat("Simulated successes:", sim, "\n")
\`\`\`
`
  },
  {
    id: 'statistical-testing-anova',
    title: 'Statistical Testing: ANOVA',
    description: 'Learn One-Way and Two-Way ANOVA for group comparisons.',
    category: 'Statistics using R',
    content: `
# Analysis of Variance (ANOVA)

ANOVA tests if there are significant differences between the means of three or more groups.

## 1. One-Way ANOVA
Compares means across one categorical factor.

\`\`\`r
# Example 1: One-Way ANOVA
# Using built-in PlantGrowth data
data("PlantGrowth")
res_aov <- aov(weight ~ group, data = PlantGrowth)
summary(res_aov)
\`\`\`

## 2. Two-Way ANOVA
Compares means across two categorical factors and their interaction.

\`\`\`r
# Example 2: Two-Way ANOVA
# Using built-in ToothGrowth data
data("ToothGrowth")
res_aov2 <- aov(len ~ supp * dose, data = ToothGrowth)
summary(res_aov2)
\`\`\`
`
  },
  {
    id: 'predictive-modeling-regression',
    title: 'Predictive Modeling: Regression',
    description: 'Linear, Multiple, and Logistic Regression techniques.',
    category: 'Statistics using R',
    content: `
# Regression Analysis

Regression models the relationship between a dependent variable and one or more independent variables.

## 1. Linear & Multiple Regression
\`\`\`r
# Example 1: Multiple Linear Regression
# Predict mpg based on weight and horsepower
model <- lm(mpg ~ wt + hp, data = mtcars)
summary(model)

# Make a prediction
new_data <- data.frame(wt = 3.0, hp = 110)
predict(model, new_data)
\`\`\`

## 2. Logistic Regression
Used when the dependent variable is categorical (binary).

\`\`\`r
# Example 2: Logistic Regression
# Predict transmission type (am: 0=auto, 1=manual) based on mpg
log_model <- glm(am ~ mpg, data = mtcars, family = "binomial")
summary(log_model)
\`\`\`
`
  },
  {
    id: 'advanced-analytics',
    title: 'Advanced Analytics',
    description: 'Time Series and Survival Analysis for complex data.',
    category: 'Statistics using R',
    content: `
# Advanced Analytics

## 1. Time Series Analysis
Analyzing data points collected or recorded at specific time intervals.

\`\`\`r
# Example 1: Time Series Decomposition
# Using built-in AirPassengers data
data("AirPassengers")
ts_data <- ts(AirPassengers, frequency = 12)
decomposed <- decompose(ts_data)
plot(decomposed)
\`\`\`

## 2. Survival Analysis
Analyzing the expected duration of time until one or more events happen.

\`\`\`r
# Example 2: Survival Analysis
library(survival)
# Using built-in lung cancer data
surv_obj <- Surv(time = lung$time, event = lung$status)
fit <- survfit(surv_obj ~ sex, data = lung)
plot(fit, col = c("red", "blue"), main = "Survival Curve by Sex")
\`\`\`
`
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing (t-tests)',
    description: 'Compare means between groups using t-tests.',
    category: 'Statistics using R',
    content: `
# Hypothesis Testing

## 1. Two-Sample t-test
Tests if the means of two independent groups are significantly different.

\`\`\`r
# Example 1: Independent t-test
group1 <- c(20, 22, 19, 24, 25)
group2 <- c(28, 30, 27, 29, 31)
t.test(group1, group2)
\`\`\`

## 2. Paired t-test
Tests means from the same group at different times.

\`\`\`r
# Example 2: Paired t-test
before <- c(10, 12, 11, 14, 13)
after <- c(15, 17, 16, 19, 18)
t.test(before, after, paired = TRUE)
\`\`\`
`
  },
  {
    id: 'correlation-analysis',
    title: 'Correlation Analysis',
    description: 'Measure the strength and direction of relationships.',
    category: 'Statistics using R',
    content: `
# Correlation Analysis

## 1. Pearson Correlation
Measures linear relationship between numeric variables.

\`\`\`r
# Example 1: Correlation Matrix
cor_matrix <- cor(mtcars[, c("mpg", "wt", "hp")])
print(cor_matrix)
\`\`\`

## 2. Spearman Correlation
Measures rank-based relationship (useful for non-linear data).

\`\`\`r
# Example 2: Spearman Rank Correlation
x <- c(1, 2, 3, 4, 5)
y <- c(2, 4, 8, 16, 32) # Exponential relationship
cor(x, y, method = "spearman")
\`\`\`
`
  },
  {
    id: 'pca-analysis',
    title: 'Principal Component Analysis (PCA)',
    description: 'Dimensionality reduction for large datasets.',
    category: 'Statistics using R',
    content: `
# Principal Component Analysis

PCA reduces the dimensionality of data while preserving as much variance as possible.

## 1. Running PCA
\`\`\`r
# Example 1: PCA on Iris dataset
data(iris)
pca_res <- prcomp(iris[, 1:4], scale. = TRUE)
summary(pca_res)
\`\`\`

## 2. Visualizing PCA
\`\`\`r
# Example 2: Biplot
biplot(pca_res)
\`\`\`
`
  },
  {
    id: 'cluster-analysis',
    title: 'Cluster Analysis (K-means)',
    description: 'Group similar data points together automatically.',
    category: 'Statistics using R',
    content: `
# Cluster Analysis

## 1. K-means Clustering
\`\`\`r
# Example 1: K-means on Iris
set.seed(123)
clusters <- kmeans(iris[, 1:4], centers = 3)
print(clusters$size)
\`\`\`

## 2. Elbow Method
Finding the optimal number of clusters.

\`\`\`r
# Example 2: Elbow Plot
wss <- sapply(1:10, function(k){kmeans(iris[,1:4], k)$tot.withinss})
plot(1:10, wss, type="b", xlab="Number of Clusters", ylab="WSS")
\`\`\`
`
  },
  {
    id: 'chi-square-test',
    title: 'Chi-Square Test',
    description: 'Test independence and goodness of fit for categorical data.',
    category: 'Statistics using R',
    content: `
# Chi-Square Test

## 1. Test of Independence
Tests if two categorical variables are related.

\`\`\`r
# Example 1: Independence Test
# Relationship between car cylinders and transmission type
table_data <- table(mtcars$cyl, mtcars$am)
chisq.test(table_data)
\`\`\`

## 2. Goodness of Fit
Tests if observed frequencies match expected frequencies.

\`\`\`r
# Example 2: Goodness of Fit
observed <- c(20, 30, 50)
expected <- c(0.25, 0.25, 0.50)
chisq.test(observed, p = expected)
\`\`\`
`
  },
  {
    id: 'file-handling',
    title: 'File Handling: CSV & Excel',
    description: 'Learn how to import and export data using CSV and Excel formats.',
    category: 'Data Engineering & ETL',
    content: `
# File Handling in R

Getting data into R from common file formats is the first step in any data project.

## Working with CSV Files
CSV (Comma Separated Values) is the most common data format.
\`\`\`r
# Example 1: Reading and Writing CSV
# write.csv(mtcars, "my_data.csv") # Save data
my_data <- read.csv("my_data.csv") # Load data
head(my_data)
\`\`\`

## Working with Excel Files
To work with Excel (\`.xlsx\`), we use the \`readxl\` package.
\`\`\`r
# Example 2: Reading Excel
library(readxl)
# excel_data <- read_excel("data.xlsx", sheet = 1)
# head(excel_data)
\`\`\`
`
  },
  {
    id: 'semi-structured-data',
    title: 'Web & Semi-structured Data',
    description: 'Importing XML, JSON, and other web data formats.',
    category: 'Data Engineering & ETL',
    content: `
# Web & Semi-structured Data

Modern data often comes in JSON or XML formats, especially from web APIs.

## Working with JSON
JSON is the standard for web communication. We use the \`jsonlite\` package.
\`\`\`r
# Example 1: JSON to R
library(jsonlite)
json_string <- '{"name": "R-Mastery", "type": "Tutorial"}'
r_object <- fromJSON(json_string)
print(r_object$name)
\`\`\`

## Working with XML
XML is common in legacy systems and specific industries. We use the \`XML\` package.
\`\`\`r
# Example 2: XML Parsing
library(XML)
# xml_data <- xmlParse("data.xml")
# root <- xmlRoot(xml_data)
\`\`\`
`
  },
  {
    id: 'database-integration',
    title: 'Database Integration',
    description: 'Connecting R to external SQL databases like MySQL or PostgreSQL.',
    category: 'Data Engineering & ETL',
    content: `
# Database Integration in R

R can connect to almost any database using the \`DBI\` and \`odbc\` packages.

## Connecting to SQL
\`\`\`r
# Example 1: Establishing Connection
library(DBI)
# con <- dbConnect(RSQLite::SQLite(), ":memory:") # In-memory DB
# dbWriteTable(con, "mtcars", mtcars)
\`\`\`

## Querying Data
You can use SQL queries directly or use \`dbplyr\` to write R code that translates to SQL.
\`\`\`r
# Example 2: Fetching Data
# res <- dbGetQuery(con, "SELECT * FROM mtcars WHERE mpg > 20")
# head(res)
# dbDisconnect(con)
\`\`\`
`
  },
  {
    id: 'data-cleaning',
    title: 'Data Cleaning',
    description: 'Techniques for managing and cleaning external data structures.',
    category: 'Data Engineering & ETL',
    content: `
# Data Cleaning

Real-world data is "messy". Cleaning involves handling missing values, renaming columns, and fixing types.

## Handling Missing Values (NA)
\`\`\`r
# Example 1: Dealing with NA
data <- c(1, 2, NA, 4, 5)
clean_data <- na.omit(data) # Remove NAs
is_missing <- is.na(data)   # Check for NAs
\`\`\`

## Renaming and Transforming
Using \`dplyr\` makes cleaning intuitive.
\`\`\`r
# Example 2: Cleaning with dplyr
library(dplyr)
# messy_data %>%
#   rename(New_Name = old_name) %>%
#   mutate(Score = as.numeric(Score)) %>%
#   filter(!is.na(Score))
\`\`\`
`
  },
  {
    id: 'web-scraping',
    title: 'Web Scraping in R',
    description: 'Extract data from websites and understand the difference from data mining.',
    category: 'Data Engineering & ETL',
    content: `
# Web Scraping in R

Web scraping is the process of automatically extracting information from websites.

## Web Scraping vs. Data Mining
- **Web Scraping**: The process of *gathering* data from the web (e.g., extracting prices from Amazon).
- **Data Mining**: The process of *finding patterns* and knowledge in large datasets (e.g., predicting future prices based on historical data).

## Scraping with rvest
\`\`\`r
# Example 1: Basic Scraping
library(rvest)
# html <- read_html("https://example.com")
# title <- html %>% html_element("h1") %>% html_text()
\`\`\`

## Scraping Tables
\`\`\`r
# Example 2: Extracting Tables
# tables <- html %>% html_elements("table") %>% html_table()
# my_table <- tables[[1]]
\`\`\`
`
  },
];
