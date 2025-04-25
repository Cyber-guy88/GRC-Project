
# import os
# import pandas as pd
# import tkinter as tk
# from tkinter import filedialog

# # Define the path for main.xlsx (Compliance checklist)
# main_file = "main.xlsx"  # Make sure this file exists in the current working directory

# # Function to prompt the user to select a file
# def select_input_file():
#     root = tk.Tk()
#     root.withdraw()  # Hide the root window
#     file_path = filedialog.askopenfilename(
#         title="Select the Company Response File",
#         filetypes=(("Excel Files", "*.xlsx;*.xls"), ("All Files", "*.*"))
#     )
#     return file_path

# # Function to compare the files and calculate the score
# def calculate_compliance_score(input_file):
#     # Check if the main file exists
#     if not os.path.exists(main_file):
#         print(f"Error: {main_file} not found!")
#         return

#     if not os.path.exists(input_file):
#         print(f"Error: {input_file} not found!")
#         return

#     # Read the Excel files
#     main_df = pd.read_excel(main_file)
#     company_df = pd.read_excel(input_file)

#     # Merge both datasets on "Requirement ID"
#     merged_df = pd.merge(main_df, company_df, on="Requirement ID", how="left")

#     # Define scoring system
#     response_mapping = {"Yes": 1, "No": 0, "Partial": 0.5}

#     # Apply scoring
#     merged_df["Score"] = merged_df["Response"].map(response_mapping).fillna(0)

#     # Calculate the final compliance percentage
#     final_score = (merged_df["Score"].sum() / len(merged_df)) * 100

#     # Display results
#     print(f"\nFinal Compliance Score: {final_score:.2f}%")

# # Main execution
# if __name__ == "__main__":
#     # Ask the user to select an input file
#     input_file = select_input_file()

#     # If the user canceled the file selection, stop execution
#     if not input_file:
#         print("No file selected. Exiting...")
#     else:
#         # Compare the selected file with main.xlsx and calculate the score
#         calculate_compliance_score(input_file)


# import pandas as pd
# import os

# # Define file paths
# main_file = "main.xlsx"  # Compliance checklist
# script_dir = os.path.dirname(os.path.abspath(__file__))  # Get script directory
# company_file = os.path.join(script_dir, "uploads", "company.xlsx")  # Full path

# print("Looking for:", company_file)  # Debugging output

# if not os.path.exists(company_file):
#     raise FileNotFoundError(f"File not found: {company_file}")

# company_df = pd.read_excel(company_file)  # Read company.xlsx

# # Read Excel files
# script_dir = os.path.dirname(os.path.abspath(__file__))  # Get script directory
# main_file = os.path.join(script_dir, "uploads", "main.xlsx")  # Construct full path

# print("Looking for:", main_file)  # Debugging output

# if not os.path.exists(main_file):
#     raise FileNotFoundError(f"File not found: {main_file}")

# main_df = pd.read_excel(main_file)  # Read the Excel file


# company_df = pd.read_excel(company_file)

# # Merge both datasets on "Requirement ID"
# merged_df = pd.merge(main_df, company_df, on="Requirement ID", how="left")

# # Define scoring system
# response_mapping = {"Yes": 1, "No": 0, "Partial": 0.5}

# # Apply scoring
# merged_df["Score"] = merged_df["Response"].map(response_mapping).fillna(0)

# # Calculate the final compliance percentage
# final_score = (merged_df["Score"].sum() / len(merged_df)) * 100

# # Display results
# print(f"\nFinal Compliance Score: {final_score:.2f}%")

import pandas as pd
import os

# Get script directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define file paths
company_file = os.path.join(script_dir, "uploads", "company.xlsx")
main_file = os.path.join(script_dir, "uploads", "main.xlsx")

# Check if files exist
if not os.path.exists(company_file):
    raise FileNotFoundError(f"Error: File not found: {company_file}")

if not os.path.exists(main_file):
    raise FileNotFoundError(f"Error: File not found: {main_file}")

# Read Excel files
company_df = pd.read_excel(company_file)
main_df = pd.read_excel(main_file)

# Merge both datasets on "Requirement ID"
merged_df = pd.merge(main_df, company_df, on="Requirement ID", how="left")

# Define scoring system
response_mapping = {"Yes": 1, "No": 0, "Partial": 0.5}

# Apply scoring
merged_df["Score"] = merged_df["Response"].map(response_mapping).fillna(0)

# Calculate the final compliance percentage
final_score = (merged_df["Score"].sum() / len(merged_df)) * 100

# Output only the final score
print(f"{final_score:.2f}")
