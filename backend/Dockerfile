# Multi-stage build for minimal image size
# Stage 1: Builder
FROM python:3.11-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install PyTorch CPU-only (smallest version) and other deps into a venv
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir torch==2.1.1 --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.1/en_core_web_sm-3.7.1-py3-none-any.whl && \
    pip cache purge

# Stage 2: Runtime (much smaller)
FROM python:3.11-slim

WORKDIR /app

# Copy only the virtual environment from builder
COPY --from=builder /opt/venv /opt/venv

# Set environment to use venv
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Clean up unnecessary files
RUN find /opt/venv -name '*.pyc' -delete && \
    find /opt/venv -name '*.pyo' -delete && \
    find /opt/venv -name '__pycache__' -type d -exec rm -rf {} + 2>/dev/null || true && \
    find /opt/venv -name 'tests' -type d -exec rm -rf {} + 2>/dev/null || true && \
    find /opt/venv -name '*.dist-info' -type d -exec rm -rf {} + 2>/dev/null || true

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
