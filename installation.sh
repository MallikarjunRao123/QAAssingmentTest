#!/bin/bash

# Check if Node.js is already installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Proceeding with installation..."
else
    echo "Node.js is already installed. Skipping installation."
    exit 0
fi

# Check if Node Version Manager (nvm) is installed
if ! command -v nvm &> /dev/null
then
    # Install Node Version Manager
    echo "Installing Node Version Manager (nvm)..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    source ~/.bashrc   # Source the bashrc file to use nvm immediately
    echo "Node Version Manager (nvm) installed successfully!"
else
    echo "Node Version Manager (nvm) is already installed."
fi

# Install the LTS version of Node.js using nvm
echo "Installing the LTS version of Node.js..."
nvm install --lts

# Set the LTS version as the default
nvm alias default node

# Verify installation
echo "Node.js and npm installed successfully!"
node -v
npm -v
