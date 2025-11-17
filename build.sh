#!/bin/sh
# GitHub Actions workspace is already in the repo root
# Copy only next-vote directory contents for Vercel deployment
rm -rf output
mkdir -p output
cp -R ./next-vote/* ./output/