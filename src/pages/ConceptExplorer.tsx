
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const concepts = {
  basics: [
    {
      title: "Python Basics",
      description: "Foundational Python concepts for data science",
      content: [
        "Variables and data types in Python are the building blocks for storing and manipulating data",
        "List comprehensions allow for concise and efficient list creation, crucial for data processing",
        "Functions in Python help organize code and promote reusability across data science projects",
        "Python's extensive library ecosystem (NumPy, Pandas) simplifies complex data manipulations"
      ]
    },
    {
      title: "Data Structures",
      description: "Essential data structures for efficient data manipulation",
      content: [
        "DataFrame objects from pandas provide a tabular structure similar to spreadsheets for data analysis",
        "Series objects represent single columns of data with powerful indexing capabilities",
        "NumPy arrays enable vectorized operations that are significantly faster than Python loops",
        "Dictionaries offer key-value mapping that's vital for feature engineering and data transformation"
      ]
    },
    {
      title: "File Handling",
      description: "Reading and writing data files in Python",
      content: [
        "The pandas library provides read_csv(), read_excel(), and similar functions for importing structured data",
        "File encoding issues are common when working with international data; UTF-8 is the recommended standard",
        "Writing processed data to files ensures reproducibility and sharing of results",
        "Working with APIs often requires understanding JSON file structures and parsing techniques"
      ]
    }
  ],
  stats: [
    {
      title: "Descriptive Statistics",
      description: "Summarizing and understanding your dataset",
      content: [
        "Measures of central tendency (mean, median, mode) provide different perspectives on 'average' values",
        "Measures of spread (standard deviation, variance, IQR) quantify data dispersion",
        "Distribution shape (skewness, kurtosis) helps identify patterns and anomalies in your dataset",
        "Visualizations like histograms and box plots bring descriptive statistics to life"
      ]
    },
    {
      title: "Probability Distributions",
      description: "Understanding common probability distributions",
      content: [
        "Normal distribution is the foundation for many statistical methods and has the classic bell-shaped curve",
        "Binomial distribution models the number of successes in a fixed number of independent trials",
        "Poisson distribution represents the number of events occurring in a fixed time interval",
        "Understanding when to apply each distribution type is crucial for accurate statistical modeling"
      ]
    },
    {
      title: "Hypothesis Testing",
      description: "Testing assumptions about your data",
      content: [
        "The null hypothesis represents the status quo, while the alternative hypothesis suggests a pattern or effect",
        "P-values quantify the evidence against the null hypothesis; lower values suggest stronger evidence",
        "Type I errors (false positives) and Type II errors (false negatives) represent different statistical risks",
        "Statistical significance doesn't always imply practical or business significance"
      ]
    }
  ],
  viz: [
    {
      title: "Matplotlib Fundamentals",
      description: "Basic plotting with Python's matplotlib",
      content: [
        "The pyplot interface provides a simple way to create common plots with minimal code",
        "Figure and Axes objects give fine-grained control over plot elements",
        "Customization options like colors, labels, and legends improve plot interpretability",
        "Multi-panel figures help compare different aspects of your data in a single visualization"
      ]
    },
    {
      title: "Advanced Visualization",
      description: "Creating sophisticated data visualizations",
      content: [
        "Seaborn builds on matplotlib to create statistically-aware visualizations with less code",
        "Interactive plots with Plotly enable exploration of complex datasets through zooming and tooltips",
        "Geographical data visualization requires specialized tools like Folium or GeoPlot",
        "Dashboard creation with Dash or Streamlit transforms static plots into interactive applications"
      ]
    },
    {
      title: "Visualization Best Practices",
      description: "Guidelines for effective data visualization",
      content: [
        "Choose chart types that match your data and the story you want to tell",
        "Color palettes should be accessible to colorblind viewers and consistent across your analysis",
        "Reduce chart junk to maintain focus on the data, not decorative elements",
        "Labeling directly on charts often works better than legends for immediate comprehension"
      ]
    }
  ],
  ml: [
    {
      title: "Supervised Learning",
      description: "Models that learn from labeled training data",
      content: [
        "Classification models predict categorical outcomes like customer churn or email spam detection",
        "Regression models predict continuous values like house prices or temperature forecasts",
        "Feature engineering often impacts model performance more than algorithm selection",
        "Cross-validation helps estimate how well models will perform on unseen data"
      ]
    },
    {
      title: "Unsupervised Learning",
      description: "Finding patterns in unlabeled data",
      content: [
        "Clustering algorithms group similar data points without prior knowledge of categories",
        "Dimensionality reduction techniques like PCA help visualize and process high-dimensional data",
        "Anomaly detection identifies unusual patterns that don't conform to expected behavior",
        "Topic modeling discovers abstract topics within text document collections"
      ]
    },
    {
      title: "Model Evaluation",
      description: "Assessing machine learning model performance",
      content: [
        "Classification metrics include accuracy, precision, recall, and F1-score, each with different use cases",
        "Regression evaluation uses metrics like RMSE, MAE, and R² to quantify prediction error",
        "Learning curves diagnose underfitting and overfitting by comparing training and validation performance",
        "ROC curves and AUC measure discrimination ability across different threshold settings"
      ]
    }
  ]
};

const ConceptExplorer = () => {
  const [selectedConcept, setSelectedConcept] = useState(null);

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Data Science Concept Explorer</h1>
        <p className="text-lg text-muted-foreground">
          Explore key data science concepts through interactive cards. Click on any topic to learn more!
        </p>
      </div>

      <Tabs defaultValue="basics" className="max-w-5xl mx-auto">
        <TabsList className="w-full justify-start mb-8 overflow-x-auto">
          <TabsTrigger value="basics">Python Basics</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="viz">Data Visualization</TabsTrigger>
          <TabsTrigger value="ml">Machine Learning</TabsTrigger>
        </TabsList>
        
        {Object.keys(concepts).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {concepts[category].map((concept, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md">
                      <CardHeader>
                        <CardTitle>{concept.title}</CardTitle>
                        <CardDescription>{concept.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="ghost">Learn More</Button>
                      </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{concept.title}</DialogTitle>
                      <DialogDescription>{concept.description}</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      {concept.content.map((point, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-funpath-purple/20 flex items-center justify-center text-funpath-purple font-medium">
                            {i + 1}
                          </div>
                          <p>{point}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ConceptExplorer;
