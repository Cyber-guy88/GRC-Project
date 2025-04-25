import pandas as pd

# Load files
checklist_file = "main.xlsx"  # Replace with actual file path
response_file = "company.xlsx"  # Replace with actual file path

# Read files
checklist_df = pd.read_excel(checklist_file)
response_df = pd.read_excel(response_file)

# Print column names
print("Checklist Columns:", checklist_df.columns)
print("Response Columns:", response_df.columns)
