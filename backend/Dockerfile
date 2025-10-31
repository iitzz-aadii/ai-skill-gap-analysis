# Backend Dockerfile - Optimized for size
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy requirements and install Python dependencies
COPY requirements.txt .

# Install PyTorch CPU-only version first (much smaller than GPU version)
RUN pip install --no-cache-dir torch==2.1.1 --index-url https://download.pytorch.org/whl/cpu \
    && pip cache purge

# Install remaining dependencies with size optimization flags
RUN pip install --no-cache-dir --compile -r requirements.txt \
    && pip cache purge

# Download spaCy model - direct wheel download for reliability
RUN pip install --no-cache-dir https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.1/en_core_web_sm-3.7.1-py3-none-any.whl \
    && pip cache purge

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Remove unnecessary files to reduce image size
RUN find /usr/local/lib/python3.11 -name '*.pyc' -delete \
    && find /usr/local/lib/python3.11 -name '*.pyo' -delete \
    && find /usr/local/lib/python3.11 -name '__pycache__' -type d -exec rm -rf {} + 2>/dev/null || true

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
