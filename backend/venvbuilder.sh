#!/bin/bash

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/Scripts/activate

# Install the dependencies
pip install -r requirements.txt