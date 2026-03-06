export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'R Programming Setup & Syntax' | 'Logic & Data Structures' | 'Data Engineering & ETL' | 'Statistical analysis in R' | 'Data visualisation basic graphs' | 'Statistics using R' | 'ggplot2 in R' | 'Plotly in R';
}

export type ViewState = 'home' | 'tutorial' | 'curriculum';
