import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'intro',
    title: 'Introduction to R',
    description: 'Learn what R is and why it is used for data science.',
    content: `R is a programming language and free software environment for statistical computing and graphics. It is widely used among statisticians and data miners for developing statistical software and data analysis.

### Key Features:
*   **Open Source:** Free to use and modify.
*   **Packages:** Over 18,000 packages available on CRAN.
*   **Visualization:** Excellent graphics capabilities (ggplot2).
*   **Community:** Strong support for data science and research.`,
    codeExample: `# This is a comment in R
print("Hello, R World!")

# Simple arithmetic
x <- 10
y <- 5
sum <- x + y
print(sum)`,
    quiz: {
      question: "What is the primary use of R programming?",
      options: [
        "Web Development",
        "Statistical Computing and Data Analysis",
        "Mobile App Development",
        "Game Design"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 'data-types',
    title: 'Basic Data Types',
    description: 'Explore vectors, matrices, and data frames.',
    content: `In R, data is stored in various structures. The most common ones are:

### 1. Vectors
The basic data structure in R. It contains elements of the same type.
\`\`\`r
vec <- c(1, 2, 3, 4, 5)
\`\`\`

### 2. Matrices
A 2D data structure where all elements are of the same type.
\`\`\`r
mat <- matrix(1:9, nrow=3)
\`\`\`

### 3. Data Frames
Used for storing tabular data. Different columns can have different types.
\`\`\`r
df <- data.frame(
  id = 1:3,
  name = c("Alice", "Bob", "Charlie")
)
\`\`\``,
    codeExample: `# Creating a vector
fruits <- c("apple", "banana", "cherry")

# Creating a data frame
students <- data.frame(
  Name = c("John", "Jane"),
  Score = c(85, 92)
)

print(students)`,
    quiz: {
      question: "Which data structure in R can store columns of different types?",
      options: [
        "Vector",
        "Matrix",
        "Data Frame",
        "Array"
      ],
      correctAnswer: 2
    }
  },
  {
    id: 'plotting',
    title: 'Visualizing Data',
    description: 'Learn the basics of plotting in R.',
    content: `Visualization is one of R's strongest points. While base R has plotting functions, \`ggplot2\` is the industry standard.

### Base R Plotting:
\`\`\`r
plot(x, y)
hist(data)
\`\`\`

### ggplot2 (Grammar of Graphics):
It works by adding layers to a plot.
1.  **Data:** The dataset.
2.  **Aesthetics (aes):** Mapping variables to axes, colors, etc.
3.  **Geometries (geom):** The type of plot (points, lines, bars).`,
    codeExample: `# Simple base R plot
x <- 1:10
y <- x^2
plot(x, y, type="b", col="blue", main="Simple Plot")

# Using built-in dataset 'mtcars'
hist(mtcars$mpg, col="pink", main="MPG Distribution")`,
    quiz: {
      question: "Which package is considered the industry standard for visualization in R?",
      options: [
        "plotR",
        "ggplot2",
        "vizR",
        "shiny"
      ],
      correctAnswer: 1
    }
  }
];
